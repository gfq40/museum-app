import { supabase } from './supabase';

export type FileType = 'image' | 'audio' | 'video' | 'model';

interface UploadResult {
  url: string | null;
  error: any;
}

/**
 * Get the bucket name for a file type
 */
function getBucketName(fileType: FileType): string {
  const buckets: Record<FileType, string> = {
    image: 'artifacts',
    audio: 'audio',
    video: 'videos',
    model: 'models',
  };
  return buckets[fileType];
}

/**
 * Generate a unique filename
 */
function generateFileName(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  const extension = originalName.split('.').pop();
  return `${timestamp}-${random}.${extension}`;
}

/**
 * Upload a file to Supabase Storage
 */
export async function uploadFile(
  file: File,
  fileType: FileType
): Promise<UploadResult> {
  if (!supabase) {
    return { url: null, error: 'Supabase not configured' };
  }

  try {
    const bucketName = getBucketName(fileType);
    const fileName = generateFileName(file.name);
    const filePath = fileName;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading file:', error);
      return { url: null, error };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return { url: urlData.publicUrl, error: null };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { url: null, error };
  }
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(
  fileUrl: string,
  fileType: FileType
): Promise<{ success: boolean; error: any }> {
  if (!supabase) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const bucketName = getBucketName(fileType);
    
    // Extract filename from URL
    const urlParts = fileUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];

    const { error } = await supabase.storage
      .from(bucketName)
      .remove([fileName]);

    if (error) {
      console.error('Error deleting file:', error);
      return { success: false, error };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting file:', error);
    return { success: false, error };
  }
}

/**
 * Validate file type and size
 */
export function validateFile(
  file: File,
  fileType: FileType
): { valid: boolean; error?: string } {
  // Max file sizes (in bytes)
  const maxSizes: Record<FileType, number> = {
    image: 10 * 1024 * 1024, // 10MB
    audio: 20 * 1024 * 1024, // 20MB
    video: 100 * 1024 * 1024, // 100MB
    model: 50 * 1024 * 1024, // 50MB
  };

  // Allowed MIME types
  const allowedTypes: Record<FileType, string[]> = {
    image: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
    audio: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg'],
    video: ['video/mp4', 'video/webm', 'video/quicktime'],
    model: ['model/gltf-binary', 'application/octet-stream'],
  };

  // Check file size
  if (file.size > maxSizes[fileType]) {
    const maxSizeMB = maxSizes[fileType] / (1024 * 1024);
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB limit`,
    };
  }

  // Check file type
  if (!allowedTypes[fileType].includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${allowedTypes[fileType].join(', ')}`,
    };
  }

  return { valid: true };
}

/**
 * Create storage buckets (run this once to set up)
 */
export async function createStorageBuckets(): Promise<void> {
  if (!supabase) {
    console.error('Supabase not configured');
    return;
  }

  const buckets = ['artifacts', 'audio', 'videos', 'models'];

  for (const bucketName of buckets) {
    try {
      // Check if bucket exists
      const { data: existingBuckets } = await supabase.storage.listBuckets();
      const bucketExists = existingBuckets?.some((b) => b.name === bucketName);

      if (!bucketExists) {
        // Create bucket
        const { error } = await supabase.storage.createBucket(bucketName, {
          public: true,
          fileSizeLimit: 104857600, // 100MB
        });

        if (error) {
          console.error(`Error creating bucket ${bucketName}:`, error);
        } else {
          console.log(`✅ Created bucket: ${bucketName}`);
        }
      } else {
        console.log(`✅ Bucket already exists: ${bucketName}`);
      }
    } catch (error) {
      console.error(`Error with bucket ${bucketName}:`, error);
    }
  }
}


import { useState, useRef } from 'react';
import {
  IonButton,
  IonIcon,
  IonSpinner,
  IonProgressBar,
} from '@ionic/react';
import { cloudUpload, checkmarkCircle, closeCircle } from 'ionicons/icons';
import { uploadFile, validateFile, FileType } from '../services/storageService';
import './FileUpload.css';

interface FileUploadProps {
  fileType: FileType;
  onUploadComplete: (url: string) => void;
  currentUrl?: string;
  accept?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  fileType,
  onUploadComplete,
  currentUrl,
  accept,
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    setError(null);

    // Validate file
    const validation = validateFile(file, fileType);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    // Show preview for images
    if (fileType === 'image') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    // Upload file
    setUploading(true);
    const { url, error: uploadError } = await uploadFile(file, fileType);
    setUploading(false);

    if (uploadError) {
      setError('Upload failed: ' + uploadError.message);
      return;
    }

    if (url) {
      setPreview(url);
      onUploadComplete(url);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const getAcceptString = () => {
    if (accept) return accept;
    
    const acceptMap: Record<FileType, string> = {
      image: 'image/jpeg,image/jpg,image/png,image/webp,image/gif',
      audio: 'audio/mpeg,audio/mp3,audio/wav,audio/ogg',
      video: 'video/mp4,video/webm,video/quicktime',
      model: '.glb,.gltf',
    };
    return acceptMap[fileType];
  };

  const getFileTypeLabel = () => {
    const labels: Record<FileType, string> = {
      image: 'Image',
      audio: 'Audio',
      video: 'Video',
      model: '3D Model',
    };
    return labels[fileType];
  };

  return (
    <div className="file-upload-container">
      <input
        ref={fileInputRef}
        type="file"
        accept={getAcceptString()}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />

      <div
        className={`file-upload-dropzone ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        {uploading ? (
          <div className="upload-status">
            <IonSpinner name="crescent" />
            <p>Uploading...</p>
            <IonProgressBar type="indeterminate" />
          </div>
        ) : preview && fileType === 'image' ? (
          <div className="upload-preview">
            <img src={preview} alt="Preview" />
            <div className="upload-overlay">
              <IonIcon icon={checkmarkCircle} color="success" />
              <p>Click to change</p>
            </div>
          </div>
        ) : preview ? (
          <div className="upload-status">
            <IonIcon icon={checkmarkCircle} color="success" size="large" />
            <p>{getFileTypeLabel()} uploaded successfully!</p>
            <small>{preview}</small>
          </div>
        ) : (
          <div className="upload-prompt">
            <IonIcon icon={cloudUpload} size="large" />
            <p>
              <strong>Click to upload</strong> or drag and drop
            </p>
            <small>
              {getFileTypeLabel()} files only
            </small>
          </div>
        )}
      </div>

      {error && (
        <div className="upload-error">
          <IonIcon icon={closeCircle} />
          {error}
        </div>
      )}

      {!uploading && (
        <IonButton
          expand="block"
          fill="outline"
          onClick={handleButtonClick}
          style={{ marginTop: '10px' }}
        >
          <IonIcon icon={cloudUpload} slot="start" />
          {preview ? `Change ${getFileTypeLabel()}` : `Upload ${getFileTypeLabel()}`}
        </IonButton>
      )}
    </div>
  );
};

export default FileUpload;


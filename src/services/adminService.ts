import { supabase } from './supabase';
import { Artifact } from './database';

export interface ArtifactInput {
  name_en: string;
  name_it: string;
  name_es: string;
  name_fr: string;
  description_en: string;
  description_it: string;
  description_es: string;
  description_fr: string;
  image_url: string;
  type: string;
  period: string;
  location: string;
  category: string;
  audio_guide_url?: string;
}

/**
 * Add a new artifact to the database
 */
export async function addArtifact(artifact: ArtifactInput): Promise<{ data: Artifact | null; error: any }> {
  try {
    const { data, error } = await supabase
      .from('artifacts')
      .insert([artifact])
      .select()
      .single();

    if (error) {
      console.error('Error adding artifact:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error adding artifact:', error);
    return { data: null, error };
  }
}

/**
 * Update an existing artifact
 */
export async function updateArtifact(id: string, artifact: Partial<ArtifactInput>): Promise<{ data: Artifact | null; error: any }> {
  try {
    const { data, error } = await supabase
      .from('artifacts')
      .update(artifact)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating artifact:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error updating artifact:', error);
    return { data: null, error };
  }
}

/**
 * Delete an artifact
 */
export async function deleteArtifact(id: string): Promise<{ success: boolean; error: any }> {
  try {
    const { error } = await supabase
      .from('artifacts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting artifact:', error);
      return { success: false, error };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting artifact:', error);
    return { success: false, error };
  }
}

/**
 * Get all artifacts (for admin list)
 */
export async function getAllArtifacts(): Promise<{ data: Artifact[]; error: any }> {
  try {
    const { data, error } = await supabase
      .from('artifacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching artifacts:', error);
      return { data: [], error };
    }

    return { data: data || [], error: null };
  } catch (error) {
    console.error('Error fetching artifacts:', error);
    return { data: [], error };
  }
}


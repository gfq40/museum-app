import { supabase, isSupabaseConfigured } from './supabase';

// Database types matching Supabase schema
export interface Artifact {
  id: string; // UUID
  name_en: string;
  name_it: string;
  name_es: string;
  name_fr: string;
  description_en: string;
  description_it: string;
  description_es: string;
  description_fr: string;
  image_url: string;
  type: 'image' | 'video';
  period?: string;
  origin?: string;
  material?: string;
  dimensions?: string;
  discovered?: string;
  condition?: string;
  audio_guide_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Exhibit3D {
  id: string; // UUID
  name_en: string;
  name_it: string;
  name_es: string;
  name_fr: string;
  description_en: string;
  description_it: string;
  description_es: string;
  description_fr: string;
  model_type: 'primitive' | 'gltf' | 'obj';
  model_data: any; // JSONB
  thumbnail_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface QuizQuestion {
  id: string; // UUID
  question_en: string;
  question_it: string;
  question_es: string;
  question_fr: string;
  option1_en: string;
  option1_it: string;
  option1_es: string;
  option1_fr: string;
  option2_en: string;
  option2_it: string;
  option2_es: string;
  option2_fr: string;
  option3_en: string;
  option3_it: string;
  option3_es: string;
  option3_fr: string;
  option4_en: string;
  option4_it: string;
  option4_es: string;
  option4_fr: string;
  correct_answer: number; // 0-3
  explanation_en: string;
  explanation_it: string;
  explanation_es: string;
  explanation_fr: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category?: string;
  order_index?: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Fetch all artifacts from the database
 */
export const fetchArtifacts = async (): Promise<Artifact[]> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Using fallback data.');
    return [];
  }

  try {
    const { data, error } = await supabase!
      .from('artifacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching artifacts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching artifacts:', error);
    return [];
  }
};

/**
 * Fetch a single artifact by ID
 */
export const fetchArtifactById = async (id: string): Promise<Artifact | null> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured.');
    return null;
  }

  try {
    const { data, error } = await supabase!
      .from('artifacts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching artifact:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching artifact:', error);
    return null;
  }
};

/**
 * Search artifacts by title or description
 */
export const searchArtifacts = async (query: string): Promise<Artifact[]> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured.');
    return [];
  }

  try {
    const { data, error } = await supabase!
      .from('artifacts')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching artifacts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error searching artifacts:', error);
    return [];
  }
};

/**
 * Filter artifacts by type (image or video)
 */
export const filterArtifactsByType = async (type: 'image' | 'video'): Promise<Artifact[]> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured.');
    return [];
  }

  try {
    const { data, error } = await supabase!
      .from('artifacts')
      .select('*')
      .eq('type', type)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error filtering artifacts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error filtering artifacts:', error);
    return [];
  }
};

/**
 * Filter artifacts by category
 */
export const filterArtifactsByCategory = async (category: string): Promise<Artifact[]> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured.');
    return [];
  }

  try {
    const { data, error } = await supabase!
      .from('artifacts')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error filtering artifacts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error filtering artifacts:', error);
    return [];
  }
};

/**
 * Add a new artifact (requires authentication)
 */
export const addArtifact = async (artifact: Omit<Artifact, 'id' | 'created_at' | 'updated_at'>): Promise<Artifact | null> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured.');
    return null;
  }

  try {
    const { data, error } = await supabase!
      .from('artifacts')
      .insert([artifact])
      .select()
      .single();

    if (error) {
      console.error('Error adding artifact:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error adding artifact:', error);
    return null;
  }
};

/**
 * Update an existing artifact (requires authentication)
 */
export const updateArtifact = async (
  id: number,
  updates: Partial<Omit<Artifact, 'id' | 'created_at' | 'updated_at'>>
): Promise<Artifact | null> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured.');
    return null;
  }

  try {
    const { data, error } = await supabase!
      .from('artifacts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating artifact:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error updating artifact:', error);
    return null;
  }
};

/**
 * Delete an artifact (requires authentication)
 */
export const deleteArtifact = async (id: number): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured.');
    return false;
  }

  try {
    const { error } = await supabase!
      .from('artifacts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting artifact:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting artifact:', error);
    return false;
  }
};

/**
 * Subscribe to real-time changes in artifacts table
 */
export const subscribeToArtifacts = (callback: (payload: any) => void) => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured.');
    return null;
  }

  const subscription = supabase!
    .channel('artifacts_changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'artifacts' }, callback)
    .subscribe();

  return subscription;
};

// ============================================================================
// 3D EXHIBITS
// ============================================================================

/**
 * Fetch all 3D exhibits from the database
 */
export const fetchExhibits3D = async (): Promise<Exhibit3D[]> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Using fallback data.');
    return [];
  }

  try {
    const { data, error } = await supabase!
      .from('exhibits_3d')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching 3D exhibits:', error);
      return [];
    }

    // If no data from database, return fallback data for development
    if (!data || data.length === 0) {
      console.warn('No 3D exhibits in database, using fallback data');
      return [
        {
          id: 'fallback-1',
          name_en: 'Ancient Globe',
          name_it: 'Globo Antico',
          name_es: 'Globo Antiguo',
          name_fr: 'Globe Ancien',
          description_en: 'A spherical artifact',
          description_it: 'Un artefatto sferico',
          description_es: 'Un artefacto esférico',
          description_fr: 'Un artefact sphérique',
          model_type: 'primitive',
          model_data: { shape: 'sphere', color: '#8B7355', size: 2 },
        },
        {
          id: 'fallback-2',
          name_en: 'Stone Cube',
          name_it: 'Cubo di Pietra',
          name_es: 'Cubo de Piedra',
          name_fr: 'Cube de Pierre',
          description_en: 'Carved stone cube',
          description_it: 'Cubo di pietra scolpito',
          description_es: 'Cubo de piedra tallado',
          description_fr: 'Cube de pierre sculpté',
          model_type: 'primitive',
          model_data: { shape: 'box', color: '#696969', size: 2 },
        },
      ];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching 3D exhibits:', error);
    return [];
  }
};

/**
 * Fetch a single 3D exhibit by ID
 */
export const fetchExhibit3DById = async (id: string): Promise<Exhibit3D | null> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured.');
    return null;
  }

  try {
    const { data, error } = await supabase!
      .from('exhibits_3d')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching 3D exhibit:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching 3D exhibit:', error);
    return null;
  }
};

// ============================================================================
// QUIZ QUESTIONS
// ============================================================================

/**
 * Fetch all active quiz questions from the database
 */
export const fetchQuizQuestions = async (): Promise<QuizQuestion[]> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Using fallback data.');
    return [];
  }

  try {
    const { data, error } = await supabase!
      .from('quiz_questions')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching quiz questions:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    return [];
  }
};

/**
 * Fetch a single quiz question by ID
 */
export const fetchQuizQuestionById = async (id: string): Promise<QuizQuestion | null> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured.');
    return null;
  }

  try {
    const { data, error } = await supabase!
      .from('quiz_questions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching quiz question:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching quiz question:', error);
    return null;
  }
};


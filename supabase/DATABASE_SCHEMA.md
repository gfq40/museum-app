# Museum App - Database Schema Design

## Overview
This document describes the database schema for the Museum App backend using Supabase (PostgreSQL).

---

## Tables

### 1. `artifacts`
Stores all museum artifacts displayed in the gallery.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique identifier |
| name_en | TEXT | NOT NULL | Artifact name in English |
| name_it | TEXT | NOT NULL | Artifact name in Italian |
| name_es | TEXT | NOT NULL | Artifact name in Spanish |
| name_fr | TEXT | NOT NULL | Artifact name in French |
| description_en | TEXT | NOT NULL | Description in English |
| description_it | TEXT | NOT NULL | Description in Italian |
| description_es | TEXT | NOT NULL | Description in Spanish |
| description_fr | TEXT | NOT NULL | Description in French |
| image_url | TEXT | NOT NULL | URL to artifact image |
| type | TEXT | NOT NULL | Type: 'image' or 'video' |
| period | TEXT | | Historical period |
| origin | TEXT | | Place of origin |
| material | TEXT | | Material composition |
| dimensions | TEXT | | Physical dimensions |
| discovered | TEXT | | Discovery date/location |
| condition | TEXT | | Current condition |
| audio_guide_url | TEXT | | URL to audio guide file |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Record creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `idx_artifacts_type` on `type`
- `idx_artifacts_created_at` on `created_at`

---

### 2. `exhibits_3d`
Stores 3D models and exhibits.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique identifier |
| name_en | TEXT | NOT NULL | Exhibit name in English |
| name_it | TEXT | NOT NULL | Exhibit name in Italian |
| name_es | TEXT | NOT NULL | Exhibit name in Spanish |
| name_fr | TEXT | NOT NULL | Exhibit name in French |
| description_en | TEXT | NOT NULL | Description in English |
| description_it | TEXT | NOT NULL | Description in Italian |
| description_es | TEXT | NOT NULL | Description in Spanish |
| description_fr | TEXT | NOT NULL | Description in French |
| model_type | TEXT | NOT NULL | Type: 'primitive', 'gltf', 'obj' |
| model_data | JSONB | | Model configuration (color, size, url, etc.) |
| thumbnail_url | TEXT | | Preview image URL |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Record creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `idx_exhibits_3d_model_type` on `model_type`

---

### 3. `quiz_questions`
Stores quiz questions and answers.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique identifier |
| question_en | TEXT | NOT NULL | Question in English |
| question_it | TEXT | NOT NULL | Question in Italian |
| question_es | TEXT | NOT NULL | Question in Spanish |
| question_fr | TEXT | NOT NULL | Question in French |
| option1_en | TEXT | NOT NULL | Option 1 in English |
| option1_it | TEXT | NOT NULL | Option 1 in Italian |
| option1_es | TEXT | NOT NULL | Option 1 in Spanish |
| option1_fr | TEXT | NOT NULL | Option 1 in French |
| option2_en | TEXT | NOT NULL | Option 2 in English |
| option2_it | TEXT | NOT NULL | Option 2 in Italian |
| option2_es | TEXT | NOT NULL | Option 2 in Spanish |
| option2_fr | TEXT | NOT NULL | Option 2 in French |
| option3_en | TEXT | NOT NULL | Option 3 in English |
| option3_it | TEXT | NOT NULL | Option 3 in Italian |
| option3_es | TEXT | NOT NULL | Option 3 in Spanish |
| option3_fr | TEXT | NOT NULL | Option 3 in French |
| option4_en | TEXT | NOT NULL | Option 4 in English |
| option4_it | TEXT | NOT NULL | Option 4 in Italian |
| option4_es | TEXT | NOT NULL | Option 4 in Spanish |
| option4_fr | TEXT | NOT NULL | Option 4 in French |
| correct_answer | INTEGER | NOT NULL, CHECK (correct_answer BETWEEN 0 AND 3) | Index of correct answer (0-3) |
| explanation_en | TEXT | NOT NULL | Explanation in English |
| explanation_it | TEXT | NOT NULL | Explanation in Italian |
| explanation_es | TEXT | NOT NULL | Explanation in Spanish |
| explanation_fr | TEXT | NOT NULL | Explanation in French |
| difficulty | TEXT | DEFAULT 'medium' | Difficulty: 'easy', 'medium', 'hard' |
| category | TEXT | | Question category |
| order_index | INTEGER | | Display order |
| is_active | BOOLEAN | DEFAULT true | Whether question is active |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Record creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `idx_quiz_questions_is_active` on `is_active`
- `idx_quiz_questions_order_index` on `order_index`

---

### 4. `user_favorites`
Stores user's favorite artifacts.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique identifier |
| user_id | UUID | NOT NULL, REFERENCES auth.users(id) ON DELETE CASCADE | User who favorited |
| artifact_id | UUID | NOT NULL, REFERENCES artifacts(id) ON DELETE CASCADE | Favorited artifact |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | When favorited |

**Constraints:**
- `UNIQUE(user_id, artifact_id)` - User can't favorite same artifact twice

**Indexes:**
- `idx_user_favorites_user_id` on `user_id`
- `idx_user_favorites_artifact_id` on `artifact_id`

---

### 5. `quiz_attempts`
Stores user's quiz attempts and scores.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique identifier |
| user_id | UUID | NOT NULL, REFERENCES auth.users(id) ON DELETE CASCADE | User who took quiz |
| score | INTEGER | NOT NULL, CHECK (score >= 0) | Score achieved |
| total_questions | INTEGER | NOT NULL, CHECK (total_questions > 0) | Total questions in quiz |
| answers | JSONB | NOT NULL | Array of {question_id, selected_answer, is_correct} |
| completed_at | TIMESTAMPTZ | DEFAULT NOW() | When quiz was completed |

**Indexes:**
- `idx_quiz_attempts_user_id` on `user_id`
- `idx_quiz_attempts_completed_at` on `completed_at`

---

### 6. `user_badges`
Stores badges earned by users.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique identifier |
| user_id | UUID | NOT NULL, REFERENCES auth.users(id) ON DELETE CASCADE | User who earned badge |
| badge_type | TEXT | NOT NULL | Badge type: 'scholar', 'expert', 'master', 'perfect_score', 'streak_3', 'streak_7' |
| earned_at | TIMESTAMPTZ | DEFAULT NOW() | When badge was earned |

**Constraints:**
- `UNIQUE(user_id, badge_type)` - User can't earn same badge twice

**Indexes:**
- `idx_user_badges_user_id` on `user_id`
- `idx_user_badges_badge_type` on `badge_type`

---

### 7. `user_profiles`
Extended user profile information (supplements auth.users).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, REFERENCES auth.users(id) ON DELETE CASCADE | User ID (same as auth.users) |
| display_name | TEXT | | User's display name |
| avatar_url | TEXT | | Profile picture URL |
| preferred_language | TEXT | DEFAULT 'en' | Preferred language: 'en', 'it', 'es', 'fr' |
| theme_preference | TEXT | DEFAULT 'light' | Theme: 'light', 'dark', 'system' |
| is_admin | BOOLEAN | DEFAULT false | Whether user has admin privileges |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Profile creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `idx_user_profiles_is_admin` on `is_admin`

---

## Row Level Security (RLS) Policies

### `artifacts` - Public read, admin write
```sql
-- Enable RLS
ALTER TABLE artifacts ENABLE ROW LEVEL SECURITY;

-- Anyone can read artifacts
CREATE POLICY "Artifacts are viewable by everyone"
  ON artifacts FOR SELECT
  USING (true);

-- Only admins can insert/update/delete
CREATE POLICY "Only admins can modify artifacts"
  ON artifacts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.is_admin = true
    )
  );
```

### `exhibits_3d` - Public read, admin write
```sql
ALTER TABLE exhibits_3d ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Exhibits are viewable by everyone"
  ON exhibits_3d FOR SELECT
  USING (true);

CREATE POLICY "Only admins can modify exhibits"
  ON exhibits_3d FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.is_admin = true
    )
  );
```

### `quiz_questions` - Public read active questions, admin write
```sql
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active quiz questions are viewable by everyone"
  ON quiz_questions FOR SELECT
  USING (is_active = true);

CREATE POLICY "Only admins can modify quiz questions"
  ON quiz_questions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.is_admin = true
    )
  );
```

### `user_favorites` - Users can only access their own
```sql
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorites"
  ON user_favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add their own favorites"
  ON user_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
  ON user_favorites FOR DELETE
  USING (auth.uid() = user_id);
```

### `quiz_attempts` - Users can only access their own
```sql
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own quiz attempts"
  ON quiz_attempts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz attempts"
  ON quiz_attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### `user_badges` - Users can only view their own
```sql
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own badges"
  ON user_badges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert badges"
  ON user_badges FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### `user_profiles` - Users can view all, edit own
```sql
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
  ON user_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);
```

---

## Database Functions

### Auto-update `updated_at` timestamp
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

Apply to all tables with `updated_at`:
```sql
CREATE TRIGGER update_artifacts_updated_at BEFORE UPDATE ON artifacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exhibits_3d_updated_at BEFORE UPDATE ON exhibits_3d
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_questions_updated_at BEFORE UPDATE ON quiz_questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## Relationships

```
auth.users (Supabase Auth)
  ├─→ user_profiles (1:1)
  ├─→ user_favorites (1:many)
  ├─→ quiz_attempts (1:many)
  └─→ user_badges (1:many)

artifacts
  └─→ user_favorites (1:many)

quiz_questions
  └─→ quiz_attempts.answers (referenced in JSONB)
```

---

## Storage Buckets

### `artifact-images`
- **Public:** Yes
- **File size limit:** 10 MB
- **Allowed MIME types:** image/jpeg, image/png, image/webp
- **Purpose:** Store artifact images

### `audio-guides`
- **Public:** Yes
- **File size limit:** 50 MB
- **Allowed MIME types:** audio/mpeg, audio/wav, audio/ogg
- **Purpose:** Store audio guide files

### `3d-models`
- **Public:** Yes
- **File size limit:** 100 MB
- **Allowed MIME types:** model/gltf-binary, model/gltf+json, application/octet-stream
- **Purpose:** Store 3D model files

### `user-avatars`
- **Public:** Yes
- **File size limit:** 2 MB
- **Allowed MIME types:** image/jpeg, image/png, image/webp
- **Purpose:** Store user profile pictures

---

## Next Steps

1. Create Supabase project at https://supabase.com
2. Run the migration SQL file (see `001_initial_schema.sql`)
3. Run the seed data SQL file (see `002_seed_data.sql`)
4. Configure storage buckets
5. Set up RLS policies
6. Update frontend environment variables with Supabase credentials


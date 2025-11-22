# Supabase Database Integration Setup

This guide explains how to integrate Supabase as a real database backend for your museum app.

## 🚀 Quick Start

### 1. Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project
4. Note your **Project URL** and **anon/public API key**

### 2. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### 3. Create Environment Variables

Create a `.env` file in the root of your project:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Important:** Add `.env` to your `.gitignore` to keep your keys secret!

### 4. Database Schema

Run this SQL in your Supabase SQL Editor to create the artifacts table:

```sql
-- Create artifacts table
CREATE TABLE artifacts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  src TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  category TEXT,
  period TEXT,
  origin TEXT,
  material TEXT,
  dimensions TEXT,
  discovered TEXT,
  condition TEXT,
  detailed_description TEXT,
  audio_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE artifacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access"
  ON artifacts
  FOR SELECT
  TO public
  USING (true);

-- Create policy to allow authenticated users to insert/update
CREATE POLICY "Allow authenticated insert"
  ON artifacts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update"
  ON artifacts
  FOR UPDATE
  TO authenticated
  USING (true);

-- Insert sample data
INSERT INTO artifacts (title, description, src, type, category, period, origin, material, dimensions, discovered, condition, detailed_description, audio_url)
VALUES
  (
    'Ancient Pottery',
    'Ancient pottery from the Bronze Age',
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800',
    'image',
    'pottery',
    'Bronze Age (3000-1200 BCE)',
    'Mediterranean Region',
    'Terracotta',
    '45cm height, 30cm diameter',
    '1952, Archaeological excavation in Crete',
    'Excellent - Restored',
    'This remarkable piece of pottery dates back to the Bronze Age and showcases the advanced ceramic techniques of ancient Mediterranean civilizations. The intricate geometric patterns and the vessel''s exceptional preservation make it a valuable artifact for understanding ancient trade routes and cultural exchanges.',
    '/audio/pottery-guide.mp3'
  ),
  (
    'Historical Artifacts',
    'Collection of historical artifacts',
    'https://images.unsplash.com/photo-1595435742656-5272d0b3e8c7?w=800',
    'image',
    'artifacts',
    'Various periods',
    'Multiple locations',
    'Various materials',
    'Various sizes',
    'Multiple excavations',
    'Good',
    'This diverse collection represents artifacts from various historical periods and geographical locations, offering insights into different civilizations and their cultural practices.',
    '/audio/artifacts-guide.mp3'
  ),
  (
    'Museum Tour',
    'Virtual tour of the museum',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'video',
    'tour',
    'Modern',
    'Museum Collection',
    'Digital Media',
    'N/A',
    '2024',
    'Excellent',
    'Take a virtual tour through our museum and explore the fascinating exhibits from the comfort of your home.',
    '/audio/tour-guide.mp3'
  ),
  (
    'Ancient Sculpture',
    'Classical sculpture from ancient Greece',
    'https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?w=800',
    'image',
    'sculpture',
    'Classical Period (480-323 BCE)',
    'Athens, Greece',
    'Marble',
    '180cm height',
    '1876, Excavation near the Acropolis',
    'Good - Some weathering',
    'This classical Greek sculpture exemplifies the artistic mastery of the ancient world. The attention to anatomical detail and the graceful pose reflect the Greek ideal of beauty and proportion.',
    '/audio/sculpture-guide.mp3'
  );
```

### 5. Initialize Supabase Client

The Supabase client is already configured in `src/services/supabase.ts`. Make sure your environment variables are set correctly.

### 6. Use the Database Service

The app includes a database service layer in `src/services/database.ts` that provides functions to:

- `fetchArtifacts()` - Get all artifacts
- `fetchArtifactById(id)` - Get a specific artifact
- `searchArtifacts(query)` - Search artifacts by title or description
- `filterArtifactsByType(type)` - Filter by image/video
- `addArtifact(artifact)` - Add a new artifact (requires authentication)
- `updateArtifact(id, updates)` - Update an artifact (requires authentication)

### 7. Update Components to Use Database

To switch from hardcoded data to database data, update your components:

**Example for Gallery.tsx:**

```typescript
import { fetchArtifacts, searchArtifacts } from '../services/database';

// Inside your component:
const [artifacts, setArtifacts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  loadArtifacts();
}, []);

const loadArtifacts = async () => {
  setLoading(true);
  const data = await fetchArtifacts();
  setArtifacts(data);
  setLoading(false);
};
```

## 🔐 Authentication (Optional)

To add admin functionality for creating/editing artifacts:

### 1. Enable Email Authentication in Supabase

1. Go to Authentication → Providers in your Supabase dashboard
2. Enable Email provider
3. Configure email templates

### 2. Add Login Component

```typescript
import { supabase } from '../services/supabase';

const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) console.error('Error signing in:', error);
  return data;
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Error signing out:', error);
};
```

## 📊 Storage for Images/Videos

To store media files in Supabase Storage:

### 1. Create a Storage Bucket

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `artifacts`
3. Set it to public

### 2. Upload Files

```typescript
import { supabase } from '../services/supabase';

const uploadFile = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from('artifacts')
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading file:', error);
    return null;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('artifacts')
    .getPublicUrl(filePath);

  return publicUrl;
};
```

## 🎯 Benefits of Using Supabase

1. **Real-time Updates** - Changes sync across all users instantly
2. **Scalability** - Handles thousands of artifacts easily
3. **Security** - Row Level Security protects your data
4. **Free Tier** - Generous free tier for small projects
5. **No Backend Code** - Everything is handled by Supabase
6. **Admin Dashboard** - Manage data through Supabase UI

## 🔄 Migration Path

To migrate from hardcoded data to Supabase:

1. ✅ Set up Supabase account and project
2. ✅ Create database schema
3. ✅ Insert sample data
4. ✅ Configure environment variables
5. ✅ Update Gallery component to fetch from database
6. ✅ Update ArtifactDetail component to fetch from database
7. ✅ Add loading states and error handling
8. ✅ (Optional) Add admin panel for content management

## 📝 Notes

- The current implementation uses hardcoded data for simplicity
- Switching to Supabase requires minimal code changes
- All database functions are ready to use in `src/services/database.ts`
- You can keep using hardcoded data for development and switch to Supabase for production

## 🆘 Troubleshooting

**Issue:** "Invalid API key"
- **Solution:** Check that your `.env` file has the correct Supabase URL and anon key

**Issue:** "Row Level Security policy violation"
- **Solution:** Make sure you've created the public read policy in Supabase

**Issue:** "CORS error"
- **Solution:** Add your deployment URL to Supabase → Settings → API → URL Configuration

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)


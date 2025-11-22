# Database Integration - Ready to Use! 🗄️

Your museum app now has **database integration support** built in! The code is ready - you just need to connect it to Supabase when you're ready.

## 📁 What's Been Added

### Service Layer Files
- **`src/services/supabase.ts`** - Supabase client configuration
- **`src/services/database.ts`** - Database functions for CRUD operations
- **`SUPABASE_SETUP.md`** - Complete setup guide with SQL schema

### Available Database Functions

```typescript
// Fetch all artifacts
const artifacts = await fetchArtifacts();

// Get single artifact
const artifact = await fetchArtifactById(1);

// Search artifacts
const results = await searchArtifacts('pottery');

// Filter by type
const images = await filterArtifactsByType('image');

// Filter by category
const pottery = await filterArtifactsByCategory('pottery');

// Add new artifact (requires auth)
const newArtifact = await addArtifact({
  title: 'New Artifact',
  description: 'Description',
  src: 'https://...',
  type: 'image',
  category: 'pottery'
});

// Update artifact (requires auth)
const updated = await updateArtifact(1, { title: 'Updated Title' });

// Delete artifact (requires auth)
const deleted = await deleteArtifact(1);

// Real-time updates
const subscription = subscribeToArtifacts((payload) => {
  console.log('Change detected:', payload);
});
```

## 🚀 How to Activate Database Integration

### Step 1: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Step 2: Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up (free tier available)
3. Create a new project
4. Wait 2-3 minutes for setup

### Step 3: Get Your Credentials

In your Supabase dashboard:
1. Go to **Settings** → **API**
2. Copy your **Project URL**
3. Copy your **anon/public key**

### Step 4: Create Environment File

Create `.env` in the root of your project:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important:** Add `.env` to `.gitignore`!

### Step 5: Create Database Schema

1. Go to **SQL Editor** in Supabase
2. Copy the SQL from `SUPABASE_SETUP.md`
3. Run it to create the `artifacts` table

### Step 6: Update Your Components

**Example: Update Gallery.tsx to use database**

```typescript
import { useState, useEffect } from 'react';
import { fetchArtifacts } from '../services/database';
import { isSupabaseConfigured } from '../services/supabase';

const Gallery: React.FC = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useDatabase, setUseDatabase] = useState(false);

  useEffect(() => {
    // Check if Supabase is configured
    if (isSupabaseConfigured()) {
      loadFromDatabase();
    } else {
      // Use hardcoded data as fallback
      setArtifacts(galleryItems);
      setLoading(false);
    }
  }, []);

  const loadFromDatabase = async () => {
    setLoading(true);
    const data = await fetchArtifacts();
    if (data.length > 0) {
      setArtifacts(data);
      setUseDatabase(true);
    } else {
      // Fallback to hardcoded data
      setArtifacts(galleryItems);
    }
    setLoading(false);
  };

  // Rest of your component...
};
```

## 🎯 Current Status

✅ **Database service layer created**  
✅ **Supabase client configured**  
✅ **Complete SQL schema provided**  
✅ **Setup documentation written**  
⏳ **Waiting for Supabase account setup** (optional)  
⏳ **Components still use hardcoded data** (works without database)

## 💡 Benefits When You Switch

### Without Database (Current)
- ✅ Works immediately
- ✅ No setup required
- ✅ Fast development
- ❌ Data resets on refresh
- ❌ Can't add new artifacts
- ❌ No multi-user support

### With Database (After Setup)
- ✅ Persistent data storage
- ✅ Add/edit/delete artifacts
- ✅ Real-time updates
- ✅ Multi-user support
- ✅ Scalable to thousands of artifacts
- ✅ Admin panel possible
- ✅ Search and filtering
- ✅ Image/video storage

## 🔄 Migration Strategy

You can migrate gradually:

1. **Phase 1** (Current): Use hardcoded data for development
2. **Phase 2**: Set up Supabase, test with sample data
3. **Phase 3**: Update Gallery to fetch from database
4. **Phase 4**: Update ArtifactDetail to fetch from database
5. **Phase 5**: Add admin panel for content management
6. **Phase 6**: Enable real-time updates

## 📝 Notes

- The app works perfectly **without** Supabase (uses hardcoded data)
- Database integration is **optional** but recommended for production
- All database functions handle errors gracefully
- Falls back to empty arrays if Supabase is not configured
- You can keep using hardcoded data indefinitely if you prefer

## 🆘 Need Help?

See `SUPABASE_SETUP.md` for:
- Detailed setup instructions
- SQL schema
- Authentication setup
- Storage configuration
- Troubleshooting guide

## 🎓 Learning Resources

- [Supabase Quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

**Ready to go live?** Follow the steps above to connect your app to Supabase!  
**Want to keep it simple?** The app works great with hardcoded data too! 🚀


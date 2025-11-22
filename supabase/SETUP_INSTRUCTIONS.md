# Supabase Setup Instructions

This guide will walk you through setting up Supabase for the Museum App backend.

---

## Prerequisites

- A Supabase account (free tier is sufficient)
- Your Museum App project

---

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"New Project"**
3. Sign in with GitHub (recommended) or email
4. Click **"New project"**
5. Fill in the details:
   - **Name:** `museum-app` (or your preferred name)
   - **Database Password:** Create a strong password (save this!)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Free (sufficient for development)
6. Click **"Create new project"**
7. Wait 2-3 minutes for the project to be provisioned

---

## Step 2: Get API Credentials

1. In your Supabase project dashboard, click **"Settings"** (gear icon) in the left sidebar
2. Click **"API"** under Project Settings
3. You'll see two important values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")
4. **Copy these values** - you'll need them in Step 6

---

## Step 3: Run Database Migrations

### 3.1: Run Initial Schema Migration

1. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Open the file `supabase/migrations/001_initial_schema.sql` from your project
4. **Copy the entire contents** of the file
5. **Paste** it into the Supabase SQL Editor
6. Click **"Run"** (or press Ctrl+Enter / Cmd+Enter)
7. You should see: **"Success. No rows returned"**

This creates all the tables, indexes, RLS policies, and triggers.

### 3.2: Run Seed Data Migration

1. Click **"New query"** again in the SQL Editor
2. Open the file `supabase/migrations/002_seed_data.sql` from your project
3. **Copy the entire contents** of the file
4. **Paste** it into the Supabase SQL Editor
5. Click **"Run"**
6. You should see: **"Success. No rows returned"**

This inserts the initial artifacts, 3D exhibits, and quiz questions.

### 3.3: Verify Data

1. Click **"Table Editor"** in the left sidebar
2. You should see these tables:
   - `artifacts` (4 rows)
   - `exhibits_3d` (5 rows)
   - `quiz_questions` (5 rows)
   - `user_profiles` (0 rows - will populate when users sign up)
   - `user_favorites` (0 rows)
   - `quiz_attempts` (0 rows)
   - `user_badges` (0 rows)
3. Click on each table to verify the data was inserted correctly

---

## Step 4: Configure Storage Buckets

### 4.1: Create Buckets

1. Click **"Storage"** in the left sidebar
2. Click **"New bucket"**
3. Create these 4 buckets:

**Bucket 1: artifact-images**
- Name: `artifact-images`
- Public bucket: ✅ **Yes**
- File size limit: `10 MB`
- Allowed MIME types: `image/jpeg, image/png, image/webp`
- Click **"Create bucket"**

**Bucket 2: audio-guides**
- Name: `audio-guides`
- Public bucket: ✅ **Yes**
- File size limit: `50 MB`
- Allowed MIME types: `audio/mpeg, audio/wav, audio/ogg`
- Click **"Create bucket"**

**Bucket 3: 3d-models**
- Name: `3d-models`
- Public bucket: ✅ **Yes**
- File size limit: `100 MB`
- Allowed MIME types: `model/gltf-binary, model/gltf+json, application/octet-stream`
- Click **"Create bucket"**

**Bucket 4: user-avatars**
- Name: `user-avatars`
- Public bucket: ✅ **Yes**
- File size limit: `2 MB`
- Allowed MIME types: `image/jpeg, image/png, image/webp`
- Click **"Create bucket"**

### 4.2: Configure Bucket Policies

For each bucket, you need to set up RLS policies:

1. Click on the bucket name
2. Click **"Policies"** tab
3. Click **"New policy"**
4. For public read access, use this policy:

```sql
-- Allow public read access
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'artifact-images');
```

Replace `'artifact-images'` with the appropriate bucket name for each bucket.

5. For authenticated users to upload (user-avatars only):

```sql
-- Allow authenticated users to upload their own avatars
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'user-avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

---

## Step 5: Create Admin User (Optional)

If you want to have an admin user who can add/edit artifacts:

1. Click **"Authentication"** in the left sidebar
2. Click **"Users"** tab
3. Click **"Add user"** → **"Create new user"**
4. Enter email and password
5. Click **"Create user"**
6. Copy the user's UUID (you'll see it in the table)
7. Go to **"SQL Editor"** and run:

```sql
UPDATE user_profiles
SET is_admin = true
WHERE id = 'YOUR_USER_UUID_HERE';
```

Replace `YOUR_USER_UUID_HERE` with the actual UUID.

---

## Step 6: Configure Frontend Environment Variables

1. In your project root, create a file named `.env.local`:

```bash
touch .env.local
```

2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace with your actual values from Step 2.

3. **Important:** Add `.env.local` to your `.gitignore`:

```bash
echo ".env.local" >> .gitignore
```

This prevents your API keys from being committed to Git.

---

## Step 7: Install Supabase Client

The Supabase client should already be installed, but if not:

```bash
npm install @supabase/supabase-js
```

---

## Step 8: Test the Connection

1. Start your dev server:

```bash
npm run dev
```

2. Open the browser console (F12)
3. You should see no Supabase-related errors
4. The app should load artifacts from the database

---

## Step 9: Enable Email Authentication (Optional)

If you want users to sign up with email:

1. Click **"Authentication"** in the left sidebar
2. Click **"Providers"** tab
3. **Email** should be enabled by default
4. Configure email templates:
   - Click **"Email Templates"**
   - Customize the confirmation email, reset password email, etc.
5. For production, configure a custom SMTP server:
   - Click **"Settings"** → **"Auth"**
   - Scroll to **"SMTP Settings"**
   - Add your SMTP credentials

---

## Step 10: Enable Social Authentication (Optional)

To allow users to sign in with Google, GitHub, etc.:

1. Click **"Authentication"** → **"Providers"**
2. Enable the providers you want (e.g., Google, GitHub)
3. For each provider, you'll need to:
   - Create an OAuth app in the provider's developer console
   - Get the Client ID and Client Secret
   - Add them to Supabase
   - Add the Supabase callback URL to the provider

**Example for Google:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `https://xxxxx.supabase.co/auth/v1/callback`
6. Copy Client ID and Client Secret to Supabase

---

## Troubleshooting

### Issue: "relation does not exist" error

**Solution:** You didn't run the migration SQL. Go back to Step 3.

### Issue: "permission denied for table" error

**Solution:** RLS policies aren't set up correctly. Re-run the migration SQL.

### Issue: Can't connect to Supabase

**Solution:** 
- Check your `.env.local` file has correct credentials
- Restart your dev server after adding `.env.local`
- Verify the Supabase project is running (not paused)

### Issue: "Invalid API key" error

**Solution:**
- Make sure you're using the **anon public** key, not the service role key
- Check for typos in `.env.local`
- Restart dev server

### Issue: Storage bucket upload fails

**Solution:**
- Verify bucket policies are set up correctly
- Check file size limits
- Verify MIME types are allowed

---

## Next Steps

Now that Supabase is set up, you can:

1. **Phase 2:** Connect the frontend to fetch data from Supabase
2. **Phase 3:** Implement user authentication
3. **Phase 4:** Add cloud favorites sync
4. **Phase 5:** Implement quiz progress tracking
5. **Phase 6:** Build the admin panel

---

## Useful Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)
- [Authentication Guide](https://supabase.com/docs/guides/auth)

---

## Support

If you encounter issues:
1. Check the [Supabase Discord](https://discord.supabase.com/)
2. Search [Supabase GitHub Issues](https://github.com/supabase/supabase/issues)
3. Review the [Supabase Status Page](https://status.supabase.com/)

---

**Congratulations! Your Supabase backend is now set up!** 🎉

You can now proceed to Phase 2: Connecting the frontend to the database.


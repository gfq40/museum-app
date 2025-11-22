# Supabase Storage Setup Guide

## 📦 Create Storage Buckets

Follow these steps to create the storage buckets in Supabase:

### Step 1: Access Supabase Dashboard

1. Go to: https://supabase.com/dashboard
2. Login to your account
3. Select your project: **qlhvvhballsotkknrpgk**

### Step 2: Navigate to Storage

1. Click **"Storage"** in the left sidebar
2. You should see the Storage page

### Step 3: Create Buckets

Create **4 buckets** with these exact names:

#### Bucket 1: artifacts (for images)
1. Click **"New bucket"** button
2. **Name:** `artifacts`
3. **Public bucket:** ✅ Check this box (IMPORTANT!)
4. Click **"Create bucket"**

#### Bucket 2: audio (for audio guides)
1. Click **"New bucket"** button
2. **Name:** `audio`
3. **Public bucket:** ✅ Check this box
4. Click **"Create bucket"**

#### Bucket 3: videos (for videos)
1. Click **"New bucket"** button
2. **Name:** `videos`
3. **Public bucket:** ✅ Check this box
4. Click **"Create bucket"**

#### Bucket 4: models (for 3D models)
1. Click **"New bucket"** button
2. **Name:** `models`
3. **Public bucket:** ✅ Check this box
4. Click **"Create bucket"**

### Step 4: Configure Bucket Policies

For each bucket, we need to allow uploads:

1. Click on a bucket name (e.g., "artifacts")
2. Go to **"Policies"** tab
3. Click **"New Policy"**
4. Click **"Create policy from scratch"**
5. Fill in:
   - **Policy name:** `Allow public uploads`
   - **Allowed operation:** Check **INSERT**
   - **Target roles:** `public` or `anon`
   - **USING expression:** `true`
   - **WITH CHECK expression:** `true`
6. Click **"Review"** then **"Save policy"**
7. Repeat for all 4 buckets

### Alternative: Use Policy Templates

Easier way:
1. Click on bucket → **Policies** tab
2. Click **"New Policy"**
3. Select template: **"Allow public access"**
4. This creates both SELECT and INSERT policies
5. Click **"Use this template"** → **"Save policy"**

### Step 5: Verify Setup

After creating all buckets:
1. You should see 4 buckets in the Storage page
2. Each should have a 🌐 icon (indicating public)
3. Each should have policies set up

### Step 6: Test Upload

1. Go back to your app: http://localhost:5174/museum-app/admin
2. Login with password: `museum2024`
3. Click **+ button** to add artifact
4. Try uploading an image
5. Should work now! ✅

---

## 🔍 Troubleshooting

### "Bucket not found" error
- Make sure bucket names are exactly: `artifacts`, `audio`, `videos`, `models`
- Make sure buckets are marked as **public**

### "Permission denied" error
- Check that policies are set up correctly
- Make sure INSERT operation is allowed
- Try using the "Allow public access" template

### "File too large" error
- Check bucket file size limits
- Default is usually 50MB, which should be enough

---

## ✅ Once Setup is Complete

You can:
- Upload images directly from admin panel
- Upload audio guides
- Upload videos (for future features)
- Upload 3D models (for AR/3D exhibits)

All files will be stored in Supabase and automatically get public URLs!


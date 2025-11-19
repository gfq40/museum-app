# Museum App - GitHub Pages Deployment Guide

## Prerequisites
- GitHub account: `gfq40` ✅
- Git installed ✅
- Node.js and npm installed ✅

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `museum-app`
3. Make it **Public** (required for free GitHub Pages)
4. **DO NOT** initialize with README, .gitignore, or license
5. Click "Create repository"

## Step 2: Push Code to GitHub

Run these commands in the terminal:

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit - Museum app with Ionic and Babylon.js"

# Add remote (replace with your actual repo URL)
git remote add origin https://github.com/gfq40/museum-app.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
- Build the production version
- Create a `gh-pages` branch
- Deploy to GitHub Pages automatically

## Step 4: Enable GitHub Pages

1. Go to your repository: https://github.com/gfq40/museum-app
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under "Source", select branch: `gh-pages`
5. Click **Save**

## Step 5: Access Your App

After a few minutes, your app will be live at:

**https://gfq40.github.io/museum-app/**

## Update and Redeploy

Whenever you make changes:

```bash
git add .
git commit -m "Your commit message"
git push
npm run deploy
```

## Important Notes

- ✅ **HTTPS**: GitHub Pages provides HTTPS automatically (required for AR features!)
- ✅ **Free**: Completely free hosting
- ✅ **Custom Domain**: You can add a custom domain later if you want
- ⚠️ **AR Testing**: AR features will work on mobile devices over HTTPS

## Troubleshooting

If the page shows 404:
1. Wait 2-3 minutes for GitHub Pages to build
2. Check Settings > Pages to see if it's enabled
3. Make sure the repository is Public

If styles are broken:
1. Check that `base: '/museum-app/'` is in vite.config.ts
2. Redeploy with `npm run deploy`

## Access from Smartphone

Once deployed, simply open your smartphone browser and go to:
**https://gfq40.github.io/museum-app/**

The app will work on any device with a modern browser! 📱✨


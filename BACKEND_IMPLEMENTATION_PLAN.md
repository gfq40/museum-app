# Museum App - Backend Implementation Plan

## Overview
This document outlines the complete plan for adding a Supabase backend to the Museum App.

---

## ✅ Phase 1: Database Setup (COMPLETED)

### What Was Done:
- ✅ Created comprehensive database schema design
- ✅ Created SQL migration file with all tables, indexes, and RLS policies
- ✅ Created seed data file with existing artifacts, 3D exhibits, and quiz questions
- ✅ Created detailed setup instructions for Supabase

### Files Created:
- `supabase/DATABASE_SCHEMA.md` - Complete schema documentation
- `supabase/migrations/001_initial_schema.sql` - Database structure
- `supabase/migrations/002_seed_data.sql` - Initial data
- `supabase/SETUP_INSTRUCTIONS.md` - Step-by-step setup guide

### Database Tables:
1. **artifacts** - Museum artifacts with multilingual content
2. **exhibits_3d** - 3D models and exhibits
3. **quiz_questions** - Quiz questions with multilingual content
4. **user_profiles** - Extended user information
5. **user_favorites** - User's favorite artifacts
6. **quiz_attempts** - Quiz history and scores
7. **user_badges** - Earned badges

### Next Action:
**Follow the setup instructions** in `supabase/SETUP_INSTRUCTIONS.md` to:
1. Create a Supabase project
2. Run the migration SQL files
3. Configure storage buckets
4. Get API credentials

---

## 📋 Phase 2: Connect Frontend to Database (NEXT)

### Goal:
Replace hardcoded data with Supabase queries.

### Tasks:
1. **Update Supabase service** (`src/services/supabase.ts`)
   - Add helper functions for fetching artifacts
   - Add helper functions for fetching 3D exhibits
   - Add helper functions for fetching quiz questions

2. **Update Gallery page** (`src/pages/Gallery.tsx`)
   - Replace hardcoded `galleryItems` with Supabase query
   - Add loading states
   - Add error handling
   - Implement real-time updates (optional)

3. **Update ArtifactDetail page** (`src/pages/ArtifactDetail.tsx`)
   - Replace hardcoded `artifactsData` with Supabase query
   - Fetch artifact by ID from database
   - Handle multilingual content

4. **Update Exhibits3D page** (`src/pages/Exhibits3D.tsx`)
   - Replace hardcoded `exhibits` array with Supabase query
   - Load model data from database

5. **Update Quiz page** (`src/pages/Quiz.tsx`)
   - Replace hardcoded `quizQuestions` with Supabase query
   - Fetch questions from database
   - Handle multilingual content

### Estimated Time: 4-5 hours

---

## 🔐 Phase 3: Authentication (AFTER PHASE 2)

### Goal:
Implement user login/signup with Supabase Auth.

### Tasks:
1. **Create Auth pages**
   - `src/pages/Login.tsx` - Login page
   - `src/pages/Signup.tsx` - Signup page
   - `src/pages/Profile.tsx` - User profile page

2. **Create Auth context** (`src/contexts/AuthContext.tsx`)
   - Manage authentication state
   - Provide login/logout functions
   - Handle session persistence

3. **Update App routing** (`src/App.tsx`)
   - Add routes for login/signup/profile
   - Add protected routes (optional)

4. **Update HamburgerMenu** (`src/components/HamburgerMenu.tsx`)
   - Add login/logout buttons
   - Show user profile link when logged in

5. **Add auth UI components**
   - Login form
   - Signup form
   - Password reset
   - Email verification

### Features:
- Email/password authentication
- Social login (Google, GitHub) - optional
- Password reset
- Email verification
- User profiles

### Estimated Time: 3-4 hours

---

## ☁️ Phase 4: Cloud Favorites (AFTER PHASE 3)

### Goal:
Move favorites from localStorage to Supabase database.

### Tasks:
1. **Update useFavorites hook** (`src/hooks/useFavorites.ts`)
   - Replace localStorage with Supabase queries
   - Add functions to add/remove favorites
   - Sync with database

2. **Implement real-time sync**
   - Use Supabase real-time subscriptions
   - Update UI when favorites change
   - Handle offline mode

3. **Migration strategy**
   - Migrate existing localStorage favorites to database
   - Handle users who aren't logged in (keep localStorage)

### Features:
- Favorites sync across devices
- Real-time updates
- Offline support with queue
- Migration from localStorage

### Estimated Time: 2-3 hours

---

## 📊 Phase 5: Quiz Progress Tracking (AFTER PHASE 4)

### Goal:
Save quiz attempts and implement badge system.

### Tasks:
1. **Update Quiz page** (`src/pages/Quiz.tsx`)
   - Save quiz attempts to database
   - Award badges based on performance
   - Show quiz history

2. **Create QuizHistory page** (`src/pages/QuizHistory.tsx`)
   - Display past quiz attempts
   - Show score trends
   - Display earned badges

3. **Create Badges page** (`src/pages/Badges.tsx`)
   - Display all available badges
   - Show earned badges
   - Show progress toward badges

4. **Implement badge logic**
   - Award badges automatically
   - Check for badge eligibility
   - Handle badge notifications

### Features:
- Save all quiz attempts
- Track score history
- Award badges (Scholar, Expert, Master, Perfect Score, Streaks)
- Leaderboards (optional)
- Progress analytics

### Estimated Time: 4-5 hours

---

## 👨‍💼 Phase 6: Admin Panel (AFTER PHASE 5)

### Goal:
Build content management dashboard for admins.

### Tasks:
1. **Create Admin pages**
   - `src/pages/admin/Dashboard.tsx` - Admin dashboard
   - `src/pages/admin/ArtifactsManager.tsx` - Manage artifacts
   - `src/pages/admin/ExhibitsManager.tsx` - Manage 3D exhibits
   - `src/pages/admin/QuizManager.tsx` - Manage quiz questions
   - `src/pages/admin/UsersManager.tsx` - View users (optional)

2. **Create Admin components**
   - `src/components/admin/ArtifactForm.tsx` - Add/edit artifacts
   - `src/components/admin/ExhibitForm.tsx` - Add/edit exhibits
   - `src/components/admin/QuizForm.tsx` - Add/edit questions
   - `src/components/admin/ImageUploader.tsx` - Upload images

3. **Implement admin routes**
   - Protected routes (admin only)
   - Admin navigation
   - Permission checks

4. **Add admin features**
   - CRUD operations for all content
   - Image upload to Supabase Storage
   - Bulk operations
   - Analytics dashboard

### Features:
- Add/edit/delete artifacts
- Add/edit/delete 3D exhibits
- Add/edit/delete quiz questions
- Upload images/audio/3D models
- View analytics
- Manage users (optional)

### Estimated Time: 5-6 hours

---

## 📈 Total Estimated Time

- **Phase 1:** Database Setup - ✅ COMPLETED (2 hours)
- **Phase 2:** Connect Frontend - 4-5 hours
- **Phase 3:** Authentication - 3-4 hours
- **Phase 4:** Cloud Favorites - 2-3 hours
- **Phase 5:** Quiz Progress - 4-5 hours
- **Phase 6:** Admin Panel - 5-6 hours

**Total: ~20-25 hours** (spread over 2-3 weeks)

---

## 🎯 Current Status

### ✅ Completed:
- [x] Phase 1: Database Setup
  - [x] Database schema design
  - [x] SQL migration files
  - [x] Seed data
  - [x] Setup instructions

### 🔄 In Progress:
- [ ] Phase 2: Connect Frontend to Database

### ⏳ Pending:
- [ ] Phase 3: Authentication
- [ ] Phase 4: Cloud Favorites
- [ ] Phase 5: Quiz Progress Tracking
- [ ] Phase 6: Admin Panel

---

## 🚀 Next Steps

### Immediate (Do Now):
1. **Follow `supabase/SETUP_INSTRUCTIONS.md`** to set up Supabase
2. **Create Supabase project** at https://supabase.com
3. **Run migration SQL files** in Supabase SQL Editor
4. **Get API credentials** and add to `.env.local`
5. **Test connection** by starting dev server

### After Setup:
1. Start Phase 2: Connect Frontend to Database
2. Update Gallery page to fetch from Supabase
3. Test with real data
4. Proceed to Phase 3

---

## 💡 Tips

### Development Workflow:
1. **Test locally first** - Use Supabase local development (optional)
2. **Use Supabase Studio** - Visual database editor
3. **Check RLS policies** - Ensure security is correct
4. **Monitor API usage** - Stay within free tier limits
5. **Backup regularly** - Export database periodically

### Best Practices:
- **Use TypeScript types** - Define interfaces for all data
- **Handle errors gracefully** - Show user-friendly messages
- **Add loading states** - Improve UX during data fetching
- **Implement caching** - Reduce API calls
- **Test RLS policies** - Ensure users can only access their data

### Security:
- **Never commit API keys** - Use `.env.local` and `.gitignore`
- **Use RLS policies** - Protect data at database level
- **Validate input** - Sanitize user input
- **Use HTTPS** - Always use secure connections
- **Limit file uploads** - Set size and type restrictions

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime)

---

## 🎉 Benefits After Completion

### For Users:
- ✅ Personalized experience with accounts
- ✅ Favorites sync across devices
- ✅ Quiz progress tracking
- ✅ Badges and achievements
- ✅ Always up-to-date content

### For You:
- ✅ Easy content management (no code changes needed)
- ✅ Scalable architecture
- ✅ Real-time updates
- ✅ User analytics
- ✅ Professional portfolio piece

### For Museums:
- ✅ Self-service content management
- ✅ No technical knowledge required
- ✅ Multi-language support
- ✅ User engagement metrics
- ✅ White-label ready

---

**Ready to proceed? Start with the setup instructions!** 🚀


# 🚀 Complete Deployment Guide: GitHub → Netlify

## Overview
This guide will walk you through deploying your LMS application to Netlify using GitHub for version control.

## 📋 Prerequisites

1. **GitHub Account**: [github.com](https://github.com)
2. **Netlify Account**: [netlify.com](https://netlify.com)
3. **Git installed on your computer**

## 🏗️ Step 1: Prepare Your Local Project

### 1.1 Create Project Directory
```bash
# Create a new directory for your LMS project
mkdir lms-platform
cd lms-platform

# Initialize git repository
git init
```

### 1.2 Copy Project Files
Copy all files from the current workspace to your local project directory:
- `package.json`
- `vite.config.ts`
- `tailwind.config.js`
- `postcss.config.js`
- `tsconfig.json`
- `index.html`
- `src/` directory (all React components)
- `public/` directory (assets)
- `docs/` directory (documentation)
- `supabase/` directory (database types)
- `netlify.toml` (deployment config)
- `.env.example` (environment template)

### 1.3 Install Dependencies
```bash
# Install project dependencies
npm install

# Optional: Install additional dev tools
npm install -g @vitejs/app
```

### 1.4 Environment Setup
```bash
# Copy environment template
cp .env.example .env.local

# Update .env.local with your Supabase credentials
# (The .env.example already has your working credentials)
```

## 🌐 Step 2: Create GitHub Repository

### 2.1 Create Repository on GitHub
1. Go to [github.com](https://github.com) and sign in
2. Click "New repository" (green button)
3. Name: `lms-platform`
4. Description: `Free Unlimited Learning Management System`
5. Set to **Public** (required for free Netlify hosting)
6. Check "Add a README file"
7. Click "Create repository"

### 2.2 Add Files to Git Repository
```bash
# Add all project files
git add .

# Create initial commit
git commit -m "Initial LMS platform setup with Supabase backend"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/lms-platform.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🚀 Step 3: Deploy to Netlify

### 3.1 Connect GitHub to Netlify
1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "New site from Git"
3. Choose "GitHub"
4. **Authorize Netlify** to access your GitHub account
5. Select your `lms-platform` repository
6. Click "Deploy site"

### 3.2 Configure Build Settings
Netlify should auto-detect these settings:
- **Base directory**: (leave empty)
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Functions directory**: (leave empty)

Click "Deploy site"

### 3.3 Environment Variables Setup
1. In Netlify dashboard, go to **Site settings** → **Environment variables**
2. Add each variable from `.env.example`:
   - `VITE_SUPABASE_URL` = `https://jznmqmxgkvwowdbwshuo.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (full key from .env.example)
   - `VITE_CREATE_PROFILE_URL` = `https://jznmqmxgkvwowdbwshuo.supabase.co/functions/v1/create-user-profile`
   - `VITE_ENROLL_COURSE_URL` = `https://jznmqmxgkvwowdbwshuo.supabase.co/functions/v1/enroll-course`
   - `VITE_UPDATE_PROGRESS_URL` = `https://jznmqmxgkvwowdbwshuo.supabase.co/functions/v1/update-lesson-progress`
   - `VITE_UPLOAD_FILE_URL` = `https://jznmqmxgkvwowdbwshuo.supabase.co/functions/v1/upload-course-file`

3. Click **Deploy site** to rebuild with environment variables

### 3.4 Custom Domain (Optional)
1. In Netlify dashboard, go to **Domain settings**
2. Click "Add custom domain"
3. Enter your domain name
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-60 minutes)

## ✅ Step 4: Verify Deployment

### 4.1 Check Application
1. Visit your Netlify URL (e.g., `https://amazing-app-123456.netlify.app`)
2. Test basic functionality:
   - Landing page loads correctly
   - Navigation works
   - Authentication (sign up/login)
   - Course browsing

### 4.2 Test Authentication
```bash
# Create a test account through the deployed app
# Or use existing test credentials:
# Email: student@test.com
# Password: test123456
```

### 4.3 Test Core Features
- ✅ User registration and login
- ✅ Course catalog browsing
- ✅ Course enrollment
- ✅ Lesson viewing
- ✅ Progress tracking
- ✅ File uploads (images/videos)

## 🔄 Step 5: Continuous Deployment

### 5.1 Automatic Deployments
Every time you push to GitHub:
```bash
# Make changes to your code
git add .
git commit -m "Update feature X"
git push origin main
```

Netlify will automatically:
1. Detect the push
2. Run build process
3. Deploy to production
4. Send you notification

### 5.2 Deploy Preview (Pull Requests)
When creating pull requests, Netlify creates preview deployments for testing before merging to main.

## 🔧 Step 6: Troubleshooting

### Common Issues

**Build Fails:**
```bash
# Check build logs in Netlify dashboard
# Common fixes:
npm run build  # Test locally first
rm -rf node_modules package-lock.json
npm install
```

**Environment Variables Not Working:**
1. Ensure all variables start with `VITE_`
2. Check variable names match exactly
3. Redeploy after adding environment variables

**Routes Not Working:**
- Ensure `_redirects` file is in `dist/` folder
- Check `netlify.toml` configuration

**Supabase Connection Issues:**
1. Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
2. Check Supabase project status
3. Test connection in browser dev tools

### Debug Commands
```bash
# Test build locally
npm run build
npm run preview

# Check environment variables
echo $VITE_SUPABASE_URL

# Test git connection
git status
git log --oneline -5
```

## 📊 Step 7: Monitor & Optimize

### 7.1 Analytics
- **Netlify Analytics**: Available in dashboard
- **Google Analytics**: Add tracking code if needed
- **Supabase Dashboard**: Monitor database usage

### 7.2 Performance Optimization
- Enable Netlify's image optimization
- Use Netlify's caching headers
- Monitor Core Web Vitals
- Optimize bundle size

### 7.3 Security
- Environment variables are secured on Netlify
- HTTPS is automatically enabled
- Regular security headers in `netlify.toml`

## 🎯 Step 8: Go Live Checklist

- [ ] GitHub repository created and populated
- [ ] Netlify deployment successful
- [ ] Environment variables configured
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] All core features tested
- [ ] Authentication working
- [ ] Course creation/enrollment tested
- [ ] File uploads working
- [ ] Mobile responsiveness verified
- [ ] Performance optimized

## 🆘 Support

If you encounter issues:
1. Check Netlify build logs
2. Verify GitHub repository setup
3. Test environment variables
4. Review this deployment guide
5. Check Supabase project status

## 🎉 Success!

Once complete, your LMS platform will be:
- ✅ **Live and accessible** worldwide
- ✅ **Secure** with HTTPS and proper authentication
- ✅ **Scalable** with Netlify's CDN
- ✅ **Professional** with your custom domain
- ✅ **Automated** with continuous deployment

**Your free LMS platform is ready to serve thousands of learners worldwide!** 🚀
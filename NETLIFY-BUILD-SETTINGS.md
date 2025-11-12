# ⚙️ Netlify Build Settings Configuration - EduFlow LMS

## 🎯 Correct Build Settings for EduFlow LMS

Since your EduFlow LMS uses **Supabase as the backend**, here's the correct configuration:

### Build Settings Configuration

| Field | Value | Explanation |
|-------|-------|-------------|
| **Branch to deploy** | `main` | Deploy from main branch |
| **Build command** | `cd lms-landing && npm run build` | Build React/Vite frontend |
| **Publish directory** | `lms-landing/dist` | Static files output |
| **Functions directory** | **LEAVE EMPTY** ❌ | No Netlify Functions needed |
| **Node version** | `18` or `20` | Node.js runtime |

### 🚫 Why Functions Directory Should Be Empty

Your LMS architecture:
- **Frontend:** React + Vite (deploys to Netlify)
- **Backend:** Supabase (database, auth, edge functions, storage)
- **Edge Functions:** Already deployed to Supabase, not Netlify

### ✅ What Actually Runs Where

**Netlify (Frontend):**
- Landing page
- User authentication UI
- Dashboard pages
- Course catalog
- User profiles

**Supabase (Backend):**
- Database tables (9 tables)
- User authentication
- Edge functions (4 functions)
- File storage (4 buckets)
- Real-time features

### 🔧 If You See Other Options

When setting up in Netlify, you might see additional fields:

| Field | Value | Notes |
|-------|-------|-------|
| **Framework preset** | Vite | Auto-detected from repository |
| **Build status** | Active | Keep enabled |
| **Deploys** | Always deploy when ready | Recommended |

### 📝 Step-by-Step Netlify Setup

1. **Repository Selection:** ✅ Smart-freelms/EduFlow
2. **Branch:** ✅ main
3. **Build command:** ✅ `cd lms-landing && npm run build`
4. **Publish directory:** ✅ `lms-landing/dist`
5. **Functions directory:** ✅ **LEAVE EMPTY**
6. **Node version:** ✅ 18 or 20
7. **Environment Variables:** ✅ Add the 2 Supabase variables
8. **Deploy:** ✅ Click "Deploy site"

### 🏗️ Why This Works

Your application follows a **JAMstack architecture**:
- **J**avaScript (React frontend)
- **A**PIs (Supabase backend)
- **M**arkup (Static site generation)

Netlify hosts the static frontend, while Supabase handles all backend operations.

### ⚠️ Common Mistakes to Avoid

❌ **Don't set Functions directory** to:
- `supabase/functions` (these are Supabase Edge Functions)
- `lms-landing/functions` (no Netlify Functions in project)
- Any other folder

✅ **Keep Functions directory empty** - let Netlify know this is a static site that uses external APIs (Supabase)

---

*This configuration ensures optimal performance and cost-effectiveness for your EduFlow LMS!*
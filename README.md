# 🎓 LMS Platform - Free Unlimited Learning Management System

A modern, full-featured Learning Management System built with React, TypeScript, and Supabase. **Completely free** to use with unlimited access to all features.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/lms-platform)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

### 🔐 **User Authentication**
- Secure email/password authentication
- Role-based access (Student, Instructor, Admin)
- Profile management and password reset
- Session management with Supabase Auth

### 🎓 **Course Management**
- **For Instructors:**
  - Create and publish courses
  - Upload videos, documents, and images
  - Organize lessons with ordering
  - Track student progress and analytics
  - Manage course pricing (free/paid)

- **For Students:**
  - Browse comprehensive course catalog
  - Enroll in courses instantly
  - Track learning progress
  - Watch video lessons
  - Complete assessments

### 📱 **Modern User Experience**
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Fast Loading**: Optimized with Vite build system
- **Accessibility**: WCAG 2.1 AA compliant
- **Real-time Updates**: Live progress tracking
- **File Upload**: Drag-and-drop course materials

### 🚀 **Technical Excellence**
- **React 18** with TypeScript
- **Supabase** for backend services
- **TailwindCSS** for styling
- **Modern Minimalism Premium** design
- **PWA Ready** for mobile installation

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React SPA     │────│  Supabase API   │────│   PostgreSQL    │
│   (Frontend)    │    │   (Backend)     │    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Netlify CDN    │    │  Edge Functions │    │  Storage Buckets│
│   (Hosting)     │    │   (Business     │    │   (Files &      │
│                 │    │    Logic)       │    │    Media)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Git
- GitHub account
- Netlify account

### 1. Clone & Setup
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/lms-platform.git
cd lms-platform

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### 2. Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 3. Deploy
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/lms-platform)

See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for detailed deployment instructions.

## 📚 Usage

### Getting Started

1. **Visit your deployed application**
2. **Create an account** (Student or Instructor role)
3. **For Students:**
   - Browse courses in the catalog
   - Enroll in courses that interest you
   - Track your learning progress
   - Complete lessons and assessments

4. **For Instructors:**
   - Go to Dashboard → Create New Course
   - Upload course materials (videos, documents, images)
   - Organize lessons in logical order
   - Publish your course when ready

### Key Pages
- **Landing Page** (`/`): Course catalog and platform overview
- **Authentication** (`/signup`, `/login`): User registration and login
- **Student Dashboard** (`/dashboard`): Enrolled courses and progress
- **Instructor Dashboard** (`/instructor`): Course creation and management
- **Course Details** (`/course/:id`): Course information and enrollment
- **Lesson Player** (`/course/:id/lesson/:lessonId`): Video lessons with progress
- **Profile** (`/profile`): Account settings and management

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching

### Backend
- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Relational database
- **Row Level Security (RLS)** - Database security
- **Edge Functions** - Serverless functions for business logic
- **Supabase Storage** - File storage for media

### DevOps & Deployment
- **Netlify** - Frontend hosting and CDN
- **GitHub** - Version control and CI/CD
- **Environment Variables** - Secure configuration management

## 📁 Project Structure

```
lms-platform/
├── public/                 # Static assets
│   ├── vite.svg
│   └── favicon.ico
├── src/                    # Source code
│   ├── components/         # Reusable components
│   ├── pages/             # Route pages
│   ├── hooks/             # Custom React hooks
│   ├── context/           # React context providers
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript types
│   └── lib/               # Third-party integrations
├── docs/                   # Documentation
├── supabase/               # Database schema and types
├── netlify.toml           # Netlify configuration
├── .env.example           # Environment variables template
└── package.json           # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Edge Function URLs
VITE_CREATE_PROFILE_URL=your_create_profile_function_url
VITE_ENROLL_COURSE_URL=your_enroll_course_function_url
VITE_UPDATE_PROGRESS_URL=your_update_progress_function_url
VITE_UPLOAD_FILE_URL=your_upload_file_function_url
```

### Database Schema
The LMS uses the following main tables:
- `profiles` - User profiles and roles
- `categories` - Course categories
- `courses` - Course information and metadata
- `lessons` - Individual lessons within courses
- `enrollments` - Student course enrollments
- `lesson_progress` - Individual lesson completion tracking

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and authentication
- [ ] Course creation and publishing
- [ ] Course enrollment and browsing
- [ ] Lesson viewing and progress tracking
- [ ] File uploads (images, videos, documents)
- [ ] Profile management
- [ ] Mobile responsiveness
- [ ] Error handling

### Test Accounts
```
# Student Account
Email: student@test.com
Password: test123456

# Instructor Account  
Email: instructor@test.com
Password: test123456
```

## 🚀 Performance

### Optimization Features
- **Code Splitting** - Automatic route-based splitting
- **Image Optimization** - Optimized images with proper formats
- **Lazy Loading** - Components and images load on demand
- **Caching** - Proper HTTP caching headers
- **CDN** - Global content delivery via Netlify

### Core Web Vitals
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

## 🔒 Security

### Security Measures
- **HTTPS** - All traffic encrypted
- **Authentication** - Secure user sessions
- **Row Level Security** - Database-level access control
- **Input Validation** - Client and server-side validation
- **Environment Variables** - Secure configuration management
- **CORS** - Proper cross-origin resource sharing

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** - Amazing backend platform
- **Netlify** - Excellent hosting and deployment
- **React Team** - Fantastic framework
- **Tailwind CSS** - Powerful styling system

## 📞 Support

- **Documentation**: Check the `docs/` directory
- **Issues**: Use GitHub Issues for bug reports
- **Discussions**: Use GitHub Discussions for questions
- **Email**: [Your contact email]

## 🗺️ Roadmap

### Upcoming Features
- [ ] Real-time chat and messaging
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Offline course access
- [ ] Multi-language support
- [ ] Advanced assessment features
- [ ] Integration with external tools
- [ ] White-label solutions

---

**Made with ❤️ by [Your Name]**

**Deploy your own LMS platform in minutes and start educating the world!** 🚀
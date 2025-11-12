import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import CourseCatalog from './pages/course/CourseCatalog';
import CourseDetailPage from './pages/course/CourseDetailPage';
import LessonPlayer from './pages/course/LessonPlayer';
import CreateCoursePage from './pages/instructor/CreateCoursePage';
import EditCoursePage from './pages/instructor/EditCoursePage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/courses" element={<CourseCatalog />} />
          <Route path="/courses/:courseId" element={<CourseDetailPage />} />
          
          {/* Auth routes - redirect to dashboard if already logged in */}
          <Route
            path="/login"
            element={
              <ProtectedRoute requireAuth={false}>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute requireAuth={false}>
                <SignupPage />
              </ProtectedRoute>
            }
          />
          
          {/* Protected routes - require authentication */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:courseId/lessons/:lessonId"
            element={
              <ProtectedRoute>
                <LessonPlayer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/create-course"
            element={
              <ProtectedRoute>
                <CreateCoursePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/courses/:courseId/edit"
            element={
              <ProtectedRoute>
                <EditCoursePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

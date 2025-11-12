import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { BookOpen, Users, TrendingUp } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  enrollment_count: number;
  is_published: boolean;
}

export default function InstructorDashboard() {
  const { user, signOut } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!user) return;

      try {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
        
        setProfile(profileData);

        const { data: coursesData } = await supabase
          .from('courses')
          .select('*')
          .eq('instructor_id', user.id)
          .order('created_at', { ascending: false });

        setCourses(coursesData || []);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user]);

  const totalEnrollments = courses.reduce((sum, course) => sum + (course.enrollment_count || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-page">
      <nav className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-primary-500">
              LMS Platform
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/courses" className="text-neutral-700 hover:text-neutral-900">
                Browse Courses
              </Link>
              <Link to="/profile" className="text-neutral-700 hover:text-neutral-900">
                Profile
              </Link>
              <button
                onClick={() => signOut()}
                className="text-neutral-700 hover:text-neutral-900"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Instructor Dashboard
          </h1>
          <p className="text-lg text-neutral-700">Welcome back, {profile?.full_name || 'Instructor'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary-50 p-3 rounded-xl">
                <BookOpen className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-900">{courses.length}</div>
                <div className="text-sm text-neutral-600">Total Courses</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary-50 p-3 rounded-xl">
                <Users className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-900">{totalEnrollments}</div>
                <div className="text-sm text-neutral-600">Total Students</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary-50 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-900">
                  {courses.filter(c => c.is_published).length}
                </div>
                <div className="text-sm text-neutral-600">Published</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-900">My Courses</h2>
            <Link
              to="/instructor/create-course"
              className="bg-primary-500 text-white py-2 px-6 rounded-xl font-semibold hover:bg-primary-600 transition-all"
            >
              Create New Course
            </Link>
          </div>

          {courses.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-card p-12 text-center">
              <BookOpen className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                No courses created yet
              </h3>
              <p className="text-neutral-600 mb-6">
                Start sharing your knowledge by creating your first course
              </p>
              <Link
                to="/instructor/create-course"
                className="inline-block bg-primary-500 text-white py-3 px-8 rounded-xl font-semibold hover:bg-primary-600 transition-all"
              >
                Create Course
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow-card overflow-hidden"
                >
                  <div className="aspect-video bg-neutral-100">
                    {course.thumbnail_url && (
                      <img
                        src={course.thumbnail_url}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          course.is_published
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {course.is_published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-neutral-600">
                        {course.enrollment_count || 0} students
                      </div>
                      <Link
                        to={`/instructor/courses/${course.id}/edit`}
                        className="text-primary-500 font-medium hover:text-primary-600"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

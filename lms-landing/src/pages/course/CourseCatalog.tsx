import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Search, Filter } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  enrollment_count: number;
  duration_hours: number;
  difficulty_level: string;
  price: number;
}

export default function CourseCatalog() {
  const { user, signOut } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      try {
        const { data } = await supabase
          .from('courses')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false });

        setCourses(data || []);
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background-page">
      <nav className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-primary-500">
              LMS Platform
            </Link>
            <div className="flex items-center gap-6">
              {user ? (
                <>
                  <Link to="/dashboard" className="text-neutral-700 hover:text-neutral-900">
                    Dashboard
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
                </>
              ) : (
                <>
                  <Link to="/login" className="text-neutral-700 hover:text-neutral-900">
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-primary-500 text-white py-2 px-6 rounded-xl font-semibold hover:bg-primary-600 transition-all"
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">Explore Courses</h1>
          <p className="text-lg text-neutral-700">Discover your next learning adventure</p>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search courses..."
                className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-card p-12 text-center">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">No courses found</h3>
            <p className="text-neutral-600">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover transform hover:-translate-y-1 transition-all duration-250"
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
                    {course.difficulty_level && (
                      <span className="text-xs px-2 py-1 bg-primary-50 text-primary-700 rounded-full font-medium">
                        {course.difficulty_level}
                      </span>
                    )}
                    {course.price === 0 && (
                      <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full font-medium">
                        Free
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-neutral-600">
                    <span>{course.enrollment_count || 0} students</span>
                    {course.duration_hours && <span>{course.duration_hours}h</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

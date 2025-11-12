import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { BookOpen, Clock, Award } from 'lucide-react';

interface EnrolledCourse {
  id: string;
  course_id: string;
  progress_percentage: number;
  course?: {
    title: string;
    description: string;
    thumbnail_url: string;
    instructor_id: string;
  };
}

export default function StudentDashboard() {
  const { user, signOut } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!user) return;

      try {
        // Load profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
        
        setProfile(profileData);

        // Load enrolled courses
        const { data: enrollmentsData } = await supabase
          .from('enrollments')
          .select('id, course_id, progress_percentage')
          .eq('student_id', user.id)
          .order('enrolled_at', { ascending: false });

        if (enrollmentsData && enrollmentsData.length > 0) {
          // Manually fetch course details
          const courseIds = enrollmentsData.map(e => e.course_id);
          const { data: coursesData } = await supabase
            .from('courses')
            .select('id, title, description, thumbnail_url, instructor_id')
            .in('id', courseIds);

          // Combine data
          const enrichedEnrollments = enrollmentsData.map(enrollment => ({
            ...enrollment,
            course: coursesData?.find(c => c.id === enrollment.course_id)
          }));

          setEnrolledCourses(enrichedEnrollments);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user]);

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
            Welcome back, {profile?.full_name || 'Student'}
          </h1>
          <p className="text-lg text-neutral-700">Continue your learning journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary-50 p-3 rounded-xl">
                <BookOpen className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-900">{enrolledCourses.length}</div>
                <div className="text-sm text-neutral-600">Enrolled Courses</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary-50 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-900">
                  {enrolledCourses.filter(e => e.progress_percentage > 0 && e.progress_percentage < 100).length}
                </div>
                <div className="text-sm text-neutral-600">In Progress</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary-50 p-3 rounded-xl">
                <Award className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-900">
                  {enrolledCourses.filter(e => e.progress_percentage === 100).length}
                </div>
                <div className="text-sm text-neutral-600">Completed</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-900">My Courses</h2>
            <Link
              to="/courses"
              className="text-primary-500 font-medium hover:text-primary-600"
            >
              Browse more courses
            </Link>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-card p-12 text-center">
              <BookOpen className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                No courses enrolled yet
              </h3>
              <p className="text-neutral-600 mb-6">
                Start your learning journey by enrolling in a course
              </p>
              <Link
                to="/courses"
                className="inline-block bg-primary-500 text-white py-3 px-8 rounded-xl font-semibold hover:bg-primary-600 transition-all"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((enrollment) => (
                <Link
                  key={enrollment.id}
                  to={`/courses/${enrollment.course_id}`}
                  className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover transform hover:-translate-y-1 transition-all duration-250"
                >
                  <div className="aspect-video bg-neutral-100">
                    {enrollment.course?.thumbnail_url && (
                      <img
                        src={enrollment.course.thumbnail_url}
                        alt={enrollment.course.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {enrollment.course?.title || 'Loading...'}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                      {enrollment.course?.description || ''}
                    </p>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-neutral-600">Progress</span>
                        <span className="font-medium text-neutral-900">
                          {enrollment.progress_percentage}%
                        </span>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-500 transition-all"
                          style={{ width: `${enrollment.progress_percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

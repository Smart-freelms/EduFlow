import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Clock, Users, BookOpen, Play } from 'lucide-react';

interface CourseDetail {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  enrollment_count: number;
  duration_hours: number;
  difficulty_level: string;
  price: number;
  instructor_id: string;
}

interface Lesson {
  id: string;
  title: string;
  duration_minutes: number;
  order_index: number;
}

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourse() {
      if (!courseId) return;

      try {
        const { data: courseData } = await supabase
          .from('courses')
          .select('*')
          .eq('id', courseId)
          .maybeSingle();

        if (courseData) {
          setCourse(courseData);

          const { data: lessonsData } = await supabase
            .from('lessons')
            .select('id, title, duration_minutes, order_index')
            .eq('course_id', courseId)
            .eq('is_published', true)
            .order('order_index', { ascending: true });

          setLessons(lessonsData || []);

          if (user) {
            const { data: enrollmentData } = await supabase
              .from('enrollments')
              .select('id')
              .eq('student_id', user.id)
              .eq('course_id', courseId)
              .maybeSingle();

            setIsEnrolled(!!enrollmentData);
          }
        }
      } catch (error) {
        console.error('Error loading course:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCourse();
  }, [courseId, user]);

  async function handleEnroll() {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!courseId) return;

    setEnrolling(true);
    try {
      const { error } = await supabase.functions.invoke('enroll-course', {
        body: { courseId, studentId: user.id },
      });

      if (error) throw error;

      setIsEnrolled(true);
      navigate(`/courses/${courseId}/lessons/${lessons[0]?.id}`);
    } catch (error) {
      console.error('Enrollment error:', error);
      alert('Failed to enroll in course');
    } finally {
      setEnrolling(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Course not found</h2>
          <Link to="/courses" className="text-primary-500 hover:text-primary-600">
            Browse courses
          </Link>
        </div>
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
              {user && (
                <Link to="/dashboard" className="text-neutral-700 hover:text-neutral-900">
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="aspect-video bg-neutral-100 rounded-2xl overflow-hidden mb-6">
              {course.thumbnail_url && (
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <h1 className="text-4xl font-bold text-neutral-900 mb-4">{course.title}</h1>

            <div className="flex items-center gap-6 mb-6 text-neutral-600">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{course.enrollment_count || 0} students</span>
              </div>
              {course.duration_hours && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration_hours} hours</span>
                </div>
              )}
              {course.difficulty_level && (
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{course.difficulty_level}</span>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-card p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">About this course</h2>
              <p className="text-neutral-700 leading-relaxed">{course.description}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">Course Content</h2>
              {lessons.length === 0 ? (
                <p className="text-neutral-600">No lessons available yet</p>
              ) : (
                <div className="space-y-3">
                  {lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl hover:border-neutral-300 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-neutral-100 rounded-lg p-2">
                          <Play className="w-5 h-5 text-neutral-600" />
                        </div>
                        <div>
                          <div className="font-medium text-neutral-900">
                            {index + 1}. {lesson.title}
                          </div>
                          {lesson.duration_minutes && (
                            <div className="text-sm text-neutral-600">
                              {lesson.duration_minutes} minutes
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-card p-8 sticky top-8">
              <div className="mb-6">
                {course.price === 0 ? (
                  <div className="text-4xl font-bold text-primary-500 mb-2">Free</div>
                ) : (
                  <div className="text-4xl font-bold text-neutral-900 mb-2">
                    ${course.price}
                  </div>
                )}
                <div className="text-neutral-600">Full lifetime access</div>
              </div>

              {isEnrolled ? (
                <Link
                  to={`/courses/${courseId}/lessons/${lessons[0]?.id}`}
                  className="block w-full bg-primary-500 text-white py-4 px-6 rounded-xl font-semibold text-center hover:bg-primary-600 transition-all"
                >
                  Continue Learning
                </Link>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full bg-primary-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </button>
              )}

              <div className="mt-6 pt-6 border-t border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-4">This course includes:</h3>
                <ul className="space-y-3 text-sm text-neutral-700">
                  <li className="flex items-start gap-2">
                    <BookOpen className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span>{lessons.length} lessons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span>Self-paced learning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span>Certificate of completion</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

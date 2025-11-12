import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  content: string;
  video_url: string;
  duration_minutes: number;
  order_index: number;
  course_id: string;
}

interface LessonProgress {
  completed: boolean;
}

export default function LessonPlayer() {
  const { courseId, lessonId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<LessonProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [markingComplete, setMarkingComplete] = useState(false);

  useEffect(() => {
    async function loadLesson() {
      if (!courseId || !lessonId || !user) return;

      try {
        const { data: lessonData } = await supabase
          .from('lessons')
          .select('*')
          .eq('id', lessonId)
          .maybeSingle();

        if (lessonData) {
          setLesson(lessonData);

          const { data: allLessons } = await supabase
            .from('lessons')
            .select('id, title, order_index, course_id, duration_minutes, content, video_url')
            .eq('course_id', courseId)
            .eq('is_published', true)
            .order('order_index', { ascending: true});

          setLessons(allLessons || []);

          const { data: progressData } = await supabase
            .from('lesson_progress')
            .select('completed')
            .eq('lesson_id', lessonId)
            .eq('student_id', user.id)
            .maybeSingle();

          setProgress(progressData);
        }
      } catch (error) {
        console.error('Error loading lesson:', error);
      } finally {
        setLoading(false);
      }
    }

    loadLesson();
  }, [courseId, lessonId, user]);

  async function handleMarkComplete() {
    if (!user || !lessonId) return;

    setMarkingComplete(true);
    try {
      await supabase.functions.invoke('update-lesson-progress', {
        body: {
          studentId: user.id,
          lessonId,
          completed: true,
        },
      });

      setProgress({ completed: true });

      // Navigate to next lesson if available
      const currentIndex = lessons.findIndex(l => l.id === lessonId);
      if (currentIndex < lessons.length - 1) {
        const nextLesson = lessons[currentIndex + 1];
        navigate(`/courses/${courseId}/lessons/${nextLesson.id}`);
      }
    } catch (error) {
      console.error('Error marking complete:', error);
    } finally {
      setMarkingComplete(false);
    }
  }

  const currentIndex = lessons.findIndex(l => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Lesson not found</h2>
          <Link to={`/courses/${courseId}`} className="text-primary-500 hover:text-primary-600">
            Back to course
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
            <Link to={`/courses/${courseId}`} className="text-primary-500 hover:text-primary-600">
              Back to Course
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/dashboard" className="text-neutral-700 hover:text-neutral-900">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-card overflow-hidden mb-6">
          {lesson.video_url ? (
            <div className="aspect-video bg-black">
              <video
                src={lesson.video_url}
                controls
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="aspect-video bg-neutral-100 flex items-center justify-center">
              <p className="text-neutral-500">No video available</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-card p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">{lesson.title}</h1>
              {lesson.duration_minutes && (
                <p className="text-neutral-600">{lesson.duration_minutes} minutes</p>
              )}
            </div>
            {!progress?.completed && (
              <button
                onClick={handleMarkComplete}
                disabled={markingComplete}
                className="flex items-center gap-2 bg-primary-500 text-white py-2 px-6 rounded-xl font-semibold hover:bg-primary-600 transition-all disabled:opacity-50"
              >
                <CheckCircle className="w-5 h-5" />
                Mark Complete
              </button>
            )}
            {progress?.completed && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Completed</span>
              </div>
            )}
          </div>

          {lesson.content && (
            <div className="prose max-w-none">
              <div className="text-neutral-700 leading-relaxed whitespace-pre-wrap">
                {lesson.content}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          {prevLesson ? (
            <Link
              to={`/courses/${courseId}/lessons/${prevLesson.id}`}
              className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous Lesson</span>
            </Link>
          ) : (
            <div></div>
          )}

          {nextLesson ? (
            <Link
              to={`/courses/${courseId}/lessons/${nextLesson.id}`}
              className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 transition-all"
            >
              <span>Next Lesson</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              to={`/courses/${courseId}`}
              className="text-primary-500 font-medium hover:text-primary-600"
            >
              Back to Course
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

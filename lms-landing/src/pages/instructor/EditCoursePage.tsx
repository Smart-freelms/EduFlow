import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Plus, Edit2, Trash2, Eye, Upload } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration_minutes: number;
  order_index: number;
  is_published: boolean;
}

export default function EditCoursePage() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [lessonDuration, setLessonDuration] = useState(0);
  const [lessonVideoFile, setLessonVideoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCourse();
  }, [courseId, user]);

  async function loadCourse() {
    if (!courseId || !user) return;

    try {
      const { data: courseData } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .eq('instructor_id', user.id)
        .maybeSingle();

      if (!courseData) {
        navigate('/dashboard');
        return;
      }

      setCourse(courseData);

      const { data: lessonsData } = await supabase
        .from('lessons')
        .select('id, title, duration_minutes, order_index, is_published')
        .eq('course_id', courseId)
        .order('order_index', { ascending: true });

      setLessons(lessonsData || []);
    } catch (error) {
      console.error('Error loading course:', error);
    } finally {
      setLoading(false);
    }
  }

  function openLessonModal(lesson?: Lesson) {
    if (lesson) {
      setEditingLesson(lesson);
      setLessonTitle(lesson.title);
      setLessonDuration(lesson.duration_minutes);
    } else {
      setEditingLesson(null);
      setLessonTitle('');
      setLessonContent('');
      setLessonDuration(0);
      setLessonVideoFile(null);
    }
    setShowLessonModal(true);
    setError('');
  }

  async function handleSaveLesson(e: React.FormEvent) {
    e.preventDefault();
    if (!courseId) return;

    setSaving(true);
    setError('');

    try {
      let videoUrl = '';

      // Upload video if provided
      if (lessonVideoFile) {
        const fileExt = lessonVideoFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('course-videos')
          .upload(fileName, lessonVideoFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('course-videos')
          .getPublicUrl(fileName);

        videoUrl = publicUrl;
      }

      if (editingLesson) {
        // Update existing lesson
        const updateData: any = {
          title: lessonTitle,
          duration_minutes: lessonDuration,
        };
        if (videoUrl) updateData.video_url = videoUrl;
        if (lessonContent) updateData.content = lessonContent;

        const { error: updateError } = await supabase
          .from('lessons')
          .update(updateData)
          .eq('id', editingLesson.id);

        if (updateError) throw updateError;
      } else {
        // Create new lesson
        const nextOrder = lessons.length > 0 ? Math.max(...lessons.map(l => l.order_index)) + 1 : 1;

        const { error: insertError } = await supabase
          .from('lessons')
          .insert({
            course_id: courseId,
            title: lessonTitle,
            content: lessonContent,
            video_url: videoUrl,
            duration_minutes: lessonDuration,
            order_index: nextOrder,
            is_published: false,
          });

        if (insertError) throw insertError;
      }

      await loadCourse();
      setShowLessonModal(false);
    } catch (err: any) {
      setError(err.message || 'Failed to save lesson');
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteLesson(lessonId: string) {
    if (!confirm('Are you sure you want to delete this lesson?')) return;

    try {
      const { error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', lessonId);

      if (error) throw error;

      await loadCourse();
    } catch (err: any) {
      alert(err.message || 'Failed to delete lesson');
    }
  }

  async function handleTogglePublish() {
    if (!courseId || !course) return;

    try {
      const { error } = await supabase
        .from('courses')
        .update({ is_published: !course.is_published })
        .eq('id', courseId);

      if (error) throw error;

      setCourse({ ...course, is_published: !course.is_published });
    } catch (err: any) {
      alert(err.message || 'Failed to update course status');
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
          <Link to="/dashboard" className="text-primary-500 hover:text-primary-600">
            Back to Dashboard
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
              <Link to="/dashboard" className="text-neutral-700 hover:text-neutral-900">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-neutral-900 mb-2">{course.title}</h1>
              <p className="text-lg text-neutral-700">{course.description}</p>
            </div>
            <div className="flex gap-4">
              <Link
                to={`/courses/${courseId}`}
                className="flex items-center gap-2 px-6 py-3 border-2 border-neutral-200 rounded-xl font-semibold text-neutral-700 hover:border-neutral-300 transition-all"
              >
                <Eye className="w-5 h-5" />
                Preview
              </Link>
              <button
                onClick={handleTogglePublish}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  course.is_published
                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                }`}
              >
                {course.is_published ? 'Unpublish' : 'Publish Course'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-900">Course Lessons</h2>
            <button
              onClick={() => openLessonModal()}
              className="flex items-center gap-2 bg-primary-500 text-white py-2 px-6 rounded-xl font-semibold hover:bg-primary-600 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Lesson
            </button>
          </div>

          {lessons.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-600 mb-4">No lessons yet. Add your first lesson to get started.</p>
              <button
                onClick={() => openLessonModal()}
                className="inline-flex items-center gap-2 bg-primary-500 text-white py-3 px-8 rounded-xl font-semibold hover:bg-primary-600 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add First Lesson
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl hover:border-neutral-300 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-neutral-500 font-medium">{index + 1}</div>
                    <div>
                      <div className="font-semibold text-neutral-900">{lesson.title}</div>
                      <div className="text-sm text-neutral-600">
                        {lesson.duration_minutes} minutes
                        {!lesson.is_published && (
                          <span className="ml-2 text-yellow-600">(Draft)</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openLessonModal(lesson)}
                      className="p-2 text-neutral-600 hover:text-primary-500 transition-all"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteLesson(lesson.id)}
                      className="p-2 text-neutral-600 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lesson Modal */}
      {showLessonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">
              {editingLesson ? 'Edit Lesson' : 'Add New Lesson'}
            </h3>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSaveLesson} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Lesson Title
                </label>
                <input
                  type="text"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Introduction to React Hooks"
                />
              </div>

              {!editingLesson && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Lesson Content
                  </label>
                  <textarea
                    value={lessonContent}
                    onChange={(e) => setLessonContent(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Write the lesson content here..."
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={lessonDuration}
                  onChange={(e) => setLessonDuration(Number(e.target.value))}
                  min="0"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Lesson Video (Optional)
                </label>
                <div className="border-2 border-dashed border-neutral-300 rounded-xl p-6 text-center">
                  <Upload className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
                  <label htmlFor="video" className="cursor-pointer">
                    <span className="text-primary-500 font-medium hover:text-primary-600">
                      Upload video
                    </span>
                    <input
                      id="video"
                      type="file"
                      accept="video/*"
                      onChange={(e) => setLessonVideoFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                  {lessonVideoFile && (
                    <p className="text-sm text-neutral-600 mt-2">{lessonVideoFile.name}</p>
                  )}
                  <p className="text-sm text-neutral-500 mt-2">MP4, MOV up to 500MB</p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-primary-500 text-white py-3 px-8 rounded-xl font-semibold hover:bg-primary-600 transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Lesson'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowLessonModal(false)}
                  className="px-8 py-3 border-2 border-neutral-200 rounded-xl font-semibold text-neutral-700 hover:border-neutral-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

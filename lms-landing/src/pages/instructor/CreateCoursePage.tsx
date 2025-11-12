import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Upload } from 'lucide-react';

export default function CreateCoursePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [difficultyLevel, setDifficultyLevel] = useState('beginner');
  const [durationHours, setDurationHours] = useState(0);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleThumbnailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setError('');
    setLoading(true);

    try {
      let thumbnailUrl = '';

      // Upload thumbnail if provided
      if (thumbnailFile) {
        const fileExt = thumbnailFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('course-images')
          .upload(fileName, thumbnailFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('course-images')
          .getPublicUrl(fileName);

        thumbnailUrl = publicUrl;
      }

      // Create course
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .insert({
          title,
          description,
          price,
          difficulty_level: difficultyLevel,
          duration_hours: durationHours,
          thumbnail_url: thumbnailUrl,
          instructor_id: user.id,
          is_published: false,
        })
        .select()
        .single();

      if (courseError) throw courseError;

      navigate(`/instructor/courses/${courseData.id}/edit`);
    } catch (err: any) {
      setError(err.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">Create New Course</h1>
          <p className="text-lg text-neutral-700">Fill in the details to create your course</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-2">
                Course Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                placeholder="Introduction to Web Development"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={6}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                placeholder="Describe what students will learn in this course..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-neutral-700 mb-2">
                  Price (USD)
                </label>
                <input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  placeholder="0.00"
                />
                <p className="text-sm text-neutral-500 mt-1">Set to 0 for free courses</p>
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-neutral-700 mb-2">
                  Duration (Hours)
                </label>
                <input
                  id="duration"
                  type="number"
                  value={durationHours}
                  onChange={(e) => setDurationHours(Number(e.target.value))}
                  min="0"
                  step="0.5"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  placeholder="10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-neutral-700 mb-2">
                Difficulty Level
              </label>
              <select
                id="difficulty"
                value={difficultyLevel}
                onChange={(e) => setDifficultyLevel(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Course Thumbnail
              </label>
              <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-primary-500 transition-all">
                {thumbnailPreview ? (
                  <div className="space-y-4">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnailFile(null);
                        setThumbnailPreview('');
                      }}
                      className="text-sm text-neutral-600 hover:text-neutral-900"
                    >
                      Remove image
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                    <label htmlFor="thumbnail" className="cursor-pointer">
                      <span className="text-primary-500 font-medium hover:text-primary-600">
                        Upload an image
                      </span>
                      <span className="text-neutral-600"> or drag and drop</span>
                      <input
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="hidden"
                      />
                    </label>
                    <p className="text-sm text-neutral-500 mt-2">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary-500 text-white py-3 px-8 rounded-xl font-semibold hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Course'}
              </button>
              <Link
                to="/dashboard"
                className="px-8 py-3 border-2 border-neutral-200 rounded-xl font-semibold text-neutral-700 hover:border-neutral-300 transition-all text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

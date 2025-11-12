import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import StudentDashboard from './student/StudentDashboard';
import InstructorDashboard from './instructor/InstructorDashboard';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRole() {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();

        setRole(data?.role || 'student');
      } catch (error) {
        console.error('Error loading role:', error);
        setRole('student');
      } finally {
        setLoading(false);
      }
    }

    loadRole();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return role === 'instructor' ? <InstructorDashboard /> : <StudentDashboard />;
}

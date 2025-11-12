Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Credentials': 'false'
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        const { lessonId, completed, timeSpent } = await req.json();

        if (!lessonId) {
            throw new Error('Lesson ID is required');
        }

        // Get environment variables
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        if (!serviceRoleKey || !supabaseUrl) {
            throw new Error('Supabase configuration missing');
        }

        // Get user from auth header
        const authHeader = req.headers.get('authorization');
        if (!authHeader) {
            throw new Error('No authorization header');
        }

        const token = authHeader.replace('Bearer ', '');

        // Verify token and get user
        const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'apikey': serviceRoleKey
            }
        });

        if (!userResponse.ok) {
            throw new Error('Invalid token');
        }

        const userData = await userResponse.json();
        const userId = userData.id;

        // Check if student is enrolled in the course this lesson belongs to
        const lessonResponse = await fetch(`${supabaseUrl}/rest/v1/lessons?id=eq.${lessonId}`, {
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json'
            }
        });

        const lessons = await lessonResponse.json();
        
        if (lessons.length === 0) {
            throw new Error('Lesson not found');
        }

        const lesson = lessons[0];

        // Check enrollment
        const enrollmentResponse = await fetch(
            `${supabaseUrl}/rest/v1/enrollments?student_id=eq.${userId}&course_id=eq.${lesson.course_id}`, 
            {
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey,
                    'Content-Type': 'application/json'
                }
            }
        );

        const enrollments = await enrollmentResponse.json();
        
        if (enrollments.length === 0) {
            throw new Error('User not enrolled in this course');
        }

        const enrollment = enrollments[0];

        // Check if lesson progress already exists
        const existingProgressResponse = await fetch(
            `${supabaseUrl}/rest/v1/lesson_progress?lesson_id=eq.${lessonId}&student_id=eq.${userId}`, 
            {
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey,
                    'Content-Type': 'application/json'
                }
            }
        );

        const existingProgress = await existingProgressResponse.json();

        if (existingProgress.length > 0) {
            // Update existing progress
            const updateData = {
                completed: completed,
                time_spent_minutes: timeSpent,
            };
            
            if (completed && !existingProgress[0].completed_at) {
                updateData.completed_at = new Date().toISOString();
            }

            const updateProgressResponse = await fetch(
                `${supabaseUrl}/rest/v1/lesson_progress?lesson_id=eq.${lessonId}&student_id=eq.${userId}`, 
                {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${serviceRoleKey}`,
                        'apikey': serviceRoleKey,
                        'Content-Type': 'application/json',
                        'Prefer': 'return=representation'
                    },
                    body: JSON.stringify(updateData)
                }
            );

            if (!updateProgressResponse.ok) {
                const errorText = await updateProgressResponse.text();
                throw new Error(`Failed to update lesson progress: ${errorText}`);
            }

            const progress = await updateProgressResponse.json();

            // Update overall course progress if needed
            await updateOverallProgress(supabaseUrl, serviceRoleKey, userId, lesson.course_id);

            return new Response(JSON.stringify({
                data: { progress: progress[0] }
            }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });

        } else {
            // Create new progress record
            const progressData = {
                lesson_id: lessonId,
                student_id: userId,
                completed: completed,
                time_spent_minutes: timeSpent,
                completed_at: completed ? new Date().toISOString() : null
            };

            const createProgressResponse = await fetch(`${supabaseUrl}/rest/v1/lesson_progress`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(progressData)
            });

            if (!createProgressResponse.ok) {
                const errorText = await createProgressResponse.text();
                throw new Error(`Failed to create lesson progress: ${errorText}`);
            }

            const progress = await createProgressResponse.json();

            // Update overall course progress
            await updateOverallProgress(supabaseUrl, serviceRoleKey, userId, lesson.course_id);

            return new Response(JSON.stringify({
                data: { progress: progress[0] }
            }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

    } catch (error) {
        console.error('Lesson progress update error:', error);

        const errorResponse = {
            error: {
                code: 'PROGRESS_UPDATE_FAILED',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});

// Helper function to update overall course progress
async function updateOverallProgress(supabaseUrl, serviceRoleKey, userId, courseId) {
    try {
        // Get total lessons in course
        const lessonsResponse = await fetch(
            `${supabaseUrl}/rest/v1/lessons?course_id=eq.${courseId}&is_published=eq.true`, 
            {
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey,
                    'Content-Type': 'application/json'
                }
            }
        );

        const lessons = await lessonsResponse.json();
        const totalLessons = lessons.length;

        if (totalLessons === 0) return;

        // Get completed lessons
        const completedLessonsResponse = await fetch(
            `${supabaseUrl}/rest/v1/lesson_progress?student_id=eq.${userId}&completed=eq.true&lesson_id=in.(${lessons.map(l => l.id).join(',')})`, 
            {
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey,
                    'Content-Type': 'application/json'
                }
            }
        );

        const completedLessons = await completedLessonsResponse.json();
        const completedCount = completedLessons.length;

        // Calculate progress percentage
        const progressPercentage = Math.round((completedCount / totalLessons) * 100);

        // Update enrollment progress
        await fetch(
            `${supabaseUrl}/rest/v1/enrollments?student_id=eq.${userId}&course_id=eq.${courseId}`, 
            {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    progress_percentage: progressPercentage,
                    completed_at: progressPercentage === 100 ? new Date().toISOString() : null
                })
            }
        );

    } catch (error) {
        console.error('Error updating overall progress:', error);
    }
}
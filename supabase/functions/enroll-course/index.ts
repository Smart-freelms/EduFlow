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
        const { courseId } = await req.json();

        if (!courseId) {
            throw new Error('Course ID is required');
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

        // Check if course exists and is published
        const courseResponse = await fetch(`${supabaseUrl}/rest/v1/courses?id=eq.${courseId}&is_published=eq.true`, {
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json'
            }
        });

        const courses = await courseResponse.json();
        
        if (courses.length === 0) {
            throw new Error('Course not found or not published');
        }

        const course = courses[0];

        // Check if user is already enrolled
        const existingEnrollmentResponse = await fetch(
            `${supabaseUrl}/rest/v1/enrollments?student_id=eq.${userId}&course_id=eq.${courseId}`, 
            {
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey,
                    'Content-Type': 'application/json'
                }
            }
        );

        const existingEnrollments = await existingEnrollmentResponse.json();
        
        if (existingEnrollments.length > 0) {
            return new Response(JSON.stringify({
                data: { enrollment: existingEnrollments[0], message: 'Already enrolled' }
            }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // Create enrollment
        const enrollmentData = {
            student_id: userId,
            course_id: courseId,
            progress_percentage: 0
        };

        const createEnrollmentResponse = await fetch(`${supabaseUrl}/rest/v1/enrollments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(enrollmentData)
        });

        if (!createEnrollmentResponse.ok) {
            const errorText = await createEnrollmentResponse.text();
            throw new Error(`Failed to create enrollment: ${errorText}`);
        }

        const enrollment = await createEnrollmentResponse.json();

        // Update course enrollment count
        const updateCourseResponse = await fetch(`${supabaseUrl}/rest/v1/courses?id=eq.${courseId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                enrollment_count: course.enrollment_count + 1
            })
        });

        if (!updateCourseResponse.ok) {
            console.warn('Failed to update course enrollment count');
        }

        return new Response(JSON.stringify({
            data: { 
                enrollment: enrollment[0],
                message: `Successfully enrolled in ${course.title}`
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Course enrollment error:', error);

        const errorResponse = {
            error: {
                code: 'ENROLLMENT_FAILED',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
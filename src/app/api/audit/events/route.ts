import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const supabase = createClient();
    let query = supabase.from('activity_events').select('*').order('occurred_at', { ascending: false }).limit(limit);

    if (userId) query = query.eq('user_id', userId);
    if (courseId) query = query.eq('course_id', courseId);

    const { data: events, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      total: events?.length || 0,
      events: events || [],
    });
  } catch (error) {
    console.error('[API /audit/events] Internal Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

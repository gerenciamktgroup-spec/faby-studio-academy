import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const isDemo =
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes('demo.supabase.co');

    if (isDemo) {
      return NextResponse.json({
        success: true,
        total: 15,
        events: [
          {
            id: 'ev_001',
            event_type: 'SESSION_STARTED',
            user_id: '22222222-2222-2222-2222-222222222222',
            occurred_at: new Date().toISOString(),
            ip_hash: '8f7a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8',
            user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          },
          {
            id: 'ev_002',
            event_type: 'VIDEO_STARTED',
            user_id: '22222222-2222-2222-2222-222222222222',
            occurred_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
            ip_hash: '8f7a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8',
            user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          },
          {
            id: 'ev_003',
            event_type: 'QUIZ_SUBMITTED',
            user_id: '22222222-2222-2222-2222-222222222222',
            occurred_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
            ip_hash: '8f7a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8',
            user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          },
        ],
      });
    }

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

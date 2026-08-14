import { NextRequest, NextResponse } from 'next/server';
import { processHeartbeat } from '@/lib/active-learning-calculator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, sessionId, isTabVisible, isVideoPlaying, courseId, lessonId } = body;

    if (!userId || !sessionId) {
      return NextResponse.json({ error: 'Missing required parameters: userId or sessionId' }, { status: 400 });
    }

    const ipAddress = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Unknown';

    const result = await processHeartbeat({
      userId,
      sessionId,
      isTabVisible: Boolean(isTabVisible),
      isVideoPlaying: Boolean(isVideoPlaying),
      courseId,
      lessonId,
      ipAddress,
      userAgent,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('[API /audit/heartbeat] Internal Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { NextResponse, type NextRequest } from 'next/server';
import { isDemoEnabled } from '@/lib/config/env';

export async function POST(request: NextRequest) {
  if (!isDemoEnabled()) {
    return NextResponse.json({ error: 'Demo mode is disabled in production.' }, { status: 404 });
  }

  try {
    const { personaId } = await request.json();
    if (!personaId) {
      return NextResponse.json({ error: 'Persona ID is required' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Demo mode active' });
  } catch (_error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextResponse, type NextRequest } from 'next/server';
import { AUDIT_ROLES } from '@/lib/auth/roles';
import { requireAuthPrincipal } from '@/lib/auth/server';
import { apiErrorResponse } from '@/lib/http/errors';
import { createClient } from '@/lib/supabase/server';
import { auditEventQuerySchema, validationError } from '@/lib/validation/api-schemas';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await requireAuthPrincipal(AUDIT_ROLES);
    const params = auditEventQuerySchema.safeParse({
      userId: request.nextUrl.searchParams.get('userId') ?? undefined,
      courseId: request.nextUrl.searchParams.get('courseId') ?? undefined,
      limit: request.nextUrl.searchParams.get('limit') ?? undefined,
    });
    if (!params.success) {
      return NextResponse.json(validationError(params.error), { status: 400 });
    }

    const supabase = await createClient();
    let query = supabase
      .from('activity_events')
      .select('*')
      .order('occurred_at', { ascending: false })
      .limit(params.data.limit);

    if (params.data.userId) query = query.eq('user_id', params.data.userId);
    if (params.data.courseId) query = query.eq('course_id', params.data.courseId);

    const { data: events, error } = await query;
    if (error) throw error;

    return NextResponse.json({ success: true, total: events?.length ?? 0, events });
  } catch (error) {
    return apiErrorResponse(error);
  }
}

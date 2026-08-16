import { NextResponse, type NextRequest } from 'next/server';
import { STUDENT_ROLES } from '@/lib/auth/roles';
import { requireAuthPrincipal } from '@/lib/auth/server';
import { processHeartbeat } from '@/lib/active-learning-calculator';
import { apiErrorResponse } from '@/lib/http/errors';
import { heartbeatSchema, validationError } from '@/lib/validation/api-schemas';

export async function POST(request: NextRequest) {
  try {
    const principal = await requireAuthPrincipal(STUDENT_ROLES);
    const payload = heartbeatSchema.safeParse(await request.json());
    if (!payload.success) {
      return NextResponse.json(validationError(payload.error), { status: 400 });
    }

    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor?.split(',')[0]?.trim() ?? 'unknown';
    const result = await processHeartbeat({
      ...payload.data,
      userId: principal.id,
      ipAddress,
      userAgent: request.headers.get('user-agent') ?? 'unknown',
    });

    return NextResponse.json(result);
  } catch (error) {
    return apiErrorResponse(error);
  }
}

import { NextResponse } from 'next/server';
import { STUDENT_ROLES } from '@/lib/auth/roles';
import { requireAuthPrincipal } from '@/lib/auth/server';
import { apiErrorResponse } from '@/lib/http/errors';

export async function POST() {
  try {
    await requireAuthPrincipal(STUDENT_ROLES);

    return NextResponse.json(
      {
        error:
          'La pasarela de pago aún no está configurada. No se creó ningún cobro ni matrícula.',
        code: 'PAYMENT_PROVIDER_NOT_CONFIGURED',
      },
      { status: 503 }
    );
  } catch (error) {
    return apiErrorResponse(error);
  }
}

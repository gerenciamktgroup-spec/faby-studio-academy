import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/admin';
import { recordUserConsent, TERMS_VERSION, PRIVACY_POLICY_VERSION } from '@/lib/consent';
import { recordActivityEvent } from '@/lib/audit-logger';

const registerSchema = z.object({
  fullName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
  email: z.string().email('Introduce un correo electrónico válido.'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres.'),
  phone: z.string().optional().default(''),
  courseInterest: z.string().optional().default(''),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'Debes aceptar los Términos de Uso y la Política de Privacidad.' }),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const parsed = registerSchema.safeParse(rawBody);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? 'Datos de registro no válidos.';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { fullName, email, password, phone, courseInterest } = parsed.data;
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || undefined;

    const admin = createAdminClient();
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? request.nextUrl.origin).replace(/\/$/, '');

    const { data: authData, error: authError } = await admin.auth.admin.createUser({
      email: email.trim().toLowerCase(),
      password,
      email_confirm: true, // auto-confirm in staging demo
      user_metadata: {
        full_name: fullName.trim(),
        phone: phone.trim(),
        course_interest: courseInterest,
        terms_version: TERMS_VERSION,
        privacy_version: PRIVACY_POLICY_VERSION,
      },
    });

    if (authError || !authData.user) {
      if (authError?.message.toLowerCase().includes('already')) {
        return NextResponse.json(
          { error: 'Ya existe una cuenta con ese correo. Inicia sesión.' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: authError?.message || 'No fue posible crear la cuenta.' },
        { status: 500 }
      );
    }

    const userId = authData.user.id;

    // Record immutable versioned consent records
    await recordUserConsent({
      userId,
      ipAddress,
      termsVersion: TERMS_VERSION,
      privacyVersion: PRIVACY_POLICY_VERSION,
    });

    // Record audit event
    await recordActivityEvent({
      userId,
      sessionId: `sess_register_${userId}`,
      eventType: 'AUTH_LOGIN',
      ipAddress,
      userAgent,
      metadata: {
        action: 'USER_REGISTERED_WITH_CONSENT',
        terms_version: TERMS_VERSION,
        privacy_version: PRIVACY_POLICY_VERSION,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Cuenta creada y consentimientos registrados.',
        user: { id: userId, email: authData.user.email },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Register API] error:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error inesperado al procesar el registro.' },
      { status: 500 }
    );
  }
}

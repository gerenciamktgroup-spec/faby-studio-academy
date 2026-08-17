import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  hashIpAddress,
  recordUserConsent,
  TERMS_VERSION,
  PRIVACY_POLICY_VERSION,
} from '@/lib/consent';
import { isPublicRegistrationEnabled } from '@/lib/config/env';

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
    if (!isPublicRegistrationEnabled()) {
      return NextResponse.json(
        { error: 'El registro público está deshabilitado durante la preview privada.' },
        { status: 503 }
      );
    }

    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || 'FabyStudio/2026.2';
    const admin = createAdminClient();
    const ipHash = hashIpAddress(ipAddress);
    const { data: rateLimitData, error: rateLimitError } = await admin.rpc(
      'consume_registration_rate_limit',
      {
        p_ip_hash: ipHash,
        p_limit: 10,
        p_window_seconds: 900,
      }
    );

    if (rateLimitError) throw rateLimitError;
    const rateLimit = rateLimitData as {
      allowed?: boolean;
      retry_after_seconds?: number;
    } | null;

    if (!rateLimit?.allowed) {
      return NextResponse.json(
        {
          error: 'Demasiados intentos de registro. Intenta nuevamente más tarde.',
          retryAfterSeconds: rateLimit?.retry_after_seconds ?? 900,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit?.retry_after_seconds ?? 900),
          },
        }
      );
    }

    const rawBody = await request.json();
    const parsed = registerSchema.safeParse(rawBody);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? 'Datos de registro no válidos.';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { fullName, email, password, phone, courseInterest } = parsed.data;
    // 1. Create auth user
    const { data: authData, error: authError } = await admin.auth.admin.createUser({
      email: email.trim().toLowerCase(),
      password,
      email_confirm: true, // auto-confirm for student onboarding
      user_metadata: {
        full_name: fullName.trim(),
        phone: phone.trim(),
        course_interest: courseInterest,
        terms_version: TERMS_VERSION,
        privacy_version: PRIVACY_POLICY_VERSION,
      },
    });

    if (authError || !authData.user) {
      if (authError?.message?.toLowerCase().includes('already')) {
        return NextResponse.json(
          { error: 'Ya existe una cuenta registrada con este correo electrónico.' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: authError?.message || 'No fue posible crear la cuenta de usuario.' },
        { status: 500 }
      );
    }

    const userId = authData.user.id;

    // 2. Record immutable versioned consent records with atomic rollback on failure
    try {
      await recordUserConsent({
        userId,
        ipAddress,
        userAgent,
        termsVersion: TERMS_VERSION,
        privacyVersion: PRIVACY_POLICY_VERSION,
      });
    } catch (consentError) {
      console.error('[Register API] Rollback: consent registration failed, deleting user:', consentError);
      // Clean up orphaned auth user to ensure atomicity
      const { error: rollbackError } = await admin.auth.admin.deleteUser(userId);
      if (rollbackError) {
        console.error('[Register API] Critical: failed to delete orphan user during rollback:', rollbackError);
      }

      return NextResponse.json(
        { error: 'No se pudo completar el registro legal del consentimiento. Intenta de nuevo.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Cuenta creada y consentimientos registrados.',
        user: { id: userId, email: authData.user.email },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Register API] unexpected error:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error inesperado al procesar el registro.' },
      { status: 500 }
    );
  }
}

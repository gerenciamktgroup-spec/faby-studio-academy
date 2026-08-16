import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/admin';
import { recordUserConsent, TERMS_VERSION, PRIVACY_POLICY_VERSION } from '@/lib/consent';

// Simple in-memory rate limiter for staging register endpoint
const registerAttempts = new Map<string, { count: number; expiresAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_ATTEMPTS_PER_WINDOW = 15;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = registerAttempts.get(ip);
  if (!entry || now > entry.expiresAt) {
    registerAttempts.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_ATTEMPTS_PER_WINDOW) {
    return true;
  }
  entry.count++;
  return false;
}

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
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || 'FabyStudio/2026.1';

    if (isRateLimited(ipAddress)) {
      return NextResponse.json(
        { error: 'Demasiados intentos de registro. Espera un minuto antes de reintentar.' },
        { status: 429 }
      );
    }

    const rawBody = await request.json();
    const parsed = registerSchema.safeParse(rawBody);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? 'Datos de registro no válidos.';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { fullName, email, password, phone, courseInterest } = parsed.data;
    const admin = createAdminClient();

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
      await admin.auth.admin.deleteUser(userId).catch((delErr) => {
        console.error('[Register API] Critical: failed to delete orphan user during rollback:', delErr);
      });

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

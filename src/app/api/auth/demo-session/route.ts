import { NextResponse, type NextRequest } from 'next/server';
import { isDemoEnabled } from '@/lib/config/env';

const DEMO_ACCOUNTS: Record<string, { email: string; landingUrl: string }> = {
  alumna: {
    email: 'alumna@fabystudio.academy',
    landingUrl: '/campus',
  },
  profesor: {
    email: 'profesora@fabystudio.academy',
    landingUrl: '/profesor',
  },
  admin: {
    email: 'admin@fabystudio.academy',
    landingUrl: '/admin',
  },
  auditor: {
    email: 'auditor@fabystudio.academy',
    landingUrl: '/auditoria',
  },
};

export async function POST(request: NextRequest) {
  if (!isDemoEnabled()) {
    return NextResponse.json(
      { error: 'El acceso demostrativo está deshabilitado en este entorno.' },
      { status: 404 }
    );
  }

  try {
    const { personaId } = await request.json();
    const target = DEMO_ACCOUNTS[personaId];

    if (!target) {
      return NextResponse.json({ error: 'Perfil de demostración no encontrado.' }, { status: 400 });
    }

    const password = process.env.DEMO_USER_PASSWORD || 'Faby2026!Demo';

    return NextResponse.json({
      success: true,
      email: target.email,
      password,
      landingUrl: target.landingUrl,
    });
  } catch (_error) {
    return NextResponse.json({ error: 'Error al procesar sesión de demostración.' }, { status: 500 });
  }
}

import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json();
    const expectedKey = process.env.PRIVATE_ACCESS_KEY || 'faby2026';

    if (!key || key !== expectedKey) {
      return NextResponse.json(
        { success: false, error: 'Clave de acceso privado inválida.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'Acceso privado concedido.',
    });

    // Set cookie valid for 30 days
    response.cookies.set('faby_private_access', 'granted', {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: false,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: 'Error al procesar solicitud.' },
      { status: 500 }
    );
  }
}

import { NextResponse, type NextRequest } from 'next/server';
import type { AppRole } from '@/types';
import { getRoleLandingPage, hasAnyRole } from '@/lib/auth/roles';
import { updateSession } from '@/lib/supabase/middleware';

const PRIVATE_PAGE_RULES: Array<{ prefix: string; roles: readonly AppRole[] }> = [
  { prefix: '/campus', roles: ['alumna'] },
  {
    prefix: '/profesor',
    roles: ['tutor', 'profesor', 'admin_academico', 'superadmin'],
  },
  { prefix: '/admin', roles: ['admin_academico', 'superadmin'] },
  { prefix: '/auditoria', roles: ['auditor', 'admin_academico', 'superadmin'] },
];

function withSecurityHeaders(response: NextResponse, isPrivate: boolean): NextResponse {
  if (isPrivate) response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(self), microphone=(self), geolocation=()'
  );
  return response;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const rule = PRIVATE_PAGE_RULES.find(
    ({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
  const session = await updateSession(request);

  if (pathname === '/demo' || pathname.startsWith('/demo/')) {
    const isDemoEnabled =
      process.env.NEXT_PUBLIC_ENABLE_DEMO === 'true' ||
      process.env.ENABLE_DEMO === 'true';
    if (!isDemoEnabled) {
      return withSecurityHeaders(new NextResponse(null, { status: 404 }), false);
    }
  }

  if (!rule) return withSecurityHeaders(session.response, false);

  if (!session.configured) {
    return withSecurityHeaders(
      new NextResponse('Servicio de autenticación no configurado.', { status: 503 }),
      true
    );
  }

  if (!session.user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('next', pathname);
    return withSecurityHeaders(NextResponse.redirect(loginUrl), true);
  }

  if (!hasAnyRole(session.roles, rule.roles)) {
    const destination = request.nextUrl.clone();
    destination.pathname = getRoleLandingPage(session.roles);
    destination.search = '';

    if (destination.pathname === pathname) destination.pathname = '/sin-acceso';
    return withSecurityHeaders(NextResponse.redirect(destination), true);
  }

  return withSecurityHeaders(session.response, true);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};

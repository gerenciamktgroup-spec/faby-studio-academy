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

const UNLOCKED_PUBLIC_PATHS = [
  '/acceso-privado',
  '/api/auth/private-unlock',
  '/login',
  '/recuperar-password',
  '/actualizar-password',
  '/auth/callback',
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
  const session = await updateSession(request);

  // 1. Check if Private / Paused Mode is active (default active unless explicitly 'false')
  const isPrivateMode = process.env.PRIVATE_MODE !== 'false';
  const expectedKey = process.env.PRIVATE_ACCESS_KEY || 'faby2026';
  const queryKey = request.nextUrl.searchParams.get('key');

  // If visitor arrives with valid ?key=... URL parameter, grant access and set cookie
  if (queryKey && queryKey === expectedKey) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete('key');
    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set('faby_private_access', 'granted', {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    return withSecurityHeaders(response, true);
  }

  const hasPrivateCookie = request.cookies.get('faby_private_access')?.value === 'granted';
  const isAllowedPath = UNLOCKED_PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  // If in private mode and not authenticated and not unlocked by cookie, gate to /acceso-privado
  if (isPrivateMode && !hasPrivateCookie && !session.user && !isAllowedPath) {
    // Exclude API routes that might be needed by public forms
    if (!pathname.startsWith('/api/')) {
      const lockUrl = request.nextUrl.clone();
      lockUrl.pathname = '/acceso-privado';
      lockUrl.search = '';
      return withSecurityHeaders(NextResponse.redirect(lockUrl), true);
    }
  }

  // 2. Standard RBAC rules for internal portals (/campus, /profesor, /admin, /auditoria)
  const rule = PRIVATE_PAGE_RULES.find(
    ({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

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

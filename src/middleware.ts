import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

// Known malicious user agent signatures and vulnerability scanners
const BLOCKED_USER_AGENTS = [
  'sqlmap',
  'nikto',
  'wpscan',
  'acunetix',
  'dirbuster',
  'havij',
  'masscan',
  'nmap',
  'nessus',
  'openvas',
];

export async function middleware(request: NextRequest) {
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();

  // 1. Anti-Reconnaissance: Block malicious automated vulnerability scanners
  for (const botSignature of BLOCKED_USER_AGENTS) {
    if (userAgent.includes(botSignature)) {
      return new NextResponse('Access Denied: Malicious scanner signature detected by Fabi Security Guard.', {
        status: 403,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  }

  // 2. Prevent Path Traversal & Suspicious Query Probing
  const urlString = request.url.toLowerCase();
  if (
    urlString.includes('/etc/passwd') ||
    urlString.includes('..%2f') ||
    urlString.includes('..\\') ||
    urlString.includes('.git/') ||
    urlString.includes('.env')
  ) {
    return new NextResponse('Forbidden: Malformed request path.', {
      status: 403,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  // 3. Supabase Auth Session Refresh (JWT Cookie handler)
  const sessionResponse = await updateSession(request);

  // 4. Enforce Security Response Headers
  sessionResponse.headers.set('X-Robots-Tag', 'noindex, nofollow');
  sessionResponse.headers.set('X-Frame-Options', 'SAMEORIGIN');
  sessionResponse.headers.set('X-Content-Type-Options', 'nosniff');

  return sessionResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

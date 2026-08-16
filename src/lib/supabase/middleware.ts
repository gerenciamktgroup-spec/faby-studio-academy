import { createServerClient, type CookieOptions } from '@supabase/ssr';
import type { User } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import type { AppRole } from '@/types';
import { isAppRole } from '@/lib/auth/roles';
import { isSupabaseConfigured } from '@/lib/config/env';

export interface MiddlewareSession {
  response: NextResponse;
  user: User | null;
  roles: AppRole[];
  configured: boolean;
}

export async function updateSession(request: NextRequest): Promise<MiddlewareSession> {
  let response = NextResponse.next({ request: { headers: request.headers } });

  if (!isSupabaseConfigured()) {
    return { response, user: null, roles: [], configured: false };
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { response, user: null, roles: [], configured: true };

  const { data: roleRows, error: roleError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id);

  const roles = roleError
    ? []
    : (roleRows ?? []).map((row) => row.role).filter(isAppRole);

  return { response, user, roles, configured: true };
}

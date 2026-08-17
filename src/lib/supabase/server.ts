import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies, headers } from 'next/headers';
import { getSupabasePublicConfig } from '@/lib/config/env';

export async function createClient() {
  const cookieStore = await cookies();
  const requestHeaders = await headers();
  const { url, anonKey } = getSupabasePublicConfig();
  const authorization = requestHeaders.get('authorization');

  return createServerClient(
    url,
    anonKey,
    {
      global: authorization
        ? { headers: { Authorization: authorization } }
        : undefined,
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Handled in Middleware or Server Components
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch {
            // Handled in Middleware
          }
        },
      },
    }
  );
}

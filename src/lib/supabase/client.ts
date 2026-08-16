import { createBrowserClient } from '@supabase/ssr';
import { getSupabasePublicConfig } from '@/lib/config/env';

export function createClient() {
  const { url, anonKey } = getSupabasePublicConfig();
  return createBrowserClient(url, anonKey);
}

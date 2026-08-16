import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { getSupabasePublicConfig, getSupabaseServiceRoleKey } from '@/lib/config/env';

export function createAdminClient() {
  const { url } = getSupabasePublicConfig();
  return createSupabaseClient(url, getSupabaseServiceRoleKey(), {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

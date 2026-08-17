import { createHmac } from 'node:crypto';
import { getAuditIpSalt } from '@/lib/config/env';
import { createAdminClient } from '@/lib/supabase/admin';

export const TERMS_VERSION = '2026.2';
export const PRIVACY_POLICY_VERSION = '2026.2';

export function hashIpAddress(ipAddress?: string): string {
  const salt = getAuditIpSalt();
  return createHmac('sha256', salt).update(ipAddress || '127.0.0.1').digest('hex');
}

export async function recordUserConsent(params: {
  userId: string;
  ipAddress?: string;
  userAgent?: string;
  termsVersion?: string;
  privacyVersion?: string;
}) {
  const admin = createAdminClient();
  const ipHash = hashIpAddress(params.ipAddress);
  const userAgent = params.userAgent || 'FabyStudio/2026.2';
  const termsVer = params.termsVersion || TERMS_VERSION;
  const privacyVer = params.privacyVersion || PRIVACY_POLICY_VERSION;

  // Use atomic server-only transactional procedure in PostgreSQL
  const { data, error } = await admin.rpc('record_user_legal_consents', {
    p_user_id: params.userId,
    p_ip_hash: ipHash,
    p_user_agent: userAgent,
    p_terms_version: termsVer,
    p_privacy_version: privacyVer,
  });

  if (error) {
    console.error('[Consent] RPC error recording user legal consents:', error);
    throw new Error(`Error registrando consentimientos legales: ${error.message}`);
  }

  return data;
}

import { createHmac } from 'node:crypto';
import { getAuditIpSalt } from '@/lib/config/env';
import { createAdminClient } from '@/lib/supabase/admin';

export const TERMS_VERSION = '2026.1';
export const PRIVACY_POLICY_VERSION = '2026.1';

export function hashIpAddress(ipAddress?: string): string {
  const salt = getAuditIpSalt();
  return createHmac('sha256', salt).update(ipAddress ?? '127.0.0.1').digest('hex');
}

export async function recordUserConsent(params: {
  userId: string;
  ipAddress?: string;
  termsVersion?: string;
  privacyVersion?: string;
}) {
  const admin = createAdminClient();
  const ipHash = hashIpAddress(params.ipAddress);
  const now = new Date().toISOString();

  const records = [
    {
      user_id: params.userId,
      consent_type: 'terms',
      version: params.termsVersion ?? TERMS_VERSION,
      ip_hash: ipHash,
      granted_at: now,
    },
    {
      user_id: params.userId,
      consent_type: 'privacy',
      version: params.privacyVersion ?? PRIVACY_POLICY_VERSION,
      ip_hash: ipHash,
      granted_at: now,
    },
  ];

  const { error } = await admin.from('consent_records').insert(records);
  if (error) {
    console.error('[Consent] error recording consent:', error);
    throw error;
  }
}

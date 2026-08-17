export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return Boolean(
    url &&
      anonKey &&
      url.startsWith('https://') &&
      !url.includes('demo.supabase.co') &&
      anonKey !== 'demo-anon-key'
  );
}

export function getSupabasePublicConfig(): { url: string; anonKey: string } {
  if (!isSupabaseConfigured()) {
    throw new ConfigurationError(
      'Supabase no está configurado. Define NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
  }

  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  };
}

export function getAuditIpSalt(): string {
  const salt = process.env.AUDIT_IP_HASH_SALT;

  if (!salt || salt.length < 32) {
    throw new ConfigurationError(
      'AUDIT_IP_HASH_SALT debe existir y tener al menos 32 caracteres.'
    );
  }

  return salt;
}

export function getCertificateSigningSecret(): string {
  const secret = process.env.CERTIFICATE_SIGNING_SECRET;

  if (!secret || secret.length < 32) {
    throw new ConfigurationError(
      'CERTIFICATE_SIGNING_SECRET debe existir y tener al menos 32 caracteres.'
    );
  }

  return secret;
}

export function getSupabaseServiceRoleKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key || key.length < 40 || key === 'YOUR_SUPABASE_SERVICE_ROLE_KEY') {
    throw new ConfigurationError(
      'SUPABASE_SERVICE_ROLE_KEY debe configurarse exclusivamente en el servidor.'
    );
  }
  return key;
}

export function isPublicRegistrationEnabled(): boolean {
  return process.env.ENABLE_PUBLIC_REGISTRATION === 'true';
}

export function isDemoEnabled(): boolean {
  return process.env.ENABLE_DEMO === 'true';
}


import { redirect } from 'next/navigation';
import type { AppRole } from '@/types';
import { createClient } from '@/lib/supabase/server';
import { ConfigurationError } from '@/lib/config/env';
import { hasAnyRole, isAppRole } from '@/lib/auth/roles';

export interface AuthPrincipal {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  roles: AppRole[];
}

export class AuthenticationError extends Error {
  readonly status = 401;

  constructor(message = 'Debes iniciar sesión para continuar.') {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends Error {
  readonly status = 403;

  constructor(message = 'Tu cuenta no tiene permisos para realizar esta acción.') {
    super(message);
    this.name = 'AuthorizationError';
  }
}

export async function getAuthPrincipal(): Promise<AuthPrincipal | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) return null;

  const [{ data: profile, error: profileError }, { data: roleRows, error: rolesError }] =
    await Promise.all([
      supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', user.id)
        .maybeSingle(),
      supabase.from('user_roles').select('role').eq('user_id', user.id),
    ]);

  if (profileError) throw profileError;
  if (rolesError) throw rolesError;

  const roles = (roleRows ?? [])
    .map((row) => row.role)
    .filter(isAppRole);

  return {
    id: user.id,
    email: user.email ?? '',
    fullName:
      profile?.full_name ??
      (typeof user.user_metadata?.full_name === 'string'
        ? user.user_metadata.full_name
        : user.email?.split('@')[0] ?? 'Usuario'),
    avatarUrl: profile?.avatar_url ?? null,
    roles,
  };
}

export async function requireAuthPrincipal(
  allowedRoles?: readonly AppRole[]
): Promise<AuthPrincipal> {
  const principal = await getAuthPrincipal();

  if (!principal) throw new AuthenticationError();
  if (allowedRoles && !hasAnyRole(principal.roles, allowedRoles)) {
    throw new AuthorizationError();
  }

  return principal;
}

export async function requirePagePrincipal(
  allowedRoles: readonly AppRole[]
): Promise<AuthPrincipal> {
  let principal: AuthPrincipal | null = null;

  try {
    principal = await getAuthPrincipal();
  } catch (error) {
    if (error instanceof ConfigurationError) redirect('/login?error=config');
    throw error;
  }

  if (!principal) redirect('/login');
  if (!hasAnyRole(principal.roles, allowedRoles)) redirect('/sin-acceso');

  return principal;
}

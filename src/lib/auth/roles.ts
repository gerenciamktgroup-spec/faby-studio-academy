import type { AppRole } from '@/types';

export type { AppRole };

export const APP_ROLES: readonly AppRole[] = [
  'alumna',
  'tutor',
  'profesor',
  'admin_academico',
  'superadmin',
  'auditor',
] as const;

export const STUDENT_ROLES: readonly AppRole[] = ['alumna'];
export const TEACHING_ROLES: readonly AppRole[] = [
  'tutor',
  'profesor',
  'admin_academico',
  'superadmin',
];
export const ADMIN_ROLES: readonly AppRole[] = ['admin_academico', 'superadmin'];
export const AUDIT_ROLES: readonly AppRole[] = ['auditor', 'admin_academico', 'superadmin'];

export function isAppRole(value: unknown): value is AppRole {
  return typeof value === 'string' && APP_ROLES.includes(value as AppRole);
}

export function hasAnyRole(
  userRoles: readonly AppRole[],
  allowedRoles: readonly AppRole[]
): boolean {
  return allowedRoles.some((role) => userRoles.includes(role));
}

export function getRoleLandingPage(roles: readonly AppRole[]): string {
  if (hasAnyRole(roles, ADMIN_ROLES)) return '/admin';
  if (roles.includes('auditor')) return '/auditoria';
  if (hasAnyRole(roles, TEACHING_ROLES)) return '/profesor';
  if (roles.includes('alumna')) return '/campus';
  return '/sin-acceso';
}

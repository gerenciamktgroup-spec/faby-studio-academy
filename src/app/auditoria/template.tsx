import type { ReactNode } from 'react';
import { requirePagePrincipal } from '@/lib/auth/server';
import { AUDIT_ROLES } from '@/lib/auth/roles';

export default async function AuditAuthorizationTemplate({
  children,
}: {
  children: ReactNode;
}) {
  await requirePagePrincipal(AUDIT_ROLES);
  return children;
}

import type { ReactNode } from 'react';
import { requirePagePrincipal } from '@/lib/auth/server';
import { ADMIN_ROLES } from '@/lib/auth/roles';

export default async function AdminAuthorizationTemplate({
  children,
}: {
  children: ReactNode;
}) {
  await requirePagePrincipal(ADMIN_ROLES);
  return children;
}

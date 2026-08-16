import type { ReactNode } from 'react';
import { requirePagePrincipal } from '@/lib/auth/server';
import { STUDENT_ROLES } from '@/lib/auth/roles';

export default async function CampusAuthorizationTemplate({
  children,
}: {
  children: ReactNode;
}) {
  await requirePagePrincipal(STUDENT_ROLES);
  return children;
}

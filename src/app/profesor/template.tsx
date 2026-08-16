import type { ReactNode } from 'react';
import { requirePagePrincipal } from '@/lib/auth/server';
import { TEACHING_ROLES } from '@/lib/auth/roles';

export default async function TeacherAuthorizationTemplate({
  children,
}: {
  children: ReactNode;
}) {
  await requirePagePrincipal(TEACHING_ROLES);
  return children;
}

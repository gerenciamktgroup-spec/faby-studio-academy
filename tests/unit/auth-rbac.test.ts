import { describe, expect, it } from 'vitest';
import {
  ADMIN_ROLES,
  AUDIT_ROLES,
  getRoleLandingPage,
  hasAnyRole,
  isAppRole,
  TEACHING_ROLES,
} from '../../src/lib/auth/roles';
import {
  assignmentOperationSchema,
  heartbeatSchema,
  messageCreateSchema,
} from '../../src/lib/validation/api-schemas';

describe('Production RBAC and API contracts', () => {
  it('maps every privileged role to the correct protected area', () => {
    expect(getRoleLandingPage(['alumna'])).toBe('/campus');
    expect(getRoleLandingPage(['profesor'])).toBe('/profesor');
    expect(getRoleLandingPage(['auditor'])).toBe('/auditoria');
    expect(getRoleLandingPage(['admin_academico'])).toBe('/admin');
    expect(getRoleLandingPage([])).toBe('/sin-acceso');
  });

  it('keeps teacher, audit and admin capabilities explicit', () => {
    expect(hasAnyRole(['profesor'], TEACHING_ROLES)).toBe(true);
    expect(hasAnyRole(['profesor'], ADMIN_ROLES)).toBe(false);
    expect(hasAnyRole(['auditor'], AUDIT_ROLES)).toBe(true);
    expect(isAppRole('superadmin')).toBe(true);
    expect(isAppRole('owner')).toBe(false);
  });

  it('rejects client-selected student identities from assignment submissions', () => {
    const result = assignmentOperationSchema.safeParse({
      action: 'submit',
      assignmentId: 'd2000000-0000-4000-8000-000000000001',
      studentId: '22222222-2222-4222-8222-222222222222',
      description: 'Evidencia',
    });

    expect(result.success).toBe(true);
    if (result.success) expect('studentId' in result.data).toBe(false);
  });

  it('requires activity evidence instead of trusting a visible tab alone', () => {
    expect(
      heartbeatSchema.safeParse({
        sessionId: 'sess_secure_session_123',
        isTabVisible: true,
        isVideoPlaying: false,
        hasRecentInteraction: false,
      }).success
    ).toBe(true);

    expect(
      heartbeatSchema.safeParse({
        userId: '22222222-2222-4222-8222-222222222222',
        sessionId: 'invalid',
        isTabVisible: true,
        isVideoPlaying: false,
      }).success
    ).toBe(false);
  });

  it('enforces message length and UUID recipients', () => {
    expect(
      messageCreateSchema.safeParse({
        recipientId: '44444444-4444-4444-8444-444444444444',
        content: 'Consulta técnica',
      }).success
    ).toBe(true);
    expect(messageCreateSchema.safeParse({ recipientId: 'demo', content: '' }).success).toBe(false);
  });
});

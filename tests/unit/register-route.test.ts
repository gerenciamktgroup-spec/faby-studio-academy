import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  registrationEnabled: true,
  recordUserConsent: vi.fn(),
  createUser: vi.fn(),
  deleteUser: vi.fn(),
  rpc: vi.fn(),
}));

vi.mock('@/lib/config/env', () => ({
  isPublicRegistrationEnabled: () => mocks.registrationEnabled,
}));

vi.mock('@/lib/consent', () => ({
  TERMS_VERSION: '2026.2',
  PRIVACY_POLICY_VERSION: '2026.2',
  hashIpAddress: () => 'a'.repeat(64),
  recordUserConsent: mocks.recordUserConsent,
}));

vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: () => ({
    rpc: mocks.rpc,
    auth: {
      admin: {
        createUser: mocks.createUser,
        deleteUser: mocks.deleteUser,
      },
    },
  }),
}));

import { POST } from '@/app/api/auth/register/route';

function registrationRequest(acceptTerms = true) {
  return new NextRequest('http://localhost/api/auth/register', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': '203.0.113.50',
      'user-agent': 'Vitest',
    },
    body: JSON.stringify({
      fullName: 'Alumna de Prueba',
      email: 'rollback@staging.faby.internal',
      password: 'Password123!',
      acceptTerms,
    }),
  });
}

describe('registro seguro y rollback compensatorio', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.registrationEnabled = true;
    mocks.rpc.mockResolvedValue({ data: { allowed: true }, error: null });
    mocks.createUser.mockResolvedValue({
      data: {
        user: {
          id: '11111111-1111-4111-8111-111111111111',
          email: 'rollback@staging.faby.internal',
        },
      },
      error: null,
    });
    mocks.deleteUser.mockResolvedValue({ data: {}, error: null });
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  it('elimina Auth si falla la transacción de consentimiento', async () => {
    mocks.recordUserConsent.mockRejectedValue(new Error('Fallo legal controlado'));

    const response = await POST(registrationRequest());

    expect(response.status).toBe(500);
    expect(mocks.deleteUser).toHaveBeenCalledWith('11111111-1111-4111-8111-111111111111');
    expect(await response.json()).toEqual({
      error: 'No se pudo completar el registro legal del consentimiento. Intenta de nuevo.',
    });
  });

  it('no crea usuarios cuando la preview mantiene cerrado el registro', async () => {
    mocks.registrationEnabled = false;

    const response = await POST(registrationRequest());

    expect(response.status).toBe(503);
    expect(mocks.rpc).not.toHaveBeenCalled();
    expect(mocks.createUser).not.toHaveBeenCalled();
  });

  it('exige la aceptación literal antes de crear Auth', async () => {
    const response = await POST(registrationRequest(false));

    expect(response.status).toBe(400);
    expect(mocks.createUser).not.toHaveBeenCalled();
  });
});

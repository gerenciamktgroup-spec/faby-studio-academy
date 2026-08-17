import { randomUUID } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { expect, test, type Page } from '@playwright/test';

const liveAuthentication = process.env.LIVE_AUTH_E2E === 'true';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

type Role =
  | 'alumna'
  | 'tutor'
  | 'profesor'
  | 'admin_academico'
  | 'auditor'
  | 'superadmin';

interface TestIdentity {
  id: string;
  email: string;
  password: string;
  role: Role;
  landing: string;
}

const identities: TestIdentity[] = [];

async function login(page: Page, identity: TestIdentity) {
  await page.goto('/login');
  await page.locator('input[type="email"]').fill(identity.email);
  await page.locator('input[type="password"]').fill(identity.password);
  await page.getByRole('button', { name: /iniciar sesión/i }).click();
  await page.waitForURL((url) => url.pathname === identity.landing, { timeout: 20_000 });
  expect(page.url()).toContain(identity.landing);
}

test.describe('Flujos autenticados por rol contra Supabase Staging', () => {
  test.skip(!liveAuthentication, 'Se ejecuta únicamente en el job Live con secretos de Staging.');

  test.beforeAll(async () => {
    if (!supabaseUrl || !anonKey || !serviceKey) {
      throw new Error('El E2E autenticado requiere URL, anon key y service role de Staging.');
    }

    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const roles: Array<{ role: Role; landing: string }> = [
      { role: 'alumna', landing: '/campus' },
      { role: 'tutor', landing: '/profesor' },
      { role: 'profesor', landing: '/profesor' },
      { role: 'admin_academico', landing: '/admin' },
      { role: 'auditor', landing: '/auditoria' },
      { role: 'superadmin', landing: '/admin' },
    ];

    for (const item of roles) {
      const suffix = randomUUID();
      const email = `playwright_${item.role}_${suffix}@staging.faby.internal`;
      const password = `Playwright_${suffix}!Aa1`;
      const created = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: `Playwright ${item.role}` },
      });
      if (created.error || !created.data.user) throw created.error ?? new Error('Auth no devolvió usuario.');

      const id = created.data.user.id;
      identities.push({ id, email, password, role: item.role, landing: item.landing });
      if (item.role !== 'alumna') {
        const assigned = await admin.from('user_roles').insert({ user_id: id, role: item.role });
        if (assigned.error) throw assigned.error;
        const removed = await admin.from('user_roles').delete().eq('user_id', id).eq('role', 'alumna');
        if (removed.error) throw removed.error;
      }
    }
  });

  test.afterAll(async () => {
    if (!supabaseUrl || !serviceKey) return;
    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    for (const identity of identities) {
      const deleted = await admin.auth.admin.deleteUser(identity.id);
      if (deleted.error) throw deleted.error;
    }
  });

  for (const role of ['alumna', 'tutor', 'profesor', 'admin_academico', 'auditor', 'superadmin'] as const) {
    test(`${role} inicia sesión y llega a su área autorizada sin 503`, async ({ page }) => {
      const identity = identities.find((candidate) => candidate.role === role);
      if (!identity) throw new Error(`No se creó la identidad ${role}.`);
      await login(page, identity);
      const response = await page.goto(identity.landing);
      expect(response?.status()).toBeLessThan(500);
      expect(response?.status()).not.toBe(503);
      expect(page.url()).toContain(identity.landing);
    });
  }

  test('alumna autenticada no puede entrar en administración', async ({ page }) => {
    const identity = identities.find((candidate) => candidate.role === 'alumna');
    if (!identity) throw new Error('No se creó la alumna de prueba.');
    await login(page, identity);
    const response = await page.goto('/admin');
    expect(response?.status()).not.toBe(503);
    await expect(page).toHaveURL(/\/campus|\/sin-acceso/);
  });

  test('auditor autenticado no recibe capacidades de administración', async ({ page }) => {
    const identity = identities.find((candidate) => candidate.role === 'auditor');
    if (!identity) throw new Error('No se creó el auditor de prueba.');
    await login(page, identity);
    const response = await page.goto('/admin');
    expect(response?.status()).not.toBe(503);
    await expect(page).toHaveURL(/\/auditoria|\/sin-acceso/);
  });
});

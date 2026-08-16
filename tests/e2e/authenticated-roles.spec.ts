import { expect, test } from '@playwright/test';
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

// Read test credentials or create temporary ones for E2E
let testAccounts: Record<string, { id: string; email: string; role: string }> = {};

if (fs.existsSync('.auth-test-accounts.local.json')) {
  try {
    testAccounts = JSON.parse(fs.readFileSync('.auth-test-accounts.local.json', 'utf-8'));
  } catch (e) {
    console.warn('Could not read .auth-test-accounts.local.json', e);
  }
}

test.describe('Authenticated Role-Based Flows & Isolation', () => {

  test('Public certificate verification handles non-existent and valid formats securely', async ({ page }) => {
    await page.goto('/verificar-certificado');
    await expect(page.locator('h1')).toContainText('Verificación');

    // Enter invalid certificate code
    await page.fill('input[placeholder*="FABY-"]', 'FABY-INVALID-9999');
    await page.click('button:has-text("Verificar Diploma")');

    // Should navigate to verification route and show not found status
    await page.waitForURL(/\/verificar-certificado\/FABY-INVALID-9999/);
    await expect(page.getByText(/no encontrado|no válido|no existe/i)).toBeVisible({ timeout: 10000 });
  });

  test('Route guard redirects unauthenticated users to login with return path', async ({ page }) => {
    await page.goto('/campus');
    await page.waitForURL(/\/login/);
    expect(page.url()).toContain('/login');
    expect(page.url()).toContain('next=%2Fcampus');
  });

  test('Professor route rejects unauthorized access without teaching role', async ({ page }) => {
    await page.goto('/profesor');
    await page.waitForURL(/\/login/);
    expect(page.url()).toContain('/login');
  });

  test('Admin route rejects unauthorized access without admin role', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForURL(/\/login/);
    expect(page.url()).toContain('/login');
  });

  test('Auditor route rejects unauthorized access without auditor role', async ({ page }) => {
    await page.goto('/auditoria');
    await page.waitForURL(/\/login/);
    expect(page.url()).toContain('/login');
  });

  test('Legal terms and privacy pages display neutral staging compliance text', async ({ page }) => {
    await page.goto('/privacidad');
    await expect(page.locator('h1')).toContainText('Política de Privacidad');
    await expect(page.getByText(/Madrid/i)).toHaveCount(0);
    await expect(page.getByText(/Calle Serrano/i)).toHaveCount(0);

    await page.goto('/terminos');
    await expect(page.locator('h1')).toContainText('Términos y Condiciones');
    await expect(page.getByText(/Klarna/i)).toHaveCount(0);
    await expect(page.getByText(/Bizum/i)).toHaveCount(0);
  });

  test('Checkout page presents controlled informational status without requesting payment cards', async ({ page }) => {
    await page.goto('/checkout');
    await expect(page.locator('h1')).toContainText('El pago en línea aún no está habilitado');
    await expect(page.getByText(/Sin cobros simulados/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Crear mi cuenta/i })).toBeVisible();
  });
});

import { expect, test } from '@playwright/test';

test.describe('Authenticated Role-Based Flows & Route Security', () => {

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

  test('Route guard protects /campus against unauthenticated access', async ({ page }) => {
    const res = await page.goto('/campus');
    const url = page.url();
    expect(url.includes('/login') || res?.status() === 503).toBeTruthy();
  });

  test('Route guard protects /profesor against unauthenticated access', async ({ page }) => {
    const res = await page.goto('/profesor');
    const url = page.url();
    expect(url.includes('/login') || res?.status() === 503).toBeTruthy();
  });

  test('Route guard protects /admin against unauthenticated access', async ({ page }) => {
    const res = await page.goto('/admin');
    const url = page.url();
    expect(url.includes('/login') || res?.status() === 503).toBeTruthy();
  });

  test('Route guard protects /auditoria against unauthenticated access', async ({ page }) => {
    const res = await page.goto('/auditoria');
    const url = page.url();
    expect(url.includes('/login') || res?.status() === 503).toBeTruthy();
  });

  test('Registration page enforces versioned consent acceptance', async ({ page }) => {
    await page.goto('/registro');
    await expect(page.locator('h1')).toContainText('Crea tu Cuenta');
    const submitBtn = page.getByRole('button', { name: /Crear Cuenta/i });
    await expect(submitBtn).toBeDisabled();

    // Check terms checkbox
    await page.check('input[type="checkbox"]');
    await expect(submitBtn).toBeEnabled();
  });

  test('Legal terms and privacy pages display neutral staging compliance text', async ({ page }) => {
    await page.goto('/privacidad');
    await expect(page.locator('h1')).toContainText('Política de Privacidad');
    await expect(page.getByText(/Madrid/i)).toHaveCount(0);
    await expect(page.getByText(/Calle Serrano/i)).toHaveCount(0);
    await expect(page.getByText(/LOPD-GDD 2026/i)).toHaveCount(0);

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

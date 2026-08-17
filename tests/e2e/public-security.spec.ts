import { expect, test } from '@playwright/test';

test.describe('Public experience and fail-closed security', () => {
  test('renders the public catalog and dynamic course detail landings', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header')).toContainText('FABY STUDIO');
    await expect(page.locator('h1')).toBeVisible();

    // Verificación de páginas dinámicas de cursos unificadas
    await page.goto('/cursos/extensiones-de-pestanas');
    await expect(page.locator('h1')).toContainText(/pestañas/i);
    await expect(page.getByRole('link', { name: /matricularme ahora/i })).toBeVisible();

    await page.goto('/cursos/unas-de-gel-y-acrilico');
    await expect(page.locator('h1')).toContainText(/uñas de gel/i);

    await page.goto('/cursos/cosmetologia-facial');
    await expect(page.locator('h1')).toContainText(/cosmetología facial/i);

    // Verificación de autenticación limpia
    await page.goto('/login');
    await expect(page.getByRole('button', { name: /iniciar sesión/i })).toBeVisible();
    await expect(page.getByText(/credenciales de demo/i)).toHaveCount(0);

    await page.goto('/registro');
    await expect(page.getByRole('button', { name: /crear cuenta/i })).toBeVisible();

    // Verificación pública de certificados
    await page.goto('/verificar-certificado');
    await expect(page.locator('h1')).toContainText(/verificación/i);
  });

  test('ensures /demo route returns 404 in protected environment', async ({ page }) => {
    const response = await page.goto('/demo');
    expect(response?.status()).toBe(404);
  });

  test('never allows anonymous mutations to report success', async ({ request }) => {
    const gradeResponse = await request.post('/api/assignments', {
      data: {
        action: 'grade',
        submissionId: 'd2000000-0000-4000-8000-000000000001',
        grade: 100,
        feedback: 'Intento anónimo',
      },
    });
    expect(gradeResponse.status()).toBe(401);
    expect((await gradeResponse.json()).success).not.toBe(true);

    const heartbeatResponse = await request.post('/api/audit/heartbeat', {
      data: {
        sessionId: 'sess_anonymous_security_test',
        isTabVisible: true,
        isVideoPlaying: true,
        hasRecentInteraction: true,
      },
    });
    expect(heartbeatResponse.status()).toBe(401);
    expect((await heartbeatResponse.json()).success).not.toBe(true);
  });

  test('protects every private role area before rendering its dashboard', async ({ page }) => {
    for (const path of ['/campus', '/profesor', '/admin', '/auditoria']) {
      const response = await page.goto(path);
      const redirectedToLogin = page.url().includes('/login');
      expect(response?.status()).not.toBe(503);
      expect(redirectedToLogin).toBe(true);
    }
  });
});

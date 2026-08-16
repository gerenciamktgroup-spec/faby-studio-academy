import { expect, test } from '@playwright/test';

test.describe('Public experience and fail-closed security', () => {
  test('renders the public catalog and real authentication forms', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('FABY STUDIO');

    await page.goto('/cursos/extensiones-de-pestanas');
    await expect(page.locator('h1')).toContainText('Extensiones de Pestañas');

    await page.goto('/login');
    await expect(page.getByRole('button', { name: /iniciar sesión/i })).toBeVisible();
    await expect(page.getByText(/credenciales de demo/i)).toHaveCount(0);

    await page.goto('/registro');
    await expect(page.getByRole('button', { name: /crear cuenta/i })).toBeVisible();
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
    expect([401, 503]).toContain(gradeResponse.status());
    expect((await gradeResponse.json()).success).not.toBe(true);

    const heartbeatResponse = await request.post('/api/audit/heartbeat', {
      data: {
        sessionId: 'sess_anonymous_security_test',
        isTabVisible: true,
        isVideoPlaying: true,
        hasRecentInteraction: true,
      },
    });
    expect([401, 503]).toContain(heartbeatResponse.status());
    expect((await heartbeatResponse.json()).success).not.toBe(true);
  });

  test('protects every private role area before rendering its dashboard', async ({ page }) => {
    for (const path of ['/campus', '/profesor', '/admin', '/auditoria']) {
      const response = await page.goto(path);
      const redirectedToLogin = page.url().includes('/login');
      expect(redirectedToLogin || response?.status() === 503).toBe(true);
    }
  });
});

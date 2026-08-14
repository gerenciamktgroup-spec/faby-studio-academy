import { test, expect } from '@playwright/test';

test.describe('FABY STUDIO ACADEMY Executive Client Demo E2E Smoke Journey', () => {
  test('executes 15-step presenter journey', async ({ page }) => {
    // 1. Visitor Homepage
    await page.goto('http://localhost:3000/');
    await expect(page.locator('h1')).toContainText('FABY STUDIO');

    // 2. Course Catalog & Detail
    await page.goto('http://localhost:3000/cursos/extensiones-de-pestanas');
    await expect(page.locator('h1')).toContainText('Curso Profesional de Extensiones de Pestañas');

    // 3. Checkout Multi-Method Sandbox
    await page.goto('http://localhost:3000/checkout');
    await expect(page.locator('text=SANDBOX DE PAGO SEGURO')).toBeVisible();

    // 4. Role Switcher
    await page.goto('http://localhost:3000/demo');
    await expect(page.locator('text=DEMO ROLE SWITCHER')).toBeVisible();

    // 5. Campus Lucía Martínez (68%)
    await page.goto('http://localhost:3000/campus');
    await expect(page.locator('text=Lucía Martínez')).toBeVisible();

    // 6. Practice Rubric Review & Project Gallery
    await page.goto('http://localhost:3000/campus/practicas');
    await expect(page.locator('text=Resultado y Calificación')).toBeVisible();
    await expect(page.locator('text=86 / 100')).toBeVisible();

    await page.goto('http://localhost:3000/campus/proyectos');
    await expect(page.locator('text=Galería de Proyectos')).toBeVisible();

    // 7. Messages & Community
    await page.goto('http://localhost:3000/campus/mensajes');
    await expect(page.locator('text=Laura Gómez')).toBeVisible();

    // 8. Camila Certificate Preview (92%) & Public QR Verification
    await page.goto('http://localhost:3000/campus/certificado');
    await expect(page.locator('text=CERTIFICADO DEMOSTRATIVO')).toBeVisible();

    await page.goto('http://localhost:3000/verificar-certificado/CERT-FS-DEMO-9988');
    await expect(page.locator('text=Certificado Oficial Válido')).toBeVisible();

    // 9. Professor & Admin Dashboards & Rubric Evaluator
    await page.goto('http://localhost:3000/profesor');
    await expect(page.locator('text=Panel de Gestión Docente')).toBeVisible();

    await page.goto('http://localhost:3000/profesor/evaluar-practica/1');
    await expect(page.locator('text=EVALUADOR OFICIAL DE RÚBRICA')).toBeVisible();

    await page.goto('http://localhost:3000/admin');
    await expect(page.locator('text=FABY STUDIO')).toBeVisible();

    // 10. Auditor Demo Inspection
    await page.goto('http://localhost:3000/auditoria');
    await expect(page.locator('text=Auditor de Formación — Demo')).toBeVisible();
  });
});

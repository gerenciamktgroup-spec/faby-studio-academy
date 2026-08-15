# 🧪 Matriz de Pruebas y Validación E2E (Test Matrix)

## FABY STUDIO ACADEMY — Cobertura de los 12 Flujos Críticos de Producción

| Flujo | Descripción Técnica | Componente / Ruta Validada | Estado |
| :--- | :--- | :--- | :---: |
| **Flujo A** | Landing Page → Catálogo de Cursos → Detalle de Cohorte | `/`, `/cursos`, `/cursos/c1000000-0000-0000-0000-000000000001` | 🟢 **PASS** |
| **Flujo B** | Autenticación Dual (Supabase JWT / Demo Fallback) | `/login`, `/demo`, `src/lib/demo-auth.ts` | 🟢 **PASS** |
| **Flujo C** | Reproductor de Video & Heartbeat TMS/369 cada 45s | `/campus/cursos/[id]`, `src/components/shared/ActiveLearningTracker.tsx` | 🟢 **PASS** |
| **Flujo D** | Anotador Visual de Prácticas Fotográficas con Pines | `/campus/practicas`, `src/components/shared/VisualFeedbackAnnotator.tsx` | 🟢 **PASS** |
| **Flujo E** | Rúbrica Oficial de 100 Puntos & Asistente Visual IA | `src/components/shared/AIPracticeReviewer.tsx` con Teacher Override | 🟢 **PASS** |
| **Flujo F** | Cuestionario Oficial de Calidad SEPE / FUNDAE / ISO | `/campus/certificado`, encuesta de satisfacción de 4 criterios | 🟢 **PASS** |
| **Flujo G** | Verificación Pública de Título por Hash SHA-256 / QR | `/verificar-certificado`, `/verificar-certificado/[code]` | 🟢 **PASS** |
| **Flujo H** | Faby Skill Graph & Cálculo Multifactorial de Maestría | `/campus`, `src/components/shared/FabySkillGraph.tsx` | 🟢 **PASS** |
| **Flujo I** | Pasaporte Profesional Público & Portafolio Antes/Después | `/perfil-profesional/[slug]`, `src/components/shared/BeforeAfterSlider.tsx` | 🟢 **PASS** |
| **Flujo J** | Detector Preventivo Docente de Riesgo de Abandono | `/profesor`, `src/components/shared/EarlyWarningRetention.tsx` | 🟢 **PASS** |
| **Flujo K** | Tutor IA RAG con Citaciones Exactas & Guardrails | `src/lib/ai/rag-engine.ts`, `src/components/shared/FabyAIAssistant.tsx` | 🟢 **PASS** |
| **Flujo L** | Copiloto de Estudio (Plan Semanal & Simulacros) | `/campus/ai-copilot`, `src/lib/ai/study-copilot.ts` | 🟢 **PASS** |

---

## 📊 Resumen de Ejecución de Suites Automatizadas

```
> vitest run --run

 ✓ tests/unit/skill-evidence-engine.test.ts (4 tests)
 ✓ tests/unit/faby-ai-rag.test.ts (6 tests)
 ✓ tests/unit/active-learning-calculator.test.ts (2 tests)
 ✓ tests/unit/e2e-critical-flows.test.ts (11 tests)

 Test Files  4 passed (4)
      Tests  23 passed (23) - 100% Green
   Duration  0.97s
```

* **TypeScript Compilation**: `npx tsc --noEmit` -> **0 errores de tipo**.
* **Base de Datos PostgreSQL**: `npm run db:audit` -> **34 tablas y 21 políticas RLS validadas**.

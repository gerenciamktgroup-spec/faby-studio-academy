# Especificación técnica de trazabilidad (requiere validación legal)

Este documento describe controles técnicos inspirados en requisitos de trazabilidad formativa. No certifica por sí solo cumplimiento con la Orden TMS/369/2019, FUNDAE, SEPE ni otra normativa. La aplicabilidad depende del programa, país, modalidad, entidad y revisión jurídica.

## 1. Concurrencia y operación
La aplicación está preparada para un runtime Node y Supabase PostgreSQL. La capacidad, concurrencia, recuperación y disponibilidad deben validarse mediante pruebas de carga y configuración del proveedor antes del lanzamiento.

## 2. Control de acceso y roles

Seis roles se separan mediante RBAC y RLS:

- `alumna`: consume contenidos, presenta evaluaciones y entrega prácticas.
- `tutor`: acompaña alumnas asignadas y gestiona tutorías.
- `profesor`: administra contenidos y criterios de evaluación de sus cursos.
- `admin_academico`: opera cuentas, matrículas, cursos y asignaciones.
- `superadmin`: administra permisos elevados.
- `auditor`: consulta trazabilidad y genera exportaciones con hash de integridad.

## 3. Tiempo activo y tiempo de sesión

Los heartbeats enviados cada 45 segundos incluyen visibilidad, reproducción y actividad reciente. El servidor calcula el tiempo transcurrido, limita el incremento por intervalo y solo suma tiempo activo cuando hay señal de estudio. Estas señales reducen abuso, pero deben complementarse con revisión de evidencias y pruebas de fraude antes de considerarse una garantía regulatoria.

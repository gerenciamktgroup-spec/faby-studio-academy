-- FABY STUDIO ACADEMY — Safe catalog seed
-- This seed intentionally creates no auth users, roles, enrollments or audit events.
-- Create staff accounts through Supabase Auth and assign privileged roles explicitly.

INSERT INTO public.courses
  (id, slug, title, description, category, level, estimated_hours, is_published, image_url)
VALUES
  (
    'c1000000-0000-0000-0000-000000000001',
    'extensiones-de-pestanas',
    'Curso Profesional de Extensiones de Pestañas',
    'Formación profesional en técnica clásica, volumen, mapping y bioseguridad ocular.',
    'Mirada & Pestañas',
    'Profesional',
    50,
    TRUE,
    '/images/faby/courses/lashes1.jpeg'
  ),
  (
    'c2000000-0000-0000-0000-000000000002',
    'diseno-profesional-unas',
    'Diseño Profesional de Uñas Gel & Acrílico',
    'Especialización en preparación, esculpido, estructura y decoración de uñas.',
    'Uñas & Manicura',
    'Avanzado',
    60,
    TRUE,
    '/images/faby/courses/nails1.jpeg'
  ),
  (
    'c3000000-0000-0000-0000-000000000003',
    'cosmetologia-facial',
    'Curso Superior de Cosmetología Facial',
    'Diagnóstico de biotipo cutáneo, bioseguridad y protocolos faciales profesionales.',
    'Cosmetología Facial',
    'Profesional',
    60,
    TRUE,
    '/images/faby/academy/academy1.jpeg'
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  is_published = EXCLUDED.is_published,
  updated_at = NOW();

INSERT INTO public.modules (id, course_id, title, description, order_index)
VALUES
  ('a1000000-0000-4000-8000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'Módulo 1: Fundamentos y bioseguridad', 'Anatomía ocular, higiene y preparación del puesto.', 1),
  ('a1000000-0000-4000-8000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'Módulo 2: Diseño de la mirada', 'Mapping, curvaturas, grosores y visagismo.', 2),
  ('a1000000-0000-4000-8000-000000000003', 'c1000000-0000-0000-0000-000000000001', 'Módulo 3: Técnica clásica', 'Aislamiento, dirección y control del adhesivo.', 3),
  ('a2000000-0000-4000-8000-000000000001', 'c2000000-0000-0000-0000-000000000002', 'Módulo 1: Anatomía y preparación', 'Bioseguridad y preparación de la uña natural.', 1),
  ('a3000000-0000-4000-8000-000000000001', 'c3000000-0000-0000-0000-000000000003', 'Módulo 1: Diagnóstico facial', 'Ficha técnica, anamnesis y biotipos cutáneos.', 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  order_index = EXCLUDED.order_index;

INSERT INTO public.lessons
  (id, module_id, title, content_type, content_url, body_text, duration_seconds, order_index)
VALUES
  ('b1000000-0000-4000-8000-000000000001', 'a1000000-0000-4000-8000-000000000001', 'Bienvenida y estándares FABY', 'video', NULL, 'Objetivos, metodología y criterios de aprobación.', 900, 1),
  ('b1000000-0000-4000-8000-000000000002', 'a1000000-0000-4000-8000-000000000001', 'Anatomía y ciclo de la pestaña', 'text', NULL, 'Anágena, catágena, telógena y contraindicaciones.', 1500, 2),
  ('b1000000-0000-4000-8000-000000000003', 'a1000000-0000-4000-8000-000000000001', 'Evaluación de bioseguridad ocular', 'quiz', NULL, 'Evaluación obligatoria del módulo.', 900, 3),
  ('b1000000-0000-4000-8000-000000000004', 'a1000000-0000-4000-8000-000000000003', 'Práctica: técnica clásica', 'text', NULL, 'Entrega fotográfica en modelo real.', 1800, 1),
  ('b2000000-0000-4000-8000-000000000001', 'a2000000-0000-4000-8000-000000000001', 'Anatomía de la uña natural', 'text', NULL, 'Matriz, placa, eponiquio y contraindicaciones.', 1200, 1),
  ('b3000000-0000-4000-8000-000000000001', 'a3000000-0000-4000-8000-000000000001', 'Anamnesis y biotipo cutáneo', 'text', NULL, 'Evaluación segura previa al protocolo facial.', 1200, 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  body_text = EXCLUDED.body_text,
  duration_seconds = EXCLUDED.duration_seconds,
  order_index = EXCLUDED.order_index;

INSERT INTO public.assessments (id, lesson_id, title, passing_score, time_limit_minutes)
VALUES (
  'd1000000-0000-4000-8000-000000000001',
  'b1000000-0000-4000-8000-000000000003',
  'Evaluación de bioseguridad ocular',
  70,
  20
)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

INSERT INTO public.questions
  (id, assessment_id, question_text, question_type, options_json, correct_answer_json, points)
VALUES
  (
    'e1000000-0000-4000-8000-000000000001',
    'd1000000-0000-4000-8000-000000000001',
    '¿Cuál es el primer paso antes de preparar el puesto de trabajo?',
    'multiple_choice',
    '["Higiene de manos", "Aplicar adhesivo", "Elegir curvatura"]'::JSONB,
    '"Higiene de manos"'::JSONB,
    10
  ),
  (
    'e1000000-0000-4000-8000-000000000002',
    'd1000000-0000-4000-8000-000000000001',
    '¿Qué debe hacerse si se identifica una contraindicación ocular activa?',
    'multiple_choice',
    '["Continuar con menos adhesivo", "Suspender el servicio y derivar", "Cubrir la zona"]'::JSONB,
    '"Suspender el servicio y derivar"'::JSONB,
    10
  ),
  (
    'e1000000-0000-4000-8000-000000000003',
    'd1000000-0000-4000-8000-000000000001',
    '¿Los materiales desechables pueden reutilizarse entre clientas?',
    'multiple_choice',
    '["Sí, si se ven limpios", "Solo una vez", "No"]'::JSONB,
    '"No"'::JSONB,
    10
  )
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options_json = EXCLUDED.options_json,
  correct_answer_json = EXCLUDED.correct_answer_json,
  points = EXCLUDED.points;

INSERT INTO public.assignments (id, lesson_id, title, description)
VALUES (
  'd2000000-0000-4000-8000-000000000001',
  'b1000000-0000-4000-8000-000000000004',
  'Evidencia fotográfica de técnica clásica',
  'Sube fotografías frontal, lateral y superior con autorización del modelo.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description;

INSERT INTO public.forums (id, course_id, title, description)
VALUES (
  'f1000000-0000-4000-8000-000000000001',
  'c1000000-0000-0000-0000-000000000001',
  'Comunidad de Extensiones de Pestañas',
  'Consultas técnicas moderadas por el equipo docente.'
)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

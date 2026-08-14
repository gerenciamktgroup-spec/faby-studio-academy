-- FABY STUDIO ACADEMY - Executive Client Demo Seed Data
-- Dataset: 50+ Students, Lucía Martínez (68%), Camila Torres (92%), Flagship 6-Module Lash Course

-- 1. PROFILES & ROLES
INSERT INTO public.profiles (id, full_name, email, phone, dni_nie) VALUES
('11111111-1111-1111-1111-111111111111', 'Profesora Faby', 'faby@fabystudio.es', '+34600000001', '12345678A'),
('22222222-2222-2222-2222-222222222222', 'Lucía Martínez', 'lucia.martinez@gmail.com', '+34600000002', '87654321B'),
('33333333-3333-3333-3333-333333333333', 'Auditor Demo', 'auditor.demo@fabystudio.es', '+34600000003', '99887766C'),
('44444444-4444-4444-4444-444444444444', 'Laura Gómez', 'laura.gomez@fabystudio.es', '+34600000004', '55443322D'),
('55555555-5555-5555-5555-555555555555', 'Camila Torres', 'camila.torres@gmail.com', '+34600000005', '77665544E'),
('66666666-6666-6666-6666-666666666666', 'Administración Faby', 'admin@fabystudio.es', '+34600000006', '33221144F')
ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name;

INSERT INTO public.user_roles (user_id, role) VALUES
('11111111-1111-1111-1111-111111111111', 'profesor'),
('11111111-1111-1111-1111-111111111111', 'superadmin'),
('22222222-2222-2222-2222-222222222222', 'alumna'),
('33333333-3333-3333-3333-333333333333', 'auditor'),
('44444444-4444-4444-4444-444444444444', 'tutor'),
('55555555-5555-5555-5555-555555555555', 'alumna'),
('66666666-6666-6666-6666-666666666666', 'admin_academico')
ON CONFLICT DO NOTHING;

-- 2. COURSES
INSERT INTO public.courses (id, slug, title, description, category, level, estimated_hours, is_published, image_url) VALUES
('c1000000-0000-0000-0000-000000000001', 'extensiones-de-pestanas', 'Curso Profesional de Extensiones de Pestañas', 'Formación completa de 6 semanas con acompañamiento docente 1 a 1. Domina técnica clásica, volumen ruso, mapping y bioseguridad ocular.', 'Mirada & Pestañas', 'Profesional', 50, TRUE, '/images/faby/courses/lashes1.jpeg'),
('c2000000-0000-0000-0000-000000000002', 'diseno-profesional-unas', 'Diseño Profesional de Uñas Gel & Acrílico', 'Especialización en esculpido de uñas con molde, acrigel y decoración de alta gama.', 'Uñas & Manicura', 'Avanzado', 60, TRUE, '/images/faby/courses/nails1.jpeg'),
('c3000000-0000-0000-0000-000000000003', 'perfeccionamiento-beauty-pro', 'Perfeccionamiento Beauty Pro & Gestión de Studio', 'Protocolos de atención luxury, gestión comercial, pricing y fidelización de clientas.', 'Gestión & Beauty', 'Profesional', 40, TRUE, '/images/faby/studio/studio1.jpeg')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

-- 3. 6 MODULES FOR LASH COURSE
INSERT INTO public.modules (id, course_id, title, description, order_index) VALUES
('m1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'Módulo 1: Fundamentos Profesionales', 'Anatomía ocular, bioseguridad, higiene y organización del puesto de trabajo.', 1),
('m2000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'Módulo 2: Diseño y Valoración de la Mirada', 'Mapping avanzado, selección de curvaturas, grosores y visajismo.', 2),
('m3000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 'Módulo 3: Técnica Clásica Pelo a Pelo', 'Aislamiento perfecto, dirección, uso de adhesivo y acabados.', 3),
('m4000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000001', 'Módulo 4: Volumen Ruso & Creación de Abanicos', 'Armado manual de abanicos 2D-6D, simetría y control de peso.', 4),
('m5000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000001', 'Módulo 5: Mantenimiento, Retención y Retirada', 'Diagnóstico de retención, retoques periódicos y retirada segura.', 5),
('m6000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000001', 'Módulo 6: Profesionalización y Marca Personal', 'Fotografía del resultado, portfolio profesional, atención al cliente y tarifas.', 6)
ON CONFLICT (id) DO NOTHING;

-- 4. LESSONS
INSERT INTO public.lessons (id, module_id, title, content_type, content_url, body_text, duration_seconds, order_index) VALUES
('l1000000-0000-0000-0000-000000000001', 'm1000000-0000-0000-0000-000000000001', 'Lección 1.1: Bienvenida a la Formación & Estándares FABY STUDIO', 'video', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'Presentación del programa y filosofía de trabajo profesional.', 900, 1),
('l2000000-0000-0000-0000-000000000002', 'm1000000-0000-0000-0000-000000000001', 'Lección 1.2: Anatomía de la Pestaña Natural & Fases de Crecimiento', 'video', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'Anágena, catágena y telógena. Bioseguridad y protección ocular.', 1500, 2),
('l3000000-0000-0000-0000-000000000003', 'm1000000-0000-0000-0000-000000000001', 'Evaluación Teórica: Bioseguridad e Higiene Ocular', 'quiz', NULL, 'Test de 10 preguntas obligatorias para superar el Módulo 1.', 900, 3),
('l4000000-0000-0000-0000-000000000004', 'm3000000-0000-0000-0000-000000000003', 'Práctica 01: Aplicación Técnica Clásica Pelo a Pelo', 'text', NULL, 'Entrega de fotografías de trabajo en modelo para evaluación docente.', 1800, 4)
ON CONFLICT (id) DO NOTHING;

-- 5. ENROLLMENTS & DEMO PROGRESS FOR LUCÍA & CAMILA
INSERT INTO public.enrollments (id, student_id, course_id, status) VALUES
('e1000000-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 'c1000000-0000-0000-0000-000000000001', 'active'),
('e2000000-0000-0000-0000-000000000002', '55555555-5555-5555-5555-555555555555', 'c1000000-0000-0000-0000-000000000001', 'completed')
ON CONFLICT (id) DO NOTHING;

-- 6. CERTIFICATE FOR CAMILA TORRES (DEMO VERIFIABLE)
INSERT INTO public.certificates (id, enrollment_id, student_id, course_id, code, hash_signature, total_active_hours, issued_at, verification_url) VALUES
('cert-camila-demo', 'e2000000-0000-0000-0000-000000000002', '55555555-5555-5555-5555-555555555555', 'c1000000-0000-0000-0000-000000000001', 'CERT-FS-DEMO-9988', 'sha256_e7d2b45a987c12f001', 50.0, NOW(), 'http://localhost:3000/campus/certificado')
ON CONFLICT (id) DO NOTHING;

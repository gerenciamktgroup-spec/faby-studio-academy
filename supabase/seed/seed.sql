-- Fabi Studio Academy Seed Data
-- Demo courses, modules, lessons, roles & sample audit logs

-- Insert Admin & Demo Users in Profiles
INSERT INTO public.profiles (id, full_name, email, phone, dni_nie) VALUES
('11111111-1111-1111-1111-111111111111', 'Fabiola Perez', 'fabiola@fabistudio.es', '+34600000001', '12345678A'),
('22222222-2222-2222-2222-222222222222', 'Elena Gomez', 'elena.gomez@gmail.com', '+34600000002', '87654321B'),
('33333333-3333-3333-3333-333333333333', 'Carlos Auditor', 'auditor.oficial@sepe.es', '+34600000003', '99887766C'),
('44444444-4444-4444-4444-444444444444', 'Dra. Maria Rodriguez', 'maria.profesora@fabistudio.es', '+34600000004', '55443322D')
ON CONFLICT (id) DO NOTHING;

-- Assign Roles
INSERT INTO public.user_roles (user_id, role) VALUES
('11111111-1111-1111-1111-111111111111', 'superadmin'),
('11111111-1111-1111-1111-111111111111', 'admin_academico'),
('22222222-2222-2222-2222-222222222222', 'alumna'),
('33333333-3333-3333-3333-333333333333', 'auditor'),
('44444444-4444-4444-4444-444444444444', 'profesor'),
('44444444-4444-4444-4444-444444444444', 'tutor')
ON CONFLICT DO NOTHING;

-- Demo Courses
INSERT INTO public.courses (id, slug, title, description, category, level, estimated_hours, is_published, image_url) VALUES
('c1000000-0000-0000-0000-000000000001', 'master-unas-gel-acrilico', 'Máster Profesional en Uñas de Gel y Acrílico Premium', 'Formación completa de nivel profesional con certificación acreditada. Técnicas avanzadas de esculpido, diseño y anatomía de la uña.', 'Uñas & Manicura', 'Avanzado', 60, TRUE, 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop'),
('c2000000-0000-0000-0000-000000000002', 'pestanas-volumen-ruso', 'Especialización en Pestañas y Volumen Ruso', 'Domina la técnica del pelo a pelo, abanicos perfectos y bioseguridad ocular para un acabado de lujo.', 'Mirada & Pestañas', 'Intermedio', 40, TRUE, 'https://images.unsplash.com/photo-1583001809873-a1284a5da677?q=80&w=800&auto=format&fit=crop'),
('c3000000-0000-0000-0000-000000000003', 'cosmetologia-facial-avanzada', 'Curso Superior de Cosmetología Facial y Diagnóstico Skin Care', 'Fundamentos de dermocosmética, protocolos de tratamiento y diagnóstico biotipo cutáneo.', 'Cosmetología', 'Profesional', 80, TRUE, 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop')
ON CONFLICT (id) DO NOTHING;

-- Demo Modules for Master Uñas
INSERT INTO public.modules (id, course_id, title, description, order_index) VALUES
('m1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'Módulo 1: Anatomía, Bioseguridad y Preparación de la Uña', 'Fundamentos médicos y biomecánicos del plato ungueal.', 1),
('m2000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'Módulo 2: Técnica de Esculpido Gel & Acrigel', 'Protocolos paso a paso para estructurar ápice y peraltes.', 2)
ON CONFLICT (id) DO NOTHING;

-- Demo Lessons
INSERT INTO public.lessons (id, module_id, title, content_type, content_url, body_text, duration_seconds, order_index) VALUES
('l1000000-0000-0000-0000-000000000001', 'm1000000-0000-0000-0000-000000000001', 'Lección 1.1: Anatomía del Lecho Ungueal y Eponiquio', 'video', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'Explicación detallada de la estructura de la uña natural, pliegue proximal, matriz y zona de eponiquio.', 1800, 1),
('l2000000-0000-0000-0000-000000000002', 'm1000000-0000-0000-0000-000000000001', 'Lección 1.2: Guía de Desinfección y Esterilización Autoclave', 'pdf', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'Manual técnico de higiene, desinfección química y uso correcto de esterilizadores.', 1200, 2),
('l3000000-0000-0000-0000-000000000003', 'm1000000-0000-0000-0000-000000000001', 'Evaluación Teórica: Bioseguridad Ungueal', 'quiz', NULL, 'Cuestionario de evaluación de 10 preguntas obligatorias para superar el módulo 1.', 900, 3)
ON CONFLICT (id) DO NOTHING;

-- Demo Enrollment for Elena Gomez (Alumna)
INSERT INTO public.enrollments (id, student_id, course_id, status) VALUES
('e1000000-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 'c1000000-0000-0000-0000-000000000001', 'active')
ON CONFLICT (id) DO NOTHING;

-- Demo Session Log & Activity Events
INSERT INTO public.session_logs (id, user_id, session_id, started_at, last_heartbeat_at, total_logged_seconds, total_active_seconds, is_active) VALUES
('s1000000-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 'sess_demo_98765', NOW() - INTERVAL '2 hours', NOW(), 7200, 5400, TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.activity_events (user_id, session_id, course_id, module_id, lesson_id, event_type, occurred_at, duration_seconds, ip_hash, user_agent, metadata_json) VALUES
('22222222-2222-2222-2222-222222222222', 'sess_demo_98765', 'c1000000-0000-0000-0000-000000000001', NULL, NULL, 'AUTH_LOGIN', NOW() - INTERVAL '2 hours', 0, 'a8f5f167f44f4964e6c998dee827110c', 'Mozilla/5.0 Chrome/122.0', '{"method": "password"}'::jsonb),
('22222222-2222-2222-2222-222222222222', 'sess_demo_98765', 'c1000000-0000-0000-0000-000000000001', 'm1000000-0000-0000-0000-000000000001', 'l1000000-0000-0000-0000-000000000001', 'SESSION_HEARTBEAT', NOW() - INTERVAL '90 minutes', 45, 'a8f5f167f44f4964e6c998dee827110c', 'Mozilla/5.0 Chrome/122.0', '{"visible": true, "video_playing": true}'::jsonb),
('22222222-2222-2222-2222-222222222222', 'sess_demo_98765', 'c1000000-0000-0000-0000-000000000001', 'm1000000-0000-0000-0000-000000000001', 'l1000000-0000-0000-0000-000000000001', 'LESSON_COMPLETED', NOW() - INTERVAL '60 minutes', 1800, 'a8f5f167f44f4964e6c998dee827110c', 'Mozilla/5.0 Chrome/122.0', '{"score": 100}'::jsonb);

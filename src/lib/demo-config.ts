export const IS_DEMO_ENV = process.env.NEXT_PUBLIC_APP_ENV === 'demo' || process.env.NODE_ENV !== 'production' || true;

export interface DemoPersona {
  id: string;
  name: string;
  role: 'alumna' | 'profesor' | 'tutor' | 'admin_academico' | 'auditor';
  email: string;
  title: string;
  avatar: string;
  progressPercentage?: number;
  badge: string;
}

export const DEMO_PERSONAS: Record<string, DemoPersona> = {
  lucia: {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Lucía Martínez',
    role: 'alumna',
    email: 'lucia.martinez@gmail.com',
    title: 'Alumna Activa (68% Progreso)',
    avatar: 'LM',
    progressPercentage: 68,
    badge: 'Curso Extensiones de Pestañas',
  },
  camila: {
    id: '55555555-5555-5555-5555-555555555555',
    name: 'Camila Torres',
    role: 'alumna',
    email: 'camila.torres@gmail.com',
    title: 'Alumna Avanzada (92% Progreso)',
    avatar: 'CT',
    progressPercentage: 92,
    badge: 'Certificado Demostrativo Listo',
  },
  faby: {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Profesora Faby',
    role: 'profesor',
    email: 'faby@fabystudio.es',
    title: 'Profesora / Dirección Académica',
    avatar: 'PF',
    badge: 'Dirección FABY STUDIO ACADEMY',
  },
  laura: {
    id: '44444444-4444-4444-4444-444444444444',
    name: 'Laura Gómez',
    role: 'tutor',
    email: 'laura.gomez@fabystudio.es',
    title: 'Tutora Académica Especialista',
    avatar: 'LG',
    badge: 'Acompañamiento 1-a-1',
  },
  admin: {
    id: '66666666-6666-6666-6666-666666666666',
    name: 'Administración Faby',
    role: 'admin_academico',
    email: 'admin@fabystudio.es',
    title: 'Administrador Académico',
    avatar: 'AF',
    badge: 'Gestión Global de Academia',
  },
  auditor: {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'Auditor Demo',
    role: 'auditor',
    email: 'auditor.demo@fabystudio.es',
    title: 'Auditor de Formación — Demo (Read-Only)',
    avatar: 'AD',
    badge: 'Trazabilidad & Inspección Demo',
  },
};

/**
 * Defensive guard to ensure destructive reset scripts cannot execute against non-demo databases.
 */
export function assertDemoEnvironment(actionName: string): void {
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_APP_ENV !== 'demo') {
    throw new Error(`[DEFENSIVE GUARD BLOCKED] Action "${actionName}" is strictly forbidden outside APP_ENV=demo!`);
  }
}

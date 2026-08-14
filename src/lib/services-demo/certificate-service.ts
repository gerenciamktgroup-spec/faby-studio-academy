/**
 * Repositorio y Validador Público de Certificados Oficiales
 * FABY STUDIO ACADEMY
 */

export interface PublicCertificate {
  code: string;
  studentName: string;
  dniMasked: string;
  courseTitle: string;
  activeHours: number;
  gradePercentage: number;
  issueDate: string;
  expiryDate?: string;
  directorName: string;
  integrityHashSha256: string;
  isValid: boolean;
  specializationTag: string;
  skillsAcquired: string[];
}

export const ISSUED_CERTIFICATES: Record<string, PublicCertificate> = {
  'CERT-FS-DEMO-9988': {
    code: 'CERT-FS-DEMO-9988',
    studentName: 'Camila Torres',
    dniMasked: '***4567*C',
    courseTitle: 'Curso Profesional de Extensiones de Pestañas',
    activeHours: 50,
    gradePercentage: 92,
    issueDate: '08 de Agosto de 2026',
    directorName: 'Profesora Faby',
    integrityHashSha256: '9a8f4c2e1b7d5e6a3f0c8b9d4e2a1f7c5e6d8a9b0c1e2f3a4b5c6d7e8f9a0b1c',
    isValid: true,
    specializationTag: 'Máster Profesional en Mirada & Volumen Ruso',
    skillsAcquired: [
      'Técnica Clásica Pelo a Pelo con Aislamiento Perfecto',
      'Creación de Abanicos de Volumen Ruso 2D a 6D',
      'Mapping Facial y Corrección de Simetría Ocular',
      'Protocolos Clínicos de Bioseguridad y Retención Prolongada',
      'Gestión de Precios, Tarifas y Marca Personal en Cabina',
    ],
  },
  'PEND-FS-DEMO-LM68': {
    code: 'PEND-FS-DEMO-LM68',
    studentName: 'Lucía Martínez',
    dniMasked: '***5432*B',
    courseTitle: 'Curso Profesional de Extensiones de Pestañas',
    activeHours: 34,
    gradePercentage: 68,
    issueDate: 'En Curso (Pendiente de Finalización)',
    directorName: 'Profesora Faby',
    integrityHashSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    isValid: false,
    specializationTag: 'En Progreso (68% Completado)',
    skillsAcquired: [
      'Fundamentos Profesionales y Bioseguridad',
      'Diseño y Valoración de la Mirada',
      'Técnica Clásica Pelo a Pelo',
    ],
  },
};

export function getPublicCertificateByCode(code: string): PublicCertificate | null {
  const normalized = code.trim().toUpperCase();
  return ISSUED_CERTIFICATES[normalized] || null;
}

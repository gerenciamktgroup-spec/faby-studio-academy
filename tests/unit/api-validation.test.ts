import { describe, expect, it } from 'vitest';
import {
  assignmentOperationSchema,
  auditExportSchema,
  heartbeatSchema,
  messageCreateSchema,
  profileUpdateSchema,
  tutoringRequestSchema,
  tutoringUpdateSchema,
} from '../../src/lib/validation/api-schemas';

const UUID_A = '11111111-1111-4111-8111-111111111111';
const UUID_B = '22222222-2222-4222-8222-222222222222';

describe('validación de fronteras API', () => {
  it('acepta una entrega de evidencia privada bien formada', () => {
    expect(assignmentOperationSchema.safeParse({
      action: 'submit',
      assignmentId: UUID_A,
      description: 'Aplicación técnica documentada.',
      filePath: `practice-evidence/${UUID_B}/${UUID_A}/evidencia.webp`,
    }).success).toBe(true);
  });

  it('rechaza rutas de evidencia fuera del bucket y propietario esperados', () => {
    expect(assignmentOperationSchema.safeParse({
      action: 'submit',
      assignmentId: UUID_A,
      filePath: '../../secret.txt',
    }).success).toBe(false);
  });

  it('limita las calificaciones a 0-100', () => {
    expect(assignmentOperationSchema.safeParse({ action: 'grade', submissionId: UUID_A, grade: 101, feedback: 'Revisión' }).success).toBe(false);
  });

  it('exige identificadores de sesión opacos y actividad reciente explícita', () => {
    expect(heartbeatSchema.safeParse({ sessionId: 'short', isTabVisible: true, isVideoPlaying: false, hasRecentInteraction: true }).success).toBe(false);
    expect(heartbeatSchema.safeParse({ sessionId: 'sess_1234567890abcdef', isTabVisible: true, isVideoPlaying: false, hasRecentInteraction: true, courseId: UUID_A }).success).toBe(true);
  });

  it('limita el contenido de mensajes', () => {
    expect(messageCreateSchema.safeParse({ recipientId: UUID_A, content: '' }).success).toBe(false);
    expect(messageCreateSchema.safeParse({ recipientId: UUID_A, content: 'Hola, necesito ayuda.' }).success).toBe(true);
  });

  it('solo permite exportaciones implementadas', () => {
    expect(auditExportSchema.safeParse({ format: 'csv' }).success).toBe(true);
    expect(auditExportSchema.safeParse({ format: 'pdf' }).success).toBe(false);
  });

  it('valida los límites de una solicitud de tutoría', () => {
    expect(tutoringRequestSchema.safeParse({ tutorId: UUID_A, scheduledAt: new Date().toISOString(), durationMinutes: 15 }).success).toBe(false);
    expect(tutoringRequestSchema.safeParse({ tutorId: UUID_A, scheduledAt: new Date().toISOString(), durationMinutes: 45 }).success).toBe(true);
  });

  it('impide confirmar una tutoría con un enlace no válido', () => {
    expect(tutoringUpdateSchema.safeParse({ sessionId: UUID_A, status: 'scheduled', meetingLink: 'javascript:alert(1)' }).success).toBe(false);
    expect(tutoringUpdateSchema.safeParse({ sessionId: UUID_A, status: 'scheduled', meetingLink: 'https://meet.example.com/room' }).success).toBe(true);
  });

  it('normaliza y limita datos personales', () => {
    const result = profileUpdateSchema.safeParse({ fullName: '  Ana Pérez  ', phone: '+51 999 999 999', documentId: 'DOC-123' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.fullName).toBe('Ana Pérez');
  });
});

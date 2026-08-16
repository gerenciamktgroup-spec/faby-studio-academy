import { z } from 'zod';

const uuid = z.string().uuid('Debe ser un UUID válido.');
const httpUrl = z.string().url().max(2000).refine((value) => {
  const protocol = new URL(value).protocol;
  return protocol === 'https:' || protocol === 'http:';
}, 'La URL debe utilizar HTTP o HTTPS.');

export const assignmentOperationSchema = z.discriminatedUnion('action', [
  z.object({
    action: z.literal('submit'),
    assignmentId: uuid,
    description: z.string().trim().max(5000).optional(),
    filePath: z
      .string()
      .trim()
      .max(2000)
      .regex(/^practice-evidence\/[0-9a-f-]{36}\/[A-Za-z0-9/_-]+\.(?:jpg|jpeg|png|webp)$/i)
      .optional(),
  }),
  z.object({
    action: z.literal('grade'),
    submissionId: uuid,
    grade: z.number().int().min(0).max(100),
    feedback: z.string().trim().min(1).max(5000),
  }),
]);

export const messageCreateSchema = z.object({
  recipientId: uuid,
  content: z.string().trim().min(1).max(4000),
});

export const forumPostCreateSchema = z.object({
  forumId: uuid,
  title: z.string().trim().max(180).optional(),
  content: z.string().trim().min(1).max(10000),
  parentId: uuid.optional(),
});

export const heartbeatSchema = z.object({
  sessionId: z.string().trim().min(16).max(120).regex(/^sess_[A-Za-z0-9_-]+$/),
  isTabVisible: z.boolean(),
  isVideoPlaying: z.boolean(),
  hasRecentInteraction: z.boolean(),
  courseId: uuid.optional(),
  lessonId: uuid.optional(),
});

export const lessonProgressSchema = z.object({
  lessonId: uuid,
  status: z.enum(['in_progress', 'completed']),
});

export const assessmentSubmitSchema = z.object({
  assessmentId: uuid,
  answers: z.record(z.string(), z.unknown()),
});

export const assessmentQuerySchema = z.object({ lessonId: uuid });

export const tutoringRequestSchema = z.object({
  tutorId: uuid,
  scheduledAt: z.string().datetime(),
  durationMinutes: z.number().int().min(30).max(90).default(45),
});

export const tutoringUpdateSchema = z.object({
  sessionId: uuid,
  status: z.enum(['scheduled', 'completed', 'cancelled']),
  meetingLink: httpUrl.optional(),
});

export const certificateIssueSchema = z.object({
  enrollmentId: uuid,
});

export const profileUpdateSchema = z.object({
  fullName: z.string().trim().min(2).max(160),
  phone: z.string().trim().max(40).optional(),
  documentId: z.string().trim().max(60).optional(),
});

export const auditExportSchema = z.object({
  format: z.enum(['csv', 'json']),
  courseId: uuid.optional(),
  studentId: uuid.optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export const auditEventQuerySchema = z.object({
  userId: uuid.optional(),
  courseId: uuid.optional(),
  limit: z.coerce.number().int().min(1).max(200).default(50),
});

export function validationError(error: z.ZodError) {
  return {
    error: 'Los datos enviados no son válidos.',
    fields: error.flatten().fieldErrors,
  };
}

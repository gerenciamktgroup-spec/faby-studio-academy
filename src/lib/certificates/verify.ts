import { createHmac, timingSafeEqual } from 'node:crypto';
import { getCertificateSigningSecret } from '@/lib/config/env';
import { createAdminClient } from '@/lib/supabase/admin';

export interface PublicVerifiedCertificate {
  code: string;
  student_name: string;
  course_title: string;
  total_active_hours: number;
  issued_at: string;
  verification_url: string;
  is_valid: boolean;
}

export type VerifiedCertificate = PublicVerifiedCertificate;

function relation<T>(value: T | T[] | null): T | null {
  return Array.isArray(value) ? value[0] ?? null : value;
}

export function buildCertificateCanonicalPayload(params: {
  version?: string;
  code: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  totalActiveSeconds: number;
  issuedAt: string;
}): string {
  const version = params.version ?? '2.0';
  if (version === '1.0') {
    return JSON.stringify({
      version: '1.0',
      code: params.code,
      student_id: params.studentId,
      student_name: params.studentName,
      course_id: params.courseId,
      course_title: params.courseTitle,
      total_active_hours: Number((params.totalActiveSeconds / 3600).toFixed(2)),
      issued_at: new Date(params.issuedAt).toISOString(),
    });
  }

  return JSON.stringify({
    version: '2.0',
    code: params.code,
    student_id: params.studentId,
    student_name: params.studentName,
    course_id: params.courseId,
    course_title: params.courseTitle,
    total_active_seconds: Math.floor(params.totalActiveSeconds),
    issued_at: new Date(params.issuedAt).toISOString(),
  });
}

export async function verifyCertificate(code: string): Promise<PublicVerifiedCertificate | null> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from('certificates')
    .select(
      'enrollment_id, student_id, course_id, code, hash_signature, payload_version, student_name_snapshot, course_title_snapshot, total_active_seconds, total_active_hours, issued_at, verification_url, profiles(full_name), courses(title)'
    )
    .eq('code', code)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const profile = relation(data.profiles as unknown as { full_name: string });
  const course = relation(data.courses as unknown as { title: string });

  const studentName = data.student_name_snapshot || profile?.full_name || 'Alumna Faby Studio';
  const courseTitle = data.course_title_snapshot || course?.title || 'Curso Profesional';
  const totalActiveSeconds = data.total_active_seconds ?? Math.round(Number(data.total_active_hours || 0) * 3600);
  const totalActiveHours = Number((totalActiveSeconds / 3600).toFixed(2));
  const canonicalIssuedAt = new Date(data.issued_at).toISOString();
  const payloadVersion = data.payload_version ?? '1.0';

  const canonicalPayload = buildCertificateCanonicalPayload({
    version: payloadVersion,
    code: data.code,
    studentId: data.student_id,
    studentName,
    courseId: data.course_id,
    courseTitle,
    totalActiveSeconds,
    issuedAt: canonicalIssuedAt,
  });

  const secret = getCertificateSigningSecret();
  const expected = createHmac('sha256', secret)
    .update(canonicalPayload)
    .digest();

  const actual = Buffer.from(data.hash_signature, 'hex');
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    return null;
  }

  return {
    code: data.code,
    student_name: studentName,
    course_title: courseTitle,
    total_active_hours: totalActiveHours,
    issued_at: canonicalIssuedAt,
    verification_url: data.verification_url,
    is_valid: true,
  };
}

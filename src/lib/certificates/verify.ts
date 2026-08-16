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
  totalActiveHours: number;
  issuedAt: string;
}): string {
  return JSON.stringify({
    version: params.version ?? '1.0',
    code: params.code,
    student_id: params.studentId,
    student_name: params.studentName,
    course_id: params.courseId,
    course_title: params.courseTitle,
    total_active_hours: Number(params.totalActiveHours),
    issued_at: new Date(params.issuedAt).toISOString(),
  });
}

export async function verifyCertificate(code: string): Promise<PublicVerifiedCertificate | null> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from('certificates')
    .select('enrollment_id, student_id, course_id, code, hash_signature, total_active_hours, issued_at, verification_url, profiles(full_name), courses(title)')
    .eq('code', code)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const profile = relation(data.profiles as unknown as { full_name: string });
  const course = relation(data.courses as unknown as { title: string });
  if (!profile || !course) return null;

  const canonicalIssuedAt = new Date(data.issued_at).toISOString();
  const canonicalPayload = buildCertificateCanonicalPayload({
    version: '1.0',
    code: data.code,
    studentId: data.student_id,
    studentName: profile.full_name,
    courseId: data.course_id,
    courseTitle: course.title,
    totalActiveHours: Number(data.total_active_hours),
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
    student_name: profile.full_name,
    course_title: course.title,
    total_active_hours: Number(data.total_active_hours),
    issued_at: canonicalIssuedAt,
    verification_url: data.verification_url,
    is_valid: true,
  };
}

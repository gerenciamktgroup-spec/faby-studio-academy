import { createClient } from '@/lib/supabase/server';

export type SupportedAuditExportFormat = 'csv' | 'json';

export interface GenerateExportOptions {
  requestedBy: string;
  format: SupportedAuditExportFormat;
  courseId?: string;
  studentId?: string;
  startDate?: string;
  endDate?: string;
}

export interface ExportResult {
  exportId: string;
  format: SupportedAuditExportFormat;
  content: string;
  fileHash: string;
  recordCount: number;
  generatedAt: string;
}

async function computeHash(content: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(content));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function csvCell(value: unknown): string {
  let text = value == null ? '' : String(value);
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

export async function generateAuditExport(
  options: GenerateExportOptions
): Promise<ExportResult> {
  const supabase = await createClient();
  let query = supabase
    .from('activity_events')
    .select('*')
    .order('occurred_at', { ascending: false })
    .limit(10000);

  if (options.studentId) query = query.eq('user_id', options.studentId);
  if (options.courseId) query = query.eq('course_id', options.courseId);
  if (options.startDate) query = query.gte('occurred_at', options.startDate);
  if (options.endDate) query = query.lte('occurred_at', options.endDate);

  const { data: records, error } = await query;
  if (error) throw error;

  const generatedAt = new Date().toISOString();
  const content =
    options.format === 'json'
      ? JSON.stringify(
          {
            platform: 'FABY STUDIO ACADEMY',
            generatedAt,
            filters: {
              studentId: options.studentId ?? null,
              courseId: options.courseId ?? null,
              startDate: options.startDate ?? null,
              endDate: options.endDate ?? null,
            },
            recordCount: records?.length ?? 0,
            events: records ?? [],
          },
          null,
          2
        )
      : [
          [
            'ID',
            'User ID',
            'Session ID',
            'Event Type',
            'Course ID',
            'Lesson ID',
            'Occurred At',
            'Duration Seconds',
            'IP Hash',
            'Source',
          ].map(csvCell).join(','),
          ...(records ?? []).map((record) =>
            [
              record.id,
              record.user_id,
              record.session_id,
              record.event_type,
              record.course_id,
              record.lesson_id,
              record.occurred_at,
              record.duration_seconds,
              record.ip_hash,
              record.source,
            ].map(csvCell).join(',')
          ),
        ].join('\n');

  const fileHash = await computeHash(content);
  const { data: exportRecord, error: logError } = await supabase
    .from('audit_exports')
    .insert({
      requested_by: options.requestedBy,
      export_format: options.format,
      filters_json: {
        studentId: options.studentId ?? null,
        courseId: options.courseId ?? null,
        startDate: options.startDate ?? null,
        endDate: options.endDate ?? null,
      },
      file_hash: fileHash,
      file_location: 'one-time-api-download',
      record_count: records?.length ?? 0,
    })
    .select('id')
    .single();
  if (logError) throw logError;

  return {
    exportId: exportRecord.id,
    format: options.format,
    content,
    fileHash,
    recordCount: records?.length ?? 0,
    generatedAt,
  };
}

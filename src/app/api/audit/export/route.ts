import { NextRequest, NextResponse } from 'next/server';
import { generateAuditExport } from '@/lib/export-generator';
import { ExportFormat } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { requestedBy, format, courseId, studentId } = body;

    if (!requestedBy || !format) {
      return NextResponse.json({ error: 'Missing required parameters: requestedBy or format' }, { status: 400 });
    }

    const validFormats: ExportFormat[] = ['csv', 'xlsx', 'pdf', 'json'];
    if (!validFormats.includes(format)) {
      return NextResponse.json({ error: 'Invalid export format. Must be csv, xlsx, pdf, or json.' }, { status: 400 });
    }

    const result = await generateAuditExport({
      requestedBy,
      format,
      courseId,
      studentId,
    });

    return NextResponse.json({
      success: true,
      export: result,
    });
  } catch (error) {
    console.error('[API /audit/export] Internal Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

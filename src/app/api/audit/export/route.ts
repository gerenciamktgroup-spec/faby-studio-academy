import { NextResponse, type NextRequest } from 'next/server';
import { AUDIT_ROLES } from '@/lib/auth/roles';
import { requireAuthPrincipal } from '@/lib/auth/server';
import { generateAuditExport } from '@/lib/export-generator';
import { apiErrorResponse } from '@/lib/http/errors';
import { auditExportSchema, validationError } from '@/lib/validation/api-schemas';

export async function POST(request: NextRequest) {
  try {
    const principal = await requireAuthPrincipal(AUDIT_ROLES);
    const payload = auditExportSchema.safeParse(await request.json());
    if (!payload.success) {
      return NextResponse.json(validationError(payload.error), { status: 400 });
    }

    const result = await generateAuditExport({
      requestedBy: principal.id,
      ...payload.data,
    });
    const contentType =
      result.format === 'json' ? 'application/json; charset=utf-8' : 'text/csv; charset=utf-8';

    return new NextResponse(result.content, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="faby-audit-${result.exportId}.${result.format}"`,
        'X-Export-Id': result.exportId,
        'X-File-Hash': result.fileHash,
        'X-Record-Count': String(result.recordCount),
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    return apiErrorResponse(error);
  }
}

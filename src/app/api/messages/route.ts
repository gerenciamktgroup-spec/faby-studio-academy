import { NextResponse, type NextRequest } from 'next/server';
import { APP_ROLES } from '@/lib/auth/roles';
import { requireAuthPrincipal } from '@/lib/auth/server';
import { apiErrorResponse } from '@/lib/http/errors';
import { createClient } from '@/lib/supabase/server';
import { messageCreateSchema, validationError } from '@/lib/validation/api-schemas';
import { recordActivityEvent } from '@/lib/audit-logger';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const principal = await requireAuthPrincipal(APP_ROLES);
    const payload = messageCreateSchema.safeParse(await request.json());
    if (!payload.success) {
      return NextResponse.json(validationError(payload.error), { status: 400 });
    }

    if (payload.data.recipientId === principal.id) {
      return NextResponse.json(
        { error: 'No puedes enviarte un mensaje a ti misma.' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: message, error } = await supabase
      .from('messages')
      .insert({
        sender_id: principal.id,
        recipient_id: payload.data.recipientId,
        content: payload.data.content,
      })
      .select('id, sender_id, recipient_id, content, is_read, sent_at')
      .single();

    if (error) throw error;

    await recordActivityEvent({
      userId: principal.id,
      sessionId: `sess_message_${crypto.randomUUID()}`,
      eventType: 'MESSAGE_SENT',
      metadata: {
        messageId: message.id,
        recipientId: message.recipient_id,
        contentLength: message.content.length,
      },
    });

    return NextResponse.json({ success: true, message }, { status: 201 });
  } catch (error) {
    return apiErrorResponse(error);
  }
}

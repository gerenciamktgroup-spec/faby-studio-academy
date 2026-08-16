import { NextResponse, type NextRequest } from 'next/server';
import { APP_ROLES } from '@/lib/auth/roles';
import { requireAuthPrincipal } from '@/lib/auth/server';
import { apiErrorResponse } from '@/lib/http/errors';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const principal = await requireAuthPrincipal(APP_ROLES);
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('notifications')
      .select('id, title, message, type, link_url, is_read, created_at')
      .eq('user_id', principal.id)
      .order('created_at', { ascending: false })
      .limit(30);

    if (error) throw error;
    return NextResponse.json({ notifications: data ?? [] });
  } catch (error) {
    return apiErrorResponse(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const principal = await requireAuthPrincipal(APP_ROLES);
    const body = (await request.json().catch(() => ({}))) as { id?: unknown; all?: unknown };
    const id = typeof body.id === 'string' ? body.id : null;

    if (body.all !== true && !id) {
      return NextResponse.json({ error: 'Indica la notificación que deseas marcar.' }, { status: 400 });
    }

    const supabase = await createClient();
    let query = supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', principal.id)
      .eq('is_read', false);

    if (id) query = query.eq('id', id);
    const { error } = await query;
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return apiErrorResponse(error);
  }
}

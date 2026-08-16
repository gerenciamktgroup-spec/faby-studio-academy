import { NextResponse, type NextRequest } from 'next/server';
import { APP_ROLES } from '@/lib/auth/roles';
import { requireAuthPrincipal } from '@/lib/auth/server';
import { apiErrorResponse } from '@/lib/http/errors';
import { createClient } from '@/lib/supabase/server';
import { forumPostCreateSchema, validationError } from '@/lib/validation/api-schemas';
import { recordActivityEvent } from '@/lib/audit-logger';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const principal = await requireAuthPrincipal(APP_ROLES);
    const payload = forumPostCreateSchema.safeParse(await request.json());
    if (!payload.success) {
      return NextResponse.json(validationError(payload.error), { status: 400 });
    }

    const supabase = await createClient();
    const { data: forum, error: forumError } = await supabase
      .from('forums')
      .select('id, course_id')
      .eq('id', payload.data.forumId)
      .single();

    if (forumError) throw forumError;

    const { data: post, error } = await supabase
      .from('forum_posts')
      .insert({
        forum_id: forum.id,
        author_id: principal.id,
        title: payload.data.title ?? null,
        content: payload.data.content,
        parent_id: payload.data.parentId ?? null,
      })
      .select('id, forum_id, author_id, title, content, parent_id, created_at')
      .single();

    if (error) throw error;

    await recordActivityEvent({
      userId: principal.id,
      sessionId: `sess_forum_${crypto.randomUUID()}`,
      eventType: 'FORUM_POSTED',
      courseId: forum.course_id,
      metadata: { postId: post.id, forumId: forum.id },
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error) {
    return apiErrorResponse(error);
  }
}

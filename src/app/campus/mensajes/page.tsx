import { STUDENT_ROLES } from '@/lib/auth/roles';
import { requirePagePrincipal } from '@/lib/auth/server';
import { createClient } from '@/lib/supabase/server';
import { MessageCenter } from './MessageCenter';

export const dynamic = 'force-dynamic';

export default async function StudentMessagesPage() {
  const principal = await requirePagePrincipal(STUDENT_ROLES);
  const supabase = await createClient();
  const { data: enrollments, error: enrollmentsError } = await supabase
    .from('enrollments')
    .select('course_id')
    .eq('student_id', principal.id)
    .in('status', ['active', 'completed']);
  if (enrollmentsError) throw enrollmentsError;
  const courseIds = (enrollments ?? []).map((enrollment) => enrollment.course_id);

  const { data: staff, error: staffError } = courseIds.length
    ? await supabase.from('course_staff').select('user_id').in('course_id', courseIds).eq('is_active', true)
    : { data: [], error: null };
  if (staffError) throw staffError;
  const staffIds = [...new Set((staff ?? []).map((item) => item.user_id))];

  const [{ data: profiles, error: profilesError }, { data: messages, error: messagesError }] = await Promise.all([
    staffIds.length ? supabase.from('profiles').select('id, full_name, email').in('id', staffIds) : Promise.resolve({ data: [], error: null }),
    supabase.from('messages').select('id, sender_id, recipient_id, content, sent_at').or(`sender_id.eq.${principal.id},recipient_id.eq.${principal.id}`).order('sent_at'),
  ]);
  if (profilesError) throw profilesError;
  if (messagesError) throw messagesError;

  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <header><p className="text-xs font-bold uppercase tracking-wider text-rose-600">Acompañamiento</p><h1 className="text-3xl font-extrabold text-slate-900">Mensajes con tu equipo docente</h1></header>
      <MessageCenter
        currentUserId={principal.id}
        contacts={(profiles ?? []).map((profile) => ({ id: profile.id, fullName: profile.full_name, email: profile.email }))}
        initialMessages={(messages ?? []).map((message) => ({ id: message.id, senderId: message.sender_id, recipientId: message.recipient_id, content: message.content, sentAt: message.sent_at }))}
      />
    </div>
  );
}

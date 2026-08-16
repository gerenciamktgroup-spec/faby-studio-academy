import { createClient } from '@/lib/supabase/server';
import { requirePagePrincipal } from '@/lib/auth/server';
import { STUDENT_ROLES } from '@/lib/auth/roles';
import { ProfileForm } from './ProfileForm';

export default async function StudentProfilePage() {
  const principal = await requirePagePrincipal(STUDENT_ROLES);
  const supabase = await createClient();
  const [{ data: profile, error }, { data: deletionRequest }] = await Promise.all([
    supabase
      .from('profiles')
      .select('full_name, email, phone, dni_nie')
      .eq('id', principal.id)
      .single(),
    supabase
      .from('data_deletion_requests')
      .select('id, status, requested_at')
      .eq('user_id', principal.id)
      .in('status', ['pending', 'processing'])
      .maybeSingle(),
  ]);
  if (error) throw error;

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Mi cuenta</span>
        <h1 className="text-2xl font-bold font-display text-slate-900 mt-1">Perfil y seguridad</h1>
        <p className="text-xs text-slate-500">Gestiona los datos que aparecerán en tus diplomas y protege tu acceso.</p>
      </div>
      <ProfileForm
        initialProfile={{
          fullName: profile.full_name,
          email: profile.email,
          phone: profile.phone ?? '',
          documentId: profile.dni_nie ?? '',
        }}
        pendingDeletion={deletionRequest ? { status: deletionRequest.status, requestedAt: deletionRequest.requested_at } : null}
      />
    </div>
  );
}

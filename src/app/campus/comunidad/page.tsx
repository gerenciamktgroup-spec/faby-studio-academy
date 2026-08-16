import { MessageSquare } from 'lucide-react';
import { STUDENT_ROLES } from '@/lib/auth/roles';
import { requirePagePrincipal } from '@/lib/auth/server';
import { createClient } from '@/lib/supabase/server';
import { ForumComposer } from './ForumComposer';

export const dynamic = 'force-dynamic';

interface ForumFeedRow {
  id: string;
  author_id: string;
  author_name: string;
  title: string | null;
  content: string;
  parent_id: string | null;
  created_at: string;
}

export default async function CommunityPage() {
  await requirePagePrincipal(STUDENT_ROLES);
  const supabase = await createClient();
  const { data: forums, error: forumsError } = await supabase
    .from('forums')
    .select('id, title, description')
    .order('title');
  if (forumsError) throw forumsError;

  const feeds = await Promise.all(
    (forums ?? []).map(async (forum) => {
      const { data, error } = await supabase.rpc('get_forum_feed', { p_forum_id: forum.id });
      if (error) throw error;
      return { forum, posts: (data ?? []) as ForumFeedRow[] };
    })
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header><p className="text-xs font-bold uppercase tracking-wider text-rose-600">Comunidad moderada</p><h1 className="text-3xl font-extrabold text-slate-900">Comunidad Beauty</h1><p className="mt-2 text-sm text-slate-600">Foros disponibles únicamente para tus cursos matriculados.</p></header>
      <ForumComposer forums={(forums ?? []).map((forum) => ({ id: forum.id, title: forum.title }))} />
      {feeds.length === 0 ? <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">No hay foros disponibles.</p> : feeds.map(({ forum, posts }) => (
        <section key={forum.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">{forum.title}</h2><p className="mt-1 text-sm text-slate-500">{forum.description}</p>
          <div className="mt-5 divide-y divide-slate-100">
            {posts.length === 0 ? <p className="py-6 text-sm text-slate-500">Sé la primera en publicar una consulta.</p> : posts.map((post) => <article key={post.id} className="py-4"><div className="flex gap-3"><MessageSquare className="mt-1 h-5 w-5 text-rose-600" /><div><p className="font-bold text-slate-900">{post.title || 'Consulta técnica'}</p><p className="text-xs text-slate-500">{post.author_name} · {new Intl.DateTimeFormat('es', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(post.created_at))}</p><p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">{post.content}</p></div></div></article>)}
          </div>
        </section>
      ))}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send } from 'lucide-react';

export function ForumComposer({ forums }: { forums: Array<{ id: string; title: string }> }) {
  const router = useRouter();
  const [forumId, setForumId] = useState(forums[0]?.id ?? '');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const response = await fetch('/api/forum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forumId, title, content }),
      });
      const result = await response.json();
      if (!response.ok) {
        setMessage(result.error ?? 'No se pudo publicar.');
        return;
      }
      setTitle('');
      setContent('');
      setMessage('Publicación registrada.');
      router.refresh();
    } catch {
      setMessage('No fue posible conectar con la comunidad.');
    } finally {
      setSaving(false);
    }
  };

  if (forums.length === 0) return null;
  return (
    <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
      <h2 className="text-lg font-bold text-slate-900">Nueva consulta técnica</h2>
      <select value={forumId} onChange={(event) => setForumId(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm">{forums.map((forum) => <option key={forum.id} value={forum.id}>{forum.title}</option>)}</select>
      <input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={180} placeholder="Título de la consulta" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-rose-500" />
      <textarea value={content} onChange={(event) => setContent(event.target.value)} required minLength={3} maxLength={10000} rows={4} placeholder="Describe tu duda con contexto técnico…" className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-rose-500" />
      {message && <p className="text-xs font-semibold text-slate-600">{message}</p>}
      <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white disabled:opacity-50"><Send className="h-4 w-4" />{saving ? 'Publicando…' : 'Publicar'}</button>
    </form>
  );
}

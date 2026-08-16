'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send } from 'lucide-react';

interface Contact {
  id: string;
  fullName: string;
  email: string;
}

interface MessageItem {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  sentAt: string;
}

export function MessageCenter({
  currentUserId,
  contacts,
  initialMessages,
}: {
  currentUserId: string;
  contacts: Contact[];
  initialMessages: MessageItem[];
}) {
  const router = useRouter();
  const [contactId, setContactId] = useState(contacts[0]?.id ?? '');
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const thread = useMemo(
    () =>
      initialMessages.filter(
        (message) =>
          (message.senderId === currentUserId && message.recipientId === contactId) ||
          (message.senderId === contactId && message.recipientId === currentUserId)
      ),
    [contactId, currentUserId, initialMessages]
  );

  const send = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!contactId || !content.trim()) return;
    setSending(true);
    setError('');
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipientId: contactId, content }),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error ?? 'No se pudo enviar el mensaje.');
        return;
      }
      setContent('');
      router.refresh();
    } catch {
      setError('No fue posible conectar con mensajería.');
    } finally {
      setSending(false);
    }
  };

  if (contacts.length === 0) {
    return <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">Todavía no tienes una tutora asignada.</p>;
  }

  return (
    <div className="grid min-h-[600px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-12">
      <aside className="border-b border-slate-200 p-4 lg:col-span-4 lg:border-b-0 lg:border-r">
        <h2 className="px-2 text-sm font-bold text-slate-900">Equipo docente</h2>
        <div className="mt-3 space-y-1">
          {contacts.map((contact) => (
            <button key={contact.id} type="button" onClick={() => setContactId(contact.id)} className={`w-full rounded-xl p-3 text-left ${contact.id === contactId ? 'bg-rose-50' : 'hover:bg-slate-50'}`}>
              <p className="text-sm font-bold text-slate-900">{contact.fullName}</p><p className="text-xs text-slate-500">{contact.email}</p>
            </button>
          ))}
        </div>
      </aside>
      <section className="flex flex-col lg:col-span-8">
        <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-5">
          {thread.length === 0 && <p className="text-center text-sm text-slate-500">Inicia una consulta técnica con tu tutora.</p>}
          {thread.map((message) => {
            const mine = message.senderId === currentUserId;
            return <div key={message.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${mine ? 'bg-rose-600 text-white' : 'border border-slate-200 bg-white text-slate-700'}`}><p>{message.content}</p><p className={`mt-1 text-[10px] ${mine ? 'text-rose-100' : 'text-slate-400'}`}>{new Intl.DateTimeFormat('es', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(message.sentAt))}</p></div></div>;
          })}
        </div>
        <form onSubmit={send} className="border-t border-slate-200 p-4">
          <div className="flex gap-2"><textarea value={content} onChange={(event) => setContent(event.target.value)} required maxLength={4000} rows={2} className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-rose-500" placeholder="Escribe tu consulta…" /><button type="submit" disabled={sending} className="rounded-xl bg-rose-600 px-4 text-white disabled:opacity-50"><Send className="h-5 w-5" /></button></div>
          {error && <p className="mt-2 text-xs font-semibold text-red-600">{error}</p>}
        </form>
      </section>
    </div>
  );
}

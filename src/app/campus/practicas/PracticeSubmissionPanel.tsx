'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Upload } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface AssignmentOption {
  id: string;
  title: string;
  description: string;
}

export function PracticeSubmissionPanel({
  userId,
  assignments,
}: {
  userId: string;
  assignments: AssignmentOption[];
}) {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [assignmentId, setAssignmentId] = useState(assignments[0]?.id ?? '');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!assignmentId || !file) {
      setMessage('Selecciona la práctica y una fotografía de evidencia.');
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 10 * 1024 * 1024) {
      setMessage('La evidencia debe ser JPG, PNG o WEBP y pesar máximo 10 MB.');
      return;
    }

    setSaving(true);
    setMessage('');
    const safeName = file.name
      .toLowerCase()
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-z0-9_-]+/g, '-')
      .slice(0, 60) || 'evidencia';
    const extension = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
    const objectPath = `${userId}/${assignmentId}/${crypto.randomUUID()}-${safeName}.${extension}`;
    const storedPath = `practice-evidence/${objectPath}`;

    try {
      const supabase = createClient();
      const { error: uploadError } = await supabase.storage
        .from('practice-evidence')
        .upload(objectPath, file, { contentType: file.type, upsert: false });
      if (uploadError) throw uploadError;

      const response = await fetch('/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'submit',
          assignmentId,
          description,
          filePath: storedPath,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        await supabase.storage.from('practice-evidence').remove([objectPath]);
        throw new Error(result.error ?? 'No se pudo registrar la práctica.');
      }

      setDescription('');
      setFile(null);
      if (fileInput.current) fileInput.current.value = '';
      setMessage('Práctica enviada correctamente para revisión docente.');
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo enviar la práctica.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
      <div><p className="text-xs font-bold uppercase tracking-wider text-rose-600">Nueva evidencia</p><h2 className="text-xl font-bold text-slate-900">Enviar práctica fotográfica</h2></div>
      <label className="block text-xs font-semibold text-slate-700">Práctica<select value={assignmentId} onChange={(event) => setAssignmentId(event.target.value)} required className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">{assignments.map((assignment) => <option key={assignment.id} value={assignment.id}>{assignment.title}</option>)}</select></label>
      <label className="block text-xs font-semibold text-slate-700">Descripción<textarea value={description} onChange={(event) => setDescription(event.target.value)} maxLength={5000} rows={4} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-rose-500" placeholder="Explica técnica, materiales y condiciones de trabajo…" /></label>
      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-5">
        <Camera className="h-7 w-7 text-rose-600" />
        <span className="text-sm text-slate-600"><strong className="text-slate-900">{file?.name ?? 'Seleccionar fotografía'}</strong><br />JPG, PNG o WEBP; máximo 10 MB</span>
        <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" required className="sr-only" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
      </label>
      {message && <p className="rounded-xl bg-slate-50 p-3 text-xs font-semibold text-slate-700">{message}</p>}
      <button type="submit" disabled={saving || assignments.length === 0} className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-50"><Upload className="h-4 w-4" />{saving ? 'Enviando…' : 'Enviar para evaluación'}</button>
    </form>
  );
}

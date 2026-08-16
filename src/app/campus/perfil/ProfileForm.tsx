'use client';

import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Key, Save, ShieldCheck, User } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface ProfileState {
  fullName: string;
  email: string;
  phone: string;
  documentId: string;
}

export function ProfileForm({
  initialProfile,
  pendingDeletion,
}: {
  initialProfile: ProfileState;
  pendingDeletion: { status: string; requestedAt: string } | null;
}) {
  const [profile, setProfile] = useState(initialProfile);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletion, setDeletion] = useState(pendingDeletion);

  const saveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setStatus(null);
    const response = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    const payload = (await response.json()) as { error?: string };
    setSaving(false);
    if (!response.ok) return setError(payload.error ?? 'No se pudo actualizar el perfil.');
    setStatus('Perfil actualizado correctamente.');
  };

  const changePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setStatus(null);
    if (password.length < 8) return setError('La contraseña debe tener al menos 8 caracteres.');
    if (password !== confirmPassword) return setError('Las contraseñas no coinciden.');

    setSaving(true);
    const { error: passwordError } = await createClient().auth.updateUser({ password });
    setSaving(false);
    if (passwordError) return setError(passwordError.message);
    setPassword('');
    setConfirmPassword('');
    setStatus('Contraseña actualizada correctamente.');
  };

  const requestDeletion = async () => {
    if (!window.confirm('¿Deseas solicitar la eliminación de tu cuenta? La administración revisará la solicitud antes de ejecutarla.')) return;
    setSaving(true);
    setError(null);
    const response = await fetch('/api/profile', { method: 'DELETE' });
    const payload = (await response.json()) as {
      error?: string;
      request?: { status: string; requested_at: string };
    };
    setSaving(false);
    if (!response.ok || !payload.request) return setError(payload.error ?? 'No se pudo registrar la solicitud.');
    setDeletion({ status: payload.request.status, requestedAt: payload.request.requested_at });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={saveProfile} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
        <h2 className="font-bold text-slate-900 flex items-center gap-2"><User className="w-4 h-4 text-rose-600" /> Datos personales</h2>
        <div className="space-y-4 text-xs">
          <label className="block font-semibold text-slate-700">Nombre completo
            <input required value={profile.fullName} onChange={(event) => setProfile({ ...profile, fullName: event.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-normal text-slate-900" />
          </label>
          <label className="block font-semibold text-slate-700">Correo de acceso
            <input readOnly value={profile.email} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2.5 font-normal text-slate-500" />
          </label>
          <label className="block font-semibold text-slate-700">Teléfono
            <input value={profile.phone} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-normal text-slate-900" />
          </label>
          <label className="block font-semibold text-slate-700">Documento de identidad
            <input value={profile.documentId} onChange={(event) => setProfile({ ...profile, documentId: event.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-normal text-slate-900" />
          </label>
        </div>
        <button disabled={saving} className="w-full bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2">
          <Save className="w-4 h-4" /> Guardar perfil
        </button>
      </form>

      <div className="space-y-6">
        <form onSubmit={changePassword} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-bold text-slate-900 flex items-center gap-2"><Key className="w-4 h-4 text-rose-600" /> Cambiar contraseña</h2>
          <input type="password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Nueva contraseña (mínimo 8 caracteres)" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs" />
          <input type="password" required minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirmar contraseña" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs" />
          <button disabled={saving} className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white py-3 rounded-xl font-bold text-xs">Actualizar contraseña</button>
        </form>

        <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <h2 className="font-bold text-slate-900 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Privacidad</h2>
          {deletion ? (
            <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">Solicitud de eliminación <strong>{deletion.status}</strong>, registrada el {new Intl.DateTimeFormat('es', { dateStyle: 'medium' }).format(new Date(deletion.requestedAt))}.</p>
          ) : (
            <button type="button" disabled={saving} onClick={() => void requestDeletion()} className="text-xs font-bold text-red-700 hover:underline flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Solicitar eliminación de mi cuenta</button>
          )}
        </section>
      </div>

      {(status || error) && (
        <div className={`lg:col-span-2 rounded-xl border p-3 text-xs font-bold flex items-center gap-2 ${error ? 'border-red-200 bg-red-50 text-red-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}>
          {error ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          {error ?? status}
        </div>
      )}
    </div>
  );
}

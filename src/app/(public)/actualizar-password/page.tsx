'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Lock } from 'lucide-react';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { createClient } from '@/lib/supabase/client';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const updatePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password.length < 10) {
      setError('La contraseña debe tener al menos 10 caracteres.');
      return;
    }
    if (password !== confirmation) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError('El enlace venció o no fue posible actualizar la contraseña.');
        return;
      }
      setSuccess(true);
    } catch {
      setError('El servicio de acceso todavía no está configurado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicHeader />
      <main className="flex-1 max-w-md mx-auto px-4 py-16 w-full flex items-center">
        <section className="w-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm space-y-5">
          <div className="text-center">
            <Lock className="mx-auto mb-3 h-10 w-10 text-rose-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">Nueva contraseña</h1>
          </div>
          {success ? (
            <div className="space-y-4 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
              <p className="text-sm text-slate-600">Tu contraseña fue actualizada correctamente.</p>
              <Link href="/login" className="inline-block rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-bold text-white">
                Iniciar sesión
              </Link>
            </div>
          ) : (
            <form onSubmit={updatePassword} className="space-y-4">
              {error && <p className="rounded-xl bg-red-50 p-3 text-xs text-red-700">{error}</p>}
              <input
                type="password"
                required
                minLength={10}
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Mínimo 10 caracteres"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-rose-500"
              />
              <input
                type="password"
                required
                minLength={10}
                autoComplete="new-password"
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                placeholder="Repite la contraseña"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-rose-500"
              />
              <button type="submit" disabled={loading} className="w-full rounded-xl bg-rose-600 py-3 text-sm font-bold text-white disabled:opacity-60">
                {loading ? 'Guardando…' : 'Guardar contraseña'}
              </button>
            </form>
          )}
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

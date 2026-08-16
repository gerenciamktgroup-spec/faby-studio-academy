'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, KeyRound, Mail } from 'lucide-react';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { createClient } from '@/lib/supabase/client';

export default function PasswordRecoveryPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const requestReset = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        { redirectTo: `${window.location.origin}/auth/callback?next=/actualizar-password` }
      );

      if (resetError) {
        setError('No fue posible enviar el enlace. Inténtalo nuevamente.');
        return;
      }

      setSent(true);
    } catch {
      setError('El servicio de recuperación todavía no está configurado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicHeader />
      <main className="flex-1 max-w-md mx-auto px-4 py-16 w-full flex flex-col justify-center">
        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm space-y-5">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
            <KeyRound className="h-6 w-6" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-extrabold text-slate-900">Recuperar contraseña</h1>
            <p className="text-xs leading-relaxed text-slate-500">
              Enviaremos un enlace seguro al correo asociado con tu cuenta.
            </p>
          </div>

          {sent ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center text-sm text-emerald-800">
              <CheckCircle2 className="mx-auto mb-2 h-6 w-6" />
              Si el correo está registrado, recibirás instrucciones en unos minutos.
            </div>
          ) : (
            <form onSubmit={requestReset} className="space-y-4">
              {error && <p className="rounded-xl bg-red-50 p-3 text-xs text-red-700">{error}</p>}
              <label className="block text-xs font-semibold text-slate-700">
                Correo electrónico
                <span className="relative mt-1 block">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-slate-900 outline-none focus:border-rose-500"
                  />
                </span>
              </label>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-fabi-pink to-fabi-darkpink py-3 text-sm font-bold text-white disabled:opacity-60"
              >
                {loading ? 'Enviando…' : 'Enviar enlace seguro'}
              </button>
            </form>
          )}

          <Link href="/login" className="flex items-center justify-center gap-1 text-xs font-bold text-rose-600">
            <ArrowLeft className="h-4 w-4" /> Volver al acceso
          </Link>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

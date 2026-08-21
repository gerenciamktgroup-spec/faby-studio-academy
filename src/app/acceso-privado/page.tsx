'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, ShieldAlert, KeyRound, ArrowRight, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';

export default function PrivateAccessPage() {
  const router = useRouter();
  const [accessKey, setAccessKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/private-unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: accessKey.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Clave de acceso incorrecta. Contacta con administración.');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/');
        router.refresh();
      }, 800);
    } catch {
      setError('Error al procesar la verificación.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-12 selection:bg-rose-500 selection:text-white">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md space-y-8">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-bold text-rose-400">
            <Lock className="h-3.5 w-3.5" />
            <span>ENTORNO PRIVADO & EN PAUSA</span>
          </div>

          <h1 className="text-3xl font-extrabold font-display tracking-tight text-white sm:text-4xl">
            FABY STUDIO ACADEMY
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
            La plataforma se encuentra en modo privado de desarrollo y revisión interna. El acceso público a cursos y campus está pausado.
          </p>
        </div>

        {/* Access Box */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/50 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Desbloqueo de Entorno</h2>
              <p className="text-[11px] text-slate-400">Introduce la clave privada de equipo o cliente</p>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2.5 rounded-2xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300">
              <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-300">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>Acceso verificado. Redirigiendo...</span>
            </div>
          )}

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label htmlFor="accessKey" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Clave de Acceso Privado
              </label>
              <input
                id="accessKey"
                type="password"
                required
                value={accessKey}
                onChange={(e) => {
                  setAccessKey(e.target.value);
                  setError('');
                }}
                placeholder="••••••••••••"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 transition-all font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 px-4 py-3.5 text-xs font-bold text-white shadow-lg shadow-rose-600/25 hover:from-pink-600 hover:to-rose-600 focus:outline-none transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span>Comprobando permisos...</span>
              ) : (
                <>
                  <span>Desbloquear Plataforma</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Alternative: Login with authorized account */}
          <div className="pt-2 border-t border-slate-800/80 text-center space-y-3">
            <p className="text-[11px] text-slate-400">¿Eres usuaria o docente con cuenta activa?</p>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors"
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>Iniciar sesión directamente en el Campus</span>
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-slate-500">
          © 2026 FABY STUDIO ACADEMY • Servidor Seguro en Producción
        </p>
      </div>
    </div>
  );
}

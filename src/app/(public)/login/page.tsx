'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { Lock, Mail, ArrowRight, Sparkles, Eye, EyeOff, AlertCircle, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { getRoleLandingPage, isAppRole } from '@/lib/auth/roles';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (signInError || !data.user) {
        setError('Correo o contraseña incorrectos.');
        return;
      }

      const { data: roleRows, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', data.user.id);

      if (roleError) {
        await supabase.auth.signOut();
        setError('No fue posible verificar los permisos de la cuenta.');
        return;
      }

      const roles = (roleRows ?? []).map((row) => row.role).filter(isAppRole);
      router.replace(getRoleLandingPage(roles));
      router.refresh();
    } catch {
      setError('El servicio de acceso todavía no está configurado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicHeader />

      <main className="flex-1 max-w-md mx-auto px-4 py-12 sm:py-16 w-full flex flex-col justify-center space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CAMPUS VIRTUAL</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
            Acceso a tu Cuenta
          </h1>
          <p className="text-xs text-slate-500">
            Introduce tus credenciales para acceder a tus másteres y tutorías.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">

          {/* Error Banner */}
          {error && (
            <div className="flex items-start space-x-2 bg-red-50 border border-red-200 rounded-xl p-3 text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="text-[11px] font-medium leading-relaxed">{error}</span>
            </div>
          )}

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="tu@email.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-slate-700 font-semibold">Contraseña</label>
              <Link
                href="/recuperar-password"
                className="text-[11px] font-bold text-rose-600 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Tu contraseña"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-800">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="text-[11px] leading-relaxed">
              Acceso seguro con sesión cifrada y permisos verificados según tu rol.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white py-3.5 rounded-xl font-bold text-sm shadow-md shadow-rose-600/20 transition-all flex items-center justify-center space-x-2 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                <span>Verificando credenciales...</span>
              </>
            ) : (
              <>
                <span>Iniciar Sesión en el Campus</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

        {/* Demo switcher and register links */}
        <div className="space-y-3 text-center">
          <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4 text-xs">
            <p className="font-bold text-rose-900">¿Deseas evaluar o presentar la plataforma?</p>
            <p className="mt-1 text-[11px] text-rose-700">
              Accede directamente con perfiles de Alumna, Docente, Administración o Auditoría.
            </p>
            <Link
              href="/demo"
              className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-rose-700 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Entrar a la Experiencia Demo (1 Clic)</span>
            </Link>
          </div>

          <p className="text-xs text-slate-500">
            ¿Aún no tienes cuenta?{' '}
            <Link href="/registro" className="font-bold text-rose-600 hover:underline">
              Matricúlate aquí
            </Link>
          </p>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

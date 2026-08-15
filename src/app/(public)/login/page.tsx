'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { Lock, Mail, ArrowRight, Sparkles, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { signIn, DEMO_CREDENTIALS, type UserRole } from '@/lib/demo-auth';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('alumna');
  const [email, setEmail] = useState(DEMO_CREDENTIALS.alumna.email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.alumna.password);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRoleSelect = (selected: UserRole) => {
    setRole(selected);
    setEmail(DEMO_CREDENTIALS[selected].email);
    setPassword(DEMO_CREDENTIALS[selected].password);
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Pequeño delay para simular llamada de red
    await new Promise((r) => setTimeout(r, 600));

    const result = signIn(email, password);
    setLoading(false);

    if (!result.success) {
      setError(result.error || 'Error al iniciar sesión.');
      return;
    }

    // Redirigir según el rol real del usuario autenticado
    const userRole = result.session!.user.role;
    if (userRole === 'alumna') {
      router.push('/campus');
    } else if (userRole === 'profesor') {
      router.push('/profesor');
    } else {
      router.push('/admin');
    }
  };

  const roleColors = {
    alumna: 'text-rose-600',
    profesor: 'text-purple-600',
    admin: 'text-slate-900',
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicHeader />

      <main className="flex-1 max-w-md mx-auto px-4 py-12 sm:py-16 w-full flex flex-col justify-center space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CAMPUS VIRTUAL OFICIAL</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
            Acceso a tu Cuenta
          </h1>
          <p className="text-xs text-slate-500">
            Introduce tus credenciales para acceder a tus másteres y tutorías.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="bg-slate-200/70 p-1 rounded-2xl grid grid-cols-3 gap-1 text-xs font-bold">
          {(['alumna', 'profesor', 'admin'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => handleRoleSelect(r)}
              className={`py-2 rounded-xl transition-all ${
                role === r
                  ? `bg-white ${roleColors[r]} shadow-xs`
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {r === 'alumna' ? 'Alumna' : r === 'profesor' ? 'Profesora' : 'Dirección'}
            </button>
          ))}
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

          {/* Demo credentials hint */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Credenciales de demo autocompletadas</p>
            <div className="flex items-center space-x-2 text-[11px] text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="font-mono">{DEMO_CREDENTIALS[role].email}</span>
            </div>
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

          {/* Quick Demo Access Bar */}
          <div className="pt-3 border-t border-slate-100 text-center space-y-2">
            <p className="text-[11px] text-slate-400">¿Probando la presentación comercial?</p>
            <Link
              href="/demo"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Abrir Demo Role Switcher con 1 Clic</span>
            </Link>
          </div>
        </form>

        {/* Register link */}
        <p className="text-center text-xs text-slate-500">
          ¿Aún no tienes cuenta?{' '}
          <Link href="/registro" className="font-bold text-rose-600 hover:underline">
            Matricúlate aquí
          </Link>
        </p>
      </main>

      <PublicFooter />
    </div>
  );
}

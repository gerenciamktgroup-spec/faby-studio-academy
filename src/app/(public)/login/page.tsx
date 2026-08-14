'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { Lock, Mail, ArrowRight, Sparkles, CheckCircle2, User, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'alumna' | 'profesor' | 'admin'>('alumna');
  const [email, setEmail] = useState('lucia.martinez@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (selected: 'alumna' | 'profesor' | 'admin') => {
    setRole(selected);
    if (selected === 'alumna') {
      setEmail('lucia.martinez@gmail.com');
    } else if (selected === 'profesor') {
      setEmail('laura.gomez@fabystudio.es');
    } else {
      setEmail('admin@fabystudio.es');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (role === 'alumna') {
        router.push('/campus');
      } else if (role === 'profesor') {
        router.push('/profesor');
      } else {
        router.push('/admin');
      }
    }, 800);
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
          <button
            type="button"
            onClick={() => handleRoleSelect('alumna')}
            className={`py-2 rounded-xl transition-all ${
              role === 'alumna'
                ? 'bg-white text-rose-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Alumna
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect('profesor')}
            className={`py-2 rounded-xl transition-all ${
              role === 'profesor'
                ? 'bg-white text-purple-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Profesora
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect('admin')}
            className={`py-2 rounded-xl transition-all ${
              role === 'admin'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dirección
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition-colors font-mono"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white py-3.5 rounded-xl font-bold text-sm shadow-md shadow-rose-600/20 transition-all flex items-center justify-center space-x-2 hover:scale-[1.01]"
          >
            {loading ? (
              <span>Iniciando Sesión...</span>
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

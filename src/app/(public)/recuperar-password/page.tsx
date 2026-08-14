'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { Mail, KeyRound, ArrowRight, ArrowLeft, CheckCircle2, Lock } from 'lucide-react';

export default function RecuperarPasswordPage() {
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRequestReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep('reset');
    }, 800);
  };

  const handleConfirmReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicHeader />

      <main className="flex-1 max-w-md mx-auto px-4 py-12 sm:py-16 w-full flex flex-col justify-center space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-700">
            <KeyRound className="w-3.5 h-3.5" />
            <span>SEGURIDAD DE CUENTA</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
            Recuperar Contraseña
          </h1>
          <p className="text-xs text-slate-500">
            Restablece tu clave de acceso al campus virtual de forma rápida y segura.
          </p>
        </div>

        {success ? (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h2 className="text-lg font-bold text-slate-900 font-display">¡Contraseña Actualizada!</h2>
            <p className="text-xs text-slate-600">
              Tu nueva clave ha sido guardada. Ya puedes iniciar sesión en el campus.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center space-x-2 w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-bold text-xs shadow-xs transition-colors"
            >
              <span>Ir a Iniciar Sesión</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : step === 'request' ? (
          <form onSubmit={handleRequestReset} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Correo Electrónico Registrado</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="lucia.martinez@gmail.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white py-3.5 rounded-xl font-bold text-sm shadow-md shadow-rose-600/20 transition-all flex items-center justify-center space-x-2"
            >
              {loading ? <span>Comprobando...</span> : <span>Generar Enlace de Restablecimiento</span>}
            </button>

            <div className="pt-2 text-center">
              <Link href="/login" className="inline-flex items-center space-x-1 text-xs text-slate-500 hover:text-slate-900 font-semibold">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver a Iniciar Sesión</span>
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleConfirmReset} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-[11px] font-medium flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Código de verificación verificado para {email || 'tu cuenta'}.</span>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Nueva Contraseña</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Confirmar Nueva Contraseña</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite la contraseña"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !newPassword || newPassword !== confirmPassword}
              className="w-full bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white py-3.5 rounded-xl font-bold text-sm shadow-md shadow-rose-600/20 transition-all flex items-center justify-center space-x-2"
            >
              {loading ? <span>Guardando Clave...</span> : <span>Guardar Nueva Contraseña y Acceder</span>}
            </button>
          </form>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}

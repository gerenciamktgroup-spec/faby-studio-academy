'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { User, Mail, Lock, Phone, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('Curso Profesional de Extensiones de Pestañas');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) return;
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();
      const appUrl = window.location.origin;
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: `${appUrl}/auth/callback?next=/campus`,
          data: {
            full_name: fullName.trim(),
            phone: phone.trim(),
            course_interest: course,
            accepted_terms_at: new Date().toISOString(),
          },
        },
      });

      if (signUpError) {
        setError(
          signUpError.message.toLowerCase().includes('already')
            ? 'Ya existe una cuenta con ese correo. Inicia sesión.'
            : 'No fue posible crear la cuenta. Revisa los datos e inténtalo nuevamente.'
        );
        return;
      }

      setRegisteredSuccess(true);
      if (data.session) {
        window.setTimeout(() => router.replace('/campus'), 1200);
      }
    } catch {
      setError('El servicio de registro todavía no está configurado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicHeader />

      <main className="flex-1 max-w-lg mx-auto px-4 py-12 sm:py-16 w-full flex flex-col justify-center space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NUEVA MATRÍCULA DE ALUMNA</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
            Crea tu Cuenta de Alumna
          </h1>
          <p className="text-xs text-slate-500">
            Accede al campus virtual de FABY STUDIO ACADEMY y comienza tu formación profesional.
          </p>
        </div>

        {registeredSuccess ? (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h2 className="text-lg font-bold text-slate-900 font-display">¡Cuenta Creada Exitosamente!</h2>
            <p className="text-xs text-slate-600">
              Tu cuenta ha sido registrada. Si se requiere confirmación, revisa tu correo para activar el acceso.
            </p>
            <p className="text-[11px] text-slate-400">
              Después de confirmar podrás completar tu perfil y matrícula.
            </p>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">

            {/* Error Banner */}
            {error && (
              <div className="flex items-start space-x-2 bg-red-50 border border-red-200 rounded-xl p-3 text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="text-[11px] font-medium leading-relaxed">{error}</span>
              </div>
            )}

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Nombre Completo</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => { setFullName(e.target.value); setError(''); }}
                  placeholder="Ej. Valeria Santana"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Correo Electrónico</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="valeria.santana@gmail.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Teléfono / WhatsApp</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="612 000 000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Contraseña</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Máster de Interés</label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition-colors"
              >
                <option value="Curso Profesional de Extensiones de Pestañas">Curso Profesional de Extensiones de Pestañas (380€)</option>
                <option value="Máster Profesional en Uñas de Gel y Acrílico Premium">Máster Profesional en Uñas de Gel y Acrílico (490€)</option>
                <option value="Curso Superior de Cosmetología Facial y Skin Care">Curso Superior de Cosmetología Facial y Skin Care (590€)</option>
              </select>
            </div>

            <div className="pt-1">
              <label className="flex items-start space-x-2 cursor-pointer text-[11px] text-slate-600">
                <input
                  type="checkbox"
                  required
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                />
                <span>
                  Acepto los{' '}
                  <Link href="/terminos" className="text-rose-600 hover:underline font-semibold">términos y condiciones</Link>
                  {' '}de FABY STUDIO ACADEMY y la{' '}
                  <Link href="/privacidad" className="text-rose-600 hover:underline font-semibold">política de privacidad RGPD</Link>.
                </span>
              </label>
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
                  <span>Creando Expediente...</span>
                </>
              ) : (
                <>
                  <span>Crear Cuenta & Acceder al Campus</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <p className="text-center text-xs text-slate-500">
          ¿Ya tienes cuenta de alumna?{' '}
          <Link href="/login" className="font-bold text-rose-600 hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </main>

      <PublicFooter />
    </div>
  );
}

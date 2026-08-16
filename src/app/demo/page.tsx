'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Lock,
  LogOut,
  Shield,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface DemoPersona {
  id: string;
  roleTitle: string;
  name: string;
  email: string;
  roleBadge: string;
  badgeColor: string;
  landingUrl: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
}

const DEMO_PERSONAS: DemoPersona[] = [
  {
    id: 'alumna',
    roleTitle: 'Alumna Matriculada',
    name: 'Lucía Martínez',
    email: 'alumna@fabystudio.academy',
    roleBadge: 'Rol: Alumna',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    landingUrl: '/campus',
    icon: GraduationCap,
    features: [
      'Dashboard con 68% de progreso y 1.8h activas',
      'Acceso al reproductor de lecciones en vídeo HD',
      'Subida y revisión de prácticas de modelo',
      'Calculadora de rentabilidad para salón',
      'Solicitud y descarga de certificado',
    ],
  },
  {
    id: 'profesor',
    roleTitle: 'Docente & Tutora Titular',
    name: 'Profesora Faby',
    email: 'profesora@fabystudio.academy',
    roleBadge: 'Rol: Profesor / Tutor',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    landingUrl: '/profesor',
    icon: BookOpen,
    features: [
      'Bandeja de evaluación de prácticas pendientes',
      'Rúbrica interactiva de 4 criterios (100 pts)',
      'Directorio de alumnas con avance y horas activas',
      'Asignación y emisión docente de certificados',
    ],
  },
  {
    id: 'admin',
    roleTitle: 'Administradora Académica',
    name: 'Valeria Directora',
    email: 'admin@fabystudio.academy',
    roleBadge: 'Rol: Admin Académico',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    landingUrl: '/admin',
    icon: Users,
    features: [
      'Panel ejecutivo con métricas de facturación y matrículas',
      'Gestión de base de datos de alumnas y notas',
      'Control de cobros y pagos en salón',
      'Catálogo de másteres y gestión operativa',
    ],
  },
  {
    id: 'auditor',
    roleTitle: 'Auditor Oficial Regulado',
    name: 'Inspector Oficial',
    email: 'auditor@fabystudio.academy',
    roleBadge: 'Rol: Auditor',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    landingUrl: '/auditoria',
    icon: ShieldCheck,
    features: [
      'Inspección de la bitácora inmutable (activity_events)',
      'Verificación de horas activas por heartbeat (45s)',
      'Trazabilidad con IP anonimizada mediante SHA-256',
      'Exportación de informes para auditoría externa',
    ],
  },
  {
    id: 'superadmin',
    roleTitle: 'Superadministración',
    name: 'Superadmin Faby',
    email: 'superadmin@fabystudio.academy',
    roleBadge: 'Rol: Superadmin',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    landingUrl: '/admin',
    icon: Shield,
    features: [
      'Control integral de la plataforma y gobernanza',
      'Gestión jerárquica de roles y permisos',
      'Acceso simultáneo a campus, docencia, admin y auditoría',
    ],
  },
];

const DEMO_PASSWORD = 'Faby2026!Demo';

export default function DemoSwitcherPage() {
  const router = useRouter();
  const [loadingRole, setLoadingRole] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleQuickLogin = async (persona: DemoPersona) => {
    setLoadingRole(persona.id);
    setErrorMessage('');
    setStatusMessage(`Autenticando como ${persona.name} (${persona.roleTitle})...`);

    try {
      const supabase = createClient();

      // Sign out any existing session first
      await supabase.auth.signOut();

      // Sign in with demo credentials
      const { data, error } = await supabase.auth.signInWithPassword({
        email: persona.email,
        password: DEMO_PASSWORD,
      });

      if (error || !data.user) {
        throw new Error(error?.message || 'Error al iniciar sesión');
      }

      setStatusMessage(`¡Sesión iniciada con éxito! Redirigiendo a ${persona.landingUrl}...`);
      router.push(persona.landingUrl);
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error de autenticación';
      setErrorMessage(`No se pudo conectar: ${msg}`);
      setLoadingRole(null);
      setStatusMessage('');
    }
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setStatusMessage('Sesión cerrada.');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicHeader />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-bold text-rose-700">
            <Sparkles className="h-4 w-4" />
            <span>SELECTOR DE ROLES PARA PRUEBAS (DEMO LIVE)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Prueba Todos los Flujos de la Plataforma
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Haz clic en cualquiera de las 5 identidades preconfiguradas para iniciar sesión automáticamente y experimentar el campus, la corrección docente, la administración o la auditoría.
          </p>
        </div>

        {/* Global Status / Error Message */}
        {statusMessage && (
          <div className="max-w-2xl mx-auto bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-semibold flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>{statusMessage}</span>
            </div>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-rose-600 underline"
            >
              <LogOut className="h-3 w-3" /> Cerrar sesión
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-xs font-semibold shadow-xs">
            {errorMessage}
          </div>
        )}

        {/* Credentials Info Box */}
        <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Contraseña universal para todas las cuentas:</p>
              <code className="text-rose-600 font-mono font-bold bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                {DEMO_PASSWORD}
              </code>
            </div>
          </div>
          <Link
            href="/login"
            className="text-slate-600 hover:text-rose-600 font-semibold underline shrink-0"
          >
            Ir al formulario manual de login →
          </Link>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {DEMO_PERSONAS.map((persona) => {
            const Icon = persona.icon;
            const isLoading = loadingRole === persona.id;

            return (
              <div
                key={persona.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Top badge and icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-50 to-rose-100 border border-rose-200 flex items-center justify-center text-rose-600">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${persona.badgeColor}`}
                    >
                      {persona.roleBadge}
                    </span>
                  </div>

                  {/* Name and title */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-display">{persona.name}</h3>
                    <p className="text-xs text-slate-500 font-semibold">{persona.roleTitle}</p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{persona.email}</p>
                  </div>

                  {/* Feature highlights */}
                  <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-slate-600">
                    {persona.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Login button */}
                <button
                  onClick={() => handleQuickLogin(persona)}
                  disabled={loadingRole !== null}
                  className="w-full bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white py-3 rounded-xl font-bold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      <span>Entrando...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>Entrar como {persona.name.split(' ')[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Quick Links Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs max-w-3xl mx-auto space-y-3 text-center">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Otras Rutas Clave para Inspeccionar
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <Link
              href="/verificar-certificado"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:border-rose-300 font-semibold"
            >
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verificar Certificados</span>
            </Link>
            <Link
              href="/cursos"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:border-rose-300 font-semibold"
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-600" />
              <span>Catálogo de Cursos</span>
            </Link>
            <Link
              href="/privacidad"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:border-rose-300 font-semibold"
            >
              <span>Política de Privacidad</span>
            </Link>
            <Link
              href="/terminos"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:border-rose-300 font-semibold"
            >
              <span>Términos y Condiciones</span>
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

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
  LogOut,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Settings,
  FileCheck2,
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
    roleBadge: 'Rol: Docente / Tutora',
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
    roleTitle: 'Dirección & Administración',
    name: 'Valeria Directora',
    email: 'admin@fabystudio.academy',
    roleBadge: 'Rol: Dirección Académica',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    landingUrl: '/admin',
    icon: Settings,
    features: [
      'Gestión integral de base de datos de alumnas',
      'Control de cobros, cuotas y pagos en salón',
      'Administración de cupones y promociones',
      'Catálogo de cursos y métricas de negocio',
    ],
  },
  {
    id: 'auditor',
    roleTitle: 'Inspector / Auditor Oficial',
    name: 'Inspector Oficial',
    email: 'auditor@fabystudio.academy',
    roleBadge: 'Rol: Auditor Normativo',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    landingUrl: '/auditoria',
    icon: FileCheck2,
    features: [
      'Inspección de bitácora inmutable de eventos',
      'Verificación criptográfica SHA-256',
      'Trazabilidad cada 45s (Orden TMS/369/2019)',
      'Exportación oficial en PDF y CSV',
    ],
  },
];

export default function DemoSwitcherPage() {
  const router = useRouter();

  const [loadingRole, setLoadingRole] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleQuickLogin = async (persona: DemoPersona) => {
    setLoadingRole(persona.id);
    setErrorMessage('');
    setStatusMessage(`Iniciando sesión segura como ${persona.name} (${persona.roleTitle})...`);

    try {
      const supabase = createClient();

      // Sign out any existing session first
      await supabase.auth.signOut();

      // Request demo session credentials from server endpoint
      const res = await fetch('/api/auth/demo-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personaId: persona.id }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error || 'El acceso de demostración requiere credenciales de prueba activas.'
        );
      }

      const { email, password, landingUrl } = await res.json();

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw new Error(signInError.message);
      }

      setStatusMessage(`¡Sesión iniciada! Redirigiendo a ${landingUrl || persona.landingUrl}...`);
      router.push(landingUrl || persona.landingUrl);
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

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        {/* Header Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-bold text-rose-700">
            <Sparkles className="h-4 w-4" />
            <span>ACCESO DEMOSTRATIVO Y REVISIÓN DE MÓDULOS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Explora las Funciones de la Plataforma
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Haz clic en cualquiera de los perfiles para ingresar directamente y evaluar el funcionamiento del Campus, Corrección Docente, Administración o Auditoría.
          </p>
        </div>

        {/* Global Status / Error Message */}
        {statusMessage && (
          <div className="max-w-xl mx-auto bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-semibold flex items-center justify-between shadow-xs">
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
          <div className="max-w-xl mx-auto bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-xs font-semibold shadow-xs">
            {errorMessage}
          </div>
        )}

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
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
                  className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-xl font-bold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      <span>Accediendo a {persona.roleTitle}...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>Ingresar y ver módulo ({persona.roleTitle})</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Quick Links Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs max-w-2xl mx-auto space-y-3 text-center">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Rutas Públicas Verificables
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
              href="/login"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:border-rose-300 font-semibold"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Iniciar Sesión Estándar</span>
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

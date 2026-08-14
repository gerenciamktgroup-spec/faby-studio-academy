import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  Play,
  ArrowRight,
  TrendingUp,
  FileCheck,
  MessageSquare,
  Sparkles,
  Calendar,
  Layers,
  Trophy
} from 'lucide-react';
import { getDynamicDashboardMetrics } from '@/lib/demo-analytics';

export default async function CampusPage() {
  const metrics = await getDynamicDashboardMetrics();
  const progressPct = 68;
  const activeHours = 1.8;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner (Clean White Luxury) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 relative overflow-hidden shadow-sm">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full text-xs font-bold text-rose-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bienvenida al Campus Virtual, Lucía</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 leading-tight">
            Continúa tu formación hacia tu Acreditación Oficial
          </h1>

          <p className="text-xs text-slate-600 leading-relaxed">
            Has completado el <strong className="text-slate-900 font-bold">{progressPct}%</strong> del Curso Profesional de Extensiones de Pestañas. Tu tutora asignada <strong className="text-rose-700 font-semibold">Laura Gómez</strong> ha evaluado tu última práctica técnica.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/campus/cursos/c1000000-0000-0000-0000-000000000001"
              className="inline-flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-rose-600/20 transition-all hover:scale-[1.02]"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Continuar Lección Actual</span>
            </Link>

            <Link
              href="/campus/proyectos"
              className="inline-flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-rose-600" />
              <span>Ver Galería de Proyectos</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Progreso Global</span>
            <TrendingUp className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 font-display">
            {progressPct}%
          </p>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-rose-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Tiempo Activo Real</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-700 font-display">
            {activeHours}h
          </p>
          <p className="text-[11px] text-slate-500">Trazabilidad validada cada 45s</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Nota Práctica 01</span>
            <FileCheck className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-3xl font-extrabold text-rose-700 font-display">86 / 100</p>
          <p className="text-[11px] text-slate-500">Evaluada por rúbrica docente</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Certificado Oficial</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-xl font-bold text-slate-900 font-display mt-1">En Progreso</p>
          <p className="text-[11px] text-slate-500">Desbloqueo al 70% + Proyecto</p>
        </div>
      </div>

      {/* Main Grid: Current Course + Next Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Course Card */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold text-rose-700 uppercase tracking-widest bg-rose-50 px-2.5 py-0.5 rounded-full">
                Mi Programa Activo
              </span>
              <h2 className="text-xl font-bold font-display text-slate-900 mt-1">
                Curso Profesional de Extensiones de Pestañas
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-semibold">6 Módulos • 50h Activas</span>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-rose-600 uppercase">Lección en curso</span>
                <h3 className="text-sm font-bold text-slate-900">
                  Lección 1.2: Anatomía de la Pestaña Natural & Fases de Crecimiento
                </h3>
                <p className="text-xs text-slate-500">Módulo 1: Fundamentos Profesionales & Bioseguridad (Progreso: 68%)</p>
              </div>

              <Link
                href="/campus/cursos/c1000000-0000-0000-0000-000000000001"
                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1 shrink-0 self-start sm:self-auto shadow-xs"
              >
                <span>Reanudar Pestañas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded uppercase">
                    ▶ Master Class YouTube HD
                  </span>
                  <span className="text-[10px] font-bold text-rose-700 uppercase">Nuevo Máster Matriculado</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Máster Profesional en Uñas de Gel y Acrílico Premium
                </h3>
                <p className="text-xs text-slate-600">Módulo 1: Manicura Rusa Combinada & Esculpido Estructural</p>
              </div>

              <Link
                href="/campus/cursos/c2000000-0000-0000-0000-000000000002"
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1 shrink-0 self-start sm:self-auto shadow-xs"
              >
                <span>Ver Master Class Uñas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Widget: Tutoring & Quick Links */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Próxima Tutoría 1 a 1</span>
              <Calendar className="w-4 h-4 text-rose-600" />
            </h3>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">Laura Gómez</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">Confirmada</span>
              </div>
              <p className="text-slate-600">Revisión Técnica Práctica 01 & Mapping</p>
              <p className="text-slate-500 text-[11px]">Martes, 18:30h (45 minutos)</p>
              <Link
                href="/campus/tutorias"
                className="block text-center w-full bg-white border border-slate-200 hover:border-rose-300 text-slate-800 font-bold py-2 rounded-xl text-xs transition-colors mt-2"
              >
                Ver Detalles de la Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Clock, Award, Star, MessageSquare, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function StudentDrilldownPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <Link href="/profesor" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center text-xs font-semibold">
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver al Panel Profesora
          </Link>
          <span className="text-slate-300">|</span>
          <span className="font-display font-bold text-slate-900 text-base">
            Expediente Individual de Alumna
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/demo" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
            Demo Role Switcher
          </Link>
          <span className="bg-rose-50 border border-rose-200 text-rose-700 text-xs px-3 py-1 rounded-full font-bold">
            Profesora Faby (Docente)
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {/* Student Profile Overview Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xl flex items-center justify-center">
              LM
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold font-display text-slate-900">Lucía Martínez</h1>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                  Buen Ritmo
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Curso Profesional de Extensiones de Pestañas • Matrícula: 01/08/2026
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/auditoria"
              className="bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl transition-colors text-xs font-bold"
            >
              Inspeccionar Auditoría
            </Link>

            <div className="flex items-center space-x-4 text-center text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-medium">Progreso Curso</span>
                <p className="text-xl font-extrabold text-rose-600 font-display">68%</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-medium">Tiempo Activo</span>
                <p className="text-xl font-extrabold text-emerald-700 font-display">1.8h</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-medium">Nota Práctica 01</span>
                <p className="text-xl font-extrabold text-purple-700 font-display">86/100</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Evaluaciones, Prácticas, Historial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-base font-bold font-display text-slate-900">Evaluaciones Teóricas Registradas</h2>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">Evaluación Módulo 1: Bioseguridad</p>
                <p className="text-slate-500">Completada el 08/08/2026</p>
              </div>
              <span className="text-emerald-700 font-extrabold text-sm">100% Aprobada</span>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold font-display text-slate-900">Entrega de Prácticas Técnicas</h2>
              <Link
                href="/profesor/evaluar-practica/1"
                className="bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1 shadow-xs"
              >
                <span>Abrir Evaluador de Rúbrica →</span>
              </Link>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">Práctica 01: Aplicación Clásica</p>
                <p className="text-slate-500">Feedback enviado por Laura Gómez</p>
              </div>
              <span className="text-rose-600 font-extrabold text-sm">86 / 100</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

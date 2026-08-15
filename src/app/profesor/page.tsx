'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  GraduationCap,
  Clock,
  Award,
  ChevronRight,
  TrendingUp,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Plus
} from 'lucide-react';
import { EarlyWarningRetention } from '@/components/shared/EarlyWarningRetention';

export default function ProfesorPage() {
  const students = [
    {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Lucía Martínez',
      email: 'lucia.martinez@gmail.com',
      avatar: 'LM',
      progress: 68,
      activeHours: 1.8,
      connectedHours: 2.5,
      lastActive: 'Hace 10 min',
      status: 'Buen Ritmo',
      statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      lastPractice: 'Práctica 01 (86/100)',
    },
    {
      id: '55555555-5555-5555-5555-555555555555',
      name: 'Camila Torres',
      email: 'camila.torres@gmail.com',
      avatar: 'CT',
      progress: 92,
      activeHours: 50.0,
      connectedHours: 54.2,
      lastActive: 'Ayer',
      status: 'Certificado Listo',
      statusColor: 'bg-rose-50 text-rose-800 border-rose-200',
      lastPractice: 'Proyecto Final (95/100)',
    },
    {
      id: 'student-3',
      name: 'María López',
      email: 'maria.lopez@gmail.com',
      avatar: 'ML',
      progress: 45,
      activeHours: 18.2,
      connectedHours: 21.0,
      lastActive: 'Hace 3 días',
      status: 'En Progreso',
      statusColor: 'bg-amber-50 text-amber-800 border-amber-200',
      lastPractice: 'Práctica 02 (90/100)',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Header */}
      <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs">
              FS
            </div>
            <span className="font-display font-bold text-slate-900 text-base uppercase">
              FABY STUDIO <span className="text-rose-600">ACADEMY</span>
            </span>
          </Link>
          <span className="text-slate-300">|</span>
          <span className="text-xs font-semibold text-slate-500">Panel de Gestión Docente</span>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/profesor/cursos/nuevo"
            className="inline-flex items-center space-x-1.5 bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Crear Nuevo Máster</span>
          </Link>

          <Link
            href="/demo"
            className="inline-flex items-center space-x-1 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 text-xs px-3 py-2 rounded-xl font-bold transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Role Switcher Demo</span>
          </Link>
          <span className="bg-rose-100 text-rose-800 text-xs px-3 py-2 rounded-xl font-bold border border-rose-200">
            Profesora Faby / Laura Gómez
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {/* KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-semibold uppercase tracking-wider">Alumnas Matriculadas</span>
              <Users className="w-4 h-4 text-rose-600" />
            </div>
            <p className="text-3xl font-extrabold text-slate-900 font-display">42</p>
            <p className="text-[11px] text-emerald-700 font-semibold">+6 este mes</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-semibold uppercase tracking-wider">Tasa de Finalización</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-3xl font-extrabold text-emerald-700 font-display">74.5%</p>
            <p className="text-[11px] text-slate-500">Benchmark sector: 15%</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-semibold uppercase tracking-wider">Prácticas por Evaluar</span>
              <FileCheck className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-3xl font-extrabold text-amber-700 font-display">3</p>
            <p className="text-[11px] text-slate-500">Rúbricas pendientes</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-semibold uppercase tracking-wider">Diplomas Emitidos</span>
              <Award className="w-4 h-4 text-rose-600" />
            </div>
            <p className="text-3xl font-extrabold text-rose-700 font-display">18</p>
            <p className="text-[11px] text-slate-500">Validados con SHA-256</p>
          </div>
        </div>

        {/* Early Warning Retention Detector */}
        <EarlyWarningRetention />

        {/* Student Directory Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold font-display text-slate-900">Expedientes de Alumnas Activas</h2>
              <p className="text-xs text-slate-500">Supervisión en tiempo real de avance técnico, horas lectivas y evaluaciones.</p>
            </div>
            <span className="text-xs font-semibold text-slate-500">Mostrando 3 de 42 alumnas</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Alumna</th>
                  <th className="py-3.5 px-6">Progreso</th>
                  <th className="py-3.5 px-6">Tiempo Activo</th>
                  <th className="py-3.5 px-6">Última Práctica</th>
                  <th className="py-3.5 px-6">Estado</th>
                  <th className="py-3.5 px-6 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs border border-rose-200">
                          {st.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{st.name}</p>
                          <p className="text-[11px] text-slate-400">{st.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">{st.progress}%</td>
                    <td className="py-4 px-6 font-bold text-emerald-700">{st.activeHours}h</td>
                    <td className="py-4 px-6">{st.lastPractice}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${st.statusColor}`}>
                        {st.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href="/profesor/evaluar-practica/1"
                          className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors"
                        >
                          Evaluar Rúbrica
                        </Link>
                        <Link
                          href={`/profesor/alumnas/${st.id}`}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors"
                        >
                          Ver Expediente →
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

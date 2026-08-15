'use client';

import React, { useState } from 'react';
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
  Search,
  MessageSquare,
  Video,
  ArrowLeft,
} from 'lucide-react';

interface StudentData {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  courseTitle: string;
  progress: number;
  activeHours: number;
  connectedHours: number;
  lastActive: string;
  status: 'Buen Ritmo' | 'Certificado Listo' | 'En Progreso' | 'En Riesgo';
  lastPractice: string;
}

export default function ProfesorAlumnasIndexPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const students: StudentData[] = [
    {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Lucía Martínez',
      email: 'lucia.martinez@gmail.com',
      phone: '612 345 678',
      avatar: 'LM',
      courseTitle: 'Especialización en Pestañas y Volumen Ruso',
      progress: 68,
      activeHours: 1.8,
      connectedHours: 2.5,
      lastActive: 'Hace 10 min',
      status: 'Buen Ritmo',
      lastPractice: 'Práctica 01 (86/100)',
    },
    {
      id: '55555555-5555-5555-5555-555555555555',
      name: 'Camila Torres',
      email: 'camila.torres@gmail.com',
      phone: '654 987 321',
      avatar: 'CT',
      courseTitle: 'Máster Profesional en Uñas de Gel y Acrílico',
      progress: 92,
      activeHours: 50.0,
      connectedHours: 54.2,
      lastActive: 'Ayer',
      status: 'Certificado Listo',
      lastPractice: 'Proyecto Final (95/100)',
    },
    {
      id: 'student-3',
      name: 'María López',
      email: 'maria.lopez@gmail.com',
      phone: '678 123 456',
      avatar: 'ML',
      courseTitle: 'Curso Superior de Cosmetología Facial',
      progress: 45,
      activeHours: 18.2,
      connectedHours: 21.0,
      lastActive: 'Hace 3 días',
      status: 'En Progreso',
      lastPractice: 'Práctica 02 (90/100)',
    },
  ];

  const filtered = students.filter((s) => {
    const matchesSearch =
      searchQuery === '' ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Header */}
      <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <Link href="/profesor" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs">
              FS
            </div>
            <span className="font-display font-bold text-slate-900 text-base uppercase">
              FABY STUDIO <span className="text-rose-600">DOCENTE</span>
            </span>
          </Link>
          <span className="text-slate-300">|</span>
          <span className="text-xs font-semibold text-slate-500">Expedientes de Alumnas</span>
        </div>

        <Link
          href="/profesor"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Panel</span>
        </Link>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full text-xs font-bold text-rose-700">
              <Users className="w-3.5 h-3.5" />
              <span>Directorio Activo de Formación</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mt-2">
              Alumnas Asignadas & Trazabilidad
            </h1>
            <p className="text-xs text-slate-500">
              Seguimiento pedagógico, horas de conexión real verificadas y estado de acreditaciones.
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex space-x-2 overflow-x-auto w-full sm:w-auto">
            {['all', 'Buen Ritmo', 'Certificado Listo', 'En Progreso'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  statusFilter === st
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {st === 'all' ? 'Todas las Alumnas' : st}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre o curso..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-4 px-6">Alumna / Contacto</th>
                  <th className="py-4 px-6">Programa Formativo</th>
                  <th className="py-4 px-6">Progreso Global</th>
                  <th className="py-4 px-6">Horas Activas Reales</th>
                  <th className="py-4 px-6">Última Práctica</th>
                  <th className="py-4 px-6 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs">
                          {s.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{s.name}</p>
                          <p className="text-slate-500 text-[11px]">{s.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <p className="font-semibold text-slate-800">{s.courseTitle}</p>
                      <span className="text-[10px] text-slate-400">Activa {s.lastActive}</span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="space-y-1 w-32">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span>{s.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-rose-600 h-full rounded-full"
                            style={{ width: `${s.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="font-bold text-emerald-700 text-sm">{s.activeHours}h</span>
                      <span className="text-[10px] text-slate-400 block">TMS/369 Trazable</span>
                    </td>

                    <td className="py-4 px-6">
                      <span className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md text-[11px] font-semibold border border-slate-200">
                        {s.lastPractice}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/profesor/alumnas/${s.id}`}
                          className="bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 px-3 py-1.5 rounded-xl font-bold transition-colors shadow-2xs text-[11px]"
                        >
                          Ver Ficha
                        </Link>
                        <Link
                          href="/campus/mensajes"
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                          title="Enviar Mensaje"
                        >
                          <MessageSquare className="w-4 h-4" />
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

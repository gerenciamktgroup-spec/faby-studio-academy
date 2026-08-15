'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileCheck,
  CheckCircle2,
  Clock,
  ChevronRight,
  ArrowLeft,
  Filter,
  Eye,
  Sparkles,
  Search,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';

interface SubmissionItem {
  id: string;
  studentName: string;
  studentAvatar: string;
  studentEmail: string;
  courseTitle: string;
  practiceTitle: string;
  submittedAt: string;
  status: 'pending' | 'graded';
  grade?: string;
  image: string;
}

export default function ProfesorEvaluarPracticaIndexPage() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'graded'>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  const submissions: SubmissionItem[] = [
    {
      id: 'sub-01',
      studentName: 'Lucía Martínez',
      studentAvatar: 'LM',
      studentEmail: 'lucia.martinez@gmail.com',
      courseTitle: 'Especialización en Pestañas & Volumen Ruso',
      practiceTitle: 'Práctica 01: Aplicación Técnica Clásica Pelo a Pelo en Modelo',
      submittedAt: 'Hoy, 11:30h',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1583001809873-a1284a5da677?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'sub-02',
      studentName: 'Camila Torres',
      studentAvatar: 'CT',
      studentEmail: 'camila.torres@gmail.com',
      courseTitle: 'Máster Uñas de Gel y Acrílico Premium',
      practiceTitle: 'Proyecto Final: Mega Volumen Ruso 4D Efecto Kim',
      submittedAt: 'Ayer, 18:20h',
      status: 'graded',
      grade: '95 / 100',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'sub-03',
      studentName: 'María López',
      studentAvatar: 'ML',
      studentEmail: 'maria.lopez@gmail.com',
      courseTitle: 'Especialización en Pestañas & Volumen Ruso',
      practiceTitle: 'Práctica 02: Abanicos Manuales 3D y Nivelación de Puente',
      submittedAt: 'Hace 2 días',
      status: 'graded',
      grade: '90 / 100',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const filtered = submissions.filter((s) => {
    const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
    const matchesSearch =
      searchQuery === '' ||
      s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.practiceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
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
          <span className="text-xs font-semibold text-slate-500">Buzón de Corrección de Prácticas</span>
        </div>

        <Link
          href="/profesor"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Panel Principal</span>
        </Link>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full text-xs font-bold text-rose-700">
              <FileCheck className="w-3.5 h-3.5" />
              <span>Evaluación Continua & Rúbricas Oficiales</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mt-2">
              Buzón de Corrección de Prácticas Técnicas
            </h1>
            <p className="text-xs text-slate-500">
              Revisión fotográfica y calificación de 100 puntos sobre trabajos en modelos reales.
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex space-x-2 w-full sm:w-auto">
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterStatus === 'pending'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              Pendientes de Calificar (1)
            </button>
            <button
              onClick={() => setFilterStatus('graded')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterStatus === 'graded'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              Evaluadas ({submissions.filter((s) => s.status === 'graded').length})
            </button>
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterStatus === 'all'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas ({submissions.length})
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por alumna o práctica..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* Submissions List */}
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-rose-300 transition-all"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img src={item.image} alt={item.practiceTitle} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-sm font-display">
                      {item.studentName}
                    </span>
                    <span className="text-[11px] text-slate-400">({item.studentEmail})</span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        item.status === 'pending'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      {item.status === 'pending' ? '⏳ Pendiente de Rúbrica' : `✓ Calificada (${item.grade})`}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-800">{item.practiceTitle}</p>
                  <p className="text-[11px] text-slate-500">
                    {item.courseTitle} • Entregada {item.submittedAt}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 self-end md:self-center">
                <Link
                  href={`/profesor/evaluar-practica/22222222-2222-2222-2222-222222222222`}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm shadow-rose-600/20 transition-all flex items-center space-x-1.5"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>{item.status === 'pending' ? 'Abrir Rúbrica de 100 Pts' : 'Ver Evaluación'}</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

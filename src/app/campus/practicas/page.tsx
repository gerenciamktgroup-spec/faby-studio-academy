'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileCheck,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Clock,
  Award,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function PracticasPage() {
  const [selectedPractice, setSelectedPractice] = useState(1);

  const practices = [
    {
      id: 1,
      title: 'Práctica 01: Aplicación Técnica Clásica Pelo a Pelo',
      module: 'Módulo 1: Fundamentos & Bioseguridad',
      status: 'evaluated',
      grade: '86 / 100',
      passingGrade: 70,
      tutorName: 'Laura Gómez',
      evaluatedDate: '07/08/2026',
      rubricScores: [
        { criterion: '1. Aislamiento y Separación Pestaña a Pestaña', points: 23, max: 25, feedback: 'Excelente aislamiento en zona central y lagrimal.' },
        { criterion: '2. Distancia al Párpado (0.5mm - 1.0mm)', points: 21, max: 25, feedback: 'Distancia homogénea sin tocar dermis.' },
        { criterion: '3. Dirección y Simetría del Abanicado', points: 22, max: 25, feedback: 'Buena transición de longitudes.' },
        { criterion: '4. Limpieza de Adhesivo y Micro-Gota', points: 20, max: 25, feedback: 'Vigila no sobrecargar el lagrimal interno.' },
      ],
      tutorSummary: '¡Felicidades Lucía! Tu primera entrega técnica demuestra un gran control de las pinzas y respeto a la salud de la pestaña natural. Estás lista para avanzar al Módulo 2 de Mapping.',
    },
  ];

  const current = practices[0];

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Evaluación Continua</span>
          <h1 className="text-2xl font-bold font-display text-slate-900 mt-1">Prácticas Técnicas & Rúbricas</h1>
          <p className="text-xs text-slate-500">Revisión personalizada de fotografías de trabajos en modelos reales por parte de tu tutora.</p>
        </div>

        <Link
          href="/campus/proyectos"
          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center space-x-1.5 self-start"
        >
          <Layers className="w-4 h-4" />
          <span>Galería de Proyectos</span>
        </Link>
      </div>

      {/* Practice Details Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Evaluación Aprobada ✓
            </span>
            <h2 className="text-lg font-bold font-display text-slate-900 mt-2">{current.title}</h2>
            <p className="text-xs text-slate-500">{current.module}</p>
          </div>

          <div className="text-left sm:text-right bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-xs text-slate-500 font-semibold">Calificación por Rúbrica</span>
            <p className="text-2xl font-extrabold text-rose-600 font-display">{current.grade}</p>
            <p className="text-[10px] text-slate-400">Mínimo para aprobar: {current.passingGrade}/100</p>
          </div>
        </div>

        {/* Rubric Breakdown Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Desglose de los 4 Criterios de la Rúbrica:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {current.rubricScores.map((r, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">{r.criterion}</span>
                  <span className="font-bold text-rose-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {r.points} / {r.max} pts
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{r.feedback}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tutor Feedback Box */}
        <div className="p-5 bg-rose-50/60 rounded-2xl border border-rose-200 space-y-2 text-xs">
          <div className="flex items-center space-x-2 text-rose-800 font-bold">
            <MessageSquare className="w-4 h-4 text-rose-600" />
            <span>Devolución Pedagógica de {current.tutorName}:</span>
          </div>
          <p className="text-slate-700 leading-relaxed italic">"{current.tutorSummary}"</p>
        </div>
      </div>
    </div>
  );
}

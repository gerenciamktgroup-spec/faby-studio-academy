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
  ArrowRight,
  Eye,
  Camera,
  Download,
} from 'lucide-react';
import { VisualFeedbackAnnotator, AnnotationPin } from '@/components/shared/VisualFeedbackAnnotator';
import { AIPracticeReviewer } from '@/components/shared/AIPracticeReviewer';

export default function PracticasPage() {
  const [selectedPracticeId, setSelectedPracticeId] = useState(1);

  const DEMO_PINS: AnnotationPin[] = [
    {
      id: 1,
      x: 28,
      y: 42,
      title: 'Aislamiento Limpio en Lagrimal',
      category: 'Aislamiento',
      type: 'success',
      feedback: 'Excelente separación de pestañas anágenas finas sin pelos cruzados ni adherencias.',
      scoreImpact: '23 / 25 pts (+92%)',
    },
    {
      id: 2,
      x: 52,
      y: 35,
      title: 'Distancia Homogénea al Párpado (0.8mm)',
      category: 'Distancia',
      type: 'success',
      feedback: 'La base de la extensión respeta la distancia de seguridad sin tocar la dermis del párpado.',
      scoreImpact: '21 / 25 pts (+84%)',
    },
    {
      id: 3,
      x: 76,
      y: 48,
      title: 'Alineación de Abanicos en Canto Externo',
      category: 'Dirección',
      type: 'success',
      feedback: 'Transición fluida de longitudes de 10mm a 12mm siguiendo la curvatura natural del ojo.',
      scoreImpact: '22 / 25 pts (+88%)',
    },
    {
      id: 4,
      x: 38,
      y: 60,
      title: 'Ligero Exceso de Adhesivo en Zona Media',
      category: 'Adhesivo',
      type: 'warning',
      feedback: 'Recuerda retirar el sobrante en la esponja de prueba. La micro-gota no debe superar 1mm de base.',
      scoreImpact: '20 / 25 pts (+80%)',
    },
  ];

  const practices = [
    {
      id: 1,
      title: 'Práctica 01: Aplicación Técnica Clásica Pelo a Pelo en Modelo',
      module: 'Módulo 1: Fundamentos Profesionales & Bioseguridad',
      status: 'evaluated',
      grade: '86 / 100',
      passingGrade: 70,
      tutorName: 'Laura Gómez (Tutora Académica)',
      evaluatedDate: '07/08/2026',
      imageSrc: 'https://images.unsplash.com/photo-1583001809873-a1284a5da677?q=80&w=900&auto=format&fit=crop',
      rubricScores: [
        {
          criterion: '1. Aislamiento y Separación Pestaña a Pestaña',
          points: 23,
          max: 25,
          feedback: 'Excelente aislamiento en zona central y lagrimal.',
        },
        {
          criterion: '2. Distancia al Párpado (0.5mm - 1.0mm)',
          points: 21,
          max: 25,
          feedback: 'Distancia homogénea sin tocar dermis.',
        },
        {
          criterion: '3. Dirección y Simetría del Abanicado',
          points: 22,
          max: 25,
          feedback: 'Buena transición de longitudes y puente armónico.',
        },
        {
          criterion: '4. Limpieza de Adhesivo y Micro-Gota',
          points: 20,
          max: 25,
          feedback: 'Vigila no sobrecargar el lagrimal interno.',
        },
      ],
      tutorSummary:
        '¡Felicidades Lucía! Tu primera entrega técnica demuestra un gran control de las pinzas y respeto a la salud de la pestaña natural. Has superado el 70% requerido y puedes avanzar con total solvencia al Módulo 2 de Mapping.',
    },
  ];

  const current = practices[0];

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full text-xs font-bold text-rose-700">
            <Award className="w-3.5 h-3.5" />
            <span>Evaluación Continua por Rúbrica Oficial</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mt-2">
            Prácticas Técnicas & Corrección Visual
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl">
            Revisión individualizada por tutoras con rúbricas de 100 puntos y chinchetas de retroalimentación visual sobre tus fotografías en modelos reales.
          </p>
        </div>

        <Link
          href="/campus/proyectos"
          className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center space-x-2 self-start hover:scale-[1.02]"
        >
          <Layers className="w-4 h-4" />
          <span>Ver Galería de Proyectos</span>
        </Link>
      </div>

      {/* Visual Annotation Component */}
      <VisualFeedbackAnnotator
        imageSrc={current.imageSrc}
        title="Evidencia Fotográfica: Aplicación 1x1 y Aislamiento en Modelo Real"
        pins={DEMO_PINS}
        tutorName={current.tutorName}
      />

      {/* Experimental AI Vision Practice Reviewer */}
      <AIPracticeReviewer
        imageUrl={current.imageSrc}
        practiceTitle={current.title}
      />

      {/* Practice Details Card with 100-pt Rubric */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Evaluación Aprobada ✓
            </span>
            <h2 className="text-lg font-bold font-display text-slate-900 mt-2">{current.title}</h2>
            <p className="text-xs text-slate-500">
              {current.module} • Revisado el {current.evaluatedDate}
            </p>
          </div>

          <div className="text-left sm:text-right bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-xs text-slate-500 font-semibold">Calificación Global</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-rose-600 font-display">
              {current.grade}
            </p>
            <p className="text-[10px] text-slate-400">
              Mínimo para aprobar: {current.passingGrade}/100 pts
            </p>
          </div>
        </div>

        {/* Rubric Breakdown Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Desglose Oficial de los 4 Criterios de la Rúbrica:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {current.rubricScores.map((r, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs"
              >
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

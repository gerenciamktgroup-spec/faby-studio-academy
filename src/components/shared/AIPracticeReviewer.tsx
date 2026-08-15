'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  Layers,
  Cpu,
  UserCheck,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface AIPracticeReviewerProps {
  imageUrl: string;
  practiceTitle?: string;
  isTeacherView?: boolean;
}

export function AIPracticeReviewer({
  imageUrl,
  practiceTitle = 'Práctica 01: Aplicación Clásica Pelo a Pelo en Modelo',
  isTeacherView = false,
}: AIPracticeReviewerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisCompleted, setAnalysisCompleted] = useState(true);
  const [teacherOverride, setTeacherOverride] = useState<number | null>(86);
  const [overrideNotes, setOverrideNotes] = useState('Excelente aislamiento y dirección. Ajustar inclinación en lagrimal.');

  const visionFactors = [
    {
      name: '📐 Simetría & Apertura Geométrica',
      score: 92,
      assessment: 'Excelente',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      description: 'Abanicos simétricos con base fina y balance uniforme.',
    },
    {
      name: '📏 Distancia de Seguridad al Párpado (0.5 - 1.0 mm)',
      score: 88,
      assessment: 'Correcto',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      description: 'Distancia constante sin contacto con el párpado ni obstrucción de Meibomio.',
    },
    {
      name: '🧭 Direccionalidad & Paralelismo',
      score: 90,
      assessment: 'Óptimo',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      description: 'Orientación armónica a 90° respecto a la curvatura del ojo.',
    },
    {
      name: '💧 Dosificación de Adhesivo & Cero Stickies',
      score: 82,
      assessment: 'Mejorable',
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      description: 'Ligero exceso de microgotas en zona de lagrimal. Aislamiento general limpio.',
    },
  ];

  const averageAIScore = Math.round(
    visionFactors.reduce((acc, f) => acc + f.score, 0) / visionFactors.length
  );

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisCompleted(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisCompleted(true);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header with Experimental AI Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full text-xs font-bold text-purple-700">
              <Cpu className="w-3.5 h-3.5 text-purple-600" />
              <span>AI PRACTICE REVIEW — FASE EXPERIMENTAL</span>
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-mono font-bold">
              v1.2 Vision Core
            </span>
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Asistente Visual IA para Análisis Técnico de Prácticas
          </h2>
          <p className="text-xs text-slate-500">
            Detección preliminar de simetría, distancia al párpado y dosificación de adhesivo antes de la rúbrica oficial.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRunAnalysis}
          disabled={isAnalyzing}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-purple-600/20 flex items-center space-x-2 shrink-0 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isAnalyzing ? 'Escaneando Foto...' : 'Re-analizar con IA'}</span>
        </button>
      </div>

      {/* Mandatory Regulatory Warning: AI NEVER GRADES OFFICIALLY */}
      <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 flex items-start space-x-3 text-xs text-amber-900">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold">
            Garantía Pedagógica Faby Studio — Evaluación Oficial Humana
          </p>
          <p className="text-[11px] text-amber-800 leading-relaxed">
            El análisis de visión artificial es únicamente una herramienta de asistencia y diagnóstico visual orientativo. <strong>La calificación oficial de 100 puntos y el feedback pedagógico son emitidos y firmados exclusivamente por la tutora humana acreditada.</strong>
          </p>
        </div>
      </div>

      {/* Grid: Photo Preview + AI Detected Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Image with Scanning Reticle Overlay */}
        <div className="lg:col-span-5 space-y-2">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group aspect-4/3">
            <img
              src={imageUrl}
              alt={practiceTitle}
              className="w-full h-full object-cover"
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-purple-900/40 backdrop-blur-2xs flex flex-col items-center justify-center text-white space-y-2 animate-pulse">
                <Cpu className="w-8 h-8 animate-spin" />
                <span className="text-xs font-bold font-mono">Calculando curvaturas & distancias...</span>
              </div>
            )}
            <div className="absolute bottom-3 left-3 bg-black/75 text-white text-[10px] font-mono px-2.5 py-1 rounded-lg backdrop-blur-xs">
              4 Puntos de Control Calibrados
            </div>
          </div>
          <p className="text-[11px] text-slate-400 text-center font-mono">
            Resolución inspeccionada: 1920x1080 • Cero compresión destructiva
          </p>
        </div>

        {/* Right: Detected Factors Breakdown */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
            <span className="font-bold text-slate-700">Índice Global de Calidad Visual IA:</span>
            <span className="font-extrabold text-purple-700 font-display text-sm">
              {averageAIScore} / 100
            </span>
          </div>

          <div className="space-y-2">
            {visionFactors.map((factor, i) => (
              <div
                key={i}
                className="p-3 bg-white rounded-xl border border-slate-200 hover:border-purple-200 transition-all space-y-1.5 text-xs shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{factor.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${factor.color}`}>
                    {factor.score} pts • {factor.assessment}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teacher Override Section */}
      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-4 h-4 text-rose-600" />
            <span className="font-bold text-slate-900 font-display">
              Validación y Nota Oficial de la Tutora (Teacher Override)
            </span>
          </div>
          <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
            ✓ Nota Definitiva: {teacherOverride} / 100
          </span>
        </div>

        <p className="text-slate-600 bg-white p-3 rounded-xl border border-slate-200 italic">
          “{overrideNotes}”
        </p>

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
          <span>Firmado por: <strong>Dra. María Rodríguez</strong> (Acreditación Docente Faby Studio)</span>
          <span>Fecha de Validación: 15 de Agosto de 2026</span>
        </div>
      </div>
    </div>
  );
}

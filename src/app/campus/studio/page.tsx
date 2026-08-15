'use client';

import React from 'react';
import { LashMappingStudio } from '@/components/shared/LashMappingStudio';
import { Sparkles, Layers, Award, BookOpen } from 'lucide-react';

export default function CampusStudioPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Intro Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-3">
        <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-700">
          <Sparkles className="w-4 h-4 text-rose-600" />
          <span>HERRAMIENTAS PROFESIONALES DE CABINA</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
          Estudio de Visagismo & Arquitectura de Mirada
        </h1>
        <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
          Diseña mapas técnicos personalizados para tus clientas reales. Selecciona el biotipo ocular, define los sectores de longitud y curvatura y exporta la ficha técnica para adjuntarla como evidencia a tu rúbrica docente.
        </p>
      </div>

      {/* Main Studio Component */}
      <LashMappingStudio />
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Eye,
  Sliders,
  Download,
  Share2,
  CheckCircle2,
  AlertCircle,
  Layers,
  Award,
  FileCheck,
  RotateCcw,
} from 'lucide-react';

export interface MappingZone {
  zoneIndex: number;
  label: string;
  length: number; // in mm
  curvature: 'C' | 'CC' | 'D' | 'L' | 'M';
  thickness: '0.05' | '0.07' | '0.10' | '0.15';
}

export function LashMappingStudio() {
  const [eyeShape, setEyeShape] = useState<'almendrado' | 'encapotado' | 'caido' | 'redondo'>('encapotado');
  const [designEffect, setDesignEffect] = useState<'ardilla' | 'cat_eye' | 'doll' | 'wispy'>('ardilla');
  const [clientName, setClientName] = useState('Elena Valdés');
  const [notes, setNotes] = useState('Párpado encapotado moderado. Se busca abrir la mirada sin rozar el pliegue.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // 5 Lash Mapping Zones from Inner Corner (Lagrimal) to Outer Corner (Canto Externo)
  const [zones, setZones] = useState<MappingZone[]>([
    { zoneIndex: 1, label: 'Lagrimal (T1)', length: 8, curvature: 'C', thickness: '0.07' },
    { zoneIndex: 2, label: 'Medial Interno (T2)', length: 9, curvature: 'C', thickness: '0.07' },
    { zoneIndex: 3, label: 'Punto Ápice (T3)', length: 11, curvature: 'M', thickness: '0.07' },
    { zoneIndex: 4, label: 'Medial Externo (T4)', length: 12, curvature: 'M', thickness: '0.07' },
    { zoneIndex: 5, label: 'Canto Externo (T5)', length: 10, curvature: 'C', thickness: '0.07' },
  ]);

  const handleZoneLengthChange = (zoneIndex: number, newLength: number) => {
    setZones((prev) =>
      prev.map((z) => (z.zoneIndex === zoneIndex ? { ...z, length: newLength } : z))
    );
  };

  const handleZoneCurvatureChange = (zoneIndex: number, newCurv: 'C' | 'CC' | 'D' | 'L' | 'M') => {
    setZones((prev) =>
      prev.map((z) => (z.zoneIndex === zoneIndex ? { ...z, curvature: newCurv } : z))
    );
  };

  const handlePresetChange = (effect: 'ardilla' | 'cat_eye' | 'doll' | 'wispy') => {
    setDesignEffect(effect);
    if (effect === 'cat_eye') {
      setZones([
        { zoneIndex: 1, label: 'Lagrimal (T1)', length: 8, curvature: 'C', thickness: '0.07' },
        { zoneIndex: 2, label: 'Medial Interno (T2)', length: 9, curvature: 'C', thickness: '0.07' },
        { zoneIndex: 3, label: 'Punto Medio (T3)', length: 11, curvature: 'CC', thickness: '0.07' },
        { zoneIndex: 4, label: 'Punto Alto (T4)', length: 13, curvature: 'D', thickness: '0.07' },
        { zoneIndex: 5, label: 'Canto Externo (T5)', length: 14, curvature: 'D', thickness: '0.07' },
      ]);
    } else if (effect === 'doll') {
      setZones([
        { zoneIndex: 1, label: 'Lagrimal (T1)', length: 8, curvature: 'C', thickness: '0.07' },
        { zoneIndex: 2, label: 'Medial Interno (T2)', length: 10, curvature: 'CC', thickness: '0.07' },
        { zoneIndex: 3, label: 'Punto Alto (T3)', length: 13, curvature: 'D', thickness: '0.07' },
        { zoneIndex: 4, label: 'Medial Externo (T4)', length: 10, curvature: 'CC', thickness: '0.07' },
        { zoneIndex: 5, label: 'Canto Externo (T5)', length: 8, curvature: 'C', thickness: '0.07' },
      ]);
    } else if (effect === 'ardilla') {
      setZones([
        { zoneIndex: 1, label: 'Lagrimal (T1)', length: 8, curvature: 'C', thickness: '0.07' },
        { zoneIndex: 2, label: 'Medial Interno (T2)', length: 9, curvature: 'C', thickness: '0.07' },
        { zoneIndex: 3, label: 'Punto Ápice (T3)', length: 11, curvature: 'M', thickness: '0.07' },
        { zoneIndex: 4, label: 'Punto Alto (T4)', length: 12, curvature: 'M', thickness: '0.07' },
        { zoneIndex: 5, label: 'Canto Externo (T5)', length: 10, curvature: 'C', thickness: '0.07' },
      ]);
    } else {
      // Wispy
      setZones([
        { zoneIndex: 1, label: 'Lagrimal (T1)', length: 8, curvature: 'C', thickness: '0.05' },
        { zoneIndex: 2, label: 'Medial Interno (T2)', length: 10, curvature: 'CC', thickness: '0.05' },
        { zoneIndex: 3, label: 'Punto Alto (T3)', length: 12, curvature: 'D', thickness: '0.05' },
        { zoneIndex: 4, label: 'Medial Externo (T4)', length: 13, curvature: 'D', thickness: '0.05' },
        { zoneIndex: 5, label: 'Canto Externo (T5)', length: 11, curvature: 'C', thickness: '0.05' },
      ]);
    }
  };

  const handleSaveBlueprint = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full text-xs font-bold text-rose-700">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>FABY VISUAL STUDIO & SIMULADOR DE LASH MAPPING</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Estudio Digital de Visagismo & Mapeo de Mirada
          </h2>
          <p className="text-xs text-slate-500">
            Diseña y calibra mapas de extensiones milimétricos sobre parches de hidrogel para tus prácticas en modelo real.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleSaveBlueprint}
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{savedSuccess ? '¡Ficha Guardada!' : 'Exportar Ficha Técnica'}</span>
          </button>
        </div>
      </div>

      {/* Control Presets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Biotype Selector */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
          <span className="text-xs font-bold text-slate-900 block uppercase tracking-wider">
            1. Morfología & Biotipo Ocular de la Clienta:
          </span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'encapotado', label: 'Párpado Encapotado', icon: '👁️' },
              { id: 'almendrado', label: 'Ojo Almendrado', icon: '✨' },
              { id: 'caido', label: 'Ojo Caído / Maduro', icon: '⏳' },
              { id: 'redondo', label: 'Ojo Redondo / Grande', icon: '🎯' },
            ].map((bt) => (
              <button
                key={bt.id}
                onClick={() => setEyeShape(bt.id as any)}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center space-x-2 ${
                  eyeShape === bt.id
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{bt.icon}</span>
                <span>{bt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Effect Selector */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
          <span className="text-xs font-bold text-slate-900 block uppercase tracking-wider">
            2. Efecto de Diseño (Lash Mapping Style):
          </span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'ardilla', label: 'Efecto Ardilla (Fox)', desc: 'Ideal encapotados' },
              { id: 'cat_eye', label: 'Cat Eye (Ojo Gato)', desc: 'Almendrados' },
              { id: 'doll', label: 'Doll Eye (Muñeca)', desc: 'Apertura central' },
              { id: 'wispy', label: 'Kim K / Wispy', desc: 'Espigas combinadas' },
            ].map((eff) => (
              <button
                key={eff.id}
                onClick={() => handlePresetChange(eff.id as any)}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left ${
                  designEffect === eff.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <p>{eff.label}</p>
                <p className={`text-[10px] ${designEffect === eff.id ? 'text-slate-300' : 'text-slate-400'}`}>
                  {eff.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Hydrogel Patch Simulator */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-6 relative overflow-hidden shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Esquema de Longitudes sobre Parche de Hidrogel (Ojo Derecho)
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800">
            Biotipo: {eyeShape.toUpperCase()} • {designEffect.toUpperCase()}
          </span>
        </div>

        {/* The Graphic Eye Patch */}
        <div className="relative bg-slate-800/80 rounded-2xl p-6 sm:p-10 border border-slate-700 flex flex-col items-center justify-center min-h-[220px]">
          {/* Eyeball guide curve */}
          <div className="w-full max-w-xl h-24 border-t-2 border-dashed border-rose-500/40 rounded-t-full flex items-end justify-between px-4 pb-2 relative">
            {/* 5 Sectors */}
            {zones.map((z, idx) => (
              <div
                key={z.zoneIndex}
                className="flex flex-col items-center space-y-1 relative group"
              >
                {/* Simulated Lash Height Bar */}
                <div
                  className="w-10 sm:w-12 bg-gradient-to-t from-rose-600 to-pink-400 rounded-t-xl transition-all duration-300 flex items-center justify-center text-white font-extrabold text-xs shadow-md"
                  style={{ height: `${z.length * 6.5}px` }}
                >
                  {z.length}mm
                </div>

                <div className="text-center">
                  <span className="text-[10px] font-mono text-rose-300 font-bold block">
                    Curva {z.curvature}
                  </span>
                  <span className="text-[9px] text-slate-400 block whitespace-nowrap">
                    {z.label.split(' ')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full max-w-xl border-t border-slate-700 pt-3 flex justify-between text-[10px] text-slate-400 font-mono">
            <span>← Lagrimal (Canto Interno)</span>
            <span>Centro Pupilar</span>
            <span>Canto Externo →</span>
          </div>
        </div>
      </div>

      {/* Zone Fine-Tuning Sliders */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          3. Calibración Milimétrica de Zonas & Curvaturas:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {zones.map((zone) => (
            <div
              key={zone.zoneIndex}
              className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs"
            >
              <div className="flex justify-between items-center border-b border-slate-200 pb-1.5">
                <span className="font-bold text-slate-900">{zone.label}</span>
                <span className="font-extrabold text-rose-600 font-mono">{zone.length} mm</span>
              </div>

              {/* Slider for Length */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-medium">Longitud</span>
                <input
                  type="range"
                  min="7"
                  max="15"
                  value={zone.length}
                  onChange={(e) => handleZoneLengthChange(zone.zoneIndex, parseInt(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
              </div>

              {/* Curvature Buttons */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-medium">Curvatura</span>
                <div className="flex gap-1">
                  {(['C', 'CC', 'D', 'L', 'M'] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => handleZoneCurvatureChange(zone.zoneIndex, c)}
                      className={`flex-1 py-1 rounded text-[10px] font-bold border transition-colors ${
                        zone.curvature === c
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

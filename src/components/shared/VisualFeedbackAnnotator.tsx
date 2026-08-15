'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  XCircle,
  HelpCircle,
  Eye,
  Info,
  Layers,
  Maximize2,
  X,
} from 'lucide-react';

export interface AnnotationPin {
  id: number;
  x: number; // percentage from left (0 to 100)
  y: number; // percentage from top (0 to 100)
  title: string;
  category: 'Aislamiento' | 'Distancia' | 'Dirección' | 'Adhesivo' | 'Estructura' | 'Cutícula';
  type: 'success' | 'warning' | 'error';
  feedback: string;
  scoreImpact?: string;
}

interface VisualFeedbackAnnotatorProps {
  imageSrc: string;
  title: string;
  pins: AnnotationPin[];
  studentName?: string;
  tutorName?: string;
}

export function VisualFeedbackAnnotator({
  imageSrc,
  title,
  pins,
  studentName = 'Lucía Martínez',
  tutorName = 'Laura Gómez',
}: VisualFeedbackAnnotatorProps) {
  const [activePinId, setActivePinId] = useState<number | null>(pins[0]?.id ?? null);
  const [showAllPins, setShowAllPins] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const activePin = pins.find((p) => p.id === activePinId);

  const getPinColor = (type: AnnotationPin['type']) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-600 border-white text-white ring-4 ring-emerald-500/30';
      case 'warning':
        return 'bg-amber-500 border-white text-white ring-4 ring-amber-500/30';
      case 'error':
        return 'bg-rose-600 border-white text-white ring-4 ring-rose-500/30';
    }
  };

  const getBadgeTypeStyle = (type: AnnotationPin['type']) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'warning':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'error':
        return 'bg-rose-50 text-rose-800 border-rose-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-5 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Eye className="w-3 h-3" /> Corrección Visual Docente
            </span>
            <span className="text-[10px] text-slate-400">
              Evaluado por <strong className="text-slate-700">{tutorName}</strong>
            </span>
          </div>
          <h3 className="text-base font-bold font-display text-slate-900 mt-1">{title}</h3>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAllPins(!showAllPins)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              showAllPins
                ? 'bg-rose-50 border-rose-200 text-rose-700'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            {showAllPins ? 'Ocultar Pines' : 'Mostrar Pines'}
          </button>
        </div>
      </div>

      {/* Main Grid: Photo with Pins + Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Photo Container */}
        <div className="lg:col-span-7 relative bg-slate-950 rounded-2xl overflow-hidden shadow-md aspect-[4/3] select-none group">
          <img src={imageSrc} alt={title} className="w-full h-full object-cover" />

          {/* Overlay Gradient for contrast */}
          <div className="absolute inset-0 bg-slate-950/15 pointer-events-none" />

          {/* Pins Layer */}
          {showAllPins &&
            pins.map((pin) => {
              const isActive = pin.id === activePinId;
              return (
                <button
                  key={pin.id}
                  onClick={() => setActivePinId(pin.id)}
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border-2 font-bold text-xs flex items-center justify-center transition-all cursor-pointer shadow-lg ${getPinColor(
                    pin.type
                  )} ${isActive ? 'scale-125 z-20 ring-rose-400' : 'hover:scale-110 z-10 opacity-90'}`}
                  title={`${pin.title} (${pin.category})`}
                >
                  <span>{pin.id}</span>
                </button>
              );
            })}

          {/* Quick instructions pill */}
          <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
            <Info className="w-3 h-3 text-rose-400" />
            <span>Haz clic en los números del 1 al {pins.length} para ver el feedback</span>
          </div>

          <button
            onClick={() => setIsFullScreen(true)}
            className="absolute bottom-3 right-3 bg-slate-900/80 hover:bg-slate-900 text-white p-2 rounded-xl text-xs backdrop-blur-xs transition-colors"
            title="Ver imagen completa"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Selected Pin Feedback Details */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Detalle del Marcador #{activePin?.id ?? 1}
              </span>
              {activePin && (
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getBadgeTypeStyle(
                    activePin.type
                  )}`}
                >
                  {activePin.category}
                </span>
              )}
            </div>

            {activePin ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  {activePin.type === 'success' && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {activePin.type === 'warning' && (
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                  )}
                  {activePin.type === 'error' && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                  <h4 className="font-bold text-slate-900 text-sm font-display leading-snug">
                    {activePin.title}
                  </h4>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2">
                  <p>{activePin.feedback}</p>
                  {activePin.scoreImpact && (
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-semibold">Puntuación en Rúbrica:</span>
                      <span className="font-bold text-emerald-700">{activePin.scoreImpact}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                Selecciona un marcador en la fotografía para examinar las observaciones.
              </p>
            )}
          </div>

          {/* Pin List Selector */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              Todos los Criterios Señalados ({pins.length}):
            </span>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {pins.map((pin) => (
                <button
                  key={pin.id}
                  onClick={() => setActivePinId(pin.id)}
                  className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                    pin.id === activePinId
                      ? 'bg-rose-50 border-rose-300 text-rose-900 shadow-2xs font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 ${
                        pin.type === 'success'
                          ? 'bg-emerald-600'
                          : pin.type === 'warning'
                          ? 'bg-amber-500'
                          : 'bg-rose-600'
                      }`}
                    >
                      {pin.id}
                    </span>
                    <span className="truncate">{pin.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 shrink-0">{pin.category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen modal */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full border border-slate-200 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
              <button
                onClick={() => setIsFullScreen(false)}
                className="p-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 flex-1 flex items-center justify-center bg-slate-950">
              <img src={imageSrc} alt={title} className="max-h-[70vh] rounded-xl object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

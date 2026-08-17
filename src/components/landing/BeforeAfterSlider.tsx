'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

export function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeTab, setActiveTab] = useState<'unas' | 'pestanas' | 'facial'>('unas');
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const transformations = {
    unas: {
      category: 'Uñas & Manicura Rusa',
      title: 'De Uñas Dañadas a Esculpido de Salón con Nivelación Rubber',
      description: 'Preparación profunda con torno, corte de cutícula milimétrico y estructura Almond reforzada.',
      beforeImg: 'https://images.unsplash.com/photo-1519014816548-bf7851c8528b?q=80&w=800&auto=format&fit=crop',
      afterImg: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=800&auto=format&fit=crop',
      beforeLabel: 'Antes: Cutícula sin tratar & lámina frágil',
      afterLabel: 'Después: Manicura Rusa & Gel Constructor',
    },
    pestanas: {
      category: 'Pestañas & Mirada',
      title: 'De Pestañas Claras a Set de Volumen Ruso 3D Ultraligero',
      description: 'Aislamiento pestaña a pestaña, visagismo Cat Eye y apertura perfecta de abanicos sin exceso de peso.',
      beforeImg: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
      afterImg: 'https://images.unsplash.com/photo-1583001809873-a1284a5da677?q=80&w=800&auto=format&fit=crop',
      beforeLabel: 'Antes: Pestaña natural sin densidad',
      afterLabel: 'Después: Volumen Ruso & Curvatura D',
    },
    facial: {
      category: 'Cosmetología Facial',
      title: 'De Piel Asfixiada y Poros Abiertos a Glow Hidrafacial Inmediato',
      description: 'Doble limpieza profunda, extracción ultrasónica de impurezas e infusión de sueros antioxidantes.',
      beforeImg: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop',
      afterImg: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
      beforeLabel: 'Antes: Impurezas y textura irregular',
      afterLabel: 'Después: Protocolo Hidrafacial & Luminosidad',
    },
  };

  const current = transformations[activeTab];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section className="py-20 bg-slate-900 text-white overflow-hidden relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-rose-950/80 border border-rose-500/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-300">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>RESULTADOS VISIBLES DE NUESTRAS ALUMNAS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display">
            Domina Transformaciones Reales de Alto Nivel
          </h2>
          <p className="text-sm text-slate-400">
            Desliza el cursor para comparar el antes y después de los trabajos prácticos realizados por nuestras alumnas bajo supervisión docente.
          </p>

          {/* Speciality Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            <button
              onClick={() => setActiveTab('unas')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'unas'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              💅 Uñas Esculpidas
            </button>
            <button
              onClick={() => setActiveTab('pestanas')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'pestanas'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              👁️ Pestañas Volumen Ruso
            </button>
            <button
              onClick={() => setActiveTab('facial')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'facial'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              🧴 Protocolo Hidrafacial
            </button>
          </div>
        </div>

        {/* Interactive Comparison Card */}
        <div className="max-w-4xl mx-auto bg-slate-950 rounded-3xl border border-slate-800 p-4 sm:p-6 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                {current.category}
              </span>
              <h3 className="text-lg font-bold text-white font-display">{current.title}</h3>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">{current.description}</p>
          </div>

          {/* The Slider Container */}
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-80 sm:h-[420px] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-inner bg-black"
          >
            {/* After Image (Full width background) */}
            <img
              src={current.afterImg}
              alt="Después de la técnica"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute top-4 right-4 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full pointer-events-none">
              {current.afterLabel}
            </div>

            {/* Before Image (Clipped overlay) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
              <img
                src={current.beforeImg}
                alt="Antes de la técnica"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 text-[11px] font-bold px-3 py-1 rounded-full">
                {current.beforeLabel}
              </div>
            </div>

            {/* Slider Handle Divider */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-2xl border-2 border-rose-500">
                <MoveHorizontal className="w-4 h-4 text-rose-600" />
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <span className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
              <MoveHorizontal className="w-3.5 h-3.5 text-rose-400" /> Arrastra a izquierda o derecha para ver la técnica en detalle
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

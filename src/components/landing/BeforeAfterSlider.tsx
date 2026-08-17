'use client';

import React, { useState, useRef, useCallback } from 'react';
import { MoveHorizontal, Sparkles } from 'lucide-react';
import { landingMedia } from '@/lib/media/landingMedia';

export function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeTab, setActiveTab] = useState<'unas' | 'pestanas' | 'facial'>('unas');
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const transformations = {
    unas: {
      category: '01 · Uñas & Manicura Rusa',
      title: 'De Cutícula Irregular a Esculpido Estructural con Nivelación Rubber',
      description: 'Preparación profunda con torno, corte de cutícula milimétrico y control del ápice con gel constructor autonivelante.',
      beforeImg: landingMedia.transformations.nailsBefore.src,
      afterImg: landingMedia.transformations.nailsAfter.src,
      beforeLabel: 'Antes: Cutícula sin tratar & lámina frágil',
      afterLabel: 'Después: Manicura Rusa & Gel Autonivelante',
    },
    pestanas: {
      category: '02 · Mirada & Cejas',
      title: 'De Pestaña Clara a Set de Volumen Ruso 3D Ultraligero',
      description: 'Aislamiento pestaña a pestaña, visagismo Cat Eye y apertura manual de abanicos 2D-6D sin exceso de adhesivo.',
      beforeImg: landingMedia.transformations.lashesBefore.src,
      afterImg: landingMedia.transformations.lashesAfter.src,
      beforeLabel: 'Antes: Pestaña natural sin densidad',
      afterLabel: 'Después: Volumen Ruso 3D & Curvatura D',
    },
    facial: {
      category: '03 · Cosmetología Facial',
      title: 'De Piel Asfixiada y Poros Ocluidos a Glow Hidrafacial Inmediato',
      description: 'Desincrustación ultrasónica, exfoliación química no irritante e infusión dérmica de sueros con ácido hialurónico.',
      beforeImg: landingMedia.transformations.facialBefore.src,
      afterImg: landingMedia.transformations.facialAfter.src,
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
    <section id="resultados" className="py-20 lg:py-32 bg-[#FAF6F3] text-[#111114] border-b border-[#E8E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-[#FBE8EF] border border-[#F6CADB] px-3.5 py-1 text-xs font-bold text-[#B70055]">
              <Sparkles className="w-3.5 h-3.5 text-[#DD006B]" />
              <span className="uppercase tracking-widest text-[10px]">Portafolio Técnico & Acabados</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111114] tracking-tight leading-[1.0]">
              La técnica se ve.
            </h2>
            <p className="text-sm sm:text-base text-[#6E6763] font-sans max-w-xl">
              Resultados que empiezan por aprender a observar, corregir y repetir bajo la supervisión directa del equipo docente.
            </p>
          </div>

          {/* Specialty Selector Tabs */}
          <div className="flex items-center space-x-2 border-b border-[#E8E2DA] pb-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('unas')}
              className={`pb-2 px-3 text-xs uppercase tracking-widest font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'unas'
                  ? 'border-[#DD006B] text-[#DD006B]'
                  : 'border-transparent text-[#8A8682] hover:text-[#111114]'
              }`}
            >
              Uñas Esculpidas
            </button>
            <button
              onClick={() => setActiveTab('pestanas')}
              className={`pb-2 px-3 text-xs uppercase tracking-widest font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'pestanas'
                  ? 'border-[#DD006B] text-[#DD006B]'
                  : 'border-transparent text-[#8A8682] hover:text-[#111114]'
              }`}
            >
              Mirada & Cejas
            </button>
            <button
              onClick={() => setActiveTab('facial')}
              className={`pb-2 px-3 text-xs uppercase tracking-widest font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'facial'
                  ? 'border-[#DD006B] text-[#DD006B]'
                  : 'border-transparent text-[#8A8682] hover:text-[#111114]'
              }`}
            >
              Cosmetología Facial
            </button>
          </div>
        </div>

        {/* Large Editorial Comparison Frame */}
        <div className="bg-[#FFFDFC] border border-[#E8E2DA] p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E2DA] pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#DD006B] font-sans font-bold">
                {current.category}
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#111114] mt-0.5">
                {current.title}
              </h3>
            </div>
            <p className="text-xs text-[#6E6763] max-w-md font-sans leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* Interactive Drag Frame */}
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-[360px] sm:h-[480px] lg:h-[560px] w-full overflow-hidden cursor-ew-resize select-none bg-black border border-[#E8E2DA]"
          >
            {/* After Image */}
            <img
              src={current.afterImg}
              alt="Resultado técnico final"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            />
            <div className="absolute top-4 right-4 bg-[#09090B]/85 backdrop-blur-md border border-white/10 text-white text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5 pointer-events-none">
              {current.afterLabel}
            </div>

            {/* Before Image with ClipPath */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
              <img
                src={current.beforeImg}
                alt="Estado inicial"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 left-4 bg-[#09090B]/85 backdrop-blur-md border border-white/10 text-[#F6CADB] text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5">
                {current.beforeLabel}
              </div>
            </div>

            {/* Subtle Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-[#DD006B] shadow-[0_0_12px_rgba(221,0,107,0.8)] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FFFDFC] text-[#111114] flex items-center justify-center shadow-lg border border-[#DD006B]">
                <MoveHorizontal className="w-3.5 h-3.5 text-[#DD006B]" />
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <span className="text-[11px] uppercase tracking-widest text-[#6E6763] font-sans flex items-center justify-center gap-2">
              <MoveHorizontal className="w-3 h-3 text-[#DD006B]" /> Arrastra para contrastar el acabado de salón
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

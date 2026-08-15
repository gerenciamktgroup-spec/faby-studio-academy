'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, MoveHorizontal, Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Antes (Estado Inicial)',
  afterLabel = 'Después (Resultado Profesional)',
  aspectRatio = 'aspect-[4/3]',
  title,
  subtitle,
  className = '',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const position = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(position);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className={`space-y-2 ${className}`}>
      {(title || subtitle) && (
        <div className="flex items-center justify-between">
          <div>
            {title && <h4 className="font-bold text-slate-900 text-xs sm:text-sm font-display">{title}</h4>}
            {subtitle && <p className="text-[11px] text-slate-500">{subtitle}</p>}
          </div>
          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full flex items-center gap-1">
            <MoveHorizontal className="w-3 h-3" /> Arrastra para comparar
          </span>
        </div>
      )}

      {/* Slider Container */}
      <div
        ref={containerRef}
        className={`relative ${aspectRatio} w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-slate-900 select-none cursor-ew-resize group`}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* After Image (Background / Base) */}
        <img
          src={afterImage}
          alt="Resultado Después"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* After Badge */}
        <div className="absolute top-3 right-3 z-10 bg-emerald-700/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md pointer-events-none flex items-center gap-1 border border-emerald-400/30">
          <Sparkles className="w-3 h-3" />
          <span>{afterLabel}</span>
        </div>

        {/* Before Image (Clipped Overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img
            src={beforeImage}
            alt="Estado Antes"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Before Badge */}
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md pointer-events-none border border-white/20">
            {beforeLabel}
          </div>
        </div>

        {/* Slider Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-rose-700 shadow-lg border-2 border-rose-600 flex items-center justify-center pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
            <MoveHorizontal className="w-4 h-4 text-rose-600" />
          </div>
        </div>

        {/* Fullscreen Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsFullScreen(true);
          }}
          className="absolute bottom-3 right-3 z-10 bg-slate-900/70 hover:bg-slate-900 text-white p-1.5 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs"
          title="Ver en pantalla completa"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* FullScreen Lightbox Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in">
          <div className="bg-white rounded-3xl overflow-hidden max-w-5xl w-full border border-slate-200 shadow-2xl flex flex-col max-h-[95vh]">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-900 text-sm font-display">
                  {title || 'Comparativa Técnica Antes / Después'}
                </h3>
                <p className="text-[11px] text-slate-500">{subtitle || 'Desliza el control para examinar el detalle milimétrico'}</p>
              </div>
              <button
                onClick={() => setIsFullScreen(false)}
                className="p-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 flex-1 flex items-center justify-center bg-slate-950">
              <div className="w-full max-w-4xl">
                <BeforeAfterSlider
                  beforeImage={beforeImage}
                  afterImage={afterImage}
                  beforeLabel={beforeLabel}
                  afterLabel={afterLabel}
                  aspectRatio="aspect-[16/10]"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

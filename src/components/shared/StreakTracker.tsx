'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Flame, X } from 'lucide-react';

interface StreakData {
  current: number;
  longest: number;
  activeToday: boolean;
  activeDays: string[];
}

const EMPTY_STREAK: StreakData = { current: 0, longest: 0, activeToday: false, activeDays: [] };

export function StreakTracker() {
  const [isOpen, setIsOpen] = useState(false);
  const [streak, setStreak] = useState<StreakData>(EMPTY_STREAK);

  useEffect(() => {
    let active = true;
    void fetch('/api/streak', { cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) throw new Error('No se pudo calcular la racha.');
        return (await response.json()) as StreakData;
      })
      .then((data) => {
        if (active) setStreak(data);
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

  const activeDays = new Set(streak.activeDays);
  const recentDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - (6 - index));
    return {
      iso: date.toISOString().slice(0, 10),
      label: new Intl.DateTimeFormat('es', { weekday: 'short', timeZone: 'UTC' })
        .format(date)
        .slice(0, 2),
    };
  });

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300/60 text-amber-900 px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
        title="Ver actividad de estudio"
      >
        <Flame className={`w-4 h-4 text-amber-600 ${streak.activeToday ? 'fill-amber-500' : ''}`} />
        <span className="font-extrabold font-display text-amber-800">{streak.current}</span>
        <span className="hidden sm:inline text-[11px] text-amber-700">días</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-2xl bg-amber-100 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-amber-600" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Racha de estudio: {streak.current} días</h3>
                  <p className="text-[11px] text-slate-500">Calculada con tiempo activo verificado</p>
                </div>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-700" aria-label="Cerrar">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {recentDays.map((day) => {
                const completed = activeDays.has(day.iso);
                return (
                  <div key={day.iso} className={`p-2 rounded-xl border text-center text-xs space-y-1 ${completed ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                    <span className="text-[10px] capitalize">{day.label}</span>
                    {completed ? <CheckCircle2 className="w-4 h-4 text-amber-600 mx-auto" /> : <span className="block w-4 h-4 rounded-full border border-slate-300 mx-auto" />}
                  </div>
                );
              })}
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-600 flex items-center justify-between">
              <span>{streak.activeToday ? 'Hoy ya registraste estudio activo.' : 'Estudia una lección para activar el día de hoy.'}</span>
              <strong className="text-slate-900 shrink-0 ml-4">Récord: {streak.longest}</strong>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

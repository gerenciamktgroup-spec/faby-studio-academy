'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Flame,
  Calendar,
  ShieldCheck,
  Trophy,
  Sparkles,
  Zap,
  CheckCircle2,
  X,
  ArrowRight,
} from 'lucide-react';

interface StreakTrackerProps {
  currentStreak?: number;
  longestStreak?: number;
  streakActiveToday?: boolean;
}

export function StreakTracker({
  currentStreak = 5,
  longestStreak = 12,
  streakActiveToday = true,
}: StreakTrackerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const daysOfWeek = [
    { name: 'Lun', active: true, date: '10 Ago' },
    { name: 'Mar', active: true, date: '11 Ago' },
    { name: 'Mié', active: true, date: '12 Ago' },
    { name: 'Jue', active: true, date: '13 Ago' },
    { name: 'Vie', active: true, date: '14 Ago' },
    { name: 'Sáb', active: true, date: '15 Ago', isToday: true },
    { name: 'Dom', active: false, date: '16 Ago' },
  ];

  return (
    <>
      {/* Topbar Streak Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 border border-amber-300/60 text-amber-900 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 shadow-2xs group"
        title="Ver Racha de Estudio Diaria"
      >
        <div className="relative">
          <Flame className="w-4 h-4 text-amber-600 fill-amber-500 animate-bounce" />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
        </div>
        <span className="font-extrabold font-display text-amber-800">{currentStreak}</span>
        <span className="hidden sm:inline text-[11px] text-amber-700">Días de Racha</span>
      </button>

      {/* Streak Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 max-w-md w-full space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <Flame className="w-5 h-5 fill-amber-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-slate-900">
                    ¡Racha de {currentStreak} Días Consecutivos!
                  </h3>
                  <p className="text-[11px] text-slate-500">Hábitos de excelencia profesional</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Streak Main Flame Graphic */}
            <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-rose-500/10 p-5 rounded-2xl border border-amber-200/80 text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-orange-500/30">
                <Flame className="w-10 h-10 fill-white" />
              </div>
              <p className="text-2xl font-black font-display text-slate-900">
                {currentStreak} Días Activa
              </p>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Has ingresado y estudiado contenido técnico hoy. ¡Mantén la llama encendida para ganar el Badge <strong className="text-amber-700">Constancia de Oro</strong>!
              </p>
            </div>

            {/* Weekly Days Grid */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Esta Semana</span>
                <span className="text-slate-400 text-[11px]">Récord Histórico: {longestStreak} días</span>
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {daysOfWeek.map((d, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-xl border text-center text-xs space-y-1 transition-all ${
                      d.active
                        ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                        : d.isToday
                        ? 'bg-rose-50 border-rose-300 text-rose-800 ring-2 ring-rose-400 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <span className="text-[10px] block">{d.name}</span>
                    <div className="flex justify-center">
                      {d.active ? (
                        <CheckCircle2 className="w-4 h-4 text-amber-600 fill-amber-100" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Streak Freeze & Perks */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900">Protector de Racha Activo</p>
                  <p className="text-[10px] text-slate-500">1 comodín disponible si descansas un día</p>
                </div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                Protegida
              </span>
            </div>

            {/* Quick Action to Flashcards */}
            <div className="pt-1">
              <Link
                href="/campus/flashcards"
                onClick={() => setIsOpen(false)}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white p-3 rounded-xl font-bold text-xs shadow-md shadow-orange-600/20 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Hacer Repaso Diario de Flashcards (3 min)</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

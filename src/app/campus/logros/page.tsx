'use client';

import React from 'react';
import Link from 'next/link';
import {
  Trophy,
  Award,
  Sparkles,
  Flame,
  CheckCircle2,
  Lock,
  Star,
  Target,
  Zap,
  BookOpen
} from 'lucide-react';

export default function StudentAchievementsPage() {
  const badges = [
    {
      id: 1,
      title: 'Primer Aislamiento Impecable',
      description: 'Superaste la Práctica 01 con nota superior a 80 puntos.',
      icon: Award,
      color: 'bg-rose-100 text-rose-700 border-rose-300',
      unlocked: true,
      date: '08/08/2026',
    },
    {
      id: 2,
      title: 'Maestría Teórica (100% Quiz)',
      description: 'Aprobaste la evaluación de bioseguridad con puntuación perfecta.',
      icon: Star,
      color: 'bg-amber-100 text-amber-800 border-amber-300',
      unlocked: true,
      date: '08/08/2026',
    },
    {
      id: 3,
      title: 'Racha de Estudio Activo (5 Días)',
      description: 'Completaste sesiones formativas activas durante 5 días seguidos.',
      icon: Flame,
      color: 'bg-orange-100 text-orange-800 border-orange-300',
      unlocked: true,
      date: '12/08/2026',
    },
    {
      id: 4,
      title: 'Experta en Mapping & Visagismo',
      description: 'Completa todas las lecciones del Módulo 2 y sube tu ficha de diseño.',
      icon: Target,
      color: 'bg-slate-100 text-slate-400 border-slate-200',
      unlocked: false,
      progress: '4/6 lecciones',
    },
    {
      id: 5,
      title: 'Maestra en Volumen Ruso',
      description: 'Crea abanicos simétricos 2D a 6D evaluados por la profesora.',
      icon: Sparkles,
      color: 'bg-slate-100 text-slate-400 border-slate-200',
      unlocked: false,
      progress: 'Bloqueado',
    },
    {
      id: 6,
      title: 'Graduada con Honores FABY STUDIO',
      description: 'Supera el 90% de progreso y obtén tu Diploma Oficial con QR.',
      icon: Trophy,
      color: 'bg-slate-100 text-slate-400 border-slate-200',
      unlocked: false,
      progress: '68% / 100%',
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Gamificación & Progreso</span>
        <h1 className="text-2xl font-bold font-display text-slate-900 mt-1">Mis Logros & Reconocimientos</h1>
        <p className="text-xs text-slate-500">Completa hitos técnicos y mantén tu racha de aprendizaje para desbloquear insignias profesionales.</p>
      </div>

      {/* Gamification Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-semibold uppercase">Racha de Estudio</span>
            <p className="text-2xl font-extrabold text-slate-900 font-display">5 Días</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-semibold uppercase">Insignias Desbloqueadas</span>
            <p className="text-2xl font-extrabold text-rose-600 font-display">3 de 6</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-semibold uppercase">Puntos de Formación</span>
            <p className="text-2xl font-extrabold text-emerald-700 font-display">840 pts</p>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Colección de Insignias de Especialización
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                  b.unlocked
                    ? 'bg-slate-50/50 border-slate-200 hover:border-rose-300'
                    : 'bg-slate-50/30 border-slate-100 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold border ${b.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {b.unlocked ? (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Desbloqueada</span>
                    </span>
                  ) : (
                    <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                      <Lock className="w-3 h-3" />
                      <span>{b.progress}</span>
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900">{b.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{b.description}</p>
                </div>

                {b.unlocked && (
                  <p className="text-[10px] text-slate-400 pt-2 border-t border-slate-100">
                    Conseguida el {b.date}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

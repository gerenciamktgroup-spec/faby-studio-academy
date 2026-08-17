'use client';

import React from 'react';
import { MapPin, Award, Users, ShieldCheck, Star } from 'lucide-react';

export function AuthorityTicker() {
  const items = [
    { icon: MapPin, text: '2 Sedes Físicas en Madrid (Aluche & Vallecas)', color: 'text-rose-500' },
    { icon: Award, text: '+15 Años de Excelencia Profesional', color: 'text-amber-500' },
    { icon: Users, text: '+80.000 Clientas y Alumnas Atendidas', color: 'text-emerald-500' },
    { icon: Star, text: '4.9/5★ Calificación de Alumnas Graduadas', color: 'text-amber-400' },
    { icon: ShieldCheck, text: 'Certificados Digitales Verificables SHA-256', color: 'text-purple-400' },
  ];

  return (
    <div className="bg-slate-900 border-y border-slate-800 text-white py-4 overflow-hidden relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-6 sm:gap-8 text-xs font-semibold text-slate-300">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center space-x-2.5 hover:text-white transition-colors">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                  <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                </div>
                <span className="tracking-wide">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

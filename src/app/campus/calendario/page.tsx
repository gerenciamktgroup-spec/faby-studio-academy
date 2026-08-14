'use client';

import React from 'react';
import { Calendar, Clock, Video, CheckCircle2, Award, FileCheck } from 'lucide-react';

export default function CalendarioPage() {
  const events = [
    {
      id: 1,
      date: 'Martes 18 de Agosto',
      time: '18:30 h',
      title: 'Tutoría 1 a 1: Corrección de Mapping Facial',
      tutor: 'Laura Gómez',
      type: 'tutoria',
      status: 'Confirmada',
    },
    {
      id: 2,
      date: 'Viernes 21 de Agosto',
      time: '23:59 h',
      title: 'Fecha Límite: Entrega de Práctica 02 (Abanicos 2D-3D)',
      tutor: 'Dirección Académica',
      type: 'entrega',
      status: 'Pendiente',
    },
    {
      id: 3,
      date: 'Lunes 24 de Agosto',
      time: '19:00 h',
      title: 'Masterclass en Vivo: Tendencias en Volumen Ruso & Efecto Kim',
      tutor: 'Profesora Faby',
      type: 'masterclass',
      status: 'Programada',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Planificación Académica</span>
        <h1 className="text-2xl font-bold font-display text-slate-900 mt-1">Calendario de Actividades</h1>
        <p className="text-xs text-slate-500">Sesiones en vivo, entregas de prácticas y fechas clave de tu programa formativo.</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
          Próximos Eventos Programados
        </h2>

        <div className="space-y-3">
          {events.map((e) => (
            <div
              key={e.id}
              className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  {e.type === 'tutoria' && <Video className="w-5 h-5" />}
                  {e.type === 'entrega' && <FileCheck className="w-5 h-5" />}
                  {e.type === 'masterclass' && <Award className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{e.title}</p>
                  <p className="text-slate-500 text-[11px]">{e.date} • {e.time} • Docente: {e.tutor}</p>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                e.status === 'Confirmada'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}>
                {e.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

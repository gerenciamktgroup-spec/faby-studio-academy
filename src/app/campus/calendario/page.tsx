'use client';

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  CheckCircle2,
  Award,
  FileCheck,
  Download,
  ExternalLink,
  Sparkles,
  ChevronRight,
  Bell,
} from 'lucide-react';
import {
  getGoogleCalendarUrl,
  getOutlookCalendarUrl,
  downloadICSFile,
  CalendarEventData,
} from '@/lib/calendar-sync';

interface AcademicEvent {
  id: number;
  dateStr: string;
  timeStr: string;
  title: string;
  tutor: string;
  type: 'tutoria' | 'entrega' | 'masterclass';
  status: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

export default function CalendarioPage() {
  const [syncToast, setSyncToast] = useState<string | null>(null);

  const events: AcademicEvent[] = [
    {
      id: 1,
      dateStr: 'Martes 18 de Agosto, 2026',
      timeStr: '18:30 h – 19:15 h',
      title: 'Tutoría 1 a 1: Corrección de Mapping Facial & Visagismo',
      tutor: 'Laura Gómez (Tutora Académica)',
      type: 'tutoria',
      status: 'Confirmada',
      description:
        'Sesión individualizada en directo para corregir el visagismo en modelo real y resolución de dudas de curvaturas.',
      startDate: new Date('2026-08-18T18:30:00'),
      endDate: new Date('2026-08-18T19:15:00'),
    },
    {
      id: 2,
      dateStr: 'Viernes 21 de Agosto, 2026',
      timeStr: '23:59 h',
      title: 'Fecha Límite: Entrega de Práctica 02 (Abanicos 2D-3D)',
      tutor: 'Dirección Académica',
      type: 'entrega',
      status: 'Pendiente',
      description:
        'Último plazo para subir fotografías de abanicos manuales y aislamiento a la plataforma para evaluación por rúbrica.',
      startDate: new Date('2026-08-21T23:00:00'),
      endDate: new Date('2026-08-21T23:59:00'),
    },
    {
      id: 3,
      dateStr: 'Lunes 24 de Agosto, 2026',
      timeStr: '19:00 h – 20:30 h',
      title: 'Masterclass en Vivo: Tendencias en Volumen Ruso & Efecto Kim',
      tutor: 'Profesora Faby',
      type: 'masterclass',
      status: 'Programada',
      description:
        'Masterclass magistral con demostración en vivo de creación de espigas y retención de hasta 8 semanas.',
      startDate: new Date('2026-08-24T19:00:00'),
      endDate: new Date('2026-08-24T20:30:00'),
    },
  ];

  const handleDownloadICS = (e: AcademicEvent) => {
    const eventData: CalendarEventData = {
      title: e.title,
      description: `${e.description}\n\nDocente: ${e.tutor}\nCampus Virtual Fabi Studio Academy`,
      startDate: e.startDate,
      endDate: e.endDate,
      location: 'Campus Virtual Fabi Studio (Google Meet / Aula Virtual)',
    };

    downloadICSFile(eventData, `fabi-studio-${e.type}-${e.id}`);
    setSyncToast(`Archivo .ICS descargado para "${e.title}"`);
    setTimeout(() => setSyncToast(null), 3500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Toast Notification */}
      {syncToast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center space-x-2 text-xs animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{syncToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full text-xs font-bold text-rose-700">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Planificación Académica & Sincronización</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mt-2">
            Calendario de Actividades & Masterclasses
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl">
            Sincroniza tus clases en vivo, tutorías individuales y fechas límite de entrega directamente con Google Calendar, Apple iCal o tu calendario de móvil con 1 solo clic.
          </p>
        </div>
      </div>

      {/* Events List Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Próximos Eventos Programados ({events.length})
          </h2>
          <span className="text-xs text-slate-400">Hora oficial de Madrid (UTC+2)</span>
        </div>

        <div className="space-y-4">
          {events.map((e) => {
            const googleUrl = getGoogleCalendarUrl({
              title: e.title,
              description: `${e.description}\n\nDocente: ${e.tutor}\nCampus Fabi Studio`,
              startDate: e.startDate,
              endDate: e.endDate,
              location: 'Campus Virtual Fabi Studio Academy',
            });

            return (
              <div
                key={e.id}
                className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs hover:border-rose-300 transition-all shadow-2xs"
              >
                {/* Event Info */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold shrink-0 shadow-2xs border border-rose-200">
                    {e.type === 'tutoria' && <Video className="w-6 h-6" />}
                    {e.type === 'entrega' && <FileCheck className="w-6 h-6" />}
                    {e.type === 'masterclass' && <Award className="w-6 h-6" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-bold text-slate-900 text-sm font-display">{e.title}</p>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          e.status === 'Confirmada'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        {e.status}
                      </span>
                    </div>

                    <p className="text-slate-600 text-[11px] leading-relaxed max-w-xl">
                      {e.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-slate-500 text-[11px] pt-1">
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-rose-600" />
                        {e.dateStr} • {e.timeStr}
                      </span>
                      <span>Docente: {e.tutor}</span>
                    </div>
                  </div>
                </div>

                {/* 1-Click Sync Action Buttons */}
                <div className="flex sm:flex-col md:flex-row items-center gap-2 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
                  <a
                    href={googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-none bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 px-3.5 py-2 rounded-xl text-xs font-bold shadow-2xs flex items-center justify-center space-x-1.5 transition-colors"
                    title="Añadir a Google Calendar"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-rose-600" />
                    <span>Google Calendar</span>
                  </a>

                  <button
                    onClick={() => handleDownloadICS(e)}
                    className="flex-1 md:flex-none bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 px-3.5 py-2 rounded-xl text-xs font-bold shadow-2xs flex items-center justify-center space-x-1.5 transition-colors"
                    title="Descargar para Apple Calendar / Outlook (.ics)"
                  >
                    <Download className="w-3.5 h-3.5 text-rose-600" />
                    <span>Descargar .ICS</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

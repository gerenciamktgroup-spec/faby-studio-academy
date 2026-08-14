'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  User,
  MessageSquare,
  ArrowRight,
  Plus,
  Sparkles,
  X,
  AlertCircle
} from 'lucide-react';

interface TutoringSession {
  id: string;
  title: string;
  tutor: string;
  date: string;
  time: string;
  status: 'confirmed' | 'completed' | 'canceled';
  link?: string;
}

export default function TutoriasPage() {
  const [availableSlots, setAvailableSlots] = useState(2);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Revisión de Mapping Módulo 4');
  const [selectedTutor, setSelectedTutor] = useState('Laura Gómez');
  const [selectedDate, setSelectedDate] = useState('2026-08-18');
  const [selectedTime, setSelectedTime] = useState('16:30');
  const [studentNotes, setStudentNotes] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const [sessions, setSessions] = useState<TutoringSession[]>([
    {
      id: 'tut-01',
      title: 'Revisión Técnica Práctica 01 & Mapping',
      tutor: 'Laura Gómez',
      date: 'Martes 18/08',
      time: '18:30 h (45 min)',
      status: 'confirmed',
      link: '/campus/mensajes',
    },
  ]);

  const [history, setHistory] = useState<TutoringSession[]>([
    {
      id: 'tut-h1',
      title: 'Sesión 1: Presentación y Mapping Inicial',
      tutor: 'Laura Gómez',
      date: 'Lunes 04/08',
      time: '45 min',
      status: 'completed',
    },
    {
      id: 'tut-h2',
      title: 'Sesión 2: Corrección de Práctica 01',
      tutor: 'Laura Gómez',
      date: 'Jueves 07/08',
      time: '30 min',
      status: 'completed',
    },
  ]);

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (availableSlots <= 0) return;

    const newSession: TutoringSession = {
      id: `tut-${Date.now()}`,
      title: selectedTopic,
      tutor: selectedTutor,
      date: `${selectedDate}`,
      time: `${selectedTime} h (45 min)`,
      status: 'confirmed',
      link: '/campus/mensajes',
    };

    setSessions([newSession, ...sessions]);
    setAvailableSlots((prev) => Math.max(0, prev - 1));
    setIsModalOpen(false);
    setStudentNotes('');

    setNotification(`¡Tutoría con ${selectedTutor} reservada con éxito para el ${selectedDate} a las ${selectedTime} h!`);
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Toast Notification */}
      {notification && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-2xl flex items-center justify-between text-xs font-bold shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
            Acompañamiento 1 a 1
          </span>
          <h1 className="text-2xl font-bold font-display text-slate-900 mt-2">Tutorías Personalizadas</h1>
          <p className="text-xs text-slate-500">Sesiones individuales de corrección técnica y resolución de dudas con tu tutora asignada.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          disabled={availableSlots === 0}
          className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all ${
            availableSlots > 0
              ? 'bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white shadow-rose-600/20 hover:scale-[1.02]'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Reservar Tutoría ({availableSlots} restantes)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 space-y-4">
          {/* Current tutor profile card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-sm border border-rose-200">
                LG
              </div>
              <div>
                <p className="text-base font-bold text-slate-900">Laura Gómez</p>
                <p className="text-xs text-rose-600 font-semibold">Tutora Académica Especialista</p>
                <p className="text-[10px] text-slate-400">Especialista en Extensiones de Pestañas y Volumen Ruso</p>
              </div>
            </div>

            {/* Scheduled Sessions */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Próximas Sesiones Programadas ({sessions.length})
              </p>
              {sessions.map((ses) => (
                <div key={ses.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Tutora: <strong className="text-slate-900">{ses.tutor}</strong></span>
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                      Confirmada
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">{ses.title}</p>
                  <p className="text-xs text-slate-600 flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-rose-600" />
                    <span>{ses.date} — {ses.time}</span>
                  </p>

                  <Link
                    href={ses.link || '/campus/mensajes'}
                    className="w-full bg-gradient-to-r from-fabi-pink to-fabi-darkpink text-white py-2.5 rounded-xl font-bold text-xs shadow-md shadow-rose-600/20 flex items-center justify-center space-x-2 hover:from-fabi-darkpink hover:to-fabi-pink transition-all"
                  >
                    <Video className="w-4 h-4" />
                    <span>Entrar a Sala Virtual Demo</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Past tutoring sessions */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm font-display border-b border-slate-100 pb-3">
              Historial de Tutorías Realizadas ({history.length})
            </h3>
            <div className="space-y-3">
              {history.map((h) => (
                <div key={h.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{h.title}</p>
                    <p className="text-slate-500">{h.date} — {h.time} — {h.tutor}</p>
                  </div>
                  <span className="text-emerald-700 font-bold flex items-center bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Completada
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm font-display">Bolsa de Tutorías</h3>
              <span className="text-rose-700 font-extrabold text-sm bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                {availableSlots} de 3
              </span>
            </div>
            <p className="text-slate-600">
              Tienes <strong className="text-slate-900">{availableSlots} tutorías</strong> 1 a 1 disponibles en tu cuota del programa.
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 flex items-center justify-between">
                <span>Revisión de Mapping Módulo 4</span>
                <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Disponible</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 flex items-center justify-between">
                <span>Preparación Proyecto Final</span>
                <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Disponible</span>
              </div>
            </div>

            {availableSlots > 0 && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 py-2.5 rounded-xl font-bold transition-colors text-center block"
              >
                Agendar Próxima Sesión →
              </button>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
            <div className="flex items-center space-x-2 text-rose-600 font-bold">
              <MessageSquare className="w-4 h-4" />
              <span>Chat Directo con Laura</span>
            </div>
            <p className="text-slate-600">¿Necesitas resolver algo antes de la tutoría? Escríbele directamente a través de mensajería interna.</p>
            <Link
              href="/campus/mensajes"
              className="block w-full text-center bg-slate-50 border border-slate-200 hover:border-rose-300 text-slate-800 py-2 rounded-xl font-bold transition-colors"
            >
              Abrir Chat Privado →
            </Link>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95 text-xs text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Reservar Tutoría 1 a 1</h3>
                  <p className="text-[10px] text-slate-400">Selecciona temática, docente y horario disponible</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookSession} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Temática de la Sesión</label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-rose-500"
                >
                  <option value="Revisión de Mapping Módulo 4">Revisión de Mapping Módulo 4</option>
                  <option value="Perfeccionamiento de Abanicado 3D-6D">Perfeccionamiento de Abanicado 3D-6D</option>
                  <option value="Preparación Proyecto Final en Modelo">Preparación Proyecto Final en Modelo</option>
                  <option value="Resolución de Dudas sobre Bioseguridad y Adhesivos">Resolución de Dudas sobre Bioseguridad y Adhesivos</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Docente Asignada</label>
                  <select
                    value={selectedTutor}
                    onChange={(e) => setSelectedTutor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-rose-500"
                  >
                    <option value="Laura Gómez">Laura Gómez (Especialista)</option>
                    <option value="Profesora Faby">Profesora Faby (Directora)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hora de la Cita</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-rose-500"
                  >
                    <option value="11:30">11:30 h (Mañana)</option>
                    <option value="16:30">16:30 h (Tarde)</option>
                    <option value="18:00">18:00 h (Tarde)</option>
                    <option value="19:30">19:30 h (Tarde)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Fecha</label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  min="2026-08-15"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-rose-500 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notas o Consultas Previas (Opcional)</label>
                <textarea
                  rows={2}
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  placeholder="Ej. Tengo dudas sobre el abanicado en el ojo izquierdo..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-fabi-pink to-fabi-darkpink text-white px-6 py-2.5 rounded-xl font-bold shadow-md shadow-rose-600/20 hover:scale-[1.02] transition-all"
                >
                  Confirmar Reserva (1 Cupo)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

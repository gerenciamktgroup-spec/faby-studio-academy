'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  MessageCircle,
  Mail,
  Search,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
  FileQuestion,
  PhoneCall
} from 'lucide-react';

export default function StudentSupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketSent, setTicketSent] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const faqs = [
    {
      id: 0,
      question: '¿Cómo debo fotografiar mis prácticas para la rúbrica docente?',
      answer: 'Debes tomar 3 fotografías con buena iluminación natural o luz blanca de cabina: 1) Foto del ojo cerrado mostrando el aislamiento en lagrimal, 2) Foto cenital con el mapping de longitudes y 3) Foto frontal con el ojo abierto para evaluar la dirección y curvatura.',
    },
    {
      id: 1,
      question: '¿Cuánto tiempo tengo para completar el curso y solicitar mi certificado?',
      answer: 'Tienes acceso ilimitado de por vida al campus virtual y sus actualizaciones. Puedes avanzar a tu propio ritmo y solicitar la emisión de tu certificado en cuanto superes el 70% de las evaluaciones y el proyecto final.',
    },
    {
      id: 2,
      question: '¿Cómo agendo mis tutorías personalizadas 1 a 1 con Laura Gómez?',
      answer: 'Entra a la sección "Tutorías 1 a 1" desde el menú lateral. Verás los slots horarios disponibles para esta semana. Al reservar, recibirás automáticamente el enlace de videollamada.',
    },
    {
      id: 3,
      question: '¿Qué validez tiene el código QR y la huella SHA-256 de mi diploma?',
      answer: 'Cualquier centro de belleza o empleador puede escanear el código QR para validar que tu diploma fue emitido oficialmente por FABY STUDIO ACADEMY con las 50 horas lectivas activas acreditadas.',
    },
    {
      id: 4,
      question: '¿Qué hago si tengo dudas sobre los materiales o adhesivos recomendados?',
      answer: 'Puedes escribir directamente a tu tutora en la pestaña "Mensajes con Tutora" o abrir un debate en la "Comunidad Beauty" para recibir consejos de tus compañeras.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSent(true);
    setTimeout(() => {
      setTicketSent(false);
      setSubject('');
      setMessage('');
    }, 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Atención al Alumno</span>
        <h1 className="text-2xl font-bold font-display text-slate-900 mt-1">Centro de Ayuda & Soporte Académico</h1>
        <p className="text-xs text-slate-500">Resuelve dudas frecuentes sobre la plataforma, entregas de prácticas o contacta con el equipo de soporte.</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Busca tu duda (ej. cómo subir fotos, tutorías, diplomas, adhesivos)..."
          className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-xs text-slate-900 shadow-xs focus:outline-none focus:border-rose-500 transition-colors"
        />
      </div>

      {/* FAQs Section */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
          <FileQuestion className="w-5 h-5 text-rose-600" />
          <span>Preguntas Frecuentes de Alumnas</span>
        </h2>

        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full p-4 text-left font-bold text-xs text-slate-800 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-rose-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 bg-slate-50/50 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Direct Contact Channels */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Fast Channels */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center space-x-3 text-emerald-700 font-bold text-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span>WhatsApp de Soporte Urgente</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Atención directa de lunes a viernes (9:00 a 19:00h) para incidencias de acceso o pagos.
            </p>
            <a
              href="https://wa.me/34600000000"
              target="_blank"
              rel="noreferrer"
              className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
            >
              Abrir WhatsApp (+34 600 00 00 00)
            </a>
          </div>
        </div>

        {/* Support Ticket Form */}
        <div className="md:col-span-7">
          <form onSubmit={handleSubmitTicket} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center space-x-2">
              <Mail className="w-4 h-4 text-rose-600" />
              <span>Enviar Consulta al Equipo Técnico</span>
            </h3>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Asunto de la Consulta</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ej. Duda con la descarga de la factura..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Descripción Detallada</label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Explica qué necesitas y te responderemos en menos de 24 horas laborables..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-rose-500"
              />
            </div>

            {ticketSent ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-bold text-emerald-700 flex items-center justify-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>¡Ticket enviado correctamente! Te responderemos por email.</span>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl font-bold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center justify-center space-x-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Consulta</span>
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

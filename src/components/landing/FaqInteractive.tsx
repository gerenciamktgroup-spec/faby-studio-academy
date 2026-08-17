'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export function FaqInteractive() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Cómo funciona la formación si estudio de forma 100% online?',
      a: 'Accedes a nuestro Campus Virtual con clases en alta definición, manuales descargables y un sistema de entrega de prácticas. Subes fotos y vídeos en alta resolución de tus trabajos en modelos y la Profesora Faby o tu tutora asignada colocan notas visuales de corrección personalizadas.',
    },
    {
      q: '¿Qué validez tiene el certificado que obtengo?',
      a: 'Nuestros diplomas se emiten con código QR único y firma criptográfica HMAC-SHA-256. Cualquier cliente, centro de estética o empleador puede verificar en tiempo real tu acreditación oficial en nuestra web pública.',
    },
    {
      q: '¿Puedo visitar las sedes de Faby Studio en Madrid?',
      a: '¡Por supuesto! Contamos con dos sedes en Madrid (Centro Comercial Plaza Aluche y Puente de Vallecas) donde también atendemos a clientas y recibimos a nuestras alumnas para asesorías y compras de productos.',
    },
    {
      q: '¿Se requiere experiencia previa para comenzar?',
      a: 'No. Todos nuestros másteres están estructurados desde el nivel básico (anatomía, bioseguridad, química de productos) hasta técnicas avanzadas de salón, manicura rusa, volumen ruso e Hidrafacial.',
    },
    {
      q: '¿Hay facilidades de pago o cuotas sin intereses?',
      a: 'Sí. Puedes abonar la matrícula en un único pago o fraccionarlo en hasta 3 cuotas mensuales sin intereses mediante pasarela segura.',
    },
    {
      q: '¿Por cuánto tiempo tengo acceso a los contenidos del campus?',
      a: 'El acceso a las lecciones en vídeo, manuales y actualizaciones técnicas es ilimitado y de por vida una vez matriculada.',
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 border border-rose-200 px-3.5 py-1 rounded-full">
            Resolvemos tus Dudas
          </span>
          <h2 className="text-3xl font-bold font-display text-slate-900">
            Preguntas Frecuentes de Futuras Alumnas
          </h2>
          <p className="text-sm text-slate-600">
            Todo lo que necesitas saber antes de iniciar tu máster profesional en FABY STUDIO ACADEMY.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-rose-600 transition-colors"
                >
                  <span className="flex items-center">
                    <HelpCircle className="w-4 h-4 mr-3 text-rose-500 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-rose-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                    <p className="pt-3 pl-7">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

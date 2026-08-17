'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FaqInteractive() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Necesito experiencia previa para inscribirme en los másteres?',
      a: 'No. Todos nuestros programas comienzan desde la anatomía básica, bioseguridad higiénico-sanitaria y control de químicos hasta las técnicas más avanzadas de salón (manicura rusa, volumen ruso e Hidrafacial).',
    },
    {
      q: '¿Puedo abonar la formación en cuotas sin intereses?',
      a: 'Sí. Puedes realizar un pago único o fraccionar tu matrícula en 3 cuotas mensuales sin intereses a través de nuestra pasarela de pago segura.',
    },
    {
      q: '¿Dónde se realizan las prácticas y tutorías presenciales?',
      a: 'Disponemos de dos sedes en Madrid: en el Centro Comercial Plaza Aluche (Av. de los Poblados 58) y en Puente de Vallecas. Además, para las alumnas que cursan en formato virtual, las prácticas se realizan sobre modelo real y se evalúan mediante fotos macro y rúbricas directas.',
    },
    {
      q: '¿Cómo funcionan las correcciones 1 a 1 de la docente?',
      a: 'Subes fotografías nítidas y en plano macro de tus trabajos. Leslie Fabiola y el equipo docente analizan el ápice, la simetría, la limpieza de cutícula o el aislamiento y te devuelven una rúbrica con notas específicas para pulir cada detalle.',
    },
    {
      q: '¿El diploma digital tiene validez y se puede comprobar?',
      a: 'Sí. Cada certificado emitido contiene un código QR único y una firma criptográfica que permite a cualquier salón o clienta validar tu titulación en nuestro validador público oficial.',
    },
    {
      q: '¿Puedo estudiar y practicar mientras mantengo mi empleo actual?',
      a: 'Totalmente. El campus virtual está disponible las 24 horas del día. Puedes organizar tus horas de estudio a tu propio ritmo y coordinar tus entregas de prácticas de forma flexible.',
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 lg:py-32 bg-[#F8F5F1] text-[#0A0A0D] border-b border-[#E8E4DF]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#6E6B68]">
            Preguntas Frecuentes
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl font-bold text-[#0A0A0D] tracking-tight leading-[0.95]">
            Dudas resueltas antes de matricularte.
          </h2>
          <p className="text-sm text-[#6E6B68] font-sans">
            Información clara sobre metodología, pagos, sedes en Madrid y acreditación técnica.
          </p>
        </div>

        {/* Minimal Editorial Accordion */}
        <div className="divide-y divide-[#E8E4DF] border-y border-[#E8E4DF]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-6 transition-colors">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left flex items-start justify-between gap-4 group"
                >
                  <span className="font-editorial text-lg sm:text-xl font-bold text-[#0A0A0D] group-hover:text-[#DD006B] transition-colors leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#6E6B68] shrink-0 mt-1.5 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#DD006B]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pt-4 text-xs sm:text-sm text-[#6E6B68] font-sans leading-relaxed pr-8 animate-in fade-in duration-200">
                    <p>{faq.a}</p>
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

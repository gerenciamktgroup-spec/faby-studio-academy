'use client';

import React from 'react';

export function EditorialTrustRail() {
  const trustItems = [
    { label: 'Experiencia Docente', value: '15+ Años en Madrid' },
    { label: 'Presencia Física', value: '2 Sedes (Aluche & Vallecas)' },
    { label: 'Metodología', value: 'Práctica sobre Modelos Reales' },
    { label: 'Acreditación', value: 'Diploma Digital Verificable' },
  ];

  return (
    <section className="bg-[#0A0A0D] text-[#F8F5F1] border-b border-[#1C1C24] py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#1C1C24]">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-center ${
                idx > 0 ? 'pt-4 lg:pt-0 lg:pl-8' : ''
              }`}
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#A8A49F] font-sans font-medium">
                {item.label}
              </span>
              <p className="font-editorial text-xl sm:text-2xl font-bold text-[#F8F5F1] mt-1 tracking-tight">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

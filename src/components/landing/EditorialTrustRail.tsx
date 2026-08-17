'use client';

import React from 'react';

export function EditorialTrustRail() {
  const trustItems = [
    { label: 'Experiencia Profesional', value: '15+ Años en Madrid' },
    { label: 'Presencia Física', value: '2 Sedes (Aluche & Vallecas)' },
    { label: 'Metodología', value: 'Práctica sobre Modelos Reales' },
    { label: 'Acreditación', value: 'Diploma Digital Verificable' },
  ];

  return (
    <section className="bg-[#FFFDFC] text-[#111114] border-b border-[#E8E2DA] py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#E8E2DA]">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-center ${
                idx > 0 ? 'pt-4 lg:pt-0 lg:pl-8' : ''
              }`}
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#6E6763] font-sans font-semibold">
                {item.label}
              </span>
              <p className="font-editorial text-xl sm:text-2xl font-bold text-[#111114] mt-1 tracking-tight">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

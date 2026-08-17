'use client';

import React from 'react';
import Link from 'next/link';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicHeader />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
          <Link href="/" className="hover:text-slate-900 flex items-center">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Volver al Inicio
          </Link>
          <span>/</span>
          <span className="text-rose-600">Política de Privacidad</span>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-xs text-slate-700 leading-relaxed">
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-emerald-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>PROTECCIÓN DE DATOS (RGPD & LOPD-GDD)</span>
            </div>
            <h1 className="text-3xl font-extrabold font-display text-slate-900">
              Política de Privacidad & Protección de Datos
            </h1>
            <p className="text-slate-500">
              Conforme al Reglamento (UE) 2016/679 (RGPD) y Ley Orgánica 3/2018 (LOPD-GDD) • FABY STUDIO ACADEMY
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">1. Responsable del Tratamiento</h2>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Identidad:</strong> Leslie Fabiola Larico Zapana (FABYSTUDIO)</li>
              <li><strong>Dirección:</strong> Av. de los Poblados 58, 28044 Madrid, España</li>
              <li><strong>Teléfono:</strong> +34 614 23 62 00</li>
              <li><strong>Correo Electrónico de Privacidad:</strong> fabileslie@gmail.com</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">2. Finalidad del Tratamiento de Datos</h2>
            <p>Tratamos los datos personales recabados con las siguientes finalidades:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Gestionar la matrícula y habilitar el acceso al Campus Virtual.</li>
              <li>Registrar el cómputo de horas de aprendizaje activo y la entrega de prácticas para evaluación docente.</li>
              <li>Emitir y verificar diplomas acreditativos con firma digital SHA-256.</li>
              <li>Atender consultas académicas o citas presenciales en nuestras sedes de Madrid.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">3. Base Jurídica y Conservación</h2>
            <p>
              La base legal para el tratamiento de sus datos es la ejecución del contrato de prestación de servicios educativos (matrícula) y el consentimiento explícito otorgado por la alumna. Los datos se conservarán durante la vigencia de la relación académica y los plazos legalmente exigidos.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">4. Ejercicio de Derechos (ARCO+)</h2>
            <p>
              Usted tiene derecho a acceder a sus datos personales, solicitar la rectificación de datos inexactos o pedir su supresión cuando ya no sean necesarios. Para ejercer estos derechos, envíe una solicitud junto con copia de su documento de identidad a <a href="mailto:fabileslie@gmail.com" className="text-rose-600 font-semibold underline">fabileslie@gmail.com</a>.
            </p>
          </section>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

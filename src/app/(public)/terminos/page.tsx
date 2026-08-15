'use client';

import React from 'react';
import Link from 'next/link';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { FileText, Award, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicHeader />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
          <Link href="/" className="hover:text-slate-900 flex items-center">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Volver al Inicio
          </Link>
          <span>/</span>
          <span className="text-rose-600">Términos y Condiciones</span>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-xs text-slate-700 leading-relaxed">
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full text-rose-800 font-bold">
              <FileText className="w-4 h-4 text-rose-600" />
              <span>CONDICIONES GENERALES DE CONTRATACIÓN</span>
            </div>
            <h1 className="text-3xl font-extrabold font-display text-slate-900">
              Términos y Condiciones de Uso
            </h1>
            <p className="text-slate-500">
              Vigentes a partir de Agosto de 2026 • FABY STUDIO ACADEMY S.L.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">1. Objeto y Titularidad</h2>
            <p>
              Los presentes Términos y Condiciones regulan la matrícula, acceso a la plataforma LMS y contenidos formativos proporcionados por <strong>FABY STUDIO ACADEMY</strong> a través de sus canales digitales y salones físicos en España.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">2. Acceso y Uso del Campus Virtual</h2>
            <p>
              El acceso al campus es personal e intransferible. Cada alumna dispone de credenciales individuales y un sistema de control de presencia y tiempo de estudio activo exigido para la homologación y expedición del diploma.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">3. Modalidades de Pago y Financiación</h2>
            <p>
              Los pagos pueden realizarse en un pago único con tarjeta o Bizum, financiados en 3 cuotas con Klarna o mediante reserva previa con abono en efectivo en caja en los salones de Madrid o Barcelona.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">4. Expedición de Certificados & Diplomas</h2>
            <p>
              Para obtener el Diploma Oficial con firma SHA-256 es obligatorio haber completado al menos el 80% de las horas lectivas activas y haber superado la evaluación teórica y la rúbrica práctica con un mínimo de 70/100 puntos.
            </p>
          </section>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

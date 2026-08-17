'use client';

import React from 'react';
import Link from 'next/link';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { FileText, ArrowLeft } from 'lucide-react';

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
              <span>CONDICIONES DE LA PREVIEW PRIVADA</span>
            </div>
            <h1 className="text-3xl font-extrabold font-display text-slate-900">
              Términos y Condiciones de Uso
            </h1>
            <p className="text-slate-500">
              Versión 2026.2 • FABY STUDIO ACADEMY (Preview privada)
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">1. Objeto</h2>
            <p>
              Estas condiciones regulan exclusivamente el acceso autorizado a una preview técnica de <strong>FABY STUDIO ACADEMY</strong>. No constituyen condiciones de contratación comercial.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">2. Acceso y Uso del Campus Virtual</h2>
            <p>
              El acceso es personal e intransferible. Solo se permiten cuentas autorizadas y datos sintéticos. La actividad puede registrarse para validar autenticación, seguridad, progreso y trazabilidad técnica.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">3. Matrículas y pagos</h2>
            <p>
              Esta preview no procesa pagos reales ni formaliza matrículas comerciales. Cualquier información mostrada tiene finalidad de validación del producto.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">4. Certificados de prueba</h2>
            <p>
              Los certificados generados son comprobantes técnicos de prueba protegidos con HMAC-SHA256. No representan una titulación oficial, una acreditación administrativa ni el reconocimiento de una entidad pública.
            </p>
          </section>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

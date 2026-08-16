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
              <span>CONDICIONES GENERALES DE CONTRATACIÓN</span>
            </div>
            <h1 className="text-3xl font-extrabold font-display text-slate-900">
              Términos y Condiciones de Uso
            </h1>
            <p className="text-slate-500">
              Vigentes a partir de Agosto de 2026 • FABY STUDIO ACADEMY (Entorno de Demostración & Staging)
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">1. Objeto y Titularidad</h2>
            <p>
              Los presentes Términos y Condiciones regulan la matrícula, acceso a la plataforma LMS y contenidos formativos proporcionados por <strong>FABY STUDIO ACADEMY</strong> a través de sus canales digitales y centros autorizados.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">2. Acceso y Uso del Campus Virtual</h2>
            <p>
              El acceso al campus es personal e intransferible. Cada alumna dispone de credenciales individuales y un sistema de control de presencia y tiempo de estudio activo exigido para la certificación formativa y expedición del diploma de aprovechamiento.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">3. Modalidades de Matrícula y Pagos</h2>
            <p>
              En este entorno de pruebas, las inscripciones son gestionadas de forma manual y asistida por el equipo de administración académica. Los pagos automatizados en línea se habilitarán tras la activación de la pasarela de pagos.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">4. Expedición de Certificados & Diplomas</h2>
            <p>
              Para obtener el Diploma con firma criptográfica SHA-256 es necesario completar los módulos formativos requeridos, superar la evaluación teórica y aprobar la entrega de prácticas técnicas con un mínimo de 70/100 puntos según la rúbrica docente.
            </p>
          </section>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

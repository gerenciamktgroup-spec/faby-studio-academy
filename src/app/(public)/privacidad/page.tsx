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
              <span>AVISO DE PRIVACIDAD DE LA PREVIEW</span>
            </div>
            <h1 className="text-3xl font-extrabold font-display text-slate-900">
              Aviso de Privacidad para Pruebas
            </h1>
            <p className="text-slate-500">
              Versión: 2026.2 • FABY STUDIO ACADEMY (Preview privada)
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">1. Alcance de esta preview</h2>
            <p>
              Este entorno se encuentra en validación técnica, está reservado a personas autorizadas y debe utilizarse exclusivamente con identidades y datos sintéticos. El registro público permanece deshabilitado.
            </p>
            <p>
              Para consultas sobre los datos de prueba escriba a <a href="mailto:privacidad@fabystudio.academy" className="text-rose-600 font-semibold underline">privacidad@fabystudio.academy</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">2. Finalidad de los datos de prueba</h2>
            <p>Las cuentas sintéticas se utilizan únicamente para:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Verificar la autenticación y el control de acceso por roles.</li>
              <li>Comprobar el cómputo técnico del tiempo de actividad.</li>
              <li>Validar prácticas, trazas y certificados técnicos de prueba.</li>
              <li>Detectar fallos de seguridad y funcionamiento antes del lanzamiento.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">3. Limitaciones</h2>
            <p>
              Esta página no declara cumplimiento normativo, acreditación administrativa ni aptitud para procesar datos personales reales. La información legal pública se completará antes de habilitar el registro comercial.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">4. Consultas y eliminación de pruebas</h2>
            <p>
              Las personas autorizadas pueden solicitar la revisión o eliminación de sus datos de validación escribiendo a <a href="mailto:privacidad@fabystudio.academy" className="text-rose-600 font-semibold underline">privacidad@fabystudio.academy</a>.
            </p>
          </section>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

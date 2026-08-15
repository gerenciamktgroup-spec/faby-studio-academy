'use client';

import React from 'react';
import Link from 'next/link';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { ShieldCheck, Lock, CheckCircle2, ArrowLeft } from 'lucide-react';

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
              <span>CUMPLIMIENTO RGPD & LOPD-GDD 2026</span>
            </div>
            <h1 className="text-3xl font-extrabold font-display text-slate-900">
              Política de Privacidad & Protección de Datos
            </h1>
            <p className="text-slate-500">
              Última actualización: Agosto de 2026 • FABY STUDIO ACADEMY S.L.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">1. Responsable del Tratamiento</h2>
            <p>
              El responsable del tratamiento de los datos recabados en este sitio web y en el campus virtual es <strong>FABY STUDIO ACADEMY S.L.</strong>, con domicilio social en Calle Serrano 45, Madrid (España), y correo electrónico de contacto para protección de datos: <a href="mailto:privacidad@fabystudio.academy" className="text-rose-600 font-semibold underline">privacidad@fabystudio.academy</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">2. Finalidad del Tratamiento de Datos</h2>
            <p>Tratamos la información que nos facilitan las usuarias y alumnas para:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Gestionar la matrícula, creación de cuentas individuales y acceso al campus virtual.</li>
              <li>Acreditar el cómputo oficial de horas lectivas y tiempo de conexión exigido por normativa formativa.</li>
              <li>Evaluar las prácticas docentes, emitir diplomas oficiales y registrar el código único criptográfico SHA-256.</li>
              <li>Gestionar los cobros online y validaciones en caja en los salones físicos de Faby Studio.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">3. Legitimación</h2>
            <p>
              La base legal para el tratamiento de los datos es la ejecución del contrato de prestación de servicios formativos y el consentimiento expreso otorgado al registrarse y aceptar los presentes términos.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">4. Derechos ARCO / RGPD de las Alumnas</h2>
            <p>
              Cualquier usuaria puede ejercer sus derechos de acceso, rectificación, supresión, limitación del tratamiento y portabilidad de sus datos enviando un email a <a href="mailto:privacidad@fabystudio.academy" className="text-rose-600 font-semibold underline">privacidad@fabystudio.academy</a>.
            </p>
          </section>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

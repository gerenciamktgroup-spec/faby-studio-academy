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
              <span>AVISO LEGAL & CONDICIONES GENERALES</span>
            </div>
            <h1 className="text-3xl font-extrabold font-display text-slate-900">
              Términos y Condiciones de Contratación & Uso
            </h1>
            <p className="text-slate-500">
              Última actualización: 2026 • FABY STUDIO ACADEMY (Madrid, España)
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">1. Datos Identificativos del Titular</h2>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los siguientes datos:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Titular / Responsable:</strong> Leslie Fabiola Larico Zapana (FABYSTUDIO)</li>
              <li><strong>Nombre Comercial:</strong> FABY STUDIO ACADEMY</li>
              <li><strong>Domicilio Principal:</strong> Centro Comercial Plaza Aluche, Av. de los Poblados 58, 28044 Madrid, España</li>
              <li><strong>Sede de Formación:</strong> Puente de Vallecas, Madrid, España</li>
              <li><strong>Teléfono de Atención:</strong> +34 614 23 62 00</li>
              <li><strong>Email de Contacto:</strong> fabileslie@gmail.com</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">2. Objeto y Ámbito de Aplicación</h2>
            <p>
              Las presentes Condiciones regulan el acceso, matrícula y uso del Campus Virtual de <strong>FABY STUDIO ACADEMY</strong>, así como la adquisición de cursos y másteres de especialización técnica en uñas, pestañas, cejas y cosmetología facial.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">3. Acceso al Campus Virtual & Licencia de Uso</h2>
            <p>
              Tras formalizar la inscripción, la alumna recibe credenciales personales e intransferibles para acceder a los contenidos formativos. Queda expresamente prohibida la cesión, venta, reproducción pública o compartición de credenciales con terceras personas.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">4. Evaluación de Prácticas & Emisión de Diplomas</h2>
            <p>
              La obtención del diploma acreditativo requiere:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Visualización completa de los módulos con registro de tiempo activo.</li>
              <li>Aprobación de los cuestionarios teóricos de cada módulo con nota mínima del 70%.</li>
              <li>Envío de evidencias fotográficas o en vídeo de prácticas sobre modelo real conforme a la rúbrica docente.</li>
            </ul>
            <p className="pt-1">
              Los certificados se emiten en formato digital protegido con firma criptográfica HMAC-SHA256 y código QR para su verificación pública en <Link href="/verificar-certificado" className="text-rose-600 font-semibold underline">nuestro verificador oficial</Link>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">5. Propiedad Intelectual e Industrial</h2>
            <p>
              Todos los vídeos docentes, manuales en PDF, esquemas de visagismo, diagramas de esculpido y software de cálculo son propiedad exclusiva de Leslie Fabiola Larico Zapana (FABYSTUDIO). Se prohíbe cualquier explotación comercial ajena no autorizada.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">6. Jurisdicción Aplicable</h2>
            <p>
              Para la resolución de cualquier controversia, las partes se someten a los Juzgados y Tribunales de la ciudad de Madrid (España), con renuncia expresa a cualquier otro fuero que pudiera corresponderles.
            </p>
          </section>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

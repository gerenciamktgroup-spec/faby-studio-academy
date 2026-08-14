'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import {
  Sparkles,
  Clock,
  Award,
  CheckCircle2,
  Play,
  Star,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Users,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Video,
  HelpCircle
} from 'lucide-react';

export default function NailsCourseDetailPage() {
  const [openModule, setOpenModule] = useState<number | null>(1);
  const [downloadedDossier, setDownloadedDossier] = useState(false);

  const modules = [
    {
      number: 1,
      title: 'Módulo 1: Anatomía Ungular & Preparación Mecánica',
      hours: '10 horas',
      lessonsCount: '5 lecciones',
      lessons: [
        { title: '1.1 Estructura del lecho ungueal, matriz y eponiquio', duration: '20 min', type: 'video' },
        { title: '1.2 Manicura Rusa / Combinada con torno y fresas de diamante', duration: '35 min', type: 'video' },
        { title: '1.3 Deshidratación y primers sin ácido para adherencia óptima', duration: '25 min', type: 'video' },
        { title: '1.4 Esterilización y normativa higiénico-sanitaria en salón', duration: '20 min', type: 'video' },
        { title: '1.5 Evaluación Teórica de Anatomía y Bioseguridad', duration: '15 min', type: 'quiz' },
      ],
    },
    {
      number: 2,
      title: 'Módulo 2: Esculpido en Gel Constructor & Nivelación',
      hours: '12 horas',
      lessonsCount: '6 lecciones',
      lessons: [
        { title: '2.1 Colocación y corte preciso de moldes según curvatura C', duration: '30 min', type: 'video' },
        { title: '2.2 Creación del ápice y control del producto autonivelante', duration: '40 min', type: 'video' },
        { title: '2.3 Estructura Ballerina y Almond de salón', duration: '35 min', type: 'video' },
        { title: '2.4 Esquema de limado paramétrico (Lados, borde libre y superficie)', duration: '30 min', type: 'video' },
        { title: '2.5 Práctica Guiada de Esculpido en Gel', duration: '60 min', type: 'assignment' },
      ],
    },
    {
      number: 3,
      title: 'Módulo 3: Acrílico Tradicional & Control de Perlas',
      hours: '12 horas',
      lessonsCount: '6 lecciones',
      lessons: [
        { title: '3.1 Ratio monómero-polímero: Perla perfecta sin burbujas', duration: '30 min', type: 'video' },
        { title: '3.2 Aplicación en 3 perlas (Cutícula, zona de estrés y punta)', duration: '45 min', type: 'video' },
        { title: '3.3 Pinzado de la curva C con pinza de compresión metálica', duration: '25 min', type: 'video' },
        { title: '3.4 Estructuras Cuadrada y Coffin resistentes a roturas', duration: '35 min', type: 'video' },
        { title: '3.5 Práctica en Mano de Silicona y Corrección de Grosor', duration: '60 min', type: 'assignment' },
      ],
    },
    {
      number: 4,
      title: 'Módulo 4: Acrigel / Polygel & Dual System Forms',
      hours: '10 horas',
      lessonsCount: '5 lecciones',
      lessons: [
        { title: '4.1 Ventajas del Polygel: Tiempo ilimitado de modelado', duration: '25 min', type: 'video' },
        { title: '4.2 Técnica de moldes duales con líquido Slip Solution', duration: '40 min', type: 'video' },
        { title: '4.3 Sellado perfecto de cutícula con micro-fresa', duration: '25 min', type: 'video' },
        { title: '4.4 Práctica Dual Forms en Modelo Real', duration: '50 min', type: 'assignment' },
      ],
    },
    {
      number: 5,
      title: 'Módulo 5: Nail Art de Salón & Francesa Inversa (Reverse French)',
      hours: '8 horas',
      lessonsCount: '5 lecciones',
      lessons: [
        { title: '5.1 Baby Boomer difuminado con esponja y aerógrafo', duration: '30 min', type: 'video' },
        { title: '5.2 Francesa encapsulada con cover y glitter 3D', duration: '40 min', type: 'video' },
        { title: '5.3 Efecto mármol y foil metalizado de alta durabilidad', duration: '25 min', type: 'video' },
        { title: '5.4 Top coat sin capa de dispersión y brillo espejo 4 semanas', duration: '20 min', type: 'video' },
      ],
    },
    {
      number: 6,
      title: 'Módulo 6: Relleno, Retirada y Rentabilidad del Salón',
      hours: '8 horas',
      lessonsCount: '5 lecciones',
      lessons: [
        { title: '6.1 Diagnóstico de desprendimientos en zona de cutícula', duration: '25 min', type: 'video' },
        { title: '6.2 Relleno rápido en 45 minutos para maximizar agenda', duration: '35 min', type: 'video' },
        { title: '6.3 Retirada segura con torno sin desgastar la placa natural', duration: '25 min', type: 'video' },
        { title: '6.4 Entrega y Evaluación del Proyecto Final en Modelo Real', duration: '60 min', type: 'assignment' },
      ],
    },
  ];

  const handleDownloadDossier = () => {
    setDownloadedDossier(true);
    setTimeout(() => setDownloadedDossier(false), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicHeader />

      {/* Hero Header */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MÁSTER PROFESIONAL — FABY STUDIO ACADEMY</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold font-display leading-tight text-slate-900">
                Máster Profesional en Uñas de Gel & Acrílico Premium
              </h1>

              <p className="text-base text-slate-600 leading-relaxed">
                Domina las técnicas más solicitadas y rentables de la manicura profesional: esculpido con molde, acrigel, nivelación perfecta, manicura combinada rusa y nail art de salón con diploma oficial verificable.
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  <Clock className="w-4 h-4 text-rose-600" />
                  <span>Duración: 8 Semanas (60h Activas)</span>
                </span>
                <span className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Certificado Oficial Verificable SHA-256</span>
                </span>
                <span className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>Tutorías 1 a 1 de Corrección Técnica</span>
                </span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/checkout"
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl shadow-fabi-pink/20 transition-all hover:scale-[1.02]"
                >
                  <span>Matricularme en el Máster (490€)</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleDownloadDossier}
                  className="inline-flex items-center justify-center space-x-2 bg-slate-50 border border-slate-200 text-slate-800 px-6 py-4 rounded-xl font-semibold text-base hover:border-rose-300 transition-colors"
                >
                  <Download className="w-4 h-4 text-rose-600" />
                  <span>{downloadedDossier ? '¡Dossier Descargado!' : 'Descargar Dossier PDF'}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xl space-y-3">
                <img
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop"
                  alt="Máster Uñas de Gel"
                  className="w-full h-72 object-cover rounded-2xl"
                />
                <div className="p-2 space-y-2 text-xs">
                  <div className="flex justify-between items-center font-semibold text-slate-500">
                    <span>Modalidad: Online + Tutorías 1 a 1</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Matrícula Abierta</span>
                  </div>
                  <p className="text-2xl font-extrabold text-slate-900">
                    490€ <span className="text-xs text-slate-500 font-normal">(o 3 cuotas de 163,33€ sin intereses con Klarna)</span>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    ✨ Puedes matricularte online o pagar en efectivo directamente en los salones Faby Studio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section with Interactive Accordion */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
            Plan de Estudios Detallado
          </span>
          <h2 className="text-3xl font-bold font-display text-slate-900">6 Módulos & 32 Lecciones Especializadas</h2>
          <p className="text-sm text-slate-600">
            Haz clic en cada módulo para explorar el temario técnico y las prácticas obligatorias con corrección por rúbrica docente.
          </p>
        </div>

        <div className="space-y-4">
          {modules.map((m) => {
            const isOpen = openModule === m.number;
            return (
              <div
                key={m.number}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenModule(isOpen ? null : m.number)}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <span className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 font-bold text-sm flex items-center justify-center border border-rose-200 shrink-0">
                      0{m.number}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-display">{m.title}</h3>
                      <p className="text-xs text-slate-500 font-medium">{m.lessonsCount} • {m.hours} lectivas activas</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="hidden sm:inline-block text-xs font-bold text-rose-600">
                      {isOpen ? 'Ocultar Temario' : 'Ver Temario'}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-rose-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 border-t border-slate-100 bg-slate-50/50 space-y-2">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pt-3">
                      Lecciones Incluidas en este Módulo:
                    </p>
                    <div className="divide-y divide-slate-100 bg-white rounded-xl border border-slate-200 overflow-hidden">
                      {m.lessons.map((les, idx) => (
                        <div key={idx} className="p-3.5 flex items-center justify-between text-xs hover:bg-slate-50">
                          <div className="flex items-center space-x-2.5">
                            {les.type === 'video' ? (
                              <Video className="w-4 h-4 text-rose-600 shrink-0" />
                            ) : les.type === 'quiz' ? (
                              <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : (
                              <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                            )}
                            <span className="font-semibold text-slate-800">{les.title}</span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono shrink-0 ml-3">{les.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Claustro Docente */}
        <div className="pt-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Excelencia Pedagógica</span>
            <h3 className="text-2xl font-bold font-display text-slate-900">Claustro de Especialistas</h3>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">
              Aprende de formadoras de élite con salones de alto rendimiento en Madrid y Barcelona.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-700 font-extrabold text-xl flex items-center justify-center shrink-0 border border-rose-200">
                PF
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">Profesora Faby</h4>
                <p className="text-xs text-rose-600 font-bold">Directora Académica & Nail Master</p>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Especialista en esculpido de alta competencia, control de monómero y anatomía ungueal.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-700 font-extrabold text-xl flex items-center justify-center shrink-0 border border-purple-200">
                LG
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">Laura Gómez</h4>
                <p className="text-xs text-purple-600 font-bold">Tutora 1 a 1 & Instructora Técnica</p>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Supervisora de entregas fotográficas por rúbrica y resolución de dudas en vivo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-4 shadow-sm">
          <h3 className="text-2xl font-bold font-display text-slate-900">Comienza tu Formación Profesional en Uñas</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Accede hoy al campus virtual, recibe tu tutoría personalizada y obtén tu acreditación oficial.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/checkout"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md shadow-rose-600/20 transition-all hover:scale-[1.02]"
            >
              <span>Matricularme en el Máster (490€)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

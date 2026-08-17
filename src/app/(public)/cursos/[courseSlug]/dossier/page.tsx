'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Sparkles,
  Printer,
  ArrowLeft,
  CheckCircle2,
  Users,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

const DOSSIERS_DATA: Record<string, {
  slug: string;
  title: string;
  category: string;
  duration: string;
  activeHours: number;
  price: string;
  installments: string;
  tagline: string;
  summary: string;
  modules: Array<{
    num: number;
    title: string;
    hours: string;
    lessons: string[];
    practicalOutcome: string;
  }>;
}> = {
  'unas-de-gel-y-acrilico': {
    slug: 'unas-de-gel-y-acrilico',
    title: 'Máster Profesional en Uñas de Gel y Acrílico Premium',
    category: 'Uñas & Manicura Profesional',
    duration: '8 Semanas',
    activeHours: 60,
    price: '490€',
    installments: 'Acceso completo al programa formativo',
    tagline: 'Especialización intensiva en estructura de salón, manicura rusa combinada, control de ápice y nail art comercial.',
    summary: 'El Máster Profesional en Uñas de Gel y Acrílico de FABY STUDIO ACADEMY está diseñado para formar técnicas de élite capaces de realizar esculpidos de máxima resistencia, alineación anatómica perfecta y diseños de alta demanda comercial en salones de belleza.',
    modules: [
      {
        num: 1,
        title: 'Anatomía Ungular & Preparación Mecánica Rusa',
        hours: '10h Activas',
        lessons: [
          'Histología de la lámina ungueal, matriz y lecho',
          'Técnica de manicura rusa combinada con torno y fresas de diamante',
          'Deshidratación profunda y primers sin ácido',
          'Protocolos higiénico-sanitarios y esterilización en autoclave',
        ],
        practicalOutcome: 'Evaluación teórica de bioseguridad y preparación aséptica de placa.',
      },
      {
        num: 2,
        title: 'Esculpido en Gel Constructor & Nivelación de Ápice',
        hours: '12h Activas',
        lessons: [
          'Corte y adaptación milimétrica de moldes de salón',
          'Técnica de autonivelación y refuerzo en la zona de estrés',
          'Estructuras Ballerina y Almond de precisión',
          'Limado paramétrico simétrico sin pérdida de grosor estructural',
        ],
        practicalOutcome: 'Práctica técnica de esculpido en gel en modelo real con rúbrica docente.',
      },
      {
        num: 3,
        title: 'Acrílico de Salón & Control Monómero-Polímero',
        hours: '12h Activas',
        lessons: [
          'Control de ratio y consistencia de la perla perfecta',
          'Aplicación en 3 perlas (zona cutícula, estrés y borde libre)',
          'Pinzado de curvatura C con pinza de compresión metálica',
          'Estructura cuadrada de salón resistente al impacto',
        ],
        practicalOutcome: 'Entrega de fotografías de estructura acrílica con vista cenital y curva frontal.',
      },
      {
        num: 4,
        title: 'Acrigel / Polygel & Dual System Forms',
        hours: '10h Activas',
        lessons: [
          'Modelado con espátula y solución moldeadora Slip',
          'Técnica rápida de moldes duales para reducción de tiempos en salón',
          'Sellado de cutícula con fresa llama sin escalones',
        ],
        practicalOutcome: 'Set completo con sistema Dual Forms en mano modelo.',
      },
      {
        num: 5,
        title: 'Nail Art de Salón & Francesa Inversa (Reverse French)',
        hours: '8h Activas',
        lessons: [
          'Baby Boomer degradado perfecto con gel y esponja',
          'Técnica de almendra con cover y sonrisa invertida encapsulada',
          'Efecto mármol con tintas y foil metalizado de 4 semanas de duración',
        ],
        practicalOutcome: 'Muestrario de 5 diseños comerciales de alta rentabilidad.',
      },
      {
        num: 6,
        title: 'Relleno, Retirada y Rentabilidad del Salón',
        hours: '8h Activas',
        lessons: [
          'Protocolo de relleno en 45 minutos para maximizar ingresos',
          'Retirada mecánica segura con torno de carburo',
          'Fijación de tarifas, costes por servicio y consentimiento informado',
        ],
        practicalOutcome: 'Proyecto Final Completo y evaluación técnica de aprovechamiento.',
      },
    ],
  },

  'extensiones-de-pestanas': {
    slug: 'extensiones-de-pestanas',
    title: 'Especialización en Pestañas y Volumen Ruso',
    category: 'Mirada & Extensiones de Pestañas',
    duration: '6 Semanas',
    activeHours: 50,
    price: '380€',
    installments: 'Acceso completo al programa formativo',
    tagline: 'Formación profesional integral en técnica clásica pelo a pelo, volumen ruso, lash mapping avanzado y bioseguridad ocular.',
    summary: 'Programa formativo de referencia nacional en estética de la mirada. Combina rigor científico en bioseguridad ocular con el dominio artístico del visagismo y la creación manual de abanicos de volumen ruso.',
    modules: [
      {
        num: 1,
        title: 'Bioseguridad Ocular, Anatomía del Folículo y Ficha Técnica',
        hours: '8h Activas',
        lessons: [
          'Ciclo de vida de la pestaña natural (anágena, catágena, telógena)',
          'Enfermedades oculares, blefaritis, demodex y contraindicaciones',
          'Química de cianoacrilatos: humedad, temperatura y vapores',
        ],
        practicalOutcome: 'Test de bioseguridad y elaboración de ficha de consentimientos.',
      },
      {
        num: 2,
        title: 'Técnica Clásica 1 a 1 & Visagismo de Mirada',
        hours: '10h Activas',
        lessons: [
          'Aislamiento perfecto de la pestaña natural sin adherencias (stickies)',
          'Direccionamiento simétrico a 90 grados y distancia de seguridad',
          'Mapping personalizado según morfología (ojos almendrados, caídos, rasgados)',
        ],
        practicalOutcome: 'Set completo clásico en modelo real con rúbrica técnica.',
      },
      {
        num: 3,
        title: 'Volumen Ruso: Abanicado Manual 2D a 6D',
        hours: '10h Activas',
        lessons: [
          'Geometría del abanico perfecto: bases finas, apertura y simetría',
          'Técnicas de armado: frotado en tira, pellizco y volumen con pinza',
          'Cálculo de peso seguro (grosores 0.05, 0.07 vs pestaña natural)',
        ],
        practicalOutcome: 'Creación de 50 abanicos simétricos con base perfecta.',
      },
      {
        num: 4,
        title: 'Efectos de Tendencia: Whispy, Kim K, Wet Look y Foxy Eye',
        hours: '8h Activas',
        lessons: [
          'Efecto Sirena y Foxy Eye con curvaturas L y M',
          'Efecto Kim K con espigas (spikes) y capas superiores',
          'Wet Look con abanicos cerrados y efecto mojado texturizado',
        ],
        practicalOutcome: 'Aplicación de set de volumen híbrido/tendencia en modelo.',
      },
      {
        num: 5,
        title: 'Lifting de Pestañas, Botox Queratina y Laminado de Cejas',
        hours: '8h Activas',
        lessons: [
          'Química de la permanente: rotura y fijación de puentes de disulfuro',
          'Selección de moldes según longitud y curvatura deseada',
          'Tinte profesional de pestañas y nutrición con ácido hialurónico',
        ],
        practicalOutcome: 'Lifting completo de pestañas con tinte y nutrición en modelo.',
      },
      {
        num: 6,
        title: 'Negocio en Cabina, Fotografía & Marca Personal',
        hours: '6h Activas',
        lessons: [
          'Iluminación, macrofotografía y portafolio profesional en redes',
          'Estructura de precios rentables y fidelización de clientela',
          'Entrega y defensa del Proyecto Final con diploma verificable',
        ],
        practicalOutcome: 'Evaluación final y emisión de Certificado Verificable SHA-256.',
      },
    ],
  },

  'cosmetologia-facial': {
    slug: 'cosmetologia-facial',
    title: 'Curso Superior de Cosmetología Facial y Skin Care',
    category: 'Dermoestética & Cuidado Facial Avanzado',
    duration: '10 Semanas',
    activeHours: 80,
    price: '590€',
    installments: 'Acceso completo al programa formativo',
    tagline: 'Diagnóstico cutáneo avanzado, formulación química de activos, peelings químicos y aparatología de cabina.',
    summary: 'Especialización clínica y estética orientada a profesionales que desean liderar cabinas de dermoestética facial con protocolos de vanguardia, diagnóstico personalizado y manejo de activos de alta pureza.',
    modules: [
      {
        num: 1,
        title: 'Histología Cutánea, Biotipos & Fisiología Dérmica',
        hours: '12h Activas',
        lessons: [
          'Capas epidérmicas, estrato córneo y función barrera',
          'Diagnóstico diferencial de biotipos (graso, seco, mixto, sensible)',
          'Evaluación de fototipos según escala Fitzpatrick',
        ],
        practicalOutcome: 'Elaboración de anamnesis facial y ficha diagnóstica.',
      },
      {
        num: 2,
        title: 'Química Cosmética, pH & Activos Transformadores',
        hours: '14h Activas',
        lessons: [
          'Ácido hialurónico (reticulado vs no reticulado y pesos moleculares)',
          'Retinoides, vitamina C pura, niacinamida y péptidos biomiméticos',
          'Penetración transepidérmica y compatibilidad de fórmulas',
        ],
        practicalOutcome: 'Test de química cosmética y prescripción de rutinas domiciliarias.',
      },
      {
        num: 3,
        title: 'Protocolos de Limpieza Profunda & Extracción Aséptica',
        hours: '14h Activas',
        lessons: [
          'Desincrustación con vapor de ozono y ablandadores queratolíticos',
          'Técnica de extracción manual no lesiva con gasa y lanceta estéril',
          'Cierre de poros con alta frecuencia y mascarillas hidroplásticas',
        ],
        practicalOutcome: 'Práctica en cabina de protocolo completo de higiene facial.',
      },
      {
        num: 4,
        title: 'Peelings Químicos (AHA, BHA) & Neutralización de pH',
        hours: '14h Activas',
        lessons: [
          'Ácido glicólico, láctico, salicílico y mandélico al 20%-40%',
          'Indicaciones en acné, manchas seniles y rejuvenecimiento',
          'Control del eritema y neutralización alcalina de seguridad',
        ],
        practicalOutcome: 'Caso clínico guiado de renovación epidérmica con peeling.',
      },
      {
        num: 5,
        title: 'Aparatología Estética: Dermapen, Radiofrecuencia y LED',
        hours: '14h Activas',
        lessons: [
          'Terapia de inducción de colágeno (Microneedling / Dermapen)',
          'Electroporación de principios activos estériles en viales',
          'Cromoterapia LED (luz roja regeneradora, azul bactericida)',
        ],
        practicalOutcome: 'Protocolo combinado de aparatología en modelo.',
      },
      {
        num: 6,
        title: 'Diagnóstico Clínico, Ficha Médica y Proyecto de Casos',
        hours: '12h Activas',
        lessons: [
          'Consentimiento informado RGPD y prevención de reacciones adversas',
          'Venta consultiva de apoyo domiciliario para multiplicar ingresos',
          'Presentación del caso clínico final para graduación formativa',
        ],
        practicalOutcome: 'Defensa del Proyecto Final y certificación verificada.',
      },
    ],
  },
};

export default function LuxuryDossierPage() {
  const params = useParams();
  const slug = (params?.courseSlug as string) || 'unas-de-gel-y-acrilico';
  const course = DOSSIERS_DATA[slug] || DOSSIERS_DATA['unas-de-gel-y-acrilico'];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8 text-slate-800 print:bg-white print:p-0">
      {/* Top Action Bar (Hidden when printing) */}
      <div className="max-w-4xl mx-auto mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          href={`/cursos/${course.slug}`}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Curso</span>
        </Link>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            <Printer className="w-4 h-4 text-rose-400" />
            <span>Imprimir / Guardar como PDF</span>
          </button>

          <Link
            href="/checkout"
            className="inline-flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            <span>Matricularme ({course.price})</span>
          </Link>
        </div>
      </div>

      {/* Main Luxury Dossier Document (A4 Ratio Optimized) */}
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-14 rounded-3xl border border-slate-200 shadow-xl space-y-10 print:shadow-none print:border-none print:p-6 print:rounded-none">
        {/* Header Branding */}
        <header className="border-b-2 border-slate-100 pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-fabi-pink to-fabi-darkpink text-white font-bold flex items-center justify-center text-sm shadow-md shadow-fabi-pink/20">
                FS
              </span>
              <div>
                <h2 className="text-base font-extrabold tracking-wider text-slate-900 font-display uppercase">
                  FABY STUDIO <span className="text-rose-600">ACADEMY</span>
                </h2>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                  División de Formación Superior en Estética & Belleza
                </p>
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dossier Académico Informativo</span>
            </span>
            <p className="text-[11px] text-slate-400">Emisión verificada con firma digital SHA-256</p>
          </div>
        </header>

        {/* Title Hero */}
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-md">
            {course.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 leading-tight">
            {course.title}
          </h1>
          <p className="text-sm font-semibold text-slate-700 italic leading-relaxed">
            "{course.tagline}"
          </p>
          <p className="text-xs text-slate-600 leading-relaxed text-justify">
            {course.summary}
          </p>
        </div>

        {/* Meta Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400 font-medium">Duración Estimada</span>
            <p className="font-bold text-slate-900 text-sm">{course.duration}</p>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400 font-medium">Horas Lectivas</span>
            <p className="font-bold text-rose-700 text-sm">{course.activeHours}h Activas</p>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400 font-medium">Certificación</span>
            <p className="font-bold text-emerald-700 text-sm">Diploma SHA-256</p>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400 font-medium">Tutorías</span>
            <p className="font-bold text-purple-700 text-sm">1 a 1 en Vivo</p>
          </div>
        </div>

        {/* Curriculum Modules Table */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-lg font-bold font-display text-slate-900 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-rose-600" />
              <span>Estructura del Plan de Estudios (6 Módulos)</span>
            </h3>
            <span className="text-xs font-bold text-slate-400">Total: 32 Lecciones</span>
          </div>

          <div className="space-y-4">
            {course.modules.map((m) => (
              <div key={m.num} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs flex items-center justify-center border border-rose-200 shrink-0">
                      0{m.num}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                  </div>
                  <span className="text-xs font-semibold text-rose-700 bg-rose-50/70 px-2.5 py-0.5 rounded-full border border-rose-200">
                    {m.hours}
                  </span>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pl-11">
                  {m.lessons.map((les, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{les}</span>
                    </li>
                  ))}
                </ul>

                <div className="ml-11 pt-2 border-t border-slate-100 flex items-center space-x-2 text-[11px] font-semibold text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Resultado Práctico: {m.practicalOutcome}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teaching Methodology & Certification */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-rose-50/50 rounded-2xl border border-rose-200 text-xs space-y-3 md:space-y-0">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center space-x-1.5 text-sm">
              <Users className="w-4 h-4 text-rose-600" />
              <span>Acompañamiento y Tutoría 1 a 1</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Cada alumna cuenta con una tutora especialista asignada (Profesora Faby / Laura Gómez). Todas las prácticas fotográficas en modelos reales son corregidas individualmente mediante rúbricas técnicas de 100 puntos.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center space-x-1.5 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Validez y Verificación del Diploma</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">
              El certificado emitido cuenta con código único y código QR público enlazado al portal de validación, permitiendo a salones y clientas comprobar la autenticidad y horas de formación realizadas.
            </p>
          </div>
        </div>

        {/* Pricing, Modality & In-Person Payment */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Inversión Formativa:</p>
            <p className="text-3xl font-extrabold text-slate-900 font-display">{course.price}</p>
            <p className="text-xs text-slate-500 font-medium">{course.installments}</p>
            <p className="text-[11px] text-rose-700 font-semibold mt-1">
              ✨ Inscripción y seguimiento a través del Campus Virtual.
            </p>
          </div>

          <div className="text-center sm:text-right space-y-1">
            <p className="text-xs font-bold text-slate-900">Campus FABY STUDIO</p>
            <p className="text-xs text-slate-500">Campus Virtual • Formación Profesional</p>
            <p className="text-xs text-slate-400">info@fabystudio.academy • www.fabystudio.academy</p>
          </div>
        </div>

        {/* Footer Guarantee */}
        <footer className="border-t border-slate-100 pt-4 text-center text-[10px] text-slate-400">
          FABY STUDIO ACADEMY © 2026 • Todos los derechos reservados. Formación técnica con registro de trazabilidad y certificación verificable.
        </footer>
      </div>
    </div>
  );
}

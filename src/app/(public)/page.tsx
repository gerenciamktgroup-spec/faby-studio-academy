'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import {
  Sparkles,
  Clock,
  Play,
  ArrowRight,
  Star,
  Video,
  MapPin,
  CheckCircle2,
  MessageCircle,
  HelpCircle,
  Building2,
  Check,
  X,
  HeartHandshake,
  GraduationCap
} from 'lucide-react';

export default function HomePage() {
  const [activeVideoTab, setActiveVideoTab] = useState<'unas' | 'pestanas' | 'facial'>('unas');

  const demoVideos = {
    unas: {
      id: 'gMLz-995K-A',
      title: 'Master Class 1.1: Manicura Rusa Combinada & Esculpido Estructural',
      courseTitle: 'Máster Profesional en Uñas de Gel & Acrílico Premium',
      duration: '45 min',
      tutor: 'Profesora Faby (Leslie Larico)',
      campusLink: '/campus/cursos/c2000000-0000-0000-0000-000000000002',
      detailsLink: '/cursos/unas-de-gel-y-acrilico',
      description: 'Demostración paso a paso de preparación con torno, deshidratadores, colocación de molde y control del ápice con gel autonivelante.',
    },
    pestanas: {
      id: 'FmcPn9DJ5ef',
      title: 'Master Class 1.1: Aplicación Técnica Clásica Pelo a Pelo (1x1)',
      courseTitle: 'Especialización en Pestañas, Cejas & Volumen Ruso',
      duration: '35 min',
      tutor: 'Laura Gómez',
      campusLink: '/campus/cursos/c1000000-0000-0000-0000-000000000001',
      detailsLink: '/cursos/extensiones-de-pestanas',
      description: 'Aislamiento milimétrico pestaña a pestaña, visagismo con henna, diseño de cejas y manejo de micro-gota de adhesivo.',
    },
    facial: {
      id: 'o6Z52S9qJ5k',
      title: 'Master Class 1.1: Protocolo de Hidrafacial & Limpieza Profunda en Cabina',
      courseTitle: 'Curso Superior de Cosmetología Facial & Hidrafacial',
      duration: '35 min',
      tutor: 'Profesora Faby (Leslie Larico)',
      campusLink: '/campus/cursos/c3000000-0000-0000-0000-000000000003',
      detailsLink: '/cursos/cosmetologia-facial',
      description: 'Diagnóstico de biotipo cutáneo, protocolo de Hidrafacial para renovación celular, desincrustación con espátula ultrasónica y cierre de poros.',
    },
  };

  const currentVideo = demoVideos[activeVideoTab];

  const faqs = [
    {
      q: '¿Cómo funciona la formación si estudio de forma 100% online?',
      a: 'Accedes a nuestro Campus Virtual con clases en alta definición, manuales descargables y un sistema de entrega de prácticas. Subes fotos y vídeos en alta resolución de tus trabajos en modelos y la Profesora Faby o tu tutora asignada colocan notas visuales de corrección personalizadas.',
    },
    {
      q: '¿Qué validez tiene el certificado que obtengo?',
      a: 'Nuestros diplomas se emiten con código QR único y firma criptográfica HMAC-SHA-256. Cualquier cliente, centro de estética o empleador puede verificar en tiempo real tu acreditación oficial en nuestra web pública.',
    },
    {
      q: '¿Puedo visitar las sedes de Faby Studio en Madrid?',
      a: '¡Por supuesto! Contamos con dos sedes en Madrid (Centro Comercial Plaza Aluche y Puente de Vallecas) donde también atendemos a clientas y recibimos a nuestras alumnas para asesorías y compras de productos.',
    },
    {
      q: '¿Se requiere experiencia previa para comenzar?',
      a: 'No. Todos nuestros másteres están estructurados desde el nivel básico (anatomía, bioseguridad, química de productos) hasta técnicas avanzadas de salón, manicura rusa, volumen ruso e Hidrafacial.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      <PublicHeader />

      {/* Hero Section (Clean White Luxury) */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Academia & Centro de Estética en Madrid • Aluche & Vallecas</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.15] text-slate-900">
                Transforma tu Pasión por la Belleza en un{' '}
                <span className="text-fabi-pink">Negocio Rentable y Certificado</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
                Más de <strong>15 años de experiencia</strong> y <strong>80.000 clientas y alumnas</strong> avalan nuestra metodología. Aprende Uñas de Gel & Acrílico, Hidrafacial y Pestañas con tutorías 1 a 1 y certificación digital verificable.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/cursos"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl shadow-fabi-pink/20 transition-all hover:scale-[1.02]"
                >
                  <span>Explorar Másteres</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/campus"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-slate-50 border border-slate-200 hover:border-rose-300 text-slate-800 px-6 py-4 rounded-xl font-semibold text-base transition-colors"
                >
                  <Play className="w-4 h-4 text-fabi-pink fill-fabi-pink" />
                  <span>Acceso Alumnas</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center lg:text-left">
                <div>
                  <p className="text-2xl font-bold text-slate-900 font-display">+15 Años</p>
                  <p className="text-[11px] text-slate-500">Experiencia en Madrid</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-fabi-pink font-display">+80k</p>
                  <p className="text-[11px] text-slate-500">Alumnas & Clientas</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 font-display">2 Sedes</p>
                  <p className="text-[11px] text-slate-500">Aluche & Vallecas</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600 font-display">SHA-256</p>
                  <p className="text-[11px] text-slate-500">Diploma Verificable</p>
                </div>
              </div>
            </div>

            {/* Right Card / Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden bg-white border border-slate-200 p-4 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop"
                  alt="Fabi Studio Master Studio Madrid"
                  className="w-full h-72 object-cover rounded-2xl mb-4"
                />

                <div className="space-y-3 p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-700 uppercase tracking-wider bg-rose-50 px-2.5 py-0.5 rounded-full">
                      Máster Destacado
                    </span>
                    <span className="flex items-center text-amber-600 text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" /> 4.9 / 5.0
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    Máster Profesional en Uñas de Gel & Acrílico Premium
                  </h3>

                  <p className="text-xs text-slate-600">
                    60 Horas lectivas • Manicura Rusa combinada con torno • Tutorías 1 a 1 y diploma oficial verificable.
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <div>
                      <span className="text-lg font-extrabold text-slate-900">490€</span>
                      <span className="text-[10px] text-slate-400 block">o 3 cuotas sin intereses</span>
                    </div>
                    <Link
                      href="/cursos/unas-de-gel-y-acrilico"
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors flex items-center"
                    >
                      Ver temario completo <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestras Sedes en Madrid Section */}
      <section className="py-16 bg-slate-100/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-widest bg-rose-100/80 px-3 py-1 rounded-full border border-rose-200">
              Presencia Física & Respaldo Real
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
              Nuestras 2 Sedes Físicas en Madrid
            </h2>
            <p className="text-sm text-slate-600">
              A diferencia de plataformas anónimas, en FABY STUDIO contamos con centros físicos consolidados donde puedes visitarnos, adquirir materiales o complementar tu formación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Sede 1 */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full">
                  Sede Central
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-display">Sede Plaza Aluche</h3>
                <p className="text-xs text-slate-500 mt-1 flex items-start">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-rose-500 shrink-0 mt-0.5" />
                  Centro Comercial Plaza Aluche, Av. de los Poblados 58, 28044 Madrid
                </p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Salón especializado en estética facial, micropigmentación, manicura y atención presencial a alumnas.
              </p>
              <div className="pt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100">
                <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-slate-400" /> Lun - Vie: 07:00 - 18:00</span>
                <span className="font-semibold text-emerald-600">Abierto al público</span>
              </div>
            </div>

            {/* Sede 2 */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                  Centro de Formación
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-display">Sede Puente de Vallecas</h3>
                <p className="text-xs text-slate-500 mt-1 flex items-start">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-purple-500 shrink-0 mt-0.5" />
                  Centro de Formación & Estética Avanzada, Puente de Vallecas, Madrid
                </p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Espacio acondicionado para workshops intensivos, prácticas con modelos reales y masterclasses técnicas.
              </p>
              <div className="pt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100">
                <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-slate-400" /> Citas & Formación</span>
                <span className="font-semibold text-purple-600">Grupos Reducidos</span>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp Callout */}
          <div className="mt-10 max-w-4xl mx-auto bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg font-bold font-display">¿Tienes dudas o deseas atención personalizada?</h4>
              <p className="text-xs text-slate-300">Habla directamente con la Profesora Faby y nuestro equipo de asesoría académica.</p>
            </div>
            <a
              href="https://wa.me/34614236200?text=Hola%20Faby%20Studio,%20quisiera%20asesor%C3%ADa%20sobre%20los%20m%C3%A1steres%20profesionales"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3.5 rounded-xl font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chatear por WhatsApp (+34 614 23 62 00)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Masterclass Video Showcase Section */}
      <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <div className="inline-flex items-center space-x-2 bg-rose-900/60 border border-rose-500/40 px-3.5 py-1 rounded-full text-xs font-bold text-rose-300">
              <Video className="w-3.5 h-3.5 text-rose-400" />
              <span>CLASES DE DEMOSTRACIÓN EN DIRECTO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display">
              Mira una Master Class Real de Nuestro Campus
            </h2>
            <p className="text-xs text-slate-400">
              Experimenta la calidad pedagógica y definición de vídeo de nuestras clases teóricas y prácticas.
            </p>

            {/* Video Course Selector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setActiveVideoTab('unas')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeVideoTab === 'unas'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                💅 Uñas de Gel & Acrílico
              </button>
              <button
                onClick={() => setActiveVideoTab('pestanas')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeVideoTab === 'pestanas'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                👁️ Pestañas, Cejas & Henna
              </button>
              <button
                onClick={() => setActiveVideoTab('facial')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeVideoTab === 'facial'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                🧴 Cosmetología & Hidrafacial
              </button>
            </div>
          </div>

          {/* Video Player Card */}
          <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl max-w-5xl mx-auto">
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                    {currentVideo.courseTitle}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">{currentVideo.title}</h3>
              </div>
              <div className="flex items-center space-x-3 text-xs text-slate-400 shrink-0">
                <span className="bg-slate-800 px-2.5 py-1 rounded-lg">Docente: {currentVideo.tutor}</span>
                <span className="bg-slate-800 px-2.5 py-1 rounded-lg">{currentVideo.duration}</span>
              </div>
            </div>

            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${currentVideo.id}?autoplay=0&rel=0&modestbranding=1&enablejsapi=1`}
                title={currentVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="p-5 bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800">
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                {currentVideo.description}
              </p>
              <div className="flex items-center space-x-3 shrink-0">
                <Link
                  href={currentVideo.detailsLink}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors"
                >
                  Ver Temario Completo
                </Link>
                <Link
                  href={currentVideo.campusLink}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-rose-600/30 transition-all flex items-center space-x-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Probar en Campus</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Spotlight & Metodología */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                  alt="Leslie Fabiola Larico Zapana - Directora Faby Studio"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Fundadora & Master Educator</span>
                  <h3 className="text-xl font-bold font-display">Leslie Fabiola Larico Zapana</h3>
                  <p className="text-xs text-slate-300">Más de 15 años transformando la estética en Madrid</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-700">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Nuestra Filosofía de Formación</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
                "En Faby Studio transformamos tu pasión en una profesión de alto nivel y resultados reales"
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                Nuestra misión no es venderte vídeos pregrabados sin soporte, sino guiarte paso a paso con estándares de salón de lujo. Te enseñamos la técnica milimétrica, la bioseguridad higiénico-sanitaria y las herramientas de cálculo financiero para que cobres lo que realmente vale tu trabajo.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start space-x-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-slate-900">Corrección 1 a 1 de Prácticas</p>
                    <p className="text-slate-500 mt-0.5">Rúbricas visuales detalladas con notas directas de la docente.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-slate-900">Calculadora de Márgenes</p>
                    <p className="text-slate-500 mt-0.5">Herramienta integrada para costear insumos y fijar precios de salón.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
              Diferenciador Exclusivo
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
              ¿Por Qué Faby Studio Academy Marca la Diferencia?
            </h2>
            <p className="text-sm text-slate-600">
              Compara nuestro modelo de formación integral frente a los cursos convencionales del mercado.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
            <div className="grid grid-cols-3 bg-slate-900 text-white p-4 sm:p-5 text-xs sm:text-sm font-bold">
              <div>Característica</div>
              <div className="text-center text-rose-400 font-extrabold">FABY STUDIO ACADEMY</div>
              <div className="text-center text-slate-400">Otros Cursos Online</div>
            </div>

            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              <div className="grid grid-cols-3 p-4 sm:p-5 items-center">
                <span className="font-semibold text-slate-800">Sedes físicas de respaldo en Madrid</span>
                <span className="text-center text-emerald-600 font-bold flex justify-center"><Check className="w-5 h-5" /></span>
                <span className="text-center text-rose-400 flex justify-center"><X className="w-5 h-5" /></span>
              </div>
              <div className="grid grid-cols-3 p-4 sm:p-5 items-center bg-slate-50/50">
                <span className="font-semibold text-slate-800">Evaluación de prácticas 1 a 1 en modelos</span>
                <span className="text-center text-emerald-600 font-bold flex justify-center"><Check className="w-5 h-5" /></span>
                <span className="text-center text-rose-400 flex justify-center"><X className="w-5 h-5" /></span>
              </div>
              <div className="grid grid-cols-3 p-4 sm:p-5 items-center">
                <span className="font-semibold text-slate-800">Diplomas con firma hash SHA-256 y QR público</span>
                <span className="text-center text-emerald-600 font-bold flex justify-center"><Check className="w-5 h-5" /></span>
                <span className="text-center text-rose-400 flex justify-center"><X className="w-5 h-5" /></span>
              </div>
              <div className="grid grid-cols-3 p-4 sm:p-5 items-center bg-slate-50/50">
                <span className="font-semibold text-slate-800">Calculadora interactiva de rentabilidad en cabina</span>
                <span className="text-center text-emerald-600 font-bold flex justify-center"><Check className="w-5 h-5" /></span>
                <span className="text-center text-rose-400 flex justify-center"><X className="w-5 h-5" /></span>
              </div>
              <div className="grid grid-cols-3 p-4 sm:p-5 items-center">
                <span className="font-semibold text-slate-800">Trazabilidad de horas y seguimiento activo</span>
                <span className="text-center text-emerald-600 font-bold flex justify-center"><Check className="w-5 h-5" /></span>
                <span className="text-center text-rose-400 flex justify-center"><X className="w-5 h-5" /></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Catalog Grid */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Catálogo Académico</span>
              <h2 className="text-3xl font-bold font-display text-slate-900 mt-1">Cursos & Másteres de Especialización</h2>
            </div>
            <Link
              href="/cursos"
              className="mt-4 md:mt-0 text-sm font-semibold text-rose-600 hover:text-rose-700 transition-colors flex items-center"
            >
              Ver todos los cursos <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Course 1 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop"
                  alt="Uñas de Gel y Acrílico"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                      Uñas & Manicura
                    </span>
                    <span className="text-xs font-bold text-slate-900">490€</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-display leading-snug">
                    Máster Profesional en Uñas de Gel y Acrílico Premium
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    Manicura rusa con torno, nivelación con base rubber, acrigel y esculpido estructural con molde.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-4">
                <span>60h Activas</span>
                <Link href="/cursos/unas-de-gel-y-acrilico" className="text-rose-600 font-bold hover:underline">Ver Programa →</Link>
              </div>
            </div>

            {/* Course 2 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop"
                  alt="Especialización en Pestañas y Cejas"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                      Mirada & Cejas
                    </span>
                    <span className="text-xs font-bold text-slate-900">380€</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-display leading-snug">
                    Especialización en Pestañas, Cejas & Volumen Ruso
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    Técnica clásica 1:1, abanicos 2D-6D, visagismo con henna, laminado de cejas y depilación con hilo.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-4">
                <span>50h Activas</span>
                <Link href="/cursos/extensiones-de-pestanas" className="text-rose-600 font-bold hover:underline">Ver Programa →</Link>
              </div>
            </div>

            {/* Course 3 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop"
                  alt="Cosmetología y Hidrafacial"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Cosmetología Facial
                    </span>
                    <span className="text-xs font-bold text-slate-900">590€</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-display leading-snug">
                    Curso Superior de Cosmetología Facial & Hidrafacial
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    Protocolos paso a paso de Hidrafacial, aparatología en cabina, peelings químicos y diagnóstico dérmico.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-4">
                <span>80h Activas</span>
                <Link href="/cursos/cosmetologia-facial" className="text-rose-600 font-bold hover:underline">Ver Programa →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
              Resolvemos tus Dudas
            </span>
            <h2 className="text-3xl font-bold font-display text-slate-900">
              Preguntas Frecuentes de Futuras Alumnas
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center">
                  <HelpCircle className="w-4 h-4 mr-2 text-rose-500 shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

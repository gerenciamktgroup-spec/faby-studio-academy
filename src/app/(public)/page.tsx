import React from 'react';
import Link from 'next/link';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { Sparkles, Award, Clock, Users, ShieldCheck, CheckCircle2, Play, ArrowRight, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      <PublicHeader />

      {/* Hero Section (Clean White Luxury) */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Academia Oficial de Formación Estética Avanzada</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.15] text-slate-900">
                Transforma tu Pasión por la Belleza en una{' '}
                <span className="text-fabi-pink">Carrera de Éxito Certificada</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
                FABY STUDIO ACADEMY combina técnicas de alto nivel en Uñas de Gel, Acrílico, Pestañas y Cosmetología con una plataforma virtual auditable con seguimiento de tiempo activo.
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
              <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <p className="text-2xl font-bold text-slate-900 font-display">98%</p>
                  <p className="text-xs text-slate-500">Empleabilidad</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-fabi-pink font-display">+1,200</p>
                  <p className="text-xs text-slate-500">Alumnas Graduadas</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600 font-display">SHA-256</p>
                  <p className="text-xs text-slate-500">Integridad Verificable</p>
                </div>
              </div>
            </div>

            {/* Right Card / Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden bg-white border border-slate-200 p-4 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop"
                  alt="Fabi Studio Master Studio"
                  className="w-full h-80 object-cover rounded-2xl mb-4"
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
                    60 Horas lectivas activas • Tutorías personalizadas 1 a 1 • Certificado oficial verificado.
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <span className="text-lg font-extrabold text-slate-900">490€</span>
                    <Link
                      href="/cursos"
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

      {/* Pillars Section */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold font-display text-slate-900 mb-3">
              Trazabilidad y Calidad Educativa Sin Compromisos
            </h2>
            <p className="text-sm text-slate-600">
              Diseñada desde el primer día cumpliendo con los estándares exigidos para Formación Profesional regulada en España.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-700">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display">Active Learning Heartbeat</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Separamos en tiempo real el tiempo activo de formación frente al tiempo conectado, validando interacción continua cada 45 segundos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display">Registro Append-Only Inmutable</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cada lección, test y tutoría genera un evento firmado con IP anonimizada mediante SHA-256 e inmutable para auditorías externas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display">Certificación Verificable</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Diplomas digitales con código QR y firma criptográfica hash para verificación pública inmediata por parte de centros y clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Catalog Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Catálogo Oficial</span>
              <h2 className="text-3xl font-bold font-display text-slate-900 mt-1">Cursos & Másteres Especializados</h2>
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
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop"
                alt="Uñas de Gel"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-4">
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                  Uñas & Manicura
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display leading-snug">
                  Máster Profesional en Uñas de Gel y Acrílico Premium
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  Formación completa de nivel profesional con certificación acreditada. Técnicas avanzadas de esculpido y anatomía.
                </p>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>60h Activas</span>
                  <Link href="/cursos/unas-de-gel-y-acrilico" className="text-rose-600 font-bold hover:underline">Ver Programa</Link>
                </div>
              </div>
            </div>

            {/* Course 2 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1583001809873-a1284a5da677?q=80&w=800&auto=format&fit=crop"
                alt="Pestañas"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-4">
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                  Mirada & Pestañas
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display leading-snug">
                  Especialización en Pestañas y Volumen Ruso
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  Domina la técnica del pelo a pelo, abanicos perfectos y bioseguridad ocular para un acabado de lujo.
                </p>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>50h Activas</span>
                  <Link href="/cursos/extensiones-de-pestanas" className="text-rose-600 font-bold hover:underline">Ver Programa</Link>
                </div>
              </div>
            </div>

            {/* Course 3 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop"
                alt="Cosmetología"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-4">
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Cosmetología
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display leading-snug">
                  Curso Superior de Cosmetología Facial y Skin Care
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  Fundamentos de dermocosmética, protocolos de tratamiento y diagnóstico biotipo cutáneo.
                </p>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>80h Activas</span>
                  <Link href="/cursos/cosmetologia-facial" className="text-rose-600 font-bold hover:underline">Ver Programa</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

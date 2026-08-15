'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, Download, Lock, CheckCircle2, QrCode, ExternalLink, Sparkles } from 'lucide-react';

export default function CertificadoPage() {
  const [activePersona, setActivePersona] = useState<'camila' | 'lucia'>('camila');
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [ratingContent, setRatingContent] = useState(5);
  const [ratingTutor, setRatingTutor] = useState(5);
  const [ratingPlatform, setRatingPlatform] = useState(5);
  const [ratingCabin, setRatingCabin] = useState(5);
  const [surveyFeedback, setSurveyFeedback] = useState('Excelente formación, las explicaciones de química de adhesivos y la atención de la tutora han sido de 10.');

  const handleCompleteSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    setSurveyCompleted(true);
    setShowSurveyModal(false);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Selector to test both states */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-xs gap-3">
        <span className="text-slate-600 font-semibold flex items-center">
          <Sparkles className="w-3.5 h-3.5 mr-1 text-rose-600" />
          Probar Estado de Certificación (Demo):
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => setActivePersona('camila')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activePersona === 'camila'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Camila Torres (92% - Certificado Listo)
          </button>
          <button
            onClick={() => setActivePersona('lucia')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activePersona === 'lucia'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Lucía Martínez (68% - En Progreso)
          </button>
        </div>
      </div>

      {activePersona === 'camila' ? (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                CERTIFICADO OFICIAL DE FINALIZACIÓN
              </span>
              <h1 className="text-2xl font-bold font-display text-slate-900 mt-2">Acreditación Académica</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/verificar-certificado/CERT-FS-DEMO-9988"
                target="_blank"
                className="bg-white border border-slate-200 hover:border-emerald-500 text-emerald-700 hover:text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-xs"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Página de Verificación Pública</span>
              </Link>

              {surveyCompleted ? (
                <button
                  onClick={() => {
                    const content = `
═══════════════════════════════════════════════════════════
               FABY STUDIO ACADEMY
        CERTIFICADO OFICIAL DE FINALIZACIÓN
═══════════════════════════════════════════════════════════

Se otorga el presente reconocimiento a:

                   CAMILA TORRES

Por haber completado satisfactoriamente el programa
de 50 horas lectivas activas correspondiente al:

    Curso Profesional de Extensiones de Pestañas

Código de Verificación: CERT-FS-DEMO-9988
Fecha de Emisión: 08 de Agosto de 2026
Calificación Final: 92% (Excelente)
Encuesta de Calidad SEPE / FUNDAE: APROBADA (5/5)
Firmado por: Profesora Faby — Dirección Académica
Huella de Integridad SHA-256:
9a8f4c2e1b7d5e6a3f0c8b9d4e2a1f7c5e6d8a9b0c1e2f3a4b5c6d7e8f9a0b1c

Validación Pública: https://fabystudio.academy/verificar-certificado/CERT-FS-DEMO-9988

═══════════════════════════════════════════════════════════
`;
                    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `CERTIFICADO_OFICIAL_CAMILA_TORRES_${Date.now()}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center space-x-2 shadow-md shadow-emerald-600/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Diploma Oficial</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowSurveyModal(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center space-x-2 shadow-md shadow-amber-500/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Cuestionario de Calidad SEPE (Obligatorio)</span>
                </button>
              )}
            </div>
          </div>

          {/* Quality Survey Completed Badge */}
          {surveyCompleted && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Cuestionario de Calidad & Auditoría Superado:</strong> Tu expediente cumple con los requisitos de la Orden TMS/369/2019 y estándares de acreditación europea.
                </span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md font-bold uppercase shrink-0">
                AUDIT COMPLIANT
              </span>
            </div>
          )}

          {/* Certificate Design Card (Clean White Luxury with Gold Border) */}
          <div className="bg-white border-2 border-amber-300 p-8 sm:p-12 rounded-3xl space-y-8 text-center relative overflow-hidden shadow-xl">
            <div className="space-y-2">
              <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-700 mx-auto flex items-center justify-center font-bold text-xl border border-amber-300">
                FS
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-widest uppercase">
                FABY STUDIO <span className="text-rose-600">ACADEMY</span>
              </h2>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">CERTIFICADO OFICIAL DE FINALIZACIÓN</p>
            </div>

            <div className="space-y-3 max-w-xl mx-auto">
              <p className="text-xs text-slate-500">Se otorga el presente reconocimiento oficial a:</p>
              <h3 className="text-3xl font-extrabold text-slate-900 font-display">Camila Torres</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Por haber completado satisfactoriamente el programa de 50 horas lectivas activas correspondiente al:
              </p>
              <p className="text-lg font-bold text-rose-600 font-display">
                Curso Profesional de Extensiones de Pestañas
              </p>
            </div>

            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <div className="text-left">
                <p className="font-semibold text-slate-800">Código de Verificación:</p>
                <Link
                  href="/verificar-certificado/CERT-FS-DEMO-9988"
                  className="font-mono text-amber-700 font-bold hover:underline flex items-center space-x-1"
                >
                  <span>CERT-FS-DEMO-9988</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <Link
                href="/verificar-certificado/CERT-FS-DEMO-9988"
                className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-200 hover:border-emerald-400 transition-colors group shadow-2xs"
              >
                <QrCode className="w-10 h-10 text-slate-800 group-hover:scale-105 transition-transform" />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-900 uppercase flex items-center">
                    <span>QR Verificable</span>
                    <ExternalLink className="w-2.5 h-2.5 ml-1 text-emerald-600" />
                  </p>
                  <p className="text-[9px] text-slate-500">Comprobar autenticidad oficial</p>
                </div>
              </Link>

              <div className="text-right">
                <p className="font-semibold text-slate-800">Firma Dirección:</p>
                <p className="font-display font-bold text-rose-600">Profesora Faby</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 max-w-lg mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900">Certificado Actualmente Bloqueado</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Lucía Martínez ha completado el <strong className="text-slate-900">68%</strong> del curso (34 de 50 horas activas). Debes finalizar las evaluaciones restantes y el proyecto final de volumen ruso para desbloquear tu acreditación oficial.
          </p>
          <div className="pt-2">
            <Link
              href="/campus/cursos/c1000000-0000-0000-0000-000000000001"
              className="inline-flex items-center space-x-1.5 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              <span>Continuar con el Módulo 4</span>
            </Link>
          </div>
        </div>
      )}

      {/* Quality Satisfaction Survey Modal (SEPE / FUNDAE / ISO 9001 Compliance) */}
      {showSurveyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm font-display">
                    Cuestionario Oficial de Calidad y Satisfacción
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Requisito de la Orden TMS/369/2019 previo a la emisión del título oficial
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSurveyModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCompleteSurvey} className="space-y-4 text-xs">
              {/* Question 1 */}
              <div className="space-y-1">
                <label className="font-bold text-slate-800 block">
                  1. Calidad técnica y pedagógica de los videos y manuales:
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setRatingContent(val)}
                      className={`flex-1 py-1.5 rounded-lg border font-bold text-xs transition-colors ${
                        ratingContent === val
                          ? 'bg-amber-500 border-amber-600 text-white shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {val} ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div className="space-y-1">
                <label className="font-bold text-slate-800 block">
                  2. Atención, rapidez y feedback de la tutora docente:
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setRatingTutor(val)}
                      className={`flex-1 py-1.5 rounded-lg border font-bold text-xs transition-colors ${
                        ratingTutor === val
                          ? 'bg-amber-500 border-amber-600 text-white shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {val} ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div className="space-y-1">
                <label className="font-bold text-slate-800 block">
                  3. Facilidad de uso del Campus Virtual y herramientas interactivas:
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setRatingPlatform(val)}
                      className={`flex-1 py-1.5 rounded-lg border font-bold text-xs transition-colors ${
                        ratingPlatform === val
                          ? 'bg-amber-500 border-amber-600 text-white shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {val} ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 4 */}
              <div className="space-y-1">
                <label className="font-bold text-slate-800 block">
                  4. Utilidad para rentabilizar y fijar precios en tu salón/cabina:
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setRatingCabin(val)}
                      className={`flex-1 py-1.5 rounded-lg border font-bold text-xs transition-colors ${
                        ratingCabin === val
                          ? 'bg-amber-500 border-amber-600 text-white shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {val} ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Open Feedback */}
              <div className="space-y-1">
                <label className="font-bold text-slate-800 block">
                  Comentarios y sugerencias de mejora:
                </label>
                <textarea
                  value={surveyFeedback}
                  onChange={(e) => setSurveyFeedback(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowSurveyModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enviar y Desbloquear Diploma</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

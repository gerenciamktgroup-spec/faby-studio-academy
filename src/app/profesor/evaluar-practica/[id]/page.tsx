'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileCheck,
  CheckCircle2,
  Sliders,
  Star,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  Save,
  ShieldCheck,
  Eye
} from 'lucide-react';

export default function EvaluarPracticaPage() {
  // Rubric Scores (4 criteria of 25 points = 100 total)
  const [aislamiento, setAislamiento] = useState<number>(23);
  const [distancia, setDistancia] = useState<number>(21);
  const [simetria, setSimetria] = useState<number>(22);
  const [adhesivo, setAdhesivo] = useState<number>(20);
  
  const [feedbackText, setFeedbackText] = useState(
    '¡Muy buen trabajo en lagrimales, Lucía! El aislamiento es limpio. Para la próxima entrega de abanicos 3D, vigila no sobrecargar de adhesivo la base para mantener el abanicado abierto.'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const totalScore = aislamiento + distancia + simetria + adhesivo;

  const handleSaveEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Header */}
      <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <Link href="/profesor" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center text-xs font-semibold">
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver al Panel Docente
          </Link>
          <span className="text-slate-300">|</span>
          <span className="font-display font-bold text-slate-900 text-base">
            EVALUADOR OFICIAL DE RÚBRICA TÉCNICA (100 PUNTOS)
          </span>
        </div>

        <span className="bg-purple-50 border border-purple-200 text-purple-800 text-xs px-3 py-1.5 rounded-full font-bold">
          Tutora: Laura Gómez
        </span>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {/* Student Submission Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-700 font-bold text-xl flex items-center justify-center border border-rose-200">
              LM
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold font-display text-slate-900">Lucía Martínez</h1>
                <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  Práctica 01: Aplicación Clásica
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Curso Profesional de Extensiones de Pestañas • Entregada el 07/08/2026
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold">Nota Total Calculada:</span>
              <p className={`text-2xl font-extrabold font-display ${totalScore >= 70 ? 'text-emerald-700' : 'text-amber-700'}`}>
                {totalScore} / 100
              </p>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              totalScore >= 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {totalScore >= 70 ? 'APROBADA ✓' : 'REQUIERE REVISIÓN'}
            </span>
          </div>
        </div>

        {/* Evaluation Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Submitted Photographs */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                <span>Fotografías de la Entrega</span>
                <span className="text-xs text-slate-500">3 Fotos en Modelo</span>
              </h2>

              <div className="space-y-3">
                <div className="rounded-xl overflow-hidden border border-slate-200 relative">
                  <img
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop"
                    alt="Foto Práctica"
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs">
                    Foto 1: Aislamiento en Lagrimal
                  </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                  <p className="font-bold text-slate-900">Notas de la Alumna:</p>
                  <p className="text-[11px] text-slate-600 italic">
                    "Utilicé curvatura C, 0.15mm en centro y 0.12mm en lagrimal. Humedad en cabina: 52% con adhesivo de 1.5 seg."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 4-Criteria Interactive Rubric Sliders */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleSaveEvaluation} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Criterios de Evaluación por Rúbrica (25 pts c/u)
              </h2>

              {/* Criterion 1: Aislamiento */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-900">1. Aislamiento y Separación Pestaña a Pestaña</span>
                  <span className="text-rose-600 font-bold">{aislamiento} / 25 pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={aislamiento}
                  onChange={(e) => setAislamiento(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
                <p className="text-[10px] text-slate-500">Sin pestañas pegadas entre sí (stickies) ni tensión en raíz.</p>
              </div>

              {/* Criterion 2: Distancia al Párpado */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-900">2. Distancia al Párpado (0.5mm - 1.0mm)</span>
                  <span className="text-rose-600 font-bold">{distancia} / 25 pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={distancia}
                  onChange={(e) => setDistancia(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
                <p className="text-[10px] text-slate-500">Distancia uniforme sin tocar piel para evitar molestias.</p>
              </div>

              {/* Criterion 3: Dirección y Simetría */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-900">3. Dirección, Mapping y Simetría Ocular</span>
                  <span className="text-rose-600 font-bold">{simetria} / 25 pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={simetria}
                  onChange={(e) => setSimetria(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
                <p className="text-[10px] text-slate-500">Transición suave de longitudes y alineación a 90 grados.</p>
              </div>

              {/* Criterion 4: Limpieza de Adhesivo */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-900">4. Limpieza de Adhesivo y Retención</span>
                  <span className="text-rose-600 font-bold">{adhesivo} / 25 pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={adhesivo}
                  onChange={(e) => setAdhesivo(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
                <p className="text-[10px] text-slate-500">Micro-gota imperceptible sin grumos ni exceso de cianoacrilato.</p>
              </div>

              {/* Written Feedback for Student */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-slate-900">Feedback Pedagógico para la Alumna</label>
                  <span className="text-[10px] text-slate-400 font-semibold">Píldoras Rápidas (1 Clic):</span>
                </div>

                {/* Fast Feedback Preset Pills */}
                <div className="flex flex-wrap gap-1.5 pb-1">
                  <button
                    type="button"
                    onClick={() =>
                      setFeedbackText((prev) =>
                        prev ? `${prev} Excelente aislamiento pestaña a pestaña sin cruces.` : 'Excelente aislamiento pestaña a pestaña sin cruces.'
                      )
                    }
                    className="bg-slate-100 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all"
                  >
                    + Aislamiento Perfecto
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFeedbackText((prev) =>
                        prev
                          ? `${prev} Cuidado con el exceso de adhesivo en la zona del lagrimal.`
                          : 'Cuidado con el exceso de adhesivo en la zona del lagrimal.'
                      )
                    }
                    className="bg-slate-100 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all"
                  >
                    + Ajustar Adhesivo en Lagrimal
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFeedbackText((prev) =>
                        prev
                          ? `${prev} La transición de curvatura y el mapping Cat Eye quedaron impecables.`
                          : 'La transición de curvatura y el mapping Cat Eye quedaron impecables.'
                      )
                    }
                    className="bg-slate-100 hover:bg-purple-50 hover:text-purple-800 hover:border-purple-300 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all"
                  >
                    + Mapping Impecable
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFeedbackText((prev) =>
                        prev
                          ? `${prev} ¡Enhorabuena! Set completo aprobado con nivel profesional.`
                          : '¡Enhorabuena! Set completo aprobado con nivel profesional.'
                      )
                    }
                    className="bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all"
                  >
                    + Set Profesional Aprobado
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white leading-relaxed"
                />
              </div>

              {savedSuccess ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-1">
                  <p className="text-xs font-bold text-emerald-800 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 mr-1.5 inline text-emerald-600" /> Calificación Guardada & Notificada a la Alumna
                  </p>
                  <p className="text-[10px] text-slate-500">Expediente actualizado con nota final: {totalScore}/100</p>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white py-3.5 rounded-2xl font-bold text-sm shadow-md shadow-rose-600/20 transition-all flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Publicar Calificación ({totalScore}/100) y Enviar Feedback</span>
                </button>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

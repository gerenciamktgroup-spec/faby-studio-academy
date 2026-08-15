'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Bot,
  Calendar,
  Zap,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Search,
  Cpu,
  Clock,
  Layers,
} from 'lucide-react';
import { generateFabyAIResponse } from '@/lib/ai/rag-engine';
import {
  generateAdaptiveStudyPlan,
  generateAdaptiveMockQuiz,
  StudyPlanDay,
  AdaptiveQuizQuestion,
} from '@/lib/ai/study-copilot';

export default function AICopilotPage() {
  const [selectedTopic, setSelectedTopic] = useState<'pestañas' | 'uñas'>('pestañas');
  const [studyPlanDays, setStudyPlanDays] = useState<StudyPlanDay[]>(() => generateAdaptiveStudyPlan(5, 'pestañas'));
  const [quizQuestions, setQuizQuestions] = useState<AdaptiveQuizQuestion[]>(() => generateAdaptiveMockQuiz('pestañas'));
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  // RAG Search Box
  const [searchQuery, setSearchQuery] = useState('humedad en adhesivo');
  const [searchResponse, setSearchResponse] = useState(() => generateFabyAIResponse('humedad en adhesivo'));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchResponse(generateFabyAIResponse(searchQuery));
  };

  const handleTopicSwitch = (topic: 'pestañas' | 'uñas') => {
    setSelectedTopic(topic);
    setStudyPlanDays(generateAdaptiveStudyPlan(5, topic));
    setQuizQuestions(generateAdaptiveMockQuiz(topic));
    setSelectedAnswers({});
    setShowResults(false);
  };

  const handleToggleDay = (dayNum: number) => {
    setStudyPlanDays((prev) =>
      prev.map((d) => (d.dayNumber === dayNum ? { ...d, isCompleted: !d.isCompleted } : d))
    );
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-700">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span>FABY AI NATIVE SUITE — RAG & STUDY COPILOT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
              Centro Inteligente de Estudio & Preparación de Exámenes
            </h1>
            <p className="text-xs text-slate-500">
              Tutoría personalizada con citaciones oficiales del temario, generador de planes semanales y simulacros adaptativos.
            </p>
          </div>

          <div className="flex space-x-2 bg-slate-100 p-1.5 rounded-2xl shrink-0 self-start sm:self-auto">
            <button
              onClick={() => handleTopicSwitch('pestañas')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedTopic === 'pestañas'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              👁️ Especialización Pestañas
            </button>
            <button
              onClick={() => handleTopicSwitch('uñas')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedTopic === 'uñas'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              💅 Máster Uñas de Gel
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Weekly Adaptive Schedule (5 Days) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold font-display text-slate-900">
                    Plan Semanal Adaptativo (5 Días)
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Estructurado por objetivos diarios y micro-actividades prácticas
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
                5 DÍAS RESTANTES
              </span>
            </div>

            <div className="space-y-3">
              {studyPlanDays.map((day) => (
                <div
                  key={day.dayNumber}
                  onClick={() => handleToggleDay(day.dayNumber)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    day.isCompleted
                      ? 'bg-emerald-50/70 border-emerald-200'
                      : 'bg-slate-50 border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md font-mono ${
                          day.isCompleted ? 'bg-emerald-200 text-emerald-800' : 'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {day.dayName} • {day.estimatedMinutes} min
                      </span>
                      <span className="font-bold text-slate-900 text-xs font-display">
                        {day.topicTitle}
                      </span>
                    </div>

                    <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
                      {day.activities.map((act, i) => (
                        <li key={i}>{act}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="shrink-0 mt-1">
                    {day.isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: RAG Semantic Search & Adaptive Quiz Trainer */}
        <div className="lg:col-span-6 space-y-6">
          {/* Section 1: RAG Knowledge Search */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold font-display text-slate-900">
                  Búsqueda Semántica con Citaciones RAG
                </h2>
                <p className="text-[11px] text-slate-500">
                  Consulta cualquier duda técnica y obtén el minuto exacto del temario
                </p>
              </div>
            </div>

            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ej. distancia de seguridad, humedad, fresa llama..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-rose-500"
              />
              <button
                type="submit"
                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                Buscar
              </button>
            </form>

            {searchResponse && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="whitespace-pre-line text-slate-800 leading-relaxed">
                  {searchResponse.answer}
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Adaptive Quiz Trainer */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold font-display text-slate-900">
                    Simulacro de Examen Adaptativo
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Refuerzo de conceptos técnicos clave de la rúbrica oficial
                  </p>
                </div>
              </div>

              {showResults && (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full font-mono">
                  Superado
                </span>
              )}
            </div>

            <div className="space-y-4 text-xs">
              {quizQuestions.map((q, idx) => (
                <div key={q.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
                  <p className="font-bold text-slate-900 font-display">
                    {idx + 1}. {q.question}
                  </p>

                  <div className="space-y-1.5">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[q.id] === oIdx;
                      const isCorrect = q.correctIndex === oIdx;
                      let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';

                      if (showResults) {
                        if (isCorrect) btnStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                        else if (isSelected && !isCorrect) btnStyle = 'bg-rose-50 border-rose-300 text-rose-900';
                      } else if (isSelected) {
                        btnStyle = 'bg-amber-50 border-amber-300 text-amber-950 font-bold';
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => {
                            if (!showResults) setSelectedAnswers((prev) => ({ ...prev, [q.id]: oIdx }));
                          }}
                          className={`w-full text-left p-2.5 rounded-xl border text-[11px] transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {showResults && isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-0.5">
                      <p className="font-bold text-slate-800">💡 Explicación:</p>
                      <p>{q.explanation}</p>
                      <p className="text-[10px] text-slate-400 font-mono">Fuente: {q.sourceLesson}</p>
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAnswers({});
                    setShowResults(false);
                  }}
                  className="text-slate-500 hover:text-slate-800 font-bold text-xs"
                >
                  Reiniciar
                </button>
                <button
                  type="button"
                  onClick={() => setShowResults(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-emerald-600/20"
                >
                  Comprobar Simulacro
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

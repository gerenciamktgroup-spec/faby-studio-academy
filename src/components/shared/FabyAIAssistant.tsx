'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Bot,
  Send,
  X,
  Minimize2,
  Maximize2,
  BookOpen,
  CheckCircle2,
  RefreshCw,
  Copy,
  ChevronRight,
  Flame,
  Lightbulb,
  ShieldCheck,
  Zap,
  Calendar,
  Layers,
  HelpCircle,
  Clock,
} from 'lucide-react';
import { generateFabyAIResponse, RAGQueryResult } from '@/lib/ai/rag-engine';
import {
  generateAdaptiveStudyPlan,
  generateAdaptiveMockQuiz,
  StudyPlanDay,
  AdaptiveQuizQuestion,
} from '@/lib/ai/study-copilot';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  citations?: {
    title: string;
    sourceRef: string;
    lessonTitle: string;
  }[];
  guardrailTriggered?: boolean;
}

export function FabyAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'study_plan' | 'mock_quiz'>('chat');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Copilot State
  const [studyPlanDays, setStudyPlanDays] = useState<StudyPlanDay[]>(() => generateAdaptiveStudyPlan(5, 'pestañas'));
  const [studyTopic, setStudyTopic] = useState<'pestañas' | 'uñas'>('pestañas');

  // Mock Quiz State
  const [quizQuestions, setQuizQuestions] = useState<AdaptiveQuizQuestion[]>(() => generateAdaptiveMockQuiz('pestañas'));
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: '¡Hola, Lucía! Soy **Fabi AI Coach 24/7**, tu tutora inteligente de cabina en Faby Studio Academy.\n\nPuedo resolver dudas del temario oficial con citas exactas a los minutos del video, generar tu plan de estudio semanal o crear simulacros adaptativos.',
      timestamp: 'Ahora',
      citations: [
        {
          title: 'Asistente Educativo Verificado',
          sourceRef: 'Temario Oficial Faby Studio',
          lessonTitle: 'Base de Conocimiento Acreditada',
        },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping, activeTab]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputMessage.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const ragResult = generateFabyAIResponse(query);
      const assistantMsg: ChatMessage = {
        id: 'ast-' + Date.now(),
        sender: 'assistant',
        text: ragResult.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: ragResult.citations,
        guardrailTriggered: ragResult.guardrailTriggered,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleCopyText = (id: string, text: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleTogglePlanDay = (dayNumber: number) => {
    setStudyPlanDays((prev) =>
      prev.map((d) => (d.dayNumber === dayNumber ? { ...d, isCompleted: !d.isCompleted } : d))
    );
  };

  const handleTopicChange = (topic: 'pestañas' | 'uñas') => {
    setStudyTopic(topic);
    setStudyPlanDays(generateAdaptiveStudyPlan(5, topic));
  };

  const handleSelectQuizAnswer = (qId: string, optIdx: number) => {
    if (showQuizResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const suggestedPrompts = [
    '¿Qué pasa si la humedad de cabina sube al 70%?',
    '¿A qué distancia del párpado debo colocar la extensión?',
    '¿Cuál es el ángulo de la fresa llama en manicura rusa?',
    '¿Cómo calculo el precio PVP de mis servicios?',
  ];

  return (
    <>
      {/* Floating Trigger Badge */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center space-x-2.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white pl-4 pr-5 py-3.5 rounded-full shadow-xl shadow-rose-600/30 transition-all hover:scale-105 border border-white/20"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
            </span>

            <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <div className="text-left">
              <span className="text-xs font-extrabold block font-display tracking-tight leading-none">
                Fabi AI Coach 24/7
              </span>
              <span className="text-[10px] text-rose-100 font-medium leading-none">
                RAG Citations & Study Copilot
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Floating AI Panel */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95 ${
            isExpanded
              ? 'w-[95vw] sm:w-[620px] h-[85vh] max-h-[750px]'
              : 'w-[95vw] sm:w-[420px] h-[560px]'
          }`}
        >
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-extrabold font-display leading-tight">
                    Fabi AI Coach
                  </h3>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    RAG Activo
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">Tutoría con fuentes oficiales del curso</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title={isExpanded ? 'Minimizar' : 'Maximizar'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Sub-tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50 px-3 pt-2 gap-1 text-xs shrink-0 font-bold">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-2 rounded-t-xl transition-colors flex items-center space-x-1.5 ${
                activeTab === 'chat'
                  ? 'bg-white text-slate-900 border-t border-x border-slate-200 -mb-px'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-rose-600" />
              <span>Tutor RAG</span>
            </button>

            <button
              onClick={() => setActiveTab('study_plan')}
              className={`px-3 py-2 rounded-t-xl transition-colors flex items-center space-x-1.5 ${
                activeTab === 'study_plan'
                  ? 'bg-white text-slate-900 border-t border-x border-slate-200 -mb-px'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              <span>Plan 5 Días</span>
            </button>

            <button
              onClick={() => setActiveTab('mock_quiz')}
              className={`px-3 py-2 rounded-t-xl transition-colors flex items-center space-x-1.5 ${
                activeTab === 'mock_quiz'
                  ? 'bg-white text-slate-900 border-t border-x border-slate-200 -mb-px'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Simulacro</span>
            </button>
          </div>

          {/* TAB 1: RAG CHAT */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50">
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`p-3.5 rounded-2xl max-w-[90%] text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-rose-600 text-white rounded-br-xs'
                          : msg.guardrailTriggered
                          ? 'bg-amber-50 text-amber-950 border border-amber-200 rounded-bl-xs shadow-2xs'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs'
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>

                      {/* Source Citations */}
                      {msg.citations && msg.citations.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100/80 space-y-1">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                            📖 Fuentes del Temario Oficial:
                          </span>
                          {msg.citations.map((cit, idx) => (
                            <div
                              key={idx}
                              className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center justify-between"
                            >
                              <span>{cit.sourceRef}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 mt-1 px-1">
                      <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                      {msg.sender === 'assistant' && (
                        <button
                          onClick={() => handleCopyText(msg.id, msg.text)}
                          className="text-[10px] text-slate-400 hover:text-slate-700 flex items-center space-x-0.5"
                        >
                          <Copy className="w-2.5 h-2.5" />
                          <span>{copiedId === msg.id ? 'Copiado' : 'Copiar'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center space-x-2 text-slate-400 text-xs p-3 bg-white rounded-2xl border border-slate-200 w-fit">
                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-bounce delay-100" />
                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-bounce delay-200" />
                    <span className="text-[11px] font-mono font-medium">Buscando en lecciones...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Chips */}
              <div className="p-2.5 bg-white border-t border-slate-200 overflow-x-auto whitespace-nowrap flex gap-1.5">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-[11px] bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-700 hover:text-rose-700 px-3 py-1.5 rounded-full shrink-0 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Box */}
              <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Pregunta sobre química, distancias o técnicas..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-rose-500"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim()}
                  className="bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white p-2.5 rounded-xl transition-colors shrink-0 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: STUDY COPILOT 5 DAYS */}
          {activeTab === 'study_plan' && (
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50 text-xs">
              <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 block font-display">
                    Plan Semanal Adaptativo
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Objetivo: Superar examen oficial con &gt;85%
                  </span>
                </div>

                <div className="flex space-x-1">
                  <button
                    onClick={() => handleTopicChange('pestañas')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                      studyTopic === 'pestañas' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Pestañas
                  </button>
                  <button
                    onClick={() => handleTopicChange('uñas')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                      studyTopic === 'uñas' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Uñas
                  </button>
                </div>
              </div>

              <div className="space-y-2.5">
                {studyPlanDays.map((day) => (
                  <div
                    key={day.dayNumber}
                    onClick={() => handleTogglePlanDay(day.dayNumber)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      day.isCompleted
                        ? 'bg-emerald-50/70 border-emerald-200'
                        : 'bg-white border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md font-mono ${
                            day.isCompleted ? 'bg-emerald-200 text-emerald-800' : 'bg-indigo-100 text-indigo-700'
                          }`}
                        >
                          {day.dayName} • {day.estimatedMinutes} min
                        </span>
                        <span className="font-bold text-slate-900 font-display">{day.topicTitle}</span>
                      </div>
                      <ul className="text-[11px] text-slate-600 space-y-0.5 list-disc list-inside">
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
          )}

          {/* TAB 3: ADAPTIVE MOCK QUIZ */}
          {activeTab === 'mock_quiz' && (
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50 text-xs">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <h4 className="font-bold text-slate-900 font-display text-sm">
                  Simulacro Rápido de Validación
                </h4>
                <p className="text-[11px] text-slate-500">
                  Preguntas generadas según los puntos más exigentes de la rúbrica oficial.
                </p>
              </div>

              <div className="space-y-4">
                {quizQuestions.map((q, qIndex) => (
                  <div
                    key={q.id}
                    className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-2xs"
                  >
                    <p className="font-bold text-slate-900 font-display">
                      {qIndex + 1}. {q.question}
                    </p>

                    <div className="space-y-1.5">
                      {q.options.map((opt, optIndex) => {
                        const isSelected = selectedAnswers[q.id] === optIndex;
                        const isCorrect = q.correctIndex === optIndex;
                        let optionStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                        if (showQuizResults) {
                          if (isCorrect) {
                            optionStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                          } else if (isSelected && !isCorrect) {
                            optionStyle = 'bg-rose-50 border-rose-300 text-rose-900';
                          }
                        } else if (isSelected) {
                          optionStyle = 'bg-amber-50 border-amber-300 text-amber-950 font-bold';
                        }

                        return (
                          <button
                            key={optIndex}
                            type="button"
                            onClick={() => handleSelectQuizAnswer(q.id, optIndex)}
                            className={`w-full text-left p-2.5 rounded-xl border text-[11px] transition-all flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {showQuizResults && isCorrect && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {showQuizResults && (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                        <p className="font-bold text-slate-800">💡 Explicación Técnica:</p>
                        <p>{q.explanation}</p>
                        <p className="text-[10px] text-slate-400 font-mono">Fuente: {q.sourceLesson}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAnswers({});
                    setShowQuizResults(false);
                  }}
                  className="px-3 py-2 text-slate-500 hover:text-slate-800 font-bold text-xs"
                >
                  Reiniciar
                </button>

                <button
                  type="button"
                  onClick={() => setShowQuizResults(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl font-bold text-xs shadow-md shadow-emerald-600/20"
                >
                  Comprobar Respuestas
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

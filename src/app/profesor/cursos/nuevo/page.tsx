'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Plus,
  Trash2,
  Video,
  FileText,
  HelpCircle,
  Save,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Layers
} from 'lucide-react';

export default function NuevoCursoPage() {
  const [title, setTitle] = useState('Máster Superior en Uñas Esculpidas & Acrigel');
  const [category, setCategory] = useState('Uñas & Manicura');
  const [hours, setHours] = useState(60);
  const [price, setPrice] = useState(490);
  const [description, setDescription] = useState('Especialización intensiva en estructura de uñas, limado ergonómico y decoración de salón.');

  const [modules, setModules] = useState([
    {
      id: 1,
      title: 'Módulo 1: Anatomía de la Uña & Preparación Química',
      lessons: [
        { id: '1.1', title: 'Lección 1.1: Diagnóstico de la lámina ungueal', type: 'video', duration: '20 min' },
        { id: '1.2', title: 'Lección 1.2: Deshidratadores y primers sin ácido', type: 'video', duration: '15 min' },
        { id: '1.3', title: 'Test: Preparación de la uña natural', type: 'quiz', duration: '10 min' },
      ],
    },
    {
      id: 2,
      title: 'Módulo 2: Colocación de Moldes & Arquitectura Cuadrada',
      lessons: [
        { id: '2.1', title: 'Lección 2.1: Corte del molde según el hiponiquio', type: 'video', duration: '25 min' },
        { id: '2.2', title: 'Práctica 01: Esculpido cuadrado en modelo', type: 'assignment', duration: '45 min' },
      ],
    },
  ]);

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAddModule = () => {
    const nextNum = modules.length + 1;
    setModules([
      ...modules,
      {
        id: nextNum,
        title: `Módulo ${nextNum}: Nuevo Módulo Técnico`,
        lessons: [
          { id: `${nextNum}.1`, title: `Lección ${nextNum}.1: Introducción práctica`, type: 'video', duration: '20 min' },
        ],
      },
    ]);
  };

  const handleAddLesson = (moduleIdx: number) => {
    const updated = [...modules];
    const lessonCount = updated[moduleIdx].lessons.length + 1;
    updated[moduleIdx].lessons.push({
      id: `${updated[moduleIdx].id}.${lessonCount}`,
      title: `Lección ${updated[moduleIdx].id}.${lessonCount}: Nueva Lección en Video`,
      type: 'video',
      duration: '20 min',
    });
    setModules(updated);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Top Header */}
      <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <Link href="/profesor" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center text-xs font-semibold">
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver al Panel Docente
          </Link>
          <span className="text-slate-300">|</span>
          <span className="font-display font-bold text-slate-900 text-lg">
            CREADOR & EDITOR DE MÁSTERES ACADÉMICOS
          </span>
        </div>

        <span className="bg-rose-50 border border-rose-200 text-rose-700 text-xs px-3 py-1.5 rounded-full font-bold">
          Dirección Académica: Profesora Faby
        </span>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        <form onSubmit={handleSaveCourse} className="space-y-8">
          {/* General Course Info */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-rose-600" />
              <span>1. Ficha del Máster o Especialización</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-semibold mb-1">Título Oficial del Programa</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Categoría / Especialidad</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                >
                  <option value="Uñas & Manicura">Uñas & Manicura</option>
                  <option value="Mirada & Pestañas">Mirada & Pestañas</option>
                  <option value="Cosmetología">Cosmetología Facial</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Horas Lectivas Activas (Trazabilidad)</label>
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Precio Matrícula (€)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Nivel del Programa</label>
                <input
                  type="text"
                  defaultValue="Inicial a Profesional Avanzado"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-semibold mb-1">Descripción y Objetivos Pedagógicos</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Curriculum Builder */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Layers className="w-5 h-5 text-rose-600" />
                <span>2. Estructura de Módulos y Lecciones</span>
              </h2>

              <button
                type="button"
                onClick={handleAddModule}
                className="bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1 self-start"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Módulo</span>
              </button>
            </div>

            <div className="space-y-6">
              {modules.map((m, mIdx) => (
                <div key={m.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={m.title}
                      onChange={(e) => {
                        const copy = [...modules];
                        copy[mIdx].title = e.target.value;
                        setModules(copy);
                      }}
                      className="text-sm font-bold text-slate-900 bg-white border border-slate-200 rounded-lg px-3 py-1.5 w-full max-w-md focus:outline-none focus:border-rose-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddLesson(mIdx)}
                      className="bg-white border border-slate-200 hover:border-rose-500 text-slate-700 hover:text-rose-600 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors flex items-center space-x-1 shrink-0 ml-3"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Lección</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {m.lessons.map((l) => (
                      <div
                        key={l.id}
                        className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center space-x-2.5">
                          {l.type === 'video' && <Video className="w-4 h-4 text-rose-600 shrink-0" />}
                          {l.type === 'quiz' && <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />}
                          {l.type === 'assignment' && <FileText className="w-4 h-4 text-emerald-600 shrink-0" />}
                          <span className="font-semibold text-slate-800">{l.title}</span>
                        </div>
                        <span className="text-slate-400 text-[11px]">{l.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          {saveSuccess ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center text-xs font-bold text-emerald-700 flex items-center justify-center space-x-2 shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>¡Programa publicado con éxito en el catálogo oficial de FABY STUDIO ACADEMY!</span>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-fabi-pink/25 transition-all flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Publicar Nuevo Máster en la Plataforma</span>
            </button>
          )}
        </form>
      </main>
    </div>
  );
}

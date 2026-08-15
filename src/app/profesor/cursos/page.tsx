'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Users,
  Clock,
  Award,
  ChevronRight,
  Plus,
  ArrowLeft,
  Sparkles,
  Layers,
  CheckCircle2,
  FileCheck,
  Eye,
} from 'lucide-react';

interface TeacherCourseItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  enrolledStudents: number;
  completedStudents: number;
  averageGrade: string;
  totalModules: number;
  totalLessons: number;
  image: string;
}

export default function ProfesorCursosIndexPage() {
  const courses: TeacherCourseItem[] = [
    {
      id: 'c1000000-0000-0000-0000-000000000001',
      slug: 'extensiones-de-pestanas',
      title: 'Especialización en Pestañas y Volumen Ruso',
      category: 'Mirada & Pestañas',
      enrolledStudents: 320,
      completedStudents: 218,
      averageGrade: '88.4 / 100',
      totalModules: 5,
      totalLessons: 24,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'c2000000-0000-0000-0000-000000000002',
      slug: 'unas-de-gel-y-acrilico',
      title: 'Máster Profesional en Uñas de Gel y Acrílico Premium',
      category: 'Uñas & Manicura',
      enrolledStudents: 450,
      completedStudents: 310,
      averageGrade: '91.2 / 100',
      totalModules: 5,
      totalLessons: 28,
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'c3000000-0000-0000-0000-000000000003',
      slug: 'cosmetologia-facial',
      title: 'Curso Superior de Cosmetología Facial y Skin Care',
      category: 'Cosmetología',
      enrolledStudents: 280,
      completedStudents: 175,
      averageGrade: '89.0 / 100',
      totalModules: 5,
      totalLessons: 22,
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Header */}
      <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <Link href="/profesor" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs">
              FS
            </div>
            <span className="font-display font-bold text-slate-900 text-base uppercase">
              FABY STUDIO <span className="text-rose-600">DOCENTE</span>
            </span>
          </Link>
          <span className="text-slate-300">|</span>
          <span className="text-xs font-semibold text-slate-500">Gestión de Cursos y Cohortes</span>
        </div>

        <Link
          href="/profesor"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Panel</span>
        </Link>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* Title & Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full text-xs font-bold text-rose-700">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Planes de Estudio Acreditados</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mt-2">
              Cursos & Másteres Asignados
            </h1>
            <p className="text-xs text-slate-500">
              Supervisión de cohortes activas, lecciones de video, evaluaciones y tasa de éxito.
            </p>
          </div>

          <Link
            href="/profesor/cursos/nuevo"
            className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center space-x-2 self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Nueva Lección o Módulo</span>
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between hover:border-rose-300 transition-all group"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 text-rose-700 font-bold text-[10px] px-2.5 py-1 rounded-full shadow-xs border border-rose-100">
                    {c.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 font-display line-clamp-2">
                    {c.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">
                        Alumnas Activas
                      </span>
                      <span className="font-extrabold text-slate-900 text-sm font-display">
                        {c.enrolledStudents}
                      </span>
                    </div>

                    <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                      <span className="text-[10px] text-emerald-700 font-bold uppercase block">
                        Graduadas
                      </span>
                      <span className="font-extrabold text-emerald-800 text-sm font-display">
                        {c.completedStudents}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>
                      {c.totalModules} Módulos • {c.totalLessons} Lecciones
                    </span>
                    <span className="font-semibold text-rose-700">Nota media: {c.averageGrade}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/campus/cursos/${c.id}`}
                  className="w-full bg-slate-100 hover:bg-rose-50 text-slate-800 hover:text-rose-700 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ver Contenido en Campus</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

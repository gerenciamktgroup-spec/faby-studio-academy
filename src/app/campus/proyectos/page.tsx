'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  UploadCloud,
  FileCheck,
  CheckCircle2,
  Sparkles,
  Heart,
  MessageSquare,
  Eye,
  Star,
  Plus,
  ArrowRight,
  Filter,
  Layers,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Search,
  MoveHorizontal,
  Sliders,
} from 'lucide-react';
import { BeforeAfterSlider } from '@/components/shared/BeforeAfterSlider';

interface ProjectItem {
  id: number;
  studentName: string;
  studentAvatar: string;
  tag: string;
  tagLabel: string;
  title: string;
  description: string;
  image: string;
  beforeImage?: string;
  grade: string;
  feedback: string;
  likes: number;
  views: number;
  isEvaluated: boolean;
  likedByMe?: boolean;
}

const BEFORE_AFTER_TRANSFORMATIONS = [
  {
    id: 101,
    studentName: 'Lucía Martínez',
    studentAvatar: 'LM',
    title: 'Transformación Pestaña Recta a Volumen Ruso 3D Efecto Fox',
    subtitle: 'Modelo con pestaña natural fina recta, curvatura C 0.07mm de 8 a 13mm.',
    tag: 'Volumen Ruso',
    grade: '96 / 100',
    beforeImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1583001809873-a1284a5da677?q=80&w=800&auto=format&fit=crop',
    feedback: 'Laura Gómez: "Excelente nivelación del puente de la mirada y simetría en lagrimales."',
  },
  {
    id: 102,
    studentName: 'Camila Torres',
    studentAvatar: 'CT',
    title: 'Reconstrucción Ungueal: De Uña Mordida a Estructura Ballerina en Gel',
    subtitle: 'Alargamiento con molde de salón, deshidratación con primer sin ácido y builder gel.',
    tag: 'Uñas de Gel',
    grade: '98 / 100',
    beforeImage: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop',
    feedback: 'Profesora Faby: "El ápice ha quedado perfectamente ubicado en la zona de estrés. Sellado de cutícula impoluto."',
  },
  {
    id: 103,
    studentName: 'María López',
    studentAvatar: 'ML',
    title: 'Corrección de Visagismo: Párpado Encapotado a Doll Eye Abierto',
    subtitle: 'Técnica clásica 1:1 con longitudes centrales elevadas para proyectar apertura.',
    tag: 'Técnica Clásica',
    grade: '92 / 100',
    beforeImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
    feedback: 'Laura Gómez: "La mirada se ve completamente rejuvenecida."',
  },
];

export default function StudentProjectsPage() {
  const [activeView, setActiveView] = useState<'grid' | 'before-after'>('before-after');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadTag, setUploadTag] = useState('Técnica Clásica');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadedSuccess, setUploadedSuccess] = useState(false);

  // Lightbox modal state
  const [lightboxProject, setLightboxProject] = useState<ProjectItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const tags = [
    { id: 'all', label: 'Todos los Proyectos' },
    { id: 'clasica', label: 'Técnica Clásica (1:1)' },
    { id: 'volumen', label: 'Volumen Ruso (2D-6D)' },
    { id: 'mapping', label: 'Mapping & Visagismo' },
    { id: 'lifting', label: 'Lash Lifting & Laminado' },
  ];

  const [projectsList, setProjectsList] = useState<ProjectItem[]>([
    {
      id: 1,
      studentName: 'Lucía Martínez',
      studentAvatar: 'LM',
      tag: 'clasica',
      tagLabel: 'Técnica Clásica (1:1)',
      title: 'Práctica 01: Aplicación Clásica en Modelo Real',
      description: 'Trabajo realizado con curvatura C en grosores 0.15mm y 0.12mm. Aislamiento milimétrico y mapping efecto Cat Eye.',
      image: 'https://images.unsplash.com/photo-1583001809873-a1284a5da677?q=80&w=800&auto=format&fit=crop',
      grade: '86 / 100',
      feedback: 'Laura Gómez: "Excelente dirección en lagrimales. Muy buena retención con adhesivo de 1.5s."',
      likes: 19,
      views: 142,
      isEvaluated: true,
      likedByMe: false,
    },
    {
      id: 2,
      studentName: 'Camila Torres',
      studentAvatar: 'CT',
      tag: 'volumen',
      tagLabel: 'Volumen Ruso (2D-6D)',
      title: 'Proyecto Final: Mega Volumen Ruso 4D Efecto Kim',
      description: 'Creación manual de abanicos 4D con grosor 0.07mm. Simetría perfecta y base cristalizada.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
      grade: '95 / 100',
      feedback: 'Profesora Faby: "Proyecto impecable. Dominio total del abanicado y transición de longitudes."',
      likes: 42,
      views: 310,
      isEvaluated: true,
      likedByMe: true,
    },
    {
      id: 3,
      studentName: 'María López',
      studentAvatar: 'ML',
      tag: 'mapping',
      tagLabel: 'Mapping & Visagismo',
      title: 'Estudio de Visagismo & Mapping Doll Eye',
      description: 'Diseño personalizado para ojos almendrados profundos. Longitudes de 8mm a 13mm en zona central.',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop',
      grade: '90 / 100',
      feedback: 'Laura Gómez: "La simetría entre ambos ojos quedó perfecta."',
      likes: 27,
      views: 198,
      isEvaluated: true,
      likedByMe: false,
    },
  ]);

  const handleToggleLike = (projectId: number) => {
    setProjectsList((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const isLiked = !p.likedByMe;
          return {
            ...p,
            likedByMe: isLiked,
            likes: isLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  const filteredProjects = projectsList.filter((p) => {
    const matchesTag = selectedTag === 'all' || p.tag === selectedTag;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadedSuccess(true);

    const newProj: ProjectItem = {
      id: Date.now(),
      studentName: 'Lucía Martínez (Tú)',
      studentAvatar: 'LM',
      tag: 'clasica',
      tagLabel: uploadTag,
      title: uploadTitle || 'Nueva Práctica Entregada',
      description: uploadDescription || 'Entrega reciente pendiente de revisión docente.',
      image: 'https://images.unsplash.com/photo-1583001809873-a1284a5da677?q=80&w=800&auto=format&fit=crop',
      grade: 'Pendiente',
      feedback: 'Buzón docente: Tu práctica está en cola de revisión por Laura Gómez.',
      likes: 1,
      views: 12,
      isEvaluated: false,
      likedByMe: true,
    };

    setTimeout(() => {
      setProjectsList([newProj, ...projectsList]);
      setUploadedSuccess(false);
      setShowUploadModal(false);
      setUploadTitle('');
      setUploadDescription('');
    }, 1200);
  };

  const openLightbox = (proj: ProjectItem) => {
    setLightboxProject(proj);
    setZoomLevel(1);
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header and Call to Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full text-xs font-bold text-rose-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portafolio & Evidencias Prácticas</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mt-2">
            Galería de Proyectos & Transformaciones
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl">
            Espacio de aprendizaje práctico donde examinamos el detalle técnico milimétrico con comparadores deslizables Antes/Después e imágenes de alta resolución evaluadas por rúbrica docente.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white px-5 py-3 rounded-xl font-bold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center space-x-2 self-start hover:scale-[1.02]"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Subir Nueva Práctica</span>
        </button>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setActiveView('before-after')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
              activeView === 'before-after'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MoveHorizontal className="w-3.5 h-3.5 text-rose-600" />
            <span>Comparador Antes / Después ({BEFORE_AFTER_TRANSFORMATIONS.length})</span>
          </button>

          <button
            onClick={() => setActiveView('grid')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
              activeView === 'grid'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-rose-600" />
            <span>Muro de Proyectos ({projectsList.length})</span>
          </button>
        </div>

        {activeView === 'grid' && (
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por técnica o alumna..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-rose-500 shadow-2xs"
            />
          </div>
        )}
      </div>

      {/* VIEW 1: BEFORE / AFTER SLIDER SHOWCASE */}
      {activeView === 'before-after' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-rose-50 via-white to-rose-50/30 p-5 rounded-2xl border border-rose-200/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-sm font-extrabold font-display text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                <Sparkles className="w-4 h-4 text-rose-600" />
                <span>Visor Deslizante de Transformaciones Reales</span>
              </h3>
              <p className="text-xs text-slate-600">
                Arrastra la barra vertical en cualquier tarjeta para evaluar la simetría, la retención y la transformación de la mirada.
              </p>
            </div>
            <Link
              href="/campus/practicas"
              className="bg-white border border-rose-200 hover:border-rose-400 text-rose-700 px-4 py-2 rounded-xl text-xs font-bold shadow-2xs whitespace-nowrap transition-colors"
            >
              Ver Rúbricas Docentes
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {BEFORE_AFTER_TRANSFORMATIONS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4 hover:border-rose-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center border border-rose-200">
                        {item.studentAvatar}
                      </div>
                      <span className="text-xs font-bold text-slate-900">{item.studentName}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      Nota: {item.grade}
                    </span>
                  </div>

                  {/* Interactive Slider */}
                  <BeforeAfterSlider
                    beforeImage={item.beforeImage}
                    afterImage={item.afterImage}
                    title={item.title}
                    subtitle={item.subtitle}
                    aspectRatio="aspect-[4/3]"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                  <p className="text-[10px] font-bold text-rose-800 flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" /> Dictamen de Corrección:
                  </p>
                  <p className="text-[11px] text-slate-700 italic">{item.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: STANDARD PROJECTS GRID */}
      {activeView === 'grid' && (
        <div className="space-y-6">
          {/* Tags */}
          <div className="flex space-x-2 overflow-x-auto pb-1">
            {tags.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTag(t.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedTag === t.id
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 flex flex-col justify-between group hover:border-rose-300 transition-all shadow-xs"
              >
                <div>
                  <div
                    className="relative h-48 overflow-hidden bg-slate-100 cursor-pointer"
                    onClick={() => openLightbox(proj)}
                  >
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 text-slate-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
                        <Maximize2 className="w-3.5 h-3.5 text-rose-600" />
                        <span>Zoom de Alta Resolución</span>
                      </span>
                    </div>

                    <span className="absolute top-3 left-3 bg-white/95 text-rose-700 font-bold text-[10px] px-2.5 py-1 rounded-full shadow-xs border border-rose-100">
                      {proj.tagLabel}
                    </span>

                    {proj.isEvaluated ? (
                      <span className="absolute top-3 right-3 bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-full shadow">
                        Nota: {proj.grade}
                      </span>
                    ) : (
                      <span className="absolute top-3 right-3 bg-amber-500 text-white font-bold text-[10px] px-2.5 py-1 rounded-full shadow">
                        En Revisión
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center border border-rose-200">
                        {proj.studentAvatar}
                      </div>
                      <span className="text-xs font-bold text-slate-900">{proj.studentName}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 font-display line-clamp-1">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>

                    {proj.feedback && (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                        <p className="text-[10px] font-bold text-emerald-700 flex items-center">
                          <CheckCircle2 className="w-3 h-3 mr-1 inline text-emerald-600" /> Feedback Docente:
                        </p>
                        <p className="text-[11px] text-slate-700 italic">{proj.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => handleToggleLike(proj.id)}
                      className={`flex items-center space-x-1 transition-colors ${
                        proj.likedByMe ? 'text-rose-600 font-bold' : 'text-slate-500 hover:text-rose-600'
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          proj.likedByMe ? 'fill-rose-600 text-rose-600' : ''
                        }`}
                      />
                      <span>{proj.likes}</span>
                    </button>
                    <span className="flex items-center space-x-1">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-600">{proj.views}</span>
                    </span>
                  </div>

                  <Link
                    href="/campus/practicas"
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors flex items-center space-x-1"
                  >
                    <span>Ver Rúbrica</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal with Zoom */}
      {lightboxProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full border border-slate-200 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs">
                  {lightboxProject.studentAvatar}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{lightboxProject.title}</h3>
                  <p className="text-[11px] text-slate-500">
                    {lightboxProject.studentName} • {lightboxProject.tagLabel}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(1, z - 0.5))}
                  disabled={zoomLevel <= 1}
                  className="p-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-100 disabled:opacity-40"
                  title="Alejar"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-slate-600 px-1">{zoomLevel}x</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.5))}
                  disabled={zoomLevel >= 2.5}
                  className="p-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-100 disabled:opacity-40"
                  title="Acercar"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLightboxProject(null)}
                  className="p-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-100 ml-2"
                  title="Cerrar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 bg-slate-900/5 flex items-center justify-center min-h-[300px]">
              <div
                className="transition-transform duration-200 origin-center"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <img
                  src={lightboxProject.image}
                  alt={lightboxProject.title}
                  className="max-h-[60vh] rounded-xl object-contain shadow-md"
                />
              </div>
            </div>

            <div className="p-4 bg-white border-t border-slate-200 text-xs space-y-2">
              <p className="text-slate-700">{lightboxProject.description}</p>
              {lightboxProject.feedback && (
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                  <span className="font-bold">Dictamen Docente: </span>
                  <span className="italic">{lightboxProject.feedback}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2">
                <UploadCloud className="w-5 h-5 text-rose-600" />
                <h3 className="text-lg font-bold font-display text-slate-900">
                  Subir Práctica para Rúbrica
                </h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕ Cerrar
              </button>
            </div>

            {uploadedSuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">¡Práctica Subida con Éxito!</h4>
                <p className="text-xs text-slate-600">
                  Tu entrega ha sido enviada al buzón docente de Laura Gómez y la Profesora Faby para su evaluación por rúbrica de 100 puntos.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSimulateUpload} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Título de la Práctica</label>
                  <input
                    type="text"
                    required
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="Ej. Práctica 02: Abanicos 3D en modelo"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Técnica o Módulo</label>
                  <select
                    value={uploadTag}
                    onChange={(e) => setUploadTag(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-rose-500 font-medium"
                  >
                    <option value="Técnica Clásica (1:1)">Técnica Clásica (1:1)</option>
                    <option value="Volumen Ruso (2D-6D)">Volumen Ruso (2D-6D)</option>
                    <option value="Mapping & Visagismo">Mapping & Visagismo</option>
                    <option value="Lash Lifting & Laminado">Lash Lifting & Laminado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Descripción y Materiales Utilizados
                  </label>
                  <textarea
                    rows={3}
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                    placeholder="Indica curvatura, grosor, adhesivo utilizado y observaciones del servicio..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 text-center space-y-2">
                  <ImageIcon className="w-8 h-8 text-rose-500 mx-auto" />
                  <p className="font-bold text-slate-700">Seleccionar fotografías (Frontal, Lateral, Cierre)</p>
                  <p className="text-[11px] text-slate-400">JPG, PNG o HEIC de alta resolución (Máx. 15MB)</p>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 text-slate-500 font-bold hover:text-slate-800"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white px-6 py-2.5 rounded-xl font-bold shadow-md shadow-rose-600/20"
                  >
                    Enviar a Corrección Docente
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

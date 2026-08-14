'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  MessageSquare,
  Sparkles,
  Heart,
  Plus,
  Send,
  Pin,
  TrendingUp,
  Award,
  CheckCircle2,
  Share2,
  Clock,
  Eye,
  Filter
} from 'lucide-react';

export default function ComunidadPage() {
  const [activeTab, setActiveTab] = useState<'recientes' | 'populares'>('recientes');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('Dudas Técnicas');
  const [postSuccess, setPostSuccess] = useState(false);

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Laura Gómez (Tutora Académica)',
      authorRole: 'Docente',
      authorAvatar: 'LG',
      isPinned: true,
      timeAgo: 'Hace 4 horas',
      category: 'Consejos de Cabina',
      title: '📌 Recomendaciones de Humedad & Adhesivo para esta Semana',
      content: 'Recordad que con las temperaturas altas la polimerización del cianoacrilato se acelera. Si vuestra cabina supera el 60% de humedad, cambiad la gota cada 15 minutos en lugar de cada 20 para evitar grumos.',
      likes: 34,
      replies: 8,
      views: 189,
    },
    {
      id: 2,
      author: 'Lucía Martínez',
      authorRole: 'Alumna',
      authorAvatar: 'LM',
      isPinned: false,
      timeAgo: 'Hace 1 día',
      category: 'Dudas Técnicas',
      title: '¿Qué higrómetro digital de precisión utilizáis en vuestro estudio?',
      content: 'Hola chicas, estoy equipando mi cabina y busco uno fiable que marque temperatura y humedad en tiempo real. ¿Alguna recomendación de marca?',
      likes: 12,
      replies: 5,
      views: 94,
    },
    {
      id: 3,
      author: 'Camila Torres',
      authorRole: 'Graduada',
      authorAvatar: 'CT',
      isPinned: false,
      timeAgo: 'Hace 2 días',
      category: 'Casos de Éxito',
      title: '¡Certificado obtenido! Mi primer mes cobrando 60€ por set clásico',
      content: 'Quería agradecer a la Profesora Faby y a Laura por la paciencia en las rúbricas. La confianza que te da saber aislar perfectamente no tiene precio. ¡Mucho ánimo a todas las que estáis con el Módulo 3!',
      likes: 47,
      replies: 14,
      views: 312,
    },
  ]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newEntry = {
      id: Date.now(),
      author: 'Lucía Martínez',
      authorRole: 'Alumna',
      authorAvatar: 'LM',
      isPinned: false,
      timeAgo: 'Ahora mismo',
      category: newCategory,
      title: newTitle.trim(),
      content: newContent.trim(),
      likes: 1,
      replies: 0,
      views: 1,
    };

    setPosts([newEntry, ...posts]);
    setPostSuccess(true);
    setTimeout(() => {
      setPostSuccess(false);
      setShowNewPost(false);
      setNewTitle('');
      setNewContent('');
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Comunidad de Alumnas</span>
          <h1 className="text-2xl font-bold font-display text-slate-900 mt-1">Foro & Comunidad Beauty Pro</h1>
          <p className="text-xs text-slate-500">Comparte trucos de cabina, resuelve dudas con compañeras y celebra tus avances.</p>
        </div>

        <button
          onClick={() => setShowNewPost(true)}
          className="bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white px-5 py-3 rounded-xl font-bold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center space-x-2 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Publicar Consulta o Aporte</span>
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">42 Alumnas</p>
            <p className="text-[10px] text-slate-500">Comunidad activa esta semana</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">156 Debates</p>
            <p className="text-[10px] text-slate-500">Casos clínicos y dudas</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">89% Respuesta</p>
            <p className="text-[10px] text-slate-500">Resueltas en menos de 2h</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('recientes')}
          className={`pb-3 transition-colors flex items-center space-x-1.5 border-b-2 ${
            activeTab === 'recientes'
              ? 'border-rose-600 text-rose-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Más Recientes</span>
        </button>

        <button
          onClick={() => setActiveTab('populares')}
          className={`pb-3 transition-colors flex items-center space-x-1.5 border-b-2 ${
            activeTab === 'populares'
              ? 'border-rose-600 text-rose-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Más Populares</span>
        </button>
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-display">Crear Nueva Publicación</h3>
              <button onClick={() => setShowNewPost(false)} className="text-slate-400 hover:text-slate-700 text-xs font-bold">
                ✕ Cerrar
              </button>
            </div>

            {postSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold text-slate-900">¡Publicación compartida con éxito en la comunidad!</p>
              </div>
            ) : (
              <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Categoría</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-rose-500"
                  >
                    <option value="Dudas Técnicas">Dudas Técnicas</option>
                    <option value="Consejos de Cabina">Consejos de Cabina</option>
                    <option value="Casos de Éxito">Casos de Éxito & Graduación</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Título del Debate</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ej. ¿Qué adhesivo recomendáis para 55% de humedad?"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Contenido de la Consulta</label>
                  <textarea
                    rows={4}
                    required
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Describe tu duda técnica o experiencia en cabina..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publicar en la Comunidad</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Post Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`bg-white rounded-2xl p-6 border shadow-xs space-y-3 transition-all ${
              post.isPinned ? 'border-rose-200 bg-rose-50/20' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs border border-rose-200">
                  {post.authorAvatar}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-xs">{post.author}</span>
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded">
                      {post.authorRole}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">{post.timeAgo}</p>
                </div>
              </div>

              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                {post.category}
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 font-display">{post.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{post.content}</p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1.5 text-rose-600 font-semibold hover:text-rose-700">
                  <Heart className="w-4 h-4 fill-rose-100" />
                  <span>{post.likes}</span>
                </button>
                <span className="flex items-center space-x-1.5 text-slate-500">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.replies} respuestas</span>
                </span>
              </div>

              <span className="flex items-center space-x-1 text-slate-400 text-[11px]">
                <Eye className="w-3.5 h-3.5" />
                <span>{post.views} vistas</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ActiveLearningTracker } from '@/components/shared/ActiveLearningTracker';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Award,
  MessageSquare,
  ShieldCheck,
  Users,
  Calendar,
  Video,
  FileCheck,
  Sparkles,
  Layers,
  User,
  Trophy,
  HelpCircle,
  Bell,
  Search,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function CampusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const demoStudentId = '22222222-2222-2222-2222-222222222222';
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Práctica 01 Evaluada',
      text: 'Laura Gómez calificó tu entrega de técnica clásica con 86/100.',
      time: 'Hace 2 horas',
      href: '/campus/practicas',
      unread: true,
    },
    {
      id: 2,
      title: 'Nueva Tutoría Programada',
      text: 'Sesión 1 a 1 confirmada para el martes a las 18:30h.',
      time: 'Hace 1 día',
      href: '/campus/tutorias',
      unread: false,
    },
    {
      id: 3,
      title: 'Respuesta en Comunidad',
      text: 'Laura Gómez respondió a tu duda sobre higrómetros en cabina.',
      time: 'Hace 2 días',
      href: '/campus/comunidad',
      unread: false,
    },
  ];

  const navItems = [
    { label: 'Mi Panel', href: '/campus', icon: LayoutDashboard },
    { label: 'Mis Cursos', href: '/campus/cursos/c1000000-0000-0000-0000-000000000001', icon: BookOpen },
    { label: 'Prácticas & Rúbrica', href: '/campus/practicas', icon: FileCheck },
    { label: 'Proyectos & Galería', href: '/campus/proyectos', icon: Layers },
    { label: 'Mensajes con Tutora', href: '/campus/mensajes', icon: MessageSquare },
    { label: 'Comunidad Beauty', href: '/campus/comunidad', icon: Users },
    { label: 'Tutorías 1 a 1', href: '/campus/tutorias', icon: Video },
    { label: 'Mis Logros & Badges', href: '/campus/logros', icon: Trophy, color: 'text-amber-500' },
    { label: 'Calendario', href: '/campus/calendario', icon: Calendar },
    { label: 'Mi Certificación', href: '/campus/certificado', icon: Award, color: 'text-emerald-600' },
    { label: 'Mi Perfil & Facturas', href: '/campus/perfil', icon: User },
    { label: 'Centro de Soporte', href: '/campus/soporte', icon: HelpCircle },
    { label: 'Inspección Auditoría', href: '/auditoria', icon: ShieldCheck, color: 'text-emerald-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800">
      {/* Sidebar Navigation (Clean White Theme) */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between shrink-0 shadow-sm">
        <div className="space-y-6">
          <Link href="/campus" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-fabi-pink to-fabi-darkpink flex items-center justify-center font-bold text-white shadow-md shadow-fabi-pink/20 group-hover:scale-105 transition-transform">
              FS
            </div>
            <div>
              <span className="font-display font-bold text-slate-900 text-base">Campus Alumna</span>
              <span className="block text-[9px] text-fabi-pink font-bold uppercase tracking-wider">FABY STUDIO ACADEMY</span>
            </div>
          </Link>

          <nav className="space-y-1 text-xs font-medium">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-rose-50 border border-rose-200 text-rose-700 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${item.color || (isActive ? 'text-rose-600' : 'text-slate-400')}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Demo Switcher Footer */}
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <Link
            href="/demo"
            className="w-full bg-rose-50 border border-rose-200 hover:bg-fabi-pink text-rose-700 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Role Switcher Demo</span>
          </Link>

          <Link href="/campus/perfil" className="flex items-center space-x-3 pt-1 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 border border-rose-300 flex items-center justify-center font-bold text-xs">
              LM
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-slate-900 truncate">Lucía Martínez</p>
              <p className="text-[10px] text-slate-500 truncate">Alumna Activa (68%)</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Campus Header (Clean White Theme) */}
        <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between shadow-xs sticky top-0 z-40">
          <div className="flex items-center space-x-3 text-xs font-medium text-slate-500 truncate">
            <Link href="/" className="hover:text-slate-900 transition-colors">FABY STUDIO</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Campus Virtual</span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-9 h-9 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-900 relative transition-colors"
                title="Notificaciones"
              >
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-rose-600 absolute top-2 right-2 ring-2 ring-white" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl p-4 space-y-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-900">Notificaciones Recientes</span>
                    <span className="text-[10px] text-rose-600 font-semibold">1 nueva</span>
                  </div>

                  <div className="space-y-2">
                    {notifications.map((n) => (
                      <Link
                        key={n.id}
                        href={n.href}
                        onClick={() => setShowNotifications(false)}
                        className={`block p-2.5 rounded-xl text-xs transition-colors ${
                          n.unread ? 'bg-rose-50/60 border border-rose-100' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <p className="font-bold text-slate-900">{n.title}</p>
                          <span className="text-[9px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">{n.text}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <ActiveLearningTracker userId={demoStudentId} />
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

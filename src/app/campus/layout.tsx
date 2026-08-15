'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ActiveLearningTracker } from '@/components/shared/ActiveLearningTracker';
import { getSession, signOut, type DemoSession } from '@/lib/demo-auth';
import {
  LayoutDashboard,
  BookOpen,
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
  CheckCircle2,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

export default function CampusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<DemoSession | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const demoStudentId = '22222222-2222-2222-2222-222222222222';

  // ── Auth Guard ────────────────────────────────────────────────────────────
  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.replace('/login');
      return;
    }
    setSession(s);
    setAuthChecked(true);
  }, [router]);

  // ── Cerrar notificaciones al hacer click fuera ─────────────────────────────
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ── Cerrar sidebar en cambio de ruta ──────────────────────────────────────
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleSignOut = () => {
    signOut();
    router.push('/login');
  };

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

  // ── Loading state while auth checks ───────────────────────────────────────
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fabi-pink to-fabi-darkpink flex items-center justify-center font-bold text-white shadow-md animate-pulse">
            FS
          </div>
          <p className="text-xs text-slate-500 font-medium">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  const user = session?.user;
  const displayName = user?.full_name || 'Alumna';
  const avatarInitials = user?.avatar || displayName.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
  const courseLabel = user?.course ? `${user.course.slice(0, 20)}...` : 'Alumna Activa';

  // ── Shared Sidebar Content ─────────────────────────────────────────────────
  const SidebarContent = () => (
    <>
      <div className="space-y-6 flex-1 overflow-y-auto">
        <Link href="/campus" className="flex items-center space-x-3 group" onClick={() => setSidebarOpen(false)}>
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

      {/* User Profile & Actions Footer */}
      <div className="pt-4 border-t border-slate-200 space-y-3 shrink-0">
        <Link
          href="/demo"
          className="w-full bg-rose-50 border border-rose-200 hover:bg-fabi-pink text-rose-700 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Role Switcher Demo</span>
        </Link>

        <div className="flex items-center justify-between pt-1">
          <Link href="/campus/perfil" className="flex items-center space-x-3 hover:opacity-80 transition-opacity min-w-0">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 border border-rose-300 flex items-center justify-center font-bold text-xs shrink-0">
              {avatarInitials}
            </div>
            <div className="truncate min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">{displayName}</p>
              <p className="text-[10px] text-slate-500 truncate">{courseLabel}</p>
            </div>
          </Link>

          <button
            onClick={handleSignOut}
            title="Cerrar sesión"
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-500 flex items-center justify-center transition-colors shrink-0 ml-2"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* ── Mobile Sidebar Overlay ─────────────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Mobile Sidebar Slide-in ────────────────────────────────────────── */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-slate-200 p-5 flex flex-col z-50 shadow-xl transition-transform duration-300 md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <SidebarContent />
      </aside>

      <div className="flex flex-col md:flex-row min-h-screen">
        {/* ── Desktop Sidebar ──────────────────────────────────────────────── */}
        <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 p-5 flex-col justify-between shrink-0 shadow-sm sticky top-0 h-screen">
          <SidebarContent />
        </aside>

        {/* ── Main Content ─────────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Campus Header */}
          <header className="h-16 border-b border-slate-200 bg-white px-4 sm:px-6 flex items-center justify-between shadow-xs sticky top-0 z-30">
            <div className="flex items-center space-x-3">
              {/* Hamburger — mobile only */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden w-9 h-9 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
                title="Menú"
              >
                <Menu className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2 text-xs font-medium text-slate-500 truncate">
                <Link href="/" className="hover:text-slate-900 transition-colors hidden sm:block">FABY STUDIO</Link>
                <span className="hidden sm:block">/</span>
                <span className="text-slate-900 font-semibold">Campus Virtual</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Notification Bell */}
              <div className="relative" ref={notifRef}>
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
                            <span className="text-[9px] text-slate-400 shrink-0 ml-2">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-0.5">{n.text}</p>
                          {n.unread && (
                            <div className="flex items-center space-x-1 mt-1">
                              <CheckCircle2 className="w-3 h-3 text-rose-500" />
                              <span className="text-[10px] text-rose-600 font-medium">Marcar como leída</span>
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-slate-100 pt-2 text-center">
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-[11px] text-slate-500 hover:text-slate-900 font-semibold transition-colors"
                      >
                        Ver todas las notificaciones
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <ActiveLearningTracker userId={demoStudentId} />
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

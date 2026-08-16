'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { StreakTracker } from '@/components/shared/StreakTracker';
import { NotificationCenter } from '@/components/layout/NotificationCenter';
import { createClient } from '@/lib/supabase/client';
import {
  LayoutDashboard,
  BookOpen,
  Award,
  MessageSquare,
  Users,
  Video,
  FileCheck,
  User,
  LogOut,
  Menu,
  X,
  Calculator,
} from 'lucide-react';

interface CampusSession {
  user: {
    id: string;
    email: string;
    full_name: string;
    avatar_url: string | null;
  };
}

export default function CampusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<CampusSession | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Auth Guard ────────────────────────────────────────────────────────────
  useEffect(() => {
    const loadSession = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.replace('/login');
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('id', user.id)
          .maybeSingle();

        setSession({
          user: {
            id: user.id,
            email: user.email ?? '',
            full_name:
              profile?.full_name ??
              (typeof user.user_metadata?.full_name === 'string'
                ? user.user_metadata.full_name
                : user.email?.split('@')[0] ?? 'Alumna'),
            avatar_url: profile?.avatar_url ?? null,
          },
        });
        setAuthChecked(true);
      } catch {
        router.replace('/login?error=config');
      }
    };

    void loadSession();
  }, [router]);

  // ── Cerrar sidebar en cambio de ruta ──────────────────────────────────────
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace('/login');
    router.refresh();
  };

  const navItems = [
    { label: 'Mi Panel', href: '/campus', icon: LayoutDashboard },
    { label: 'Mis Cursos', href: '/campus/cursos/c1000000-0000-0000-0000-000000000001', icon: BookOpen },
    { label: 'Prácticas & Rúbrica', href: '/campus/practicas', icon: FileCheck },
    { label: 'Calculadora Salón', href: '/campus/calculadora', icon: Calculator, color: 'text-emerald-600' },
    { label: 'Mensajes con Tutora', href: '/campus/mensajes', icon: MessageSquare },
    { label: 'Comunidad Beauty', href: '/campus/comunidad', icon: Users },
    { label: 'Tutorías 1 a 1', href: '/campus/tutorias', icon: Video },
    { label: 'Mis Certificados', href: '/campus/certificado', icon: Award, color: 'text-emerald-600' },
    { label: 'Mi Perfil & Seguridad', href: '/campus/perfil', icon: User },
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
  const avatarInitials = displayName.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
  const courseLabel = 'Alumna activa';

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
              <StreakTracker />
              <NotificationCenter />
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

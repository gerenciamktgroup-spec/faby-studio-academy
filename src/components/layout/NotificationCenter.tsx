'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell, Calendar, FileCheck, Sparkles, Zap } from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  link_url: string | null;
  is_read: boolean;
  created_at: string;
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    void fetch('/api/notifications', { cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) throw new Error('No se pudieron cargar las notificaciones.');
        return (await response.json()) as { notifications: NotificationItem[] };
      })
      .then((payload) => {
        if (active) setNotifications(payload.notifications);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const unreadCount = notifications.filter((item) => !item.is_read).length;

  const markRead = async (id?: string) => {
    const previous = notifications;
    setNotifications((items) =>
      items.map((item) => (!id || item.id === id ? { ...item, is_read: true } : item))
    );

    const response = await fetch('/api/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id ? { id } : { all: true }),
    });
    if (!response.ok) setNotifications(previous);
  };

  const getIcon = (type: string) => {
    if (type === 'feedback') return <FileCheck className="w-4 h-4 text-rose-600" />;
    if (type === 'streak') return <Zap className="w-4 h-4 text-amber-500" />;
    if (type === 'tutoring') return <Calendar className="w-4 h-4 text-indigo-600" />;
    return <Sparkles className="w-4 h-4 text-emerald-600" />;
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        title="Centro de notificaciones"
        aria-label="Abrir notificaciones"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0.5 right-0.5 min-w-4 h-4 px-1 bg-rose-600 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <button className="fixed inset-0 z-40 cursor-default" onClick={() => setIsOpen(false)} aria-label="Cerrar notificaciones" />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl border border-slate-200 shadow-2xl p-5 z-50 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 font-display">Notificaciones</h3>
              {unreadCount > 0 && (
                <button type="button" onClick={() => void markRead()} className="text-[11px] font-bold text-rose-600 hover:underline">
                  Marcar todas como leídas
                </button>
              )}
            </div>

            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {loading && <p className="py-8 text-center text-slate-500">Cargando…</p>}
              {!loading && notifications.length === 0 && (
                <p className="py-8 text-center text-slate-500">No tienes notificaciones.</p>
              )}
              {notifications.map((item) => (
                <Link
                  key={item.id}
                  href={item.link_url || '/campus'}
                  onClick={() => {
                    setIsOpen(false);
                    if (!item.is_read) void markRead(item.id);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start space-x-3 group ${
                    item.is_read ? 'bg-white border-slate-100' : 'bg-rose-50/40 border-rose-100'
                  }`}
                >
                  <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    {getIcon(item.type)}
                  </span>
                  <span className="space-y-1 flex-1 min-w-0">
                    <span className="flex items-start justify-between gap-2">
                      <span className="font-bold text-slate-900 leading-tight">{item.title}</span>
                      <time className="text-[9px] text-slate-400 shrink-0" dateTime={item.created_at}>
                        {new Intl.DateTimeFormat('es', { day: '2-digit', month: 'short' }).format(new Date(item.created_at))}
                      </time>
                    </span>
                    <span className="text-[11px] text-slate-600 leading-relaxed block">{item.message}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

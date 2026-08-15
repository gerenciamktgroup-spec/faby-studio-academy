'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, CheckCircle2, ChevronRight, Sparkles, FileCheck, Calendar, Zap } from 'lucide-react';
import { InAppNotification } from '@/types/skills';
import { getDemoNotifications } from '@/lib/services-demo/skills-service';

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<InAppNotification[]>(() => getDemoNotifications());

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'feedback':
        return <FileCheck className="w-4 h-4 text-rose-600" />;
      case 'streak':
        return <Zap className="w-4 h-4 text-amber-500" />;
      case 'tutoring':
        return <Calendar className="w-4 h-4 text-indigo-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="relative">
      {/* Bell Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        title="Centro de Notificaciones"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl border border-slate-200 shadow-2xl p-5 z-50 space-y-4 animate-in fade-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-slate-800" />
                <h3 className="font-bold text-slate-900 font-display">Notificaciones</h3>
                {unreadCount > 0 && (
                  <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {unreadCount} nuevas
                  </span>
                )}
              </div>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllAsRead}
                  className="text-[11px] font-bold text-rose-600 hover:underline"
                >
                  Marcar leídas
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {notifications.map((notif) => (
                <Link
                  key={notif.id}
                  href={notif.link_url || '#'}
                  onClick={() => setIsOpen(false)}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start space-x-3 block group ${
                    notif.is_read
                      ? 'bg-white border-slate-100 hover:border-slate-300'
                      : 'bg-rose-50/40 border-rose-100 hover:border-rose-200'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                    {getIcon(notif.type)}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-slate-900 leading-tight group-hover:text-rose-600 transition-colors">
                        {notif.title}
                      </p>
                      <span className="text-[10px] text-slate-400 shrink-0">{notif.created_at}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{notif.message}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

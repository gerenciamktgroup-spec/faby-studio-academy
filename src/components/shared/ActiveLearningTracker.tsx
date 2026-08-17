'use client';

import React, { useEffect, useState, useRef } from 'react';

interface ActiveLearningTrackerProps {
  courseId?: string;
  lessonId?: string;
}

export function ActiveLearningTracker({ courseId, lessonId }: ActiveLearningTrackerProps) {
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [activeSeconds, setActiveSeconds] = useState(0);

  const sessionIdRef = useRef<string>('');
  const lastUserActionRef = useRef<number>(Date.now());
  const tabVisibleRef = useRef(true);
  const videoPlayingRef = useRef(false);

  useEffect(() => {
    // Generate or retrieve session ID for current browser tab
    let existingSession = sessionStorage.getItem('fabi_session_id');
    if (!existingSession) {
      existingSession = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      sessionStorage.setItem('fabi_session_id', existingSession);
    }
    sessionIdRef.current = existingSession;

    // Track tab visibility changes
    const handleVisibilityChange = () => {
      const visible = !document.hidden;
      tabVisibleRef.current = visible;
      setIsTabVisible(visible);
    };

    // Track user mouse/keyboard activity
    const handleUserInteraction = () => {
      lastUserActionRef.current = Date.now();
    };

    // Video play/pause detectors
    const handleVideoPlay = () => { videoPlayingRef.current = true; };
    const handleVideoPause = () => { videoPlayingRef.current = false; };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('mousemove', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);
    window.addEventListener('scroll', handleUserInteraction);

    const videoElements = document.querySelectorAll('video');
    videoElements.forEach(video => {
      video.addEventListener('play', handleVideoPlay);
      video.addEventListener('pause', handleVideoPause);
      video.addEventListener('ended', handleVideoPause);
    });

    // Send heartbeat every 45 seconds
    const interval = setInterval(async () => {
      const timeSinceLastAction = Date.now() - lastUserActionRef.current;
      const hasRecentInteraction = timeSinceLastAction < 120000;
      try {
        const response = await fetch('/api/audit/heartbeat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            isTabVisible: tabVisibleRef.current,
            isVideoPlaying: videoPlayingRef.current,
            hasRecentInteraction,
            courseId,
            lessonId,
          }),
        });
        if (response.ok) {
          const result = (await response.json()) as { activeSecondsAdded?: number };
          setActiveSeconds((value) => value + (result.activeSecondsAdded ?? 0));
        }
      } catch (err) {
        console.error('Heartbeat transmission error:', err);
      }
    }, 45000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mousemove', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
      clearInterval(interval);
    };
  }, [courseId, lessonId]);

  const activeMinutes = Math.floor(activeSeconds / 60);

  return (
    <div className="flex items-center space-x-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium">
      <span className="relative flex h-2.5 w-2.5">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
            isTabVisible ? 'bg-emerald-400 opacity-75' : 'bg-amber-400 opacity-75'
          }`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
            isTabVisible ? 'bg-emerald-500' : 'bg-amber-500'
          }`}
        ></span>
      </span>
      <span className="text-slate-600">
        Estudio activo:{' '}
        <strong className="text-rose-600">{activeMinutes} min</strong>
      </span>
      <span className="text-slate-400 text-[10px]">trazable</span>
    </div>
  );
}

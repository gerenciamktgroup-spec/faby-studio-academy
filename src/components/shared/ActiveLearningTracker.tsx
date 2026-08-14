'use client';

import React, { useEffect, useState, useRef } from 'react';

interface ActiveLearningTrackerProps {
  userId: string;
  courseId?: string;
  lessonId?: string;
}

export function ActiveLearningTracker({ userId, courseId, lessonId }: ActiveLearningTrackerProps) {
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [lastUserAction, setLastUserAction] = useState<number>(Date.now());
  const [activeSeconds, setActiveSeconds] = useState(0);

  const sessionIdRef = useRef<string>('');

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
      setIsTabVisible(!document.hidden);
    };

    // Track user mouse/keyboard activity
    const handleUserInteraction = () => {
      setLastUserAction(Date.now());
    };

    // Video play/pause detectors
    const handleVideoPlay = () => setIsVideoPlaying(true);
    const handleVideoPause = () => setIsVideoPlaying(false);

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
      const timeSinceLastAction = Date.now() - lastUserAction;
      const isUserActive = isTabVisible && (timeSinceLastAction < 120000 || isVideoPlaying);

      if (isUserActive) {
        setActiveSeconds(prev => prev + 45);
      }

      try {
        await fetch('/api/audit/heartbeat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            sessionId: sessionIdRef.current,
            isTabVisible,
            isVideoPlaying,
            courseId,
            lessonId,
          }),
        });
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
  }, [userId, courseId, lessonId, isTabVisible, isVideoPlaying, lastUserAction]);

  const activeMinutes = Math.floor(activeSeconds / 60);

  return (
    <div className="flex items-center space-x-2 bg-fabi-charcoal/80 border border-fabi-border px-3 py-1.5 rounded-full text-xs font-medium">
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
      <span className="text-gray-300">
        Active Training:{' '}
        <strong className="text-fabi-pink">{activeMinutes}m active</strong>
      </span>
      <span className="text-gray-500 text-[10px]">TMS/369 Compliance</span>
    </div>
  );
}

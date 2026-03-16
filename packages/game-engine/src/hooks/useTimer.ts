import { useState, useEffect, useRef, useCallback } from 'react';
import { formatTime, calculateRemainingTime } from '../utils/timer';

export interface UseTimerOptions {
  duration: number; // Toplam süre (saniye)
  autoStart?: boolean; // Otomatik başlat
  onTick?: (remainingSeconds: number) => void; // Her saniye callback
  onComplete?: () => void; // Süre dolduğunda callback
  onWarning?: (remainingSeconds: number) => void; // Uyarı callback
  warningThreshold?: number; // Uyarı eşiği (saniye)
}

export interface UseTimerReturn {
  remainingSeconds: number;
  formattedTime: string;
  isRunning: boolean;
  isCompleted: boolean;
  progress: number; // 0-100 arası yüzde
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  addTime: (seconds: number) => void;
}

/**
 * Zamanlayıcı hook'u
 * @param options - Timer seçenekleri
 * @returns Timer state ve kontrol fonksiyonları
 */
export function useTimer(options: UseTimerOptions): UseTimerReturn {
  const {
    duration,
    autoStart = false,
    onTick,
    onComplete,
    onWarning,
    warningThreshold = 10,
  } = options;

  const [remainingSeconds, setRemainingSeconds] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isCompleted, setIsCompleted] = useState(false);

  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(duration);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const warningShownRef = useRef(false);

  // Timer'ı temizle
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Timer'ı başlat
  const start = useCallback(() => {
    if (isCompleted) return;

    startTimeRef.current = Date.now();
    pausedTimeRef.current = remainingSeconds;
    setIsRunning(true);
    warningShownRef.current = false;
  }, [isCompleted, remainingSeconds]);

  // Timer'ı duraklat
  const pause = useCallback(() => {
    setIsRunning(false);
    pausedTimeRef.current = remainingSeconds;
    clearTimer();
  }, [remainingSeconds, clearTimer]);

  // Timer'ı devam ettir
  const resume = useCallback(() => {
    if (isCompleted) return;
    start();
  }, [isCompleted, start]);

  // Timer'ı sıfırla
  const reset = useCallback(() => {
    clearTimer();
    setRemainingSeconds(duration);
    setIsRunning(false);
    setIsCompleted(false);
    startTimeRef.current = null;
    pausedTimeRef.current = duration;
    warningShownRef.current = false;
  }, [duration, clearTimer]);

  // Süre ekle
  const addTime = useCallback((seconds: number) => {
    setRemainingSeconds((prev: number) => {
      const newTime = Math.max(0, prev + seconds);
      pausedTimeRef.current = newTime;
      return newTime;
    });
  }, []);

  // Timer tick effect
  useEffect(() => {
    if (!isRunning || isCompleted) {
      clearTimer();
      return;
    }

    intervalRef.current = setInterval(() => {
      if (startTimeRef.current === null) return;

      const remaining = calculateRemainingTime(startTimeRef.current, pausedTimeRef.current);

      setRemainingSeconds(remaining);

      // Tick callback
      if (onTick) {
        onTick(remaining);
      }

      // Warning callback
      if (!warningShownRef.current && remaining <= warningThreshold && remaining > 0 && onWarning) {
        warningShownRef.current = true;
        onWarning(remaining);
      }

      // Süre doldu
      if (remaining === 0) {
        setIsRunning(false);
        setIsCompleted(true);
        clearTimer();

        if (onComplete) {
          onComplete();
        }
      }
    }, 1000);

    return () => clearTimer();
  }, [isRunning, isCompleted, onTick, onComplete, onWarning, warningThreshold, clearTimer]);

  // Auto-start effect
  useEffect(() => {
    if (autoStart && !isRunning && !isCompleted) {
      start();
    }
  }, [autoStart, isRunning, isCompleted, start]);

  // Progress hesaplama
  const progress = duration > 0 ? ((duration - remainingSeconds) / duration) * 100 : 0;

  return {
    remainingSeconds,
    formattedTime: formatTime(remainingSeconds),
    isRunning,
    isCompleted,
    progress,
    start,
    pause,
    resume,
    reset,
    addTime,
  };
}

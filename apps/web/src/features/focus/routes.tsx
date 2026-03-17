/**
 * Focus Routes
 * Odaklanma egzersizleri route tanımları
 */

import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const FocusMenu = lazy(() => import('./FocusMenu'));
const FocusExercise = lazy(() => import('./FocusExercise'));
const PomodoroTimer = lazy(() => import('./PomodoroTimer'));
const AttentionTrackingGame = lazy(() => import('./AttentionTrackingGame'));
const ColorMatchGame = lazy(() => import('./ColorMatchGame'));
const MemoryCardsGame = lazy(() => import('./MemoryCardsGame'));

export function FocusRoutes() {
  return (
    <Routes>
      <Route index element={<FocusMenu />} />
      <Route path="exercise" element={<FocusExercise />} />
      <Route path="pomodoro" element={<PomodoroTimer />} />
      <Route path="attention-tracking" element={<AttentionTrackingGame />} />
      <Route path="color-match" element={<ColorMatchGame />} />
      <Route path="memory-cards" element={<MemoryCardsGame />} />
    </Routes>
  );
}

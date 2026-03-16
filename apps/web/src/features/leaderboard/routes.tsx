/**
 * Leaderboard Routes
 * Liderlik tablosu route tanımları
 */

import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const LeaderboardPage = lazy(() => import('./LeaderboardPage'));

export function LeaderboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LeaderboardPage />} />
    </Routes>
  );
}

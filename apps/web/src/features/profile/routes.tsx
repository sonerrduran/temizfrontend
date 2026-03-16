/**
 * Profile Routes
 * Profil sayfası route tanımları
 */

import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const ProfilePage = lazy(() => import('./ProfilePage'));

export function ProfileRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProfilePage />} />
    </Routes>
  );
}

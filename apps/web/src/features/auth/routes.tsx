/**
 * Auth Routes
 * Kimlik doğrulama route tanımları
 * 
 * Requirements: FR-2.2, FR-7.1, FR-7.3
 */

import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

// Lazy load auth pages
const LoginPage = lazy(() => import('./LoginPage'));
const RegisterPage = lazy(() => import('./RegisterPage'));

/**
 * AuthRoutes Component
 * Handles authentication-related routes (login, register)
 * Redirects to dashboard if already authenticated
 */
export function AuthRoutes() {
  const { isAuthenticated } = useAuthStore();

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Default redirect to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

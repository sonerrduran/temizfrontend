/**
 * Dashboard Routes
 * Role-based dashboard route tanımları
 * 
 * Requirements: FR-2.2, FR-6.1, FR-6.2
 */

import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

// Lazy load dashboard components
const StudentDashboard = lazy(() => import('./StudentDashboard'));
const TeacherDashboard = lazy(() => import('./TeacherDashboard'));
const AdminDashboard = lazy(() => import('./AdminDashboard'));
const ParentDashboard = lazy(() => import('./ParentDashboard'));

/**
 * DashboardRoutes Component
 * Renders the appropriate dashboard based on user role
 */
export function DashboardRoutes() {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role mapping - normalize role names
  const roleMap: Record<string, string> = {
    STUDENT: 'student',
    TEACHER: 'teacher',
    PARENT: 'parent',
    SUPER_ADMIN: 'admin',
    SCHOOL_ADMIN: 'admin',
  };

  const normalizedRole = roleMap[user.role] || 'student';

  // Render appropriate dashboard based on role
  const getDashboardComponent = () => {
    switch (normalizedRole) {
      case 'teacher':
        return <TeacherDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'parent':
        return <ParentDashboard />;
      case 'student':
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <Routes>
      <Route path="/" element={getDashboardComponent()} />
    </Routes>
  );
}

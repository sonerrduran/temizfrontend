/**
 * Dashboard Router
 * Role-based dashboard routing
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import StudentDashboard from '../features/dashboard/StudentDashboard';
import TeacherDashboard from '../features/dashboard/TeacherDashboard';
import AdminDashboard from '../features/dashboard/AdminDashboard';
import ParentDashboard from '../features/dashboard/ParentDashboard';

export function DashboardRouter() {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role mapping
  const roleMap: Record<string, string> = {
    STUDENT: 'student',
    TEACHER: 'teacher',
    PARENT: 'parent',
    SUPER_ADMIN: 'admin',
    SCHOOL_ADMIN: 'admin',
  };

  const normalizedRole = roleMap[user.role] || 'student';

  // Render appropriate dashboard based on role
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
}

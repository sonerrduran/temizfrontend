/**
 * Protected Route Component
 * 
 * Implements route guards for:
 * - Authentication check (user must be logged in)
 * - Role-based access control (STUDENT, TEACHER, ADMIN, PARENT)
 * 
 * Requirements: FR-2.3, FR-7.4
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────

/**
 * User roles supported by the application
 */
export type UserRole = 'student' | 'teacher' | 'parent' | 'admin';

/**
 * Backend role types (from API)
 */
export type BackendRole = 'STUDENT' | 'TEACHER' | 'PARENT' | 'SCHOOL_ADMIN' | 'SUPER_ADMIN';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /**
   * Required role to access this route
   * If not specified, any authenticated user can access
   */
  requiredRole?: UserRole;
  /**
   * Multiple roles that can access this route
   * Alternative to requiredRole for routes accessible by multiple roles
   */
  allowedRoles?: UserRole[];
  /**
   * Custom redirect path if unauthorized
   * Defaults to /unauthorized
   */
  redirectTo?: string;
}

// ─────────────────────────────────────────────────────────
// Role Mapping
// ─────────────────────────────────────────────────────────

/**
 * Maps backend roles to frontend normalized roles
 */
const ROLE_MAP: Record<BackendRole, UserRole> = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  PARENT: 'parent',
  SCHOOL_ADMIN: 'admin',
  SUPER_ADMIN: 'admin',
};

/**
 * Normalizes backend role to frontend role
 */
function normalizeRole(backendRole: string): UserRole {
  return ROLE_MAP[backendRole as BackendRole] || 'student';
}

// ─────────────────────────────────────────────────────────
// Protected Route Component
// ─────────────────────────────────────────────────────────

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  allowedRoles,
  redirectTo = '/unauthorized' 
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();

  // Check 1: Authentication
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check 2: Role-based access control
  if ((requiredRole || allowedRoles) && user) {
    const userRole = normalizeRole(user.role);
    
    // Check single required role
    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to={redirectTo} replace />;
    }
    
    // Check multiple allowed roles
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return <Navigate to={redirectTo} replace />;
    }
  }

  return <>{children}</>;
}

// ─────────────────────────────────────────────────────────
// Convenience Components for Specific Roles
// ─────────────────────────────────────────────────────────

/**
 * Route accessible only by students
 */
export function StudentRoute({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute requiredRole="student">{children}</ProtectedRoute>;
}

/**
 * Route accessible only by teachers
 */
export function TeacherRoute({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute requiredRole="teacher">{children}</ProtectedRoute>;
}

/**
 * Route accessible only by admins
 */
export function AdminRoute({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>;
}

/**
 * Route accessible only by parents
 */
export function ParentRoute({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute requiredRole="parent">{children}</ProtectedRoute>;
}

/**
 * Route accessible by teachers and admins
 */
export function TeacherOrAdminRoute({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute allowedRoles={['teacher', 'admin']}>{children}</ProtectedRoute>;
}

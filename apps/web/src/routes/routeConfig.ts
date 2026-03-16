/**
 * Route Configuration
 * 
 * Central configuration for all application routes.
 * This file serves as documentation and type-safe route definitions.
 * 
 * Requirements: FR-2.1, FR-2.3
 */

import { UserRole } from './ProtectedRoute';

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────

export interface RouteDefinition {
  path: string;
  name: string;
  description: string;
  isPublic: boolean;
  requiredRole?: UserRole;
  allowedRoles?: UserRole[];
}

export interface RouteCategory {
  category: string;
  routes: RouteDefinition[];
}

// ─────────────────────────────────────────────────────────
// Public Routes
// ─────────────────────────────────────────────────────────

export const PUBLIC_ROUTES: RouteDefinition[] = [
  {
    path: '/login',
    name: 'Login',
    description: 'User login page',
    isPublic: true,
  },
  {
    path: '/register',
    name: 'Register',
    description: 'User registration page',
    isPublic: true,
  },
];

// ─────────────────────────────────────────────────────────
// Protected Routes - Dashboard
// ─────────────────────────────────────────────────────────

export const DASHBOARD_ROUTES: RouteDefinition[] = [
  {
    path: '/',
    name: 'Dashboard',
    description: 'Main dashboard (role-based)',
    isPublic: false,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    description: 'Main dashboard (role-based)',
    isPublic: false,
  },
];

// ─────────────────────────────────────────────────────────
// Protected Routes - Student Features
// ─────────────────────────────────────────────────────────

export const STUDENT_FEATURE_ROUTES: RouteDefinition[] = [
  {
    path: '/profile',
    name: 'Profile',
    description: 'User profile and settings',
    isPublic: false,
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    description: 'Global and game-specific leaderboards',
    isPublic: false,
  },
  {
    path: '/games',
    name: 'Games',
    description: 'Game browser and game player',
    isPublic: false,
  },
  {
    path: '/lessons',
    name: 'Lessons',
    description: 'Academic lessons by subject and grade',
    isPublic: false,
  },
];

// ─────────────────────────────────────────────────────────
// Protected Routes - Activity Features
// ─────────────────────────────────────────────────────────

export const ACTIVITY_ROUTES: RouteDefinition[] = [
  {
    path: '/fast-reading',
    name: 'Fast Reading',
    description: 'Speed reading exercises',
    isPublic: false,
  },
  {
    path: '/focus',
    name: 'Focus',
    description: 'Concentration and focus exercises',
    isPublic: false,
  },
  {
    path: '/learning',
    name: 'Learning',
    description: 'Learning tools and resources',
    isPublic: false,
  },
  {
    path: '/language',
    name: 'Language',
    description: 'Language learning activities',
    isPublic: false,
  },
  {
    path: '/teacher-tools',
    name: 'Teacher Tools',
    description: 'Tools for teachers (whiteboard, timer, etc.)',
    isPublic: false,
  },
  {
    path: '/stories',
    name: 'Stories',
    description: 'Interactive stories',
    isPublic: false,
  },
  {
    path: '/life-skills',
    name: 'Life Skills',
    description: 'Life skills education (first aid, traffic, hygiene, etc.)',
    isPublic: false,
  },
];

// ─────────────────────────────────────────────────────────
// Role-Based Routes
// ─────────────────────────────────────────────────────────

export const STUDENT_ROUTES: RouteDefinition[] = [
  {
    path: '/student',
    name: 'Student Dashboard',
    description: 'Student-specific dashboard',
    isPublic: false,
    requiredRole: 'student',
  },
];

export const TEACHER_ROUTES: RouteDefinition[] = [
  {
    path: '/teacher',
    name: 'Teacher Dashboard',
    description: 'Teacher-specific dashboard',
    isPublic: false,
    requiredRole: 'teacher',
  },
];

export const ADMIN_ROUTES: RouteDefinition[] = [
  {
    path: '/admin',
    name: 'Admin Dashboard',
    description: 'Admin-specific dashboard',
    isPublic: false,
    requiredRole: 'admin',
  },
];

export const PARENT_ROUTES: RouteDefinition[] = [
  {
    path: '/parent',
    name: 'Parent Dashboard',
    description: 'Parent-specific dashboard',
    isPublic: false,
    requiredRole: 'parent',
  },
];

// ─────────────────────────────────────────────────────────
// Error Routes
// ─────────────────────────────────────────────────────────

export const ERROR_ROUTES: RouteDefinition[] = [
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    description: 'Access denied page',
    isPublic: true,
  },
  {
    path: '/404',
    name: 'Not Found',
    description: '404 page not found',
    isPublic: true,
  },
];

// ─────────────────────────────────────────────────────────
// All Routes (Categorized)
// ─────────────────────────────────────────────────────────

export const ALL_ROUTES: RouteCategory[] = [
  {
    category: 'Public',
    routes: PUBLIC_ROUTES,
  },
  {
    category: 'Dashboard',
    routes: DASHBOARD_ROUTES,
  },
  {
    category: 'Student Features',
    routes: STUDENT_FEATURE_ROUTES,
  },
  {
    category: 'Activities',
    routes: ACTIVITY_ROUTES,
  },
  {
    category: 'Student',
    routes: STUDENT_ROUTES,
  },
  {
    category: 'Teacher',
    routes: TEACHER_ROUTES,
  },
  {
    category: 'Admin',
    routes: ADMIN_ROUTES,
  },
  {
    category: 'Parent',
    routes: PARENT_ROUTES,
  },
  {
    category: 'Error',
    routes: ERROR_ROUTES,
  },
];

// ─────────────────────────────────────────────────────────
// Route Path Constants
// ─────────────────────────────────────────────────────────

/**
 * Type-safe route paths
 * Use these constants instead of hardcoded strings
 */
export const ROUTES = {
  // Public
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Dashboard
  HOME: '/',
  DASHBOARD: '/dashboard',
  
  // Student Features
  PROFILE: '/profile',
  LEADERBOARD: '/leaderboard',
  GAMES: '/games',
  LESSONS: '/lessons',
  
  // Activities
  FAST_READING: '/fast-reading',
  FOCUS: '/focus',
  LEARNING: '/learning',
  LANGUAGE: '/language',
  TEACHER_TOOLS: '/teacher-tools',
  STORIES: '/stories',
  LIFE_SKILLS: '/life-skills',
  
  // Role-based
  STUDENT: '/student',
  TEACHER: '/teacher',
  ADMIN: '/admin',
  PARENT: '/parent',
  
  // Error
  UNAUTHORIZED: '/unauthorized',
  NOT_FOUND: '/404',
} as const;

// ─────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────

/**
 * Get route definition by path
 */
export function getRouteByPath(path: string): RouteDefinition | undefined {
  for (const category of ALL_ROUTES) {
    const route = category.routes.find((r) => r.path === path);
    if (route) return route;
  }
  return undefined;
}

/**
 * Check if a route is public
 */
export function isPublicRoute(path: string): boolean {
  const route = getRouteByPath(path);
  return route?.isPublic ?? false;
}

/**
 * Get all routes for a specific role
 */
export function getRoutesByRole(role: UserRole): RouteDefinition[] {
  const routes: RouteDefinition[] = [];
  
  for (const category of ALL_ROUTES) {
    for (const route of category.routes) {
      // Include public routes
      if (route.isPublic) {
        routes.push(route);
        continue;
      }
      
      // Include routes without role restriction
      if (!route.requiredRole && !route.allowedRoles) {
        routes.push(route);
        continue;
      }
      
      // Include routes matching required role
      if (route.requiredRole === role) {
        routes.push(route);
        continue;
      }
      
      // Include routes matching allowed roles
      if (route.allowedRoles?.includes(role)) {
        routes.push(route);
        continue;
      }
    }
  }
  
  return routes;
}

/**
 * AppRouter - Centralized Routing Configuration
 * 
 * This file contains the main routing structure for the application.
 * It implements:
 * - Public routes (login, register)
 * - Protected routes (authenticated users)
 * - Role-based routing (STUDENT, TEACHER, ADMIN)
 * 
 * Requirements: FR-2.1, FR-2.3
 */

import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardRouter } from './DashboardRouter';
import { NotFoundPage } from './NotFoundPage';
import { UnauthorizedPage } from './UnauthorizedPage';

// ─────────────────────────────────────────────────────────
// Public Pages (Eager Loading)
// ─────────────────────────────────────────────────────────
const LoginPage = lazy(() => 
  import('../features/auth').then((m) => ({ default: m.LoginPage }))
);
const RegisterPage = lazy(() => 
  import('../features/auth').then((m) => ({ default: m.RegisterPage }))
);

// ─────────────────────────────────────────────────────────
// Feature Routes (Lazy Loading)
// ─────────────────────────────────────────────────────────
const GameRoutes = lazy(() =>
  import('../features/games/routes').then((m) => ({ default: m.GameRoutes }))
);
const LessonRoutes = lazy(() =>
  import('../features/lessons/routes').then((m) => ({ default: m.LessonRoutes }))
);
const ProfileRoutes = lazy(() =>
  import('../features/profile/routes').then((m) => ({ default: m.ProfileRoutes }))
);
const LeaderboardRoutes = lazy(() =>
  import('../features/leaderboard/routes').then((m) => ({ default: m.LeaderboardRoutes }))
);

// ─────────────────────────────────────────────────────────
// Activity Routes (Lazy Loading)
// ─────────────────────────────────────────────────────────
const FastReadingRoutes = lazy(() =>
  import('../features/fast-reading/routes').then((m) => ({ default: m.FastReadingRoutes }))
);
const FocusRoutes = lazy(() =>
  import('../features/focus/routes').then((m) => ({ default: m.FocusRoutes }))
);
const LearningRoutes = lazy(() =>
  import('../features/learning/routes').then((m) => ({ default: m.LearningRoutes }))
);
const LanguageRoutes = lazy(() =>
  import('../features/language/routes').then((m) => ({ default: m.LanguageRoutes }))
);
const TeacherToolsRoutes = lazy(() =>
  import('../features/teacher-tools/routes').then((m) => ({ default: m.TeacherToolsRoutes }))
);
const StoriesRoutes = lazy(() =>
  import('../features/stories/routes').then((m) => ({ default: m.StoriesRoutes }))
);
const LifeSkillsRoutes = lazy(() =>
  import('../features/life-skills/routes').then((m) => ({ default: m.LifeSkillsRoutes }))
);

// ─────────────────────────────────────────────────────────
// Loading Fallback Component
// ─────────────────────────────────────────────────────────
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
        <p className="text-white text-lg">Yükleniyor...</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Main AppRouter Component
// ─────────────────────────────────────────────────────────
export function AppRouter() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* ═══════════════════════════════════════════════════
            PUBLIC ROUTES
            Accessible without authentication
            ═══════════════════════════════════════════════════ */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ═══════════════════════════════════════════════════
            PROTECTED ROUTES - DASHBOARD
            Role-based routing (STUDENT, TEACHER, ADMIN, PARENT)
            ═══════════════════════════════════════════════════ */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardRouter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardRouter />
            </ProtectedRoute>
          }
        />

        {/* ═══════════════════════════════════════════════════
            PROTECTED ROUTES - STUDENT FEATURES
            Accessible to authenticated students
            ═══════════════════════════════════════════════════ */}
        
        {/* Profile Routes */}
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute>
              <ProfileRoutes />
            </ProtectedRoute>
          }
        />

        {/* Leaderboard Routes */}
        <Route
          path="/leaderboard/*"
          element={
            <ProtectedRoute>
              <LeaderboardRoutes />
            </ProtectedRoute>
          }
        />

        {/* Games Routes */}
        <Route
          path="/games/*"
          element={
            <ProtectedRoute>
              <GameRoutes />
            </ProtectedRoute>
          }
        />

        {/* Lessons Routes */}
        <Route
          path="/lessons/*"
          element={
            <ProtectedRoute>
              <LessonRoutes />
            </ProtectedRoute>
          }
        />

        {/* ═══════════════════════════════════════════════════
            PROTECTED ROUTES - ACTIVITY FEATURES
            Additional learning activities
            ═══════════════════════════════════════════════════ */}
        
        {/* Fast Reading Routes */}
        <Route
          path="/fast-reading/*"
          element={
            <ProtectedRoute>
              <FastReadingRoutes />
            </ProtectedRoute>
          }
        />

        {/* Focus Routes */}
        <Route
          path="/focus/*"
          element={
            <ProtectedRoute>
              <FocusRoutes />
            </ProtectedRoute>
          }
        />

        {/* Learning Routes */}
        <Route
          path="/learning/*"
          element={
            <ProtectedRoute>
              <LearningRoutes />
            </ProtectedRoute>
          }
        />

        {/* Language Routes */}
        <Route
          path="/language/*"
          element={
            <ProtectedRoute>
              <LanguageRoutes />
            </ProtectedRoute>
          }
        />

        {/* Teacher Tools Routes */}
        <Route
          path="/teacher-tools/*"
          element={
            <ProtectedRoute>
              <TeacherToolsRoutes />
            </ProtectedRoute>
          }
        />

        {/* Stories Routes */}
        <Route
          path="/stories/*"
          element={
            <ProtectedRoute>
              <StoriesRoutes />
            </ProtectedRoute>
          }
        />

        {/* Life Skills Routes */}
        <Route
          path="/life-skills/*"
          element={
            <ProtectedRoute>
              <LifeSkillsRoutes />
            </ProtectedRoute>
          }
        />

        {/* ═══════════════════════════════════════════════════
            ROLE-BASED ROUTES
            Specific routes for different user roles
            ═══════════════════════════════════════════════════ */}
        
        {/* Student-specific routes */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute requiredRole="student">
              <DashboardRouter />
            </ProtectedRoute>
          }
        />

        {/* Teacher-specific routes */}
        <Route
          path="/teacher/*"
          element={
            <ProtectedRoute requiredRole="teacher">
              <DashboardRouter />
            </ProtectedRoute>
          }
        />

        {/* Admin-specific routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardRouter />
            </ProtectedRoute>
          }
        />

        {/* Parent-specific routes */}
        <Route
          path="/parent/*"
          element={
            <ProtectedRoute requiredRole="parent">
              <DashboardRouter />
            </ProtectedRoute>
          }
        />

        {/* ═══════════════════════════════════════════════════
            ERROR ROUTES
            ═══════════════════════════════════════════════════ */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/404" element={<NotFoundPage />} />

        {/* Catch all - 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

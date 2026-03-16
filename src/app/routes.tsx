import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import DynamicGameLoader from '../core/game-engine/DynamicGameLoader';

// Auth Pages
import LoginPage from '../features/auth/LoginPage';
import RegisterPage from '../features/auth/RegisterPage';

// Dashboards - Lazy loaded
const StudentDashboard = lazy(() => import('../features/dashboard/StudentDashboard'));
const TeacherDashboard = lazy(() => import('../features/dashboard/TeacherDashboard'));
const AdminDashboard = lazy(() => import('../features/dashboard/AdminDashboard'));
const ParentDashboard = lazy(() => import('../features/dashboard/ParentDashboard'));

// Academic Components - Lazy loaded
const AcademicDashboard = lazy(() => import('../components/academic/AcademicDashboard'));
const MathMenu = lazy(() => import('../components/academic/math/MathMenu'));
const MathGrade1Menu = lazy(() => import('../components/academic/math/grade1/MathGrade1Menu'));

// Loading Component
const LoadingFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center">
    <div className="text-center">
      <div className="text-6xl animate-bounce">🚀</div>
      <p className="text-white/50 mt-4 text-lg font-medium">Yükleniyor...</p>
    </div>
  </div>
);

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // TODO: Add auth check
  return <>{children}</>;
};

// Router Configuration
export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <StudentDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/academic',
    element: (
      <ProtectedRoute>
        <AcademicDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/academic/math',
    element: (
      <ProtectedRoute>
        <MathMenu />
      </ProtectedRoute>
    ),
  },
  {
    path: '/academic/math/grade1',
    element: (
      <ProtectedRoute>
        <MathGrade1Menu />
      </ProtectedRoute>
    ),
  },
  {
    path: '/game/:gameId',
    element: (
      <ProtectedRoute>
        <DynamicGameLoader gameId="" />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

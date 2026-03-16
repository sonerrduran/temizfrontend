/**
 * Routes Index
 * Central export point for routing components
 */

export { AppRouter } from './AppRouter';
export { AppRouter as AppRoutes } from './AppRouter';
export { ProtectedRoute, StudentRoute, TeacherRoute, AdminRoute, ParentRoute, TeacherOrAdminRoute } from './ProtectedRoute';
export type { UserRole, BackendRole } from './ProtectedRoute';
export { DashboardRouter } from './DashboardRouter';
export { NotFoundPage } from './NotFoundPage';
export { UnauthorizedPage } from './UnauthorizedPage';
export * from './routeConfig';

# Routing Structure

This directory contains the centralized routing configuration for the Eğitim Galaksisi web application.

## Overview

The routing system implements:
- **Public routes**: Accessible without authentication (login, register)
- **Protected routes**: Require authentication
- **Role-based routes**: Require specific user roles (STUDENT, TEACHER, ADMIN, PARENT)

## Architecture

```
routes/
├── AppRouter.tsx           # Main router with all route definitions
├── ProtectedRoute.tsx      # Route guard component
├── DashboardRouter.tsx     # Role-based dashboard routing
├── routeConfig.ts          # Route configuration and constants
├── NotFoundPage.tsx        # 404 page
├── UnauthorizedPage.tsx    # 403 page
└── index.tsx               # Exports
```

## Files

### AppRouter.tsx

The main router component that defines all application routes. It uses React Router v6 and implements:

- Public routes (login, register)
- Protected routes with authentication checks
- Role-based routes with authorization checks
- Lazy loading for all feature routes
- Loading fallback UI

**Usage:**
```tsx
import { AppRouter } from './routes';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
```

### ProtectedRoute.tsx

A route guard component that checks:
1. Authentication status
2. User role (if required)

**Usage:**
```tsx
// Basic protected route (any authenticated user)
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

// Role-specific route
<ProtectedRoute requiredRole="teacher">
  <TeacherDashboard />
</ProtectedRoute>

// Multiple allowed roles
<ProtectedRoute allowedRoles={['teacher', 'admin']}>
  <AdminPanel />
</ProtectedRoute>

// Convenience components
<StudentRoute><StudentPage /></StudentRoute>
<TeacherRoute><TeacherPage /></TeacherRoute>
<AdminRoute><AdminPage /></AdminRoute>
<ParentRoute><ParentPage /></ParentRoute>
```

### DashboardRouter.tsx

Role-based dashboard routing component. Automatically renders the appropriate dashboard based on user role:

- STUDENT → StudentDashboard
- TEACHER → TeacherDashboard
- PARENT → ParentDashboard
- SCHOOL_ADMIN / SUPER_ADMIN → AdminDashboard

### routeConfig.ts

Central configuration file containing:
- Route definitions with metadata
- Route categories
- Type-safe route path constants
- Helper functions for route management

**Usage:**
```tsx
import { ROUTES, getRoutesByRole, isPublicRoute } from './routes';

// Use constants instead of hardcoded strings
navigate(ROUTES.DASHBOARD);

// Get routes for a specific role
const teacherRoutes = getRoutesByRole('teacher');

// Check if route is public
if (isPublicRoute('/login')) {
  // ...
}
```

## Route Structure

### Public Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/login` | LoginPage | User login |
| `/register` | RegisterPage | User registration |

### Protected Routes - Dashboard

| Path | Component | Description |
|------|-----------|-------------|
| `/` | DashboardRouter | Main dashboard (role-based) |
| `/dashboard` | DashboardRouter | Main dashboard (role-based) |

### Protected Routes - Student Features

| Path | Component | Description |
|------|-----------|-------------|
| `/profile/*` | ProfileRoutes | User profile and settings |
| `/leaderboard/*` | LeaderboardRoutes | Leaderboards |
| `/games/*` | GameRoutes | Games browser and player |
| `/lessons/*` | LessonRoutes | Academic lessons |

### Protected Routes - Activities

| Path | Component | Description |
|------|-----------|-------------|
| `/fast-reading/*` | FastReadingRoutes | Speed reading exercises |
| `/focus/*` | FocusRoutes | Focus exercises |
| `/learning/*` | LearningRoutes | Learning tools |
| `/language/*` | LanguageRoutes | Language learning |
| `/teacher-tools/*` | TeacherToolsRoutes | Teacher tools |
| `/stories/*` | StoriesRoutes | Interactive stories |
| `/life-skills/*` | LifeSkillsRoutes | Life skills education |

### Role-Based Routes

| Path | Required Role | Component | Description |
|------|---------------|-----------|-------------|
| `/student/*` | STUDENT | DashboardRouter | Student-specific routes |
| `/teacher/*` | TEACHER | DashboardRouter | Teacher-specific routes |
| `/admin/*` | ADMIN | DashboardRouter | Admin-specific routes |
| `/parent/*` | PARENT | DashboardRouter | Parent-specific routes |

### Error Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/unauthorized` | UnauthorizedPage | 403 - Access denied |
| `/404` | NotFoundPage | 404 - Page not found |
| `*` | NotFoundPage | Catch-all 404 |

## User Roles

The application supports the following user roles:

### Frontend Roles (Normalized)
- `student` - Student users
- `teacher` - Teacher users
- `parent` - Parent users
- `admin` - Admin users (SCHOOL_ADMIN or SUPER_ADMIN)

### Backend Roles (API)
- `STUDENT` → maps to `student`
- `TEACHER` → maps to `teacher`
- `PARENT` → maps to `parent`
- `SCHOOL_ADMIN` → maps to `admin`
- `SUPER_ADMIN` → maps to `admin`

## Adding New Routes

### 1. Add to AppRouter.tsx

```tsx
// In AppRouter.tsx
const NewFeatureRoutes = lazy(() =>
  import('../features/new-feature/routes').then((m) => ({ default: m.NewFeatureRoutes }))
);

// In Routes section
<Route
  path="/new-feature/*"
  element={
    <ProtectedRoute>
      <NewFeatureRoutes />
    </ProtectedRoute>
  }
/>
```

### 2. Add to routeConfig.ts

```tsx
// In routeConfig.ts
export const NEW_FEATURE_ROUTES: RouteDefinition[] = [
  {
    path: '/new-feature',
    name: 'New Feature',
    description: 'Description of new feature',
    isPublic: false,
    requiredRole: 'student', // optional
  },
];

// Add to ROUTES constant
export const ROUTES = {
  // ...
  NEW_FEATURE: '/new-feature',
} as const;
```

### 3. Create Feature Routes

```tsx
// In features/new-feature/routes.tsx
import { Routes, Route } from 'react-router-dom';
import { NewFeaturePage } from './NewFeaturePage';

export function NewFeatureRoutes() {
  return (
    <Routes>
      <Route path="/" element={<NewFeaturePage />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}
```

## Best Practices

1. **Use route constants**: Always use `ROUTES` constants instead of hardcoded strings
2. **Lazy loading**: All feature routes should be lazy loaded
3. **Protected routes**: Wrap all authenticated routes with `ProtectedRoute`
4. **Role-based access**: Use `requiredRole` or `allowedRoles` for role-specific routes
5. **Loading states**: Provide meaningful loading fallbacks
6. **Error handling**: Use error boundaries for route-level errors
7. **Type safety**: Use TypeScript types for route definitions

## Requirements Mapping

This routing structure implements the following requirements:

- **FR-2.1**: All routing uses React Router (no switch/case)
- **FR-2.2**: Each feature has its own routes.tsx file
- **FR-2.3**: Route guards implementation (Public, Protected, Role-based)
- **FR-2.4**: Lazy loading with route-based code splitting

## Migration Notes

This routing structure replaces the old App.tsx switch/case routing system. Key changes:

1. ✅ Removed switch/case routing
2. ✅ Removed setMode() state-based navigation
3. ✅ All routes now use React Router
4. ✅ Centralized route configuration
5. ✅ Type-safe route paths
6. ✅ Role-based access control
7. ✅ Lazy loading for all features

## Testing

To test the routing:

```tsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './AppRouter';

test('renders login page for unauthenticated users', () => {
  render(
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
  // Add assertions
});
```

## Related Files

- `apps/web/src/App.tsx` - Main app component that uses AppRouter
- `apps/web/src/stores/authStore.ts` - Authentication state management
- `apps/web/src/features/*/routes.tsx` - Feature-specific routes

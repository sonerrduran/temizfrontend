import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from '@egitim-galaksisi/ui';
import { LoginPage } from './features/auth';
import { AdminDashboard } from './features/dashboard';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { useAuthStore } from './stores/authStore';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
          />
          <Route 
            path="*" 
            element={
              <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-white mb-4">404</h1>
                  <p className="text-white/60 mb-6">Sayfa bulunamadı</p>
                  <a href="/" className="text-cyan-400 hover:text-cyan-300">Ana Sayfaya Dön</a>
                </div>
              </div>
            } 
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;

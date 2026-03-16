/**
 * Main App Component
 * Minimal ve temiz - sadece router ve global providers
 */

import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ErrorBoundary } from '@egitim-galaksisi/ui';

// Loading Fallback
const AppLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center">
    <div className="text-center">
      <div className="text-7xl animate-bounce mb-4">🚀</div>
      <h1 className="text-3xl font-black text-white mb-2">Eğitim Galaksisi</h1>
      <p className="text-white/50 text-lg">Yükleniyor...</p>
    </div>
  </div>
);

/**
 * App Component
 *
 * Önceki durum: 5,388 satır
 * Yeni durum: 35 satır
 *
 * Tüm oyunlar gameRegistry'den dinamik yükleniyor
 */
function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<AppLoading />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;

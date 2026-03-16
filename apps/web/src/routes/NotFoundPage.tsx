/**
 * Not Found Page
 * 404 - Sayfa bulunamadı
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-white mb-4">Sayfa Bulunamadı</h1>
        <p className="text-slate-300 mb-6">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <p className="text-slate-400 text-sm mb-6">
          Hata Kodu: <span className="font-mono text-slate-200">404</span>
        </p>
        <button
          onClick={handleGoHome}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
}

/**
 * Unauthorized Page
 * 403 - Yetkisiz erişim sayfası
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export function UnauthorizedPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8 text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-3xl font-bold text-white mb-4">Yetkisiz Erişim</h1>
        <p className="text-slate-300 mb-6">
          Bu sayfaya erişim yetkiniz bulunmamaktadır.
        </p>
        {user && (
          <p className="text-slate-400 text-sm mb-6">
            Mevcut rol: <span className="font-semibold text-slate-200">{user.role}</span>
          </p>
        )}
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
          >
            Geri Dön
          </button>
          <button
            onClick={handleGoHome}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors"
          >
            Ana Sayfa
          </button>
        </div>
      </div>
    </div>
  );
}

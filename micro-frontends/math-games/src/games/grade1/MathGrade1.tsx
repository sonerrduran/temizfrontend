import React from 'react';
import { useNavigate } from 'react-router-dom';

const MathGrade1: React.FC = () => {
  const navigate = useNavigate();

  const topics = [
    { id: 'numbers', name: 'Sayılar', icon: '🔢', description: '0-20 arası sayılar' },
    { id: 'addition', name: 'Toplama', icon: '➕', description: 'Basit toplama işlemleri' },
    { id: 'subtraction', name: 'Çıkarma', icon: '➖', description: 'Basit çıkarma işlemleri' },
    { id: 'shapes', name: 'Şekiller', icon: '🔷', description: 'Temel geometrik şekiller' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">1. Sınıf Matematik</h1>
          <p className="text-white/80 text-lg">Konunu seç ve öğrenmeye başla!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <button
              key={topic.id}
              className="group relative bg-white/10 hover:bg-white/20 backdrop-blur-sm p-6 rounded-2xl border-2 border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-5xl mb-3">{topic.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{topic.name}</h3>
              <p className="text-white/70 text-sm">{topic.description}</p>
              <div className="mt-4 text-white/50 text-xs">Yakında...</div>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/academic/math')}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-300 border border-white/20"
          >
            ← Sınıflar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MathGrade1;

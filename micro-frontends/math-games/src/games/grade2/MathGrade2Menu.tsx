import React from 'react';
import { useNavigate } from 'react-router-dom';

const MathGrade2Menu: React.FC = () => {
  const navigate = useNavigate();

  const topics = [
    {
      id: 'numbers',
      name: 'Sayılar',
      icon: '💯',
      description: "100'e kadar sayılar",
      games: [
        { path: '/academic/math/grade2/numbers/number-hunt', name: 'Sayı Avı' },
        { path: '/academic/math/grade2/numbers/place-value', name: 'Basamak Değeri' },
        { path: '/academic/math/grade2/numbers/number-line-jump', name: 'Sayı Doğrusu' },
      ],
    },
    {
      id: 'addition',
      name: 'Toplama',
      icon: '➕',
      description: 'İki basamaklı toplama',
      games: [
        { path: '/academic/math/grade2/addition/market-basket', name: 'Market Sepeti' },
        { path: '/academic/math/grade2/addition/two-digit', name: 'İki Basamaklı Toplama' },
        { path: '/academic/math/grade2/addition/missing-number', name: 'Eksik Sayı' },
      ],
    },
    {
      id: 'subtraction',
      name: 'Çıkarma',
      icon: '➖',
      description: 'İki basamaklı çıkarma',
      games: [
        { path: '/academic/math/grade2/subtraction/change-calculator', name: 'Para Üstü' },
        { path: '/academic/math/grade2/subtraction/two-digit', name: 'İki Basamaklı Çıkarma' },
        { path: '/academic/math/grade2/subtraction/compare', name: 'Karşılaştırma' },
      ],
    },
    {
      id: 'geometry',
      name: 'Geometri',
      icon: '🔷',
      description: 'Şekiller ve simetri',
      games: [
        { path: '/academic/math/grade2/geometry/shape-count', name: 'Şekil Sayma' },
        { path: '/academic/math/grade2/geometry/symmetry', name: 'Simetri' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">2. Sınıf Matematik</h1>
          <p className="text-white/80 text-lg">Konunu seç ve öğrenmeye başla!</p>
        </div>
        <div className="space-y-6">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{topic.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{topic.name}</h3>
                  <p className="text-white/70 text-sm">{topic.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {topic.games.map((game) => (
                  <button
                    key={game.path}
                    onClick={() => navigate(game.path)}
                    className="bg-white/10 hover:bg-white/20 p-4 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="text-white font-semibold text-sm">{game.name}</div>
                  </button>
                ))}
              </div>
            </div>
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

export default MathGrade2Menu;

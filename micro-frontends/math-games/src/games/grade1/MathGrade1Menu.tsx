import React from 'react';
import { useNavigate } from 'react-router-dom';

const MathGrade1Menu: React.FC = () => {
  const navigate = useNavigate();

  const topics = [
    {
      id: 'numbers',
      name: 'Sayılar',
      icon: '🔢',
      description: '0-20 arası sayılar',
      games: [
        { path: '/academic/math/grade1/numbers/balloon-count', name: 'Balon Sayma' },
        { path: '/academic/math/grade1/numbers/number-train', name: 'Sayı Treni' },
        { path: '/academic/math/grade1/numbers/number-building', name: 'Sayı Binası' },
        { path: '/academic/math/grade1/numbers/apple-collect', name: 'Elma Toplama' },
      ],
    },
    {
      id: 'basic',
      name: 'Dört İşlem',
      icon: '➕',
      description: 'Toplama ve çıkarma',
      games: [
        { path: '/academic/math/grade1/basic/fruit-addition', name: 'Meyve Toplama' },
        { path: '/academic/math/grade1/basic/fish-addition', name: 'Balık Toplama' },
        { path: '/academic/math/grade1/basic/space-addition', name: 'Uzay Toplama' },
        { path: '/academic/math/grade1/basic/balloon-pop', name: 'Balon Patlatma' },
        { path: '/academic/math/grade1/basic/cookie-monster', name: 'Kurabiye Canavarı' },
      ],
    },
    {
      id: 'geometry',
      name: 'Geometri',
      icon: '🔷',
      description: 'Şekiller ve konumlar',
      games: [
        { path: '/academic/math/grade1/geometry/shape-hunt', name: 'Şekil Avı' },
        { path: '/academic/math/grade1/geometry/shape-puzzle', name: 'Şekil Bulmacası' },
        { path: '/academic/math/grade1/geometry/shadow-match', name: 'Gölge Eşleştirme' },
        { path: '/academic/math/grade1/geometry/shape-builder', name: 'Şekil İnşaatçısı' },
      ],
    },
    {
      id: 'measurement',
      name: 'Ölçme',
      icon: '📏',
      description: 'Uzunluk, ağırlık, zaman',
      games: [
        { path: '/academic/math/grade1/measurement/length-compare', name: 'Uzunluk Karşılaştırma' },
        { path: '/academic/math/grade1/measurement/weight-compare', name: 'Ağırlık Karşılaştırma' },
        { path: '/academic/math/grade1/measurement/clock-reading', name: 'Saat Okuma' },
        { path: '/academic/math/grade1/measurement/money-count', name: 'Para Sayma' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">1. Sınıf Matematik</h1>
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

export default MathGrade1Menu;

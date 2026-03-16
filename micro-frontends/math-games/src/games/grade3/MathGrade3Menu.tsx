import React from 'react';
import { useNavigate } from 'react-router-dom';

const MathGrade3Menu: React.FC = () => {
  const navigate = useNavigate();

  const topics = [
    {
      id: 'multiplication',
      name: 'Çarpma',
      icon: '✖️',
      description: 'Çarpma işlemleri',
      games: [
        { path: '/academic/math/grade3/multiplication/battle', name: 'Çarpma Savaşı' },
        { path: '/academic/math/grade3/multiplication/table', name: 'Çarpım Tablosu' },
      ],
    },
    {
      id: 'division',
      name: 'Bölme',
      icon: '➗',
      description: 'Bölme işlemleri',
      games: [
        { path: '/academic/math/grade3/division/pizza', name: 'Pizza Paylaşımı' },
        { path: '/academic/math/grade3/division/race', name: 'Bölme Yarışı' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">3. Sınıf Matematik</h1>
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

export default MathGrade3Menu;

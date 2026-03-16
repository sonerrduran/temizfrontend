import React from 'react';
import { useNavigate } from 'react-router-dom';

const EnglishGrade2Menu: React.FC = () => {
  const navigate = useNavigate();

  const topics = [
    {
      id: 'vocabulary',
      name: 'Vocabulary',
      icon: '📝',
      description: 'Kelime öğrenme',
      games: [{ path: '/english/grade2/vocabulary/color-match', name: 'Renk Eşleştirme' }],
    },
    {
      id: 'grammar',
      name: 'Grammar',
      icon: '📖',
      description: 'Dilbilgisi',
      games: [{ path: '#', name: 'Yakında...' }],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-700 to-orange-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">2nd Grade English</h1>
          <p className="text-white/80 text-lg">Choose a topic and start learning!</p>
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
                {topic.games.map((game, idx) => (
                  <button
                    key={idx}
                    onClick={() => game.path !== '#' && navigate(game.path)}
                    className="bg-white/10 hover:bg-white/20 p-4 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    disabled={game.path === '#'}
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
            onClick={() => navigate('/academic/english')}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-300 border border-white/20"
          >
            ← Grades
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnglishGrade2Menu;

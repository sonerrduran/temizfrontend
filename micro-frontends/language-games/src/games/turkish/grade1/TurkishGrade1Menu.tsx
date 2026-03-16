import React from 'react';
import { useNavigate } from 'react-router-dom';

const TurkishGrade1Menu: React.FC = () => {
  const navigate = useNavigate();

  const topics = [
    {
      id: 'letters',
      name: 'Harfler',
      icon: '🔤',
      description: 'Harf tanıma ve eşleştirme',
      games: [
        { path: '/turkish/grade1/letters/match', name: 'Harf Eşleştirme' },
        { path: '/turkish/grade1/letters/vowel-consonant', name: 'Sesli-Sessiz' },
        { path: '/turkish/grade1/letters/recognition', name: 'Harf Tanıma' },
        { path: '/turkish/grade1/letters/uppercase-lowercase', name: 'Büyük-Küçük Harf' },
      ],
    },
    {
      id: 'syllables',
      name: 'Heceler',
      icon: '📝',
      description: 'Hece oluşturma ve ayırma',
      games: [
        { path: '/turkish/grade1/syllables/builder', name: 'Hece Oluşturma' },
        { path: '/turkish/grade1/syllables/separation', name: 'Hece Ayırma' },
      ],
    },
    {
      id: 'words',
      name: 'Kelimeler',
      icon: '📖',
      description: 'Kelime oluşturma',
      games: [{ path: '/turkish/grade1/words/syllable-count', name: 'Hece Sayma' }],
    },
    {
      id: 'reading',
      name: 'Okuma',
      icon: '📚',
      description: 'Okuma ve anlama',
      games: [
        { path: '/turkish/grade1/reading/word-making', name: 'Kelime Yapma' },
        { path: '/turkish/grade1/reading/story-comprehension', name: 'Hikaye Anlama' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-red-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">1. Sınıf Türkçe</h1>
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
            onClick={() => navigate('/academic/turkish')}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-300 border border-white/20"
          >
            ← Sınıflar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TurkishGrade1Menu;

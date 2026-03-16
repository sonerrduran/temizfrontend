import React from 'react';
import { useNavigate } from 'react-router-dom';

const TurkishGrade1Menu: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'letters',
      name: 'Harfler',
      icon: '🔤',
      description: 'Harf tanıma ve eşleştirme',
      color: 'from-pink-500 to-rose-600',
      games: [
        { name: 'Harf Eşleştirme', path: '/games/turkish/grade1/letters/match' },
        { name: 'Büyük-Küçük Harf', path: '/games/turkish/grade1/letters/uppercase-lowercase' },
        { name: 'Sesli-Sessiz Harf', path: '/games/turkish/grade1/letters/vowel-consonant' },
        { name: 'Harf Yazma', path: '/games/turkish/grade1/letters/writing' },
        { name: 'Harf Sırası', path: '/games/turkish/grade1/letters/order' },
      ],
    },
    {
      id: 'syllables',
      name: 'Heceler',
      icon: '📝',
      description: 'Hece oluşturma ve ayırma',
      color: 'from-blue-500 to-cyan-600',
      games: [
        { name: 'Hece Oluşturma', path: '/games/turkish/grade1/syllables/build' },
        { name: 'Hece Ayırma', path: '/games/turkish/grade1/syllables/split' },
        { name: 'Hece Sayma', path: '/games/turkish/grade1/syllables/count' },
        { name: 'Hece Eşleştirme', path: '/games/turkish/grade1/syllables/match' },
      ],
    },
    {
      id: 'words',
      name: 'Kelimeler',
      icon: '📖',
      description: 'Kelime tanıma ve oluşturma',
      color: 'from-green-500 to-emerald-600',
      games: [
        { name: 'Kelime Oluşturma', path: '/games/turkish/grade1/words/build' },
        { name: 'Kelime-Resim Eşleştirme', path: '/games/turkish/grade1/words/picture-match' },
        { name: 'İlk Harf Bulma', path: '/games/turkish/grade1/words/first-letter' },
        { name: 'Kelime Tamamlama', path: '/games/turkish/grade1/words/complete' },
      ],
    },
    {
      id: 'reading',
      name: 'Okuma',
      icon: '📚',
      description: 'Okuma ve anlama',
      color: 'from-purple-500 to-violet-600',
      games: [
        { name: 'Hızlı Okuma', path: '/games/turkish/grade1/reading/speed' },
        { name: 'Sesli Okuma', path: '/games/turkish/grade1/reading/aloud' },
        { name: 'Cümle Okuma', path: '/games/turkish/grade1/reading/sentences' },
        { name: 'Anlama Soruları', path: '/games/turkish/grade1/reading/comprehension' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-red-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">1. Sınıf Türkçe</h1>
          <p className="text-white/80 text-lg">Harfler, heceler ve kelimeler</p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/20 p-6 hover:bg-white/15 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{category.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                  <p className="text-white/70 text-sm">{category.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {category.games.map((game, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(game.path)}
                    className={`bg-gradient-to-r ${category.color} p-4 rounded-xl text-white font-semibold hover:scale-105 transition-all duration-300 text-left`}
                  >
                    {game.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/lessons/turkish')}
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

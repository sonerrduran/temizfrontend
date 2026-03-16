import React from 'react';
import { useNavigate } from 'react-router-dom';

const TurkishGrade6Menu: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'text-analysis',
      name: 'Metin Analizi',
      icon: '🔍',
      description: 'Metin inceleme ve analiz',
      color: 'from-blue-500 to-cyan-600',
      games: [
        { name: 'Tema Bulma', path: '/games/turkish/grade6/text-analysis/theme' },
        { name: 'Karakter Analizi', path: '/games/turkish/grade6/text-analysis/character' },
        { name: 'Olay Örgüsü', path: '/games/turkish/grade6/text-analysis/plot' },
        { name: 'Mekan ve Zaman', path: '/games/turkish/grade6/text-analysis/setting' },
      ],
    },
    {
      id: 'word-types',
      name: 'Sözcük Türleri',
      icon: '📝',
      description: 'Detaylı sözcük türleri',
      color: 'from-green-500 to-emerald-600',
      games: [
        { name: 'İsimler', path: '/games/turkish/grade6/word-types/nouns' },
        { name: 'Fiiller', path: '/games/turkish/grade6/word-types/verbs' },
        { name: 'Sıfatlar', path: '/games/turkish/grade6/word-types/adjectives' },
        { name: 'Zarflar', path: '/games/turkish/grade6/word-types/adverbs' },
      ],
    },
    {
      id: 'writing',
      name: 'Yazma Becerileri',
      icon: '✍️',
      description: 'İleri yazma teknikleri',
      color: 'from-purple-500 to-violet-600',
      games: [
        { name: 'Makale Yazma', path: '/games/turkish/grade6/writing/article' },
        { name: 'Deneme Yazma', path: '/games/turkish/grade6/writing/essay' },
        { name: 'Eleştiri Yazma', path: '/games/turkish/grade6/writing/review' },
        { name: 'Rapor Yazma', path: '/games/turkish/grade6/writing/report' },
      ],
    },
    {
      id: 'comprehension',
      name: 'Anlama ve Yorumlama',
      icon: '🧠',
      description: 'Derin anlama becerileri',
      color: 'from-orange-500 to-red-600',
      games: [
        { name: 'Eleştirel Okuma', path: '/games/turkish/grade6/comprehension/critical' },
        { name: 'Çıkarım Yapma', path: '/games/turkish/grade6/comprehension/inference' },
        { name: 'Neden-Sonuç', path: '/games/turkish/grade6/comprehension/cause-effect' },
        { name: 'Karşılaştırma', path: '/games/turkish/grade6/comprehension/comparison' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-red-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">6. Sınıf Türkçe</h1>
          <p className="text-white/80 text-lg">Metin analizi ve sözcük türleri</p>
        </div>

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

export default TurkishGrade6Menu;

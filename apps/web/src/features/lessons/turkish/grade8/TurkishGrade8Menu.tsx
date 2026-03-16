import React from 'react';
import { useNavigate } from 'react-router-dom';

const TurkishGrade8Menu: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'composition',
      name: 'Kompozisyon',
      icon: '✍️',
      description: 'İleri kompozisyon teknikleri',
      color: 'from-indigo-500 to-purple-600',
      games: [
        { name: 'Tartışmacı Metin', path: '/games/turkish/grade8/composition/argumentative' },
        { name: 'Eleştirel Yazı', path: '/games/turkish/grade8/composition/critical' },
        { name: 'Deneme Yazma', path: '/games/turkish/grade8/composition/essay' },
        { name: 'Makale Yazma', path: '/games/turkish/grade8/composition/article' },
      ],
    },
    {
      id: 'critical-reading',
      name: 'Eleştirel Okuma',
      icon: '🔍',
      description: 'Eleştirel düşünme ve okuma',
      color: 'from-blue-500 to-cyan-600',
      games: [
        { name: 'Kaynak Değerlendirme', path: '/games/turkish/grade8/critical-reading/sources' },
        { name: 'Argüman Analizi', path: '/games/turkish/grade8/critical-reading/arguments' },
        { name: 'Önyargı Tespiti', path: '/games/turkish/grade8/critical-reading/bias' },
        { name: 'Karşılaştırmalı Okuma', path: '/games/turkish/grade8/critical-reading/comparative' },
      ],
    },
    {
      id: 'grammar',
      name: 'Dilbilgisi',
      icon: '📝',
      description: 'Kapsamlı dilbilgisi',
      color: 'from-green-500 to-emerald-600',
      games: [
        { name: 'Cümle Çözümleme', path: '/games/turkish/grade8/grammar/parsing' },
        { name: 'Kelime Grupları', path: '/games/turkish/grade8/grammar/word-groups' },
        { name: 'Fiil Kipleri', path: '/games/turkish/grade8/grammar/moods' },
        { name: 'Anlatım Biçimleri', path: '/games/turkish/grade8/grammar/expression' },
      ],
    },
    {
      id: 'literature',
      name: 'Edebiyat',
      icon: '📚',
      description: 'Edebi eserler ve analiz',
      color: 'from-orange-500 to-red-600',
      games: [
        { name: 'Klasik Eserler', path: '/games/turkish/grade8/literature/classics' },
        { name: 'Modern Edebiyat', path: '/games/turkish/grade8/literature/modern' },
        { name: 'Eser İnceleme', path: '/games/turkish/grade8/literature/analysis' },
        { name: 'Yazar Tanıma', path: '/games/turkish/grade8/literature/authors' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-red-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">8. Sınıf Türkçe</h1>
          <p className="text-white/80 text-lg">Kompozisyon ve eleştirel okuma</p>
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

export default TurkishGrade8Menu;

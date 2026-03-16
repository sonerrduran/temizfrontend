import React from 'react';
import { useNavigate } from 'react-router-dom';

const TurkishGrade5Menu: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'literature',
      name: 'Edebiyat',
      icon: '📖',
      description: 'Edebi türler ve eserler',
      color: 'from-indigo-500 to-purple-600',
      games: [
        { name: 'Şiir Analizi', path: '/games/turkish/grade5/literature/poetry' },
        { name: 'Hikaye Analizi', path: '/games/turkish/grade5/literature/story' },
        { name: 'Masal ve Fabl', path: '/games/turkish/grade5/literature/fable' },
        { name: 'Tiyatro', path: '/games/turkish/grade5/literature/theater' },
      ],
    },
    {
      id: 'text-types',
      name: 'Metin Türleri',
      icon: '📝',
      description: 'Farklı metin türleri',
      color: 'from-blue-500 to-cyan-600',
      games: [
        { name: 'Bilgilendirici Metin', path: '/games/turkish/grade5/text-types/informative' },
        { name: 'Öyküleyici Metin', path: '/games/turkish/grade5/text-types/narrative' },
        { name: 'Şiir', path: '/games/turkish/grade5/text-types/poetry' },
        { name: 'Tiyatro Metni', path: '/games/turkish/grade5/text-types/drama' },
      ],
    },
    {
      id: 'expression',
      name: 'Anlatım',
      icon: '💭',
      description: 'Anlatım teknikleri',
      color: 'from-green-500 to-emerald-600',
      games: [
        { name: 'Betimleme', path: '/games/turkish/grade5/expression/description' },
        { name: 'Öyküleme', path: '/games/turkish/grade5/expression/narration' },
        { name: 'Açıklama', path: '/games/turkish/grade5/expression/explanation' },
        { name: 'Tartışma', path: '/games/turkish/grade5/expression/argumentation' },
      ],
    },
    {
      id: 'grammar',
      name: 'Dilbilgisi',
      icon: '🔤',
      description: 'İleri dilbilgisi',
      color: 'from-orange-500 to-red-600',
      games: [
        { name: 'Fiil Çekimi', path: '/games/turkish/grade5/grammar/verb-conjugation' },
        { name: 'Zaman Ekleri', path: '/games/turkish/grade5/grammar/tense' },
        { name: 'Kip Ekleri', path: '/games/turkish/grade5/grammar/mood' },
        { name: 'Birleşik Fiiller', path: '/games/turkish/grade5/grammar/compound-verbs' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-red-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">5. Sınıf Türkçe</h1>
          <p className="text-white/80 text-lg">Edebiyat, metin türleri ve anlatım</p>
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

export default TurkishGrade5Menu;

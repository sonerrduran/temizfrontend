import React from 'react';
import { useNavigate } from 'react-router-dom';

const TurkishGrade7Menu: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'rhetoric',
      name: 'Söz Sanatları',
      icon: '🎭',
      description: 'Edebi sanatlar',
      color: 'from-pink-500 to-rose-600',
      games: [
        { name: 'Benzetme', path: '/games/turkish/grade7/rhetoric/simile' },
        { name: 'Mecaz', path: '/games/turkish/grade7/rhetoric/metaphor' },
        { name: 'Kişileştirme', path: '/games/turkish/grade7/rhetoric/personification' },
        { name: 'Abartma', path: '/games/turkish/grade7/rhetoric/hyperbole' },
      ],
    },
    {
      id: 'narrative',
      name: 'Anlatım Teknikleri',
      icon: '📖',
      description: 'Anlatım yöntemleri',
      color: 'from-blue-500 to-cyan-600',
      games: [
        { name: 'Öyküleme', path: '/games/turkish/grade7/narrative/narration' },
        { name: 'Betimleme', path: '/games/turkish/grade7/narrative/description' },
        { name: 'Açıklama', path: '/games/turkish/grade7/narrative/explanation' },
        { name: 'Tartışma', path: '/games/turkish/grade7/narrative/argumentation' },
      ],
    },
    {
      id: 'grammar',
      name: 'Dilbilgisi',
      icon: '📝',
      description: 'İleri dilbilgisi',
      color: 'from-green-500 to-emerald-600',
      games: [
        { name: 'Fiil Çatıları', path: '/games/turkish/grade7/grammar/voice' },
        { name: 'Birleşik Cümleler', path: '/games/turkish/grade7/grammar/compound' },
        { name: 'Cümle Türleri', path: '/games/turkish/grade7/grammar/sentence-types' },
        { name: 'Anlatım Bozuklukları', path: '/games/turkish/grade7/grammar/errors' },
      ],
    },
    {
      id: 'literature',
      name: 'Edebiyat',
      icon: '📚',
      description: 'Edebi türler ve analiz',
      color: 'from-purple-500 to-violet-600',
      games: [
        { name: 'Roman İnceleme', path: '/games/turkish/grade7/literature/novel' },
        { name: 'Şiir Analizi', path: '/games/turkish/grade7/literature/poetry' },
        { name: 'Tiyatro Eserleri', path: '/games/turkish/grade7/literature/drama' },
        { name: 'Edebi Akımlar', path: '/games/turkish/grade7/literature/movements' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-red-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">7. Sınıf Türkçe</h1>
          <p className="text-white/80 text-lg">Söz sanatları ve anlatım teknikleri</p>
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

export default TurkishGrade7Menu;

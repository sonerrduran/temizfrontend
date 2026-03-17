import React from 'react';
import { useNavigate } from 'react-router-dom';

const LearningMenu: React.FC = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 'flashcard',
      title: 'SRS Ezber Kartları',
      icon: '🃏',
      description: 'Aralıklı tekrar sistemi ile kalıcı öğrenme sağla.',
      gradient: 'from-purple-500 to-indigo-600',
      path: '/learning/flashcards'
    },
    {
      id: 'paraphrase',
      title: 'Yeniden İfade Et',
      icon: '✍️',
      description: 'Okuduğun metni kendi kelimelerinle özetle.',
      gradient: 'from-emerald-500 to-teal-700',
      path: '/learning/paraphrase'
    },
    {
      id: 'mind-map',
      title: 'Hafıza Haritası',
      icon: '🗺️',
      description: 'Kavramlar arası bağ kurarak bütünü gör.',
      gradient: 'from-orange-400 to-orange-600',
      path: '/learning/mind-map'
    },
    {
      id: 'mnemonic',
      title: 'Mnemonik Eğitim',
      icon: '🧩',
      description: 'Şifreleme teknikleri ile ezberlemeyi kolaylaştır.',
      gradient: 'from-fuchsia-500 to-pink-600',
      path: '/learning/mnemonic'
    },
    {
      id: 'story-builder',
      title: 'Hikaye Oluşturucu',
      icon: '📚',
      description: 'Bilgileri hikayeleştirerek öğren.',
      gradient: 'from-blue-500 to-cyan-600',
      path: '/learning/story-builder'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
          >
            ⬅ GERİ DÖN
          </button>
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">Hızlı Öğrenme Üssü</h1>
          <p className="text-white/80 text-lg">Öğrenme tekniklerini keşfet, hafızanı güçlendir ve bilgiyi daha hızlı işle!</p>
        </div>

        {/* Games */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => navigate(game.path)}
              className={`bg-gradient-to-br ${game.gradient} p-8 rounded-2xl text-white hover:scale-105 transition-all duration-300 text-left border-2 border-white/10`}
            >
              <div className="text-5xl mb-4">{game.icon}</div>
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-white/80 text-sm">{game.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningMenu;

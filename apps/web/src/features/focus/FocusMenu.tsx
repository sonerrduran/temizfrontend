import React from 'react';
import { useNavigate } from 'react-router-dom';

const FocusMenu: React.FC = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 'pomodoro',
      title: 'Pomodoro Görev',
      icon: '⏳',
      description: '25+5 kuralı ile derslerini odaklanarak bitir.',
      gradient: 'from-rose-500 to-red-600',
      path: '/focus/pomodoro'
    },
    {
      id: 'attention',
      title: 'Dikkat Takibi',
      icon: '🎯',
      description: 'Hareket eden objeleri gözden kaçırma.',
      gradient: 'from-cyan-500 to-blue-600',
      path: '/focus/attention-tracking'
    },
    {
      id: 'focus-point',
      title: 'Odak Noktası',
      icon: '🔘',
      description: 'Merkezdeki noktaya bakarak dikkat süreni artır.',
      gradient: 'from-indigo-500 to-indigo-700',
      path: '/focus/exercise'
    },
    {
      id: 'memory-cards',
      title: 'Hafıza Kartları',
      icon: '🃏',
      description: 'Eşleşen kartları bul, hafızanı güçlendir.',
      gradient: 'from-purple-500 to-pink-600',
      path: '/focus/memory-cards'
    },
    {
      id: 'color-match',
      title: 'Renk Odağı',
      icon: '🎨',
      description: 'Renk ve kelime uyumunu hızlıca değerlendir.',
      gradient: 'from-orange-500 to-red-600',
      path: '/focus/color-match'
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
          <div className="text-6xl mb-4">🧘</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">Konsantrasyon Merkezi</h1>
          <p className="text-white/80 text-lg">Zihnini sakinleştir, odaklanmanı geliştir ve dikkatini tek bir noktada toplamayı öğren!</p>
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

export default FocusMenu;

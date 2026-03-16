import React, { useState } from 'react';

interface FirstAidMiniGamesProps {
  onExit: () => void;
}

const FirstAidMiniGames: React.FC<FirstAidMiniGamesProps> = ({ onExit }) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    {
      id: 'match',
      title: 'İlk Yardım Eşleştir',
      icon: '🎯',
      description: 'Yaralanmaları doğru müdahalelerle eşleştir!',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      id: 'speed',
      title: 'Hızlı Karar',
      icon: '⚡',
      description: 'Acil durumlarda hızlı ve doğru karar ver!',
      color: 'from-orange-500 to-red-600',
    },
    {
      id: 'memory',
      title: 'İlk Yardım Hafızası',
      icon: '🧠',
      description: 'İlk yardım adımlarını sırayla hatırla!',
      color: 'from-purple-500 to-pink-600',
    },
    {
      id: 'quiz',
      title: 'Hızlı Quiz',
      icon: '❓',
      description: 'İlk yardım bilgini test et!',
      color: 'from-green-500 to-emerald-600',
    },
  ];

  return (
    <div className="min-h-screen text-white p-4">
      <div className="w-full max-w-6xl mx-auto">
        <button
          onClick={onExit}
          className="mb-6 px-6 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all font-bold"
        >
          ⬅ Ana Menüye Dön
        </button>

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black mb-4">🎮 Mini Oyunlar</h2>
          <p className="text-white/70">Eğlenerek öğren, bilgini pekiştir!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className={`p-8 rounded-2xl bg-gradient-to-br ${game.color} hover:scale-105 transition-all shadow-xl`}
            >
              <div className="text-6xl mb-4">{game.icon}</div>
              <h3 className="font-black text-2xl mb-2">{game.title}</h3>
              <p className="text-white/80">{game.description}</p>
              <div className="mt-4 text-sm bg-white/20 px-4 py-2 rounded-full inline-block">
                Yakında!
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FirstAidMiniGames;

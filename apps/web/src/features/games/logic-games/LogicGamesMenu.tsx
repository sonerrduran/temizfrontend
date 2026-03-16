import { useNavigate } from 'react-router-dom';

export default function LogicGamesMenu() {
  const navigate = useNavigate();

  const games = [
    {
      name: 'Sudoku',
      icon: '🔢',
      color: 'from-blue-500 to-cyan-500',
      path: '/games/logic/sudoku',
      description: 'Sayı mantık oyunu',
    },
    {
      name: 'Bulmaca',
      icon: '🧩',
      color: 'from-purple-500 to-pink-500',
      path: '/games/logic/puzzle',
      description: 'Parça birleştirme',
    },
    {
      name: 'İki Kişilik Oyunlar',
      icon: '🎮',
      color: 'from-green-500 to-emerald-500',
      path: '/games/logic/two-player',
      description: 'Arkadaşınla oyna',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-white/60 hover:text-white mb-4 flex items-center gap-2"
          >
            ← Geri
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">🧩 Mantık Oyunları</h1>
          <p className="text-white/60">Zeka ve mantık oyunlarıyla eğlen!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {games.map((game) => (
            <button
              key={game.name}
              onClick={() => navigate(game.path)}
              className={`bg-gradient-to-br ${game.color} rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 group`}
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                {game.icon}
              </div>
              <div className="text-white font-bold text-xl mb-2">{game.name}</div>
              <div className="text-white/80 text-sm">{game.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

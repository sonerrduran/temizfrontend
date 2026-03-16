import { GameCard } from '@egitim-galaksisi/ui';
import { useNavigate } from 'react-router-dom';

export default function TwoPlayerMenu() {
  const navigate = useNavigate();

  const games = [
    { id: 'tic-tac-toe', title: 'Tic-Tac-Toe', icon: '✖️⭕', color: 'from-indigo-600 to-blue-800', description: 'Klasik XOX macerası' },
    { id: 'connect-four', title: 'Hedef 4', icon: '🔴🟡', color: 'from-rose-600 to-red-800', description: '4 rengi peş peşe hizala' },
    { id: 'chess', title: 'Satranç', icon: '♟️', color: 'from-slate-600 to-zinc-800', description: 'Klasik satranç' },
    { id: 'checkers', title: 'Dama', icon: '🔴', color: 'from-red-600 to-red-900', description: 'Taşları koru' },
    { id: 'reversi', title: 'Reversi', icon: '⚫⚪', color: 'from-emerald-600 to-emerald-900', description: 'Othello oyunu' },
    { id: 'mancala', title: 'Mangala', icon: '🕳️', color: 'from-yellow-700 to-amber-900', description: 'Taş dağıtma' },
    { id: 'sos', title: 'SOS', icon: '🆘', color: 'from-amber-500 to-orange-700', description: 'SOS yapma oyunu' },
    { id: 'dots-boxes', title: 'Noktalar & Kutular', icon: '🟩', color: 'from-emerald-600 to-teal-800', description: 'Kutu kapatma' },
    { id: 'go', title: 'Go', icon: '⚫⚪', color: 'from-gray-700 to-slate-900', description: 'Japon Go oyunu' },
    { id: 'gomoku', title: 'Gomoku', icon: '⚫', color: 'from-slate-600 to-gray-800', description: '5 taş dizme' },
    { id: 'backgammon', title: 'Tavla', icon: '🎲', color: 'from-amber-600 to-orange-800', description: 'Klasik tavla' },
    { id: 'nine-mens-morris', title: 'Dokuz Taş', icon: '⭕', color: 'from-blue-600 to-indigo-800', description: 'Dokuz taş oyunu' },
    { id: 'abalone', title: 'Abalone', icon: '⚪', color: 'from-cyan-500 to-blue-700', description: 'Bilye itme' },
    { id: 'blokus-duel', title: 'Blokus Duel', icon: '🔷', color: 'from-purple-600 to-fuchsia-800', description: 'Blok yerleştir' },
    { id: 'fanorona', title: 'Fanorona', icon: '⚫⚪', color: 'from-green-600 to-emerald-800', description: 'Madagaskar oyunu' },
    { id: 'halma', title: 'Halma', icon: '🔴', color: 'from-rose-500 to-pink-700', description: 'Zıplama oyunu' },
    { id: 'hive', title: 'Hive', icon: '🐝', color: 'from-yellow-600 to-orange-800', description: 'Böcek oyunu' },
    { id: 'jenga', title: 'Jenga', icon: '🧱', color: 'from-amber-700 to-orange-900', description: 'Kule yıkma' },
    { id: 'kalah', title: 'Kalah', icon: '🕳️', color: 'from-teal-600 to-cyan-800', description: 'Kalah oyunu' },
    { id: 'onitama', title: 'Onitama', icon: '🥋', color: 'from-red-600 to-orange-800', description: 'Japon dövüş sanatı' },
    { id: 'pente', title: 'Pente', icon: '⚫⚪', color: 'from-indigo-600 to-purple-800', description: '5 taş yakalama' },
    { id: 'quoridor', title: 'Quoridor', icon: '🧱', color: 'from-orange-600 to-red-800', description: 'Duvar örme' },
    { id: 'santorini', title: 'Santorini', icon: '🏛️', color: 'from-blue-500 to-cyan-700', description: 'Yunan adası' },
    { id: 'shogi', title: 'Shogi', icon: '🎌', color: 'from-red-700 to-orange-900', description: 'Japon satrancı' },
    { id: 'tak', title: 'Tak', icon: '⬜', color: 'from-slate-600 to-gray-800', description: 'Yol oluşturma' },
    { id: 'xiangqi', title: 'Xiangqi', icon: '🐉', color: 'from-red-600 to-orange-800', description: 'Çin satrancı' },
    { id: 'domino', title: 'Domino', icon: '🎲', color: 'from-purple-600 to-fuchsia-800', description: 'Domino oyunu' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto px-2">
        <div className="text-center mb-12">
          <button
            onClick={() => navigate('/games/logic')}
            className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm relative z-50"
          >
            ⬅ GERİ DÖN
          </button>
          <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">
            İki Kişilik Oyunlar
          </h2>
          <p className="text-white/80 text-lg mt-4">
            27 farklı iki kişilik strateji oyunu!
          </p>
          <div className="flex justify-center gap-3 mt-4">
            <span className="bg-rose-500/20 text-rose-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-500/30">
              AYNI CİHAZDA BERABER OYNA 🧑‍🤝‍🧑
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto pb-32">
          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              icon={game.icon}
              color={game.color}
              description={game.description}
              onClick={() => navigate(`/games/logic/two-player/${game.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

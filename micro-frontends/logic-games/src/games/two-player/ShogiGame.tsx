import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

const ShogiGame: React.FC<Props> = ({ onExit }) => {
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-900 via-rose-900 to-pink-900 text-white p-4">
      <div className="w-full max-w-3xl bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-red-500/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-500">
            🎴 SHOGI (将棋)
          </h2>
          <div className="text-sm font-bold bg-red-500/20 px-4 py-2 rounded-xl border border-red-500/30">
            Oyuncu {currentPlayer}
          </div>
        </div>

        <div className="bg-amber-800/50 p-6 rounded-2xl border-4 border-amber-900 mb-4">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎴</div>
            <p className="text-amber-200 text-xl font-bold">Japon Satrancı</p>
            <p className="text-amber-300 text-sm mt-2">Yakında tam sürüm!</p>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
          <p className="text-red-200 text-sm">
            🎴 Rakip kralı mat edin! Yakalanan taşları tekrar kullanabilirsiniz!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShogiGame;

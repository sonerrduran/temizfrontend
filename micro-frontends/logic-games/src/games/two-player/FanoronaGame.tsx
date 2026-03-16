import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

const FanoronaGame: React.FC<Props> = ({ onExit }) => {
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-fuchsia-900 text-white p-4">
      <div className="w-full max-w-3xl bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-rose-500/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">
            🎯 FANORONA
          </h2>
          <div className="text-sm font-bold bg-rose-500/20 px-4 py-2 rounded-xl border border-rose-500/30">
            Oyuncu {currentPlayer}
          </div>
        </div>

        <div className="bg-amber-800/50 p-6 rounded-2xl border-4 border-amber-900 mb-4">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-amber-200 text-xl font-bold">Madagaskar Strateji Oyunu</p>
            <p className="text-amber-300 text-sm mt-2">Yakında tam sürüm!</p>
          </div>
        </div>

        <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 text-center">
          <p className="text-rose-200 text-sm">🎯 Rakip taşlarını yakalayarak kazanın!</p>
        </div>
      </div>
    </div>
  );
};

export default FanoronaGame;

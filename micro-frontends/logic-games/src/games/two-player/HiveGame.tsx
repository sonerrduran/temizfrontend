import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

const HiveGame: React.FC<Props> = ({ onExit }) => {
  const [pieces, setPieces] = useState<any[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-900 via-amber-900 to-orange-900 text-white p-4">
      <div className="w-full max-w-3xl bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-yellow-500/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
            🐝 HIVE
          </h2>
          <div className="text-sm font-bold bg-yellow-500/20 px-4 py-2 rounded-xl border border-yellow-500/30">
            Oyuncu {currentPlayer}
          </div>
        </div>

        <div className="bg-amber-800/50 p-8 rounded-2xl border-4 border-amber-900 mb-4 min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🐝🐜🦗🕷️🐞</div>
            <p className="text-amber-200">Böcek taşlarınızı yerleştirin!</p>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-center">
          <p className="text-yellow-200 text-sm">🐝 Rakip Kraliçe Arıyı çevreleyerek kazanın!</p>
        </div>
      </div>
    </div>
  );
};

export default HiveGame;

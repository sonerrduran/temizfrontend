import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

const BlokusDuelGame: React.FC<Props> = ({ onExit }) => {
  const SIZE = 14;
  const [board, setBoard] = useState(
    Array(SIZE)
      .fill(null)
      .map(() => Array(SIZE).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-fuchsia-900 via-pink-900 to-rose-900 text-white p-4">
      <div className="w-full max-w-3xl bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-fuchsia-500/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500">
            🟦 BLOKUS DUEL
          </h2>
          <div className="text-sm font-bold bg-fuchsia-500/20 px-4 py-2 rounded-xl border border-fuchsia-500/30">
            Oyuncu {currentPlayer}
          </div>
        </div>

        <div className="bg-slate-800 p-4 rounded-2xl border-4 border-slate-700 mb-4 overflow-auto">
          <div
            className="grid gap-0.5"
            style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)`, minWidth: '500px' }}
          >
            {board.map((row, r) =>
              row.map((cell, c) => (
                <div
                  key={`${r}-${c}`}
                  className={`aspect-square ${
                    cell === 1 ? 'bg-blue-600' : cell === 2 ? 'bg-red-600' : 'bg-slate-700'
                  }`}
                ></div>
              ))
            )}
          </div>
        </div>

        <div className="bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-xl p-4 text-center">
          <p className="text-fuchsia-200 text-sm">
            🟦 Parçalarınızı köşelerden birleştirerek yerleştirin!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlokusDuelGame;

import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

const TakGame: React.FC<Props> = ({ onExit }) => {
  const SIZE = 5;
  const [board, setBoard] = useState(
    Array(SIZE)
      .fill(null)
      .map(() => Array(SIZE).fill([]))
  );
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-stone-900 text-white p-4">
      <div className="w-full max-w-2xl bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-slate-500/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-gray-400">
            🏔️ TAK
          </h2>
          <div className="text-sm font-bold bg-slate-500/20 px-4 py-2 rounded-xl border border-slate-500/30">
            Oyuncu {currentPlayer}
          </div>
        </div>

        <div className="bg-amber-800/50 p-4 rounded-2xl border-4 border-amber-900 mb-4">
          <div className="grid grid-cols-5 gap-2">
            {board.map((row, r) =>
              row.map((stack, c) => (
                <button
                  key={`${r}-${c}`}
                  className="aspect-square rounded-lg bg-amber-700 hover:bg-amber-600 transition-all flex items-center justify-center text-2xl"
                >
                  {stack.length > 0 && (stack[stack.length - 1] === 1 ? '⬜' : '⬛')}
                </button>
              ))
            )}
          </div>
        </div>

        <div className="bg-slate-500/10 border border-slate-500/30 rounded-xl p-4 text-center">
          <p className="text-slate-200 text-sm">🏔️ Taşlarınızı yığın ve bir yol oluşturun!</p>
        </div>
      </div>
    </div>
  );
};

export default TakGame;

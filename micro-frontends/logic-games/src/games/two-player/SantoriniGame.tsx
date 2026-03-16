import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

const SantoriniGame: React.FC<Props> = ({ onExit }) => {
  const [board, setBoard] = useState(
    Array(5)
      .fill(0)
      .map(() => Array(5).fill(0))
  );
  const [workers, setWorkers] = useState({
    1: [
      [4, 0],
      [4, 1],
    ],
    2: [
      [0, 3],
      [0, 4],
    ],
  });
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-900 via-blue-900 to-indigo-900 text-white p-4">
      <div className="w-full max-w-2xl bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-sky-500/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
            🏛️ SANTORINI
          </h2>
          <div className="text-sm font-bold bg-sky-500/20 px-4 py-2 rounded-xl border border-sky-500/30">
            Oyuncu {currentPlayer}
          </div>
        </div>

        <div className="bg-amber-800/50 p-4 rounded-2xl border-4 border-amber-900 mb-4">
          <div className="grid grid-cols-5 gap-2">
            {board.map((row, r) =>
              row.map((height, c) => {
                const hasWorker1 = workers[1].some(([wr, wc]) => wr === r && wc === c);
                const hasWorker2 = workers[2].some(([wr, wc]) => wr === r && wc === c);
                return (
                  <button
                    key={`${r}-${c}`}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center transition-all ${
                      height === 0
                        ? 'bg-amber-700'
                        : height === 1
                          ? 'bg-amber-600'
                          : height === 2
                            ? 'bg-amber-500'
                            : 'bg-amber-400'
                    } hover:bg-amber-600`}
                  >
                    <div className="text-xs font-bold">{height}</div>
                    {hasWorker1 && <div className="text-2xl">🔵</div>}
                    {hasWorker2 && <div className="text-2xl">🔴</div>}
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="bg-sky-500/10 border border-sky-500/30 rounded-xl p-4 text-center">
          <p className="text-sky-200 text-sm">
            🏛️ İşçilerinizi hareket ettirin ve bina inşa edin! 3. kata çıkan kazanır!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SantoriniGame;

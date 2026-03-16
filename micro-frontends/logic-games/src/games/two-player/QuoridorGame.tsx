import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

const QuoridorGame: React.FC<Props> = ({ onExit }) => {
  const [p1Pos, setP1Pos] = useState({ row: 8, col: 4 });
  const [p2Pos, setP2Pos] = useState({ row: 0, col: 4 });
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [walls, setWalls] = useState<Set<string>>(new Set());
  const [wallsLeft, setWallsLeft] = useState({ 1: 10, 2: 10 });
  const [winner, setWinner] = useState<1 | 2 | null>(null);

  const movePawn = (row: number, col: number) => {
    if (winner) return;
    const pos = currentPlayer === 1 ? p1Pos : p2Pos;
    const dist = Math.abs(row - pos.row) + Math.abs(col - pos.col);
    if (dist !== 1) return;

    if (currentPlayer === 1) {
      setP1Pos({ row, col });
      if (row === 0) setWinner(1);
    } else {
      setP2Pos({ row, col });
      if (row === 8) setWinner(2);
    }
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-4">
      <div className="w-full max-w-3xl bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-indigo-500/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            🧩 QUORIDOR
          </h2>
          <div className="text-sm font-bold bg-indigo-500/20 px-4 py-2 rounded-xl border border-indigo-500/30">
            {winner ? `Kazanan: P${winner}` : `Oyuncu ${currentPlayer}`}
          </div>
        </div>

        <div className="flex justify-center gap-8 mb-4">
          <div className="text-center">
            <div className="text-2xl">🔵</div>
            <div className="text-sm">Duvar: {wallsLeft[1]}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl">🔴</div>
            <div className="text-sm">Duvar: {wallsLeft[2]}</div>
          </div>
        </div>

        <div className="bg-amber-700 p-4 rounded-2xl border-4 border-amber-900 mb-4">
          <div className="grid grid-cols-9 gap-1">
            {Array(9)
              .fill(0)
              .map((_, r) =>
                Array(9)
                  .fill(0)
                  .map((_, c) => (
                    <button
                      key={`${r}-${c}`}
                      onClick={() => movePawn(r, c)}
                      className={`aspect-square rounded-lg flex items-center justify-center text-3xl transition-all ${
                        p1Pos.row === r && p1Pos.col === c
                          ? 'bg-blue-500'
                          : p2Pos.row === r && p2Pos.col === c
                            ? 'bg-red-500'
                            : 'bg-amber-600 hover:bg-amber-500'
                      }`}
                    >
                      {p1Pos.row === r && p1Pos.col === c && '🔵'}
                      {p2Pos.row === r && p2Pos.col === c && '🔴'}
                    </button>
                  ))
              )}
          </div>
        </div>

        <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4 text-center">
          <p className="text-indigo-200 text-sm">
            🧩 Karşı tarafa ulaşın! Duvarlarla rakibinizi engelleyin!
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuoridorGame;

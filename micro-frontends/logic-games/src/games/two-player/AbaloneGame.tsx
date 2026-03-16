import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

type Marble = 1 | 2 | null;

const AbaloneGame: React.FC<Props> = ({ onExit }) => {
  const SIZE = 9;
  const initBoard = (): Marble[][] => {
    const board = Array(SIZE)
      .fill(null)
      .map(() => Array(SIZE).fill(null));
    // Player 1 marbles (top)
    [
      [0, 4],
      [0, 5],
      [1, 3],
      [1, 4],
      [1, 5],
      [1, 6],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 7],
      [2, 8],
    ].forEach(([r, c]) => (board[r][c] = 1));
    // Player 2 marbles (bottom)
    [
      [6, 0],
      [6, 1],
      [6, 2],
      [6, 3],
      [6, 4],
      [7, 2],
      [7, 3],
      [7, 4],
      [7, 5],
      [8, 3],
      [8, 4],
    ].forEach(([r, c]) => (board[r][c] = 2));
    return board;
  };

  const [board, setBoard] = useState<Marble[][]>(initBoard());
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [selected, setSelected] = useState<[number, number][]>([]);
  const [pushedOut, setPushedOut] = useState({ 1: 0, 2: 0 });
  const [winner, setWinner] = useState<1 | 2 | null>(null);

  const handleClick = (r: number, c: number) => {
    if (winner) return;
    if (board[r][c] === currentPlayer) {
      setSelected((prev) => {
        const exists = prev.find(([pr, pc]) => pr === r && pc === c);
        return exists ? prev.filter(([pr, pc]) => !(pr === r && pc === c)) : [...prev, [r, c]];
      });
    }
  };

  const endTurn = () => {
    setSelected([]);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 text-white p-4">
      <div className="w-full max-w-3xl bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-teal-500/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
            🔮 ABALONE
          </h2>
          <div className="text-sm font-bold bg-teal-500/20 px-4 py-2 rounded-xl border border-teal-500/30">
            Oyuncu {currentPlayer}
          </div>
        </div>

        <div className="flex justify-center gap-8 mb-4">
          <div className="text-center">
            <div className="text-2xl">⚫</div>
            <div className="text-sm">Dışarı: {pushedOut[1]}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl">⚪</div>
            <div className="text-sm">Dışarı: {pushedOut[2]}</div>
          </div>
        </div>

        <div className="bg-amber-800/50 p-6 rounded-2xl border-4 border-amber-900 mb-4">
          <div className="grid grid-cols-9 gap-1">
            {board.map((row, r) =>
              row.map((cell, c) => (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleClick(r, c)}
                  className={`aspect-square rounded-full flex items-center justify-center transition-all ${
                    selected.find(([sr, sc]) => sr === r && sc === c)
                      ? 'bg-yellow-500 scale-110'
                      : cell === 1
                        ? 'bg-black hover:bg-gray-800'
                        : cell === 2
                          ? 'bg-white hover:bg-gray-200'
                          : 'bg-amber-700/30'
                  }`}
                >
                  {cell === 1 && (
                    <div className="w-8 h-8 rounded-full bg-black border-2 border-gray-700"></div>
                  )}
                  {cell === 2 && (
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300"></div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <button
            onClick={endTurn}
            className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 px-8 py-3 rounded-xl font-black text-lg shadow-lg transition-all"
          >
            TURU BİTİR
          </button>
        </div>

        <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4 text-center">
          <p className="text-teal-200 text-sm">
            🔮 Rakip bilyelerini tahtadan itin! 6 bilye iten kazanır!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AbaloneGame;

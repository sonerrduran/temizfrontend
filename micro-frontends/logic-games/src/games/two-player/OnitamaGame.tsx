import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

type Piece = 1 | 2 | null;

const OnitamaGame: React.FC<Props> = ({ onExit }) => {
  const initBoard = (): Piece[][] => {
    const board = Array(5)
      .fill(null)
      .map(() => Array(5).fill(null));
    board[0] = [2, 2, 2, 2, 2];
    board[4] = [1, 1, 1, 1, 1];
    return board;
  };

  const [board, setBoard] = useState<Piece[][]>(initBoard());
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [winner, setWinner] = useState<1 | 2 | null>(null);

  const handleClick = (r: number, c: number) => {
    if (winner) return;

    if (selected) {
      const [sr, sc] = selected;
      if (board[r][c] !== currentPlayer) {
        const newBoard = board.map((row) => [...row]);
        newBoard[r][c] = newBoard[sr][sc];
        newBoard[sr][sc] = null;
        setBoard(newBoard);
        setSelected(null);

        // Check win (capture master or reach temple)
        if (
          (currentPlayer === 1 && r === 0 && c === 2) ||
          (currentPlayer === 2 && r === 4 && c === 2)
        ) {
          setWinner(currentPlayer);
        }
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      }
    } else if (board[r][c] === currentPlayer) {
      setSelected([r, c]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-amber-900 text-white p-4">
      <div className="w-full max-w-2xl bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-red-500/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">
            🥋 ONITAMA
          </h2>
          <div className="text-sm font-bold bg-red-500/20 px-4 py-2 rounded-xl border border-red-500/30">
            {winner ? `Kazanan: P${winner}` : `Oyuncu ${currentPlayer}`}
          </div>
        </div>

        <div className="bg-amber-800/50 p-6 rounded-2xl border-4 border-amber-900 mb-4">
          <div className="grid grid-cols-5 gap-2">
            {board.map((row, r) =>
              row.map((cell, c) => (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleClick(r, c)}
                  className={`aspect-square rounded-lg flex items-center justify-center text-3xl transition-all ${
                    selected && selected[0] === r && selected[1] === c
                      ? 'bg-yellow-500 border-4 border-yellow-300'
                      : (r === 0 && c === 2) || (r === 4 && c === 2)
                        ? 'bg-amber-600 border-4 border-amber-400'
                        : 'bg-amber-700 hover:bg-amber-600'
                  }`}
                >
                  {cell === 1 && '🔵'}
                  {cell === 2 && '🔴'}
                  {cell === null && r === 0 && c === 2 && '⛩️'}
                  {cell === null && r === 4 && c === 2 && '⛩️'}
                </button>
              ))
            )}
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
          <p className="text-red-200 text-sm">
            🥋 Ustanızı karşı tapınağa götürün veya rakip ustayı yakalayın!
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnitamaGame;

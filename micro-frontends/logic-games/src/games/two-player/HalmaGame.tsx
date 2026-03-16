import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

type Piece = 1 | 2 | null;

const HalmaGame: React.FC<Props> = ({ onExit }) => {
  const SIZE = 8;
  const initBoard = (): Piece[][] => {
    const board = Array(SIZE)
      .fill(null)
      .map(() => Array(SIZE).fill(null));
    // Player 1 pieces (bottom left)
    for (let r = 5; r < SIZE; r++) {
      for (let c = 0; c < SIZE - r + 4; c++) {
        if (r + c >= 5) board[r][c] = 1;
      }
    }
    // Player 2 pieces (top right)
    for (let r = 0; r < 3; r++) {
      for (let c = SIZE - 3 + r; c < SIZE; c++) {
        board[r][c] = 2;
      }
    }
    return board;
  };

  const [board, setBoard] = useState<Piece[][]>(initBoard());
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [winner, setWinner] = useState<1 | 2 | null>(null);

  const isValidMove = (fromR: number, fromC: number, toR: number, toC: number): boolean => {
    if (board[toR][toC] !== null) return false;
    const dr = Math.abs(toR - fromR);
    const dc = Math.abs(toC - fromC);
    return (
      (dr <= 1 && dc <= 1) ||
      (dr === 2 && dc === 0) ||
      (dr === 0 && dc === 2) ||
      (dr === 2 && dc === 2)
    );
  };

  const handleClick = (r: number, c: number) => {
    if (winner) return;

    if (selected) {
      if (isValidMove(selected[0], selected[1], r, c)) {
        const newBoard = board.map((row) => [...row]);
        newBoard[r][c] = newBoard[selected[0]][selected[1]];
        newBoard[selected[0]][selected[1]] = null;
        setBoard(newBoard);
        setSelected(null);
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      } else {
        setSelected(board[r][c] === currentPlayer ? [r, c] : null);
      }
    } else if (board[r][c] === currentPlayer) {
      setSelected([r, c]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 text-white p-4">
      <div className="w-full max-w-2xl bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-cyan-500/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            🔷 HALMA
          </h2>
          <div className="text-sm font-bold bg-cyan-500/20 px-4 py-2 rounded-xl border border-cyan-500/30">
            Oyuncu {currentPlayer}
          </div>
        </div>

        <div className="bg-slate-800 p-4 rounded-2xl border-4 border-slate-700 mb-4">
          <div className="grid grid-cols-8 gap-1">
            {board.map((row, r) =>
              row.map((cell, c) => (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleClick(r, c)}
                  className={`aspect-square rounded-lg flex items-center justify-center text-2xl transition-all ${
                    selected && selected[0] === r && selected[1] === c
                      ? 'bg-yellow-500 border-4 border-yellow-300'
                      : cell === 1
                        ? 'bg-blue-600 hover:bg-blue-500'
                        : cell === 2
                          ? 'bg-red-600 hover:bg-red-500'
                          : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  {cell === 1 && '🔵'}
                  {cell === 2 && '🔴'}
                </button>
              ))
            )}
          </div>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 text-center">
          <p className="text-cyan-200 text-sm">🔷 Taşlarınızı karşı köşeye taşıyın!</p>
        </div>
      </div>
    </div>
  );
};

export default HalmaGame;

import React, { useState, useEffect } from 'react';
import { TwoPlayerGameWrapper } from '../../shared';

interface Props {
  onExit: () => void;
}

type Player = 'X' | 'O' | null;

const TicTacToeGame: React.FC<Props> = ({ onExit }) => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  useEffect(() => {
    checkWinner();
  }, [board]);

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // cols
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setWinningLine(lines[i]);
        setScores((prev) => ({
          ...prev,
          [board[a] as string]: prev[board[a] as keyof typeof prev] + 1,
        }));
        return;
      }
    }

    if (!board.includes(null) && !winner) {
      setWinner('DRAW' as any);
    }
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinningLine(null);
  };

  return (
    <TwoPlayerGameWrapper
      title="Tic-Tac-Toe"
      emoji="⭕"
      gradientFrom="from-rose-600/40"
      gradientTo="to-orange-700/40"
      onExit={onExit}
    >
      {/* Score Board */}
      <div className="flex gap-8 mb-8 justify-center">
        <div
          className={`flex flex-col items-center p-4 rounded-2xl transition-all bg-slate-800/60 backdrop-blur-md border border-white/20 ${xIsNext && !winner ? 'ring-4 ring-rose-400 scale-110' : 'opacity-60'}`}
        >
          <span className="text-4xl">❌</span>
          <span className="text-rose-400 font-black mt-2">Oyuncu 1</span>
          <span className="text-2xl font-black text-white">{scores.X}</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="text-3xl text-white/30 font-black">SKOR</span>
        </div>
        <div
          className={`flex flex-col items-center p-4 rounded-2xl transition-all bg-slate-800/60 backdrop-blur-md border border-white/20 ${!xIsNext && !winner ? 'ring-4 ring-blue-400 scale-110' : 'opacity-60'}`}
        >
          <span className="text-4xl">⭕</span>
          <span className="text-blue-400 font-black mt-2">Oyuncu 2</span>
          <span className="text-2xl font-black text-white">{scores.O}</span>
        </div>
      </div>

      {/* Game Status */}
      <div className="h-12 mb-6 flex items-center justify-center">
        {winner ? (
          <div
            className={`text-2xl md:text-3xl font-black animate-bounce ${winner === 'X' ? 'text-rose-400' : winner === 'O' ? 'text-blue-400' : 'text-gray-400'}`}
          >
            {winner === 'X' ? '❌ KAZANDI!' : winner === 'O' ? '⭕ KAZANDI!' : '🤝 BERABERE!'}
          </div>
        ) : (
          <div className="text-xl text-white/80 font-bold flex items-center gap-2">
            Sıra:{' '}
            <span className={`text-2xl ${xIsNext ? 'text-rose-400' : 'text-blue-400'}`}>
              {xIsNext ? '❌' : '⭕'}
            </span>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="flex justify-center mb-6">
        <div className="grid grid-cols-3 gap-3 md:gap-4 bg-slate-900/40 backdrop-blur-sm p-4 md:p-6 rounded-3xl border border-white/20">
          {board.map((cell, idx) => {
            const isWinningCell = winningLine?.includes(idx);
            return (
              <button
                key={idx}
                onClick={() => handleClick(idx)}
                disabled={!!cell || !!winner}
                className={`w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center text-5xl md:text-6xl font-black transition-all duration-300
                                    ${!cell && !winner ? 'bg-slate-800 hover:bg-slate-700 hover:scale-105 active:scale-95 cursor-pointer border border-white/10' : ''}
                                    ${cell && !isWinningCell ? 'bg-slate-800/80 cursor-default border border-white/10' : ''}
                                    ${isWinningCell ? (cell === 'X' ? 'bg-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.6)] scale-110 z-10' : 'bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.6)] scale-110 z-10') : ''}
                                `}
                style={{
                  color: cell === 'X' ? '#f43f5e' : '#3b82f6',
                  textShadow: cell ? '0 4px 10px rgba(0,0,0,0.5)' : 'none',
                }}
              >
                <div
                  className={`transform transition-all duration-300 ${cell ? 'scale-100 rotate-0 opacity-100' : 'scale-50 rotate-90 opacity-0'}`}
                >
                  {cell === 'X' ? 'X' : cell === 'O' ? 'O' : ''}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset Button */}
      {winner && (
        <div className="flex justify-center">
          <button
            onClick={resetGame}
            className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xl rounded-2xl shadow-lg hover:scale-105 transition-all active:scale-95"
          >
            TEKRAR OYNA 🔄
          </button>
        </div>
      )}
    </TwoPlayerGameWrapper>
  );
};

export default TicTacToeGame;

import React, { useState, useEffect } from 'react';
import { GameMode } from '../../types';

interface Props {
  onExit: () => void;
}

type Player = 'RED' | 'YELLOW' | null;

const ROWS = 6;
const COLS = 7;

const ConnectFourGame: React.FC<Props> = ({ onExit }) => {
  // board[col][row] where row 0 is bottom
  const [board, setBoard] = useState<Player[][]>(
    Array(COLS)
      .fill([])
      .map(() => [])
  );
  const [redIsNext, setRedIsNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player>(null);
  const [winningCells, setWinningCells] = useState<{ c: number; r: number }[]>([]);
  const [scores, setScores] = useState({ RED: 0, YELLOW: 0 });
  const [hoverCol, setHoverCol] = useState<number | null>(null);

  const checkWinner = (
    currentBoard: Player[][],
    lastCol: number,
    lastRow: number,
    player: Player
  ) => {
    if (!player) return;

    const directions = [
      [
        [0, 1],
        [0, -1],
      ], // Vertical
      [
        [1, 0],
        [-1, 0],
      ], // Horizontal
      [
        [1, 1],
        [-1, -1],
      ], // Diagonal \
      [
        [1, -1],
        [-1, 1],
      ], // Diagonal /
    ];

    for (const axis of directions) {
      let count = 1;
      let cells = [{ c: lastCol, r: lastRow }];

      for (const [dc, dr] of axis) {
        let c = lastCol + dc;
        let r = lastRow + dr;
        while (c >= 0 && c < COLS && r >= 0 && r < ROWS && currentBoard[c][r] === player) {
          count++;
          cells.push({ c, r });
          c += dc;
          r += dr;
        }
      }

      if (count >= 4) {
        setWinner(player);
        setWinningCells(cells);
        setScores((prev) => ({
          ...prev,
          [player as string]: prev[player as keyof typeof prev] + 1,
        }));
        return;
      }
    }

    // Check Draw
    if (currentBoard.every((col) => col.length === ROWS) && !winner) {
      setWinner('DRAW' as any);
    }
  };

  const handleColumnClick = (colIndex: number) => {
    if (winner || board[colIndex].length >= ROWS) return;

    const newBoard = [...board.map((col) => [...col])];
    const player = redIsNext ? 'RED' : 'YELLOW';
    newBoard[colIndex].push(player);

    setBoard(newBoard);

    // Check winner right after dropping
    const newRow = newBoard[colIndex].length - 1;
    checkWinner(newBoard, colIndex, newRow, player);

    if (!winner) {
      setRedIsNext(!redIsNext);
    }
  };

  const resetGame = () => {
    setBoard(
      Array(COLS)
        .fill([])
        .map(() => [])
    );
    setRedIsNext(true);
    setWinner(null);
    setWinningCells([]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bounce-in">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onExit}
          className="px-4 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors flex items-center gap-2 font-bold border border-white/20"
        >
          <span>⬅</span> Çıkış
        </button>
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400 italic drop-shadow-lg">
          Hedef 4
        </h2>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[40px] shadow-2xl flex flex-col items-center">
        {/* Score Board */}
        <div className="flex gap-8 mb-6 w-full justify-center">
          <div
            className={`flex flex-col items-center p-4 rounded-2xl transition-all min-w-[120px] ${redIsNext && !winner ? 'bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.3)] scale-110' : 'bg-white/5 opacity-60'}`}
          >
            <div className="w-8 h-8 rounded-full bg-red-500 shadow-inner mb-2 border-2 border-red-300"></div>
            <span className="text-red-400 font-black">Oyuncu 1</span>
            <span className="text-2xl font-black text-white">{scores.RED}</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-2xl md:text-3xl text-white/30 font-black">SKOR</span>
          </div>
          <div
            className={`flex flex-col items-center p-4 rounded-2xl transition-all min-w-[120px] ${!redIsNext && !winner ? 'bg-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.3)] scale-110' : 'bg-white/5 opacity-60'}`}
          >
            <div className="w-8 h-8 rounded-full bg-yellow-400 shadow-inner mb-2 border-2 border-yellow-200"></div>
            <span className="text-yellow-400 font-black">Oyuncu 2</span>
            <span className="text-2xl font-black text-white">{scores.YELLOW}</span>
          </div>
        </div>

        {/* Game Status */}
        <div className="h-10 mb-4 flex items-center justify-center">
          {winner ? (
            <div
              className={`text-2xl md:text-3xl font-black animate-bounce ${winner === 'RED' ? 'text-red-400' : winner === 'YELLOW' ? 'text-yellow-400' : 'text-gray-400'}`}
            >
              {winner === 'RED'
                ? '🔴 KIRMIZI KAZANDI!'
                : winner === 'YELLOW'
                  ? '🟡 SARI KAZANDI!'
                  : '🤝 BERABERE!'}
            </div>
          ) : (
            <div className="text-lg text-white/80 font-bold flex items-center gap-2">
              Sıra:{' '}
              <div
                className={`w-6 h-6 rounded-full shadow-inner ${redIsNext ? 'bg-red-500 border border-red-300' : 'bg-yellow-400 border border-yellow-200'}`}
              ></div>
            </div>
          )}
        </div>

        {/* Game Board */}
        <div className="bg-blue-600 p-2 md:p-4 rounded-2xl shadow-[0_10px_30px_rgba(37,99,235,0.5)] border-4 border-blue-500 relative">
          {/* Hover Indicator Row */}
          {!winner && (
            <div className="flex gap-1 md:gap-2 mb-2 px-1">
              {Array.from({ length: COLS }).map((_, colIndex) => (
                <div
                  key={`hover-${colIndex}`}
                  className="w-10 h-10 md:w-16 md:h-16 flex justify-center items-end"
                >
                  {hoverCol === colIndex && board[colIndex].length < ROWS && (
                    <div
                      className={`w-8 h-8 md:w-14 md:h-14 rounded-full shadow-lg ${redIsNext ? 'bg-red-500/80 saturate-150' : 'bg-yellow-400/80 saturate-150'} translate-y-2 animate-pulse`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Grid */}
          <div className="flex gap-1 md:gap-2 bg-blue-700/50 p-1 md:p-2 rounded-xl">
            {board.map((col, colIndex) => (
              <div
                key={colIndex}
                className="flex flex-col-reverse gap-1 md:gap-2 cursor-pointer group"
                onClick={() => handleColumnClick(colIndex)}
                onMouseEnter={() => setHoverCol(colIndex)}
                onMouseLeave={() => setHoverCol(null)}
              >
                {Array.from({ length: ROWS }).map((_, rowIndex) => {
                  const cell = col[rowIndex];
                  const isWinningCell = winningCells.some(
                    (w) => w.c === colIndex && w.r === rowIndex
                  );

                  return (
                    <div
                      key={rowIndex}
                      className={`w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300
                        ${isWinningCell ? 'ring-4 ring-white shadow-[0_0_20px_rgba(255,255,255,0.8)] z-10 scale-110' : 'shadow-inner'}
                        bg-slate-900 border-[3px] border-blue-800/50
                      `}
                    >
                      {/* Slot Content */}
                      <div
                        className={`w-[85%] h-[85%] rounded-full transition-transform duration-500 ease-bounce 
                        ${cell ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                        ${cell === 'RED' ? 'bg-gradient-to-br from-red-400 to-red-600 border border-red-300 shadow-[inset_0_-3px_5px_rgba(0,0,0,0.3)]' : ''}
                        ${cell === 'YELLOW' ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 border border-yellow-200 shadow-[inset_0_-3px_5px_rgba(0,0,0,0.3)]' : ''}
                      `}
                      ></div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Base Stand */}
          <div className="absolute -bottom-4 left-[-10px] right-[-10px] h-6 bg-blue-800 rounded-b-xl border-t border-blue-500 shadow-2xl"></div>
          <div className="absolute -bottom-8 left-4 w-6 h-10 bg-blue-700 rounded-b-md shadow-xl transform skew-x-12"></div>
          <div className="absolute -bottom-8 right-4 w-6 h-10 bg-blue-700 rounded-b-md shadow-xl transform -skew-x-12"></div>
        </div>

        {/* Reset Button */}
        {winner && (
          <button
            onClick={resetGame}
            className="mt-16 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xl rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105 transition-all active:scale-95 z-10"
          >
            TEKRAR OYNA 🔄
          </button>
        )}
      </div>
    </div>
  );
};

export default ConnectFourGame;

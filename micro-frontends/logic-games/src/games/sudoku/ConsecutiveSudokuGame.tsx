import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../types';

interface ConsecutiveSudokuGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

const generateSolvedBoard = (size: number): number[][] => {
  const board = Array(size)
    .fill(0)
    .map(() => Array(size).fill(0));
  const boxRows = size === 4 ? 2 : 2;
  const boxCols = size === 4 ? 2 : 3;

  const isValid = (r: number, c: number, num: number) => {
    for (let i = 0; i < size; i++) {
      if (board[r][i] === num || board[i][c] === num) return false;
    }
    const boxStartRow = Math.floor(r / boxRows) * boxRows;
    const boxStartCol = Math.floor(c / boxCols) * boxCols;
    for (let i = 0; i < boxRows; i++) {
      for (let j = 0; j < boxCols; j++) {
        if (board[boxStartRow + i][boxStartCol + j] === num) return false;
      }
    }
    return true;
  };

  const solve = (r = 0, c = 0): boolean => {
    if (r === size) return true;
    if (c === size) return solve(r + 1, 0);

    const digits = Array.from({ length: size }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    for (let num of digits) {
      if (isValid(r, c, num)) {
        board[r][c] = num;
        if (solve(r, c + 1)) return true;
        board[r][c] = 0;
      }
    }
    return false;
  };

  solve();
  return board;
};

const ConsecutiveSudokuGame: React.FC<ConsecutiveSudokuGameProps> = ({
  grade,
  difficulty,
  onComplete,
  onExit,
}) => {
  const size = grade <= 2 ? 4 : 6;
  const [solvedBoard, setSolvedBoard] = useState<number[][]>([]);
  const [board, setBoard] = useState<number[][]>([]);
  const [initialBoard, setInitialBoard] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(size === 4 ? 120 : 300);
  const [isGameOver, setIsGameOver] = useState(false);
  const [mistakes, setMistakes] = useState(0);

  const maxMistakes = difficulty === Difficulty.HARD ? 3 : 5;

  const initGame = useCallback(() => {
    const solved = generateSolvedBoard(size);
    setSolvedBoard(solved);

    let holes =
      size === 4
        ? difficulty === Difficulty.EASY
          ? 6
          : difficulty === Difficulty.HARD
            ? 10
            : 8
        : difficulty === Difficulty.EASY
          ? 15
          : difficulty === Difficulty.HARD
            ? 22
            : 18;

    const newBoard = solved.map((row) => [...row]);

    while (holes > 0) {
      const r = Math.floor(Math.random() * size);
      const c = Math.floor(Math.random() * size);
      if (newBoard[r][c] !== 0) {
        newBoard[r][c] = 0;
        holes--;
      }
    }

    setBoard(newBoard);
    setInitialBoard(newBoard.map((row) => [...row]));
    setTimeLeft(size === 4 ? 120 : 300);
    setMistakes(0);
    setIsGameOver(false);
    setSelectedCell(null);
  }, [size, difficulty]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (isGameOver || board.length === 0) return;
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      endGame(false);
    }
  }, [timeLeft, isGameOver, board.length]);

  const endGame = (win: boolean) => {
    setIsGameOver(true);
    let finalStars = 0;
    if (win) {
      finalStars = 5 - Math.floor(mistakes / 2);
      if (timeLeft > (size === 4 ? 60 : 150)) finalStars += 1;
    } else {
      finalStars = 1;
    }

    setScore(Math.min(5, Math.max(1, finalStars)));
    setTimeout(() => onComplete(Math.min(5, Math.max(1, finalStars))), 3000);
  };

  const handleInput = (num: number) => {
    if (isGameOver || !selectedCell) return;
    const [r, c] = selectedCell;

    if (initialBoard[r][c] !== 0) return;

    if (solvedBoard[r][c] === num) {
      const newBoard = board.map((row) => [...row]);
      newBoard[r][c] = num;
      setBoard(newBoard);

      if (newBoard.every((row) => row.every((cell) => cell !== 0))) {
        endGame(true);
      }
    } else {
      setMistakes((m) => {
        const newM = m + 1;
        if (newM >= maxMistakes) {
          endGame(false);
        }
        return newM;
      });
      setTimeLeft((prev) => Math.max(0, prev - 10));
    }
  };

  const padZero = (n: number) => n.toString().padStart(2, '0');
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${padZero(s % 60)}`;

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/90 backdrop-blur-3xl rounded-[40px] p-6 md:p-8 border border-blue-500/30 shadow-2xl relative overflow-hidden bounce-in">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onExit}
          className="bg-white/10 hover:bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 transition-all font-black text-xl"
        >
          🔙
        </button>
        <div className="text-center flex-1">
          <h2 className="text-2xl md:text-3xl font-black italic text-blue-400 drop-shadow-lg uppercase tracking-tight">
            Ardışık Sudoku
          </h2>
          <div className="text-xs font-bold text-blue-200 mt-1 uppercase tracking-widest">
            {size}x{size} Izgara | (Temel Sürüm) | Hata: {mistakes}/{maxMistakes}
          </div>
        </div>
        <div
          className={`w-16 h-12 rounded-xl flex items-center justify-center font-black text-lg border-2 ${timeLeft <= 30 ? 'border-red-500 text-red-500 animate-pulse' : 'border-blue-400 text-blue-400'}`}
        >
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div
          className="bg-blue-950/50 p-2 md:p-3 rounded-xl border-4 border-blue-900/50 shadow-[0_0_20px_rgba(59,130,246,0.1)] grid gap-0.5 mb-8 relative"
          style={{
            gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
            width: size === 4 ? '280px' : '360px',
          }}
        >
          {board.map((row, r) =>
            row.map((cell, c) => {
              const isFixed = initialBoard[r][c] !== 0;
              const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;

              const boxRows = size === 4 ? 2 : 2;
              const boxCols = size === 4 ? 2 : 3;
              const borderRight =
                (c + 1) % boxCols === 0 && c !== size - 1
                  ? 'border-r-4 border-blue-700/80'
                  : 'border-r border-blue-900/50';
              const borderBottom =
                (r + 1) % boxRows === 0 && r !== size - 1
                  ? 'border-b-4 border-blue-700/80'
                  : 'border-b border-blue-900/50';

              // Show consecutive marker (white bar) if adjacent cells in solved board are consecutive
              const RightRelation =
                c < size - 1 &&
                solvedBoard[r] &&
                solvedBoard[r][c] &&
                solvedBoard[r][c + 1] &&
                Math.abs(solvedBoard[r][c] - solvedBoard[r][c + 1]) === 1;
              const BottomRelation =
                r < size - 1 &&
                solvedBoard[r] &&
                solvedBoard[r + 1] &&
                solvedBoard[r][c] &&
                solvedBoard[r + 1][c] &&
                Math.abs(solvedBoard[r][c] - solvedBoard[r + 1][c]) === 1;

              return (
                <div key={`${r}-${c}`} className="relative">
                  <button
                    onClick={() => !isFixed && setSelectedCell([r, c])}
                    className={`
                         w-full h-full aspect-square flex items-center justify-center text-3xl font-black transition-all
                         ${borderRight} ${borderBottom}
                         ${isFixed ? 'bg-blue-900/40 text-blue-100 cursor-default' : 'bg-slate-800/30 text-blue-300 hover:bg-slate-800/50'}
                         ${isSelected ? 'ring-inset ring-4 ring-blue-400 bg-blue-600/50 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-20' : ''}
                       `}
                  >
                    {cell !== 0 ? cell : ''}
                  </button>

                  {RightRelation && c !== size - 1 && (c + 1) % boxCols !== 0 && (
                    <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 bg-white z-30 pointer-events-none rounded-full w-2 h-6 shadow-[0_0_5px_rgba(255,255,255,0.8)] border border-blue-800"></div>
                  )}
                  {BottomRelation && r !== size - 1 && (r + 1) % boxRows !== 0 && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white z-30 pointer-events-none rounded-full h-2 w-6 shadow-[0_0_5px_rgba(255,255,255,0.8)] border border-blue-800"></div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 max-w-sm">
          {Array.from({ length: size }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handleInput(num)}
              disabled={!selectedCell || initialBoard[selectedCell[0]][selectedCell[1]] !== 0}
              className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-indigo-700 text-white rounded-2xl font-black text-2xl md:text-3xl shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed transition-transform border border-blue-400/50"
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {isGameOver && (
        <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in p-6 text-center rounded-[40px]">
          <h3
            className={`text-5xl md:text-7xl font-black mb-4 drop-shadow-xl ${mistakes >= maxMistakes || timeLeft === 0 ? 'text-red-500' : 'text-yellow-400'}`}
          >
            {mistakes >= maxMistakes ? 'ÇOK HATA!' : timeLeft === 0 ? 'SÜRE BİTTİ' : 'HARİKA!'}
          </h3>
          <p className="text-xl md:text-2xl text-white font-bold mb-8">
            Kazanılan Yıldız: <span className="text-yellow-400">⭐ {score}</span>
          </p>
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ConsecutiveSudokuGame;

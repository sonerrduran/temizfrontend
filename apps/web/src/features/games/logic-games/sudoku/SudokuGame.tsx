import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';

interface SudokuGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

// Helper to generate a solved 4x4 or 6x6 board
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

    // Randomize digit checking order for variations
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

// Main Component
const SudokuGame: React.FC<SudokuGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
  const size = grade <= 2 ? 4 : 6;
  const [solvedBoard, setSolvedBoard] = useState<number[][]>([]);
  const [board, setBoard] = useState<number[][]>([]);
  const [initialBoard, setInitialBoard] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [score, setScore] = useState(0); // stars to earn
  const [timeLeft, setTimeLeft] = useState(size === 4 ? 120 : 300);
  const [isGameOver, setIsGameOver] = useState(false);
  const [mistakes, setMistakes] = useState(0);

  const maxMistakes = difficulty === Difficulty.HARD ? 3 : 5;

  const initGame = useCallback(() => {
    const solved = generateSolvedBoard(size);
    setSolvedBoard(solved);

    // Remove cells based on difficulty
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
    setTimeLeft(size === 4 ? 120 : 300); // 2 mins for 4x4, 5 mins for 6x6
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
      if (timeLeft > (size === 4 ? 60 : 150)) finalStars += 1; // bonus for speed
    } else {
      finalStars = 1; // Participation
    }

    setScore(Math.min(5, Math.max(1, finalStars)));
    setTimeout(() => onComplete(Math.min(5, Math.max(1, finalStars))), 3000);
  };

  const handleInput = (num: number) => {
    if (isGameOver || !selectedCell) return;
    const [r, c] = selectedCell;

    // Don't overwrite initial fixed cells
    if (initialBoard[r][c] !== 0) return;

    if (solvedBoard[r][c] === num) {
      // Correct
      const newBoard = board.map((row) => [...row]);
      newBoard[r][c] = num;
      setBoard(newBoard);

      // Check win
      if (newBoard.every((row) => row.every((cell) => cell !== 0))) {
        endGame(true);
      }
    } else {
      // Wrong
      setMistakes((m) => {
        const newM = m + 1;
        if (newM >= maxMistakes) {
          endGame(false);
        }
        return newM;
      });
      // Time penalty
      setTimeLeft((prev) => Math.max(0, prev - 10));
    }
  };

  const padZero = (n: number) => n.toString().padStart(2, '0');
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${padZero(s % 60)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">
                Hata: {mistakes}/{maxMistakes}
              </span>
            </div>
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">⏱️ {formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black">🔢 Kozmik Sudoku</h1>
          <p className="text-slate-400 text-lg mt-2">
            {size}x{size} Izgara
          </p>
        </div>

        {/* Dış Kart - Lacivert */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          {/* İç Kart - Oyun Rengi (Yeşil) */}
          <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 rounded-2xl p-8 md:p-12 mb-8">
            <div className="flex flex-col items-center">
              {/* Grid */}
              <div
                className="bg-emerald-700/40 p-2 md:p-3 rounded-xl border-2 border-emerald-400 grid gap-1 mb-8"
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
                        ? 'border-r-4 border-emerald-400'
                        : '';
                    const borderBottom =
                      (r + 1) % boxRows === 0 && r !== size - 1
                        ? 'border-b-4 border-emerald-400'
                        : '';

                    return (
                      <button
                        key={`${r}-${c}`}
                        onClick={() => !isFixed && setSelectedCell([r, c])}
                        className={`
                                                  aspect-square flex items-center justify-center text-3xl font-black rounded-md transition-all
                                                  ${borderRight} ${borderBottom}
                                                  ${isFixed ? 'bg-emerald-800/60 text-white cursor-default' : 'bg-emerald-700/20 text-white hover:bg-emerald-600/40'}
                                                  ${isSelected ? 'ring-4 ring-emerald-300 bg-emerald-600/50 z-10' : ''}
                                                `}
                      >
                        {cell !== 0 ? cell : ''}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Numpad */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 max-w-sm">
                {Array.from({ length: size }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => handleInput(num)}
                    disabled={!selectedCell || initialBoard[selectedCell[0]][selectedCell[1]] !== 0}
                    className="w-14 h-14 md:w-16 md:h-16 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-black text-2xl md:text-3xl transition-all hover:scale-105 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed border-2 border-emerald-400"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {isGameOver && (
          <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in p-6 text-center rounded-3xl">
            <h3
              className={`text-5xl md:text-7xl font-black mb-4 ${mistakes >= maxMistakes || timeLeft === 0 ? 'text-red-500' : 'text-yellow-400'}`}
            >
              {mistakes >= maxMistakes ? 'ÇOK HATA!' : timeLeft === 0 ? 'SÜRE BİTTİ' : 'HARİKA!'}
            </h3>
            <p className="text-xl md:text-2xl text-white font-bold mb-8">
              Kazanılan Yıldız: <span className="text-yellow-400">⭐ {score}</span>
            </p>
            <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SudokuGame;

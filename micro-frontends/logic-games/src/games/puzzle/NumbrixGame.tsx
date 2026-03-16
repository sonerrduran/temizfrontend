import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../types';

interface NumbrixGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface BoardData {
  size: number;
  initialBoard: number[][]; // 0 means empty
}

const BOARDS: Record<number, BoardData> = {
  4: {
    size: 4,
    initialBoard: [
      [1, 0, 0, 16],
      [2, 0, 0, 0],
      [0, 5, 10, 0],
      [0, 6, 9, 12],
    ],
  },
  5: {
    size: 5,
    initialBoard: [
      [0, 2, 0, 24, 0],
      [0, 0, 21, 0, 0],
      [0, 15, 14, 13, 0],
      [0, 0, 11, 0, 0],
      [0, 8, 0, 0, 0],
    ],
  },
  6: {
    size: 6,
    initialBoard: [
      [1, 0, 0, 0, 20, 21],
      [0, 0, 5, 0, 0, 0],
      [0, 9, 0, 0, 17, 0],
      [0, 10, 0, 0, 28, 0],
      [0, 0, 13, 0, 0, 0],
      [36, 0, 0, 0, 31, 30],
    ],
  },
};

const NumbrixGame: React.FC<NumbrixGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
  const getSizeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
        return 4;
      case Difficulty.MEDIUM:
        return 5;
      default:
        return 6;
    }
  };

  const getTimeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
        return 600; // 10m
      case Difficulty.MEDIUM:
        return 900; // 15m
      case Difficulty.HARD:
      case Difficulty.VERY_HARD:
        return 1200; // 20m
      default:
        return 900;
    }
  };

  const size = getSizeForDifficulty();
  const boardData = BOARDS[size] || BOARDS[5];

  const [board, setBoard] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [maxMistakes, setMaxMistakes] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getTimeForDifficulty());
  const [isGameOver, setIsGameOver] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const [errorCells, setErrorCells] = useState<{ r: number; c: number }[]>([]);

  const initGame = useCallback(() => {
    const cloned = boardData.initialBoard.map((row) => [...row]);
    setBoard(cloned);
    setSelectedCell(null);
    setErrorCells([]);
    setMistakes(0);
    setTimeLeft(getTimeForDifficulty());
    setIsGameOver(false);
  }, [boardData]);

  useEffect(() => {
    initGame();
    let mm = 3;
    if (difficulty === Difficulty.HARD) mm = 2;
    if (difficulty === Difficulty.VERY_HARD) mm = 1;
    setMaxMistakes(mm);
  }, [initGame, difficulty]);

  useEffect(() => {
    if (isGameOver || showRules) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleGameOver(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isGameOver, showRules]);

  const handleGameOver = (win: boolean) => {
    setIsGameOver(true);
    let finalStars = 1;
    if (win) {
      finalStars = 5 - Math.floor(mistakes / 2);
      if (timeLeft > getTimeForDifficulty() * 0.5) finalStars += 1;
    }
    setScore(Math.min(finalStars, 5));
  };

  const isFixed = (r: number, c: number) => {
    return boardData.initialBoard[r][c] !== 0;
  };

  const handleCellClick = (r: number, c: number) => {
    if (isGameOver || showRules || isFixed(r, c)) return;
    setSelectedCell({ r, c });
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell || isGameOver || showRules) return;
    if (num < 1 || num > size * size) return; // Prevent out of bounds numbers

    const { r, c } = selectedCell;
    const newBoard = board.map((row) => [...row]);

    // Same number check (we don't allow duplicates in Numbrix)
    let existsAt = null;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (newBoard[i][j] === num) existsAt = { i, j };
      }
    }
    if (existsAt) {
      // Already exists. Maybe remove it from old place if it wasn't fixed?
      if (isFixed(existsAt.i, existsAt.j)) return; // Can't remove fixed
      newBoard[existsAt.i][existsAt.j] = 0;
    }

    newBoard[r][c] = num;
    setBoard(newBoard);
    validateBoard(newBoard);
  };

  const handleDelete = () => {
    if (!selectedCell || isGameOver || showRules) return;
    const { r, c } = selectedCell;
    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = 0;
    setBoard(newBoard);
    validateBoard(newBoard);
  };

  const validateBoard = (currentBoard: number[][]) => {
    const errors: { r: number; c: number }[] = [];
    let isFull = true;

    // Find positions of all numbers
    const positions = new Map<number, { r: number; c: number }>();
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const val = currentBoard[r][c];
        if (val === 0) isFull = false;
        else positions.set(val, { r, c });
      }
    }

    // Check continuity. For each n, n+1 must be an orthogonal neighbor
    for (let n = 1; n < size * size; n++) {
      const current = positions.get(n);
      const next = positions.get(n + 1);

      if (current && next) {
        // Check if they are neighbors (dr+dc === 1)
        const dr = Math.abs(current.r - next.r);
        const dc = Math.abs(current.c - next.c);
        if (dr + dc !== 1) {
          errors.push({ r: current.r, c: current.c });
          errors.push({ r: next.r, c: next.c });
        }
      }
    }

    setErrorCells(errors);

    if (isFull && errors.length === 0) {
      handleGameOver(true);
    } else if (isFull && errors.length > 0) {
      setMistakes((m) => {
        const newM = m + 1;
        if (newM >= maxMistakes) handleGameOver(false);
        return newM;
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans selection:bg-rose-500/30">
      {showRules && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
          <div className="bg-slate-800 p-8 rounded-3xl max-w-lg w-full shadow-2xl border border-white/10 bounce-in">
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <span className="text-4xl text-rose-400">🔢</span> Numbrix
            </h2>
            <ul className="space-y-4 mb-8 text-slate-300 text-lg">
              <li className="flex gap-3">
                <span className="text-rose-400">⛓️</span>
                <div>
                  1'den {size * size}'a kadar tüm sayıları <b>ardı ardına (zincirleme)</b>{' '}
                  birleştirmen gerekiyor.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-400">🧭</span>
                <span>
                  Sayılar yalnızca <b>Yatay ve Dikey</b> (yukarı, aşağı, sağ, sol) olarak
                  birbirleriyle bağlantılı olabilir. Çapraz geçiş yasaktır.
                </span>
              </li>
              <li className="flex gap-3 text-emerald-400 font-bold">
                <span>🎯</span>
                <span>
                  Siyah numaralar sabittir. Tablodan eksik sayıları bulup zinciri tamamla!
                </span>
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full py-4 rounded-xl font-black text-xl transition-all bg-rose-600 hover:bg-rose-500 text-white shadow-lg active:scale-95"
            >
              ANLADIM, BAŞLA!
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl px-4 py-6 md:py-12 flex flex-col items-center lg:flex-row lg:items-start lg:justify-center gap-8">
        <div className="flex-1 w-full max-w-md">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 bg-slate-800/50 p-4 md:p-6 rounded-3xl border border-white/5 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <button
                onClick={onExit}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all font-bold relative z-50"
              >
                ⬅ Geri Dön
              </button>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-500">
                  Numbrix
                </h2>
                <div className="text-xs md:text-sm font-bold text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full mt-1 inline-block">
                  SEVİYE: {size}x{size}
                </div>
              </div>
            </div>
            <div className="text-right flex flex-col items-end gap-2">
              <div className="bg-slate-900/80 px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3">
                <span className="text-lg">⏱️</span>
                <span
                  className={`text-xl md:text-2xl font-black font-mono ${timeLeft < 60 ? 'text-rose-400 animate-pulse' : 'text-orange-300'}`}
                >
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <div className="flex gap-1">
                {[...Array(maxMistakes)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${i < mistakes ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]' : 'bg-slate-700'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Board */}
          <div className="flex justify-center">
            <div
              className="grid gap-1 bg-slate-700 p-2 rounded-2xl shadow-2xl border-4 border-slate-800"
              style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
            >
              {board.map((row, r) =>
                row.map((cell, c) => {
                  const fixed = isFixed(r, c);
                  const selected = selectedCell?.r === r && selectedCell?.c === c;
                  const isError = errorCells.some((e) => e.r === r && e.c === c);

                  return (
                    <button
                      key={`${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      className={`w-12 h-12 md:w-16 md:h-16 text-xl md:text-2xl font-black rounded-lg transition-all duration-200 flex items-center justify-center
                                                ${
                                                  fixed
                                                    ? 'bg-slate-800 text-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] cursor-not-allowed'
                                                    : selected
                                                      ? 'bg-orange-400 text-white shadow-[0_0_15px_rgba(251,146,60,0.8)] scale-105 z-10'
                                                      : cell !== 0
                                                        ? 'bg-rose-100 text-rose-900 shadow-md hover:bg-rose-200'
                                                        : 'bg-slate-200 hover:bg-white'
                                                }
                                                ${isError ? 'ring-4 ring-rose-500 animate-pulse' : ''}
                                            `}
                    >
                      {cell !== 0 ? cell : ''}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Numpad */}
        <div className="w-full max-w-xs bg-slate-800 p-6 rounded-3xl shadow-2xl border border-white/10 mt-4 lg:mt-0">
          <h3 className="text-center font-black text-rose-400 mb-4 text-xl">Sayı Girişi</h3>
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => {
                  if (selectedCell) {
                    // For multi-digit input, we just do single digits like a calculator unless it's a fixed button numpad.
                    // Wait, it goes up to 36. So we need a special numpad logic, building numbers.
                    // E.g. clicked 1, then 2 = 12.
                    const currentVal = board[selectedCell.r][selectedCell.c];
                    const newVal = currentVal === 0 ? num : parseInt(`${currentVal}${num}`);
                    if (newVal <= size * size) {
                      handleNumberInput(newVal);
                    }
                  }
                }}
                className="bg-slate-700 hover:bg-orange-500 text-white h-14 md:h-16 rounded-xl font-black text-2xl transition-colors shadow-md active:scale-95"
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => {
                if (selectedCell) {
                  const currentVal = board[selectedCell.r][selectedCell.c];
                  const newVal = currentVal === 0 ? 0 : parseInt(`${currentVal}0`);
                  if (newVal > 0 && newVal <= size * size) {
                    handleNumberInput(newVal);
                  }
                }
              }}
              className="bg-slate-700 hover:bg-orange-500 text-white h-14 md:h-16 rounded-xl font-black text-2xl transition-colors shadow-md active:scale-95"
            >
              0
            </button>
            <button
              onClick={handleDelete}
              className="col-span-2 bg-rose-600 hover:bg-rose-500 text-white h-14 md:h-16 rounded-xl font-black text-xl transition-colors shadow-md active:scale-95"
            >
              SİL (X)
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-4 text-center leading-relaxed">
            Art arda basarak iki basamaklı sayı yazabilirsin (Maks: {size * size}).
          </p>
        </div>
      </div>

      {/* Game Over Overlay */}
      {isGameOver && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-slate-800 p-8 md:p-12 rounded-[2rem] max-w-md w-full text-center shadow-2xl border border-white/10 bounce-in">
            <div className="text-6xl md:text-8xl mb-6">
              {mistakes >= maxMistakes || timeLeft <= 0 ? '💥' : '🎉'}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              {mistakes >= maxMistakes
                ? 'Zincir Koptu!'
                : timeLeft <= 0
                  ? 'Süre Doldu!'
                  : 'Harika!'}
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              {mistakes >= maxMistakes
                ? 'Sayı zinciri yatay ve dikey kesintisiz olmalıydı.'
                : timeLeft <= 0
                  ? 'Süreyi daha iyi kullanmayı dene.'
                  : `Tüm sayıları eksiksiz birleştirdin! Kazanılan Yıldız: ${score}`}
            </p>

            <div className="flex flex-col gap-3">
              {mistakes < maxMistakes && timeLeft > 0 && (
                <button
                  onClick={() => onComplete(score)}
                  className="w-full py-4 rounded-2xl font-black text-xl transition-all bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-lg shadow-green-500/25 active:scale-95"
                >
                  Ödülü Al ⭐️
                </button>
              )}
              <button
                onClick={initGame}
                className="w-full py-4 rounded-2xl font-black text-xl transition-all bg-orange-600 hover:bg-orange-500 text-white shadow-lg active:scale-95"
              >
                Tekrar Dene
              </button>
              <button
                onClick={onExit}
                className="w-full py-4 rounded-2xl font-black text-lg transition-all bg-slate-700 hover:bg-slate-600 text-white shadow-lg active:scale-95"
              >
                Ana Üsse Dön
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NumbrixGame;

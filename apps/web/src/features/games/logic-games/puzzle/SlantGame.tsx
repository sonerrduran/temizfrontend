import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';

interface SlantGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface BoardData {
  size: number;
  hints: { r: number; c: number; val: number }[];
}

const BOARDS: Record<number, BoardData> = {
  4: {
    size: 4,
    hints: [
      { r: 0, c: 0, val: 1 },
      { r: 0, c: 3, val: 1 },
      { r: 1, c: 1, val: 1 },
      { r: 1, c: 3, val: 2 },
      { r: 1, c: 4, val: 1 },
      { r: 2, c: 0, val: 2 },
      { r: 2, c: 2, val: 2 },
      { r: 3, c: 1, val: 3 },
      { r: 3, c: 3, val: 2 },
      { r: 4, c: 1, val: 1 },
      { r: 4, c: 4, val: 1 },
    ],
  },
  5: {
    size: 5,
    hints: [
      { r: 0, c: 1, val: 1 },
      { r: 0, c: 4, val: 1 },
      { r: 1, c: 0, val: 1 },
      { r: 1, c: 3, val: 2 },
      { r: 1, c: 5, val: 1 },
      { r: 2, c: 2, val: 2 },
      { r: 2, c: 4, val: 3 },
      { r: 3, c: 1, val: 3 },
      { r: 3, c: 3, val: 2 },
      { r: 4, c: 0, val: 1 },
      { r: 4, c: 2, val: 1 },
      { r: 4, c: 5, val: 1 },
      { r: 5, c: 3, val: 1 },
      { r: 5, c: 4, val: 1 },
    ],
  },
  6: {
    size: 6,
    hints: [
      { r: 0, c: 1, val: 1 },
      { r: 0, c: 3, val: 2 },
      { r: 0, c: 4, val: 1 },
      { r: 1, c: 0, val: 1 },
      { r: 1, c: 2, val: 3 },
      { r: 1, c: 5, val: 1 },
      { r: 2, c: 1, val: 2 },
      { r: 2, c: 4, val: 2 },
      { r: 2, c: 6, val: 1 },
      { r: 3, c: 2, val: 1 },
      { r: 3, c: 5, val: 3 },
      { r: 4, c: 0, val: 1 },
      { r: 4, c: 3, val: 4 },
      { r: 4, c: 6, val: 0 },
      { r: 5, c: 1, val: 2 },
      { r: 5, c: 4, val: 2 },
      { r: 6, c: 2, val: 1 },
      { r: 6, c: 5, val: 1 },
    ],
  },
};

const SlantGame: React.FC<SlantGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
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

  // 0: empty, 1: \, 2: /
  const [board, setBoard] = useState<number[][]>([]);

  const [mistakes, setMistakes] = useState(0);
  const [maxMistakes, setMaxMistakes] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getTimeForDifficulty());
  const [isGameOver, setIsGameOver] = useState(false);
  const [showRules, setShowRules] = useState(true);

  const initGame = useCallback(() => {
    const initialBoard = Array(size)
      .fill(null)
      .map(() => Array(size).fill(0));
    setBoard(initialBoard);
    setMistakes(0);
    setTimeLeft(getTimeForDifficulty());
    setIsGameOver(false);
  }, [size]);

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

  const handleCellClick = (r: number, c: number) => {
    if (isGameOver || showRules) return;

    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = (newBoard[r][c] + 1) % 3;
    setBoard(newBoard);

    // Immediate loop check could be too punitive if player is just cycling,
    // Wait until full to check. Or check instantly?
    // Slant is very connective, finding loops is the core puzzle. We'll check on full board.
    checkWinCondition(newBoard);
  };

  const hasLoop = (currentBoard: number[][]) => {
    const parent = Array((size + 1) * (size + 1))
      .fill(0)
      .map((_, i) => i);
    const find = (i: number): number => {
      if (parent[i] === i) return i;
      return (parent[i] = find(parent[i]));
    };
    const union = (i: number, j: number) => {
      const rootI = find(i);
      const rootJ = find(j);
      if (rootI === rootJ) return true; // Creates a loop!
      parent[rootI] = rootJ;
      return false;
    };

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c] === 1) {
          // \
          const u = r * (size + 1) + c;
          const v = (r + 1) * (size + 1) + (c + 1);
          if (union(u, v)) return true;
        } else if (currentBoard[r][c] === 2) {
          // /
          const u = r * (size + 1) + (c + 1);
          const v = (r + 1) * (size + 1) + c;
          if (union(u, v)) return true;
        }
      }
    }
    return false;
  };

  const getDegrees = (currentBoard: number[][]) => {
    const degrees = Array(size + 1)
      .fill(0)
      .map(() => Array(size + 1).fill(0));
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c] === 1) {
          degrees[r][c]++;
          degrees[r + 1][c + 1]++;
        } else if (currentBoard[r][c] === 2) {
          degrees[r][c + 1]++;
          degrees[r + 1][c]++;
        }
      }
    }
    return degrees;
  };

  const checkWinCondition = (currentBoard: number[][]) => {
    let isFull = true;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c] === 0) {
          isFull = false;
          break;
        }
      }
    }

    if (!isFull) return;

    // If full, check loops
    let errorFound = false;
    if (hasLoop(currentBoard)) {
      errorFound = true;
    }

    // Check hints
    const degrees = getDegrees(currentBoard);
    for (const hint of boardData.hints) {
      if (degrees[hint.r][hint.c] !== hint.val) {
        errorFound = true;
        break;
      }
    }

    if (errorFound) {
      setMistakes((m) => {
        const newM = m + 1;
        if (newM >= maxMistakes) handleGameOver(false);
        return newM;
      });
      // We empty a random cell or just leave it full so they can fix it?
      // Since it's click-to-cycle, they can fix it by clicking an erroneous cell.
    } else {
      handleGameOver(true);
    }
  };

  // Helper to see if a hint matches currently
  const getCurrentDegrees = useCallback(() => {
    if (!board.length)
      return Array(size + 1)
        .fill(0)
        .map(() => Array(size + 1).fill(0));
    return getDegrees(board);
  }, [board, size]);

  const currentDegrees = getCurrentDegrees();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans selection:bg-pink-500/30">
      {showRules && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
          <div className="bg-slate-800 p-8 rounded-3xl max-w-lg w-full shadow-2xl border border-white/10 bounce-in">
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <span className="text-4xl text-sky-400">📏</span> Slant
            </h2>
            <ul className="space-y-4 mb-8 text-slate-300 text-lg">
              <li className="flex gap-3">
                <span className="text-sky-400">✍️</span>
                <div>
                  Her boş karenin içine köşeden köşeye bir çapraz çizgi ({' '}
                  <span className="text-sky-400 font-bold">\</span> veya{' '}
                  <span className="text-pink-400 font-bold">/</span> ) çizmelisin.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-400">🎯</span>
                <span>
                  Köşelerdeki sayılar, o noktadan <b>kaç tane çizginin geçeceğini</b> (kaç çizginin
                  ucunun o noktaya değeceğini) gösterir.
                </span>
              </li>
              <li className="flex gap-3 text-red-400 font-bold">
                <span>🚫</span>
                <span>
                  Çizgiler kendi içinde asla <b>kapalı bir döngü (loop)</b> oluşturamaz! Zaten
                  başlarken bile nerede döngü olacağını görüp önlemelisin.
                </span>
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full py-4 rounded-xl font-black text-xl transition-all bg-sky-600 hover:bg-sky-500 text-white shadow-lg active:scale-95"
            >
              ANLADIM, BAŞLA!
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl px-4 py-6 md:py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12 bg-slate-800/50 p-4 md:p-6 rounded-3xl border border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={onExit}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all relative z-50"
            >
              ⬅ Geri Dön
            </button>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
                Slant
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
                className={`text-xl md:text-2xl font-black font-mono ${timeLeft < 60 ? 'text-rose-400 animate-pulse' : 'text-sky-300'}`}
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

        {/* Board Container */}
        <div className="flex justify-center mb-8 relative px-6 py-6">
          <div className="relative">
            {/* The Actual Grid */}
            <div
              className="grid bg-[#b9c6d2] border-[4px] border-slate-700 shadow-2xl z-0 relative"
              style={{
                gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
                width: `${size * 60}px`,
                height: `${size * 60}px`,
              }}
            >
              {board.map((row, r) =>
                row.map((cell, c) => (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    className="relative w-[60px] h-[60px] bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors focus:outline-none"
                  >
                    {cell === 1 && (
                      <svg
                        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <line
                          x1="0"
                          y1="0"
                          x2="100"
                          y2="100"
                          stroke="#0ea5e9"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                    {cell === 2 && (
                      <svg
                        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <line
                          x1="100"
                          y1="0"
                          x2="0"
                          y2="100"
                          stroke="#ec4899"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </button>
                ))
              )}
            </div>

            {/* Intersection Hints (Vertices) */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {boardData.hints.map((hint, idx) => {
                const currentAmt = currentDegrees[hint.r]?.[hint.c] || 0;
                const isSatisfied = currentAmt === hint.val;
                const isExceeded = currentAmt > hint.val;
                return (
                  <div
                    key={idx}
                    className={`absolute flex items-center justify-center font-black rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2
                                            ${
                                              isExceeded
                                                ? 'bg-rose-500 text-white animate-pulse'
                                                : isSatisfied
                                                  ? 'bg-emerald-500 text-white border-2 border-emerald-300'
                                                  : 'bg-slate-800 text-white border-2 border-slate-600'
                                            }
                                        `}
                    style={{
                      top: `${(hint.r / size) * 100}%`,
                      left: `${(hint.c / size) * 100}%`,
                      width: '28px',
                      height: '28px',
                      fontSize: '14px',
                    }}
                  >
                    {hint.val}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center bg-slate-800/50 p-4 rounded-2xl border border-white/5 max-w-md mx-auto">
          <p className="text-slate-400 text-sm font-bold">
            1 Tık: <span className="text-sky-400 font-black">\</span> | 2 Tık:{' '}
            <span className="text-pink-400 font-black">/</span> | 3 Tık: Boş
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
                ? 'Tahtada Hata Var!'
                : timeLeft <= 0
                  ? 'Süre Doldu!'
                  : 'Harika!'}
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              {mistakes >= maxMistakes
                ? 'Ya kapalı bir döngü yarattın ya da sayılarla çizgiler uyuşmadı.'
                : timeLeft <= 0
                  ? 'Süreyi daha iyi kullanmayı dene.'
                  : `Slant bulmacasını döngüye girmeden çözdün! Kazanılan Yıldız: ${score}`}
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
                className="w-full py-4 rounded-2xl font-black text-xl transition-all bg-sky-600 hover:bg-sky-500 text-white shadow-lg active:scale-95"
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

export default SlantGame;

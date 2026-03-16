import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../types';

interface RippleEffectGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface BoardData {
  size: number;
  regions: number[][]; // Region IDs for each cell
  initialBoard: number[][]; // 0 means empty
}

const BOARDS: Record<number, BoardData> = {
  4: {
    size: 4,
    regions: [
      [0, 0, 1, 1],
      [2, 0, 1, 3],
      [2, 2, 3, 3],
      [4, 2, 4, 3],
    ],
    initialBoard: [
      [0, 1, 0, 0],
      [0, 0, 0, 0],
      [2, 0, 0, 4],
      [0, 0, 1, 0],
    ],
  },
  5: {
    size: 5,
    regions: [
      [0, 0, 0, 1, 1],
      [2, 0, 3, 3, 1],
      [2, 4, 4, 3, 5],
      [2, 6, 4, 5, 5],
      [6, 6, 6, 7, 5],
    ],
    // size: 5, regions: 8 (0-7)
    initialBoard: [
      [4, 0, 0, 0, 2],
      [0, 0, 2, 0, 0],
      [0, 0, 0, 0, 0],
      [2, 0, 0, 0, 3],
      [0, 3, 0, 0, 0],
    ],
  },
  6: {
    size: 6,
    regions: [
      [0, 0, 1, 1, 2, 2],
      [0, 3, 3, 1, 4, 2],
      [0, 5, 3, 6, 4, 4],
      [7, 5, 3, 6, 8, 8],
      [7, 5, 9, 6, 10, 8],
      [7, 9, 9, 9, 10, 10],
    ],
    initialBoard: [
      [0, 0, 2, 0, 0, 3],
      [0, 4, 0, 0, 2, 0],
      [0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 3, 0],
      [0, 0, 2, 0, 0, 0],
      [0, 0, 0, 4, 0, 1],
    ],
  },
};

const RippleEffectGame: React.FC<RippleEffectGameProps> = ({
  grade,
  difficulty,
  onComplete,
  onExit,
}) => {
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

  // Pre-calculate region sizes
  const regionSizes = useCallback(() => {
    const sizes: Record<number, number> = {};
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const reg = boardData.regions[r][c];
        sizes[reg] = (sizes[reg] || 0) + 1;
      }
    }
    return sizes;
  }, [boardData, size]);

  const rSizes = regionSizes();

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
    const { r, c } = selectedCell;

    const regionId = boardData.regions[r][c];
    const maxVal = rSizes[regionId];

    if (num < 1 || num > maxVal) return; // Cannot place number larger than region size

    const newBoard = board.map((row) => [...row]);
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

    // 1. Region Uniqueness
    const regionMap = new Map<number, { r: number; c: number; val: number }[]>();
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const val = currentBoard[r][c];
        if (val === 0) {
          isFull = false;
          continue;
        }
        const reg = boardData.regions[r][c];
        if (!regionMap.has(reg)) regionMap.set(reg, []);
        regionMap.get(reg)!.push({ r, c, val });
      }
    }

    for (const [reg, cells] of regionMap.entries()) {
      const seen = new Map<number, { r: number; c: number }[]>();
      for (const cell of cells) {
        if (!seen.has(cell.val)) seen.set(cell.val, []);
        seen.get(cell.val)!.push({ r: cell.r, c: cell.c });
      }
      for (const [val, positions] of seen.entries()) {
        if (positions.length > 1) {
          errors.push(...positions);
        }
      }
    }

    // 2. Ripple Effect (Distance Rule in Rows and Cols)
    // For a number 'n', next appearance in same row/col must be at least 'n' cells away.
    // E.g., if array is [3, 0, 0, 0, 3], distance is 4 (indices 4 - 0). Wait, 4-0 = 4. '3' cells away means indices diff > 3. (i.e. diff >= n+1).
    // Example: 3 _ _ 3 -> indices 0 and 3. Diff = 3. Is that allowed?
    // "between them there must be at least n empty cells or other numbers"
    // If there are n cells between them, diff is n+1. So diff > n is allowed.
    for (let r = 0; r < size; r++) {
      for (let c1 = 0; c1 < size; c1++) {
        const val1 = currentBoard[r][c1];
        if (val1 === 0) continue;
        for (let c2 = c1 + 1; c2 < size; c2++) {
          const val2 = currentBoard[r][c2];
          if (val1 === val2) {
            if (c2 - c1 <= val1) {
              errors.push({ r, c: c1 });
              errors.push({ r, c: c2 });
            }
            break; // Only need to check the next closest one
          }
        }
      }
    }

    for (let c = 0; c < size; c++) {
      for (let r1 = 0; r1 < size; r1++) {
        const val1 = currentBoard[r1][c];
        if (val1 === 0) continue;
        for (let r2 = r1 + 1; r2 < size; r2++) {
          const val2 = currentBoard[r2][c];
          if (val1 === val2) {
            if (r2 - r1 <= val1) {
              errors.push({ r: r1, c });
              errors.push({ r: r2, c });
            }
            break;
          }
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

  const getBorderClasses = (r: number, c: number) => {
    let classes = 'border-slate-700/50 '; // Inner borders text-slate-700
    const reg = boardData.regions[r][c];

    if (r === 0 || boardData.regions[r - 1][c] !== reg) classes += 'border-t-[3px] border-t-white ';
    else classes += 'border-t ';

    if (r === size - 1 || boardData.regions[r + 1][c] !== reg)
      classes += 'border-b-[3px] border-b-white ';
    else classes += 'border-b ';

    if (c === 0 || boardData.regions[r][c - 1] !== reg) classes += 'border-l-[3px] border-l-white ';
    else classes += 'border-l ';

    if (c === size - 1 || boardData.regions[r][c + 1] !== reg)
      classes += 'border-r-[3px] border-r-white ';
    else classes += 'border-r ';

    return classes;
  };

  // Calculate max possible number needed for numpad
  const maxNumber = Math.max(...Object.values(rSizes));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans selection:bg-teal-500/30">
      {showRules && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
          <div className="bg-slate-800 p-8 rounded-3xl max-w-lg w-full shadow-2xl border border-white/10 bounce-in">
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <span className="text-4xl text-teal-400">🌊</span> Ripple Effect
            </h2>
            <ul className="space-y-4 mb-8 text-slate-300 text-lg">
              <li className="flex gap-3">
                <span className="text-teal-400">📏</span>
                <div>
                  Her bölgeyi <b>1'den o bölgenin hücre sayısına</b> kadar rakamlarla doldur.
                  (Suguru gibi)
                </div>
              </li>
              <li className="flex gap-3 text-emerald-400 font-bold">
                <span>🌊</span>
                <span>
                  <b>Dalga Etkisi Kuralı:</b> Aynı satır veya sütunda iki tane aynı rakam varsa,
                  aralarında <b>en az o rakamın değeri kadar</b> hücre bulunmalıdır! <br />
                  <span className="text-sm font-normal text-slate-400">
                    (Örn: İki tane 3 arasında en az 3 hücre mesafe olmalı).
                  </span>
                </span>
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full py-4 rounded-xl font-black text-xl transition-all bg-teal-600 hover:bg-teal-500 text-white shadow-lg active:scale-95"
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
                <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
                  Ripple Effect
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
                  className={`text-xl md:text-2xl font-black font-mono ${timeLeft < 60 ? 'text-rose-400 animate-pulse' : 'text-teal-300'}`}
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
              className="grid bg-[#b9c6d2] border-[3px] border-white shadow-2xl relative"
              style={{
                gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
                width: `${size * 50}px`, // Fixed width depending on size
              }}
            >
              {board.map((row, r) =>
                row.map((cell, c) => {
                  const fixed = isFixed(r, c);
                  const selected = selectedCell?.r === r && selectedCell?.c === c;
                  const isError = errorCells.some((e) => e.r === r && e.c === c);
                  const reg = boardData.regions[r][c];

                  // Create a checkerboard-like tint based on region to make regions pop
                  const regColors = [
                    'bg-blue-100',
                    'bg-green-100',
                    'bg-yellow-100',
                    'bg-pink-100',
                    'bg-purple-100',
                    'bg-teal-100',
                    'bg-orange-100',
                    'bg-indigo-100',
                    'bg-rose-100',
                    'bg-lime-100',
                    'bg-fuchsia-100',
                  ];
                  const baseColor = regColors[reg % regColors.length];

                  return (
                    <button
                      key={`${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      className={`relative h-[50px] text-xl md:text-2xl font-black transition-all duration-200 flex items-center justify-center ${getBorderClasses(r, c)}
                                                ${
                                                  fixed
                                                    ? `text-slate-900 font-black ${baseColor} brightness-90`
                                                    : selected
                                                      ? 'bg-teal-400 text-white shadow-[inset_0_0_15px_rgba(20,184,166,0.8)] z-10'
                                                      : cell !== 0
                                                        ? `text-teal-700 ${baseColor} brightness-105 hover:brightness-110`
                                                        : `${baseColor} hover:brightness-95`
                                                }
                                            `}
                    >
                      {isError && (
                        <div className="absolute inset-0 bg-red-500/30 animate-pulse pointer-events-none"></div>
                      )}
                      <span className="relative z-10 drop-shadow-sm">{cell !== 0 ? cell : ''}</span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Numpad */}
        <div className="w-full max-w-xs bg-slate-800 p-6 rounded-3xl shadow-2xl border border-white/10 mt-4 lg:mt-0">
          <h3 className="text-center font-black text-teal-400 mb-4 text-xl">Rakam Seçimi</h3>

          {selectedCell ? (
            <p className="text-center text-sm text-slate-400 mb-4 bg-slate-900/50 p-2 rounded-lg border border-slate-700">
              Seçili bölge boyutu:{' '}
              <b className="text-teal-400">
                {rSizes[boardData.regions[selectedCell.r][selectedCell.c]]}
              </b>
            </p>
          ) : (
            <p className="text-center text-sm text-slate-500 mb-4 h-[38px]">
              Lütfen bir boş hücre seçin.
            </p>
          )}

          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: maxNumber }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handleNumberInput(num)}
                disabled={
                  !selectedCell || num > rSizes[boardData.regions[selectedCell.r][selectedCell.c]]
                }
                className={`h-14 md:h-16 rounded-xl font-black text-2xl transition-colors shadow-md active:scale-95
                                    ${
                                      !selectedCell ||
                                      num >
                                        rSizes[boardData.regions[selectedCell.r][selectedCell.c]]
                                        ? 'bg-slate-800 text-slate-600 border border-slate-700 cursor-not-allowed hidden'
                                        : 'bg-slate-700 hover:bg-teal-500 text-white'
                                    }
                                `}
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleDelete}
              disabled={!selectedCell}
              className={`col-span-full h-14 md:h-16 rounded-xl font-black text-xl transition-colors shadow-md active:scale-95 mt-2
                                ${!selectedCell ? 'bg-slate-800 text-slate-600 border border-slate-700 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-500 text-white'}
                            `}
            >
              SİL (X)
            </button>
          </div>
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
                ? 'Dalga Çarpıştı!'
                : timeLeft <= 0
                  ? 'Süre Doldu!'
                  : 'Harika!'}
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              {mistakes >= maxMistakes
                ? 'Aynı rakamlar arasındaki mesafe kuralını ihlal ettin.'
                : timeLeft <= 0
                  ? 'Süreyi daha iyi kullanmayı dene.'
                  : `Ripple Effect bulmacasını mükemmel çözdün! Kazanılan Yıldız: ${score}`}
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
                className="w-full py-4 rounded-2xl font-black text-xl transition-all bg-teal-600 hover:bg-teal-500 text-white shadow-lg active:scale-95"
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

export default RippleEffectGame;

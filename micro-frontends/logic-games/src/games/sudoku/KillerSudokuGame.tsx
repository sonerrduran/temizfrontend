import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../types';

interface KillerSudokuGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

// Helpers
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

const CAGE_COLORS = [
  'bg-red-500/30',
  'bg-blue-500/30',
  'bg-green-500/30',
  'bg-yellow-500/30',
  'bg-purple-500/30',
  'bg-pink-500/30',
  'bg-cyan-500/30',
];

interface Cage {
  id: number;
  sum: number;
  cells: number[][]; // [r, c] pairs
  colorIndex?: number;
  clueCell: number[];
}

const generateCages = (board: number[][], size: number) => {
  const cages: Cage[] = [];
  const cageIdBoard = Array(size)
    .fill(0)
    .map(() => Array(size).fill(0));
  let cageIdCounter = 1;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (cageIdBoard[r][c] === 0) {
        const cageSize = Math.floor(Math.random() * 3) + 2; // size 2 to 4
        const cells: number[][] = [];
        let currentR = r;
        let currentC = c;

        for (let i = 0; i < cageSize; i++) {
          if (cageIdBoard[currentR][currentC] === 0) {
            cells.push([currentR, currentC]);
            cageIdBoard[currentR][currentC] = cageIdCounter;

            const neighbors = [
              [currentR - 1, currentC],
              [currentR + 1, currentC],
              [currentR, currentC - 1],
              [currentR, currentC + 1],
            ].filter(
              ([nr, nc]) =>
                nr >= 0 && nr < size && nc >= 0 && nc < size && cageIdBoard[nr][nc] === 0
            );

            if (neighbors.length === 0) break;
            const next = neighbors[Math.floor(Math.random() * neighbors.length)];
            currentR = next[0];
            currentC = next[1];
          } else {
            break;
          }
        }

        let sum = 0;
        const digits = new Set();
        let valid = true;
        for (const [cr, cc] of cells) {
          const val = board[cr][cc];
          if (digits.has(val)) {
            valid = false;
            break;
          }
          digits.add(val);
          sum += val;
        }

        if (!valid || cells.length === 0) {
          // Revert to 1-cell cage
          cells.forEach(([cr, cc]) => {
            cageIdBoard[cr][cc] = 0;
          });
          cells.length = 0;
          cells.push([r, c]);
          cageIdBoard[r][c] = cageIdCounter;
          sum = board[r][c];
        }

        // Clue stays at the top-leftmost cell
        const clueCell = [...cells].sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]))[0];

        cages.push({
          id: cageIdCounter++,
          sum,
          cells,
          clueCell,
        });
      }
    }
  }

  // Assign colors using simple greedy coloring
  cages.forEach((cage) => {
    const neighborColors = new Set();
    cage.cells.forEach(([r, c]) => {
      [
        [r - 1, c],
        [r + 1, c],
        [r, c - 1],
        [r, c + 1],
      ].forEach(([nr, nc]) => {
        if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
          const neighborCageId = cageIdBoard[nr][nc];
          if (neighborCageId !== cage.id) {
            const neighborCage = cages.find((c) => c.id === neighborCageId);
            if (neighborCage && neighborCage.colorIndex !== undefined) {
              neighborColors.add(neighborCage.colorIndex);
            }
          }
        }
      });
    });
    for (let col = 0; col < CAGE_COLORS.length; col++) {
      if (!neighborColors.has(col)) {
        cage.colorIndex = col;
        break;
      }
    }
  });

  return { cages, cageIdBoard };
};

const KillerSudokuGame: React.FC<KillerSudokuGameProps> = ({
  grade,
  difficulty,
  onComplete,
  onExit,
}) => {
  const getSizeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
      case Difficulty.MEDIUM:
        return 4;
      case Difficulty.HARD:
      case Difficulty.VERY_HARD:
        return 6;
      default:
        return 4;
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
  const [solvedBoard, setSolvedBoard] = useState<number[][]>([]);
  const [board, setBoard] = useState<number[][]>([]);
  const [cages, setCages] = useState<Cage[]>([]);
  const [cageIdBoard, setCageIdBoard] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getTimeForDifficulty());
  const [isGameOver, setIsGameOver] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [showRules, setShowRules] = useState(true);

  const maxMistakes = difficulty === Difficulty.HARD || difficulty === Difficulty.VERY_HARD ? 3 : 5;

  const initGame = useCallback(() => {
    const solved = generateSolvedBoard(size);
    const { cages, cageIdBoard } = generateCages(solved, size);

    setSolvedBoard(solved);
    setCages(cages);
    setCageIdBoard(cageIdBoard);
    setBoard(
      Array(size)
        .fill(0)
        .map(() => Array(size).fill(0))
    );

    setTimeLeft(getTimeForDifficulty());
    setMistakes(0);
    setIsGameOver(false);
    setSelectedCell(null);
  }, [size, difficulty]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (isGameOver || solvedBoard.length === 0 || showRules) return;
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      endGame(false);
    }
  }, [timeLeft, isGameOver, solvedBoard.length, showRules]);

  const endGame = (win: boolean) => {
    setIsGameOver(true);
    let finalStars = 0;
    if (win) {
      finalStars = 5 - Math.floor(mistakes / 2);
      if (timeLeft > getTimeForDifficulty() * 0.5) finalStars += 1;
    } else {
      finalStars = 1;
    }

    setScore(Math.min(5, Math.max(1, finalStars)));
  };

  const handleInput = (num: number) => {
    if (isGameOver || !selectedCell) return;
    const [r, c] = selectedCell;

    if (board[r][c] !== 0) return; // Prevent overwriting

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Ana Kart - Dış Katman */}
      <div className="w-full max-w-4xl bg-slate-800/80 backdrop-blur-xl rounded-[40px] p-1 border border-slate-700 shadow-2xl">
        {/* İç Oyun Alanı - Mor Gradient */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[36px] p-8 relative overflow-hidden">
          {/* Çıkış Butonu - Sol Üst */}
          <button
            onClick={onExit}
            className="absolute top-6 left-6 w-12 h-12 bg-red-600/90 hover:bg-red-500/90 rounded-full flex items-center justify-center text-white font-black text-xl transition-all z-10 shadow-lg"
          >
            ✕
          </button>

          {/* Sağ Üst Bilgi Kartı */}
          <div className="absolute top-6 right-6 bg-slate-800/80 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/20 flex gap-3">
            <div className="text-white/90 text-sm font-bold">
              Hata: {mistakes}/{maxMistakes}
            </div>
            <div
              className={`text-sm font-bold ${timeLeft <= 30 ? 'text-red-400 animate-pulse' : 'text-white/90'}`}
            >
              ⏱️ {formatTime(timeLeft)}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center min-h-[700px] text-white pt-16">
            {/* Başlık */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-black mb-2">🧩 Killer Sudoku</h1>
              <p className="text-white/80 text-lg">
                {size}x{size} Izgara
              </p>
            </div>

            {/* Nasıl Oynanır Butonu */}
            <button
              onClick={() => setShowRules(true)}
              className="mb-6 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-2xl font-bold transition-all border border-white/30"
            >
              📖 Nasıl Oynanır?
            </button>

            {/* Grid */}
            <div
              className="bg-slate-900/60 backdrop-blur-sm p-2 md:p-3 rounded-xl border-2 border-white/20 shadow-2xl grid gap-0.5 mb-8"
              style={{
                gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
                width: size === 4 ? '320px' : '400px',
              }}
            >
              {board.map((row, r) =>
                row.map((cell, c) => {
                  const cageId = cageIdBoard.length > 0 ? cageIdBoard[r][c] : 0;
                  const cage = cages.find((c) => c.id === cageId);
                  const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;

                  const boxRows = size === 4 ? 2 : 2;
                  const boxCols = size === 4 ? 2 : 3;
                  const borderRight =
                    (c + 1) % boxCols === 0 && c !== size - 1 ? 'border-r-2 border-r-white/40' : '';
                  const borderBottom =
                    (r + 1) % boxRows === 0 && r !== size - 1 ? 'border-b-2 border-b-white/40' : '';

                  const isClue = cage?.clueCell[0] === r && cage?.clueCell[1] === c;
                  const colorClass =
                    cage && cage.colorIndex !== undefined
                      ? CAGE_COLORS[cage.colorIndex]
                      : 'bg-transparent';

                  return (
                    <button
                      key={`${r}-${c}`}
                      onClick={() => setSelectedCell([r, c])}
                      className={`
                                                relative aspect-square flex items-center justify-center text-2xl md:text-3xl font-black rounded-sm transition-all
                                                ${borderRight} ${borderBottom}
                                                ${colorClass}
                                                ${isSelected ? 'ring-4 ring-yellow-400 z-10 scale-105 shadow-xl' : 'hover:brightness-125'}
                                            `}
                    >
                      {isClue && (
                        <div className="absolute top-0.5 left-1 text-[9px] md:text-[11px] font-black text-white/90 drop-shadow-md leading-none z-0">
                          {cage.sum}
                        </div>
                      )}
                      <span className="z-10 text-white drop-shadow-md">
                        {cell !== 0 ? cell : ''}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Numpad */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-md">
              {Array.from({ length: size }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => handleInput(num)}
                  disabled={!selectedCell || board[selectedCell[0]][selectedCell[1]] !== 0}
                  className="w-14 h-14 md:w-16 md:h-16 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-2xl font-black text-2xl md:text-3xl transition-all transform hover:scale-105 disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed border border-white/30"
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rules Overlay */}
      {showRules && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6">
          <div className="bg-slate-800/90 backdrop-blur-xl p-8 rounded-3xl border border-indigo-500/50 max-w-2xl w-full">
            <div className="text-6xl mb-6 text-center">🧩</div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-6 text-center">
              Nasıl Oynanır?
            </h3>
            <ul className="text-white/90 text-left space-y-4 mb-8 text-base md:text-lg">
              <li className="flex gap-3">
                <span className="text-indigo-400 font-black text-xl">1.</span>
                <span>
                  Normal Sudoku kuralları geçerlidir: Her satır ve her sütunda sayılar benzersiz
                  olmalıdır.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-400 font-black text-xl">2.</span>
                <span>
                  Izgara, renkli <span className="text-white font-bold">kafeslere (bölgelere)</span>{' '}
                  ayrılmıştır.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-400 font-black text-xl">3.</span>
                <span>
                  Bir kafesin köşesinde yazan küçük sayı, o kafesin içindeki hücrelerin{' '}
                  <span className="text-white font-bold">TOPLAMINA</span> eşit olmalıdır.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-400 font-black text-xl">4.</span>
                <span>
                  Bir kafes içerisinde aynı sayı birden fazla kez{' '}
                  <span className="text-red-400 font-bold">KULLANILAMAZ.</span>
                </span>
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full bg-gradient-to-br from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600 text-white font-black py-4 rounded-2xl transition-all transform hover:scale-105 text-lg"
            >
              ANLADIM, BAŞLA! 🚀
            </button>
          </div>
        </div>
      )}

      {/* Game Over Overlay */}
      {isGameOver && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6">
          <div className="bg-slate-800/90 backdrop-blur-xl p-8 rounded-3xl border border-indigo-500/50 max-w-md w-full text-center">
            <h3
              className={`text-5xl md:text-6xl font-black mb-6 ${mistakes >= maxMistakes || timeLeft === 0 ? 'text-red-500' : 'text-yellow-400'}`}
            >
              {mistakes >= maxMistakes
                ? '❌ ÇOK HATA!'
                : timeLeft === 0
                  ? '⏰ SÜRE BİTTİ'
                  : '🎉 HARİKA!'}
            </h3>
            <p className="text-2xl md:text-3xl text-white font-bold mb-8">
              Kazanılan Yıldız: <span className="text-yellow-400">⭐ {score}</span>
            </p>

            <div className="flex flex-col gap-4 w-full">
              <button
                onClick={() => initGame()}
                className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-white font-bold py-4 rounded-2xl transition-all transform hover:scale-105"
              >
                🔄 Tekrar Oyna
              </button>
              <button
                onClick={() => onComplete(score)}
                className="w-full bg-gradient-to-br from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600 text-white font-bold py-4 rounded-2xl transition-all transform hover:scale-105"
              >
                ← Geri Dön
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KillerSudokuGame;

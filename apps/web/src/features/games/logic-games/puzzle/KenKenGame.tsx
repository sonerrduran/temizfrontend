import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';

interface KenKenGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

type Operation = '+' | '-' | '*' | '/' | '';

interface Cage {
  id: number;
  target: number;
  op: Operation;
  cells: { r: number; c: number }[];
}

interface BoardData {
  size: number;
  cages: Cage[];
  solution: number[][]; // For fast checking, though we can calculate it
}

const BOARDS: Record<number, BoardData> = {
  4: {
    // 4x4
    size: 4,
    solution: [
      [2, 1, 4, 3],
      [1, 4, 3, 2],
      [3, 2, 1, 4],
      [4, 3, 2, 1],
    ],
    cages: [
      {
        id: 1,
        target: 8,
        op: '*',
        cells: [
          { r: 0, c: 0 },
          { r: 0, c: 1 },
          { r: 1, c: 1 },
        ],
      },
      {
        id: 2,
        target: 7,
        op: '+',
        cells: [
          { r: 0, c: 2 },
          { r: 0, c: 3 },
        ],
      },
      {
        id: 3,
        target: 2,
        op: '-',
        cells: [
          { r: 1, c: 0 },
          { r: 2, c: 0 },
        ],
      },
      {
        id: 4,
        target: 12,
        op: '*',
        cells: [
          { r: 1, c: 2 },
          { r: 1, c: 3 },
          { r: 2, c: 3 },
        ],
      },
      {
        id: 5,
        target: 6,
        op: '*',
        cells: [
          { r: 2, c: 1 },
          { r: 2, c: 2 },
          { r: 3, c: 2 },
        ],
      },
      {
        id: 6,
        target: 1,
        op: '-',
        cells: [
          { r: 3, c: 0 },
          { r: 3, c: 1 },
        ],
      },
      { id: 7, target: 1, op: '', cells: [{ r: 3, c: 3 }] },
    ],
  },
  // We can add 5x5 for harder difficulties later
};

const KenKenGame: React.FC<KenKenGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
  const getSizeForDifficulty = () => {
    return 4; // Static for now as BOARDS only contains size 4
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
  const boardData = BOARDS[size];

  const [grid, setGrid] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getTimeForDifficulty());
  const [isGameOver, setIsGameOver] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [showRules, setShowRules] = useState(true);

  const initGame = useCallback(() => {
    const initialGrid = Array(size)
      .fill(0)
      .map(() => Array(size).fill(0));
    setGrid(initialGrid);
    setSelectedCell(null);
    setTimeLeft(getTimeForDifficulty());
    setIsGameOver(false);
    setMistakes(0);
  }, [size]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (isGameOver || grid.length === 0 || showRules) return;
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      endGame(false);
    }
  }, [timeLeft, isGameOver, grid.length, showRules]);

  const endGame = (win: boolean) => {
    setIsGameOver(true);
    let finalStars = 1;
    if (win) {
      finalStars = timeLeft > getTimeForDifficulty() * 0.5 ? 5 : 4;
    }
    setScore(finalStars);
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell || isGameOver) return;
    const { r, c } = selectedCell;

    // Check if number is valid in Row and Col (Latin Square)
    for (let i = 0; i < size; i++) {
      if (i !== c && grid[r][i] === num) {
        setMistakes((m) => m + 1);
        return; // Conflict in row
      }
      if (i !== r && grid[i][c] === num) {
        setMistakes((m) => m + 1);
        return; // Conflict in col
      }
    }

    const newGrid = grid.map((row) => [...row]);
    newGrid[r][c] = num;
    setGrid(newGrid);

    checkWinCondition(newGrid);
  };

  const handleClearCell = () => {
    if (!selectedCell || isGameOver) return;
    const { r, c } = selectedCell;
    const newGrid = grid.map((row) => [...row]);
    newGrid[r][c] = 0;
    setGrid(newGrid);
  };

  const evaluateCage = (cage: Cage, currentGrid: number[][]): boolean => {
    const values = cage.cells.map((cell) => currentGrid[cell.r][cell.c]);
    // If cage is not fully filled, it's not "wrong", we just can't evaluate it yet as complete
    if (values.includes(0)) return false;

    if (cage.op === '') return values[0] === cage.target;

    if (cage.op === '+') {
      const sum = values.reduce((a, b) => a + b, 0);
      return sum === cage.target;
    }

    if (cage.op === '*') {
      const prod = values.reduce((a, b) => a * b, 1);
      return prod === cage.target;
    }

    if (cage.op === '-') {
      // Must be 2 cells
      if (values.length !== 2) return false;
      return Math.abs(values[0] - values[1]) === cage.target;
    }

    if (cage.op === '/') {
      // Must be 2 cells
      if (values.length !== 2) return false;
      const max = Math.max(values[0], values[1]);
      const min = Math.min(values[0], values[1]);
      if (min === 0) return false;
      return max / min === cage.target;
    }

    return false;
  };

  const checkWinCondition = (currentGrid: number[][]) => {
    // 1. Check if fully filled
    let isFilled = true;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentGrid[r][c] === 0) {
          isFilled = false;
          break;
        }
      }
      if (!isFilled) break;
    }

    if (!isFilled) return;

    // 2. Check all cages
    for (const cage of boardData.cages) {
      if (!evaluateCage(cage, currentGrid)) return;
    }

    // 3. Since Latin square property is enforced on input, if filled and cages pass, it's a win!
    endGame(true);
  };

  // Helper to determine border styles for cages
  const getCageBorders = (r: number, c: number) => {
    const cage = boardData.cages.find((cg) =>
      cg.cells.some((cell) => cell.r === r && cell.c === c)
    );
    if (!cage) return '';

    let borders = '';
    const sameCageAbove = r > 0 && cage.cells.some((cell) => cell.r === r - 1 && cell.c === c);
    const sameCageBelow =
      r < size - 1 && cage.cells.some((cell) => cell.r === r + 1 && cell.c === c);
    const sameCageLeft = c > 0 && cage.cells.some((cell) => cell.r === r && cell.c === c - 1);
    const sameCageRight =
      c < size - 1 && cage.cells.some((cell) => cell.r === r && cell.c === c + 1);

    if (!sameCageAbove) borders += 'border-t-[3px] border-t-blue-400 ';
    if (!sameCageBelow) borders += 'border-b-[3px] border-b-blue-400 ';
    if (!sameCageLeft) borders += 'border-l-[3px] border-l-blue-400 ';
    if (!sameCageRight) borders += 'border-r-[3px] border-r-blue-400 ';

    return borders;
  };

  // Determine if this cell should render the cage clue
  const getCageClue = (r: number, c: number) => {
    const cage = boardData.cages.find((cg) =>
      cg.cells.some((cell) => cell.r === r && cell.c === c)
    );
    if (!cage) return null;

    // Find the top-left most cell of the cage to place the clue
    let minR = size;
    let minC = size;
    cage.cells.forEach((cell) => {
      if (cell.r < minR) {
        minR = cell.r;
        minC = cell.c;
      } else if (cell.r === minR && cell.c < minC) {
        minC = cell.c;
      }
    });

    if (r === minR && c === minC) {
      return `${cage.target}${cage.op}`;
    }
    return null;
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
            KenKen
          </h2>
          <div className="text-sm font-bold text-blue-200 mt-1 uppercase tracking-widest">
            {size}x{size} Izgara | Hata: {mistakes}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowRules(true)}
            className="bg-blue-500/20 text-blue-300 border border-blue-500/50 hover:bg-blue-500/40 w-12 h-12 md:w-auto md:px-4 rounded-xl flex items-center justify-center transition-all font-black text-xl md:text-sm"
          >
            <span className="md:hidden">📖</span>
            <span className="hidden md:inline">NASIL OYNANIR?</span>
          </button>
          <div
            className={`w-16 h-12 rounded-xl flex items-center justify-center font-black text-lg border-2 ${timeLeft <= 30 ? 'border-red-500 text-red-500 animate-pulse' : 'border-blue-400 text-blue-400'}`}
          >
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        {/* KenKen Grid */}
        <div
          className="bg-white p-1 rounded-sm border-2 border-blue-500 shadow-xl grid gap-0.5 mb-8 max-w-[400px] w-full"
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
        >
          {grid.map((row, r) =>
            row.map((val, c) => {
              const isSelected = selectedCell?.r === r && selectedCell?.c === c;
              const borders = getCageBorders(r, c);
              const clue = getCageClue(r, c);

              return (
                <div
                  key={`${r}-${c}`}
                  onClick={() => setSelectedCell({ r, c })}
                  className={`
                                        aspect-square relative flex items-center justify-center text-3xl md:text-5xl font-black transition-all cursor-pointer box-border
                                        ${borders} border border-slate-200
                                        ${isSelected ? 'bg-blue-200 shadow-[inset_0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white hover:bg-slate-50'}
                                        ${val !== 0 ? 'text-indigo-900' : ''}
                                    `}
                >
                  {clue && (
                    <div className="absolute top-0.5 left-1 text-[10px] md:text-xs font-bold text-slate-700 pointer-events-none drop-shadow-sm">
                      {clue}
                    </div>
                  )}
                  {val !== 0 ? val : ''}
                </div>
              );
            })
          )}
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-5 gap-2 w-full max-w-[400px]">
          {Array.from({ length: size }).map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handleNumberInput(i + 1)}
              disabled={!selectedCell || isGameOver}
              className={`
                                text-2xl font-black py-4 rounded-2xl transition-all border-b-4 active:border-b-0 active:translate-y-1
                                ${selectedCell ? 'bg-gradient-to-t from-blue-700 to-indigo-500 hover:from-blue-600 hover:to-indigo-400 text-white border-blue-900 shadow-lg' : 'bg-slate-800 text-slate-500 border-slate-900 cursor-not-allowed'}
                            `}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={handleClearCell}
            disabled={!selectedCell || isGameOver}
            className={`text-xl font-black py-4 rounded-2xl transition-all border-b-4 active:border-b-0 active:translate-y-1
                            ${selectedCell ? 'bg-gradient-to-t from-red-600 to-rose-400 hover:from-red-500 hover:to-rose-300 text-white border-red-800 shadow-lg' : 'bg-slate-800 text-slate-500 border-slate-900 cursor-not-allowed'}
                        `}
          >
            ⌫
          </button>
        </div>
      </div>

      {/* Rules Overlay */}
      {showRules && (
        <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center rounded-[40px] animate-in fade-in zoom-in">
          <div className="bg-slate-800/80 p-6 md:p-8 rounded-3xl border border-blue-500/30 max-w-md w-full shadow-2xl">
            <div className="text-5xl mb-4">🔢➕</div>
            <h3 className="text-2xl md:text-3xl font-black text-blue-400 mb-4 uppercase">
              Nasıl Oynanır?
            </h3>
            <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base font-medium">
              <li className="flex gap-2">
                <span className="text-blue-400">1.</span> Her satır ve sütunda 1'den {size}'e kadar
                olan rakamlar tam olarak bir kez yer almalıdır (Sudoku gibi).
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">2.</span> Kalın çizgilerle çevrili alanlara
                **"Kafes"** denir.
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">3.</span> Her kafesin sol üst köşesindeki sayı ve
                işlem (örn. 12*), o kafesin içindeki sayıların belirtilen işlem kullanılarak o hedef
                sayıyı vermesi gerektiğini söyler.
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">4.</span> Kafes içindeki sayılar, kafes aynı
                satır/sütunda bükülmediği sürece kendisini tekrar edebilir!
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-black py-4 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 text-lg"
            >
              ANLADIM, BAŞLA! 🚀
            </button>
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in p-6 text-center rounded-[40px]">
          <h3
            className={`text-5xl md:text-7xl font-black mb-4 drop-shadow-xl ${timeLeft === 0 ? 'text-red-500' : 'text-blue-400'}`}
          >
            {timeLeft === 0 ? 'SÜRE BİTTİ' : 'MATEMATİK KAFESİ ÇÖZÜLDÜ!'}
          </h3>
          <p className="text-xl md:text-2xl text-white font-bold mb-8">
            Kazanılan Yıldız: <span className="text-blue-400">⭐ {score}</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <button
              onClick={() => {
                initGame();
              }}
              className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
            >
              🔄 TEKRAR OYNA
            </button>
            <button
              onClick={() => onComplete(score)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-black py-4 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              🏠 ANA ÜSSE DÖN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KenKenGame;

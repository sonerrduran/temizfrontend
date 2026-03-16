import React, { useState, useEffect } from 'react';
import { Difficulty } from '../../types';

interface SuguruGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

type CellState = number | null;

interface Region {
  id: number;
  cells: { r: number; c: number }[];
  maxSize: number;
}

interface BoardData {
  regions: Region[];
  initial?: { r: number; c: number; val: number }[];
}

const BOARDS: Record<number, BoardData> = {
  4: {
    regions: [
      {
        id: 1,
        cells: [
          { r: 0, c: 0 },
          { r: 0, c: 1 },
          { r: 1, c: 0 },
        ],
        maxSize: 3,
      },
      {
        id: 2,
        cells: [
          { r: 0, c: 2 },
          { r: 0, c: 3 },
          { r: 1, c: 3 },
        ],
        maxSize: 3,
      },
      {
        id: 3,
        cells: [
          { r: 1, c: 1 },
          { r: 1, c: 2 },
          { r: 2, c: 1 },
          { r: 2, c: 2 },
        ],
        maxSize: 4,
      },
      {
        id: 4,
        cells: [
          { r: 2, c: 0 },
          { r: 3, c: 0 },
          { r: 3, c: 1 },
        ],
        maxSize: 3,
      },
      {
        id: 5,
        cells: [
          { r: 2, c: 3 },
          { r: 3, c: 2 },
          { r: 3, c: 3 },
        ],
        maxSize: 3,
      },
    ],
    initial: [
      { r: 0, c: 0, val: 2 },
      { r: 2, c: 2, val: 4 },
    ],
  },
  5: {
    regions: [
      {
        id: 1,
        cells: [
          { r: 0, c: 0 },
          { r: 0, c: 1 },
          { r: 1, c: 0 },
          { r: 2, c: 0 },
        ],
        maxSize: 4,
      },
      {
        id: 2,
        cells: [
          { r: 0, c: 2 },
          { r: 0, c: 3 },
          { r: 1, c: 2 },
          { r: 1, c: 3 },
        ],
        maxSize: 4,
      },
      {
        id: 3,
        cells: [
          { r: 0, c: 4 },
          { r: 1, c: 4 },
          { r: 2, c: 4 },
        ],
        maxSize: 3,
      },
      {
        id: 4,
        cells: [
          { r: 1, c: 1 },
          { r: 2, c: 1 },
          { r: 2, c: 2 },
          { r: 3, c: 1 },
          { r: 3, c: 2 },
        ],
        maxSize: 5,
      },
      {
        id: 5,
        cells: [
          { r: 2, c: 3 },
          { r: 3, c: 3 },
          { r: 4, c: 3 },
          { r: 4, c: 4 },
        ],
        maxSize: 4,
      },
      { id: 6, cells: [{ r: 3, c: 4 }], maxSize: 1 },
      {
        id: 7,
        cells: [
          { r: 3, c: 0 },
          { r: 4, c: 0 },
          { r: 4, c: 1 },
          { r: 4, c: 2 },
        ],
        maxSize: 4,
      },
    ],
    initial: [
      { r: 1, c: 2, val: 3 },
      { r: 3, c: 1, val: 4 },
      { r: 4, c: 4, val: 1 },
    ],
  },
};

const SuguruGame: React.FC<SuguruGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
  const getSizeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
        return 4;
      default:
        return 5;
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

  const [board, setBoard] = useState<CellState[][]>([]);
  const [initialCells, setInitialCells] = useState<{ r: number; c: number; val: number }[]>([]);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);

  const [mistakes, setMistakes] = useState(0);
  const [maxMistakes, setMaxMistakes] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getTimeForDifficulty());
  const [isGameOver, setIsGameOver] = useState(false);
  const [showRules, setShowRules] = useState(true);

  useEffect(() => {
    initGame();
    let mm = 3;
    if (difficulty === Difficulty.HARD) mm = 2;
    if (difficulty === Difficulty.VERY_HARD) mm = 1;
    setMaxMistakes(mm);
  }, [size, difficulty]);

  const initGame = () => {
    const initialBoard = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));
    const initData = boardData.initial || [];

    initData.forEach((cell) => {
      initialBoard[cell.r][cell.c] = cell.val;
    });

    setBoard(initialBoard);
    setInitialCells([...initData]);
    setSelectedCell(null);
    setMistakes(0);
    setTimeLeft(getTimeForDifficulty());
    setIsGameOver(false);
  };

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

  const checkWinCondition = (currentBoard: CellState[][]) => {
    let isFull = true;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c] === null) {
          isFull = false;
          break;
        }
      }
      if (!isFull) break;
    }

    if (isFull) {
      // Check rules: All full regions + no adjacent touches
      if (isValidBoard(currentBoard)) {
        handleGameOver(true);
      }
    }
  };

  const isValidBoard = (currentBoard: CellState[][]) => {
    // 1. Check if regions contain 1 to maxSize
    for (const region of boardData.regions) {
      const vals = region.cells
        .map((cell) => currentBoard[cell.r][cell.c])
        .filter((v) => v !== null) as number[];
      const uniqueVals = new Set(vals);
      if (vals.length !== region.maxSize || uniqueVals.size !== region.maxSize) return false;
      if (Math.max(...vals) > region.maxSize) return false;
    }

    // 2. Check adjacency (including diagonals)
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const val = currentBoard[r][c];
        if (val === null) continue;

        const hasAdjacent = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ].some(([dr, dc]) => {
          const nr = r + dr,
            nc = c + dc;
          if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
            return currentBoard[nr][nc] === val;
          }
          return false;
        });

        if (hasAdjacent) return false;
      }
    }

    return true;
  };

  const handleGameOver = (win: boolean) => {
    setIsGameOver(true);
    let finalStars = 1;
    if (win) {
      finalStars = 5 - Math.floor(mistakes / 2);
      if (timeLeft > getTimeForDifficulty() * 0.5) finalStars += 1; // Time bonus
    }
    setScore(Math.min(finalStars, 5));
  };

  const handleCellClick = (r: number, c: number) => {
    if (isGameOver || showRules) return;
    if (initialCells.some((ic) => ic.r === r && ic.c === c)) return;
    setSelectedCell({ r, c });
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell || isGameOver || showRules) return;
    const { r, c } = selectedCell;

    // Validation Check before placing
    let isInvalid = false;

    // Check adjacency
    const adjacentConflict = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ].some(([dr, dc]) => {
      const nr = r + dr,
        nc = c + dc;
      return nr >= 0 && nr < size && nc >= 0 && nc < size && board[nr][nc] === num;
    });

    if (adjacentConflict) isInvalid = true;

    // Check region limits
    const region = boardData.regions.find((reg) =>
      reg.cells.some((cell) => cell.r === r && cell.c === c)
    );
    if (region) {
      if (num > region.maxSize) isInvalid = true;
      const regionHasNum = region.cells.some(
        (cell) => (cell.r !== r || cell.c !== c) && board[cell.r][cell.c] === num
      );
      if (regionHasNum) isInvalid = true;
    }

    if (isInvalid) {
      setMistakes((m) => {
        const newM = m + 1;
        if (newM >= maxMistakes) handleGameOver(false);
        return newM;
      });
      return; // Don't place invalid number
    }

    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = num;
    setBoard(newBoard);
    checkWinCondition(newBoard);
  };

  const handleErase = () => {
    if (!selectedCell || isGameOver || showRules) return;
    const { r, c } = selectedCell;
    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = null;
    setBoard(newBoard);
  };

  const getCellBorders = (r: number, c: number) => {
    const region = boardData.regions.find((reg) =>
      reg.cells.some((cell) => cell.r === r && cell.c === c)
    );
    if (!region) return '';

    let borders = 'border border-indigo-200/20 '; // default soft border

    const hasTop = !region.cells.some((cell) => cell.r === r - 1 && cell.c === c);
    const hasBottom = !region.cells.some((cell) => cell.r === r + 1 && cell.c === c);
    const hasLeft = !region.cells.some((cell) => cell.r === r && cell.c === c - 1);
    const hasRight = !region.cells.some((cell) => cell.r === r && cell.c === c + 1);

    if (hasTop) borders += 'border-t-[3px] border-t-indigo-300 ';
    if (hasBottom) borders += 'border-b-[3px] border-b-indigo-300 ';
    if (hasLeft) borders += 'border-l-[3px] border-l-indigo-300 ';
    if (hasRight) borders += 'border-r-[3px] border-r-indigo-300 ';

    return borders;
  };

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
              <span className="text-white font-black">
                ⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black">🗺️ Suguru</h1>
          <p className="text-slate-400 text-lg mt-2">
            {size}x{size} Izgara
          </p>
        </div>

        {/* Dış Kart - Lacivert */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          {/* İç Kart - Oyun Rengi (İndigo) */}
          <div className="bg-gradient-to-br from-indigo-500 via-blue-500 to-indigo-600 rounded-2xl p-8 md:p-12 mb-8">
            {/* Board */}
            <div className="flex justify-center mb-8 relative">
              <div
                className="grid gap-0 bg-indigo-700/40 p-1 rounded-sm border-2 border-indigo-400"
                style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
              >
                {board.map((row, r) =>
                  row.map((val, c) => {
                    const isInitial = initialCells.some((ic) => ic.r === r && ic.c === c);
                    const isSelected = selectedCell?.r === r && selectedCell?.c === c;
                    const borders = getCellBorders(r, c);

                    return (
                      <button
                        key={`${r}-${c}`}
                        onClick={() => handleCellClick(r, c)}
                        className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-xl md:text-3xl font-black transition-all ${borders} ${
                          isSelected
                            ? 'bg-indigo-500/50 shadow-inner'
                            : val !== null
                              ? isInitial
                                ? 'bg-indigo-950/80 text-indigo-200'
                                : 'bg-indigo-800/60 text-white'
                              : 'bg-indigo-900/40 hover:bg-white/5 text-transparent'
                        }`}
                      >
                        {val}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Numpad */}
            <div className="grid grid-cols-5 gap-2 md:gap-3 max-w-sm mx-auto mb-6">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberInput(num)}
                  className="bg-indigo-500 hover:bg-indigo-400 p-4 rounded-2xl font-black text-2xl md:text-3xl text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-indigo-400"
                  disabled={isGameOver || showRules || !selectedCell}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={handleErase}
                className="col-span-5 bg-red-500/90 hover:bg-red-400/90 p-4 rounded-2xl font-black text-xl text-white transition-all active:scale-95 disabled:opacity-50 border-2 border-red-400"
                disabled={isGameOver || showRules || !selectedCell}
              >
                SİL
              </button>
            </div>

            {/* Nasıl Oynanır Butonu */}
            <button
              onClick={() => setShowRules(true)}
              className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold text-white transition-all"
            >
              NASIL OYNANIR?
            </button>
          </div>
        </div>
      </div>

      {/* Kurallar Overlay */}
      {showRules && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-3xl border border-indigo-500/30 max-w-md w-full">
            <div className="text-5xl mb-4">🗺️</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Nasıl Oynanır?</h3>
            <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base">
              <li className="flex gap-2">
                <span className="text-indigo-400 font-bold">1.</span> Her bölgeye 1'den başlayarak
                bölge boyutu kadar sayı yerleştir.
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-400 font-bold">2.</span> Aynı sayılar yatay, dikey veya
                çapraz olarak birbirine değemez!
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-400 font-bold">3.</span> Her bölgede her sayı sadece
                bir kez kullanılabilir.
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full bg-gradient-to-br from-indigo-600 to-blue-700 hover:from-indigo-500 hover:to-blue-600 text-white font-black py-4 rounded-xl transition-all transform hover:scale-105"
            >
              ANLADIM, BAŞLA! 🚀
            </button>
          </div>
        </div>
      )}

      {/* Game Over Overlay */}
      {isGameOver && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
          <div className="bg-slate-800/90 p-8 rounded-3xl border border-indigo-500/30 max-w-md w-full">
            <h3
              className={`text-5xl md:text-6xl font-black mb-4 ${mistakes >= maxMistakes || timeLeft === 0 ? 'text-red-500' : 'text-yellow-400'}`}
            >
              {mistakes >= maxMistakes
                ? '❌ ÇOK HATA!'
                : timeLeft === 0
                  ? '⏰ SÜRE BİTTİ'
                  : '🎉 HARİKA!'}
            </h3>
            <p className="text-xl md:text-2xl text-white font-bold mb-8">
              Kazanılan Yıldız: <span className="text-yellow-400">⭐ {score}</span>
            </p>

            <div className="flex flex-col gap-4 w-full">
              <button
                onClick={() => initGame()}
                className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105"
              >
                🔄 Tekrar Oyna
              </button>
              <button
                onClick={() => onComplete(score)}
                className="w-full bg-gradient-to-br from-indigo-600 to-blue-700 hover:from-indigo-500 hover:to-blue-600 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105"
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

export default SuguruGame;

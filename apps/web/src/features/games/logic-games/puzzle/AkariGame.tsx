import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';

interface AkariGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

type CellType = 'white' | 'black';

interface Cell {
  r: number;
  c: number;
  type: CellType;
  clue: number | null; // For black cells: 0-4, null means no clue
  hasBulb: boolean;
  isIlluminated: boolean; // Computed dynamically
  isError: boolean; // Bulb shining on another bulb, or clue count wrong
}

interface BoardData {
  size: number;
  blacks: { r: number; c: number; clue: number | null }[];
}

const BOARDS: Record<number, BoardData> = {
  5: {
    // 5x5 easy
    size: 5,
    blacks: [
      { r: 0, c: 4, clue: null },
      { r: 1, c: 1, clue: 1 },
      { r: 2, c: 2, clue: 0 },
      { r: 3, c: 3, clue: null },
      { r: 4, c: 0, clue: 2 },
    ],
  },
  7: {
    // 7x7 medium
    size: 7,
    blacks: [
      { r: 0, c: 3, clue: 1 },
      { r: 1, c: 1, clue: 2 },
      { r: 1, c: 5, clue: null },
      { r: 3, c: 0, clue: null },
      { r: 3, c: 3, clue: 2 },
      { r: 3, c: 6, clue: 1 },
      { r: 5, c: 1, clue: null },
      { r: 5, c: 5, clue: 0 },
      { r: 6, c: 3, clue: null },
    ],
  },
};

const AkariGame: React.FC<AkariGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
  const getSizeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
      case Difficulty.MEDIUM:
        return 5;
      case Difficulty.HARD:
      case Difficulty.VERY_HARD:
        return 7;
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
  const [board, setBoard] = useState<Cell[][]>([]);

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getTimeForDifficulty());
  const [isGameOver, setIsGameOver] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [showRules, setShowRules] = useState(true);

  const maxMistakes = difficulty === Difficulty.HARD || difficulty === Difficulty.VERY_HARD ? 3 : 5;

  const initGame = useCallback(() => {
    const boardData = BOARDS[size] || BOARDS[5];
    const newBoard: Cell[][] = [];

    for (let r = 0; r < size; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < size; c++) {
        row.push({
          r,
          c,
          type: 'white',
          clue: null,
          hasBulb: false,
          isIlluminated: false,
          isError: false,
        });
      }
      newBoard.push(row);
    }

    boardData.blacks.forEach((b) => {
      newBoard[b.r][b.c].type = 'black';
      newBoard[b.r][b.c].clue = b.clue;
    });

    setBoard(newBoard);
    setTimeLeft(getTimeForDifficulty());
    setIsGameOver(false);
    setMistakes(0);
  }, [size]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (isGameOver || board.length === 0 || showRules) return;
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      endGame(false);
    }
  }, [timeLeft, isGameOver, board.length, showRules]);

  const endGame = (win: boolean) => {
    setIsGameOver(true);
    let finalStars = 1;
    if (win) {
      finalStars = 5 - Math.floor(mistakes / 2);
      if (timeLeft > getTimeForDifficulty() * 0.5) finalStars += 1;
    }
    setScore(Math.min(5, Math.max(1, finalStars)));
  };

  const updateIllumination = (currentBoard: Cell[][]) => {
    // Reset illumination and errors
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c].type === 'white') {
          currentBoard[r][c].isIlluminated = currentBoard[r][c].hasBulb;
        }
        currentBoard[r][c].isError = false;
      }
    }

    let bulbClash = false;

    // Raycast from every bulb
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c].hasBulb) {
          // Cast Up
          for (let rr = r - 1; rr >= 0; rr--) {
            if (currentBoard[rr][c].type === 'black') break;
            if (currentBoard[rr][c].hasBulb) {
              currentBoard[r][c].isError = true;
              currentBoard[rr][c].isError = true;
              bulbClash = true;
            }
            currentBoard[rr][c].isIlluminated = true;
          }
          // Cast Down
          for (let rr = r + 1; rr < size; rr++) {
            if (currentBoard[rr][c].type === 'black') break;
            if (currentBoard[rr][c].hasBulb) {
              currentBoard[r][c].isError = true;
              currentBoard[rr][c].isError = true;
              bulbClash = true;
            }
            currentBoard[rr][c].isIlluminated = true;
          }
          // Cast Left
          for (let cc = c - 1; cc >= 0; cc--) {
            if (currentBoard[r][cc].type === 'black') break;
            if (currentBoard[r][cc].hasBulb) {
              currentBoard[r][c].isError = true;
              currentBoard[r][cc].isError = true;
              bulbClash = true;
            }
            currentBoard[r][cc].isIlluminated = true;
          }
          // Cast Right
          for (let cc = c + 1; cc < size; cc++) {
            if (currentBoard[r][cc].type === 'black') break;
            if (currentBoard[r][cc].hasBulb) {
              currentBoard[r][c].isError = true;
              currentBoard[r][cc].isError = true;
              bulbClash = true;
            }
            currentBoard[r][cc].isIlluminated = true;
          }
        }
      }
    }

    // Check Black Cell Clues
    let clueError = false;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c].type === 'black' && currentBoard[r][c].clue !== null) {
          let adjacentBulbs = 0;
          if (r > 0 && currentBoard[r - 1][c].hasBulb) adjacentBulbs++;
          if (r < size - 1 && currentBoard[r + 1][c].hasBulb) adjacentBulbs++;
          if (c > 0 && currentBoard[r][c - 1].hasBulb) adjacentBulbs++;
          if (c < size - 1 && currentBoard[r][c + 1].hasBulb) adjacentBulbs++;

          if (adjacentBulbs > currentBoard[r][c].clue!) {
            currentBoard[r][c].isError = true;
            clueError = true;
          }
        }
      }
    }

    setBoard([...currentBoard]);

    if (bulbClash || clueError) {
      setMistakes((m) => {
        const newM = m + 1;
        if (newM >= maxMistakes) endGame(false);
        return newM;
      });
      // We do not immediately return/fail on bulb clash to let user undo it,
      // but if they hit max mistakes it's game over.
      return;
    }

    // Check win condition if no errors
    // 1. All whites illuminated
    let allIlluminated = true;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c].type === 'white' && !currentBoard[r][c].isIlluminated) {
          allIlluminated = false;
          break;
        }
      }
      if (!allIlluminated) break;
    }

    // 2. All clues EXACTLY satisfied
    let allCluesSatisfied = true;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c].type === 'black' && currentBoard[r][c].clue !== null) {
          let adjacentBulbs = 0;
          if (r > 0 && currentBoard[r - 1][c].hasBulb) adjacentBulbs++;
          if (r < size - 1 && currentBoard[r + 1][c].hasBulb) adjacentBulbs++;
          if (c > 0 && currentBoard[r][c - 1].hasBulb) adjacentBulbs++;
          if (c < size - 1 && currentBoard[r][c + 1].hasBulb) adjacentBulbs++;

          if (adjacentBulbs !== currentBoard[r][c].clue) {
            allCluesSatisfied = false;
            break;
          }
        }
      }
      if (!allCluesSatisfied) break;
    }

    if (allIlluminated && allCluesSatisfied) {
      endGame(true);
    }
  };

  const handleCellClick = (r: number, c: number) => {
    if (isGameOver || board[r][c].type === 'black') return;

    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    newBoard[r][c].hasBulb = !newBoard[r][c].hasBulb;

    updateIllumination(newBoard);
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
            className="px-6 py-3 bg-red-600/90 hover:bg-red-700 text-white rounded-xl font-bold transition-all transform hover:scale-105"
          >
            ← Çıkış
          </button>

          <div className="flex gap-4">
            <div className="px-6 py-3 bg-slate-700/50 backdrop-blur-sm rounded-xl border border-white/10">
              <span className="text-white font-bold">
                Hata: {mistakes}/{maxMistakes}
              </span>
            </div>
            <div
              className={`px-6 py-3 rounded-xl border-2 font-bold ${timeLeft <= 30 ? 'border-red-500 text-red-500 bg-red-500/10 animate-pulse' : 'border-yellow-400 text-yellow-400 bg-yellow-500/10'}`}
            >
              ⏱️ {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black mb-2">💡 Akari</h1>
          <p className="text-white/70 text-lg">
            {size}x{size} Bölge
          </p>
        </div>

        {/* Dış Kart */}
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          {/* İç Kart */}
          <div className="bg-gradient-to-br from-yellow-600/40 to-amber-700/40 rounded-2xl p-8 border border-yellow-500/30">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setShowRules(true)}
                className="px-4 py-2 bg-yellow-600/90 hover:bg-yellow-700 text-white rounded-xl font-bold transition-all transform hover:scale-105"
              >
                📖 Nasıl Oynanır?
              </button>
            </div>

            <div className="flex flex-col items-center">
              {/* Akari Grid */}
              <div
                className="bg-slate-300 p-1 md:p-2 rounded-xl shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)] grid gap-1 border-4 border-slate-700 mb-8 max-w-[400px] w-full"
                style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
              >
                {board.map((row, r) =>
                  row.map((cell, c) => {
                    if (cell.type === 'black') {
                      return (
                        <div
                          key={`${r}-${c}`}
                          className={`aspect-square rounded-sm shadow-inner flex items-center justify-center text-xl md:text-3xl font-black transition-all ${cell.isError ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-800 text-white/90'}`}
                        >
                          {cell.clue !== null ? cell.clue : ''}
                        </div>
                      );
                    }

                    return (
                      <button
                        key={`${r}-${c}`}
                        onClick={() => handleCellClick(r, c)}
                        className={`
                                        aspect-square flex items-center justify-center text-3xl md:text-5xl rounded-sm transition-all shadow-sm
                                        ${
                                          cell.hasBulb
                                            ? cell.isError
                                              ? 'bg-red-500 ring-2 ring-red-700 animate-pulse'
                                              : 'bg-yellow-300 ring-4 ring-yellow-400 z-10 scale-105'
                                            : cell.isIlluminated
                                              ? 'bg-yellow-100 shadow-[inset_0_0_15px_rgba(250,204,21,0.5)]'
                                              : 'bg-white hover:bg-slate-100'
                                        }
                                    `}
                      >
                        {cell.hasBulb ? '💡' : ''}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rules Overlay */}
      {showRules && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-3xl border border-yellow-500/30 max-w-md w-full">
            <div className="text-5xl mb-4">💡</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Nasıl Oynanır?</h3>
            <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base font-medium">
              <li className="flex gap-2">
                <span className="text-yellow-400">1.</span> Amacın, ızgaradaki tüm beyaz kareleri
                ampuller koyarak aydınlatmaktır.
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-400">2.</span> Ampuller yatay ve dikey yönde (siyah
                duvarlara çarpana kadar) ışık saçar. O karenin ışıklandığını göreceksin.
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-400">3.</span> Siyah hücrelerdeki sayılar, o siyah
                hücrenin sağına, soluna, altına ve üstüne toplam kaç ampul konulması gerektiğini
                gösterir.
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-400">4.</span> Bir ampul, başka bir ampulü
                aydınlatamaz! (İki ampul aynı satır/sütunda birbirini göremez, aksi halde
                kırılırlar).
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full bg-gradient-to-br from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105"
            >
              ANLADIM, BAŞLA! 🚀
            </button>
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
          <div className="bg-slate-800/90 p-8 rounded-3xl border border-yellow-500/30 max-w-md w-full">
            <h3
              className={`text-5xl md:text-6xl font-black mb-4 ${mistakes >= maxMistakes || timeLeft === 0 ? 'text-red-500' : 'text-yellow-400'}`}
            >
              {mistakes >= maxMistakes
                ? '❌ ÇOK HATA!'
                : timeLeft === 0
                  ? '⏰ SÜRE BİTTİ'
                  : '💡 IŞIL IŞIL!'}
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
                className="w-full bg-gradient-to-br from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105"
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

export default AkariGame;

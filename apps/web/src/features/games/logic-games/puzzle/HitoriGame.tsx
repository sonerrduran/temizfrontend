import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';

interface HitoriGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

type CellState = 'white' | 'black' | 'circled';

interface BoardData {
  size: number;
  grid: number[][];
}

const BOARDS: Record<number, BoardData> = {
  5: {
    // 5x5 easy
    size: 5,
    grid: [
      [1, 5, 3, 1, 2],
      [5, 4, 1, 3, 4],
      [3, 4, 3, 1, 5],
      [4, 4, 2, 3, 3],
      [2, 1, 5, 4, 4],
    ],
  },
};

const HitoriGame: React.FC<HitoriGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
  const getSizeForDifficulty = () => {
    return 5; // Static to avoid breaking BOARDS
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

  // state[r][c] tracking
  const [board, setBoard] = useState<CellState[][]>([]);

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getTimeForDifficulty());
  const [isGameOver, setIsGameOver] = useState(false);
  const [showRules, setShowRules] = useState(true);

  const initGame = useCallback(() => {
    const initialBoard = Array(size)
      .fill(null)
      .map(() => Array(size).fill('white' as CellState));
    setBoard(initialBoard);
    setTimeLeft(getTimeForDifficulty());
    setIsGameOver(false);
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
      finalStars = timeLeft > getTimeForDifficulty() * 0.5 ? 5 : 4;
    }
    setScore(finalStars);
  };

  const handleCellClick = (r: number, c: number) => {
    if (isGameOver) return;

    const newBoard = board.map((row) => [...row]);
    const current = newBoard[r][c];

    // Cycle through states: white -> black -> circled -> white
    if (current === 'white') newBoard[r][c] = 'black';
    else if (current === 'black') newBoard[r][c] = 'circled';
    else newBoard[r][c] = 'white';

    setBoard(newBoard);
    checkWinCondition(newBoard);
  };

  const checkWinCondition = (currentBoard: CellState[][]) => {
    let isWin = true;

    // Rule 1: No un-blacked numbers appear more than once in a row or column
    for (let r = 0; r < size; r++) {
      const rowNums = new Set<number>();
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c] !== 'black') {
          const num = boardData.grid[r][c];
          if (rowNums.has(num)) {
            isWin = false;
            break;
          }
          rowNums.add(num);
        }
      }
      if (!isWin) break;
    }

    if (!isWin) return;

    for (let c = 0; c < size; c++) {
      const colNums = new Set<number>();
      for (let r = 0; r < size; r++) {
        if (currentBoard[r][c] !== 'black') {
          const num = boardData.grid[r][c];
          if (colNums.has(num)) {
            isWin = false;
            break;
          }
          colNums.add(num);
        }
      }
      if (!isWin) break;
    }

    if (!isWin) return;

    // Rule 2: Black cells cannot share an edge (no orthogonally adjacent black cells)
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c] === 'black') {
          if (r > 0 && currentBoard[r - 1][c] === 'black') isWin = false;
          if (r < size - 1 && currentBoard[r + 1][c] === 'black') isWin = false;
          if (c > 0 && currentBoard[r][c - 1] === 'black') isWin = false;
          if (c < size - 1 && currentBoard[r][c + 1] === 'black') isWin = false;
        }
      }
    }

    if (!isWin) return;

    // Rule 3: All active (white/circled) cells must be connected to each other (single connected component)
    let firstWhite: [number, number] | null = null;
    let whiteCount = 0;

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c] !== 'black') {
          whiteCount++;
          if (!firstWhite) firstWhite = [r, c];
        }
      }
    }

    if (!firstWhite) return; // Entire board is black (invalid anyway by rules, but just in case)

    let visitedCount = 0;
    const visited = new Set<string>();
    const queue: [number, number][] = [firstWhite];
    visited.add(`${firstWhite[0]},${firstWhite[1]}`);

    while (queue.length > 0) {
      const [r, c] = queue.shift()!;
      visitedCount++;

      const dirs = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
          if (currentBoard[nr][nc] !== 'black' && !visited.has(`${nr},${nc}`)) {
            visited.add(`${nr},${nc}`);
            queue.push([nr, nc]);
          }
        }
      }
    }

    if (visitedCount !== whiteCount) {
      isWin = false;
    }

    if (isWin) {
      endGame(true);
    }
  };

  // Helper: Find duplicates in current row or column to highlight
  const hasDuplicateInLine = (r: number, c: number, boardState: CellState[][]) => {
    if (boardState[r][c] === 'black') return false;
    const num = boardData.grid[r][c];

    let countRow = 0;
    for (let i = 0; i < size; i++) {
      if (boardState[r][i] !== 'black' && boardData.grid[r][i] === num) countRow++;
    }
    if (countRow > 1) return true;

    let countCol = 0;
    for (let i = 0; i < size; i++) {
      if (boardState[i][c] !== 'black' && boardData.grid[i][c] === num) countCol++;
    }
    if (countCol > 1) return true;

    return false;
  };

  // Helper: Find adjacent black cells to highlight error
  const isAdjacentToBlack = (r: number, c: number, boardState: CellState[][]) => {
    if (boardState[r][c] !== 'black') return false;
    if (r > 0 && boardState[r - 1][c] === 'black') return true;
    if (r < size - 1 && boardState[r + 1][c] === 'black') return true;
    if (c > 0 && boardState[r][c - 1] === 'black') return true;
    if (c < size - 1 && boardState[r][c + 1] === 'black') return true;
    return false;
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
              <span className="text-white font-black">⏱️ {formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black">⬛ Hitori</h1>
          <p className="text-slate-400 text-lg mt-2">
            {size}x{size} Izgara
          </p>
        </div>

        {/* Dış Kart - Lacivert */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          {/* İç Kart - Oyun Rengi (Gri/Slate) */}
          <div className="bg-gradient-to-br from-slate-500 via-gray-500 to-slate-600 rounded-2xl p-8 md:p-12 mb-8">
            <div className="flex flex-col items-center">
              {/* Hitori Grid */}
              <div
                className="bg-slate-700/40 p-1 rounded-lg border-2 border-slate-400 grid gap-[2px] mb-8 max-w-[400px] w-full"
                style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
              >
                {board.length > 0 &&
                  boardData.grid.map((row, r) =>
                    row.map((val, c) => {
                      const state = board[r][c];
                      const isErrorDupe = hasDuplicateInLine(r, c, board);
                      const isErrorAdj = isAdjacentToBlack(r, c, board);

                      let cellStyle = 'bg-white text-slate-900 hover:bg-slate-100';
                      let contentStyle = '';

                      if (state === 'black') {
                        cellStyle = isErrorAdj
                          ? 'bg-red-600 text-transparent animate-pulse ring-2 ring-inset ring-red-900'
                          : 'bg-slate-900 text-transparent hover:bg-slate-800';
                      } else if (state === 'circled') {
                        cellStyle = 'bg-white text-slate-900';
                        contentStyle = isErrorDupe
                          ? 'border-4 border-red-500 rounded-full animate-bounce'
                          : 'border-4 border-emerald-500 rounded-full text-emerald-700';
                      } else {
                        if (isErrorDupe) {
                          contentStyle = 'text-red-500';
                        }
                      }

                      return (
                        <button
                          key={`${r}-${c}`}
                          onClick={() => handleCellClick(r, c)}
                          className={`aspect-square flex items-center justify-center text-2xl md:text-4xl font-black transition-all rounded-sm ${cellStyle}`}
                        >
                          <div
                            className={`w-10 h-10 md:w-14 md:h-14 flex items-center justify-center ${contentStyle}`}
                          >
                            {val}
                          </div>
                        </button>
                      );
                    })
                  )}
              </div>
            </div>

            <button
              onClick={() => setShowRules(true)}
              className="w-full bg-slate-500 hover:bg-slate-400 text-white text-xl font-black py-4 rounded-2xl transition-all"
            >
              📖 NASIL OYNANIR?
            </button>
          </div>
        </div>

        {/* Rules Overlay */}
        {showRules && (
          <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center rounded-3xl animate-in fade-in zoom-in">
            <div className="bg-slate-800/80 p-6 md:p-8 rounded-3xl border border-slate-500/30 max-w-md w-full">
              <div className="text-5xl mb-4">⬛</div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-300 mb-4 uppercase">
                Nasıl Oynanır?
              </h3>
              <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base font-medium">
                <li className="flex gap-2">
                  <span className="text-slate-400">1.</span> Her satır ve sütunda bir sayı en fazla
                  bir kez bulunabilir. Aynı olanları elemek için üzerlerine tıklayıp siyaha
                  boyamalısın.
                </li>
                <li className="flex gap-2">
                  <span className="text-slate-400">2.</span> Siyah kareler yatay veya dikeyde
                  birbirine değemez! (Çapraz değebilirler).
                </li>
                <li className="flex gap-2">
                  <span className="text-slate-400">3.</span> Karalanmamış (beyaz) tüm hücreler
                  birbiriyle dikey/yatay olarak bağlantılı kalmalı, ızgara siyahlardan dolayı
                  bölünmemeli.
                </li>
                <li className="flex gap-2">
                  <span className="text-slate-400">4.</span> Bir hücreye tıklamak onu siyah yapar,
                  tekrar tıklamak çember (kesin beyaz) içine alır, bir daha tıklamak normale
                  çevirir.
                </li>
              </ul>
              <button
                onClick={() => setShowRules(false)}
                className="w-full bg-slate-500 hover:bg-slate-400 text-white font-black py-4 rounded-xl transition-transform hover:scale-105 active:scale-95 text-lg"
              >
                ANLADIM, BAŞLA! 🚀
              </button>
            </div>
          </div>
        )}

        {isGameOver && (
          <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in p-6 text-center rounded-3xl">
            <h3
              className={`text-5xl md:text-7xl font-black mb-4 ${timeLeft === 0 ? 'text-red-500' : 'text-slate-300'}`}
            >
              {timeLeft === 0 ? 'SÜRE BİTTİ' : 'BÜYÜK ELEME BAŞARILI!'}
            </h3>
            <p className="text-xl md:text-2xl text-white font-bold mb-8">
              Kazanılan Yıldız: <span className="text-slate-400">⭐ {score}</span>
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
                className="flex-1 bg-slate-500 hover:bg-slate-400 text-white font-black py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                🏠 ANA ÜSSE DÖN
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HitoriGame;

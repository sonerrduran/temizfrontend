import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';

interface TentsTreesGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

type CellType = 'grass' | 'tree' | 'tent' | 'crossed';

interface Cell {
  r: number;
  c: number;
  type: CellType;
  isError: boolean;
}

interface BoardData {
  size: number;
  trees: { r: number; c: number }[];
  rowClues: number[];
  colClues: number[];
}

const BOARDS: Record<number, BoardData> = {
  5: {
    // 5x5 easy
    size: 5,
    rowClues: [2, 0, 1, 0, 2],
    colClues: [2, 0, 1, 1, 1],
    trees: [
      { r: 0, c: 1 },
      { r: 1, c: 4 },
      { r: 3, c: 0 },
      { r: 3, c: 2 },
      { r: 4, c: 4 },
    ],
  },
  6: {
    // 6x6 medium
    size: 6,
    rowClues: [1, 1, 1, 1, 1, 1],
    colClues: [1, 1, 1, 1, 0, 2],
    trees: [
      { r: 0, c: 0 },
      { r: 0, c: 4 },
      { r: 2, c: 1 },
      { r: 2, c: 5 },
      { r: 4, c: 0 },
      { r: 5, c: 4 },
    ],
  },
};

const TentsTreesGame: React.FC<TentsTreesGameProps> = ({
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
        return 5;
      case Difficulty.HARD:
      case Difficulty.VERY_HARD:
        return 6;
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

  const [board, setBoard] = useState<Cell[][]>([]);

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getTimeForDifficulty());
  const [isGameOver, setIsGameOver] = useState(false);
  const [showRules, setShowRules] = useState(true);

  const initGame = useCallback(() => {
    const newBoard: Cell[][] = [];
    for (let r = 0; r < size; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < size; c++) {
        row.push({ r, c, type: 'grass', isError: false });
      }
      newBoard.push(row);
    }

    boardData.trees.forEach((t) => {
      newBoard[t.r][t.c].type = 'tree';
    });

    setBoard(newBoard);
    setTimeLeft(getTimeForDifficulty());
    setIsGameOver(false);
  }, [size, boardData]);

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

  const validateBoard = (currentBoard: Cell[][]) => {
    // Clear all errors first
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        currentBoard[r][c].isError = false;
      }
    }

    let isWin = true;

    // 1. Tents cannot touch each other (even diagonally)
    const tents: { r: number; c: number }[] = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c].type === 'tent') {
          tents.push({ r, c });
        }
      }
    }

    for (let i = 0; i < tents.length; i++) {
      for (let j = i + 1; j < tents.length; j++) {
        const t1 = tents[i];
        const t2 = tents[j];
        const rDiff = Math.abs(t1.r - t2.r);
        const cDiff = Math.abs(t1.c - t2.c);
        if (rDiff <= 1 && cDiff <= 1) {
          currentBoard[t1.r][t1.c].isError = true;
          currentBoard[t2.r][t2.c].isError = true;
          isWin = false;
        }
      }
    }

    // 2. Check row clues
    for (let r = 0; r < size; r++) {
      let rowTents = 0;
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c].type === 'tent') rowTents++;
      }
      if (rowTents !== boardData.rowClues[r]) isWin = false;
    }

    // 3. Check col clues
    for (let c = 0; c < size; c++) {
      let colTents = 0;
      for (let r = 0; r < size; r++) {
        if (currentBoard[r][c].type === 'tent') colTents++;
      }
      if (colTents !== boardData.colClues[c]) isWin = false;
    }

    // 4. Bipartite Matching: Every tent must be adjacent to a tree, every tree to exactly 1 distinct tent
    // Total tents must equal total trees.
    if (tents.length !== boardData.trees.length) isWin = false;

    // A simple check: every tree has at least one tent orthogonally adjacent
    for (const tree of boardData.trees) {
      let hasAdjacentTent = false;
      if (tree.r > 0 && currentBoard[tree.r - 1][tree.c].type === 'tent') hasAdjacentTent = true;
      if (tree.r < size - 1 && currentBoard[tree.r + 1][tree.c].type === 'tent')
        hasAdjacentTent = true;
      if (tree.c > 0 && currentBoard[tree.r][tree.c - 1].type === 'tent') hasAdjacentTent = true;
      if (tree.c < size - 1 && currentBoard[tree.r][tree.c + 1].type === 'tent')
        hasAdjacentTent = true;

      if (!hasAdjacentTent) isWin = false;
    }

    setBoard([...currentBoard]);

    if (isWin && tents.length === boardData.trees.length) {
      endGame(true);
    }
  };

  const handleCellClick = (r: number, c: number) => {
    if (isGameOver || board[r][c].type === 'tree') return;

    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

    // Cycle states: grass -> tent -> crossed -> grass
    if (newBoard[r][c].type === 'grass') {
      newBoard[r][c].type = 'tent';
    } else if (newBoard[r][c].type === 'tent') {
      newBoard[r][c].type = 'crossed';
    } else {
      newBoard[r][c].type = 'grass';
    }

    validateBoard(newBoard);
  };

  const padZero = (n: number) => n.toString().padStart(2, '0');
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${padZero(s % 60)}`;

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/90 backdrop-blur-3xl rounded-[40px] p-6 md:p-8 border border-emerald-500/30 shadow-2xl relative overflow-hidden bounce-in">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onExit}
          className="bg-white/10 hover:bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 transition-all font-black text-xl"
        >
          🔙
        </button>
        <div className="text-center flex-1">
          <h2 className="text-2xl md:text-3xl font-black italic text-emerald-400 drop-shadow-lg uppercase tracking-tight">
            Çadır ve Ağaç
          </h2>
          <div className="text-sm font-bold text-emerald-200 mt-1 uppercase tracking-widest">
            {size}x{size} Kamp Alanı
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowRules(true)}
            className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/40 w-12 h-12 md:w-auto md:px-4 rounded-xl flex items-center justify-center transition-all font-black text-xl md:text-sm"
          >
            <span className="md:hidden">📖</span>
            <span className="hidden md:inline">NASIL OYNANIR?</span>
          </button>
          <div
            className={`w-16 h-12 rounded-xl flex items-center justify-center font-black text-lg border-2 ${timeLeft <= 30 ? 'border-red-500 text-red-500 animate-pulse' : 'border-emerald-400 text-emerald-400'}`}
          >
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        {/* Board Wrapper for Clues */}
        <div className="flex flex-col max-w-[450px] w-full mt-4 select-none">
          {/* Top Column Clues */}
          <div className="flex ml-[40px] md:ml-[50px] mb-2 justify-around">
            {boardData.colClues.map((clue, idx) => {
              let currentCount = 0;
              if (board.length) {
                for (let r = 0; r < size; r++) if (board[r][idx].type === 'tent') currentCount++;
              }
              const isSatisfied = currentCount === clue;
              const isOver = currentCount > clue;

              return (
                <div
                  key={`col-${idx}`}
                  className={`w-8 h-8 md:w-12 md:h-12 flex items-center justify-center font-black text-xl md:text-2xl transition-all ${isSatisfied ? 'text-white/30' : isOver ? 'text-red-500 animate-pulse' : 'text-emerald-400'}`}
                >
                  {clue}
                </div>
              );
            })}
          </div>

          <div className="flex">
            {/* Left Row Clues */}
            <div className="flex flex-col mr-2 justify-around">
              {boardData.rowClues.map((clue, idx) => {
                let currentCount = 0;
                if (board.length) {
                  for (let c = 0; c < size; c++) if (board[idx][c].type === 'tent') currentCount++;
                }
                const isSatisfied = currentCount === clue;
                const isOver = currentCount > clue;

                return (
                  <div
                    key={`row-${idx}`}
                    className={`w-8 h-8 md:w-10 md:h-12 flex items-center justify-center font-black text-xl md:text-2xl transition-all ${isSatisfied ? 'text-white/30' : isOver ? 'text-red-500 animate-pulse' : 'text-emerald-400'}`}
                  >
                    {clue}
                  </div>
                );
              })}
            </div>

            {/* Grid */}
            <div
              className="bg-[#6b8e23] p-1.5 md:p-2 rounded-2xl shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)] grid gap-1 md:gap-1.5 border-4 border-[#556b2f] flex-1"
              style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
            >
              {board.map((row, r) =>
                row.map((cell, c) => (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    className={`
                                            aspect-square flex items-center justify-center text-3xl md:text-5xl rounded-lg transition-all shadow-md relative
                                            ${
                                              cell.type === 'tree'
                                                ? 'bg-[#8fbc8f] cursor-default'
                                                : cell.type === 'tent'
                                                  ? cell.isError
                                                    ? 'bg-red-500 ring-4 ring-red-700 animate-pulse'
                                                    : 'bg-orange-500 shadow-[inset_0_4px_8px_rgba(255,255,255,0.4)]'
                                                  : 'bg-[#9acd32] hover:bg-[#adff2f]'
                                            }
                                        `}
                  >
                    {cell.type === 'tree' && '🌲'}
                    {cell.type === 'tent' && '🏕️'}
                    {cell.type === 'crossed' && (
                      <div className="w-1/2 h-1/2 opacity-30 text-emerald-900 font-black flex items-center justify-center text-xl">
                        ✖
                      </div>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rules Overlay */}
      {showRules && (
        <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center rounded-[40px] animate-in fade-in zoom-in">
          <div className="bg-slate-800/80 p-6 md:p-8 rounded-3xl border border-emerald-500/30 max-w-md w-full shadow-2xl">
            <div className="text-5xl mb-4">🏕️🌲</div>
            <h3 className="text-2xl md:text-3xl font-black text-emerald-400 mb-4 uppercase">
              Nasıl Oynanır?
            </h3>
            <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base font-medium">
              <li className="flex gap-2">
                <span className="text-emerald-400">1.</span> Amacın, ormandaki **her ağacın tam
                yanına (sağ/sol/alt/üst)** birer çadır kurmaktır.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-400">2.</span> Satır ve sütunların dışındaki sayılar,
                o hizada toplam kaç tane çadır olması gerektiğini gösterir.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-400">3.</span> Çadırlar birbirlerine **ÇAPRAZDAN
                BİLESİ DEĞEMEZ**!
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-400">4.</span> Bir kutuya ilk tıklayışta Çadır
                kurarsın 🏕️, ikinci tıklayışta Çimen olduğunu (✖) belirtirsin. Doğru sayıda çadırı
                doğru yerlere kur!
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black py-4 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 text-lg"
            >
              ANLADIM, BAŞLA! 🚀
            </button>
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in p-6 text-center rounded-[40px]">
          <h3
            className={`text-5xl md:text-7xl font-black mb-4 drop-shadow-xl ${timeLeft === 0 ? 'text-red-500' : 'text-emerald-400'}`}
          >
            {timeLeft === 0 ? 'SÜRE BİTTİ' : 'ORMAN GÜVENDE!'}
          </h3>
          <p className="text-xl md:text-2xl text-white font-bold mb-8">
            Kazanılan Yıldız: <span className="text-emerald-400">⭐ {score}</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <button
              onClick={() => {
                initGame();
              }}
              className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
            >
              🔄 YENİDEN BAŞLA
            </button>
            <button
              onClick={() => onComplete(score)}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black py-4 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              🏠 ANA ÜSSE DÖN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TentsTreesGame;

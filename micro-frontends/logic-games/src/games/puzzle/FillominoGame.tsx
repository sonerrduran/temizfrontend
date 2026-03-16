import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../types';
import { LogicGameWrapper, RulesOverlay, GameOverOverlay, useLogicGame } from '../../shared';

interface FillominoGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface BoardData {
  size: number;
  clues: { r: number; c: number; val: number }[];
}

const BOARDS: Record<number, BoardData> = {
  4: {
    size: 4,
    clues: [
      { r: 0, c: 0, val: 3 },
      { r: 0, c: 3, val: 2 },
      { r: 1, c: 1, val: 1 },
      { r: 2, c: 2, val: 2 },
      { r: 3, c: 0, val: 4 },
      { r: 3, c: 3, val: 4 },
    ],
  },
  5: {
    size: 5,
    clues: [
      { r: 0, c: 1, val: 2 },
      { r: 0, c: 3, val: 4 },
      { r: 1, c: 0, val: 2 },
      { r: 1, c: 4, val: 4 },
      { r: 3, c: 0, val: 3 },
      { r: 3, c: 4, val: 1 },
      { r: 4, c: 1, val: 3 },
      { r: 4, c: 3, val: 5 },
    ],
  },
  6: {
    size: 6,
    clues: [
      { r: 0, c: 0, val: 5 },
      { r: 0, c: 5, val: 3 },
      { r: 1, c: 2, val: 2 },
      { r: 1, c: 3, val: 4 },
      { r: 4, c: 2, val: 4 },
      { r: 4, c: 3, val: 1 },
      { r: 5, c: 0, val: 6 },
      { r: 5, c: 5, val: 4 },
    ],
  },
};

const FillominoGame: React.FC<FillominoGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
  const getSizeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
        return 4;
      case Difficulty.EASY:
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
  const [errorCells, setErrorCells] = useState<{ r: number; c: number }[]>([]);

  const { timeLeft, mistakes, isGameOver, showRules, setShowRules, addMistake, endGame } =
    useLogicGame({
      difficulty,
      onComplete,
    });

  const initGame = useCallback(() => {
    const initialBoard = Array(size)
      .fill(null)
      .map(() => Array(size).fill(0));

    boardData.clues.forEach((clue) => {
      initialBoard[clue.r][clue.c] = clue.val;
    });

    setBoard(initialBoard);
    setSelectedCell(null);
    setErrorCells([]);
  }, [size, boardData]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleGameOver = (win: boolean) => {
    endGame(win);
  };

  const handleCellClick = (r: number, c: number) => {
    if (isGameOver || showRules) return;
    if (boardData.clues.some((clue) => clue.r === r && clue.c === c)) return; // Can't edit clues

    setSelectedCell({ r, c });
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell || isGameOver || showRules) return;

    const { r, c } = selectedCell;
    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = num;
    setBoard(newBoard);
    setErrorCells([]); // Clear errors until next check

    checkBoardState(newBoard, r, c);
  };

  // Calculate regions
  const getRegions = (currentBoard: number[][]) => {
    const visited = Array(size)
      .fill(false)
      .map(() => Array(size).fill(false));
    const regions: { id: number; val: number; cells: { r: number; c: number }[] }[] = [];
    let regionId = 1;

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!visited[r][c] && currentBoard[r][c] !== 0) {
          const val = currentBoard[r][c];
          const cells = [];
          const stack = [[r, c]];
          visited[r][c] = true;

          while (stack.length > 0) {
            const [curR, curC] = stack.pop()!;
            cells.push({ r: curR, c: curC });

            const directions = [
              [-1, 0],
              [1, 0],
              [0, -1],
              [0, 1],
            ];
            for (const [dr, dc] of directions) {
              const nr = curR + dr,
                nc = curC + dc;
              if (
                nr >= 0 &&
                nr < size &&
                nc >= 0 &&
                nc < size &&
                !visited[nr][nc] &&
                currentBoard[nr][nc] === val
              ) {
                visited[nr][nc] = true;
                stack.push([nr, nc]);
              }
            }
          }
          regions.push({ id: regionId++, val, cells });
        }
      }
    }
    return regions;
  };

  const checkBoardState = (currentBoard: number[][], changedR: number, changedC: number) => {
    // Evaluate immediately if oversized
    const regions = getRegions(currentBoard);
    let errorFound = false;
    const newErrorCells: { r: number; c: number }[] = [];

    for (const region of regions) {
      if (region.cells.length > region.val) {
        // Oversized region! That's a mistake
        errorFound = true;
        newErrorCells.push(...region.cells);
      }
    }

    if (errorFound) {
      setErrorCells(newErrorCells);
      addMistake();

      const reverted = currentBoard.map((row) => [...row]);
      reverted[changedR][changedC] = 0;
      setTimeout(() => {
        setBoard(reverted);
        setErrorCells([]);
      }, 800);
      return;
    }

    // Check if fully solved
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

    // Final verification when full
    let won = true;

    // 1. All regions must be EXACTLY their value
    for (const region of regions) {
      if (region.cells.length !== region.val) {
        won = false;
        newErrorCells.push(...region.cells);
      }
    }

    // 2. No two regions of the same size/value can be orthogonally adjacent
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const region1 = regions.find((reg) =>
          reg.cells.some((cell) => cell.r === r && cell.c === c)
        );

        const directions = [
          [1, 0],
          [0, 1],
        ]; // Only check right/down to avoid double count
        for (const [dr, dc] of directions) {
          const nr = r + dr,
            nc = c + dc;
          if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
            const region2 = regions.find((reg) =>
              reg.cells.some((cell) => cell.r === nr && cell.c === nc)
            );
            if (region1 && region2 && region1.id !== region2.id && region1.val === region2.val) {
              // Two DIFFERENT regions with the SAME value are touching!
              won = false;
              newErrorCells.push({ r, c }, { r: nr, c: nc });
            }
          }
        }
      }
    }

    if (won && newErrorCells.length === 0) {
      handleGameOver(true);
    } else if (!won) {
      setErrorCells(newErrorCells);
      // Note: In a friendly game, we might not instantly kill them on full board error.
      // We'll let them figure it out, but they already incurred mistakes if they caused merges.
    }
  };

  const getCellBorders = (r: number, c: number) => {
    const val = board[r][c];
    if (val === 0) return 'border border-slate-700/50';

    let borders = 'border border-slate-700/50 ';

    // Draw thicker borders representing region boundaries
    const hasTop = r > 0 && board[r - 1][c] !== val;
    const hasBottom = r < size - 1 && board[r + 1][c] !== val;
    const hasLeft = c > 0 && board[r][c - 1] !== val;
    const hasRight = c < size - 1 && board[r][c + 1] !== val;

    if (hasTop) borders += 'border-t-2 border-t-emerald-400 ';
    if (hasBottom) borders += 'border-b-2 border-b-emerald-400 ';
    if (hasLeft) borders += 'border-l-2 border-l-emerald-400 ';
    if (hasRight) borders += 'border-r-2 border-r-emerald-400 ';

    return borders;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans selection:bg-emerald-500/30">
      {showRules && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
          <div className="bg-slate-800 p-8 rounded-3xl max-w-lg w-full shadow-2xl border border-white/10 bounce-in">
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <span className="text-4xl text-emerald-400">🗺️</span> Fillomino Nasıl Oynanır?
            </h2>
            <ul className="space-y-4 mb-8 text-slate-300 text-lg">
              <li className="flex gap-3">
                <span className="text-emerald-400">🔢</span>
                <div>
                  Tüm ızgarayı sayılarla doldurarak <b>bölgeler</b> (polyominos) oluştur.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">📏</span>
                <span>
                  Hücrenin içindeki sayı, o hücrenin dâhil olduğu bölgede toplam kaç tane hücre
                  olduğunu gösterir (Örn: 4 yazan bir hücre, tam 4 hücrelik bir bölgenin içindedir).
                </span>
              </li>
              <li className="flex gap-3 text-rose-400 font-bold">
                <span>🚫</span>
                <span>
                  Aynı büyüklüğe sahip iki farklı bölge, birbirine yanlardan temas edemez (çapraz
                  temas serbesttir).
                </span>
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full py-4 rounded-xl font-black text-xl transition-all bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg active:scale-95"
            >
              ANLADIM, BAŞLA!
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl px-4 py-6 md:py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-slate-800/50 p-4 md:p-6 rounded-3xl border border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={onExit}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all relative z-50"
            >
              ⬅ Geri Dön
            </button>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                Fillomino
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
                className={`text-xl md:text-2xl font-black font-mono ${timeLeft < 60 ? 'text-rose-400 animate-pulse' : 'text-emerald-300'}`}
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
        <div className="flex justify-center mb-8">
          <div
            className="grid gap-0 bg-slate-800 p-2 md:p-3 rounded-2xl shadow-[0_0_40px_rgba(52,211,153,0.15)] border-2 border-emerald-500/30"
            style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
          >
            {board.map((row, r) =>
              row.map((cell, c) => {
                const isClue = boardData.clues.some((cl) => cl.r === r && cl.c === c);
                const isSelected = selectedCell?.r === r && selectedCell?.c === c;
                const isError = errorCells.some((ec) => ec.r === r && ec.c === c);
                const borders = getCellBorders(r, c);

                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-2xl md:text-3xl font-black transition-all transform active:scale-90
                                            ${borders}
                                            ${
                                              isError
                                                ? 'bg-rose-500 text-white animate-pulse shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]'
                                                : isClue
                                                  ? 'bg-slate-700 text-emerald-300 cursor-not-allowed shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] border-slate-500/30'
                                                  : isSelected
                                                    ? 'bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-10 scale-105 border-emerald-300'
                                                    : cell !== 0
                                                      ? 'bg-slate-700/50 hover:bg-slate-600 text-white shadow-sm'
                                                      : 'bg-slate-800 hover:bg-slate-700 text-transparent border-slate-700/50'
                                            }`}
                  >
                    {cell !== 0 ? cell : ''}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Numpad */}
        <div className="grid grid-cols-5 md:grid-cols-8 gap-2 max-w-lg mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberInput(num)}
              className="bg-slate-800 hover:bg-emerald-600 border border-slate-700 hover:border-emerald-400 text-white font-black text-xl md:text-2xl p-4 md:p-3 rounded-2xl transition-all shadow-lg active:scale-95 flex-1"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleNumberInput(0)}
            className="col-span-2 bg-rose-900/50 hover:bg-rose-600 border border-rose-800 hover:border-rose-400 text-white font-black text-xl md:text-2xl p-4 md:p-3 rounded-2xl transition-all shadow-lg active:scale-95 flex-1"
          >
            SİL
          </button>
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
                ? 'Bölge Sınırı Aşıldı!'
                : timeLeft <= 0
                  ? 'Süre Doldu!'
                  : 'Harika!'}
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              {mistakes >= maxMistakes
                ? 'Alan taşması veya aynı boyuttaki komşu bölgeler çakıştı.'
                : timeLeft <= 0
                  ? 'Zamanı iyi yönetemedin.'
                  : `Tüm alanları kurallara uygun tasarladın! Kazanılan Yıldız: ${score}`}
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
                className="w-full py-4 rounded-2xl font-black text-xl transition-all bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg active:scale-95"
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

export default FillominoGame;

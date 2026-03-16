import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../types';

interface TapaGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface BoardData {
  size: number;
  hints: { r: number; c: number; vals: number[] }[];
}

const BOARDS: Record<number, BoardData> = {
  4: {
    size: 4,
    hints: [
      { r: 0, c: 1, vals: [2] },
      { r: 2, c: 2, vals: [1, 1] },
    ],
  },
  5: {
    size: 5,
    hints: [
      { r: 1, c: 2, vals: [1, 1] },
      { r: 3, c: 3, vals: [3] },
    ],
  },
  6: {
    size: 6,
    hints: [
      { r: 1, c: 1, vals: [2] },
      { r: 1, c: 4, vals: [1, 1] },
      { r: 4, c: 2, vals: [3] },
      { r: 4, c: 4, vals: [1, 2] },
    ],
  },
};

const TapaGame: React.FC<TapaGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
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

  // 0: empty, 1: black, 2: dot(white)
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

  const isHintCell = (r: number, c: number) => {
    return boardData.hints.some((h) => h.r === r && h.c === c);
  };

  const handleCellClick = (r: number, c: number) => {
    if (isGameOver || showRules) return;
    if (isHintCell(r, c)) return; // Can't paint hint cells

    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = (newBoard[r][c] + 1) % 3;
    setBoard(newBoard);

    checkWinCondition(newBoard);
  };

  const has2x2Black = (currentBoard: number[][]) => {
    for (let r = 0; r < size - 1; r++) {
      for (let c = 0; c < size - 1; c++) {
        if (
          currentBoard[r][c] === 1 &&
          currentBoard[r + 1][c] === 1 &&
          currentBoard[r][c + 1] === 1 &&
          currentBoard[r + 1][c + 1] === 1
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const isWallConnected = (currentBoard: number[][]) => {
    let totalBlack = 0;
    let startR = -1,
      startC = -1;

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBoard[r][c] === 1) {
          totalBlack++;
          if (startR === -1) {
            startR = r;
            startC = c;
          }
        }
      }
    }

    if (totalBlack === 0) return false;

    let connectedCount = 0;
    const visited = Array(size)
      .fill(false)
      .map(() => Array(size).fill(false));
    const queue = [[startR, startC]];
    visited[startR][startC] = true;

    while (queue.length > 0) {
      const [curR, curC] = queue.shift()!;
      connectedCount++;

      const dirs = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      for (const [dr, dc] of dirs) {
        const nr = curR + dr;
        const nc = curC + dc;
        if (
          nr >= 0 &&
          nr < size &&
          nc >= 0 &&
          nc < size &&
          !visited[nr][nc] &&
          currentBoard[nr][nc] === 1
        ) {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }

    return connectedCount === totalBlack;
  };

  const getHintBlocks = (currentBoard: number[][], r: number, c: number) => {
    const neighbors = [
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
    ];

    const vals = neighbors.map(([dr, dc]) => {
      const nr = r + dr,
        nc = c + dc;
      return nr >= 0 && nr < size && nc >= 0 && nc < size && currentBoard[nr][nc] === 1 ? 1 : 0;
    });

    if (vals.every((v) => v === 1)) return [8];
    if (vals.every((v) => v === 0)) return [];

    const firstZero = vals.indexOf(0);
    const rotated = [...vals.slice(firstZero), ...vals.slice(0, firstZero)];

    const blocks: number[] = [];
    let currentBlock = 0;
    for (let i = 0; i < 8; i++) {
      if (rotated[i] === 1) {
        currentBlock++;
      } else if (currentBlock > 0) {
        blocks.push(currentBlock);
        currentBlock = 0;
      }
    }
    if (currentBlock > 0) blocks.push(currentBlock);

    return blocks.sort((a, b) => a - b);
  };

  const areArraysEqual = (a: number[], b: number[]) => {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort((x, y) => x - y);
    const sortedB = [...b].sort((x, y) => x - y);
    return sortedA.every((val, idx) => val === sortedB[idx]);
  };

  const checkWinCondition = (currentBoard: number[][]) => {
    // Immediate lose conditions: 2x2.
    // Wait, normally we process mistakes if we want. But since it's click cycle,
    // 2x2 is easily formed while playing. Penalising immediately is too harsh.
    // Let's only evaluate everything completely when all cells are decided (none are 0).
    let isFull = true;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!isHintCell(r, c) && currentBoard[r][c] === 0) {
          isFull = false;
          break;
        }
      }
    }

    if (!isFull) return; // If not full, wait

    // Now validate everything
    if (has2x2Black(currentBoard)) {
      setMistakes((m) => {
        const newM = m + 1;
        if (newM >= maxMistakes) handleGameOver(false);
        return newM;
      });
      return;
    }

    if (!isWallConnected(currentBoard)) {
      // Not a single connected wall
      return; // Don't mistake here, maybe they just haven't connected it yet, although it's "full".
    }

    for (const hint of boardData.hints) {
      const blocks = getHintBlocks(currentBoard, hint.r, hint.c);
      if (!areArraysEqual(blocks, hint.vals)) {
        return; // Doesn't match
      }
    }

    handleGameOver(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans selection:bg-purple-500/30">
      {showRules && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
          <div className="bg-slate-800 p-8 rounded-3xl max-w-lg w-full shadow-2xl border border-white/10 bounce-in">
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <span className="text-4xl text-purple-400">🧱</span> Tapa
            </h2>
            <ul className="space-y-4 mb-8 text-slate-300 text-lg">
              <li className="flex gap-3">
                <span className="text-purple-400">🖌️</span>
                <div>
                  İpucu bulunan hücreler dışındaki hücreleri boya ve bitişik tek bir <b>duvar</b>{' '}
                  oluştur.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-400">🎯</span>
                <span>
                  İpucu hücresindeki sayılar, o hücrenin etrafındaki (8 komşu) siyah blokların
                  uzunluklarını verir. (Örn: 1-3 varsa, etrafta 1 hücrelik bir blok ve 3 hücrelik
                  başka bir blok vardır, aralarında ise en az bir beyaz boşluk olmalıdır).
                </span>
              </li>
              <li className="flex gap-3 text-red-400 font-bold">
                <span>🚫</span>
                <span>
                  Siyah duvar hiçbir yerde <b>2x2'lik bir kare</b> (blok) oluşturamaz.
                </span>
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full py-4 rounded-xl font-black text-xl transition-all bg-purple-600 hover:bg-purple-500 text-white shadow-lg active:scale-95"
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
              <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                Tapa
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
                className={`text-xl md:text-2xl font-black font-mono ${timeLeft < 60 ? 'text-rose-400 animate-pulse' : 'text-purple-300'}`}
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
            className="grid gap-[2px] bg-indigo-900 p-2 border-4 border-indigo-950 shadow-2xl rounded-lg"
            style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
          >
            {board.map((row, r) =>
              row.map((cell, c) => {
                const hint = boardData.hints.find((h) => h.r === r && h.c === c);
                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center font-black transition-all duration-150
                                            ${
                                              hint
                                                ? 'bg-slate-800 text-white cursor-not-allowed text-xs md:text-sm shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)]'
                                                : cell === 1
                                                  ? 'bg-slate-900 shadow-[inset_0_3px_5px_rgba(0,0,0,0.8)]'
                                                  : cell === 2
                                                    ? 'bg-slate-300'
                                                    : 'bg-slate-200 hover:bg-slate-300'
                                            }
                                        `}
                  >
                    {hint ? (
                      <div className="flex flex-col items-center justify-center leading-tight">
                        {hint.vals.map((v, i) => (
                          <span key={i}>{v}</span>
                        ))}
                      </div>
                    ) : cell === 2 ? (
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-slate-500"></div>
                    ) : null}
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="mt-8 text-center bg-slate-800/50 p-4 rounded-2xl border border-white/5 max-w-md mx-auto">
          <p className="text-slate-400 text-sm font-bold">
            1 Tık:{' '}
            <span className="bg-slate-900 px-2 text-white border border-slate-700">
              Duvar (Siyah)
            </span>{' '}
            | 2 Tık: <span className="bg-slate-300 px-2 text-slate-800 rounded-sm">Nokta (.)</span>{' '}
            | 3 Tık: Boş
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
              {mistakes >= maxMistakes ? '2x2 Hatası!' : timeLeft <= 0 ? 'Süre Doldu!' : 'Harika!'}
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              {mistakes >= maxMistakes
                ? 'Yanlışlıkla 2x2 boyutunda bir siyah blok oluşturdun.'
                : timeLeft <= 0
                  ? 'Süreyi daha iyi kullanmayı dene.'
                  : `Tapa duvarını mükemmel ördün! Kazanılan Yıldız: ${score}`}
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
                className="w-full py-4 rounded-2xl font-black text-xl transition-all bg-purple-600 hover:bg-purple-500 text-white shadow-lg active:scale-95"
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

export default TapaGame;

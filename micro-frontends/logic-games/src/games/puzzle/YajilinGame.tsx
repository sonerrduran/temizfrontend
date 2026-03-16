import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../types';

interface YajilinGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface Clue {
  r: number;
  c: number;
  dir: 'U' | 'D' | 'L' | 'R';
  count: number;
}

interface BoardData {
  size: number;
  clues: Clue[];
}

const BOARDS: Record<number, BoardData> = {
  4: {
    size: 4,
    clues: [
      { r: 0, c: 1, dir: 'R', count: 1 },
      { r: 2, c: 0, dir: 'R', count: 1 },
      { r: 3, c: 2, dir: 'U', count: 0 },
    ],
  },
  5: {
    size: 5,
    clues: [
      { r: 0, c: 0, dir: 'D', count: 1 },
      { r: 1, c: 3, dir: 'L', count: 1 },
      { r: 3, c: 1, dir: 'R', count: 1 },
      { r: 4, c: 4, dir: 'U', count: 1 },
    ],
  },
  6: {
    size: 6,
    clues: [
      { r: 1, c: 1, dir: 'D', count: 1 },
      { r: 1, c: 4, dir: 'L', count: 2 },
      { r: 4, c: 1, dir: 'R', count: 1 },
      { r: 4, c: 4, dir: 'U', count: 1 },
    ],
  },
};

const YajilinGame: React.FC<YajilinGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
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

  // Cell States: 0: Empty, 1: Black (Block)
  const [blocks, setBlocks] = useState<number[][]>([]);

  // Edges state for the loop
  // hEdges: size * (size - 1) -> true if edge exists
  // vEdges: (size - 1) * size -> true if edge exists
  const [hEdges, setHEdges] = useState<boolean[][]>([]);
  const [vEdges, setVEdges] = useState<boolean[][]>([]);

  const [mistakes, setMistakes] = useState(0);
  const [maxMistakes, setMaxMistakes] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getTimeForDifficulty());
  const [isGameOver, setIsGameOver] = useState(false);
  const [showRules, setShowRules] = useState(true);

  const initGame = useCallback(() => {
    setBlocks(
      Array(size)
        .fill(0)
        .map(() => Array(size).fill(0))
    );
    setHEdges(
      Array(size)
        .fill(false)
        .map(() => Array(size - 1).fill(false))
    );
    setVEdges(
      Array(size - 1)
        .fill(false)
        .map(() => Array(size).fill(false))
    );
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

  const isClue = (r: number, c: number) => {
    return boardData.clues.find((clue) => clue.r === r && clue.c === c);
  };

  const handleCellClick = (r: number, c: number) => {
    if (isGameOver || showRules || isClue(r, c)) return;

    const newBlocks = blocks.map((row) => [...row]);
    newBlocks[r][c] = newBlocks[r][c] === 0 ? 1 : 0; // Toggle block
    setBlocks(newBlocks);
    checkWinCondition(newBlocks, hEdges, vEdges);
  };

  const toggleEdge = (type: 'h' | 'v', r: number, c: number) => {
    if (isGameOver || showRules) return;

    if (type === 'h') {
      const newH = hEdges.map((row) => [...row]);
      newH[r][c] = !newH[r][c];
      setHEdges(newH);
      checkWinCondition(blocks, newH, vEdges);
    } else {
      const newV = vEdges.map((row) => [...row]);
      newV[r][c] = !newV[r][c];
      setVEdges(newV);
      checkWinCondition(blocks, hEdges, newV);
    }
  };

  const checkWinCondition = (
    currentBlocks: number[][],
    currentH: boolean[][],
    currentV: boolean[][]
  ) => {
    // 1. Check if blocks are adjacent
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentBlocks[r][c] === 1) {
          if (r > 0 && currentBlocks[r - 1][c] === 1) return;
          if (r < size - 1 && currentBlocks[r + 1][c] === 1) return;
          if (c > 0 && currentBlocks[r][c - 1] === 1) return;
          if (c < size - 1 && currentBlocks[r][c + 1] === 1) return;
        }
      }
    }

    // 2. Check clue counts
    let allCluesMatch = true;
    for (const clue of boardData.clues) {
      let count = 0;
      if (clue.dir === 'U') {
        for (let r = clue.r - 1; r >= 0; r--) {
          if (currentBlocks[r][clue.c] === 1) count++;
        }
      } else if (clue.dir === 'D') {
        for (let r = clue.r + 1; r < size; r++) {
          if (currentBlocks[r][clue.c] === 1) count++;
        }
      } else if (clue.dir === 'L') {
        for (let c = clue.c - 1; c >= 0; c--) {
          if (currentBlocks[clue.r][c] === 1) count++;
        }
      } else if (clue.dir === 'R') {
        for (let c = clue.c + 1; c < size; c++) {
          if (currentBlocks[clue.r][c] === 1) count++;
        }
      }
      if (count !== clue.count) {
        allCluesMatch = false;
        break;
      }
    }

    // Don't error out immediately on clues, user might still be playing.
    // We only validate the final state if degrees are correct.

    // 3. Build graph to check degrees and loop
    const degrees = Array(size)
      .fill(0)
      .map(() => Array(size).fill(0));

    currentH.forEach((row, r) => {
      row.forEach((val, c) => {
        if (val) {
          degrees[r][c]++;
          degrees[r][c + 1]++;
        }
      });
    });

    currentV.forEach((row, r) => {
      row.forEach((val, c) => {
        if (val) {
          degrees[r][c]++;
          degrees[r + 1][c]++;
        }
      });
    });

    let hasEdges = false;
    let startR = -1,
      startC = -1;
    let emptyNonLoopCells = 0;

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const clue = isClue(r, c);
        const isBlock = currentBlocks[r][c] === 1;

        if (clue || isBlock) {
          if (degrees[r][c] > 0) return; // Clues and blocks cannot have loop edges
        } else {
          if (degrees[r][c] === 0) {
            emptyNonLoopCells++;
          } else if (degrees[r][c] !== 2) {
            return; // Every other cell must have degree exactly 2 or 0 (but wait, all non-clue/non-block MUST be visited)
          } else {
            hasEdges = true;
            if (startR === -1) {
              startR = r;
              startC = c;
            }
          }
        }
      }
    }

    // All non-clue, non-block cells MUST be part of the loop.
    // So emptyNonLoopCells must be 0 for a win.
    if (emptyNonLoopCells > 0) return;

    if (!hasEdges || startR === -1) return;

    // 4. Must be a single loop
    let visitedCount = 0;
    let totalNodesWithEdges = 0;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (degrees[r][c] > 0) totalNodesWithEdges++;
      }
    }

    const visited = Array(size)
      .fill(false)
      .map(() => Array(size).fill(false));
    const q = [[startR, startC]];
    visited[startR][startC] = true;

    while (q.length > 0) {
      const [cr, cc] = q.shift()!;
      visitedCount++;

      if (cr > 0 && currentV[cr - 1][cc] && !visited[cr - 1][cc]) {
        visited[cr - 1][cc] = true;
        q.push([cr - 1, cc]);
      }
      if (cr < size - 1 && currentV[cr][cc] && !visited[cr + 1][cc]) {
        visited[cr + 1][cc] = true;
        q.push([cr + 1, cc]);
      }
      if (cc > 0 && currentH[cr][cc - 1] && !visited[cr][cc - 1]) {
        visited[cr][cc - 1] = true;
        q.push([cr, cc - 1]);
      }
      if (cc < size - 1 && currentH[cr][cc] && !visited[cr][cc + 1]) {
        visited[cr][cc + 1] = true;
        q.push([cr, cc + 1]);
      }
    }

    if (visitedCount !== totalNodesWithEdges) return; // Disconnected graphs exist

    // If loop is perfect and covers all required cells, NOW we check clues.
    if (!allCluesMatch) {
      setMistakes((m) => {
        const newM = m + 1;
        if (newM >= maxMistakes) handleGameOver(false);
        return newM;
      });
      return;
    }

    handleGameOver(true);
  };

  const cellSize = 50;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans selection:bg-purple-500/30">
      {showRules && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
          <div className="bg-slate-800 p-8 rounded-3xl max-w-lg w-full shadow-2xl border border-white/10 bounce-in">
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <span className="text-4xl text-purple-400">🏹</span> Yajilin
            </h2>
            <ul className="space-y-4 mb-8 text-slate-300 text-lg">
              <li className="flex gap-3">
                <span>🔗</span>
                <div>
                  Oyun alanında <b>tek parça, kapalı bir döngü</b> çizmelisin.
                </div>
              </li>
              <li className="flex gap-3 text-purple-400 font-bold">
                <span>⬛</span>
                <div>
                  Döngüye dahil olmayan hücreleri siyaha boyamalısın (Tıklayarak).{' '}
                  <b>Siyah hücreler birbirine yatay veya dikey temas edemez!</b>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-400">🏹</span>
                <div>
                  <b>İpuçları:</b> Hücrelerdeki oklar ve sayılar, ok yönünde{' '}
                  <b>tam olarak kaç tane siyah hücre</b> olduğunu söyler.
                </div>
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

      <div className="w-full max-w-3xl px-4 py-6 md:py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12 bg-slate-800/50 p-4 md:p-6 rounded-3xl border border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={onExit}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all font-bold relative z-50"
            >
              ⬅ Geri Dön
            </button>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 tracking-wider">
                Yajilin
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
        <div className="flex justify-center mb-8 relative">
          <div
            className="relative bg-slate-200 shadow-2xl rounded-lg border-4 border-slate-700 p-4"
            style={{
              width: `${size * cellSize + 32}px`,
              height: `${size * cellSize + 32}px`,
            }}
          >
            {/* Grid Background */}
            <div
              className="absolute inset-4 grid"
              style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
            >
              {Array(size * size)
                .fill(0)
                .map((_, i) => (
                  <div key={`bg-${i}`} className="border border-slate-300/50" />
                ))}
            </div>

            {/* Cells (Blocks and Clues) */}
            <div className="absolute inset-4 z-0">
              {Array(size)
                .fill(0)
                .map((_, r) =>
                  Array(size)
                    .fill(0)
                    .map((_, c) => {
                      const clue = isClue(r, c);
                      const isBlock = blocks[r][c] === 1;

                      return (
                        <button
                          key={`cell-${r}-${c}`}
                          onClick={() => handleCellClick(r, c)}
                          className={`absolute w-full h-full flex items-center justify-center transition-colors
                                                ${
                                                  clue
                                                    ? 'bg-slate-300 cursor-default'
                                                    : isBlock
                                                      ? 'bg-slate-800 cursor-pointer shadow-inner'
                                                      : 'bg-transparent hover:bg-slate-300/30 cursor-pointer'
                                                }
                                            `}
                          style={{
                            top: `${r * cellSize}px`,
                            left: `${c * cellSize}px`,
                            width: `${cellSize}px`,
                            height: `${cellSize}px`,
                          }}
                          disabled={!!clue}
                        >
                          {clue && (
                            <div className="flex flex-col items-center justify-center font-black text-slate-800">
                              <span>{clue.count}</span>
                              <span
                                className={`text-md leading-none
                                                        ${
                                                          clue.dir === 'U'
                                                            ? 'rotate-[-90deg]'
                                                            : clue.dir === 'D'
                                                              ? 'rotate-90'
                                                              : clue.dir === 'L'
                                                                ? 'rotate-180'
                                                                : ''
                                                        }
                                                    `}
                              >
                                ➔
                              </span>
                            </div>
                          )}
                        </button>
                      );
                    })
                )}
            </div>

            {/* Edges - Horizontal */}
            <div className="absolute inset-4 z-10 pointer-events-none">
              {hEdges.map((row, r) =>
                row.map((edge, c) => (
                  <button
                    key={`h-${r}-${c}`}
                    onClick={() => toggleEdge('h', r, c)}
                    className="absolute group outline-none pointer-events-auto flex items-center justify-center"
                    style={{
                      top: `${r * cellSize + 10}px`,
                      left: `${c * cellSize + cellSize / 2}px`,
                      width: `${cellSize}px`,
                      height: `30px`,
                    }}
                  >
                    <div
                      className={`w-full h-2 rounded-full mx-auto transition-colors ${edge ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-transparent group-hover:bg-emerald-500/30'}`}
                    ></div>
                  </button>
                ))
              )}
            </div>

            {/* Edges - Vertical */}
            <div className="absolute inset-4 z-10 pointer-events-none">
              {vEdges.map((row, r) =>
                row.map((edge, c) => (
                  <button
                    key={`v-${r}-${c}`}
                    onClick={() => toggleEdge('v', r, c)}
                    className="absolute group outline-none pointer-events-auto flex items-center justify-center"
                    style={{
                      top: `${r * cellSize + cellSize / 2}px`,
                      left: `${c * cellSize + 10}px`,
                      width: `30px`,
                      height: `${cellSize}px`,
                    }}
                  >
                    <div
                      className={`h-full w-2 rounded-full my-auto mx-auto transition-colors ${edge ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-transparent group-hover:bg-emerald-500/30'}`}
                    ></div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center bg-slate-800/50 p-4 rounded-2xl border border-white/5 max-w-sm mx-auto">
          <p className="text-slate-400 text-sm font-medium">
            Hücrenin içine tıklayarak siyah blok koyabilir, kenarlara tıklayarak yeşil döngü
            çizebilirsin.
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
                ? 'İpucu veya Kural İhlali!'
                : timeLeft <= 0
                  ? 'Süre Doldu!'
                  : 'Harika Döngü!'}
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              {mistakes >= maxMistakes
                ? 'Ok yanındaki siyah hücre sayısı uymuyor veya bloklar temas etti.'
                : timeLeft <= 0
                  ? 'Süreyi daha iyi kullanmayı dene.'
                  : `Yajilin zeka testini hatasız tamamladın! Kazanılan Yıldız: ${score}`}
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

export default YajilinGame;

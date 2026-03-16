import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';

interface SpiralGalaxiesProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface Point {
  r: number;
  c: number;
}

interface GalaxyCenter {
  r: number; // grid row (can be half integer for edge/corner centers)
  c: number; // grid col (can be half integer for edge/corner centers)
}

interface BoardData {
  size: number;
  centers: GalaxyCenter[];
}

const BOARDS: Record<number, BoardData> = {
  4: {
    size: 4,
    centers: [
      { r: 0.5, c: 0.5 },
      { r: 0.5, c: 2.5 },
      { r: 2, c: 1 },
      { r: 2.5, c: 3 },
      { r: 3.5, c: 1.5 },
    ],
  },
  5: {
    size: 5,
    centers: [
      { r: 0.5, c: 0.5 },
      { r: 0, c: 3.5 },
      { r: 1, c: 2 },
      { r: 2.5, c: 4.5 },
      { r: 3, c: 1 },
      { r: 4.5, c: 2.5 },
    ],
  },
  6: {
    size: 6,
    centers: [
      { r: 1, c: 1 },
      { r: 0.5, c: 3 },
      { r: 1, c: 4.5 },
      { r: 2.5, c: 2.5 },
      { r: 4, c: 0.5 },
      { r: 4, c: 4.5 },
      { r: 5, c: 3 },
    ],
  },
};

const SpiralGalaxiesGame: React.FC<SpiralGalaxiesProps> = ({
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
        return 600;
      case Difficulty.MEDIUM:
        return 900;
      case Difficulty.HARD:
      case Difficulty.VERY_HARD:
        return 1200;
      default:
        return 900;
    }
  };

  const size = getSizeForDifficulty();
  const boardData = BOARDS[size] || BOARDS[5];

  // Horizontal edges between rows. hEdges[r][c] is true if there's a horizontal line ABOVE row r, col c
  // Size: (size + 1) x size
  const [hEdges, setHEdges] = useState<boolean[][]>([]);
  // Vertical edges between cols. vEdges[r][c] is true if there's a vertical line LEFT of row r, col c
  // Size: size x (size + 1)
  const [vEdges, setVEdges] = useState<boolean[][]>([]);

  const [mistakes, setMistakes] = useState(0);
  const [maxMistakes, setMaxMistakes] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getTimeForDifficulty());
  const [isGameOver, setIsGameOver] = useState(false);
  const [showRules, setShowRules] = useState(true);

  const initGame = useCallback(() => {
    const initialH = Array(size + 1)
      .fill(false)
      .map(() => Array(size).fill(false));
    const initialV = Array(size)
      .fill(false)
      .map(() => Array(size + 1).fill(false));

    // set outer boundaries as true initially
    for (let c = 0; c < size; c++) {
      initialH[0][c] = true;
      initialH[size][c] = true;
    }
    for (let r = 0; r < size; r++) {
      initialV[r][0] = true;
      initialV[r][size] = true;
    }

    setHEdges(initialH);
    setVEdges(initialV);

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

  const toggleEdge = (type: 'h' | 'v', r: number, c: number) => {
    if (isGameOver || showRules) return;

    // prevent toggling outer boundaries
    if (type === 'h' && (r === 0 || r === size)) return;
    if (type === 'v' && (c === 0 || c === size)) return;

    if (type === 'h') {
      const newH = hEdges.map((row) => [...row]);
      newH[r][c] = !newH[r][c];
      setHEdges(newH);
      checkWinCondition(newH, vEdges);
    } else {
      const newV = vEdges.map((row) => [...row]);
      newV[r][c] = !newV[r][c];
      setVEdges(newV);
      checkWinCondition(hEdges, newV);
    }
  };

  const checkWinCondition = (currH: boolean[][], currV: boolean[][]) => {
    // Flood fill to find all regions separated by edges
    const visited = Array(size)
      .fill(false)
      .map(() => Array(size).fill(false));
    const regions: { r: number; c: number }[][] = [];

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (!visited[i][j]) {
          const region: { r: number; c: number }[] = [];
          const q: { r: number; c: number }[] = [{ r: i, c: j }];
          visited[i][j] = true;

          while (q.length > 0) {
            const cell = q.shift()!;
            region.push(cell);

            const { r, c } = cell;

            // Top
            if (r > 0 && !currH[r][c] && !visited[r - 1][c]) {
              visited[r - 1][c] = true;
              q.push({ r: r - 1, c });
            }
            // Bottom
            if (r < size - 1 && !currH[r + 1][c] && !visited[r + 1][c]) {
              visited[r + 1][c] = true;
              q.push({ r: r + 1, c });
            }
            // Left
            if (c > 0 && !currV[r][c] && !visited[r][c - 1]) {
              visited[r][c - 1] = true;
              q.push({ r, c: c - 1 });
            }
            // Right
            if (c < size - 1 && !currV[r][c + 1] && !visited[r][c + 1]) {
              visited[r][c + 1] = true;
              q.push({ r, c: c + 1 });
            }
          }
          regions.push(region);
        }
      }
    }

    // Rule 1: Every region must contain EXACTLY ONE center
    // Rule 2: Every region must be 180-degree symmetric around its center
    // Rule 3: All cells must be part of a valid galaxy

    let isBoardValid = true;
    let isComplete = true; // Wait, actually the edges might be drawn fully but invalid. Or incomplete.
    // It's complete if ALL centers have EXACTLY one valid region covering them, and NO region has 0 cells or multiple centers.

    if (regions.length !== boardData.centers.length) {
      isComplete = false;
    }

    const centerUsed = Array(boardData.centers.length).fill(false);

    for (const reg of regions) {
      // Find which center(s) are in this region
      const centersInReg: { idx: number; center: GalaxyCenter }[] = [];

      boardData.centers.forEach((center, idx) => {
        // A center is in the region if mapping its physical coordinate overlaps the cells
        // Wait, it's easier to verify if the region is symmetric around THIS center.
        // But a center point e.g {r:1, c:1} belongs to a cell.
        // Center point {r:0.5, c:0.5} belongs to the border 4 cells (0,0), (0,1), (1,0), (1,1).
        // Actually, just check if the region is rotationally symmetric around ANY center.
        // And we must use all centers.

        // For a region and a center to match:
        // For every cell (R, C) in region, its 180-deg rotated neighbor (2*center.r - R, 2*center.c - C)
        // must also be in the region.

        let isSymmetric = true;
        const cellSet = new Set(reg.map((cell) => `${cell.r},${cell.c}`));

        for (const cell of reg) {
          const symR = 2 * center.r - cell.r;
          const symC = 2 * center.c - cell.c;

          if (!cellSet.has(`${symR},${symC}`)) {
            isSymmetric = false;
            break;
          }
        }

        if (isSymmetric) {
          centersInReg.push({ idx, center });
        }
      });

      if (centersInReg.length === 1) {
        centerUsed[centersInReg[0].idx] = true;
      } else {
        // This region either has 0 centers it is symmetric around, or multiple.
        isComplete = false;
      }
    }

    if (isComplete && centerUsed.every((v) => v)) {
      handleGameOver(true);
    }
  };

  const cellSize = 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans selection:bg-purple-500/30">
      {showRules && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
          <div className="bg-slate-800 p-8 rounded-3xl max-w-lg w-full shadow-2xl border border-white/10 bounce-in">
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <span className="text-4xl text-purple-400">🌌</span> Spiral Galaxies
            </h2>
            <ul className="space-y-4 mb-8 text-slate-300 text-lg">
              <li className="flex gap-3">
                <span>✨</span>
                <div>Oyun alanındaki her nokta bir **Galaksi Çekirdeği**dir. </div>
              </li>
              <li className="flex gap-3 text-purple-400 font-bold">
                <span>📏</span>
                <div>
                  Izgarayı öyle bloklara bölmelisin ki; her galaksinin şekli, kendi çekirdeğine göre
                  **180 derece dönüş simetrisine (noktasal simetriye)** sahip olsun.
                </div>
              </li>
              <li className="flex gap-3">
                <span>🖱️</span>
                <div>
                  Hücre aralarındaki kesik çizgilere tıklayarak duvar ör/kaldır. Her kapalı bölgenin
                  içinde tam 1 çekirdek olmalı.
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

      <div className="w-full max-w-4xl px-4 py-6 md:py-12">
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
              <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500 tracking-wider">
                Galaxies
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
        <div className="flex justify-center mb-8 relative select-none">
          <div className="relative bg-slate-100 p-8 rounded-2xl shadow-2xl border-4 border-slate-300">
            {/* Grid container with exact dimensions */}
            <div
              className="relative"
              style={{
                width: `${size * cellSize}px`,
                height: `${size * cellSize}px`,
              }}
            >
              {/* Inner Grid Background Lines */}
              {Array.from({ length: size }).map((_, r) =>
                Array.from({ length: size }).map((_, c) => (
                  <div
                    key={`bg-${r}-${c}`}
                    className="absolute border border-slate-300/50 pointer-events-none"
                    style={{
                      top: `${r * cellSize}px`,
                      left: `${c * cellSize}px`,
                      width: `${cellSize}px`,
                      height: `${cellSize}px`,
                    }}
                  />
                ))
              )}

              {/* Centers */}
              {boardData.centers.map((center, idx) => (
                <div
                  key={`center-${idx}`}
                  className="absolute w-4 h-4 bg-purple-600 rounded-full shadow-[0_0_10px_rgba(147,51,234,0.8)] transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none border-2 border-white"
                  style={{
                    top: `${center.r * cellSize + cellSize / 2}px`,
                    left: `${center.c * cellSize + cellSize / 2}px`,
                  }}
                />
              ))}

              {/* Vertical Edge Buttons */}
              {vEdges.map((row, r) =>
                row.map((edge, c) => (
                  <div
                    key={`v-${r}-${c}`}
                    className={`absolute flex items-center justify-center transform -translate-x-1/2 z-20 cursor-pointer
                                            ${c === 0 || c === size ? 'pointer-events-none' : 'hover:scale-y-110 active:scale-y-95 group'}
                                        `}
                    style={{
                      top: `${r * cellSize}px`,
                      left: `${c * cellSize}px`,
                      width: `16px`,
                      height: `${cellSize}px`,
                    }}
                    onClick={() => toggleEdge('v', r, c)}
                  >
                    <div
                      className={`transition-all duration-200 
                                            ${edge ? 'bg-slate-800 w-[6px]' : 'bg-transparent w-[12px] group-hover:bg-slate-300'} 
                                            h-full rounded-full
                                        `}
                    />
                  </div>
                ))
              )}

              {/* Horizontal Edge Buttons */}
              {hEdges.map((row, r) =>
                row.map((edge, c) => (
                  <div
                    key={`h-${r}-${c}`}
                    className={`absolute flex items-center justify-center transform -translate-y-1/2 z-20 cursor-pointer
                                            ${r === 0 || r === size ? 'pointer-events-none' : 'hover:scale-x-110 active:scale-x-95 group'}
                                        `}
                    style={{
                      top: `${r * cellSize}px`,
                      left: `${c * cellSize}px`,
                      width: `${cellSize}px`,
                      height: `16px`,
                    }}
                    onClick={() => toggleEdge('h', r, c)}
                  >
                    <div
                      className={`transition-all duration-200 
                                            ${edge ? 'bg-slate-800 h-[6px]' : 'bg-transparent h-[12px] group-hover:bg-slate-300'} 
                                            w-full rounded-full
                                        `}
                    />
                  </div>
                ))
              )}

              {/* Overlay Nodes at Intersections */}
              {Array.from({ length: size + 1 }).map((_, r) =>
                Array.from({ length: size + 1 }).map((_, c) => (
                  <div
                    key={`node-${r}-${c}`}
                    className="absolute w-2 h-2 bg-slate-800 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
                    style={{
                      top: `${r * cellSize}px`,
                      left: `${c * cellSize}px`,
                    }}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center bg-slate-800/50 p-4 rounded-2xl border border-white/5 max-w-sm mx-auto">
          <p className="text-slate-400 text-sm font-medium">
            Hücre aralarına tıklayarak simetrik galaksilerin duvarlarını örün.
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
                ? 'Evren Çöktü!'
                : timeLeft <= 0
                  ? 'Süre Doldu!'
                  : 'Kozmik Uyum!'}
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              {mistakes >= maxMistakes
                ? 'Çok fazla hata yaptın.'
                : timeLeft <= 0
                  ? 'Süreyi daha iyi kullanmayı dene.'
                  : `Tüm galaksileri simetrik olarak böldün! Kazanılan Yıldız: ${score}`}
            </p>

            <div className="flex flex-col gap-3">
              {mistakes < maxMistakes && timeLeft > 0 && (
                <button
                  onClick={() => onComplete(score)}
                  className="w-full py-4 rounded-2xl font-black text-xl transition-all bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-400 hover:to-fuchsia-500 text-white shadow-lg active:scale-95 text-transparent bg-clip-text text-white"
                >
                  Ödülü Al ⭐️
                </button>
              )}
              <button
                onClick={initGame}
                className="w-full py-4 rounded-2xl font-black text-xl transition-all bg-slate-600 hover:bg-slate-500 text-white shadow-lg active:scale-95"
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

export default SpiralGalaxiesGame;

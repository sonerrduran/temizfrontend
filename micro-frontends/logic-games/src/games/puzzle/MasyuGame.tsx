import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../types';

interface MasyuGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface BoardData {
  size: number;
  // P: 1 (White), 2 (Black)
  pearls: { r: number; c: number; type: number }[];
}

const BOARDS: Record<number, BoardData> = {
  4: {
    size: 4,
    pearls: [
      { r: 0, c: 1, type: 1 }, // White
      { r: 2, c: 2, type: 2 }, // Black
      { r: 3, c: 1, type: 1 }, // White
    ],
  },
  5: {
    size: 5,
    pearls: [
      { r: 1, c: 1, type: 2 }, // Black
      { r: 1, c: 3, type: 1 }, // White
      { r: 3, c: 1, type: 1 }, // White
      { r: 3, c: 3, type: 2 }, // Black
    ],
  },
  6: {
    size: 6,
    pearls: [
      { r: 0, c: 2, type: 1 },
      { r: 0, c: 4, type: 2 },
      { r: 2, c: 1, type: 2 },
      { r: 3, c: 4, type: 1 },
      { r: 5, c: 1, type: 1 },
      { r: 5, c: 3, type: 2 },
    ],
  },
};

const MasyuGame: React.FC<MasyuGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
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

  // Edges state
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

  const toggleEdge = (type: 'h' | 'v', r: number, c: number) => {
    if (isGameOver || showRules) return;

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

  const checkWinCondition = (currentH: boolean[][], currentV: boolean[][]) => {
    // Build graph to check degrees and loop
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

    // 1. All nodes with edges must have degree 2
    let hasEdges = false;
    let startR = -1,
      startC = -1;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (degrees[r][c] > 0) {
          hasEdges = true;
          if (startR === -1) {
            startR = r;
            startC = c;
          }
          if (degrees[r][c] !== 2) return; // Wait until all are 2 before checking rules/loops
        }
      }
    }

    if (!hasEdges) return;

    // 2. Must be a single loop
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

      // Check neighbors
      // Up
      if (cr > 0 && currentV[cr - 1][cc] && !visited[cr - 1][cc]) {
        visited[cr - 1][cc] = true;
        q.push([cr - 1, cc]);
      }
      // Down
      if (cr < size - 1 && currentV[cr][cc] && !visited[cr + 1][cc]) {
        visited[cr + 1][cc] = true;
        q.push([cr + 1, cc]);
      }
      // Left
      if (cc > 0 && currentH[cr][cc - 1] && !visited[cr][cc - 1]) {
        visited[cr][cc - 1] = true;
        q.push([cr, cc - 1]);
      }
      // Right
      if (cc < size - 1 && currentH[cr][cc] && !visited[cr][cc + 1]) {
        visited[cr][cc + 1] = true;
        q.push([cr, cc + 1]);
      }
    }

    if (visitedCount !== totalNodesWithEdges) return; // Disconnected graphs exist

    // 3. Check Pearl Rules
    let errors = false;

    const isStraight = (r: number, c: number) => {
      // Straight means (Up+Down) OR (Left+Right)
      const up = r > 0 && currentV[r - 1][c];
      const down = r < size - 1 && currentV[r][c];
      const left = c > 0 && currentH[r][c - 1];
      const right = c < size - 1 && currentH[r][c];
      if (up && down && !left && !right) return 'v';
      if (left && right && !up && !down) return 'h';
      return false;
    };

    const isCorner = (r: number, c: number) => {
      const straight = isStraight(r, c);
      if (straight) return false;
      // Since degree is 2, if not straight, it's a corner
      return true;
    };

    for (const pearl of boardData.pearls) {
      const r = pearl.r;
      const c = pearl.c;

      // Pearl must be visited
      if (degrees[r][c] !== 2) {
        // Return if not visited. Pearl must be visited.
        // Wait, do ALL pearls need to be visited? Yes.
        return;
      }

      if (pearl.type === 1) {
        // White Pearl: MUST travel straight through it.
        // AND must turn in at least one the the adjacent cells.
        const straight = isStraight(r, c);
        if (!straight) {
          errors = true;
          break;
        }

        let turned = false;
        if (straight === 'h') {
          // Check Left and Right neighbors
          if (isCorner(r, c - 1) || isCorner(r, c + 1)) turned = true;
        } else {
          // Check Up and Down neighbors
          if (isCorner(r - 1, c) || isCorner(r + 1, c)) turned = true;
        }

        if (!turned) {
          errors = true;
          break;
        }
      } else if (pearl.type === 2) {
        // Black Pearl: MUST turn upon it.
        // AND must travel straight through the TWO cells immediately before and after it.
        if (!isCorner(r, c)) {
          errors = true;
          break;
        }

        const up = r > 0 && currentV[r - 1][c];
        const down = r < size - 1 && currentV[r][c];
        const left = c > 0 && currentH[r][c - 1];
        const right = c < size - 1 && currentH[r][c];

        if (up) {
          if (!isStraight(r - 1, c)) {
            errors = true;
            break;
          }
        }
        if (down) {
          if (!isStraight(r + 1, c)) {
            errors = true;
            break;
          }
        }
        if (left) {
          if (!isStraight(r, c - 1)) {
            errors = true;
            break;
          }
        }
        if (right) {
          if (!isStraight(r, c + 1)) {
            errors = true;
            break;
          }
        }
      }
    }

    if (errors) {
      setMistakes((m) => {
        const newM = m + 1;
        if (newM >= maxMistakes) handleGameOver(false);
        return newM;
      });
    } else {
      handleGameOver(true);
    }
  };

  const cellSize = 50; // pixels

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans selection:bg-slate-500/30">
      {showRules && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
          <div className="bg-slate-800 p-8 rounded-3xl max-w-lg w-full shadow-2xl border border-white/10 bounce-in">
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">📿</span> Masyu
            </h2>
            <ul className="space-y-4 mb-8 text-slate-300 text-lg">
              <li className="flex gap-3">
                <span>🔗</span>
                <div>
                  Tüm noktalardan (hücrelerden) geçmek zorunda olmayan, ancak{' '}
                  <b>tek parça, kapalı bir çizgi döngüsü (loop)</b> oluşturmalısın.
                </div>
              </li>
              <li className="flex gap-3">
                <span>⚪</span>
                <div>
                  <b>Beyaz İnciler:</b> Çizgi incinin üzerinden <b>dümdüz</b> geçmelidir. İnci
                  hücresinden çıkar çıkmaz (hemen öncesi veya sonrası){' '}
                  <b>en az bir tarafta dönüş (köşe) yapmalıdır.</b>
                </div>
              </li>
              <li className="flex gap-3">
                <span>⚫</span>
                <div>
                  <b>Siyah İnciler:</b> Çizgi tam incinin üzerinde{' '}
                  <b>kesinlikle 90 derece dönmelidir</b>. Ancak döndükten sonra her iki yöne doğru
                  çıkarken <b>en az iki hücre boyunca dümdüz</b> ilerlemelidir. (Yani dönüşten hemen
                  sonra tekrar dönüş yapılamaz).
                </div>
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full py-4 rounded-xl font-black text-xl transition-all bg-slate-600 hover:bg-slate-500 text-white shadow-lg active:scale-95"
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
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all relative z-50"
            >
              ⬅ Geri Dön
            </button>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-wider">Masyu</h2>
              <div className="text-xs md:text-sm font-bold text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full mt-1 inline-block">
                SEVİYE: {size}x{size}
              </div>
            </div>
          </div>
          <div className="text-right flex flex-col items-end gap-2">
            <div className="bg-slate-900/80 px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3">
              <span className="text-lg">⏱️</span>
              <span
                className={`text-xl md:text-2xl font-black font-mono ${timeLeft < 60 ? 'text-rose-400 animate-pulse' : 'text-slate-300'}`}
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
            className="relative bg-slate-200 shadow-2xl rounded-sm border border-slate-300 p-8"
            style={{
              width: `${(size - 1) * cellSize + 64}px`,
              height: `${(size - 1) * cellSize + 64}px`,
            }}
          >
            {/* Grid Background Lines (Visual only, to help alignment) */}
            <div className="absolute inset-8 pointer-events-none">
              {Array(size)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={`bg-v-${i}`}
                    className="absolute top-0 bottom-0 border-l border-slate-300 pointer-events-none"
                    style={{ left: `${i * cellSize}px` }}
                  />
                ))}
              {Array(size)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={`bg-h-${i}`}
                    className="absolute left-0 right-0 border-t border-slate-300 pointer-events-none"
                    style={{ top: `${i * cellSize}px` }}
                  />
                ))}
            </div>

            {/* Edges - Horizontal */}
            <div className="absolute inset-8 z-10">
              {hEdges.map((row, r) =>
                row.map((edge, c) => (
                  <button
                    key={`h-${r}-${c}`}
                    onClick={() => toggleEdge('h', r, c)}
                    className="absolute group z-20 outline-none"
                    style={{
                      top: `${r * cellSize - 15}px`,
                      left: `${c * cellSize + 10}px`,
                      width: `${cellSize - 20}px`,
                      height: `30px`,
                    }}
                  >
                    <div
                      className={`w-full h-2 rounded-full mx-auto transition-colors ${edge ? 'bg-slate-900 shadow-md' : 'bg-transparent group-hover:bg-slate-300'}`}
                    ></div>
                  </button>
                ))
              )}
            </div>

            {/* Edges - Vertical */}
            <div className="absolute inset-8 z-10">
              {vEdges.map((row, r) =>
                row.map((edge, c) => (
                  <button
                    key={`v-${r}-${c}`}
                    onClick={() => toggleEdge('v', r, c)}
                    className="absolute group z-20 outline-none"
                    style={{
                      top: `${r * cellSize + 10}px`,
                      left: `${c * cellSize - 15}px`,
                      width: `30px`,
                      height: `${cellSize - 20}px`,
                    }}
                  >
                    <div
                      className={`h-full w-2 rounded-full my-auto mx-auto transition-colors ${edge ? 'bg-slate-900 shadow-md' : 'bg-transparent group-hover:bg-slate-300'}`}
                    ></div>
                  </button>
                ))
              )}
            </div>

            {/* Nodes (Dots / Pearls) */}
            <div className="absolute inset-8 z-0 pointer-events-none">
              {Array(size)
                .fill(0)
                .map((_, r) =>
                  Array(size)
                    .fill(0)
                    .map((_, c) => {
                      const pearl = boardData.pearls.find((p) => p.r === r && p.c === c);
                      if (pearl) {
                        return (
                          <div
                            key={`node-${r}-${c}`}
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 drop-shadow-lg z-30
                                                    ${pearl.type === 1 ? 'bg-white border-slate-400 w-6 h-6' : 'bg-slate-900 border-slate-700 w-6 h-6'}
                                                `}
                            style={{ top: `${r * cellSize}px`, left: `${c * cellSize}px` }}
                          />
                        );
                      }
                      return (
                        <div
                          key={`node-${r}-${c}`}
                          className="absolute w-2 h-2 bg-slate-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                          style={{ top: `${r * cellSize}px`, left: `${c * cellSize}px` }}
                        />
                      );
                    })
                )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center bg-slate-800/50 p-4 rounded-2xl border border-white/5 max-w-sm mx-auto">
          <p className="text-slate-400 text-sm font-medium">
            Büyük bir döngü oluşturmak için iki hücre arasına tıkla.
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
                ? 'İnci İhlali!'
                : timeLeft <= 0
                  ? 'Süre Doldu!'
                  : 'Tebrikler Detektif!'}
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              {mistakes >= maxMistakes
                ? 'İncilerin üzerinden geçerken dönüş/düz kurallarına dikkat etmedin.'
                : timeLeft <= 0
                  ? 'Süreyi daha iyi kullanmayı dene.'
                  : `Tüm incileri kurallarına uyarak tek bir kolyede birleştirdin! Kazanılan Yıldız: ${score}`}
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

export default MasyuGame;

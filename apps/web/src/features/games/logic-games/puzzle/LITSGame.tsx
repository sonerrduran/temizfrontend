import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';

interface LITSGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface BoardData {
  size: number;
  regions: number[][]; // Region ID for each cell
}

const BOARDS: Record<number, BoardData> = {
  5: {
    size: 5,
    regions: [
      [1, 1, 1, 2, 2],
      [1, 1, 2, 2, 2],
      [3, 3, 4, 4, 4],
      [3, 5, 5, 4, 4],
      [3, 5, 5, 5, 5],
    ],
  },
  6: {
    size: 6,
    regions: [
      [1, 1, 2, 2, 2, 3],
      [1, 1, 1, 2, 3, 3],
      [1, 4, 4, 4, 3, 3],
      [5, 5, 4, 4, 6, 6],
      [5, 5, 6, 6, 6, 7],
      [5, 5, 5, 7, 7, 7],
    ],
  },
  7: {
    size: 7,
    regions: [
      [1, 1, 1, 2, 2, 3, 3],
      [1, 1, 1, 2, 2, 3, 3],
      [4, 4, 4, 5, 5, 6, 6],
      [4, 4, 4, 5, 5, 6, 6],
      [7, 7, 8, 8, 9, 9, 6],
      [7, 7, 8, 8, 9, 9, 6],
      [7, 7, 7, 8, 8, 9, 9], // 9 regions
    ],
  },
};

const LITSGame: React.FC<LITSGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
  const getSizeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
        return 5;
      case Difficulty.MEDIUM:
        return 6;
      default:
        return 7;
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

  // Grid states: 0: Empty, 1: Black (Tetromino), 2: X (Marked as empty)
  const [grid, setGrid] = useState<number[][]>([]);

  const [mistakes, setMistakes] = useState(0);
  const [maxMistakes, setMaxMistakes] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getTimeForDifficulty());
  const [isGameOver, setIsGameOver] = useState(false);
  const [showRules, setShowRules] = useState(true);

  const initGame = useCallback(() => {
    setGrid(
      Array(size)
        .fill(0)
        .map(() => Array(size).fill(0))
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

  const handleCellClick = (r: number, c: number) => {
    if (isGameOver || showRules) return;

    const current = grid[r][c];
    const newGrid = grid.map((row) => [...row]);
    newGrid[r][c] = current === 0 ? 1 : current === 1 ? 2 : 0;
    setGrid(newGrid);

    checkWinCondition(newGrid);
  };

  const handleRightClick = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (isGameOver || showRules) return;

    const current = grid[r][c];
    const newGrid = grid.map((row) => [...row]);
    newGrid[r][c] = current === 2 ? 0 : 2;
    setGrid(newGrid);

    checkWinCondition(newGrid);
  };

  const getRegionId = (r: number, c: number) => {
    return boardData.regions[r][c];
  };

  // Helper to identify Tetromino Type (L, I, T, S)
  // Returns type or null if not exactly 4 cells or not a tetromino
  const identifyTetromino = (cells: { r: number; c: number }[]) => {
    if (cells.length !== 4) return null;

    let minR = size,
      maxR = -1,
      minC = size,
      maxC = -1;
    cells.forEach((c) => {
      if (c.r < minR) minR = c.r;
      if (c.r > maxR) maxR = c.r;
      if (c.c < minC) minC = c.c;
      if (c.c > maxC) maxC = c.c;
    });

    const w = maxC - minC + 1;
    const h = maxR - minR + 1;

    // Create a local grid for the shape
    const local = Array(h)
      .fill(0)
      .map(() => Array(w).fill(false));
    cells.forEach((c) => {
      local[c.r - minR][c.c - minC] = true;
    });

    const shapeStr = local.map((row) => row.map((v) => (v ? '1' : '0')).join('')).join('-');

    // I
    if (w === 1 && h === 4) return 'I';
    if (w === 4 && h === 1) return 'I';

    // O is invalid in LITS but we need to check if they drew an O
    if (w === 2 && h === 2 && shapeStr === '11-11') return 'O'; // O is not allowed

    // L / J
    const L_shapes = [
      '10-10-11',
      '01-01-11',
      '11-10-10',
      '11-01-01', // 2x3
      '111-100',
      '111-001',
      '100-111',
      '001-111', // 3x2
    ];
    if (L_shapes.includes(shapeStr)) return 'L';

    // T
    const T_shapes = [
      '111-010',
      '010-111', // 3x2
      '10-11-10',
      '01-11-01', // 2x3
    ];
    if (T_shapes.includes(shapeStr)) return 'T';

    // S / Z
    const S_shapes = [
      '011-110',
      '110-011', // 3x2
      '10-11-01',
      '01-11-10', // 2x3
    ];
    if (S_shapes.includes(shapeStr)) return 'S';

    return null; // Unknown / Disconnected / O
  };

  const checkWinCondition = (currentGrid: number[][]) => {
    // Find all regions and the black cells in them
    const regionMap = new Map<number, { r: number; c: number }[]>();
    const allRegionIds = new Set<number>();

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const regId = getRegionId(r, c);
        allRegionIds.add(regId);

        if (currentGrid[r][c] === 1) {
          if (!regionMap.has(regId)) regionMap.set(regId, []);
          regionMap.get(regId)!.push({ r, c });
        }
      }
    }

    // Rule 1: Every region must have exactly one Tetromino (4 continuous cells)
    let tetrominoesValid = true;
    let isFull = true;
    const regionTypes = new Map<number, string>(); // regId -> Type (L,I,T,S)

    for (const regId of Array.from(allRegionIds)) {
      const cells = regionMap.get(regId) || [];
      if (cells.length !== 4) {
        isFull = false;
        tetrominoesValid = false;
      } else {
        const type = identifyTetromino(cells);
        if (!type || type === 'O') {
          // It's 4 cells but not a valid tetromino or it's an O
          tetrominoesValid = false;
        } else {
          regionTypes.set(regId, type);
        }
      }
    }

    if (!isFull) return; // Keep playing

    let hasError = false;

    if (!tetrominoesValid) {
      hasError = true;
    }

    // Look for all black cells
    const blackCells: { r: number; c: number }[] = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentGrid[r][c] === 1) blackCells.push({ r, c });
      }
    }

    // Rule 2: All black cells must be orthogonally connected
    if (blackCells.length > 0 && !hasError) {
      const visited = Array(size)
        .fill(false)
        .map(() => Array(size).fill(false));
      const q = [blackCells[0]];
      visited[q[0].r][q[0].c] = true;
      let visitedCount = 0;

      while (q.length > 0) {
        const { r, c } = q.shift()!;
        visitedCount++;

        const neighbors = [
          { r: r - 1, c },
          { r: r + 1, c },
          { r, c: c - 1 },
          { r, c: c + 1 },
        ];

        for (const n of neighbors) {
          if (n.r >= 0 && n.r < size && n.c >= 0 && n.c < size) {
            if (currentGrid[n.r][n.c] === 1 && !visited[n.r][n.c]) {
              visited[n.r][n.c] = true;
              q.push(n);
            }
          }
        }
      }

      if (visitedCount !== blackCells.length) hasError = true;
    }

    // Rule 3: No 2x2 square of black cells
    if (!hasError) {
      for (let r = 0; r < size - 1; r++) {
        for (let c = 0; c < size - 1; c++) {
          if (
            currentGrid[r][c] === 1 &&
            currentGrid[r + 1][c] === 1 &&
            currentGrid[r][c + 1] === 1 &&
            currentGrid[r + 1][c + 1] === 1
          ) {
            hasError = true;
          }
        }
      }
    }

    // Rule 4: Two tetrominoes of the SAME shape cannot be orthogonally adjacent
    if (!hasError) {
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (currentGrid[r][c] === 1) {
            const myReg = getRegionId(r, c);
            const myType = regionTypes.get(myReg);

            // Check right neighbor
            if (c < size - 1 && currentGrid[r][c + 1] === 1) {
              const rightReg = getRegionId(r, c + 1);
              if (myReg !== rightReg && myType === regionTypes.get(rightReg)) {
                hasError = true;
              }
            }
            // Check bottom neighbor
            if (r < size - 1 && currentGrid[r + 1][c] === 1) {
              const bottomReg = getRegionId(r + 1, c);
              if (myReg !== bottomReg && myType === regionTypes.get(bottomReg)) {
                hasError = true;
              }
            }
          }
        }
      }
    }

    if (hasError) {
      setMistakes((m) => {
        const newM = m + 1;
        if (newM >= maxMistakes) handleGameOver(false);
        return newM;
      });
    } else {
      handleGameOver(true);
    }
  };

  const getBorderClasses = (r: number, c: number) => {
    let classes = '';
    const reg = getRegionId(r, c);

    // Top
    if (r === 0 || getRegionId(r - 1, c) !== reg) classes += ' border-t-[4px] border-t-slate-800';
    else classes += ' border-t border-t-slate-300';

    // Bottom
    if (r === size - 1 || getRegionId(r + 1, c) !== reg)
      classes += ' border-b-[4px] border-b-slate-800';
    else classes += ' border-b border-b-slate-300';

    // Left
    if (c === 0 || getRegionId(r, c - 1) !== reg) classes += ' border-l-[4px] border-l-slate-800';
    else classes += ' border-l border-l-slate-300';

    // Right
    if (c === size - 1 || getRegionId(r, c + 1) !== reg)
      classes += ' border-r-[4px] border-r-slate-800';
    else classes += ' border-r border-r-slate-300';

    return classes;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-slate-800 font-sans selection:bg-orange-500/30">
      {showRules && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
          <div className="bg-slate-800 p-8 rounded-3xl max-w-lg w-full shadow-2xl border border-white/10 bounce-in">
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <span className="text-4xl text-orange-400">🧩</span> LITS
            </h2>
            <ul className="space-y-4 mb-8 text-slate-300 text-lg">
              <li className="flex gap-3">
                <span className="text-orange-400">⬜</span>
                <div>
                  Her kalın bölgenin içine **L, I, T veya S** şekillerinden (Tetris blokları - 4
                  hücreli) tam 1 tane çizmelisin. O şekli (kutu) çizmek yasak.
                </div>
              </li>
              <li className="flex gap-3 text-emerald-400">
                <span>🔗</span>
                <div>Tüm siyah hücreler birbirine **dokunmalıdır** (tek parça bir ağ).</div>
              </li>
              <li className="flex gap-3 text-rose-400 font-bold">
                <span>🚫</span>
                <div>
                  Siyah hücreler hiçbir yerde **2x2 bir kare oluşturamaz** ve **Aynı iki harf/şekil
                  birbirine değemez!**
                </div>
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full py-4 rounded-xl font-black text-xl transition-all bg-orange-600 hover:bg-orange-500 text-white shadow-lg active:scale-95"
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
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all font-bold text-white relative z-50"
            >
              ⬅ Geri Dön
            </button>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 tracking-wider">
                LITS
              </h2>
              <div className="text-xs md:text-sm font-bold text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full mt-1 inline-block">
                SEVİYE: {size}x{size}
              </div>
            </div>
          </div>
          <div className="text-right flex flex-col items-end gap-2 text-white">
            <div className="bg-slate-900/80 px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3">
              <span className="text-lg">⏱️</span>
              <span
                className={`text-xl md:text-2xl font-black font-mono ${timeLeft < 60 ? 'text-rose-400 animate-pulse' : 'text-orange-300'}`}
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
          <div className="bg-slate-100 p-2 sm:p-4 rounded-xl shadow-2xl border-4 border-slate-300">
            <div className="flex flex-col" style={{ width: 'fit-content' }}>
              {grid.map((row, r) => (
                <div key={r} className="flex">
                  {row.map((cell, c) => (
                    <button
                      key={`${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      onContextMenu={(e) => handleRightClick(e, r, c)}
                      className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center transition-colors duration-200 outline-none
                                                ${getBorderClasses(r, c)}
                                                ${cell === 1 ? 'bg-slate-800' : cell === 2 ? 'bg-slate-200' : 'bg-white hover:bg-slate-100'}
                                            `}
                    >
                      {cell === 2 && (
                        <span className="text-slate-400 font-black text-2xl select-none">×</span>
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center bg-slate-800/50 p-4 rounded-2xl border border-white/5 max-w-sm mx-auto">
          <p className="text-slate-400 text-sm font-medium">
            Blok koymak için <span className="text-white font-bold">Sol Tık</span>, boşluk işareti
            için <span className="text-white font-bold">Sağ Tık (X)</span>.
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
                ? 'Kural İhlali!'
                : timeLeft <= 0
                  ? 'Süre Doldu!'
                  : 'Harika Şekiller!'}
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              {mistakes >= maxMistakes
                ? 'Aynı harfler temas etti, 2x2 oluştu veya ağ koptu.'
                : timeLeft <= 0
                  ? 'Süreyi daha iyi kullanmayı dene.'
                  : `Tüm kurallara uyarak Tetromino ağını kurdun! Kazanılan Yıldız: ${score}`}
            </p>

            <div className="flex flex-col gap-3">
              {mistakes < maxMistakes && timeLeft > 0 && (
                <button
                  onClick={() => onComplete(score)}
                  className="w-full py-4 rounded-2xl font-black text-xl transition-all bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white shadow-lg active:scale-95 text-transparent bg-clip-text text-white"
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

export default LITSGame;

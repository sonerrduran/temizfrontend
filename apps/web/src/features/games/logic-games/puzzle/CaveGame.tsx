import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';

interface CaveProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface BoardData {
  size: number;
  clues: number[][]; // 0 means no clue. value > 0 is the clue.
}

// Clue means: "How many cave (white) cells I can see from this cell looking horizontally and vertically, including myself"
// The clue cell itself MUST be part of the cave (white).

const BOARDS: Record<number, BoardData> = {
  5: {
    size: 5,
    clues: [
      [0, 0, 0, 0, 2],
      [5, 0, 0, 0, 0],
      [0, 6, 0, 5, 0],
      [0, 0, 0, 0, 4],
      [6, 0, 0, 0, 0],
    ],
  },
  6: {
    size: 6,
    clues: [
      [3, 0, 6, 0, 0, 0],
      [0, 0, 0, 0, 7, 0],
      [0, 4, 0, 5, 0, 0],
      [0, 0, 6, 0, 4, 0],
      [0, 6, 0, 0, 0, 0],
      [0, 0, 0, 8, 0, 4],
    ],
  },
  7: {
    size: 7,
    clues: [
      [0, 0, 0, 5, 0, 2, 0],
      [0, 8, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 5, 0, 0],
      [7, 0, 0, 6, 0, 0, 5],
      [0, 0, 6, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 6, 0],
      [0, 3, 0, 7, 0, 0, 0],
    ],
  },
};

type CellState = 'empty' | 'cave' | 'wall';

const CaveGame: React.FC<CaveProps> = ({ grade, difficulty, onComplete, onExit }) => {
  const getSizeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
        return 5;
      case Difficulty.MEDIUM:
        return 6;
      case Difficulty.HARD:
      case Difficulty.VERY_HARD:
        return 7;
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

  const [grid, setGrid] = useState<CellState[][]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [maxMistakes, setMaxMistakes] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getTimeForDifficulty());
  const [isGameOver, setIsGameOver] = useState(false);
  const [showRules, setShowRules] = useState(true);

  const initGame = useCallback(() => {
    // Initialize grid: Clue cells are 'cave' implicitly, but let's let user mark them or just auto-mark them.
    // It's better for user experience to auto-mark clue cells as 'cave' because rule says clues MUST be in the cave.
    const initial = Array(size)
      .fill('empty')
      .map(() => Array(size).fill('empty'));
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (boardData.clues[r][c] > 0) {
          initial[r][c] = 'cave';
        }
      }
    }

    setGrid(initial);
    setMistakes(0);
    setTimeLeft(getTimeForDifficulty());
    setIsGameOver(false);
  }, [size, boardData]);

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
    // Don't toggle cells that have clues (they are always cave)
    if (boardData.clues[r][c] > 0) return;

    const newGrid = grid.map((row) => [...row]);
    const current = newGrid[r][c];

    // toggle: empty -> wall -> cave -> empty
    if (current === 'empty') newGrid[r][c] = 'wall';
    else if (current === 'wall') newGrid[r][c] = 'cave';
    else newGrid[r][c] = 'empty';

    setGrid(newGrid);
    checkWinCondition(newGrid);
  };

  const handleRightClick = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (isGameOver || showRules) return;
    if (boardData.clues[r][c] > 0) return;

    const newGrid = grid.map((row) => [...row]);
    const current = newGrid[r][c];

    // toggle reverse: empty -> cave -> wall -> empty
    if (current === 'empty') newGrid[r][c] = 'cave';
    else if (current === 'cave') newGrid[r][c] = 'wall';
    else newGrid[r][c] = 'empty';

    setGrid(newGrid);
    checkWinCondition(newGrid);
  };

  const checkWinCondition = (currentGrid: CellState[][]) => {
    let isFull = true;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentGrid[r][c] === 'empty') {
          isFull = false;
          break;
        }
      }
      if (!isFull) break;
    }

    if (!isFull) return;

    let isValid = true;

    // Rule 1: All cave (white) cells must be orthogonally connected
    let firstCave: { r: number; c: number } | null = null;
    let caveCount = 0;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentGrid[r][c] === 'cave') {
          caveCount++;
          if (!firstCave) firstCave = { r, c };
        }
      }
    }

    if (caveCount === 0) isValid = false;
    else {
      const visited = Array(size)
        .fill(false)
        .map(() => Array(size).fill(false));
      const q = [firstCave!];
      visited[firstCave!.r][firstCave!.c] = true;
      let visitedCaveCount = 0;

      while (q.length > 0) {
        const { r, c } = q.shift()!;
        visitedCaveCount++;

        const neighbors = [
          { r: r - 1, c },
          { r: r + 1, c },
          { r, c: c - 1 },
          { r, c: c + 1 },
        ];

        for (const n of neighbors) {
          if (n.r >= 0 && n.r < size && n.c >= 0 && n.c < size) {
            if (currentGrid[n.r][n.c] === 'cave' && !visited[n.r][n.c]) {
              visited[n.r][n.c] = true;
              q.push(n);
            }
          }
        }
      }

      if (visitedCaveCount !== caveCount) isValid = false;
    }

    // Rule 2: Wall (black) cells must not enclose enclosed areas (must connect to grid edge)
    // To check: Any wall cell must be able to reach edge via wall cells or be on the edge itself.
    if (isValid) {
      const wallVisited = Array(size)
        .fill(false)
        .map(() => Array(size).fill(false));

      const checkWallReachEdge = (startR: number, startC: number): boolean => {
        const q = [{ r: startR, c: startC }];
        const currentVisited = Array(size)
          .fill(false)
          .map(() => Array(size).fill(false));
        currentVisited[startR][startC] = true;
        let reachesEdge = false;
        const compWalls: { r: number; c: number }[] = [];

        while (q.length > 0) {
          const { r, c } = q.shift()!;
          compWalls.push({ r, c });
          wallVisited[r][c] = true;

          if (r === 0 || r === size - 1 || c === 0 || c === size - 1) {
            reachesEdge = true;
          }

          const neighbors = [
            { r: r - 1, c: c - 1 },
            { r: r - 1, c },
            { r: r - 1, c: c + 1 },
            { r, c: c - 1 },
            { r, c: c + 1 },
            { r: r + 1, c: c - 1 },
            { r: r + 1, c },
            { r: r + 1, c: c + 1 },
          ]; // Wall cells are connected orthogonally AND diagonally! (Corral rule) Wait, no.
          // The rule says: All wall cells must be connected orthogonally to the edge?
          // Actually, Corral (Bag) standard rule: All cells outside the loop must be connected to the edge orthogonally. Or the loop cannot touch itself.
          // Wait, in standard Corral, the loop must be a single closed non-intersecting loop. This equates to: walls form a single connected orthogonal network touching edge, AND no 2x2 of walls?
          // Let's use orthogonal wall connection to edge.
          const orthNeighbors = [
            { r: r - 1, c },
            { r: r + 1, c },
            { r, c: c - 1 },
            { r, c: c + 1 },
          ];

          for (const n of orthNeighbors) {
            if (n.r >= 0 && n.r < size && n.c >= 0 && n.c < size) {
              if (currentGrid[n.r][n.c] === 'wall' && !currentVisited[n.r][n.c]) {
                currentVisited[n.r][n.c] = true;
                q.push(n);
              }
            }
          }
        }
        return reachesEdge;
      };

      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (currentGrid[r][c] === 'wall' && !wallVisited[r][c]) {
            if (!checkWallReachEdge(r, c)) {
              isValid = false;
              break;
            }
          }
        }
        if (!isValid) break;
      }
    }

    // Rule 3: Clue numbers
    if (isValid) {
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const clue = boardData.clues[r][c];
          if (clue > 0) {
            let count = 1; // self

            // look left
            for (let i = c - 1; i >= 0; i--) {
              if (currentGrid[r][i] === 'cave') count++;
              else break;
            }
            // look right
            for (let i = c + 1; i < size; i++) {
              if (currentGrid[r][i] === 'cave') count++;
              else break;
            }
            // look up
            for (let i = r - 1; i >= 0; i--) {
              if (currentGrid[i][c] === 'cave') count++;
              else break;
            }
            // look down
            for (let i = r + 1; i < size; i++) {
              if (currentGrid[i][c] === 'cave') count++;
              else break;
            }

            if (count !== clue) {
              isValid = false;
              break;
            }
          }
        }
        if (!isValid) break;
      }
    }

    if (isValid) {
      handleGameOver(true);
    } else {
      setMistakes((m) => {
        const ms = m + 1;
        if (ms >= maxMistakes) {
          handleGameOver(false);
        }
        return ms;
      });
    }
  };

  const getRaycastFeedback = (r: number, c: number) => {
    const clue = boardData.clues[r][c];
    if (clue === 0) return null;

    let count = 1;
    // left
    for (let i = c - 1; i >= 0; i--) {
      if (grid[r][i] === 'cave') count++;
      else if (grid[r][i] === 'wall') break;
    }
    // right
    for (let i = c + 1; i < size; i++) {
      if (grid[r][i] === 'cave') count++;
      else if (grid[r][i] === 'wall') break;
    }
    // up
    for (let i = r - 1; i >= 0; i--) {
      if (grid[i][c] === 'cave') count++;
      else if (grid[i][c] === 'wall') break;
    }
    // down
    for (let i = r + 1; i < size; i++) {
      if (grid[i][c] === 'cave') count++;
      else if (grid[i][c] === 'wall') break;
    }

    if (count > clue) return 'over';
    if (count === clue) return 'exact';
    return 'under'; // under or not fully blocked yet
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-slate-800 font-sans selection:bg-amber-500/30">
      {showRules && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
          <div className="bg-slate-800 p-8 rounded-3xl max-w-lg w-full shadow-2xl border border-white/10 bounce-in">
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <span className="text-4xl text-amber-500">🦇</span> Cave Puzzle
            </h2>
            <ul className="space-y-4 mb-8 text-slate-300 text-lg">
              <li className="flex gap-3">
                <span>🔦</span>
                <div>
                  Maden karanlıklarla dolu. Amacın, birbiriyle bağlantılı, tek parça bir **aydınlık
                  mağara** bölgesi oluşturmak (Beyaz hücreler).
                </div>
              </li>
              <li className="flex gap-3 text-amber-400 font-bold">
                <span>🔢</span>
                <div>
                  Sayılar, o hücreden sağa, sola, yukarı ve aşağıya doğru (karanlık duvara çarpana
                  kadar) görülebilen toplam **aydınlık hücre sayısını** (kendi dahil) belirtir.
                </div>
              </li>
              <li className="flex gap-3 text-rose-400">
                <span>🚫</span>
                <div>
                  Karanlık (Siyah) hücre grupları dışarı çıkacak bir **yola (tahta kenarına temas)**
                  sahip olmalıdır. (Tam kapalı bir duvar halkası oluşamaz).
                </div>
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full py-4 rounded-xl font-black text-xl transition-all bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-500/30 active:scale-95"
            >
              ANLADIM, BAŞLA!
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl px-4 py-6 md:py-12 flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-12 bg-slate-800/50 p-4 md:p-6 rounded-3xl border border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={onExit}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all font-bold text-white relative z-50"
            >
              ⬅ Geri Dön
            </button>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600 tracking-wider">
                Cave
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
                className={`text-xl md:text-2xl font-black font-mono ${timeLeft < 60 ? 'text-rose-400 animate-pulse' : 'text-amber-300'}`}
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

        <div className="bg-slate-700 p-2 sm:p-4 rounded-2xl shadow-xl border-4 border-slate-600">
          <div
            className="flex flex-col bg-slate-800 rounded-lg overflow-hidden border-2 border-slate-800"
            style={{ width: 'fit-content' }}
          >
            {grid.map((row, r) => (
              <div key={r} className="flex">
                {row.map((cell, c) => {
                  const clue = boardData.clues[r][c];
                  const fb = getRaycastFeedback(r, c);

                  return (
                    <button
                      key={`${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      onContextMenu={(e) => handleRightClick(e, r, c)}
                      className={`w-12 h-12 sm:w-16 sm:h-16 border border-slate-700/50 flex items-center justify-center font-black text-2xl transition-colors duration-150 outline-none
                                                ${cell === 'empty' ? 'bg-slate-600 hover:bg-slate-500' : ''}
                                                ${cell === 'wall' ? 'bg-slate-950 shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)]' : ''}
                                                ${cell === 'cave' ? 'bg-amber-50 shadow-[0_0_15px_rgba(254,243,199,0.3)]' : ''}
                                                ${clue > 0 ? 'cursor-default' : 'cursor-pointer'}
                                            `}
                    >
                      {clue > 0 && (
                        <span
                          className={`
                                                    ${fb === 'over' ? 'text-rose-500 drop-shadow-md' : ''}
                                                    ${fb === 'exact' ? 'text-emerald-500 drop-shadow-md' : ''}
                                                    ${fb === 'under' ? 'text-amber-900 border-b-2 border-dashed border-amber-900/30' : ''}
                                                `}
                        >
                          {clue}
                        </span>
                      )}
                      {clue === 0 && cell === 'wall' && (
                        <span className="text-slate-800/20 text-xs">⬛</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center bg-slate-800/50 p-4 rounded-2xl border border-white/5 max-w-sm mx-auto shadow-lg">
          <p className="text-slate-400 text-sm font-medium">
            Duvar (Siyah) için{' '}
            <span className="text-white font-bold cursor-pointer hover:text-amber-400">Tıkla</span>,
            Mağara (Beyaz) için tekrar tıkla.
          </p>
        </div>
      </div>

      {/* Game Over Overlay */}
      {isGameOver && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-slate-800 p-8 md:p-12 rounded-[2rem] max-w-md w-full text-center shadow-2xl border border-white/10 bounce-in">
            <div className="text-6xl md:text-8xl mb-6">
              {mistakes >= maxMistakes || timeLeft <= 0 ? '💥' : '🦇'}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              {mistakes >= maxMistakes
                ? 'Mağara Çöktü!'
                : timeLeft <= 0
                  ? 'Fener Söndü!'
                  : 'Güvenli Çıkış!'}
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              {mistakes >= maxMistakes
                ? 'Mağara kuralları ihlal edildi.'
                : timeLeft <= 0
                  ? 'Karanlıkta fazla kaldın.'
                  : `Mükemmel bir harita çıkardın! Kazanılan Yıldız: ${score}`}
            </p>

            <div className="flex flex-col gap-3">
              {mistakes < maxMistakes && timeLeft > 0 && (
                <button
                  onClick={() => onComplete(score)}
                  className="w-full py-4 rounded-2xl font-black text-xl transition-all bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-white shadow-lg active:scale-95 text-transparent bg-clip-text text-white"
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

export default CaveGame;

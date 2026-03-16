import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';

interface Props {
  difficulty: Difficulty;
  grade: number;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface ThermoPath {
  id: number;
  cells: { r: number; c: number }[];
}

interface Cell {
  row: number;
  col: number;
  value: number | null;
  isInitial: boolean;
  hasError: boolean;
  thermoId: number | null;
  thermoIndex: number; // 0 means bulb (start), > 0 means along the line
}

const ThermoSudokuGame: React.FC<Props> = ({ difficulty, onComplete, onExit }) => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [thermos, setThermos] = useState<ThermoPath[]>([]);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [isWon, setIsWon] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const [isGenerating, setIsGenerating] = useState(true);

  const generatePuzzle = useCallback(() => {
    setIsGenerating(true);

    setTimeout(() => {
      const board = Array(9)
        .fill(0)
        .map(() => Array(9).fill(0));

      const isValid = (r: number, c: number, num: number) => {
        for (let i = 0; i < 9; i++) {
          if (board[r][i] === num) return false;
          if (board[i][c] === num) return false;
        }
        const br = Math.floor(r / 3) * 3;
        const bc = Math.floor(c / 3) * 3;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[br + i][bc + j] === num) return false;
          }
        }
        return true;
      };

      const solve = (r: number, c: number): boolean => {
        if (r === 9) return true;
        if (c === 9) return solve(r + 1, 0);

        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
        for (const num of nums) {
          if (isValid(r, c, num)) {
            board[r][c] = num;
            if (solve(r, c + 1)) return true;
            board[r][c] = 0;
          }
        }
        return false;
      };

      solve(0, 0);

      // Now we have a full valid Sudoku board.
      // Let's generate Thermometers!
      // A thermometer requires the numbers to be strictly increasing.
      // So we just find random strictly increasing walks of length 3 to 6 on the generated board.

      const generatedThermos: ThermoPath[] = [];
      const usedInThermo = Array(9)
        .fill(false)
        .map(() => Array(9).fill(false));
      let thermoCount = 0;

      // Try to generate 4 to 8 thermometers based on difficulty
      const targetThermos =
        difficulty === Difficulty.VERY_EASY
          ? 8
          : difficulty === Difficulty.EASY
            ? 6
            : difficulty === Difficulty.MEDIUM
              ? 5
              : 4;

      // Try random starting points
      for (let attempt = 0; attempt < 100 && thermoCount < targetThermos; attempt++) {
        const r = Math.floor(Math.random() * 9);
        const c = Math.floor(Math.random() * 9);

        if (usedInThermo[r][c]) continue;
        if (board[r][c] > 5) continue; // It's hard to grow a thermo if it starts too high

        const path = [{ r, c }];
        let currentVal = board[r][c];
        const targetLength = Math.floor(Math.random() * 3) + 3; // 3 to 5 cells long

        while (path.length < targetLength) {
          const last = path[path.length - 1];
          // Orthogonal and diagonal neighbors
          const neighbors = [
            { r: last.r - 1, c: last.c },
            { r: last.r + 1, c: last.c },
            { r: last.r, c: last.c - 1 },
            { r: last.r, c: last.c + 1 },
            { r: last.r - 1, c: last.c - 1 },
            { r: last.r + 1, c: last.c + 1 },
            { r: last.r - 1, c: last.c + 1 },
            { r: last.r + 1, c: last.c - 1 },
          ].filter(
            (n) =>
              n.r >= 0 &&
              n.r < 9 &&
              n.c >= 0 &&
              n.c < 9 &&
              !usedInThermo[n.r][n.c] &&
              !path.some((p) => p.r === n.r && p.c === n.c) &&
              board[n.r][n.c] > currentVal
          ); // Must strictly increase!

          if (neighbors.length === 0) break; // Dead end

          // Pick a random valid strictly increasing neighbor
          const next = neighbors[Math.floor(Math.random() * neighbors.length)];
          path.push(next);
          currentVal = board[next.r][next.c];
        }

        if (path.length >= 2) {
          generatedThermos.push({ id: thermoCount, cells: path });
          path.forEach((p) => (usedInThermo[p.r][p.c] = true));
          thermoCount++;
        }
      }

      setThermos(generatedThermos);

      // Now we remove some numbers. For Thermo Sudoku, the paths themselves are clues,
      // so we can afford to remove more numbers than standard Sudoku!
      let removeCount = 50;
      if (difficulty === Difficulty.VERY_EASY) removeCount = 40;
      else if (difficulty === Difficulty.EASY) removeCount = 52;
      else if (difficulty === Difficulty.MEDIUM) removeCount = 60;
      else if (difficulty === Difficulty.HARD) removeCount = 68;
      else if (difficulty === Difficulty.VERY_HARD) removeCount = 74;

      let removed = 0;
      while (removed < removeCount) {
        const r = Math.floor(Math.random() * 9);
        const c = Math.floor(Math.random() * 9);
        if (board[r][c] !== 0) {
          board[r][c] = 0;
          removed++;
        }
      }

      const newGrid = board.map((row, r) =>
        row.map((val, c) => {
          let tId: number | null = null;
          let tIndex = -1;

          generatedThermos.forEach((t) => {
            const idx = t.cells.findIndex((cell) => cell.r === r && cell.c === c);
            if (idx !== -1) {
              tId = t.id;
              tIndex = idx;
            }
          });

          return {
            row: r,
            col: c,
            value: val !== 0 ? val : null,
            isInitial: val !== 0,
            hasError: false,
            thermoId: tId,
            thermoIndex: tIndex,
          };
        })
      );

      setGrid(newGrid);
      setIsWon(false);
      setSelectedCell(null);
      setIsGenerating(false);
    }, 50);
  }, [difficulty]);

  useEffect(() => {
    generatePuzzle();
  }, [generatePuzzle]);

  const handleCellClick = (r: number, c: number) => {
    if (isWon || grid[r][c].isInitial) return;
    setSelectedCell({ r, c });
  };

  const handleNumInput = (num: number | null) => {
    if (!selectedCell || isWon) return;
    const { r, c } = selectedCell;

    setGrid((prev) => {
      const next = prev.map((row) => row.map((cell) => ({ ...cell, hasError: false })));
      next[r][c].value = num;

      let anyError = false;
      let filled = 0;

      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const val = next[i][j].value;
          if (val === null) continue;
          filled++;

          for (let k = 0; k < 9; k++) {
            if (k !== j && next[i][k].value === val) {
              next[i][j].hasError = true;
              next[i][k].hasError = true;
              anyError = true;
            }
            if (k !== i && next[k][j].value === val) {
              next[i][j].hasError = true;
              next[k][j].hasError = true;
              anyError = true;
            }
          }
          const br = Math.floor(i / 3) * 3;
          const bc = Math.floor(j / 3) * 3;
          for (let ii = 0; ii < 3; ii++) {
            for (let jj = 0; jj < 3; jj++) {
              if ((br + ii !== i || bc + jj !== j) && next[br + ii][bc + jj].value === val) {
                next[i][j].hasError = true;
                next[br + ii][bc + jj].hasError = true;
                anyError = true;
              }
            }
          }
        }
      }

      // Thermo Check: Strictly Increasing!
      thermos.forEach((t) => {
        let prevVal = -1;
        t.cells.forEach((cell) => {
          const val = next[cell.r][cell.c].value;
          // If a cell is filled, check if it's strictly greater than previous
          if (val !== null) {
            if (prevVal !== -1 && val <= prevVal) {
              next[cell.r][cell.c].hasError = true;
              anyError = true;
            }
            prevVal = val;
          } else {
            // If there's a gap, we just skip updating prevVal to avoid false positives?
            // Actually, if there's a gap, we can't strictly check the immediate next, but we know it must be > than ALL prior filled.
            // So we keep prevVal as the HIGHEST known value so far in the thermo.
            // But wait, if bulb=2, gap, tip=1. That's an error.
            // We don't need to over-complicate feedback for empty middle cells,
            // the user will see error when they fill the gap.
          }
        });

        // Accurate global thermo check for half-filled thermos:
        // Every filled cell M must be > every filled cell before it.
        let maxPrior = -1;
        let maxErrorCell: { r: number; c: number } | null = null;

        for (let i = 0; i < t.cells.length; i++) {
          const c = t.cells[i];
          const val = next[c.r][c.c].value;
          if (val !== null) {
            if (val <= maxPrior) {
              next[c.r][c.c].hasError = true;
              anyError = true;
              if (maxErrorCell) next[maxErrorCell.r][maxErrorCell.c].hasError = true;
            } else {
              maxPrior = val;
              maxErrorCell = { r: c.r, c: c.c }; // Keep track of the highest valid cell so far to highlight it if a subsequent cell fails
            }
          }
        }
      });

      if (filled === 81 && !anyError) setIsWon(true);
      return next;
    });
  };

  const getStars = () => {
    switch (difficulty) {
      case Difficulty.EASY:
        return 60;
      case Difficulty.MEDIUM:
        return 100;
      case Difficulty.HARD:
        return 180;
      case Difficulty.VERY_HARD:
        return 300;
      default:
        return 80;
    }
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto w-full">
      <div className="flex justify-between items-center w-full mb-6 relative px-4">
        <button
          onClick={onExit}
          className="px-6 py-2 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 transition-all flex items-center gap-2"
        >
          <span>⬅</span> Çıkış
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 text-center w-max">
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 drop-shadow-lg uppercase tracking-wider">
            Thermo Sudoku
          </h2>
        </div>
        <button
          onClick={() => setShowRules(true)}
          className="p-3 bg-red-500/20 text-red-300 rounded-full hover:bg-red-500/30 transition-all"
        >
          ℹ️ Kurallar
        </button>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-xl p-4 md:p-8 rounded-[40px] shadow-2xl border border-red-500/20 flex flex-col items-center relative overflow-hidden w-full max-w-2xl">
        {showRules && (
          <div className="absolute inset-0 z-50 bg-slate-900/95 p-8 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
            <h3 className="text-3xl font-black mb-6 text-red-400">Nasıl Oynanır?</h3>
            <ul className="text-white/80 space-y-4 text-left max-w-md mb-8">
              <li className="flex items-start gap-3">
                <span className="text-xl">🌡️</span>
                <span>Izgara üzerinde termometre şekilleri bulunmaktadır.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">1️⃣</span>
                <span>Klasik Sudoku kuralları tüm tahtada geçerlidir.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">📈</span>
                <span>
                  Bir termometrenin <b>yuvarlak ampul kestiğinden</b> yukarı (ucuna) doğru
                  gidildikçe rakamlar <b>KESİNLİKLE ARTMALIDIR</b>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">💡</span>
                <span>
                  Örneğin: Ampulde 2 varsa, sonraki kare 3-4-5-6-7-8 veya 9 olabilir. Asla 2 veya 1
                  olamaz! Rakamlar atlayarak artabilir (Örn: 2, 5, 8 geçerlidir).
                </span>
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="bg-gradient-to-r from-red-600 to-red-800 text-white font-black py-4 px-12 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-xl"
            >
              ANLADIM, BAŞLA!
            </button>
          </div>
        )}

        <div className="mb-4 flex justify-between items-center w-full opacity-90">
          <span className="text-white font-bold bg-white/10 px-4 py-2 rounded-xl">
            Ödül: {getStars()} ⭐
          </span>
          {isGenerating && (
            <span className="text-red-400 font-bold animate-pulse">Sıcaklık Ölçülüyor...</span>
          )}
          <button
            onClick={generatePuzzle}
            disabled={isGenerating}
            className="text-white hover:text-red-400 font-bold transition-colors disabled:opacity-50"
          >
            Yeniden Düşman Getir 🔄
          </button>
        </div>

        <div className="grid grid-cols-9 gap-[1px] p-[2px] bg-red-950/80 rounded-xl shadow-[0_0_30px_rgba(248,113,113,0.1)] select-none border-4 border-slate-950 relative">
          {/* We draw the thermometers using an SVG overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            style={{ padding: '2px' }}
          >
            {thermos.map((t) => (
              <g key={t.id}>
                {/* Bulb */}
                <circle
                  cx={`${(t.cells[0].c + 0.5) * (100 / 9)}%`}
                  cy={`${(t.cells[0].r + 0.5) * (100 / 9)}%`}
                  r="3.5%"
                  fill="rgba(239, 68, 68, 0.4)"
                />
                {/* Body / Line */}
                {t.cells.map((cell, idx) => {
                  if (idx === 0) return null;
                  const prev = t.cells[idx - 1];
                  return (
                    <line
                      key={`${cell.r}-${cell.c}-${idx}`}
                      x1={`${(prev.c + 0.5) * (100 / 9)}%`}
                      y1={`${(prev.r + 0.5) * (100 / 9)}%`}
                      x2={`${(cell.c + 0.5) * (100 / 9)}%`}
                      y2={`${(cell.r + 0.5) * (100 / 9)}%`}
                      stroke="rgba(239, 68, 68, 0.4)"
                      strokeWidth="20"
                      strokeLinecap="round"
                    />
                  );
                })}
              </g>
            ))}
          </svg>

          {!isGenerating &&
            grid.map((row, r) =>
              row.map((cell, c) => {
                const blkR = Math.floor(r / 3);
                const blkC = Math.floor(c / 3);
                const isDarkBox = (blkR + blkC) % 2 === 1;
                const isSelected = selectedCell?.r === r && selectedCell?.c === c;

                const isRelated =
                  selectedCell &&
                  (selectedCell.r === r ||
                    selectedCell.c === c ||
                    (Math.floor(selectedCell.r / 3) === blkR &&
                      Math.floor(selectedCell.c / 3) === blkC));

                const isSameNumber =
                  selectedCell &&
                  grid[selectedCell.r][selectedCell.c].value === cell.value &&
                  cell.value !== null;

                let borders = '';
                if (r % 3 === 0 && r !== 0) borders += 'border-t-[3px] border-slate-950 ';
                if (c % 3 === 0 && c !== 0) borders += 'border-l-[3px] border-slate-950 ';

                return (
                  <div
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-lg sm:text-xl md:text-2xl font-black transition-all cursor-pointer relative z-20 
                    ${isDarkBox ? 'bg-slate-800' : 'bg-slate-700'}
                    ${borders}
                    ${cell.hasError ? 'bg-red-600/90 text-white animate-pulse' : ''}
                    ${isSelected ? 'bg-amber-400 text-slate-900 scale-110 shadow-lg rounded-md ring-2 ring-white' : ''}
                    ${!isSelected && isSameNumber ? 'bg-slate-500/80 text-white' : ''}
                    ${!isSelected && !isSameNumber && isRelated ? 'brightness-125' : ''}
                    ${cell.isInitial ? 'text-white/90 cursor-default' : 'text-slate-200'}
                  `}
                  >
                    {cell.value || ''}
                  </div>
                );
              })
            )}
        </div>

        {/* Number Pad */}
        <div className="mt-8 grid grid-cols-5 md:grid-cols-10 gap-2 w-full max-w-lg">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumInput(num)}
              className="bg-white/10 hover:bg-white/20 text-white font-black text-xl py-3 rounded-xl transition-all shadow-md hover:scale-105 active:scale-95"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleNumInput(null)}
            className="bg-red-500/20 hover:bg-red-500/40 text-red-100 font-bold text-sm rounded-xl py-3 transition-all flex items-center justify-center"
          >
            SİL
          </button>
        </div>

        {isWon && (
          <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/70 backdrop-blur-sm rounded-[40px] animate-in fade-in zoom-in duration-500">
            <div className="bg-gradient-to-b from-red-600 to-red-900 p-8 rounded-[32px] text-center shadow-[0_0_50px_rgba(248,113,113,0.5)] scale-110 border-4 border-white">
              <div className="text-6xl mb-4 animate-bounce">🌡️</div>
              <h3 className="text-4xl font-black text-white mb-2 drop-shadow-lg">
                Ateşin Yükseldi!
              </h3>
              <p className="text-red-200 font-bold mb-4">Mükemmel çözüm!</p>
              <button
                onClick={() => onComplete(getStars())}
                className="bg-white text-red-900 px-8 py-4 mt-2 rounded-full font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all w-full"
              >
                +{getStars()} ⭐ KAZAN
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThermoSudokuGame;

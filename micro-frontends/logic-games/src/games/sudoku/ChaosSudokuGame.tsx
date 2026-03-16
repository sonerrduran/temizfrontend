import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../types';

interface Props {
  difficulty: Difficulty;
  grade: number;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface Cell {
  row: number;
  col: number;
  value: number | null;
  isInitial: boolean;
  hasError: boolean;
  regionId: number;
}

const ChaosSudokuGame: React.FC<Props> = ({ difficulty, onComplete, onExit }) => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [isWon, setIsWon] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const [isGenerating, setIsGenerating] = useState(true);

  // Colors for the 9 regions
  const regionColors = [
    'bg-rose-900/40',
    'bg-blue-900/40',
    'bg-emerald-900/40',
    'bg-amber-900/40',
    'bg-fuchsia-900/40',
    'bg-cyan-900/40',
    'bg-indigo-900/40',
    'bg-lime-900/40',
    'bg-orange-900/40',
  ];

  const generatePuzzle = useCallback(() => {
    setIsGenerating(true);

    setTimeout(() => {
      let mask: number[][] = [];
      let maskSuccess = false;

      // 1. Generate regions (Chaos shapes)
      while (!maskSuccess) {
        mask = Array(9)
          .fill(0)
          .map(() => Array(9).fill(-1));
        const sizes = Array(9).fill(0);

        // Pick 9 random distinct starting points
        const starts: { r: number; c: number }[] = [];
        while (starts.length < 9) {
          const r = Math.floor(Math.random() * 9);
          const c = Math.floor(Math.random() * 9);
          if (!starts.some((s) => s.r === r && s.c === c)) {
            starts.push({ r, c });
          }
        }

        starts.forEach((s, idx) => {
          mask[s.r][s.c] = idx;
          sizes[idx] = 1;
        });

        const activeRegions = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]);
        let stuck = false;

        while (activeRegions.size > 0 && !stuck) {
          for (const regionId of Array.from(activeRegions)) {
            if (sizes[regionId] === 9) {
              activeRegions.delete(regionId);
              continue;
            }

            // Find all empty neighbors of this region
            const neighbors: { r: number; c: number }[] = [];
            for (let r = 0; r < 9; r++) {
              for (let c = 0; c < 9; c++) {
                if (mask[r][c] === regionId) {
                  const ns = [
                    { r: r - 1, c },
                    { r: r + 1, c },
                    { r, c: c - 1 },
                    { r, c: c + 1 },
                  ].filter(
                    (n) => n.r >= 0 && n.r < 9 && n.c >= 0 && n.c < 9 && mask[n.r][n.c] === -1
                  );
                  neighbors.push(...ns);
                }
              }
            }

            if (neighbors.length === 0) {
              stuck = true;
              break;
            }

            // Pick random neighbor, assign it
            const next = neighbors[Math.floor(Math.random() * neighbors.length)];
            // Ensure we don't accidentally pick the same coordinate twice if it was pushed multiple times
            if (mask[next.r][next.c] === -1) {
              mask[next.r][next.c] = regionId;
              sizes[regionId]++;
            }
          }
        }

        // Validate if all 81 filled and all sizes == 9
        if (!stuck) {
          let all9 = true;
          for (let s of sizes) if (s !== 9) all9 = false;
          if (all9) {
            maskSuccess = true;
          }
        }
      }

      // 2. Generate Sudoku Numbers using the mask
      const board = Array(9)
        .fill(0)
        .map(() => Array(9).fill(0));

      const isValid = (r: number, c: number, num: number) => {
        for (let i = 0; i < 9; i++) {
          if (board[r][i] === num) return false;
          if (board[i][c] === num) return false;
        }
        const regionId = mask[r][c];
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (mask[i][j] === regionId && board[i][j] === num) return false;
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

      // 3. Remove numbers based on difficulty
      let removeCount = 40;
      if (difficulty === Difficulty.VERY_EASY) removeCount = 30;
      else if (difficulty === Difficulty.EASY) removeCount = 42;
      else if (difficulty === Difficulty.MEDIUM) removeCount = 50;
      else if (difficulty === Difficulty.HARD) removeCount = 58;
      else if (difficulty === Difficulty.VERY_HARD) removeCount = 64;

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
        row.map((val, c) => ({
          row: r,
          col: c,
          value: val !== 0 ? val : null,
          isInitial: val !== 0,
          hasError: false,
          regionId: mask[r][c],
        }))
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
          const regId = next[i][j].regionId;

          for (let k = 0; k < 9; k++) {
            // Row & Col Check
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

          // Region Check
          for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
              if (
                (x !== i || y !== j) &&
                next[x][y].regionId === regId &&
                next[x][y].value === val
              ) {
                next[i][j].hasError = true;
                next[x][y].hasError = true;
                anyError = true;
              }
            }
          }
        }
      }

      if (filled === 81 && !anyError) setIsWon(true);
      return next;
    });
  };

  const getStars = () => {
    switch (difficulty) {
      case Difficulty.EASY:
        return 50;
      case Difficulty.MEDIUM:
        return 80;
      case Difficulty.HARD:
        return 150;
      case Difficulty.VERY_HARD:
        return 200;
      default:
        return 60;
    }
  };

  const getBorders = (r: number, c: number) => {
    let classes = '';
    const cell = grid[r][c];

    // Outer bold border
    if (r === 0) classes += 'border-t-4 border-t-slate-900 ';
    if (c === 0) classes += 'border-l-4 border-l-slate-900 ';
    if (r === 8) classes += 'border-b-4 border-b-slate-900 ';
    if (c === 8) classes += 'border-r-4 border-r-slate-900 ';

    // Region bold borders
    const u = grid[r - 1]?.[c];
    const d = grid[r + 1]?.[c];
    const l = grid[r]?.[c - 1];
    const rgt = grid[r]?.[c + 1];

    if (u && u.regionId !== cell.regionId) classes += 'border-t-4 border-t-slate-900/80 ';
    else if (r !== 0) classes += 'border-t border-t-white/10 ';

    if (d && d.regionId !== cell.regionId) classes += 'border-b-4 border-b-slate-900/80 ';
    else if (r !== 8) classes += 'border-b border-b-white/10 ';

    if (l && l.regionId !== cell.regionId) classes += 'border-l-4 border-l-slate-900/80 ';
    else if (c !== 0) classes += 'border-l border-l-white/10 ';

    if (rgt && rgt.regionId !== cell.regionId) classes += 'border-r-4 border-r-slate-900/80 ';
    else if (c !== 8) classes += 'border-r border-r-white/10 ';

    return classes;
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
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-600 drop-shadow-lg uppercase tracking-wider">
            Chaos Sudoku
          </h2>
        </div>
        <button
          onClick={() => setShowRules(true)}
          className="p-3 bg-fuchsia-500/20 text-fuchsia-300 rounded-full hover:bg-fuchsia-500/30 transition-all"
        >
          ℹ️ Kurallar
        </button>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-xl p-4 md:p-8 rounded-[40px] shadow-2xl border border-fuchsia-500/20 flex flex-col items-center relative overflow-hidden w-full max-w-2xl">
        {showRules && (
          <div className="absolute inset-0 z-50 bg-slate-900/95 p-8 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
            <h3 className="text-3xl font-black mb-6 text-fuchsia-400">Nasıl Oynanır?</h3>
            <ul className="text-white/80 space-y-4 text-left max-w-md mb-8">
              <li className="flex items-start gap-3">
                <span className="text-xl">🌪️</span>
                <span>
                  <b>Chaos Sudoku</b>, Jigsaw (Irregular) Sudoku'nun tam ve en zor 9x9 versiyonudur.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">1️⃣</span>
                <span>
                  Klasik Sudoku'daki 3x3 kare bloklar yerine,{' '}
                  <b>karmaşık şekillere (renklere) sahip düzensiz bölgeler</b> vardır.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">🛑</span>
                <span>
                  Her satırda, sütunda ve <b>her düzensiz kalın çizgili renkli bölgede</b> 1'den 9'a
                  rakamlar tam olarak birer kez bulunmalıdır!
                </span>
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="bg-gradient-to-r from-fuchsia-600 to-purple-800 text-white font-black py-4 px-12 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-xl"
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
            <span className="text-purple-400 font-bold animate-pulse">Kaos Düzenleniyor...</span>
          )}
          <button
            onClick={generatePuzzle}
            disabled={isGenerating}
            className="text-white hover:text-fuchsia-400 font-bold transition-colors disabled:opacity-50"
          >
            Yeniden 🔄
          </button>
        </div>

        <div className="grid grid-cols-9 bg-slate-800 rounded-xl shadow-[0_0_30px_rgba(192,38,211,0.2)] select-none overflow-hidden">
          {!isGenerating &&
            grid.map((row, r) =>
              row.map((cell, c) => {
                const isSelected = selectedCell?.r === r && selectedCell?.c === c;

                const isRelated =
                  selectedCell &&
                  (selectedCell.r === r ||
                    selectedCell.c === c ||
                    grid[selectedCell.r][selectedCell.c].regionId === cell.regionId);

                const isSameNumber =
                  selectedCell &&
                  grid[selectedCell.r][selectedCell.c].value === cell.value &&
                  cell.value !== null;

                const borders = getBorders(r, c);
                const bgRegColor = regionColors[cell.regionId];

                return (
                  <div
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-lg sm:text-xl md:text-2xl font-black transition-all cursor-pointer relative box-border
                    ${bgRegColor}
                    ${borders}
                    ${cell.hasError ? 'bg-red-500/80 text-white animate-pulse' : ''}
                    ${isSelected ? 'bg-fuchsia-500 text-white z-20 scale-110 shadow-lg rounded-md ring-2 ring-white' : ''}
                    ${!isSelected && isSameNumber ? 'brightness-150 saturate-200 text-white ring-1 ring-white/50 z-10' : ''}
                    ${!isSelected && !isSameNumber && isRelated ? 'brightness-125' : ''}
                    ${cell.isInitial ? 'text-white/90 cursor-default' : 'text-fuchsia-200'}
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
            className="bg-red-500/20 hover:bg-red-500/40 text-red-200 font-bold text-sm rounded-xl py-3 transition-all flex items-center justify-center"
          >
            SİL
          </button>
        </div>

        {isWon && (
          <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/70 backdrop-blur-sm rounded-[40px] animate-in fade-in zoom-in duration-500">
            <div className="bg-gradient-to-b from-fuchsia-600 to-purple-900 p-8 rounded-[32px] text-center shadow-[0_0_50px_rgba(192,38,211,0.5)] scale-110 border-4 border-white">
              <div className="text-6xl mb-4 animate-bounce">🌪️</div>
              <h3 className="text-4xl font-black text-white mb-2 drop-shadow-lg">MÜKEMMEL!</h3>
              <p className="text-fuchsia-200 font-bold mb-4">Kaosu düzene soktun!</p>
              <button
                onClick={() => onComplete(getStars())}
                className="bg-white text-purple-900 px-8 py-4 mt-2 rounded-full font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all w-full"
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

export default ChaosSudokuGame;

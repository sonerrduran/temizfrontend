import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';

interface Props {
  difficulty: Difficulty;
  grade: number;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface Cell {
  r: number;
  c: number;
  value: number | null;
  solution: number;
  isInitial: boolean;
  isActive: boolean;
  hasError: boolean;
  gridId: number[];
  cageId: number;
  cageSum: number | null; // Only the top-left cell of a cage holds the sum label
}

// 5 grids of Samurai
const grids = [
  { id: 0, rOffset: 0, cOffset: 0 },
  { id: 1, rOffset: 0, cOffset: 12 },
  { id: 2, rOffset: 6, cOffset: 6 },
  { id: 3, rOffset: 12, cOffset: 0 },
  { id: 4, rOffset: 12, cOffset: 12 },
];

const SamuraiKillerSudokuGame: React.FC<Props> = ({ difficulty, onComplete, onExit }) => {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [isWon, setIsWon] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const [isGenerating, setIsGenerating] = useState(true);

  // Array of colors for cages
  const cageColors = [
    'bg-red-900/40',
    'bg-blue-900/40',
    'bg-green-900/40',
    'bg-yellow-900/40',
    'bg-purple-900/40',
    'bg-pink-900/40',
    'bg-orange-900/40',
    'bg-teal-900/40',
    'bg-emerald-900/40',
  ];

  const generatePuzzle = useCallback(() => {
    setIsGenerating(true);

    setTimeout(() => {
      let rawBoard: number[][] = Array(21)
        .fill(0)
        .map(() => Array(21).fill(0));
      let success = false;

      while (!success) {
        rawBoard = Array(21)
          .fill(0)
          .map(() => Array(21).fill(0));

        const isValid = (r: number, c: number, num: number, rOffset: number, cOffset: number) => {
          for (let i = 0; i < 9; i++) if (rawBoard[rOffset + r][cOffset + i] === num) return false;
          for (let i = 0; i < 9; i++) if (rawBoard[rOffset + i][cOffset + c] === num) return false;
          const boxR = Math.floor(r / 3) * 3;
          const boxC = Math.floor(c / 3) * 3;
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (rawBoard[rOffset + boxR + i][cOffset + boxC + j] === num) return false;
            }
          }
          return true;
        };

        const solveGrid = (rOffset: number, cOffset: number): boolean => {
          for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
              if (rawBoard[rOffset + r][cOffset + c] === 0) {
                const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
                for (const num of nums) {
                  if (isValid(r, c, num, rOffset, cOffset)) {
                    rawBoard[rOffset + r][cOffset + c] = num;
                    if (solveGrid(rOffset, cOffset)) return true;
                    rawBoard[rOffset + r][cOffset + c] = 0;
                  }
                }
                return false;
              }
            }
          }
          return true;
        };

        // Solve Center first, then Corners
        success =
          solveGrid(6, 6) &&
          solveGrid(0, 0) &&
          solveGrid(0, 12) &&
          solveGrid(12, 0) &&
          solveGrid(12, 12);
      }

      // Group cells into Cages
      const cageMap: number[][] = Array(21)
        .fill(0)
        .map(() => Array(21).fill(-1));
      const sums: Record<number, number> = {};
      const tops: Record<number, { r: number; c: number }> = {};
      let currentCageId = 0;

      const isActiveCell = (r: number, c: number) => {
        if (r < 0 || r >= 21 || c < 0 || c >= 21) return false;
        return grids.some(
          (g) => r >= g.rOffset && r < g.rOffset + 9 && c >= g.cOffset && c < g.cOffset + 9
        );
      };

      for (let r = 0; r < 21; r++) {
        for (let c = 0; c < 21; c++) {
          if (isActiveCell(r, c) && cageMap[r][c] === -1) {
            // Start a new cage
            const targetSize = Math.floor(Math.random() * 4) + 2; // 2 to 5 cells
            const cageCells = [{ r, c }];
            cageMap[r][c] = currentCageId;
            let currentSum = rawBoard[r][c];

            // Random walk to expand cage
            for (let i = 1; i < targetSize; i++) {
              const last = cageCells[cageCells.length - 1];
              const neighbors = [
                { r: last.r - 1, c: last.c },
                { r: last.r + 1, c: last.c },
                { r: last.r, c: last.c - 1 },
                { r: last.r, c: last.c + 1 },
              ].filter((n) => isActiveCell(n.r, n.c) && cageMap[n.r][n.c] === -1);

              if (neighbors.length > 0) {
                // Ensure no repeating numbers inside a cage (Killer Sudoku rule)
                const validNeighbors = neighbors.filter((n) => {
                  const val = rawBoard[n.r][n.c];
                  return !cageCells.some((cc) => rawBoard[cc.r][cc.c] === val);
                });

                if (validNeighbors.length > 0) {
                  const next = validNeighbors[Math.floor(Math.random() * validNeighbors.length)];
                  cageCells.push(next);
                  cageMap[next.r][next.c] = currentCageId;
                  currentSum += rawBoard[next.r][next.c];
                } else break;
              } else break;
            }

            sums[currentCageId] = currentSum;

            // Find top-left most cell of this cage
            cageCells.sort((a, b) => {
              if (a.r !== b.r) return a.r - b.r;
              return a.c - b.c;
            });
            tops[currentCageId] = cageCells[0];

            currentCageId++;
          }
        }
      }

      // Hide numbers based on difficulty.
      // Traditional Killer Sudoku has ALL numbers hidden. For easier levels, we reveal some.
      let revealChance = 0;
      if (difficulty === Difficulty.VERY_EASY) revealChance = 0.4;
      else if (difficulty === Difficulty.EASY) revealChance = 0.2;
      else if (difficulty === Difficulty.MEDIUM) revealChance = 0.05;
      // HARD and VERY_HARD = 0% reveal (pure killer)

      const newBoard: Cell[][] = Array(21)
        .fill(0)
        .map((_, r) =>
          Array(21)
            .fill(0)
            .map((_, c) => {
              let isActive = false;
              const gridIds: number[] = [];

              grids.forEach((g) => {
                if (r >= g.rOffset && r < g.rOffset + 9 && c >= g.cOffset && c < g.cOffset + 9) {
                  isActive = true;
                  gridIds.push(g.id);
                }
              });

              const cid = cageMap[r][c];
              const isTopLeft = cid !== -1 && tops[cid].r === r && tops[cid].c === c;
              const isInitial = isActive && Math.random() < revealChance;

              return {
                r,
                c,
                value: isInitial ? rawBoard[r][c] : null,
                solution: rawBoard[r][c],
                isInitial,
                isActive,
                hasError: false,
                gridId: gridIds,
                cageId: cid,
                cageSum: isTopLeft ? sums[cid] : null,
              };
            })
        );

      setBoard(newBoard);
      setIsWon(false);
      setSelectedCell(null);
      setIsGenerating(false);
    }, 150); // slight delay for UI updating
  }, [difficulty]);

  useEffect(() => {
    generatePuzzle();
  }, [generatePuzzle]);

  const handleCellClick = (r: number, c: number) => {
    if (isWon || !board[r][c].isActive || board[r][c].isInitial) return;
    setSelectedCell({ r, c });
  };

  const validateBoard = (currentBoard: Cell[][]) => {
    // Reset errors
    currentBoard.forEach((row) => row.forEach((cell) => (cell.hasError = false)));
    let anyError = false;
    let allFilled = true;

    // Standard Samurai validation
    grids.forEach((g) => {
      // row
      for (let r = 0; r < 9; r++) {
        const rowMap: any = {};
        for (let c = 0; c < 9; c++) {
          const cell = currentBoard[g.rOffset + r][g.cOffset + c];
          if (cell.value === null) {
            allFilled = false;
            continue;
          }
          if (rowMap[cell.value]) {
            cell.hasError = true;
            rowMap[cell.value].hasError = true;
            anyError = true;
          } else rowMap[cell.value] = cell;
        }
      }
      // col
      for (let c = 0; c < 9; c++) {
        const colMap: any = {};
        for (let r = 0; r < 9; r++) {
          const cell = currentBoard[g.rOffset + r][g.cOffset + c];
          if (cell.value === null) continue;
          if (colMap[cell.value]) {
            cell.hasError = true;
            colMap[cell.value].hasError = true;
            anyError = true;
          } else colMap[cell.value] = cell;
        }
      }
      // 3x3 box
      for (let br = 0; br < 3; br++) {
        for (let bc = 0; bc < 3; bc++) {
          const boxMap: any = {};
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              const cell = currentBoard[g.rOffset + br * 3 + i][g.cOffset + bc * 3 + j];
              if (cell.value === null) continue;
              if (boxMap[cell.value]) {
                cell.hasError = true;
                boxMap[cell.value].hasError = true;
                anyError = true;
              } else boxMap[cell.value] = cell;
            }
          }
        }
      }
    });

    // Killer Cage Validation
    // 1. No repeating numbers in a cage
    // 2. Sum must match if cage is fully filled
    const cageGroups: Record<number, Cell[]> = {};
    for (let r = 0; r < 21; r++) {
      for (let c = 0; c < 21; c++) {
        const cell = currentBoard[r][c];
        if (cell.isActive) {
          if (!cageGroups[cell.cageId]) cageGroups[cell.cageId] = [];
          cageGroups[cell.cageId].push(cell);
        }
      }
    }

    Object.values(cageGroups).forEach((cells) => {
      const vals: any = {};
      let sum = 0;
      let isFull = true;
      let targetSum = 0;

      cells.forEach((cell) => {
        if (cell.cageSum !== null) targetSum = cell.cageSum;
        if (cell.value === null) {
          isFull = false;
        } else {
          sum += cell.value;
          if (vals[cell.value]) {
            cell.hasError = true;
            vals[cell.value].hasError = true;
            anyError = true;
          }
          vals[cell.value] = cell;
        }
      });

      if (isFull && sum !== targetSum) {
        cells.forEach((cell) => (cell.hasError = true));
        anyError = true;
      }
    });

    if (allFilled && !anyError) {
      setIsWon(true);
    }
    return currentBoard.map((row) => [...row]);
  };

  const handleNumberInput = (num: number | null) => {
    if (!selectedCell || isWon) return;
    const { r, c } = selectedCell;

    setGrid((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = { ...next[r][c], value: num };
      return validateBoard(next);
    });
  };

  // Re-aliasing for the standard function name from previous implementation
  const setGrid = setBoard;

  const getBorders = (r: number, c: number) => {
    const cell = board[r]?.[c];
    if (!cell || !cell.isActive) return '';
    let borders = '';

    // Default 3x3 block borders
    if (r % 3 === 0) borders += 'border-t border-slate-900/40 ';
    if (c % 3 === 0) borders += 'border-l border-slate-900/40 ';
    if (r % 3 === 2) borders += 'border-b border-slate-900/40 ';
    if (c % 3 === 2) borders += 'border-r border-slate-900/40 ';

    // Samurai perimeter borders
    const u = board[r - 1]?.[c];
    const d = board[r + 1]?.[c];
    const l = board[r]?.[c - 1];
    const rgt = board[r]?.[c + 1];

    if (!u || !u.isActive) borders += 'border-t-[3px] border-t-white/80 ';
    if (!d || !d.isActive) borders += 'border-b-[3px] border-b-white/80 ';
    if (!l || !l.isActive) borders += 'border-l-[3px] border-l-white/80 ';
    if (!rgt || !rgt.isActive) borders += 'border-r-[3px] border-r-white/80 ';

    // Cage dashed borders (Killer Sudoku visual)
    if (u && u.isActive && u.cageId !== cell.cageId)
      borders += 'border-t-2 border-dashed border-t-white/50 ';
    if (d && d.isActive && d.cageId !== cell.cageId)
      borders += 'border-b-2 border-dashed border-b-white/50 ';
    if (l && l.isActive && l.cageId !== cell.cageId)
      borders += 'border-l-2 border-dashed border-l-white/50 ';
    if (rgt && rgt.isActive && rgt.cageId !== cell.cageId)
      borders += 'border-r-2 border-dashed border-r-white/50 ';

    return borders;
  };

  const getStars = () => {
    switch (difficulty) {
      case Difficulty.EASY:
        return 300;
      case Difficulty.MEDIUM:
        return 500;
      case Difficulty.HARD:
        return 800;
      case Difficulty.VERY_HARD:
        return 1200;
      default:
        return 400;
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen pb-10">
      <div className="flex justify-between items-center w-full max-w-6xl mb-4 px-4 relative mt-2">
        <button
          onClick={onExit}
          className="px-5 py-2 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 transition-all flex items-center gap-2"
        >
          <span>⬅</span> Çıkış
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 text-center w-max">
          <h2 className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-600 drop-shadow-lg uppercase tracking-wider">
            Samurai Killer
          </h2>
        </div>
        <button
          onClick={() => setShowRules(true)}
          className="p-3 bg-red-500/20 text-red-300 rounded-full hover:bg-red-500/30 transition-all"
        >
          ℹ️ Kurallar
        </button>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-xl p-2 md:p-6 rounded-[20px] md:rounded-[40px] shadow-2xl border border-rose-500/20 flex flex-col items-center w-full max-w-6xl overflow-hidden relative">
        {showRules && (
          <div className="absolute inset-0 z-50 bg-slate-900/95 p-8 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
            <h3 className="text-2xl md:text-4xl font-black mb-6 text-rose-500">Nasıl Oynanır?</h3>
            <ul className="text-white/80 space-y-4 text-left max-w-lg mb-8 text-sm md:text-base">
              <li className="flex items-start gap-3">
                <span className="text-xl md:text-2xl">⚔️</span>
                <span>
                  Bu bir <b>Samuray Sudoku</b> (Kesişen 5 tahta) ile <b>Killer Sudoku</b>'nun
                  birleşimidir! Olası en zor mantık oyunlarından biridir.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl md:text-2xl">🧩</span>
                <span>
                  Izgara üzerinde kesikli çizgilerle (ve renklerle) ayrılmış bloklara "Kafes" (Cage)
                  denir.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl md:text-2xl">1️⃣</span>
                <span>
                  Bir kafesin içerisindeki rakamların <b>TOPLAMI</b>, kafesin sol üst köş köşesinde
                  yazan ufak sayıyı vermelidir!
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl md:text-2xl">❌</span>
                <span>
                  Bir kafes içerisinde aynı rakam hiçbir zaman tekrar edemez! Normal 9x9 Sudoku
                  satır/sütun/kutu kuralları da tüm tahtalarda aynen geçerlidir.
                </span>
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="bg-gradient-to-r from-red-600 to-rose-800 text-white font-black py-4 px-12 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-xl"
            >
              BU ZORLUĞA HAZIRIM!
            </button>
          </div>
        )}

        <div className="mb-2 flex justify-between items-center w-full opacity-90 px-4">
          <span className="text-white font-bold bg-white/10 px-4 py-2 rounded-xl text-xs md:text-base">
            Ödül: {getStars()} ⭐
          </span>
          {isGenerating && (
            <span className="text-rose-400 font-bold animate-pulse text-xs md:text-base">
              Kafesler Örülüyor...
            </span>
          )}
          <button
            onClick={generatePuzzle}
            disabled={isGenerating}
            className="text-white hover:text-rose-400 font-bold transition-colors disabled:opacity-50 text-xs md:text-base"
          >
            Yeniden Kur 🔄
          </button>
        </div>

        <div className="w-full flex-1 overflow-auto custom-scrollbar p-2 flex justify-center items-center">
          <div
            className="grid grid-cols-21 gap-[1px] bg-slate-800 p-[2px] rounded-lg min-w-[750px] md:min-w-[900px] select-none"
            style={{ gridTemplateColumns: 'repeat(21, minmax(0, 1fr))' }}
          >
            {!isGenerating &&
              board.map((row, r) =>
                row.map((cell, c) => {
                  if (!cell.isActive) {
                    return (
                      <div
                        key={`${r}-${c}`}
                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 opacity-0"
                      ></div>
                    );
                  }

                  const isSelected = selectedCell?.r === r && selectedCell?.c === c;
                  const isSameNumber =
                    selectedCell &&
                    board[selectedCell.r][selectedCell.c].value === cell.value &&
                    cell.value !== null;
                  const isSameCage =
                    selectedCell && board[selectedCell.r][selectedCell.c].cageId === cell.cageId;
                  const borders = getBorders(r, c);
                  const cageBg = cageColors[cell.cageId % cageColors.length];

                  return (
                    <div
                      key={`${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center text-xs sm:text-lg md:text-xl font-black transition-colors cursor-pointer relative
                                  ${borders}
                                  ${cageBg}
                                  ${
                                    cell.hasError
                                      ? 'bg-red-600/80 text-white animate-pulse'
                                      : isSelected
                                        ? 'bg-rose-500 text-white z-20 scale-110 shadow-lg ring-2 ring-white rounded-md'
                                        : isSameCage
                                          ? 'brightness-150 saturate-150'
                                          : isSameNumber
                                            ? 'bg-rose-400/80 text-white'
                                            : ''
                                  }
                                  ${cell.isInitial ? 'text-white/90 cursor-default' : 'text-rose-100'}
                                `}
                    >
                      {/* Killer Sudoku Cage Target Sum Label */}
                      {cell.cageSum !== null && (
                        <div className="absolute top-0 left-0.5 text-[8px] md:text-[10px] font-bold text-white/90 leading-none pointer-events-none drop-shadow-md">
                          {cell.cageSum}
                        </div>
                      )}

                      <span className={cell.cageSum !== null ? 'mt-2 md:mt-3' : ''}>
                        {cell.value || ''}
                      </span>
                    </div>
                  );
                })
              )}
          </div>
        </div>

        {/* Number Pad for extremely hard gameplay */}
        <div className="mt-6 grid grid-cols-5 md:grid-cols-10 gap-2 w-full max-w-2xl px-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberInput(num)}
              className="bg-white/10 hover:bg-white/20 text-white font-black text-xl py-3 rounded-xl transition-all shadow-md hover:scale-105 active:scale-95"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleNumberInput(null)}
            className="bg-red-500/20 hover:bg-red-500/40 text-red-100 font-bold text-sm rounded-xl py-3 transition-all flex items-center justify-center"
          >
            SİL
          </button>
        </div>

        {isWon && (
          <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/80 backdrop-blur-md rounded-[20px] md:rounded-[40px] animate-in fade-in zoom-in duration-500">
            <div className="bg-gradient-to-b from-rose-600 to-red-900 p-8 rounded-[32px] text-center shadow-[0_0_80px_rgba(225,29,72,0.6)] scale-110 border-4 border-white">
              <div className="text-6xl mb-4 animate-bounce">🎖️</div>
              <h3 className="text-4xl font-black text-white mb-2 drop-shadow-lg">EFSANEVİ!</h3>
              <p className="text-white/80 font-bold text-lg mb-6 max-w-xs mx-auto">
                Samurai Killer Sudoku'yu çözdün. Sen bir mantık ustasısın!
              </p>
              <button
                onClick={() => onComplete(getStars())}
                className="bg-white text-rose-800 px-8 py-4 rounded-full font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all w-full flex items-center justify-center gap-2"
              >
                <span>+{getStars()} ⭐ KAZAN</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SamuraiKillerSudokuGame;

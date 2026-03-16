import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Difficulty } from '../../types';

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
  isInitial: boolean;
  isActive: boolean; // false for the blank spaces between grids
  hasError: boolean;
  gridId: number[]; // which of the 5 grids it belongs to [0=TL, 1=TR, 2=Center, 3=BL, 4=BR]
}

const SamuraiSudokuGame: React.FC<Props> = ({ difficulty, onComplete, onExit }) => {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [isWon, setIsWon] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const [isGenerating, setIsGenerating] = useState(true);

  // The 5 standard grids composing the Samurai
  const grids = [
    { id: 0, rOffset: 0, cOffset: 0 }, // Top-Left
    { id: 1, rOffset: 0, cOffset: 12 }, // Top-Right
    { id: 2, rOffset: 6, cOffset: 6 }, // Center
    { id: 3, rOffset: 12, cOffset: 0 }, // Bottom-Left
    { id: 4, rOffset: 12, cOffset: 12 }, // Bottom-Right
  ];

  const generatePuzzle = useCallback(() => {
    setIsGenerating(true);

    // We use a small setTimeout so the UI can update the 'Generating...' state before we freeze the main thread
    setTimeout(() => {
      let rawBoard: number[][] = Array(21)
        .fill(0)
        .map(() => Array(21).fill(0));
      let success = false;

      while (!success) {
        rawBoard = Array(21)
          .fill(0)
          .map(() => Array(21).fill(0));

        // Helper to check validity inside one specific 9x9 grid
        const isValid = (r: number, c: number, num: number, rOffset: number, cOffset: number) => {
          // Check row
          for (let i = 0; i < 9; i++) if (rawBoard[rOffset + r][cOffset + i] === num) return false;
          // Check col
          for (let i = 0; i < 9; i++) if (rawBoard[rOffset + i][cOffset + c] === num) return false;
          // Check 3x3 box
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

        // Generation order: Center first, then the corners
        success =
          solveGrid(6, 6) &&
          solveGrid(0, 0) &&
          solveGrid(0, 12) &&
          solveGrid(12, 0) &&
          solveGrid(12, 12);
      }

      // Determine removal count per grid based on difficulty
      let removePerGrid = 40;
      if (difficulty === Difficulty.VERY_EASY) removePerGrid = 30;
      else if (difficulty === Difficulty.EASY) removePerGrid = 38;
      else if (difficulty === Difficulty.MEDIUM) removePerGrid = 46;
      else if (difficulty === Difficulty.HARD) removePerGrid = 54;
      else if (difficulty === Difficulty.VERY_HARD) removePerGrid = 60;

      // Remove numbers keeping symmetry or just randomly
      grids.forEach((g) => {
        let removed = 0;
        // Keep in mind overlapping regions! Don't over-remove overlaps, or just pure random.
        while (removed < removePerGrid) {
          const r = Math.floor(Math.random() * 9);
          const c = Math.floor(Math.random() * 9);
          if (rawBoard[g.rOffset + r][g.cOffset + c] !== 0) {
            rawBoard[g.rOffset + r][g.cOffset + c] = 0;
            removed++;
          }
        }
      });

      // Map to UI state
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

              return {
                r,
                c,
                value: isActive && rawBoard[r][c] !== 0 ? rawBoard[r][c] : null,
                isInitial: isActive && rawBoard[r][c] !== 0,
                isActive,
                hasError: false,
                gridId: gridIds,
              };
            })
        );

      setBoard(newBoard);
      setIsWon(false);
      setSelectedCell(null);
      setIsGenerating(false);
    }, 100);
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

    // Check each of the 5 grids
    grids.forEach((g) => {
      // row check
      for (let r = 0; r < 9; r++) {
        const rowVals: any = {};
        for (let c = 0; c < 9; c++) {
          const cell = currentBoard[g.rOffset + r][g.cOffset + c];
          if (cell.value === null) {
            allFilled = false;
            continue;
          }
          if (rowVals[cell.value]) {
            cell.hasError = true;
            rowVals[cell.value].hasError = true;
            anyError = true;
          } else {
            rowVals[cell.value] = cell;
          }
        }
      }
      // col check
      for (let c = 0; c < 9; c++) {
        const colVals: any = {};
        for (let r = 0; r < 9; r++) {
          const cell = currentBoard[g.rOffset + r][g.cOffset + c];
          if (cell.value === null) continue;
          if (colVals[cell.value]) {
            cell.hasError = true;
            colVals[cell.value].hasError = true;
            anyError = true;
          } else {
            colVals[cell.value] = cell;
          }
        }
      }
      // box check
      for (let br = 0; br < 3; br++) {
        for (let bc = 0; bc < 3; bc++) {
          const boxVals: any = {};
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              const cell = currentBoard[g.rOffset + br * 3 + i][g.cOffset + bc * 3 + j];
              if (cell.value === null) continue;
              if (boxVals[cell.value]) {
                cell.hasError = true;
                boxVals[cell.value].hasError = true;
                anyError = true;
              } else {
                boxVals[cell.value] = cell;
              }
            }
          }
        }
      }
    });

    if (allFilled && !anyError) {
      setIsWon(true);
    }

    // We return a new array reference so state updates properly
    return currentBoard.map((row) => [...row]);
  };

  const handleNumberInput = (num: number | null) => {
    if (!selectedCell || isWon) return;
    const { r, c } = selectedCell;

    setBoard((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = { ...next[r][c], value: num };
      return validateBoard(next);
    });
  };

  const getStars = () => {
    switch (difficulty) {
      case Difficulty.EASY:
        return 100;
      case Difficulty.MEDIUM:
        return 150;
      case Difficulty.HARD:
        return 250;
      case Difficulty.VERY_HARD:
        return 400;
      default:
        return 120;
    }
  };

  const getBorders = (r: number, c: number) => {
    let classes = '';
    // thick borders for 3x3 blocks inside any active grid
    // Samurai has a complex boundary, but locally each 9x9 is normal.
    // However since grids overlap, using modulo 3 based on absolute coordinates works perfectly!
    // Because offsets are multiples of 3 (0, 6, 12).

    if (r % 3 === 0) classes += 'border-t-2 border-slate-900 ';
    if (c % 3 === 0) classes += 'border-l-2 border-slate-900 ';
    if (r % 3 === 2) classes += 'border-b-2 border-slate-900 ';
    if (c % 3 === 2) classes += 'border-r-2 border-slate-900 ';

    // Thickest border on the outermost edges of the Samurai shape
    const cell = board[r]?.[c];
    if (cell && cell.isActive) {
      const u = board[r - 1]?.[c];
      const d = board[r + 1]?.[c];
      const l = board[r]?.[c - 1];
      const rgt = board[r]?.[c + 1];

      if (!u || !u.isActive) classes += 'border-t-4 border-t-white ';
      if (!d || !d.isActive) classes += 'border-b-4 border-b-white ';
      if (!l || !l.isActive) classes += 'border-l-4 border-l-white ';
      if (!rgt || !rgt.isActive) classes += 'border-r-4 border-r-white ';
    }

    return classes;
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <div className="flex justify-between items-center w-full max-w-5xl mb-4 px-4 relative">
        <button
          onClick={onExit}
          className="px-6 py-2 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 transition-all"
        >
          ⬅ Çıkış
        </button>
        <h2 className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-700 uppercase tracking-wider">
          Samurai Sudoku
        </h2>
        <button
          onClick={() => setShowRules(true)}
          className="p-3 bg-red-500/20 text-red-300 rounded-full hover:bg-red-500/30 transition-all"
        >
          ℹ️ Kurallar
        </button>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-xl p-4 md:p-6 rounded-[40px] shadow-2xl border border-white/10 flex flex-col items-center w-full max-w-5xl overflow-hidden relative">
        {showRules && (
          <div className="absolute inset-0 z-50 bg-slate-900/95 p-8 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
            <h3 className="text-3xl font-black mb-6 text-red-500">Nasıl Oynanır?</h3>
            <ul className="text-white/80 space-y-4 text-left max-w-lg mb-8">
              <li className="flex items-start gap-3">
                <span className="text-xl">⚔️</span>
                <span>
                  Samurai Sudoku, kesişen tam 5 ayrı Sudoku (9x9) tahtasından oluşur. (Köşelerde 4
                  ve merkezde 1 adet)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">1️⃣</span>
                <span>
                  Tüm 5 tahta da aynı anda normal Sudoku kurallarına (Satır, Sütun ve 3x3 kutularda
                  1-9 birer kez) uymak zorundadır.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">🧩</span>
                <span>
                  Orta alanın köşelerindeki 3x3'lük kutular her iki kesişen tahtaya da aittir ve her
                  iki tarafın kurallarına birlikte uymalıdır.
                </span>
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="bg-gradient-to-r from-red-600 to-red-800 text-white font-black py-4 px-12 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-xl"
            >
              DESTANSI OYUNA BAŞLA!
            </button>
          </div>
        )}

        <div className="mb-4 flex justify-between items-center w-full opacity-90">
          <span className="text-white font-bold bg-white/10 px-4 py-2 rounded-xl">
            Ödül: {getStars()} ⭐
          </span>
          {isGenerating && (
            <span className="text-yellow-400 font-bold animate-pulse">
              Savaş Alanı Kuruluyor...
            </span>
          )}
          <button
            onClick={generatePuzzle}
            disabled={isGenerating}
            className="text-white hover:text-red-400 font-bold transition-colors disabled:opacity-50"
          >
            Yeniden Düşman Getir 🔄
          </button>
        </div>

        {/* Scalable Container for large 21x21 board */}
        <div className="w-full flex-1 overflow-auto custom-scrollbar p-2 flex justify-center items-center">
          <div
            className="grid grid-cols-21 gap-[1px] bg-slate-800 p-[2px] rounded-lg min-w-[600px] md:min-w-[800px] select-none"
            style={{ gridTemplateColumns: 'repeat(21, minmax(0, 1fr))' }}
          >
            {!isGenerating &&
              board.map((row, r) =>
                row.map((cell, c) => {
                  if (!cell.isActive) {
                    return (
                      <div
                        key={`${r}-${c}`}
                        className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 opacity-0"
                      ></div>
                    );
                  }

                  const isSelected = selectedCell?.r === r && selectedCell?.c === c;
                  let isRelated = false;
                  if (selectedCell) {
                    const selCell = board[selectedCell.r][selectedCell.c];
                    // Related if in the same grid and (same row or same col or same 3x3 box in that specific grid)
                    // But Samurai is massive, so just highlight same absolute row/col if they share an active grid.
                    const sharedGrids = cell.gridId.filter((id) => selCell.gridId.includes(id));
                    if (sharedGrids.length > 0) {
                      if (r === selectedCell.r || c === selectedCell.c) isRelated = true;
                      const bR1 = Math.floor(r / 3);
                      const bC1 = Math.floor(c / 3);
                      const bR2 = Math.floor(selectedCell.r / 3);
                      const bC2 = Math.floor(selectedCell.c / 3);
                      if (bR1 === bR2 && bC1 === bC2) isRelated = true;
                    }
                  }

                  const isSameNumber =
                    selectedCell &&
                    board[selectedCell.r][selectedCell.c].value === cell.value &&
                    cell.value !== null;
                  const borders = getBorders(r, c);

                  return (
                    <div
                      key={`${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      className={`w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 flex items-center justify-center text-[10px] sm:text-xs md:text-lg font-black transition-colors cursor-pointer border border-white/5
                      ${borders}
                      ${
                        cell.hasError
                          ? 'bg-red-500 text-white animate-pulse'
                          : isSelected
                            ? 'bg-red-600 text-white z-10 scale-110 shadow-lg'
                            : isSameNumber
                              ? 'bg-red-400 text-slate-900'
                              : isRelated
                                ? 'bg-white/20'
                                : cell.gridId.length > 1
                                  ? 'bg-white/10'
                                  : 'bg-slate-700'
                      }
                      ${cell.isInitial ? 'text-white/80 cursor-default' : 'text-yellow-300'}
                    `}
                    >
                      {cell.value || ''}
                    </div>
                  );
                })
              )}
          </div>
        </div>

        {/* Number Pad */}
        <div className="mt-8 grid grid-cols-5 md:grid-cols-10 gap-2 w-full max-w-lg">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberInput(num)}
              className="bg-white/10 hover:bg-white/20 text-white font-black text-xl py-3 md:py-4 rounded-xl transition-all shadow-md hover:scale-105 active:scale-95"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleNumberInput(null)}
            className="bg-red-500/20 hover:bg-red-500/40 text-red-200 font-bold text-sm rounded-xl py-3 md:py-4 transition-all flex items-center justify-center"
          >
            SİL
          </button>
        </div>

        {isWon && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/70 backdrop-blur-sm rounded-[40px] animate-in fade-in zoom-in duration-500">
            <div className="bg-gradient-to-b from-red-600 to-red-900 p-8 rounded-[32px] text-center shadow-[0_0_50px_rgba(239,68,68,0.5)] scale-110 border-4 border-white">
              <div className="text-6xl mb-4 animate-bounce">⚔️</div>
              <h3 className="text-4xl font-black text-white mb-2 drop-shadow-lg">
                Gerçek Bir Samuray!
              </h3>
              <p className="text-red-200 font-bold text-lg mb-6">Tüm tahtaları diz çöktürdün!</p>
              <button
                onClick={() => onComplete(getStars())}
                className="bg-white text-red-800 px-8 py-4 rounded-full font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all w-full flex items-center justify-center gap-2"
              >
                <span>+{getStars()} ⭐</span>
                <span>KAZAN</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SamuraiSudokuGame;

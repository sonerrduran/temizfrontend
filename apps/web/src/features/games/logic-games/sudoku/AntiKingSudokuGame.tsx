import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';

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
}

const AntiKingSudokuGame: React.FC<Props> = ({ difficulty, onComplete, onExit }) => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [isWon, setIsWon] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const [isGenerating, setIsGenerating] = useState(true);

  // Chess King moves (only diagonals needed since orthogonal are row/col)
  const kingMoves = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

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
        // Anti-King constraint (diagonals)
        for (const [dr, dc] of kingMoves) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < 9 && nc >= 0 && nc < 9) {
            if (board[nr][nc] === num) return false;
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
          // Anti-King Check (diagonals)
          for (const [dr, dc] of kingMoves) {
            const nr = i + dr;
            const nc = j + dc;
            if (nr >= 0 && nr < 9 && nc >= 0 && nc < 9) {
              if (next[nr][nc].value === val) {
                next[i][j].hasError = true;
                next[nr][nc].hasError = true;
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
        return 60;
      case Difficulty.MEDIUM:
        return 100;
      case Difficulty.HARD:
        return 180;
      case Difficulty.VERY_HARD:
        return 250;
      default:
        return 80;
    }
  };

  const isKingNeighbor = (r: number, c: number) => {
    if (!selectedCell) return false;
    const dr = Math.abs(selectedCell.r - r);
    const dc = Math.abs(selectedCell.c - c);
    return dr <= 1 && dc <= 1 && (dr !== 0 || dc !== 0);
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
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-600 drop-shadow-lg uppercase tracking-wider">
            Anti-King Sudoku
          </h2>
        </div>
        <button
          onClick={() => setShowRules(true)}
          className="p-3 bg-yellow-500/20 text-yellow-300 rounded-full hover:bg-yellow-500/30 transition-all"
        >
          ℹ️ Kurallar
        </button>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-xl p-4 md:p-8 rounded-[40px] shadow-2xl border border-yellow-500/20 flex flex-col items-center relative overflow-hidden w-full max-w-2xl">
        {showRules && (
          <div className="absolute inset-0 z-50 bg-slate-900/95 p-8 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
            <h3 className="text-3xl font-black mb-6 text-yellow-400">Nasıl Oynanır?</h3>
            <ul className="text-white/80 space-y-4 text-left max-w-md mb-8">
              <li className="flex items-start gap-3">
                <span className="text-xl">♚</span>
                <span>
                  Klasik Sudoku kurallarına ek olarak <b>Satranç Şahı'nın Hareketi</b> kısıtlaması
                  vardır.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">❌</span>
                <span>
                  Aynı rakam, bir satranç şahının gidebileceği{' '}
                  <b>komşu 8 hücreden (çaprazlar dahil)</b> hiçbirine koyulamaz.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">💡</span>
                <span>
                  Satır ve sütunlar zaten Sudoku kuralı gereği yasak olduğu için, asıl dikkat etmen
                  gereken <b>4 çapraz komşuda aynı sayı olmaması!</b>
                </span>
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-black py-4 px-12 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-xl"
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
            <span className="text-yellow-400 font-bold animate-pulse">Krallık Kuruluyor...</span>
          )}
          <button
            onClick={generatePuzzle}
            disabled={isGenerating}
            className="text-white hover:text-yellow-400 font-bold transition-colors disabled:opacity-50"
          >
            Yeniden Düşman Getir 🔄
          </button>
        </div>

        <div className="grid grid-cols-9 gap-[1px] p-[2px] bg-slate-800/80 rounded-xl shadow-[0_0_30px_rgba(250,204,21,0.1)] select-none border-4 border-slate-950">
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

                const kingTarget = isKingNeighbor(r, c);
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
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-lg sm:text-xl md:text-2xl font-black transition-all cursor-pointer relative
                    ${isDarkBox ? 'bg-slate-800' : 'bg-slate-700'}
                    ${borders}
                    ${cell.hasError ? 'bg-red-500/80 text-white animate-pulse' : ''}
                    ${isSelected ? 'bg-yellow-500 text-slate-900 z-10 scale-110 shadow-lg rounded-md ring-2 ring-white' : ''}
                    ${!isSelected && kingTarget ? 'bg-yellow-900/40 outline outline-1 outline-offset-[-2px] outline-yellow-500/50 grayscale-0' : ''}
                    ${!isSelected && isSameNumber ? 'bg-slate-500/80 text-yellow-300' : ''}
                    ${!isSelected && !isSameNumber && !kingTarget && isRelated ? 'brightness-125' : ''}
                    ${cell.isInitial ? 'text-white/80 cursor-default' : 'text-yellow-400'}
                  `}
                  >
                    {kingTarget && !isSelected && cell.value === null && (
                      <span className="absolute text-[10px] sm:text-xs opacity-20 pointer-events-none">
                        ♚
                      </span>
                    )}
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
              className="bg-white/10 hover:bg-yellow-500/80 hover:text-slate-900 text-white font-black text-xl py-3 rounded-xl transition-all shadow-md hover:scale-105 active:scale-95"
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
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/70 backdrop-blur-sm rounded-[40px] animate-in fade-in zoom-in duration-500">
            <div className="bg-gradient-to-b from-yellow-600 to-amber-900 p-8 rounded-[32px] text-center shadow-[0_0_50px_rgba(250,204,21,0.5)] scale-110 border-4 border-white">
              <div className="text-6xl mb-4 animate-bounce">♚</div>
              <h3 className="text-4xl font-black text-white mb-2 drop-shadow-lg">KRAL ÖLDÜ!</h3>
              <p className="text-yellow-200 font-bold mb-4">Anti-King Sudoku tamamlandı!</p>
              <button
                onClick={() => onComplete(getStars())}
                className="bg-white text-yellow-800 px-8 py-4 mt-2 rounded-full font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all w-full"
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

export default AntiKingSudokuGame;

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
  value: string | null;
  isInitial: boolean;
  hasError: boolean;
}

const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

const AlphabetSudokuGame: React.FC<Props> = ({ difficulty, onComplete, onExit }) => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [isWon, setIsWon] = useState(false);
  const [showRules, setShowRules] = useState(true);

  const generatePuzzle = useCallback(() => {
    const board = Array(9)
      .fill(0)
      .map(() => Array(9).fill(null));

    const isValid = (r: number, c: number, char: string) => {
      for (let i = 0; i < 9; i++) {
        if (board[r][i] === char) return false;
        if (board[i][c] === char) return false;
      }
      const br = Math.floor(r / 3) * 3;
      const bc = Math.floor(c / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[br + i][bc + j] === char) return false;
        }
      }
      return true;
    };

    const solve = (r: number, c: number): boolean => {
      if (r === 9) return true;
      if (c === 9) return solve(r + 1, 0);

      const chars = [...ALPHABET].sort(() => Math.random() - 0.5);
      for (const char of chars) {
        if (isValid(r, c, char)) {
          board[r][c] = char;
          if (solve(r, c + 1)) return true;
          board[r][c] = null;
        }
      }
      return false;
    };

    solve(0, 0);

    let removeCount = 40;
    if (difficulty === Difficulty.VERY_EASY) removeCount = 30;
    else if (difficulty === Difficulty.EASY) removeCount = 40;
    else if (difficulty === Difficulty.MEDIUM) removeCount = 50;
    else if (difficulty === Difficulty.HARD) removeCount = 58;
    else if (difficulty === Difficulty.VERY_HARD) removeCount = 64;

    let removed = 0;
    while (removed < removeCount) {
      const r = Math.floor(Math.random() * 9);
      const c = Math.floor(Math.random() * 9);
      if (board[r][c] !== null) {
        board[r][c] = null;
        removed++;
      }
    }

    const newGrid = board.map((row, r) =>
      row.map((val, c) => ({
        row: r,
        col: c,
        value: val,
        isInitial: val !== null,
        hasError: false,
      }))
    );

    setGrid(newGrid);
    setIsWon(false);
    setSelectedCell(null);
  }, [difficulty]);

  useEffect(() => {
    generatePuzzle();
  }, [generatePuzzle]);

  const handleCellClick = (r: number, c: number) => {
    if (isWon || grid[r][c].isInitial) return;
    setSelectedCell({ r, c });
  };

  const handleCharInput = (char: string | null) => {
    if (!selectedCell || isWon) return;
    const { r, c } = selectedCell;

    setGrid((prev) => {
      const next = prev.map((row) => row.map((cell) => ({ ...cell, hasError: false })));
      next[r][c].value = char;

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

      if (filled === 81 && !anyError) setIsWon(true);
      return next;
    });
  };

  const getStars = () => {
    switch (difficulty) {
      case Difficulty.EASY:
        return 30;
      case Difficulty.MEDIUM:
        return 50;
      case Difficulty.HARD:
        return 80;
      case Difficulty.VERY_HARD:
        return 120;
      default:
        return 35;
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
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 drop-shadow-lg uppercase tracking-wider">
            Alphabet Sudoku
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
                <span className="text-xl">🔤</span>
                <span>
                  Tıpkı klasik Sudoku gibidir, <b>fakat rakamlar yerine harfler</b> kullanılır.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">1️⃣</span>
                <span>
                  Her satır, her sütun ve her 3x3 kutu içinde <b>A'dan I'ya kadar</b> olan 9 harfin
                  tamamı tam olarak birer kez bulunmalıdır.
                </span>
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="bg-gradient-to-r from-yellow-500 to-amber-700 text-white font-black py-4 px-12 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-xl"
            >
              ANLADIM, BAŞLA!
            </button>
          </div>
        )}

        <div className="mb-4 flex justify-between items-center w-full opacity-90">
          <span className="text-white font-bold bg-white/10 px-4 py-2 rounded-xl">
            Ödül: {getStars()} ⭐
          </span>
          <button
            onClick={generatePuzzle}
            className="text-white hover:text-yellow-400 font-bold transition-colors"
          >
            Yeniden 🔄
          </button>
        </div>

        <div className="grid grid-cols-9 gap-[1px] p-[2px] bg-amber-900/40 rounded-xl shadow-[0_0_30px_rgba(245,158,11,0.2)] select-none">
          {grid.map((row, r) =>
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

              const isSameChar =
                selectedCell &&
                grid[selectedCell.r][selectedCell.c].value === cell.value &&
                cell.value !== null;

              return (
                <div
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-lg sm:text-xl md:text-2xl font-black transition-all cursor-pointer relative
                    ${isDarkBox ? 'bg-slate-800' : 'bg-slate-700'}
                    ${cell.hasError ? 'bg-red-500/50 text-white animate-pulse' : ''}
                    ${isSelected ? 'bg-amber-500 text-white z-10 scale-110 shadow-lg rounded-md ring-2 ring-white' : ''}
                    ${!isSelected && isSameChar ? 'bg-amber-400/40 text-white' : ''}
                    ${!isSelected && !isSameChar && isRelated ? 'brightness-125' : ''}
                    ${cell.isInitial ? 'text-white/90 cursor-default' : 'text-amber-300'}
                  `}
                >
                  {cell.value || ''}
                </div>
              );
            })
          )}
        </div>

        {/* Char Pad */}
        <div className="mt-8 grid grid-cols-5 md:grid-cols-10 gap-2 w-full max-w-lg">
          {ALPHABET.map((char) => (
            <button
              key={char}
              onClick={() => handleCharInput(char)}
              className="bg-white/10 hover:bg-white/20 text-white font-black text-xl py-3 rounded-xl transition-all shadow-md hover:scale-105 active:scale-95"
            >
              {char}
            </button>
          ))}
          <button
            onClick={() => handleCharInput(null)}
            className="bg-red-500/20 hover:bg-red-500/40 text-red-200 font-bold text-sm rounded-xl py-3 transition-all flex items-center justify-center"
          >
            SİL
          </button>
        </div>

        {isWon && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/70 backdrop-blur-sm rounded-[40px] animate-in fade-in zoom-in duration-500">
            <div className="bg-gradient-to-b from-yellow-500 to-amber-700 p-8 rounded-[32px] text-center shadow-[0_0_50px_rgba(245,158,11,0.5)] scale-110 border-4 border-white">
              <div className="text-6xl mb-4 animate-bounce">🔤</div>
              <h3 className="text-4xl font-black text-white mb-2 drop-shadow-lg">BAŞARILI!</h3>
              <button
                onClick={() => onComplete(getStars())}
                className="bg-white text-amber-700 px-8 py-4 mt-6 rounded-full font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all w-full"
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

export default AlphabetSudokuGame;

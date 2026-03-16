import React, { useState, useEffect } from 'react';
import { Difficulty } from '../../types';

interface Props {
  difficulty: Difficulty;
  grade: number;
  onComplete: (score: number) => void;
  onExit: () => void;
}

const DiagonalSudokuGame: React.FC<Props> = ({ difficulty, grade, onComplete, onExit }) => {
  const [grid, setGrid] = useState<(number | null)[][]>(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(null))
  );
  const [initialGrid, setInitialGrid] = useState<boolean[][]>(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(false))
  );
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  useEffect(() => {
    const demoGrid = Array(9)
      .fill(null)
      .map(() => Array(9).fill(null));
    demoGrid[0][0] = 5;
    demoGrid[4][4] = 9;
    demoGrid[8][8] = 2; // Main diag
    demoGrid[0][8] = 7;
    demoGrid[8][0] = 3; // Anti diag
    setGrid(demoGrid);

    const initFlags = Array(9)
      .fill(null)
      .map(() => Array(9).fill(false));
    initFlags[0][0] = true;
    initFlags[4][4] = true;
    initFlags[8][8] = true;
    initFlags[0][8] = true;
    initFlags[8][0] = true;
    setInitialGrid(initFlags);
  }, [difficulty]);

  const handleCellClick = (r: number, c: number) => {
    if (!initialGrid[r][c]) setSelectedCell([r, c]);
  };

  const handleNumberClick = (num: number) => {
    if (selectedCell) {
      const [r, c] = selectedCell;
      const newGrid = [...grid.map((row) => [...row])];
      newGrid[r][c] = num;
      setGrid(newGrid);

      let isComplete = true;
      newGrid.forEach((row) =>
        row.forEach((val) => {
          if (val === null) isComplete = false;
        })
      );
      if (isComplete) onComplete(100);
    }
  };

  const isDiagonal = (r: number, c: number) => {
    return r === c || r + c === 8;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-6">
        <button
          onClick={onExit}
          className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
        >
          ⬅ Çıkış
        </button>
        <h2 className="text-3xl font-black text-white">Diagonal Sudoku</h2>
        <div className="w-20"></div>
      </div>

      <div className="bg-slate-900/80 p-6 rounded-3xl border border-white/10 shadow-2xl">
        <div className="grid grid-cols-9 gap-0 bg-slate-800 p-2 rounded-xl mb-6 border-4 border-slate-700">
          {grid.map((row, r) =>
            row.map((val, c) => {
              const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;
              const isInitial = initialGrid[r][c];
              const inDiag = isDiagonal(r, c);

              let borderClasses = 'border border-slate-700/50 ';
              if (c > 0 && c % 3 === 0) borderClasses += 'border-l-2 border-l-slate-400 ';
              if (r > 0 && r % 3 === 0) borderClasses += 'border-t-2 border-t-slate-400 ';

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={`
                             w-8 h-8 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-2xl font-bold transition-all relative
                             ${borderClasses} 
                             ${inDiag ? 'bg-fuchsia-500/20' : 'bg-slate-800'}
                             ${isSelected ? 'ring-4 ring-yellow-400 z-10 scale-110 shadow-xl' : ''}
                             ${isInitial ? 'text-white' : 'text-fuchsia-300'}
                             ${!isInitial && !isSelected ? 'hover:bg-white/10' : ''}
                          `}
                >
                  {/* Add diagonal line indicator */}
                  {inDiag && (
                    <div
                      className={`absolute pointer-events-none w-full h-full opacity-20 ${r === c ? 'bg-gradient-to-br' : 'bg-gradient-to-bl'} from-fuchsia-500 to-transparent`}
                    ></div>
                  )}
                  <span className="z-10">{val || ''}</span>
                </button>
              );
            })
          )}
        </div>

        <div className="grid grid-cols-5 md:grid-cols-9 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              disabled={!selectedCell}
              className="bg-fuchsia-500/20 hover:bg-fuchsia-500/40 disabled:opacity-50 text-fuchsia-100 font-bold py-3 md:py-4 rounded-xl text-xl shadow-lg transition-all border border-fuchsia-500/30"
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiagonalSudokuGame;

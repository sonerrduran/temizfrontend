import React, { useState, useEffect } from 'react';
import { Difficulty } from '../../types';

interface Props {
  difficulty: Difficulty;
  grade: number;
  onComplete: (score: number) => void;
  onExit: () => void;
}

const MiniSudokuGame: React.FC<Props> = ({ difficulty, grade, onComplete, onExit }) => {
  const [grid, setGrid] = useState<(number | null)[][]>(
    Array(6)
      .fill(null)
      .map(() => Array(6).fill(null))
  );
  const [initialGrid, setInitialGrid] = useState<boolean[][]>(
    Array(6)
      .fill(null)
      .map(() => Array(6).fill(false))
  );
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  useEffect(() => {
    const demoGrid = Array(6)
      .fill(null)
      .map(() => Array(6).fill(null));
    demoGrid[0][0] = 1;
    demoGrid[2][3] = 4;
    demoGrid[5][5] = 6;
    setGrid(demoGrid);

    const initFlags = Array(6)
      .fill(null)
      .map(() => Array(6).fill(false));
    initFlags[0][0] = true;
    initFlags[2][3] = true;
    initFlags[5][5] = true;
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

  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-6">
        <button
          onClick={onExit}
          className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
        >
          ⬅ Çıkış
        </button>
        <h2 className="text-3xl font-black text-white">Mini Sudoku (6x6)</h2>
        <div className="w-20"></div>
      </div>

      <div className="bg-slate-900/80 p-6 rounded-3xl border border-white/10 shadow-2xl w-full">
        <div className="grid grid-cols-6 gap-0 bg-slate-800 p-2 rounded-xl mb-6 border-4 border-slate-600 max-w-sm mx-auto">
          {grid.map((row, r) =>
            row.map((val, c) => {
              const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;
              const isInitial = initialGrid[r][c];

              let borderClasses = 'border border-slate-700/50 ';
              // 6x6 means 2x3 blocks (2 rows, 3 cols)
              if (c > 0 && c % 3 === 0) borderClasses += 'border-l-2 border-l-slate-400 ';
              if (r > 0 && r % 2 === 0) borderClasses += 'border-t-2 border-t-slate-400 ';

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={`
                             aspect-square flex items-center justify-center text-xl md:text-3xl font-bold transition-all
                             bg-slate-800 ${borderClasses} 
                             ${isSelected ? 'ring-4 ring-yellow-400 z-10 scale-110 shadow-xl' : ''}
                             ${isInitial ? 'text-white' : 'text-emerald-300'}
                             ${!isInitial && !isSelected ? 'hover:bg-white/10' : ''}
                          `}
                >
                  {val || ''}
                </button>
              );
            })
          )}
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 max-w-sm mx-auto">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              disabled={!selectedCell}
              className="bg-emerald-500/20 hover:bg-emerald-500/40 disabled:opacity-50 text-emerald-100 font-bold py-3 md:py-4 rounded-xl text-xl shadow-lg transition-all active:scale-95 border border-emerald-500/30"
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiniSudokuGame;

import React, { useState, useEffect } from 'react';
import { Difficulty } from '../../../types';

interface Props {
  difficulty: Difficulty;
  grade: number;
  onComplete: (score: number) => void;
  onExit: () => void;
}

const IrregularSudokuGame: React.FC<Props> = ({ difficulty, grade, onComplete, onExit }) => {
  // Similar to Jigsaw, but specifically standard "Irregular" shapes.
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
  const [regions, setRegions] = useState<number[][]>([]);

  useEffect(() => {
    // A distinct set of irregular shapes
    const demoRegions = [
      [0, 0, 0, 0, 0, 1, 1, 1, 2],
      [0, 3, 3, 0, 1, 1, 1, 2, 2],
      [0, 3, 3, 4, 4, 1, 5, 2, 2],
      [0, 3, 3, 4, 4, 5, 5, 5, 2],
      [6, 3, 4, 4, 4, 4, 5, 2, 2],
      [6, 6, 7, 4, 8, 8, 5, 5, 2],
      [6, 6, 7, 7, 8, 8, 8, 5, 2],
      [6, 6, 7, 7, 7, 8, 8, 8, 5],
      [6, 7, 7, 7, 7, 8, 8, 8, 5],
    ];
    setRegions(demoRegions);

    const demoGrid = Array(9)
      .fill(null)
      .map(() => Array(9).fill(null));
    demoGrid[0][5] = 4;
    demoGrid[4][4] = 9;
    demoGrid[8][0] = 7;
    setGrid(demoGrid);

    const initFlags = Array(9)
      .fill(null)
      .map(() => Array(9).fill(false));
    initFlags[0][5] = true;
    initFlags[4][4] = true;
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

  const regionColors = [
    'bg-rose-500/20',
    'bg-cyan-500/20',
    'bg-emerald-500/20',
    'bg-amber-500/20',
    'bg-violet-500/20',
    'bg-fuchsia-500/20',
    'bg-lime-500/20',
    'bg-sky-500/20',
    'bg-orange-500/20',
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-6">
        <button
          onClick={onExit}
          className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
        >
          ⬅ Çıkış
        </button>
        <h2 className="text-3xl font-black text-white">Irregular Sudoku</h2>
        <div className="w-20"></div>
      </div>

      <div className="bg-slate-900/80 p-6 rounded-3xl border border-white/10 shadow-2xl">
        <div className="grid grid-cols-9 gap-0 bg-slate-800 p-2 rounded-xl mb-6 border-4 border-slate-600">
          {grid.map((row, r) =>
            row.map((val, c) => {
              const regionId = regions.length > 0 ? regions[r][c] : 0;
              const bgColor = regionColors[regionId];
              const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;
              const isInitial = initialGrid[r][c];

              let borderClasses = 'border border-slate-700/30 ';
              if (regions.length > 0) {
                if (r > 0 && regions[r - 1][c] !== regionId)
                  borderClasses += 'border-t-[3px] border-t-white/80 ';
                if (r < 8 && regions[r + 1][c] !== regionId)
                  borderClasses += 'border-b-[3px] border-b-white/80 ';
                if (c > 0 && regions[r][c - 1] !== regionId)
                  borderClasses += 'border-l-[3px] border-l-white/80 ';
                if (c < 8 && regions[r][c + 1] !== regionId)
                  borderClasses += 'border-r-[3px] border-r-white/80 ';
              }

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={`
                             w-8 h-8 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-2xl font-bold transition-all
                             ${bgColor} ${borderClasses} 
                             ${isSelected ? 'ring-4 ring-white z-10 scale-110 shadow-xl' : ''}
                             ${isInitial ? 'text-white' : 'text-yellow-300'}
                             ${!isInitial && !isSelected ? 'hover:bg-white/10' : ''}
                          `}
                >
                  {val || ''}
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
              className="bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white font-bold py-3 md:py-4 rounded-xl text-xl shadow-lg transition-all active:scale-95"
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IrregularSudokuGame;

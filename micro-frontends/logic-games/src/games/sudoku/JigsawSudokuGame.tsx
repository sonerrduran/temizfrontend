import React, { useState, useEffect } from 'react';
import { Difficulty } from '../../types';

interface Props {
  difficulty: Difficulty;
  grade: number;
  onComplete: (score: number) => void;
  onExit: () => void;
}

const JigsawSudokuGame: React.FC<Props> = ({ difficulty, grade, onComplete, onExit }) => {
  // Simplified placeholder grid for Jigsaw Sudoku 9x9
  // In a real game, 'regions' array defines the arbitrary jigsaw shapes
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
    // Generate a static puzzle for demo purposes
    // Regions: 0 to 8 represent different puzzle piece shapes instead of 3x3 boxes
    const demoRegions = [
      [0, 0, 0, 1, 1, 1, 2, 2, 2],
      [0, 0, 0, 1, 1, 1, 2, 2, 2],
      [0, 0, 0, 1, 1, 1, 2, 2, 2],
      [3, 3, 3, 4, 4, 4, 5, 5, 5],
      [3, 3, 3, 4, 4, 4, 5, 5, 5],
      [3, 3, 3, 4, 4, 4, 5, 5, 5],
      [6, 6, 6, 7, 7, 7, 8, 8, 8],
      [6, 6, 6, 7, 7, 7, 8, 8, 8],
      [6, 6, 6, 7, 7, 7, 8, 8, 8],
    ];
    // Modify slightly to make it "Jigsaw" looking
    demoRegions[1][3] = 0;
    demoRegions[1][4] = 0;
    demoRegions[3][1] = 4;
    demoRegions[4][1] = 4;

    setRegions(demoRegions);

    const demoGrid = Array(9)
      .fill(null)
      .map(() => Array(9).fill(null));
    demoGrid[0][0] = 5;
    demoGrid[4][4] = 1;
    demoGrid[8][8] = 9;

    setGrid(demoGrid);

    const initFlags = Array(9)
      .fill(null)
      .map(() => Array(9).fill(false));
    initFlags[0][0] = true;
    initFlags[4][4] = true;
    initFlags[8][8] = true;
    setInitialGrid(initFlags);
  }, [difficulty]);

  const handleCellClick = (r: number, c: number) => {
    if (!initialGrid[r][c]) {
      setSelectedCell([r, c]);
    }
  };

  const handleNumberClick = (num: number) => {
    if (selectedCell) {
      const [r, c] = selectedCell;
      const newGrid = [...grid.map((row) => [...row])];
      newGrid[r][c] = num;
      setGrid(newGrid);

      checkWin(newGrid);
    }
  };

  const checkWin = (currentGrid: (number | null)[][]) => {
    let isComplete = true;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (currentGrid[r][c] === null) isComplete = false;
      }
    }

    if (isComplete) {
      onComplete(100);
    }
  };

  // Assign distinct colors to the 9 jigsaw regions for visualization
  const regionColors = [
    'bg-red-500/20',
    'bg-blue-500/20',
    'bg-green-500/20',
    'bg-yellow-500/20',
    'bg-purple-500/20',
    'bg-pink-500/20',
    'bg-indigo-500/20',
    'bg-teal-500/20',
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
        <h2 className="text-3xl font-black text-white">Jigsaw Sudoku</h2>
        <div className="w-20"></div>
      </div>

      <div className="bg-slate-900/80 p-6 rounded-3xl border border-white/10 shadow-2xl">
        <div className="grid grid-cols-9 gap-1 bg-slate-800 p-2 rounded-xl mb-6 border border-slate-700">
          {grid.map((row, r) =>
            row.map((val, c) => {
              const regionId = regions.length > 0 ? regions[r][c] : 0;
              const bgColor = regionColors[regionId % 9];
              const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;
              const isInitial = initialGrid[r][c];

              // Determine borders for jigsaw shapes
              let borderClasses = 'border border-slate-700/30 ';
              if (regions.length > 0) {
                if (r > 0 && regions[r - 1][c] !== regionId)
                  borderClasses += 'border-t-[3px] border-t-white/60 ';
                if (r < 8 && regions[r + 1][c] !== regionId)
                  borderClasses += 'border-b-[3px] border-b-white/60 ';
                if (c > 0 && regions[r][c - 1] !== regionId)
                  borderClasses += 'border-l-[3px] border-l-white/60 ';
                if (c < 8 && regions[r][c + 1] !== regionId)
                  borderClasses += 'border-r-[3px] border-r-white/60 ';
              }

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={`
                             w-8 h-8 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-2xl font-bold transition-all
                             ${bgColor} ${borderClasses} 
                             ${isSelected ? 'ring-4 ring-yellow-400 z-10 scale-110 shadow-xl' : ''}
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
          <button
            onClick={() => handleNumberClick(null as any)}
            disabled={!selectedCell}
            className="col-span-1 md:col-span-9 bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/30 font-bold py-2 md:py-3 rounded-xl shadow-lg transition-all active:scale-95 text-lg"
          >
            SİL
          </button>
        </div>
      </div>
    </div>
  );
};

export default JigsawSudokuGame;

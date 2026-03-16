import React, { useState, useEffect } from 'react';
import { Difficulty } from '../../types';

interface Props {
  difficulty: Difficulty;
  grade: number;
  onComplete: (score: number) => void;
  onExit: () => void;
}

const HexSudokuGame: React.FC<Props> = ({ difficulty, grade, onComplete, onExit }) => {
  const [grid, setGrid] = useState<(string | null)[][]>(
    Array(16)
      .fill(null)
      .map(() => Array(16).fill(null))
  );
  const [initialGrid, setInitialGrid] = useState<boolean[][]>(
    Array(16)
      .fill(null)
      .map(() => Array(16).fill(false))
  );
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  const symbols = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', '0']; // Standard 16x16 notation

  useEffect(() => {
    const demoGrid = Array(16)
      .fill(null)
      .map(() => Array(16).fill(null));
    demoGrid[0][0] = '1';
    demoGrid[8][8] = 'A';
    demoGrid[15][15] = 'F';
    setGrid(demoGrid);

    const initFlags = Array(16)
      .fill(null)
      .map(() => Array(16).fill(false));
    initFlags[0][0] = true;
    initFlags[8][8] = true;
    initFlags[15][15] = true;
    setInitialGrid(initFlags);
  }, [difficulty]);

  const handleCellClick = (r: number, c: number) => {
    if (!initialGrid[r][c]) setSelectedCell([r, c]);
  };

  const handleSymbolClick = (sym: string) => {
    if (selectedCell) {
      const [r, c] = selectedCell;
      const newGrid = [...grid.map((row) => [...row])];
      newGrid[r][c] = sym;
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
    <div className="w-full max-w-6xl mx-auto p-4 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-6">
        <button
          onClick={onExit}
          className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
        >
          ⬅ Çıkış
        </button>
        <h2 className="text-3xl font-black text-white">Hexadoku (16x16)</h2>
        <div className="w-20"></div>
      </div>

      <div className="bg-slate-900/80 p-4 rounded-3xl border border-white/10 shadow-2xl w-full overflow-x-auto">
        <div className="min-w-[500px]">
          <div
            className="grid grid-cols-16 gap-0 bg-slate-800 p-1 rounded-xl mb-6 border-2 border-slate-600"
            style={{ gridTemplateColumns: 'repeat(16, minmax(0, 1fr))' }}
          >
            {grid.map((row, r) =>
              row.map((val, c) => {
                const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;
                const isInitial = initialGrid[r][c];

                let borderClasses = 'border border-slate-700/30 ';
                if (c > 0 && c % 4 === 0) borderClasses += 'border-l-2 border-l-slate-400 ';
                if (r > 0 && r % 4 === 0) borderClasses += 'border-t-2 border-t-slate-400 ';

                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    className={`
                             aspect-square flex items-center justify-center text-xs md:text-sm lg:text-base font-bold transition-all
                             bg-slate-800 ${borderClasses} 
                             ${isSelected ? 'bg-orange-500/30 ring-2 ring-orange-400 z-10' : ''}
                             ${isInitial ? 'text-white' : 'text-orange-300'}
                             ${!isInitial && !isSelected ? 'hover:bg-white/10' : ''}
                          `}
                  >
                    {val || ''}
                  </button>
                );
              })
            )}
          </div>

          <div className="grid grid-cols-8 gap-2">
            {symbols.map((sym) => (
              <button
                key={sym}
                onClick={() => handleSymbolClick(sym)}
                disabled={!selectedCell}
                className="bg-orange-500/20 hover:bg-orange-500/40 disabled:opacity-50 text-orange-100 font-bold py-2 md:py-3 rounded-lg text-sm md:text-base shadow-lg transition-all active:scale-95 border border-orange-500/30"
              >
                {sym}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HexSudokuGame;

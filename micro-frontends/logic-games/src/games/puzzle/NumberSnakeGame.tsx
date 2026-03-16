import React, { useState, useEffect } from 'react';
import { Difficulty } from '../../types';

interface Props {
  difficulty: Difficulty;
  grade: number;
  onComplete: (score: number) => void;
  onExit: () => void;
}

const NumberSnakeGame: React.FC<Props> = ({ difficulty, grade, onComplete, onExit }) => {
  // 5x5 Grid for a simple snake
  const [grid, setGrid] = useState<(number | null)[][]>(
    Array(5)
      .fill(null)
      .map(() => Array(5).fill(null))
  );
  const [initialGrid, setInitialGrid] = useState<boolean[][]>(
    Array(5)
      .fill(null)
      .map(() => Array(5).fill(false))
  );
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Generate a basic 5x5 snake base
    const demoGrid = Array(5)
      .fill(null)
      .map(() => Array(5).fill(null));
    demoGrid[0][0] = 1;
    demoGrid[4][4] = 25;
    demoGrid[2][2] = 13;
    setGrid(demoGrid);

    const initFlags = Array(5)
      .fill(null)
      .map(() => Array(5).fill(false));
    initFlags[0][0] = true;
    initFlags[4][4] = true;
    initFlags[2][2] = true;
    setInitialGrid(initFlags);
  }, [difficulty]);

  const handleCellClick = (r: number, c: number) => {
    if (!initialGrid[r][c]) setSelectedCell([r, c]);
  };

  const clearCell = () => {
    if (selectedCell) {
      const [r, c] = selectedCell;
      const newGrid = [...grid.map((row) => [...row])];
      newGrid[r][c] = null;
      setGrid(newGrid);
    }
  };

  // Keyboard support for typing multi-digit numbers would be added here in a full implementation.
  // We'll provide a 1-25 button keypad for simplicity in this demo.

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-6">
        <button
          onClick={onExit}
          className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
        >
          ⬅ Çıkış
        </button>
        <h2 className="text-3xl font-black text-white">Sayı Yılanı</h2>
        <div className="w-20"></div>
      </div>

      <div className="bg-slate-900/80 p-6 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center">
        <p className="text-sm text-white/60 mb-6 text-center max-w-md">
          1'den 25'e kadar (yatay veya dikey olarak bitişik hücreleri) takip eden bir yol oluşturun.
        </p>

        <div className="grid grid-cols-5 gap-1 bg-slate-800 p-2 rounded-xl mb-6 shadow-inner w-full max-w-sm">
          {grid.map((row, r) =>
            row.map((val, c) => {
              const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;
              const isInitial = initialGrid[r][c];

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={`
                             aspect-square flex items-center justify-center text-xl md:text-2xl font-black transition-all rounded-lg
                             ${isSelected ? 'bg-indigo-500/80 ring-4 ring-indigo-300 z-10 scale-110 shadow-xl' : 'bg-slate-700 border-2 border-slate-600'}
                             ${isInitial ? 'text-white' : 'text-indigo-300'}
                             ${!isInitial && !isSelected ? 'hover:bg-slate-600' : ''}
                          `}
                >
                  {val || ''}
                </button>
              );
            })
          )}
        </div>

        <button
          onClick={clearCell}
          disabled={!selectedCell}
          className="px-6 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg mb-4 hover:bg-red-500/40 transition-colors"
        >
          Seçili Hücreyi Sil
        </button>

        <div className="grid grid-cols-5 gap-2 w-full max-w-md">
          {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => {
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
              }}
              disabled={!selectedCell}
              className="bg-indigo-500/20 hover:bg-indigo-500/40 disabled:opacity-50 text-indigo-100 font-bold py-2 rounded-lg text-sm shadow-lg transition-all active:scale-95 border border-indigo-500/30"
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NumberSnakeGame;

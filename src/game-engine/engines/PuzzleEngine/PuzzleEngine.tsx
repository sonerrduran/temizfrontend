import React, { useState } from 'react';
import { GameEngineProps, GameResults } from '../../types/engine.types';

interface PuzzleDataset {
  grid: number[][];
  solution: number[][];
  config: {
    size: number;
    difficulty: string;
  };
}

export default function PuzzleEngine({ dataset, onComplete, onExit }: GameEngineProps) {
  const puzzleData = dataset.data as PuzzleDataset;
  const [grid, setGrid] = useState<(number | null)[][]>(
    puzzleData.grid.map((row) => row.map((cell) => (cell === 0 ? null : cell)))
  );
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [startTime] = useState(Date.now());

  const handleCellClick = (row: number, col: number) => {
    if (puzzleData.grid[row][col] !== 0) return; // Can't edit pre-filled cells
    setSelectedCell([row, col]);
  };

  const handleNumberClick = (num: number) => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;

    const newGrid = grid.map((r) => [...r]);
    newGrid[row][col] = num;
    setGrid(newGrid);
  };

  const handleClear = () => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;

    const newGrid = grid.map((r) => [...r]);
    newGrid[row][col] = null;
    setGrid(newGrid);
  };

  const handleCheck = () => {
    const isCorrect = grid.every((row, i) =>
      row.every((cell, j) => cell === puzzleData.solution[i][j])
    );

    const duration = Math.floor((Date.now() - startTime) / 1000);
    const results: GameResults = {
      score: isCorrect ? 100 : 0,
      correctAnswers: isCorrect ? 1 : 0,
      totalQuestions: 1,
      duration,
      attempts: 1,
      hints: 0,
    };

    onComplete(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">{dataset.metadata.name}</h1>
            <p className="text-white/60">Sudoku Bulmacası</p>
          </div>
          <button
            onClick={onExit}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all"
          >
            Çıkış
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Puzzle Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <div className="grid gap-1 bg-white/20 p-1 rounded-xl">
                {grid.map((row, i) => (
                  <div key={i} className="grid grid-cols-9 gap-1">
                    {row.map((cell, j) => (
                      <button
                        key={j}
                        onClick={() => handleCellClick(i, j)}
                        disabled={puzzleData.grid[i][j] !== 0}
                        className={`aspect-square flex items-center justify-center text-xl font-bold rounded transition-all ${
                          puzzleData.grid[i][j] !== 0
                            ? 'bg-white/30 text-white cursor-not-allowed'
                            : selectedCell?.[0] === i && selectedCell?.[1] === j
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {cell || ''}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Number Pad */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
              <h3 className="text-white font-bold mb-4">Sayılar</h3>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleNumberClick(num)}
                    className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-white font-bold text-2xl transition-all"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleClear}
              className="w-full py-3 bg-red-500 hover:bg-red-600 rounded-xl text-white font-bold transition-all"
            >
              Temizle
            </button>

            <button
              onClick={handleCheck}
              className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-xl text-white font-bold transition-all"
            >
              Kontrol Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

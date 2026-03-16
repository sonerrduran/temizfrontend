import React, { useState } from 'react';
import { GameEngineProps, GameResults } from '../../types/engine.types';

interface LogicClue {
  id: string;
  text: string;
}

interface LogicPuzzleDataset {
  scenario: string;
  clues: LogicClue[];
  grid: {
    rows: string[];
    cols: string[];
  };
  solution: Record<string, string>;
  config: {
    showHints?: boolean;
  };
}

export default function LogicPuzzleEngine({ dataset, onComplete, onExit }: GameEngineProps) {
  const puzzleData = dataset.data as LogicPuzzleDataset;
  const [grid, setGrid] = useState<Record<string, string>>({});
  const [startTime] = useState(Date.now());

  const handleCellClick = (row: string, col: string) => {
    const key = `${row}-${col}`;
    const current = grid[key];

    // Cycle through: empty -> X -> ✓ -> empty
    const next = current === '✓' ? '' : current === 'X' ? '✓' : 'X';

    setGrid((prev) => ({ ...prev, [key]: next }));
  };

  const handleCheck = () => {
    const correctCount = Object.entries(puzzleData.solution).filter(
      ([key, value]) => grid[key] === value
    ).length;

    const duration = Math.floor((Date.now() - startTime) / 1000);
    const results: GameResults = {
      score: Math.round((correctCount / Object.keys(puzzleData.solution).length) * 100),
      correctAnswers: correctCount,
      totalQuestions: Object.keys(puzzleData.solution).length,
      duration,
      attempts: 1,
      hints: 0,
    };

    onComplete(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">{dataset.metadata.name}</h1>
            <p className="text-white/60">Mantık Bulmacası</p>
          </div>
          <button
            onClick={onExit}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all"
          >
            Çıkış
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Clues */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">İpuçları</h3>
              <div className="space-y-3">
                {puzzleData.clues.map((clue, index) => (
                  <div key={clue.id} className="bg-white/5 rounded-xl p-3">
                    <div className="text-violet-400 font-bold text-sm mb-1">İpucu {index + 1}</div>
                    <div className="text-white/80 text-sm">{clue.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Logic Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Mantık Tablosu</h3>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 border border-white/20"></th>
                      {puzzleData.grid.cols.map((col) => (
                        <th key={col} className="p-2 border border-white/20 text-white text-sm">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {puzzleData.grid.rows.map((row) => (
                      <tr key={row}>
                        <td className="p-2 border border-white/20 text-white text-sm font-bold">
                          {row}
                        </td>
                        {puzzleData.grid.cols.map((col) => {
                          const key = `${row}-${col}`;
                          const value = grid[key] || '';
                          return (
                            <td key={col} className="p-2 border border-white/20">
                              <button
                                onClick={() => handleCellClick(row, col)}
                                className="w-full h-12 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-2xl transition-all"
                              >
                                {value === '✓' && <span className="text-green-400">✓</span>}
                                {value === 'X' && <span className="text-red-400">X</span>}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex gap-4">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <span className="text-green-400 text-xl">✓</span>
                  <span>Doğru</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <span className="text-red-400 text-xl">X</span>
                  <span>Yanlış</span>
                </div>
              </div>

              <button
                onClick={handleCheck}
                className="w-full mt-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 rounded-xl text-white font-bold transition-all"
              >
                Kontrol Et
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

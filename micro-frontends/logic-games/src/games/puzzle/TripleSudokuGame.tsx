import React, { useState, useEffect } from 'react';

interface TripleSudokuGameProps {
  onBack: () => void;
}

const TripleSudokuGame: React.FC<TripleSudokuGameProps> = ({ onBack }) => {
  const [grids, setGrids] = useState<number[][][]>([]);
  const [solutions, setSolutions] = useState<number[][][]>([]);
  const [initialGrids, setInitialGrids] = useState<number[][][]>([]);
  const [selectedCell, setSelectedCell] = useState<{
    grid: number;
    row: number;
    col: number;
  } | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    generatePuzzle();
  }, []);

  useEffect(() => {
    if (!isComplete) {
      const timer = setInterval(() => setTime((t) => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isComplete]);

  const generatePuzzle = () => {
    // Generate 3 overlapping 9x9 Sudoku grids
    const newSolutions: number[][][] = [];

    for (let g = 0; g < 3; g++) {
      const solution: number[][] = Array(9)
        .fill(0)
        .map(() => Array(9).fill(0));
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          solution[i][j] = ((i * 3 + Math.floor(i / 3) + j + g * 2) % 9) + 1;
        }
      }
      newSolutions.push(solution);
    }

    // Create puzzles
    const newGrids: number[][][] = newSolutions.map((sol) => sol.map((row) => [...row]));

    // Remove cells from each grid
    for (let g = 0; g < 3; g++) {
      const cellsToRemove = 45;
      let removed = 0;

      while (removed < cellsToRemove) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (newGrids[g][row][col] !== 0) {
          newGrids[g][row][col] = 0;
          removed++;
        }
      }
    }

    setGrids(newGrids);
    setSolutions(newSolutions);
    setInitialGrids(newGrids.map((grid) => grid.map((row) => [...row])));
    setMistakes(0);
    setTime(0);
    setIsComplete(false);
  };

  const handleCellClick = (gridIdx: number, row: number, col: number) => {
    if (initialGrids[gridIdx][row][col] === 0) {
      setSelectedCell({ grid: gridIdx, row, col });
    }
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell) return;

    const { grid: gridIdx, row, col } = selectedCell;
    if (initialGrids[gridIdx][row][col] !== 0) return;

    const newGrids = grids.map((g) => g.map((r) => [...r]));
    newGrids[gridIdx][row][col] = num;
    setGrids(newGrids);

    if (num !== 0 && num !== solutions[gridIdx][row][col]) {
      setMistakes((m) => m + 1);
    }

    checkCompletion(newGrids);
  };

  const checkCompletion = (currentGrids: number[][][]) => {
    for (let g = 0; g < 3; g++) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (currentGrids[g][i][j] !== solutions[g][i][j]) return;
        }
      }
    }
    setIsComplete(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all backdrop-blur-sm border border-white/20"
          >
            ⬅ GERİ DÖN
          </button>
          <h1 className="text-3xl md:text-4xl font-black text-white">Üçlü Sudoku</h1>
          <div className="w-24"></div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-white/70 text-sm">Süre</div>
            <div className="text-2xl font-bold text-white">{formatTime(time)}</div>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-white/70 text-sm">Hatalar</div>
            <div className="text-2xl font-bold text-white">{mistakes}</div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-300/30 rounded-xl p-4 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-white font-bold mb-2">📖 Nasıl Oynanır?</h3>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• 3 ayrı Sudoku tahtası yan yana</li>
                  <li>• Her tahta klasik Sudoku kurallarına uyar</li>
                  <li>• Her satır, sütun ve 3x3 bölgede 1-9 arası sayılar</li>
                  <li>• 3 tahtayı da tamamlayın!</li>
                </ul>
              </div>
              <button
                onClick={() => setShowInstructions(false)}
                className="text-white/70 hover:text-white ml-4"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Game Boards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {grids.map((grid, gridIdx) => (
            <div
              key={gridIdx}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
            >
              <h3 className="text-white font-bold mb-3 text-center">Tahta {gridIdx + 1}</h3>
              <div className="inline-block">
                {grid.map((row, i) => (
                  <div key={i} className="flex">
                    {row.map((cell, j) => (
                      <button
                        key={j}
                        onClick={() => handleCellClick(gridIdx, i, j)}
                        className={`w-8 h-8 md:w-9 md:h-9 border font-bold text-sm md:text-base transition-all ${
                          initialGrids[gridIdx][i][j] !== 0
                            ? 'bg-blue-200/50 text-blue-900 cursor-default'
                            : cell === 0
                              ? 'bg-white/90 text-gray-800 hover:bg-blue-100'
                              : cell === solutions[gridIdx][i][j]
                                ? 'bg-green-200/50 text-green-900'
                                : 'bg-red-200/50 text-red-900'
                        } ${
                          selectedCell?.grid === gridIdx &&
                          selectedCell?.row === i &&
                          selectedCell?.col === j
                            ? 'ring-2 ring-yellow-400'
                            : ''
                        } ${
                          j % 3 === 2 && j < 8
                            ? 'border-r-2 border-r-gray-800'
                            : 'border-r-gray-400'
                        } ${
                          i % 3 === 2 && i < 8
                            ? 'border-b-2 border-b-gray-800'
                            : 'border-b-gray-400'
                        }`}
                      >
                        {cell !== 0 ? cell : ''}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberInput(num)}
              className="py-4 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold text-xl transition-all backdrop-blur-sm border border-white/20"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleNumberInput(0)}
            className="py-4 bg-red-500/30 hover:bg-red-500/40 rounded-xl text-white font-bold transition-all backdrop-blur-sm border border-red-300/30"
          >
            Sil
          </button>
        </div>

        {/* New Game Button */}
        <button
          onClick={generatePuzzle}
          className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl text-white font-bold text-lg transition-all shadow-lg"
        >
          🎲 Yeni Oyun
        </button>

        {/* Completion Modal */}
        {isComplete && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-black text-white mb-4">İnanılmaz!</h2>
              <p className="text-white/90 mb-6">
                Üçlü Sudoku'yu {formatTime(time)} sürede, {mistakes} hata ile tamamladınız!
              </p>
              <div className="flex gap-3">
                <button
                  onClick={generatePuzzle}
                  className="flex-1 py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-all"
                >
                  Yeni Oyun
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all"
                >
                  Menüye Dön
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripleSudokuGame;

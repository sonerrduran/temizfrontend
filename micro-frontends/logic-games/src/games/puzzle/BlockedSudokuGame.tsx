import React, { useState, useEffect } from 'react';

interface BlockedSudokuGameProps {
  onBack: () => void;
}

const BlockedSudokuGame: React.FC<BlockedSudokuGameProps> = ({ onBack }) => {
  const [level, setLevel] = useState(1);
  const [grid, setGrid] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [initialGrid, setInitialGrid] = useState<number[][]>([]);
  const [blockedCells, setBlockedCells] = useState<boolean[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showLevelSelect, setShowLevelSelect] = useState(true);

  const levels = [
    { name: 'Kolay', blockedCount: 10, cellsToRemove: 35 },
    { name: 'Orta', blockedCount: 15, cellsToRemove: 40 },
    { name: 'Zor', blockedCount: 20, cellsToRemove: 45 },
    { name: 'Çok Zor', blockedCount: 25, cellsToRemove: 50 },
    { name: 'Uzman', blockedCount: 30, cellsToRemove: 55 },
  ];

  const currentLevel = levels[level - 1];

  useEffect(() => {
    if (!showLevelSelect) {
      generatePuzzle();
    }
  }, [showLevelSelect, level]);

  useEffect(() => {
    if (!isComplete && !showLevelSelect) {
      const timer = setInterval(() => setTime((t) => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isComplete, showLevelSelect]);

  const generatePuzzle = () => {
    // Generate a valid 9x9 Sudoku solution
    const newSolution: number[][] = Array(9)
      .fill(0)
      .map(() => Array(9).fill(0));

    // Simple solution pattern
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        newSolution[i][j] = ((i * 3 + Math.floor(i / 3) + j) % 9) + 1;
      }
    }

    // Mark some cells as blocked (gray cells that can't be filled)
    const newBlockedCells: boolean[][] = Array(9)
      .fill(0)
      .map(() => Array(9).fill(false));
    const blockedCount = currentLevel.blockedCount;
    let blocked = 0;

    while (blocked < blockedCount) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (!newBlockedCells[row][col]) {
        newBlockedCells[row][col] = true;
        blocked++;
      }
    }

    // Create puzzle with some cells filled
    const newGrid = newSolution.map((row) => [...row]);
    const cellsToRemove = currentLevel.cellsToRemove;
    let removed = 0;

    while (removed < cellsToRemove) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (newGrid[row][col] !== 0 && !newBlockedCells[row][col]) {
        newGrid[row][col] = 0;
        removed++;
      }
    }

    setGrid(newGrid);
    setSolution(newSolution);
    setInitialGrid(newGrid.map((row) => [...row]));
    setBlockedCells(newBlockedCells);
    setMistakes(0);
    setTime(0);
    setIsComplete(false);
    setSelectedCell(null);
  };

  const handleCellClick = (row: number, col: number) => {
    if (initialGrid[row][col] === 0 && !blockedCells[row][col]) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    if (initialGrid[row][col] !== 0 || blockedCells[row][col]) return;

    const newGrid = grid.map((r) => [...r]);
    newGrid[row][col] = num;
    setGrid(newGrid);

    if (num !== 0 && num !== solution[row][col]) {
      setMistakes((m) => m + 1);
    }

    checkCompletion(newGrid);
  };

  const checkCompletion = (currentGrid: number[][]) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (!blockedCells[i][j] && currentGrid[i][j] !== solution[i][j]) return;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-zinc-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {showLevelSelect ? (
          // Level Selection Screen
          <div className="text-center">
            <button
              onClick={onBack}
              className="mb-6 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all"
            >
              ⬅ GERİ DÖN
            </button>
            <h2 className="text-5xl font-black text-white mb-4">Bloklu Sudoku</h2>
            <p className="text-white/80 mb-8">Seviye Seç</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {levels.map((lvl, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setLevel(idx + 1);
                    setShowLevelSelect(false);
                  }}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-white transition-all hover:scale-105 border-2 border-white/20"
                >
                  <div className="text-4xl mb-2">🔢</div>
                  <div className="text-2xl font-bold mb-2">Seviye {idx + 1}</div>
                  <div className="text-sm opacity-80">{lvl.name}</div>
                  <div className="text-xs opacity-60 mt-2">{lvl.blockedCount} blok</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowLevelSelect(true)}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all backdrop-blur-sm border border-white/20"
              >
                ⬅ GERİ DÖN
              </button>
              <h1 className="text-3xl md:text-4xl font-black text-white">
                Bloklu Sudoku - Seviye {level}
              </h1>
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
                      <li>• Klasik Sudoku kuralları geçerlidir</li>
                      <li>• Gri hücreler blokludur - doldurulamaz</li>
                      <li>• Her satır, sütun ve 3x3 bölgede 1-9 arası sayılar</li>
                      <li>• Bloklu hücreler sayılmaz</li>
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

            {/* Game Board */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
              <div className="inline-block">
                {grid.map((row, i) => (
                  <div key={i} className="flex">
                    {row.map((cell, j) => (
                      <button
                        key={j}
                        onClick={() => handleCellClick(i, j)}
                        disabled={blockedCells[i][j]}
                        className={`w-10 h-10 md:w-12 md:h-12 border font-bold text-lg md:text-xl transition-all ${
                          blockedCells[i][j]
                            ? 'bg-gray-700/80 cursor-not-allowed border-gray-600'
                            : initialGrid[i][j] !== 0
                              ? 'bg-blue-200/50 text-blue-900 cursor-default'
                              : cell === 0
                                ? 'bg-white/90 text-gray-800 hover:bg-blue-100'
                                : cell === solution[i][j]
                                  ? 'bg-green-200/50 text-green-900'
                                  : 'bg-red-200/50 text-red-900'
                        } ${
                          selectedCell?.row === i && selectedCell?.col === j
                            ? 'ring-4 ring-yellow-400'
                            : ''
                        } ${
                          j % 3 === 2 && j < 8
                            ? 'border-r-4 border-r-gray-800'
                            : 'border-r-gray-400'
                        } ${
                          i % 3 === 2 && i < 8
                            ? 'border-b-4 border-b-gray-800'
                            : 'border-b-gray-400'
                        }`}
                      >
                        {blockedCells[i][j] ? '⬛' : cell !== 0 ? cell : ''}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
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
                  <h2 className="text-3xl font-black text-white mb-4">Tebrikler!</h2>
                  <p className="text-white/90 mb-6">
                    Bloklu Sudoku'yu {formatTime(time)} sürede, {mistakes} hata ile tamamladınız!
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={generatePuzzle}
                      className="flex-1 py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-all"
                    >
                      Yeni Oyun
                    </button>
                    <button
                      onClick={() => {
                        if (level < levels.length) {
                          setLevel(level + 1);
                          setIsComplete(false);
                          generatePuzzle();
                        } else {
                          setShowLevelSelect(true);
                        }
                      }}
                      className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all"
                    >
                      {level < levels.length ? 'Sonraki →' : 'Seviye Seç'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlockedSudokuGame;

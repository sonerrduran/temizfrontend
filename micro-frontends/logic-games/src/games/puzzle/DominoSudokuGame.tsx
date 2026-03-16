import React, { useState, useEffect } from 'react';

interface DominoSudokuGameProps {
  onBack: () => void;
}

const DominoSudokuGame: React.FC<DominoSudokuGameProps> = ({ onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showLevelSelect, setShowLevelSelect] = useState(true);
  const [grid, setGrid] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [initialGrid, setInitialGrid] = useState<number[][]>([]);
  const [dominoes, setDominoes] = useState<{ row: number; col: number; horizontal: boolean }[]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const levels = [
    { level: 1, name: 'Başlangıç', cellsToRemove: 25, description: 'Çok kolay bulmaca' },
    { level: 2, name: 'Kolay', cellsToRemove: 32, description: 'Kolay bulmaca' },
    { level: 3, name: 'Orta', cellsToRemove: 40, description: 'Orta zorluk' },
    { level: 4, name: 'Zor', cellsToRemove: 48, description: 'Zorlu bulmaca' },
    { level: 5, name: 'Uzman', cellsToRemove: 54, description: 'Uzman seviye' },
  ];

  useEffect(() => {
    if (!showLevelSelect) {
      generatePuzzle();
    }
  }, [showLevelSelect, currentLevel]);

  useEffect(() => {
    if (!isComplete) {
      const timer = setInterval(() => setTime((t) => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isComplete]);

  const generatePuzzle = () => {
    const levelConfig = levels[currentLevel - 1];
    // Generate a valid 8x8 Sudoku solution with domino constraints
    const newSolution: number[][] = Array(8)
      .fill(0)
      .map(() => Array(8).fill(0));

    // Simple solution pattern
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        newSolution[i][j] = ((i * 3 + j) % 8) + 1;
      }
    }

    // Generate domino borders (2x1 regions)
    const newDominoes: { row: number; col: number; horizontal: boolean }[] = [];
    const used = Array(8)
      .fill(0)
      .map(() => Array(8).fill(false));

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (!used[i][j]) {
          // Try horizontal domino
          if (j < 7 && !used[i][j + 1] && Math.random() > 0.3) {
            newDominoes.push({ row: i, col: j, horizontal: true });
            used[i][j] = true;
            used[i][j + 1] = true;
          }
          // Try vertical domino
          else if (i < 7 && !used[i + 1][j]) {
            newDominoes.push({ row: i, col: j, horizontal: false });
            used[i][j] = true;
            used[i + 1][j] = true;
          }
          // Fallback horizontal if possible
          else if (j < 7 && !used[i][j + 1]) {
            newDominoes.push({ row: i, col: j, horizontal: true });
            used[i][j] = true;
            used[i][j + 1] = true;
          }
        }
      }
    }

    // Create puzzle with some cells filled
    const newGrid = newSolution.map((row) => [...row]);
    const cellsToRemove = levelConfig.cellsToRemove;
    let removed = 0;

    while (removed < cellsToRemove) {
      const row = Math.floor(Math.random() * 8);
      const col = Math.floor(Math.random() * 8);
      if (newGrid[row][col] !== 0) {
        newGrid[row][col] = 0;
        removed++;
      }
    }

    setGrid(newGrid);
    setSolution(newSolution);
    setInitialGrid(newGrid.map((row) => [...row]));
    setDominoes(newDominoes);
    setMistakes(0);
    setTime(0);
    setIsComplete(false);
  };

  const handleCellClick = (row: number, col: number) => {
    if (initialGrid[row][col] === 0) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    if (initialGrid[row][col] !== 0) return;

    const newGrid = grid.map((r) => [...r]);
    newGrid[row][col] = num;
    setGrid(newGrid);

    if (num !== 0 && num !== solution[row][col]) {
      setMistakes((m) => m + 1);
    }

    checkCompletion(newGrid);
  };

  const checkCompletion = (currentGrid: number[][]) => {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (currentGrid[i][j] !== solution[i][j]) return;
      }
    }
    setIsComplete(true);
  };

  const getDominoBorder = (row: number, col: number): string => {
    let borders = 'border-2 ';

    // Check if this cell is part of a domino
    const domino = dominoes.find(
      (d) =>
        (d.horizontal && d.row === row && (d.col === col || d.col + 1 === col)) ||
        (!d.horizontal && d.col === col && (d.row === row || d.row + 1 === row))
    );

    if (domino) {
      if (domino.horizontal) {
        if (domino.col === col) {
          borders += 'border-l-4 border-l-blue-600 ';
        } else {
          borders += 'border-r-4 border-r-blue-600 ';
        }
      } else {
        if (domino.row === row) {
          borders += 'border-t-4 border-t-blue-600 ';
        } else {
          borders += 'border-b-4 border-b-blue-600 ';
        }
      }
    }

    return borders;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLevelSelect = (level: number) => {
    setCurrentLevel(level);
    setShowLevelSelect(false);
  };

  const handleNextLevel = () => {
    if (currentLevel < levels.length) {
      setCurrentLevel(currentLevel + 1);
      setIsComplete(false);
      generatePuzzle();
    }
  };

  const handleBackToLevels = () => {
    setShowLevelSelect(true);
    setIsComplete(false);
  };

  if (showLevelSelect) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all backdrop-blur-sm border border-white/20"
            >
              ⬅ GERİ DÖN
            </button>
            <h1 className="text-3xl md:text-4xl font-black text-white">Domino Sudoku</h1>
            <div className="w-24"></div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Seviye Seç</h2>
            <p className="text-white/80 text-center mb-6">Domino bölgelerinde Sudoku çöz!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {levels.map((level) => (
                <button
                  key={level.level}
                  onClick={() => handleLevelSelect(level.level)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl p-6 text-left transition-all transform hover:scale-105 border-2 border-white/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-black text-white">Seviye {level.level}</span>
                    <span className="text-3xl">🎲</span>
                  </div>
                  <div className="text-xl font-bold text-blue-100 mb-1">{level.name}</div>
                  <div className="text-white/80">{level.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBackToLevels}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all backdrop-blur-sm border border-white/20"
          >
            ⬅ GERİ DÖN
          </button>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-black text-white">Domino Sudoku</h1>
            <p className="text-blue-200">
              Seviye {currentLevel} - {levels[currentLevel - 1].name}
            </p>
          </div>
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
                  <li>• Her satır ve sütunda 1-8 arası sayılar bir kez bulunmalı</li>
                  <li>• Tahta domino parçalarına (2x1) bölünmüştür</li>
                  <li>• Mavi kalın çizgiler domino sınırlarını gösterir</li>
                  <li>• Her domino içindeki iki sayı farklı olmalı</li>
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
                    className={`w-12 h-12 md:w-14 md:h-14 font-bold text-lg md:text-xl transition-all ${getDominoBorder(
                      i,
                      j
                    )} ${
                      initialGrid[i][j] !== 0
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
                      j % 4 === 3 && j < 7 ? 'border-r-4 border-r-gray-800' : 'border-r-gray-400'
                    } ${
                      i % 4 === 3 && i < 7 ? 'border-b-4 border-b-gray-800' : 'border-b-gray-400'
                    }`}
                  >
                    {cell !== 0 ? cell : ''}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-9 gap-2 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
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
                Seviye {currentLevel}'i {formatTime(time)} sürede, {mistakes} hata ile tamamladınız!
              </p>
              <div className="flex flex-col gap-3">
                {currentLevel < levels.length && (
                  <button
                    onClick={handleNextLevel}
                    className="w-full py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-all"
                  >
                    ➡️ Sonraki Seviye
                  </button>
                )}
                <button
                  onClick={generatePuzzle}
                  className="w-full py-3 bg-white/90 text-orange-600 rounded-xl font-bold hover:bg-white transition-all"
                >
                  🔄 Yeni Bulmaca
                </button>
                <button
                  onClick={handleBackToLevels}
                  className="w-full py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all"
                >
                  📋 Seviye Seçimi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DominoSudokuGame;

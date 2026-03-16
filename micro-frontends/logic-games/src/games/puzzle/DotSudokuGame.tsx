import React, { useState, useEffect } from 'react';

interface DotSudokuGameProps {
  onBack: () => void;
}

type DotType = 'white' | 'black' | null;

const DotSudokuGame: React.FC<DotSudokuGameProps> = ({ onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showLevelSelect, setShowLevelSelect] = useState(true);
  const [grid, setGrid] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [initialGrid, setInitialGrid] = useState<number[][]>([]);
  const [dots, setDots] = useState<DotType[][][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const levels = [
    { level: 1, name: 'Başlangıç', cellsToRemove: 12, description: 'Çok kolay bulmaca' },
    { level: 2, name: 'Kolay', cellsToRemove: 16, description: 'Kolay bulmaca' },
    { level: 3, name: 'Orta', cellsToRemove: 20, description: 'Orta zorluk' },
    { level: 4, name: 'Zor', cellsToRemove: 24, description: 'Zorlu bulmaca' },
    { level: 5, name: 'Uzman', cellsToRemove: 28, description: 'Uzman seviye' },
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
    // Generate a valid 6x6 Sudoku solution
    const newSolution: number[][] = Array(6)
      .fill(0)
      .map(() => Array(6).fill(0));

    // Simple solution pattern
    const base = [1, 2, 3, 4, 5, 6];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        newSolution[i][j] = ((i * 2 + Math.floor(i / 2) + j) % 6) + 1;
      }
    }

    // Generate dots between cells
    const newDots: DotType[][][] = Array(6)
      .fill(0)
      .map(
        () =>
          Array(6)
            .fill(0)
            .map(() => [null, null]) // [right dot, bottom dot]
      );

    // Add dots based on solution
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        // Right dot
        if (j < 5) {
          const diff = Math.abs(newSolution[i][j] - newSolution[i][j + 1]);
          if (diff === 1) {
            newDots[i][j][0] = 'white'; // Consecutive
          } else if (diff === newSolution[i][j] || diff === newSolution[i][j + 1]) {
            if (Math.random() > 0.5) {
              newDots[i][j][0] = 'black'; // Ratio 1:2
            }
          }
        }
        // Bottom dot
        if (i < 5) {
          const diff = Math.abs(newSolution[i][j] - newSolution[i + 1][j]);
          if (diff === 1) {
            newDots[i][j][1] = 'white'; // Consecutive
          } else if (diff === newSolution[i][j] || diff === newSolution[i + 1][j]) {
            if (Math.random() > 0.5) {
              newDots[i][j][1] = 'black'; // Ratio 1:2
            }
          }
        }
      }
    }

    // Create puzzle with some cells filled
    const newGrid = newSolution.map((row) => [...row]);
    const cellsToRemove = levelConfig.cellsToRemove;
    let removed = 0;

    while (removed < cellsToRemove) {
      const row = Math.floor(Math.random() * 6);
      const col = Math.floor(Math.random() * 6);
      if (newGrid[row][col] !== 0) {
        newGrid[row][col] = 0;
        removed++;
      }
    }

    setGrid(newGrid);
    setSolution(newSolution);
    setInitialGrid(newGrid.map((row) => [...row]));
    setDots(newDots);
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
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (currentGrid[i][j] !== solution[i][j]) return;
      }
    }
    setIsComplete(true);
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
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all backdrop-blur-sm border border-white/20"
            >
              ⬅ GERİ DÖN
            </button>
            <h1 className="text-3xl md:text-4xl font-black text-white">Dot Sudoku</h1>
            <div className="w-24"></div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Seviye Seç</h2>
            <p className="text-white/80 text-center mb-6">Noktalarla Sudoku çöz!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {levels.map((level) => (
                <button
                  key={level.level}
                  onClick={() => handleLevelSelect(level.level)}
                  className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 rounded-xl p-6 text-left transition-all transform hover:scale-105 border-2 border-white/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-black text-white">Seviye {level.level}</span>
                    <span className="text-3xl">⚪</span>
                  </div>
                  <div className="text-xl font-bold text-purple-100 mb-1">{level.name}</div>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 md:p-8">
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
            <h1 className="text-3xl md:text-4xl font-black text-white">Dot Sudoku</h1>
            <p className="text-purple-200">
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
                  <li>• Her satır ve sütunda 1-6 arası sayılar bir kez bulunmalı</li>
                  <li>• Beyaz nokta: Komşu hücreler ardışık sayılar (fark 1)</li>
                  <li>• Siyah nokta: Komşu hücreler 1:2 oranında</li>
                  <li>• Nokta yoksa: Ne ardışık ne de 1:2 oranında</li>
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
          <div className="inline-block relative">
            {grid.map((row, i) => (
              <div key={i} className="flex">
                {row.map((cell, j) => (
                  <div key={j} className="relative">
                    <button
                      onClick={() => handleCellClick(i, j)}
                      className={`w-12 h-12 md:w-14 md:h-14 border-2 font-bold text-lg md:text-xl transition-all ${
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
                        j % 3 === 2 && j < 5 ? 'border-r-4 border-r-gray-800' : 'border-r-gray-400'
                      } ${
                        i % 2 === 1 && i < 5 ? 'border-b-4 border-b-gray-800' : 'border-b-gray-400'
                      }`}
                    >
                      {cell !== 0 ? cell : ''}
                    </button>

                    {/* Right dot */}
                    {j < 5 && dots[i]?.[j]?.[0] && (
                      <div
                        className={`absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-10 ${
                          dots[i][j][0] === 'white'
                            ? 'bg-white border-2 border-gray-800'
                            : 'bg-gray-800'
                        }`}
                      />
                    )}

                    {/* Bottom dot */}
                    {i < 5 && dots[i]?.[j]?.[1] && (
                      <div
                        className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10 ${
                          dots[i][j][1] === 'white'
                            ? 'bg-white border-2 border-gray-800'
                            : 'bg-gray-800'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {[1, 2, 3, 4, 5, 6].map((num) => (
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

export default DotSudokuGame;

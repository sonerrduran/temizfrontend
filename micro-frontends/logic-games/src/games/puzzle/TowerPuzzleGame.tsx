import React, { useState, useEffect } from 'react';

interface TowerPuzzleGameProps {
  onBack: () => void;
}

const TowerPuzzleGame: React.FC<TowerPuzzleGameProps> = ({ onBack }) => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [initialGrid, setInitialGrid] = useState<number[][]>([]);
  const [clues, setClues] = useState<{
    top: number[];
    bottom: number[];
    left: number[];
    right: number[];
  }>({
    top: [],
    bottom: [],
    left: [],
    right: [],
  });
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
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
    const size = 5;
    // Generate a valid solution (Latin square with 1-5)
    const newSolution: number[][] = Array(size)
      .fill(0)
      .map(() => Array(size).fill(0));

    // Simple solution pattern
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        newSolution[i][j] = ((i + j) % size) + 1;
      }
    }

    // Calculate clues (visible towers from each direction)
    const newClues = {
      top: Array(size).fill(0),
      bottom: Array(size).fill(0),
      left: Array(size).fill(0),
      right: Array(size).fill(0),
    };

    // Top clues
    for (let col = 0; col < size; col++) {
      let visible = 0;
      let maxHeight = 0;
      for (let row = 0; row < size; row++) {
        if (newSolution[row][col] > maxHeight) {
          visible++;
          maxHeight = newSolution[row][col];
        }
      }
      newClues.top[col] = visible;
    }

    // Bottom clues
    for (let col = 0; col < size; col++) {
      let visible = 0;
      let maxHeight = 0;
      for (let row = size - 1; row >= 0; row--) {
        if (newSolution[row][col] > maxHeight) {
          visible++;
          maxHeight = newSolution[row][col];
        }
      }
      newClues.bottom[col] = visible;
    }

    // Left clues
    for (let row = 0; row < size; row++) {
      let visible = 0;
      let maxHeight = 0;
      for (let col = 0; col < size; col++) {
        if (newSolution[row][col] > maxHeight) {
          visible++;
          maxHeight = newSolution[row][col];
        }
      }
      newClues.left[row] = visible;
    }

    // Right clues
    for (let row = 0; row < size; row++) {
      let visible = 0;
      let maxHeight = 0;
      for (let col = size - 1; col >= 0; col--) {
        if (newSolution[row][col] > maxHeight) {
          visible++;
          maxHeight = newSolution[row][col];
        }
      }
      newClues.right[row] = visible;
    }

    // Create puzzle with some cells filled
    const newGrid = newSolution.map((row) => [...row]);
    const cellsToRemove = 18;
    let removed = 0;

    while (removed < cellsToRemove) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      if (newGrid[row][col] !== 0) {
        newGrid[row][col] = 0;
        removed++;
      }
    }

    setGrid(newGrid);
    setSolution(newSolution);
    setInitialGrid(newGrid.map((row) => [...row]));
    setClues(newClues);
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
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all backdrop-blur-sm border border-white/20"
          >
            ⬅ GERİ DÖN
          </button>
          <h1 className="text-3xl md:text-4xl font-black text-white">Kule Bulmacası</h1>
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
                  <li>• Her satır ve sütunda 1-5 arası sayılar bir kez bulunmalı</li>
                  <li>• Sayılar kule yüksekliklerini temsil eder</li>
                  <li>• Kenar ipuçları: O yönden kaç kule görünür</li>
                  <li>• Yüksek kuleler alçak kuleleri gizler</li>
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

        {/* Game Board with Clues */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
          <div className="inline-block">
            {/* Top clues */}
            <div className="flex ml-14">
              {clues.top.map((clue, i) => (
                <div
                  key={i}
                  className="w-12 h-10 md:w-14 md:h-12 flex items-center justify-center text-yellow-300 font-bold text-lg"
                >
                  {clue}
                </div>
              ))}
            </div>

            {/* Grid with left and right clues */}
            {grid.map((row, i) => (
              <div key={i} className="flex">
                {/* Left clue */}
                <div className="w-10 h-12 md:w-12 md:h-14 flex items-center justify-center text-yellow-300 font-bold text-lg">
                  {clues.left[i]}
                </div>

                {/* Grid cells */}
                {row.map((cell, j) => (
                  <button
                    key={j}
                    onClick={() => handleCellClick(i, j)}
                    className={`w-12 h-12 md:w-14 md:h-14 border-2 font-bold text-lg md:text-xl transition-all ${
                      initialGrid[i][j] !== 0
                        ? 'bg-orange-200/50 text-orange-900 cursor-default'
                        : cell === 0
                          ? 'bg-white/90 text-gray-800 hover:bg-orange-100'
                          : cell === solution[i][j]
                            ? 'bg-green-200/50 text-green-900'
                            : 'bg-red-200/50 text-red-900'
                    } ${
                      selectedCell?.row === i && selectedCell?.col === j
                        ? 'ring-4 ring-yellow-400'
                        : ''
                    } border-gray-400`}
                  >
                    {cell !== 0 ? cell : ''}
                  </button>
                ))}

                {/* Right clue */}
                <div className="w-10 h-12 md:w-12 md:h-14 flex items-center justify-center text-yellow-300 font-bold text-lg">
                  {clues.right[i]}
                </div>
              </div>
            ))}

            {/* Bottom clues */}
            <div className="flex ml-14">
              {clues.bottom.map((clue, i) => (
                <div
                  key={i}
                  className="w-12 h-10 md:w-14 md:h-12 flex items-center justify-center text-yellow-300 font-bold text-lg"
                >
                  {clue}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-6 gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((num) => (
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
              <h2 className="text-3xl font-black text-white mb-4">Harika!</h2>
              <p className="text-white/90 mb-6">
                Kule Bulmacası'nı {formatTime(time)} sürede, {mistakes} hata ile tamamladınız!
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

export default TowerPuzzleGame;

import React, { useState, useEffect } from 'react';

interface LightAndShadowGameProps {
  onBack: () => void;
}

const LightAndShadowGame: React.FC<LightAndShadowGameProps> = ({ onBack }) => {
  const [grid, setGrid] = useState<('light' | 'shadow' | '')[][]>([]);
  const [solution, setSolution] = useState<('light' | 'shadow')[][]>([]);
  const [rowClues, setRowClues] = useState<{ light: number; shadow: number }[]>([]);
  const [colClues, setColClues] = useState<{ light: number; shadow: number }[]>([]);
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
    const size = 8;
    const newSolution: ('light' | 'shadow')[][] = Array(size)
      .fill(0)
      .map(() => Array(size).fill('light'));

    // Create a pattern with shadows
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if ((i + j) % 3 === 0 || (i === j && i % 2 === 0)) {
          newSolution[i][j] = 'shadow';
        }
      }
    }

    // Calculate clues
    const newRowClues: { light: number; shadow: number }[] = [];
    const newColClues: { light: number; shadow: number }[] = [];

    for (let i = 0; i < size; i++) {
      let lightCount = 0;
      let shadowCount = 0;
      for (let j = 0; j < size; j++) {
        if (newSolution[i][j] === 'light') lightCount++;
        else shadowCount++;
      }
      newRowClues.push({ light: lightCount, shadow: shadowCount });
    }

    for (let j = 0; j < size; j++) {
      let lightCount = 0;
      let shadowCount = 0;
      for (let i = 0; i < size; i++) {
        if (newSolution[i][j] === 'light') lightCount++;
        else shadowCount++;
      }
      newColClues.push({ light: lightCount, shadow: shadowCount });
    }

    const newGrid: ('light' | 'shadow' | '')[][] = Array(size)
      .fill(0)
      .map(() => Array(size).fill(''));

    setGrid(newGrid);
    setSolution(newSolution);
    setRowClues(newRowClues);
    setColClues(newColClues);
    setMistakes(0);
    setTime(0);
    setIsComplete(false);
  };

  const handleCellClick = (row: number, col: number) => {
    const newGrid = grid.map((r) => [...r]);

    if (newGrid[row][col] === '') {
      newGrid[row][col] = 'light';
    } else if (newGrid[row][col] === 'light') {
      newGrid[row][col] = 'shadow';
    } else {
      newGrid[row][col] = '';
    }

    setGrid(newGrid);

    if (newGrid[row][col] !== '' && newGrid[row][col] !== solution[row][col]) {
      setMistakes((m) => m + 1);
    }

    checkCompletion(newGrid);
  };

  const checkCompletion = (currentGrid: ('light' | 'shadow' | '')[][]) => {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-blue-900 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all backdrop-blur-sm border border-white/20"
          >
            ⬅ GERİ DÖN
          </button>
          <h1 className="text-3xl md:text-4xl font-black text-white">Işık ve Gölge</h1>
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
                  <li>• Her hücreyi ışık (☀️) veya gölge (🌙) ile işaretleyin</li>
                  <li>• Satır/sütun ipuçları: Kaç ışık ve gölge olmalı</li>
                  <li>• Tıklayarak: Boş → Işık → Gölge → Boş</li>
                  <li>• Tüm ipuçlarını karşılayın!</li>
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
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 overflow-x-auto">
          <div className="inline-block">
            {/* Column clues */}
            <div className="flex ml-16">
              {colClues.map((clue, i) => (
                <div
                  key={i}
                  className="w-10 h-12 md:w-12 md:h-14 flex flex-col items-center justify-center text-xs"
                >
                  <div className="text-yellow-300 font-bold">☀️{clue.light}</div>
                  <div className="text-blue-300 font-bold">🌙{clue.shadow}</div>
                </div>
              ))}
            </div>

            {/* Grid with row clues */}
            {grid.map((row, i) => (
              <div key={i} className="flex">
                {/* Row clue */}
                <div className="w-14 h-10 md:w-14 md:h-12 flex items-center justify-center text-xs gap-2">
                  <div className="text-yellow-300 font-bold">☀️{rowClues[i].light}</div>
                  <div className="text-blue-300 font-bold">🌙{rowClues[i].shadow}</div>
                </div>

                {/* Grid cells */}
                {row.map((cell, j) => (
                  <button
                    key={j}
                    onClick={() => handleCellClick(i, j)}
                    className={`w-10 h-10 md:w-12 md:h-12 border-2 transition-all text-2xl ${
                      cell === ''
                        ? 'bg-white/20 hover:bg-white/30 border-gray-500'
                        : cell === 'light'
                          ? cell === solution[i][j]
                            ? 'bg-yellow-400/70 border-yellow-600'
                            : 'bg-red-400/50 border-red-600'
                          : cell === solution[i][j]
                            ? 'bg-slate-700/70 border-slate-900'
                            : 'bg-red-400/50 border-red-600'
                    }`}
                  >
                    {cell === 'light' ? '☀️' : cell === 'shadow' ? '🌙' : ''}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={generatePuzzle}
            className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl text-white font-bold text-lg transition-all shadow-lg"
          >
            🎲 Yeni Oyun
          </button>
        </div>

        {/* Completion Modal */}
        {isComplete && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-black text-white mb-4">Harika!</h2>
              <p className="text-white/90 mb-6">
                Işık ve Gölge'yi {formatTime(time)} sürede, {mistakes} hata ile tamamladınız!
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

export default LightAndShadowGame;

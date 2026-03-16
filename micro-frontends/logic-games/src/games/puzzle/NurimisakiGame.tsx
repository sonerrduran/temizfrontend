import React, { useState, useEffect } from 'react';

interface NurimisakiGameProps {
  onBack: () => void;
}

const NurimisakiGame: React.FC<NurimisakiGameProps> = ({ onBack }) => {
  const [grid, setGrid] = useState<('black' | 'white' | '')[][]>([]);
  const [solution, setSolution] = useState<('black' | 'white')[][]>([]);
  const [clues, setClues] = useState<(number | null)[][]>([]);
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
    const newSolution: ('black' | 'white')[][] = Array(size)
      .fill(0)
      .map(() => Array(size).fill('white'));

    // Create islands pattern
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if ((i + j) % 3 === 0) {
          newSolution[i][j] = 'black';
        }
      }
    }

    // Generate clues (number of white cells visible in 4 directions)
    const newClues: (number | null)[][] = Array(size)
      .fill(0)
      .map(() => Array(size).fill(null));
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (newSolution[i][j] === 'black' && Math.random() > 0.5) {
          let count = 0;
          // Count visible white cells in 4 directions
          const dirs = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
          ];
          for (const [di, dj] of dirs) {
            let ni = i + di;
            let nj = j + dj;
            while (
              ni >= 0 &&
              ni < size &&
              nj >= 0 &&
              nj < size &&
              newSolution[ni][nj] === 'white'
            ) {
              count++;
              ni += di;
              nj += dj;
            }
          }
          newClues[i][j] = count;
        }
      }
    }

    const newGrid: ('black' | 'white' | '')[][] = Array(size)
      .fill(0)
      .map(() => Array(size).fill(''));

    setGrid(newGrid);
    setSolution(newSolution);
    setClues(newClues);
    setMistakes(0);
    setTime(0);
    setIsComplete(false);
  };

  const handleCellClick = (row: number, col: number) => {
    const newGrid = grid.map((r) => [...r]);

    if (newGrid[row][col] === '') {
      newGrid[row][col] = 'black';
    } else if (newGrid[row][col] === 'black') {
      newGrid[row][col] = 'white';
    } else {
      newGrid[row][col] = '';
    }

    setGrid(newGrid);

    if (newGrid[row][col] !== '' && newGrid[row][col] !== solution[row][col]) {
      setMistakes((m) => m + 1);
    }

    checkCompletion(newGrid);
  };

  const checkCompletion = (currentGrid: ('black' | 'white' | '')[][]) => {
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all backdrop-blur-sm border border-white/20"
          >
            ⬅ GERİ DÖN
          </button>
          <h1 className="text-3xl md:text-4xl font-black text-white">Nurimisaki</h1>
          <div className="w-24"></div>
        </div>

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

        {showInstructions && (
          <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-300/30 rounded-xl p-4 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-white font-bold mb-2">📖 Nasıl Oynanır?</h3>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• Hücreleri siyah veya beyaz yapın</li>
                  <li>• Sayılar: O yönden görünen beyaz hücre sayısı</li>
                  <li>• Tüm beyaz hücreler bağlı olmalı</li>
                  <li>• Siyah hücreler ada oluşturur</li>
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

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
          <div className="inline-block">
            {grid.map((row, i) => (
              <div key={i} className="flex">
                {row.map((cell, j) => (
                  <div key={j} className="relative">
                    <button
                      onClick={() => handleCellClick(i, j)}
                      className={`w-12 h-12 md:w-14 md:h-14 border-2 transition-all ${
                        cell === ''
                          ? 'bg-white/20 hover:bg-white/30 border-gray-500'
                          : cell === 'black'
                            ? cell === solution[i][j]
                              ? 'bg-gray-900 border-gray-700'
                              : 'bg-red-900/50 border-red-700'
                            : cell === solution[i][j]
                              ? 'bg-white/90 border-gray-400'
                              : 'bg-red-400/50 border-red-600'
                      }`}
                    />
                    {clues[i][j] !== null && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-xl font-bold text-yellow-300">{clues[i][j]}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={generatePuzzle}
          className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl text-white font-bold text-lg transition-all shadow-lg"
        >
          🎲 Yeni Oyun
        </button>

        {isComplete && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-black text-white mb-4">Harika!</h2>
              <p className="text-white/90 mb-6">
                Nurimisaki'yi {formatTime(time)} sürede, {mistakes} hata ile tamamladınız!
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

export default NurimisakiGame;

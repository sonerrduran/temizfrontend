import React, { useState, useEffect } from 'react';

interface CrossLogicGameProps {
  onBack: () => void;
}

const CrossLogicGame: React.FC<CrossLogicGameProps> = ({ onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showLevelSelect, setShowLevelSelect] = useState(true);
  const [grid, setGrid] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [crossSums, setCrossSums] = useState<number[][]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const levels = [
    { level: 1, name: 'Başlangıç', size: 5, description: '5x5 kolay bulmaca' },
    { level: 2, name: 'Kolay', size: 6, description: '6x6 orta zorluk' },
    { level: 3, name: 'Orta', size: 7, description: '7x7 standart' },
    { level: 4, name: 'Zor', size: 8, description: '8x8 zorlu bulmaca' },
    { level: 5, name: 'Uzman', size: 9, description: '9x9 uzman seviye' },
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
    const size = levelConfig.size;
    const newSolution: number[][] = Array(size)
      .fill(0)
      .map(() => Array(size).fill(0));

    // Generate solution with 1s and 0s
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        newSolution[i][j] = Math.random() > 0.5 ? 1 : 0;
      }
    }

    // Calculate cross sums (sum of + shaped neighbors)
    const newCrossSums: number[][] = Array(size)
      .fill(0)
      .map(() => Array(size).fill(0));
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let sum = newSolution[i][j];
        if (i > 0) sum += newSolution[i - 1][j];
        if (i < size - 1) sum += newSolution[i + 1][j];
        if (j > 0) sum += newSolution[i][j - 1];
        if (j < size - 1) sum += newSolution[i][j + 1];
        newCrossSums[i][j] = sum;
      }
    }

    const newGrid: number[][] = Array(size)
      .fill(0)
      .map(() => Array(size).fill(-1));

    setGrid(newGrid);
    setSolution(newSolution);
    setCrossSums(newCrossSums);
    setMistakes(0);
    setTime(0);
    setIsComplete(false);
  };

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
    const newGrid = grid.map((r) => [...r]);

    if (newGrid[row][col] === -1) {
      newGrid[row][col] = 0;
    } else if (newGrid[row][col] === 0) {
      newGrid[row][col] = 1;
    } else {
      newGrid[row][col] = -1;
    }

    setGrid(newGrid);

    if (newGrid[row][col] !== -1 && newGrid[row][col] !== solution[row][col]) {
      setMistakes((m) => m + 1);
    }

    checkCompletion(newGrid);
  };

  const checkCompletion = (currentGrid: number[][]) => {
    const size = levels[currentLevel - 1].size;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (currentGrid[i][j] !== solution[i][j]) return;
      }
    }
    setIsComplete(true);
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showLevelSelect) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all backdrop-blur-sm border border-white/20"
            >
              ⬅ GERİ DÖN
            </button>
            <h1 className="text-3xl md:text-4xl font-black text-white">Çapraz Mantık</h1>
            <div className="w-24"></div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Seviye Seç</h2>
            <p className="text-white/80 text-center mb-6">
              Her hücreyi 0 veya 1 ile doldurun. Sarı daireler çapraz toplamları gösterir!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {levels.map((level) => (
                <button
                  key={level.level}
                  onClick={() => handleLevelSelect(level.level)}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-xl p-6 text-left transition-all transform hover:scale-105 border-2 border-white/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-black text-white">Seviye {level.level}</span>
                    <span className="text-3xl">🎯</span>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4 md:p-8">
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
            <h1 className="text-3xl md:text-4xl font-black text-white">Çapraz Mantık</h1>
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
                  <li>• Her hücreyi 0 veya 1 ile doldurun</li>
                  <li>• Sayılar: Hücre + 4 komşusunun toplamı (+ şeklinde)</li>
                  <li>• Tıklayarak: Boş → 0 → 1 → Boş</li>
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
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
          <div className="inline-block">
            {grid.map((row, i) => (
              <div key={i} className="flex">
                {row.map((cell, j) => (
                  <div key={j} className="relative">
                    <button
                      onClick={() => handleCellClick(i, j)}
                      className={`w-14 h-14 md:w-16 md:h-16 border-2 font-bold text-xl transition-all ${
                        cell === -1
                          ? 'bg-white/20 hover:bg-white/30 border-gray-500'
                          : cell === 0
                            ? cell === solution[i][j]
                              ? 'bg-blue-500/50 border-blue-700 text-white'
                              : 'bg-red-500/50 border-red-700 text-white'
                            : cell === solution[i][j]
                              ? 'bg-green-500/50 border-green-700 text-white'
                              : 'bg-red-500/50 border-red-700 text-white'
                      } ${
                        selectedCell?.row === i && selectedCell?.col === j
                          ? 'ring-4 ring-yellow-400'
                          : ''
                      }`}
                    >
                      {cell === -1 ? '' : cell}
                    </button>
                    {/* Cross sum clue */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-gray-900 border-2 border-yellow-600">
                      {crossSums[i][j]}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
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
              <h2 className="text-3xl font-black text-white mb-4">Mükemmel!</h2>
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

export default CrossLogicGame;

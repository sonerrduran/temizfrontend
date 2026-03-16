import React, { useState, useEffect } from 'react';

interface CrossSumsGameProps {
  onBack: () => void;
}

const CrossSumsGame: React.FC<CrossSumsGameProps> = ({ onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showLevelSelect, setShowLevelSelect] = useState(true);
  const [grid, setGrid] = useState<(number | null)[][]>([]);
  const [clues, setClues] = useState<
    { row: number; col: number; sum: number; direction: 'h' | 'v' }[]
  >([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const levels = [
    { level: 1, name: 'Başlangıç', size: 5, clueCount: 6, description: '5x5 kolay bulmaca' },
    { level: 2, name: 'Kolay', size: 6, clueCount: 8, description: '6x6 orta zorluk' },
    { level: 3, name: 'Orta', size: 7, clueCount: 11, description: '7x7 standart' },
    { level: 4, name: 'Zor', size: 8, clueCount: 14, description: '8x8 zorlu bulmaca' },
    { level: 5, name: 'Uzman', size: 9, clueCount: 18, description: '9x9 uzman seviye' },
  ];

  useEffect(() => {
    if (!showLevelSelect) {
      generatePuzzle();
    }
  }, [showLevelSelect, currentLevel]);

  useEffect(() => {
    if (!isComplete && !showLevelSelect) {
      const timer = setInterval(() => setTime((t) => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isComplete, showLevelSelect]);

  const generatePuzzle = () => {
    const levelConfig = levels[currentLevel - 1];
    const size = levelConfig.size;
    const newGrid = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));

    // İpucu hücreleri oluştur
    const cluePositions: [number, number][] = [];
    const clueCount = levelConfig.clueCount;

    // Rastgele ipucu pozisyonları seç
    while (cluePositions.length < clueCount) {
      const r = Math.floor(Math.random() * (size - 1));
      const c = Math.floor(Math.random() * (size - 1));
      if (!cluePositions.some(([pr, pc]) => pr === r && pc === c)) {
        cluePositions.push([r, c]);
      }
    }

    cluePositions.forEach(([r, c]) => {
      newGrid[r][c] = -1;
    });

    // İpuçları oluştur
    const newClues: { row: number; col: number; sum: number; direction: 'h' | 'v' }[] = [];
    cluePositions.forEach(([r, c]) => {
      // Yatay ipucu
      if (c < size - 1) {
        const length = Math.min(Math.floor(Math.random() * 3) + 2, size - c - 1);
        const sum = Math.floor(Math.random() * (length * 5)) + length * 2;
        newClues.push({ row: r, col: c, sum, direction: 'h' });
      }
      // Dikey ipucu
      if (r < size - 1) {
        const length = Math.min(Math.floor(Math.random() * 3) + 2, size - r - 1);
        const sum = Math.floor(Math.random() * (length * 5)) + length * 2;
        newClues.push({ row: r, col: c, sum, direction: 'v' });
      }
    });

    setGrid(newGrid);
    setClues(newClues);
    setMistakes(0);
    setTime(0);
    setIsComplete(false);
  };

  const handleCellClick = (row: number, col: number) => {
    if (grid[row][col] !== -1) {
      setSelectedCell([row, col]);
    }
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell) return;

    const [row, col] = selectedCell;
    const newGrid = grid.map((r) => [...r]);
    newGrid[row][col] = num;

    if (!isValidMove(row, col, num, newGrid)) {
      setMistakes((m) => m + 1);
      setTimeout(() => {
        newGrid[row][col] = null;
        setGrid(newGrid);
      }, 500);
    } else {
      setGrid(newGrid);
      checkCompletion(newGrid);
    }
    setSelectedCell(null);
  };

  const isValidMove = (row: number, col: number, num: number, currentGrid: (number | null)[][]) => {
    // Aynı satırda veya sütunda aynı sayı olmamalı
    // İpucu toplamlarını kontrol et
    return true; // Basitleştirilmiş versiyon
  };

  const checkCompletion = (currentGrid: (number | null)[][]) => {
    const isFilled = currentGrid.every((row) => row.every((cell) => cell !== null && cell !== -1));
    if (isFilled) {
      setIsComplete(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getClueForCell = (row: number, col: number) => {
    return clues.find((c) => c.row === row && c.col === col);
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
      <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all backdrop-blur-sm border border-white/20"
            >
              ⬅ GERİ DÖN
            </button>
            <h1 className="text-3xl md:text-4xl font-black text-white">Cross Sums</h1>
            <div className="w-24"></div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Seviye Seç</h2>
            <p className="text-white/80 text-center mb-6">Toplamları kullanarak sayıları bul!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {levels.map((level) => (
                <button
                  key={level.level}
                  onClick={() => handleLevelSelect(level.level)}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-xl p-6 text-left transition-all transform hover:scale-105 border-2 border-white/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-black text-white">Seviye {level.level}</span>
                    <span className="text-3xl">➕</span>
                  </div>
                  <div className="text-xl font-bold text-orange-100 mb-1">{level.name}</div>
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
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBackToLevels}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            ⬅ GERİ DÖN
          </button>
          <div className="text-white text-center">
            <h2 className="text-3xl font-black">Cross Sums</h2>
            <p className="text-sm opacity-80">
              Seviye {currentLevel} - {levels[currentLevel - 1].name}
            </p>
          </div>
          <div className="text-white text-right">
            <div className="text-2xl font-bold">{formatTime(time)}</div>
            <div className="text-sm">Hata: {mistakes}</div>
          </div>
        </div>

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

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-4">
          <div
            className="grid gap-1 mb-4"
            style={{ gridTemplateColumns: `repeat(${grid.length}, 1fr)` }}
          >
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const isSelected = selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex;
                const isClue = cell === -1;
                const clue = getClueForCell(rowIndex, colIndex);

                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    disabled={isClue}
                    className={`
                      aspect-square flex items-center justify-center text-xl font-bold rounded relative
                      ${isSelected ? 'bg-yellow-400 text-black' : ''}
                      ${isClue ? 'bg-gray-800 cursor-not-allowed' : 'bg-white/20 hover:bg-white/30'}
                      ${cell && cell !== -1 ? 'text-white' : 'text-blue-300'}
                      transition-all
                    `}
                  >
                    {isClue && clue ? (
                      <div className="absolute inset-0 flex flex-col items-end justify-start p-1">
                        <span className="text-xs text-yellow-300">{clue.sum}</span>
                        <span className="text-xs text-yellow-300">
                          {clue.direction === 'h' ? '→' : '↓'}
                        </span>
                      </div>
                    ) : (
                      cell || ''
                    )}
                  </button>
                );
              })
            )}
          </div>

          <div className="flex justify-center gap-2 flex-wrap">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberInput(num)}
                disabled={!selectedCell}
                className="bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white w-12 h-12 rounded-xl font-bold text-xl transition-all hover:scale-110"
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => selectedCell && handleNumberInput(0)}
              disabled={!selectedCell}
              className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 h-12 rounded-xl font-bold transition-all"
            >
              Sil
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-white">
          <h3 className="font-bold mb-2">➕ Nasıl Oynanır?</h3>
          <ul className="text-sm space-y-1 opacity-90">
            <li>• Gri hücreler ipucu hücreleridir</li>
            <li>• Her ipucu, o yöndeki sayıların toplamını gösterir</li>
            <li>• Aynı grupta aynı sayı tekrar edemez</li>
            <li>• Sadece 1-9 arası sayılar kullanılır</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CrossSumsGame;

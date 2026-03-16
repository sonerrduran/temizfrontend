import React, { useState, useEffect } from 'react';

interface TakuzuGameProps {
  onBack: () => void;
}

const TakuzuGame: React.FC<TakuzuGameProps> = ({ onBack }) => {
  const [level, setLevel] = useState(1);
  const [grid, setGrid] = useState<(0 | 1 | null)[][]>([]);
  const [solution, setSolution] = useState<(0 | 1)[][]>([]);
  const [initialGrid, setInitialGrid] = useState<(0 | 1 | null)[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showLevelSelect, setShowLevelSelect] = useState(true);

  const levels = [
    { size: 4, name: 'Kolay', clues: 8 },
    { size: 6, name: 'Orta', clues: 14 },
    { size: 8, name: 'Zor', clues: 24 },
    { size: 10, name: 'Çok Zor', clues: 35 },
    { size: 12, name: 'Uzman', clues: 48 },
  ];

  const currentLevel = levels[level - 1];
  const size = currentLevel.size;

  useEffect(() => {
    if (!showLevelSelect) {
      generatePuzzle();
      const timer = setInterval(() => setTime((t) => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [showLevelSelect, level]);

  const generateValidSolution = (gridSize: number): (0 | 1)[][] => {
    const newSolution: (0 | 1)[][] = Array(gridSize)
      .fill(0)
      .map(() => Array(gridSize).fill(0));

    // Basit bir çözüm oluştur - her satır için
    for (let row = 0; row < gridSize; row++) {
      const pattern = row % 2 === 0 ? [0, 1] : [1, 0];
      for (let col = 0; col < gridSize; col++) {
        newSolution[row][col] = pattern[col % 2] as 0 | 1;
      }
    }

    // Biraz karıştır
    for (let i = 0; i < gridSize * 2; i++) {
      const row1 = Math.floor(Math.random() * gridSize);
      const row2 = Math.floor(Math.random() * gridSize);
      if (row1 !== row2) {
        [newSolution[row1], newSolution[row2]] = [newSolution[row2], newSolution[row1]];
      }
    }

    return newSolution;
  };

  const generatePuzzle = () => {
    const newSolution = generateValidSolution(size);
    const newGrid: (0 | 1 | null)[][] = newSolution.map((row) => row.map(() => null));

    // Rastgele hücreleri doldur
    const cellsToFill = currentLevel.clues;
    let filled = 0;

    while (filled < cellsToFill) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);

      if (newGrid[row][col] === null) {
        newGrid[row][col] = newSolution[row][col];
        filled++;
      }
    }

    setGrid(newGrid);
    setInitialGrid(newGrid.map((row) => [...row]));
    setSolution(newSolution);
    setMistakes(0);
    setTime(0);
    setIsComplete(false);
    setSelectedCell(null);
  };

  const handleCellClick = (row: number, col: number) => {
    // Sadece boş hücrelere tıklanabilir
    if (initialGrid[row][col] === null) {
      setSelectedCell([row, col]);
    }
  };

  const handleValueInput = (value: 0 | 1) => {
    if (!selectedCell) return;

    const [row, col] = selectedCell;
    const newGrid = grid.map((r) => [...r]);
    newGrid[row][col] = value;

    if (!isValidMove(row, col, value, newGrid)) {
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

  const isValidMove = (row: number, col: number, value: 0 | 1, currentGrid: (0 | 1 | null)[][]) => {
    // Satırda en fazla size/2 adet 0 veya 1 olabilir
    const rowCount = currentGrid[row].filter((c) => c === value).length;
    if (rowCount > size / 2) return false;

    // Sütunda en fazla size/2 adet 0 veya 1 olabilir
    const colCount = currentGrid.filter((r) => r[col] === value).length;
    if (colCount > size / 2) return false;

    // Aynı değerden 3 tane yan yana olamaz
    // Yatay kontrol
    if (col >= 2 && currentGrid[row][col - 1] === value && currentGrid[row][col - 2] === value)
      return false;
    if (
      col >= 1 &&
      col < size - 1 &&
      currentGrid[row][col - 1] === value &&
      currentGrid[row][col + 1] === value
    )
      return false;
    if (
      col < size - 2 &&
      currentGrid[row][col + 1] === value &&
      currentGrid[row][col + 2] === value
    )
      return false;

    // Dikey kontrol
    if (row >= 2 && currentGrid[row - 1][col] === value && currentGrid[row - 2][col] === value)
      return false;
    if (
      row >= 1 &&
      row < size - 1 &&
      currentGrid[row - 1][col] === value &&
      currentGrid[row + 1][col] === value
    )
      return false;
    if (
      row < size - 2 &&
      currentGrid[row + 1][col] === value &&
      currentGrid[row + 2][col] === value
    )
      return false;

    return true;
  };

  const checkCompletion = (currentGrid: (0 | 1 | null)[][]) => {
    const isFilled = currentGrid.every((row) => row.every((cell) => cell !== null));
    if (isFilled) {
      setIsComplete(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {showLevelSelect ? (
          // Level Selection Screen
          <div className="text-center">
            <button
              onClick={onBack}
              className="mb-6 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold transition-all"
            >
              ⬅ GERİ DÖN
            </button>
            <h2 className="text-5xl font-black text-white mb-4">Takuzu</h2>
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
                  <div className="text-4xl mb-2">⚫⚪</div>
                  <div className="text-2xl font-bold mb-2">Seviye {idx + 1}</div>
                  <div className="text-sm opacity-80">{lvl.name}</div>
                  <div className="text-xs opacity-60 mt-2">
                    {lvl.size}x{lvl.size}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Game Screen
          <>
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setShowLevelSelect(true)}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold transition-all"
              >
                ⬅ GERİ DÖN
              </button>
              <div className="text-white text-center">
                <h2 className="text-3xl font-black">Takuzu - Seviye {level}</h2>
                <p className="text-sm opacity-80">0 ve 1'leri dengele</p>
              </div>
              <div className="text-white text-right">
                <div className="text-2xl font-bold">{formatTime(time)}</div>
                <div className="text-sm">Hata: {mistakes}</div>
              </div>
            </div>

            {isComplete && (
              <div className="bg-green-500 text-white p-4 rounded-xl mb-4 text-center font-bold animate-bounce">
                🎉 Tebrikler! {formatTime(time)} sürede tamamladın!
                <button
                  onClick={() => {
                    if (level < levels.length) {
                      setLevel(level + 1);
                      generatePuzzle();
                    } else {
                      setShowLevelSelect(true);
                    }
                  }}
                  className="ml-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
                >
                  {level < levels.length ? 'Sonraki Seviye →' : 'Seviye Seç'}
                </button>
              </div>
            )}

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-4">
              <div
                className="grid gap-2 mb-4"
                style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
              >
                {grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => {
                    const isSelected =
                      selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex;
                    const isFixed = initialGrid[rowIndex][colIndex] !== null;

                    return (
                      <button
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        disabled={isFixed}
                        className={`
                          aspect-square flex items-center justify-center text-2xl font-bold rounded-lg
                          ${isFixed ? 'bg-white/30 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20'}
                          ${isSelected ? 'ring-4 ring-yellow-400' : ''}
                          transition-all
                        `}
                      >
                        {cell === 0 ? '⚫' : cell === 1 ? '⚪' : ''}
                      </button>
                    );
                  })
                )}
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleValueInput(0)}
                  className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-white font-bold text-2xl transition-all"
                >
                  ⚫ 0
                </button>
                <button
                  onClick={() => handleValueInput(1)}
                  className="px-8 py-4 bg-white hover:bg-gray-200 rounded-xl text-gray-900 font-bold text-2xl transition-all"
                >
                  ⚪ 1
                </button>
                <button
                  onClick={() => {
                    if (selectedCell) {
                      const [row, col] = selectedCell;
                      const newGrid = grid.map((r) => [...r]);
                      newGrid[row][col] = null;
                      setGrid(newGrid);
                      setSelectedCell(null);
                    }
                  }}
                  className="px-8 py-4 bg-red-500 hover:bg-red-600 rounded-xl text-white font-bold transition-all"
                >
                  ❌ Sil
                </button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-white">
              <h3 className="font-bold mb-2">⚫⚪ Nasıl Oynanır?</h3>
              <ul className="text-sm space-y-1 opacity-90">
                <li>• Her satır ve sütunda eşit sayıda 0 ve 1 olmalı</li>
                <li>• Aynı sayıdan 3 tane yan yana olamaz</li>
                <li>• Tüm satırlar ve sütunlar benzersiz olmalı</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TakuzuGame;

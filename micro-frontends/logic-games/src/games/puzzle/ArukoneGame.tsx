import React, { useState, useEffect } from 'react';

interface ArukoneGameProps {
  onBack: () => void;
}

const ArukoneGame: React.FC<ArukoneGameProps> = ({ onBack }) => {
  const [level, setLevel] = useState(1);
  const [grid, setGrid] = useState<(number | null)[][]>([]);
  const [paths, setPaths] = useState<Map<number, [number, number][]>>(new Map());
  const [endpoints, setEndpoints] = useState<Map<number, [[number, number], [number, number]]>>(
    new Map()
  );
  const [currentPath, setCurrentPath] = useState<[number, number][]>([]);
  const [currentColor, setCurrentColor] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showLevelSelect, setShowLevelSelect] = useState(true);

  const levels = [
    { size: 5, pairs: 3, name: 'Kolay' },
    { size: 6, pairs: 4, name: 'Orta' },
    { size: 7, pairs: 5, name: 'Zor' },
    { size: 8, pairs: 6, name: 'Çok Zor' },
    { size: 9, pairs: 7, name: 'Uzman' },
  ];

  const currentLevel = levels[level - 1];
  const size = currentLevel.size;

  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F7DC6F',
    '#E74C3C',
    '#9B59B6',
    '#3498DB',
  ];

  useEffect(() => {
    if (!showLevelSelect) {
      generatePuzzle();
      const timer = setInterval(() => setTime((t) => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [showLevelSelect, level]);

  const generatePuzzle = () => {
    const newGrid: (number | null)[][] = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));

    // Başlangıç ve bitiş noktaları - level'e göre
    const newEndpoints = new Map<number, [[number, number], [number, number]]>();

    for (let i = 1; i <= currentLevel.pairs; i++) {
      let start: [number, number], end: [number, number];
      do {
        start = [Math.floor(Math.random() * size), Math.floor(Math.random() * size)];
        end = [Math.floor(Math.random() * size), Math.floor(Math.random() * size)];
      } while (
        (start[0] === end[0] && start[1] === end[1]) ||
        newGrid[start[0]][start[1]] !== null ||
        newGrid[end[0]][end[1]] !== null
      );

      newEndpoints.set(i, [start, end]);
      newGrid[start[0]][start[1]] = i;
      newGrid[end[0]][end[1]] = i;
    }

    setGrid(newGrid);
    setEndpoints(newEndpoints);
    setPaths(new Map());
    setCurrentPath([]);
    setCurrentColor(null);
    setTime(0);
    setIsComplete(false);
  };

  const handleCellClick = (row: number, col: number) => {
    const cellValue = grid[row][col];

    // Eğer bir endpoint'e tıklandıysa
    if (cellValue !== null && endpoints.has(cellValue)) {
      if (currentColor === null) {
        // Yeni bir yol başlat
        setCurrentColor(cellValue);
        setCurrentPath([[row, col]]);
      } else if (currentColor === cellValue) {
        // Yolu tamamla
        const newPaths = new Map<number, [number, number][]>(paths);
        newPaths.set(currentColor, [...currentPath, [row, col]]);
        setPaths(newPaths);
        setCurrentColor(null);
        setCurrentPath([]);
        updateGrid(newPaths);
      }
    } else if (currentColor !== null) {
      // Yol üzerinde bir hücre
      const lastCell = currentPath[currentPath.length - 1];
      const isAdjacent = Math.abs(lastCell[0] - row) + Math.abs(lastCell[1] - col) === 1;

      if (isAdjacent && cellValue === null) {
        setCurrentPath([...currentPath, [row, col]]);
      }
    }
  };

  const updateGrid = (newPaths: Map<number, [number, number][]>) => {
    const newGrid: (number | null)[][] = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));

    // Endpoint'leri yerleştir
    endpoints.forEach((points, color) => {
      newGrid[points[0][0]][points[0][1]] = color;
      newGrid[points[1][0]][points[1][1]] = color;
    });

    // Yolları çiz
    newPaths.forEach((path, color) => {
      path.forEach(([r, c]) => {
        newGrid[r][c] = color;
      });
    });

    setGrid(newGrid);
    checkCompletion(newGrid);
  };

  const checkCompletion = (currentGrid: (number | null)[][]) => {
    const allFilled = currentGrid.every((row) => row.every((cell) => cell !== null));
    if (allFilled && paths.size === endpoints.size) {
      setIsComplete(true);
    }
  };

  const clearPath = (color: number) => {
    const newPaths = new Map<number, [number, number][]>(paths);
    newPaths.delete(color);
    setPaths(newPaths);
    updateGrid(newPaths);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isEndpoint = (row: number, col: number) => {
    for (const [color, points] of endpoints.entries()) {
      if (
        (points[0][0] === row && points[0][1] === col) ||
        (points[1][0] === row && points[1][1] === col)
      ) {
        return color;
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
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
            <h2 className="text-5xl font-black text-white mb-4">Arukone</h2>
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
                  <div className="text-4xl mb-2">🔀</div>
                  <div className="text-2xl font-bold mb-2">Seviye {idx + 1}</div>
                  <div className="text-sm opacity-80">{lvl.name}</div>
                  <div className="text-xs opacity-60 mt-2">
                    {lvl.size}x{lvl.size} • {lvl.pairs} çift
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
                <h2 className="text-3xl font-black">Arukone - Seviye {level}</h2>
                <p className="text-sm opacity-80">Noktaları birleştir</p>
              </div>
              <div className="text-white text-right">
                <div className="text-2xl font-bold">{formatTime(time)}</div>
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
                className="grid gap-1 mb-4"
                style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
              >
                {grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => {
                    const endpoint = isEndpoint(rowIndex, colIndex);
                    const isInCurrentPath = currentPath.some(
                      ([r, c]) => r === rowIndex && c === colIndex
                    );

                    return (
                      <button
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        className={`
                          aspect-square flex items-center justify-center text-2xl font-bold rounded-lg
                          ${endpoint ? 'ring-4 ring-white' : ''}
                          ${isInCurrentPath ? 'ring-2 ring-yellow-400' : ''}
                          ${cell === null ? 'bg-white/20 hover:bg-white/30' : ''}
                          transition-all
                        `}
                        style={{
                          backgroundColor: cell !== null ? colors[cell - 1] : undefined,
                        }}
                      >
                        {endpoint ? '●' : ''}
                      </button>
                    );
                  })
                )}
              </div>

              <div className="flex justify-center gap-2 flex-wrap">
                {Array.from(endpoints.keys()).map((color) => (
                  <button
                    key={color}
                    onClick={() => clearPath(color as number)}
                    className="px-4 py-2 rounded-lg font-bold text-white transition-all hover:scale-110"
                    style={{ backgroundColor: colors[(color as number) - 1] }}
                  >
                    Renk {color} Temizle
                  </button>
                ))}
                <button
                  onClick={generatePuzzle}
                  className="px-4 py-2 rounded-lg font-bold text-white bg-orange-500 hover:bg-orange-600 transition-all"
                >
                  🔄 Yeni Puzzle
                </button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-white">
              <h3 className="font-bold mb-2">🔀 Nasıl Oynanır?</h3>
              <ul className="text-sm space-y-1 opacity-90">
                <li>• Aynı renkteki noktaları birleştir</li>
                <li>• Yollar kesişemez</li>
                <li>• Tüm hücreler doldurulmalı</li>
                <li>• Bir noktaya tıkla, yolu çiz, diğer noktaya tıkla</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ArukoneGame;

import React, { useState, useEffect } from 'react';

interface TectonicsGameProps {
  onBack: () => void;
}

const TectonicsGame: React.FC<TectonicsGameProps> = ({ onBack }) => {
  const [grid, setGrid] = useState<(number | null)[][]>([]);
  const [regions, setRegions] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const size = 7;

  useEffect(() => {
    generatePuzzle();
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const generatePuzzle = () => {
    const newGrid: (number | null)[][] = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));

    // Bölgeler (regions) - her hücre hangi bölgeye ait
    const newRegions: number[][] = [
      [0, 0, 1, 1, 2, 2, 2],
      [0, 0, 1, 1, 2, 3, 3],
      [4, 4, 4, 5, 5, 3, 3],
      [4, 6, 6, 5, 5, 7, 7],
      [8, 6, 6, 9, 9, 7, 7],
      [8, 8, 10, 9, 9, 11, 11],
      [8, 10, 10, 10, 12, 11, 11],
    ];

    // Bazı başlangıç sayıları
    newGrid[0][0] = 2;
    newGrid[2][2] = 3;
    newGrid[4][4] = 4;

    setGrid(newGrid);
    setRegions(newRegions);
  };

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell([row, col]);
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell) return;

    const [row, col] = selectedCell;
    const regionSize = getRegionSize(row, col);

    if (num > regionSize) {
      setMistakes((m) => m + 1);
      return;
    }

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

  const getRegionSize = (row: number, col: number) => {
    const regionId = regions[row][col];
    let count = 0;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (regions[r][c] === regionId) count++;
      }
    }
    return count;
  };

  const isValidMove = (row: number, col: number, num: number, currentGrid: (number | null)[][]) => {
    const regionId = regions[row][col];

    // Aynı bölgede aynı sayı olamaz
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if ((r !== row || c !== col) && regions[r][c] === regionId && currentGrid[r][c] === num) {
          return false;
        }
      }
    }

    // Komşu hücrelerde aynı sayı olamaz
    const neighbors = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];
    for (const [r, c] of neighbors) {
      if (r >= 0 && r < size && c >= 0 && c < size && currentGrid[r][c] === num) {
        return false;
      }
    }

    return true;
  };

  const checkCompletion = (currentGrid: (number | null)[][]) => {
    const isFilled = currentGrid.every((row) => row.every((cell) => cell !== null));
    if (isFilled) setIsComplete(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRegionColor = (regionId: number) => {
    const colors = [
      'bg-red-200/40',
      'bg-blue-200/40',
      'bg-green-200/40',
      'bg-yellow-200/40',
      'bg-purple-200/40',
      'bg-pink-200/40',
      'bg-indigo-200/40',
      'bg-orange-200/40',
      'bg-teal-200/40',
      'bg-cyan-200/40',
      'bg-lime-200/40',
      'bg-amber-200/40',
      'bg-rose-200/40',
    ];
    return colors[regionId % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            ⬅ GERİ DÖN
          </button>
          <div className="text-white text-center">
            <h2 className="text-3xl font-black">Tectonics</h2>
            <p className="text-sm opacity-80">Tektonik plakalar</p>
          </div>
          <div className="text-white text-right">
            <div className="text-2xl font-bold">{formatTime(time)}</div>
            <div className="text-sm">Hata: {mistakes}</div>
          </div>
        </div>

        {isComplete && (
          <div className="bg-green-500 text-white p-4 rounded-xl mb-4 text-center font-bold animate-bounce">
            🗻 Mükemmel! {formatTime(time)} sürede tamamladın!
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-4">
          <div className="grid gap-1 mb-4" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const isSelected = selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex;
                const regionColor = getRegionColor(regions[rowIndex][colIndex]);
                const regionSize = getRegionSize(rowIndex, colIndex);

                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className={`
                      aspect-square flex items-center justify-center text-xl font-bold rounded
                      ${isSelected ? 'ring-4 ring-yellow-400' : ''}
                      ${regionColor}
                      ${cell ? 'text-gray-900' : 'text-blue-300'}
                      hover:brightness-110 transition-all border-2 border-white/30
                    `}
                  >
                    {cell || ''}
                  </button>
                );
              })
            )}
          </div>

          <div className="flex justify-center gap-2 flex-wrap">
            {[1, 2, 3, 4, 5].map((num) => (
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
              onClick={() =>
                selectedCell &&
                setGrid(
                  grid.map((r, ri) =>
                    r.map((c, ci) => (ri === selectedCell[0] && ci === selectedCell[1] ? null : c))
                  )
                )
              }
              disabled={!selectedCell}
              className="bg-gray-500 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 h-12 rounded-xl font-bold transition-all"
            >
              Sil
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-white">
          <h3 className="font-bold mb-2">🗻 Nasıl Oynanır?</h3>
          <ul className="text-sm space-y-1 opacity-90">
            <li>• Her renkli bölge N hücre içeriyorsa, 1'den N'e kadar sayılar kullanılır</li>
            <li>• Aynı bölgede aynı sayı tekrar edemez</li>
            <li>• Komşu hücrelerde (yatay/dikey) aynı sayı olamaz</li>
            <li>• Bölge boyutuna dikkat et!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TectonicsGame;

import React, { useState, useEffect } from 'react';

interface TwoNotTouchGameProps {
  onBack: () => void;
}

const TwoNotTouchGame: React.FC<TwoNotTouchGameProps> = ({ onBack }) => {
  const [grid, setGrid] = useState<(number | null)[][]>([]);
  const [rowClues, setRowClues] = useState<number[]>([]);
  const [colClues, setColClues] = useState<number[]>([]);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const size = 8;

  useEffect(() => {
    generatePuzzle();
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const generatePuzzle = () => {
    const newGrid: (number | null)[][] = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));

    // Her satır ve sütunda kaç tane 2 olması gerektiği
    const newRowClues = [2, 3, 2, 2, 3, 2, 2, 2];
    const newColClues = [2, 2, 3, 2, 2, 3, 2, 2];

    setGrid(newGrid);
    setRowClues(newRowClues);
    setColClues(newColClues);
  };

  const handleCellClick = (row: number, col: number) => {
    const newGrid = grid.map((r) => [...r]);

    if (newGrid[row][col] === null) {
      newGrid[row][col] = 2;
    } else if (newGrid[row][col] === 2) {
      newGrid[row][col] = 0; // X işareti
    } else {
      newGrid[row][col] = null;
    }

    setGrid(newGrid);
    checkCompletion(newGrid);
  };

  const checkCompletion = (currentGrid: (number | null)[][]) => {
    // Tüm ipuçları sağlanıyor mu kontrol et
    let allCorrect = true;

    // Satır kontrolü
    for (let r = 0; r < size; r++) {
      const count = currentGrid[r].filter((c) => c === 2).length;
      if (count !== rowClues[r]) allCorrect = false;
    }

    // Sütun kontrolü
    for (let c = 0; c < size; c++) {
      const count = currentGrid.filter((r) => r[c] === 2).length;
      if (count !== colClues[c]) allCorrect = false;
    }

    if (allCorrect) {
      const allFilled = currentGrid.every((row) => row.every((cell) => cell !== null));
      if (allFilled) setIsComplete(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const canPlaceTwo = (row: number, col: number) => {
    // Komşu hücrelerde 2 var mı kontrol et
    const neighbors = [
      [row - 1, col - 1],
      [row - 1, col],
      [row - 1, col + 1],
      [row, col - 1],
      [row, col + 1],
      [row + 1, col - 1],
      [row + 1, col],
      [row + 1, col + 1],
    ];

    for (const [r, c] of neighbors) {
      if (r >= 0 && r < size && c >= 0 && c < size && grid[r][c] === 2) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            ⬅ GERİ DÖN
          </button>
          <div className="text-white text-center">
            <h2 className="text-3xl font-black">Two Not Touch</h2>
            <p className="text-sm opacity-80">İkiler birbirine değmemeli</p>
          </div>
          <div className="text-white text-right">
            <div className="text-2xl font-bold">{formatTime(time)}</div>
          </div>
        </div>

        {isComplete && (
          <div className="bg-green-500 text-white p-4 rounded-xl mb-4 text-center font-bold animate-bounce">
            🎉 Harika! {formatTime(time)} sürede tamamladın!
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-4">
          <div className="flex">
            {/* Sütun ipuçları */}
            <div className="flex">
              <div className="w-12"></div>
              {colClues.map((clue, idx) => (
                <div
                  key={idx}
                  className="w-12 h-12 flex items-center justify-center text-white font-bold"
                >
                  {clue}
                </div>
              ))}
            </div>
          </div>

          <div className="flex">
            {/* Satır ipuçları */}
            <div className="flex flex-col">
              {rowClues.map((clue, idx) => (
                <div
                  key={idx}
                  className="w-12 h-12 flex items-center justify-center text-white font-bold"
                >
                  {clue}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                  const canPlace = canPlaceTwo(rowIndex, colIndex);

                  return (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      className={`
                        w-12 h-12 flex items-center justify-center text-2xl font-bold rounded
                        ${cell === 2 ? 'bg-blue-600 text-white' : ''}
                        ${cell === 0 ? 'bg-red-900/30 text-red-400' : ''}
                        ${cell === null ? 'bg-white/20 hover:bg-white/30' : ''}
                        ${!canPlace && cell === null ? 'bg-red-500/20' : ''}
                        transition-all border border-white/20
                      `}
                    >
                      {cell === 2 ? '2' : cell === 0 ? '×' : ''}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-white">
          <h3 className="font-bold mb-2">🚫 Nasıl Oynanır?</h3>
          <ul className="text-sm space-y-1 opacity-90">
            <li>• Sayılar her satır/sütunda kaç tane 2 olması gerektiğini gösterir</li>
            <li>• İki tane 2, birbirine komşu olamaz (çapraz dahil)</li>
            <li>• Tıkla: 2 yerleştir, tekrar tıkla: X işaretle, tekrar tıkla: temizle</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TwoNotTouchGame;

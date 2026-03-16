import React, { useState, useEffect } from 'react';

interface StrimkoGameProps {
  onBack: () => void;
}

const StrimkoGame: React.FC<StrimkoGameProps> = ({ onBack }) => {
  const [grid, setGrid] = useState<(number | null)[][]>([]);
  const [streams, setStreams] = useState<number[][][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const size = 6;

  useEffect(() => {
    generatePuzzle();
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const generatePuzzle = () => {
    const newGrid: (number | null)[][] = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));

    // Başlangıç sayıları
    newGrid[0][0] = 1;
    newGrid[2][2] = 3;
    newGrid[4][4] = 5;

    // Akış yolları (streams)
    const newStreams = [
      [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 2],
        [2, 2],
        [2, 3],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 2],
        [3, 3],
        [4, 3],
      ],
      [
        [1, 0],
        [2, 0],
        [3, 0],
        [3, 1],
        [4, 1],
        [5, 1],
      ],
      [
        [0, 3],
        [0, 4],
        [1, 4],
        [2, 4],
        [2, 5],
        [3, 5],
      ],
      [
        [3, 4],
        [4, 4],
        [4, 5],
        [5, 5],
        [5, 4],
        [5, 3],
      ],
      [
        [1, 3],
        [2, 3],
        [3, 3],
        [4, 2],
        [5, 2],
        [5, 0],
      ],
    ];

    setGrid(newGrid);
    setStreams(newStreams);
  };

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell([row, col]);
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
    // Satır kontrolü
    for (let c = 0; c < size; c++) {
      if (c !== col && currentGrid[row][c] === num) return false;
    }

    // Sütun kontrolü
    for (let r = 0; r < size; r++) {
      if (r !== row && currentGrid[r][col] === num) return false;
    }

    // Stream kontrolü - aynı stream'de aynı sayı olamaz
    const stream = getStreamForCell(row, col);
    if (stream) {
      for (const [r, c] of stream) {
        if ((r !== row || c !== col) && currentGrid[r][c] === num) return false;
      }
    }

    return true;
  };

  const getStreamForCell = (row: number, col: number) => {
    return streams.find((stream) => stream.some(([r, c]) => r === row && c === col));
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

  const getStreamColor = (row: number, col: number) => {
    const streamIndex = streams.findIndex((stream) =>
      stream.some(([r, c]) => r === row && c === col)
    );
    const colors = [
      'border-red-400',
      'border-blue-400',
      'border-green-400',
      'border-yellow-400',
      'border-purple-400',
      'border-pink-400',
    ];
    return streamIndex >= 0 ? colors[streamIndex] : 'border-white/20';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            ⬅ GERİ DÖN
          </button>
          <div className="text-white text-center">
            <h2 className="text-3xl font-black">Strimko</h2>
            <p className="text-sm opacity-80">Akış yolları puzzle</p>
          </div>
          <div className="text-white text-right">
            <div className="text-2xl font-bold">{formatTime(time)}</div>
            <div className="text-sm">Hata: {mistakes}</div>
          </div>
        </div>

        {isComplete && (
          <div className="bg-green-500 text-white p-4 rounded-xl mb-4 text-center font-bold animate-bounce">
            🌊 Harika! {formatTime(time)} sürede tamamladın!
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-4">
          <div className="grid gap-1 mb-4" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const isSelected = selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex;
                const isFixed = cell !== null && grid[rowIndex][colIndex] !== null;
                const borderColor = getStreamColor(rowIndex, colIndex);

                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className={`
                      aspect-square flex items-center justify-center text-2xl font-bold rounded
                      ${isSelected ? 'ring-4 ring-yellow-400' : ''}
                      ${cell ? 'bg-white/30 text-gray-900' : 'bg-white/10 hover:bg-white/20 text-blue-300'}
                      ${isFixed ? 'cursor-not-allowed font-black' : ''}
                      border-4 ${borderColor}
                      transition-all
                    `}
                  >
                    {cell || ''}
                  </button>
                );
              })
            )}
          </div>

          <div className="flex justify-center gap-2 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberInput(num)}
                disabled={!selectedCell}
                className="bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white w-12 h-12 rounded-xl font-bold text-xl transition-all hover:scale-110"
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
              className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 h-12 rounded-xl font-bold transition-all"
            >
              Sil
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-white">
          <h3 className="font-bold mb-2">🌊 Nasıl Oynanır?</h3>
          <ul className="text-sm space-y-1 opacity-90">
            <li>• Her satır ve sütunda 1-6 arası her sayı bir kez bulunmalı</li>
            <li>• Renkli kenarlıklar akış yollarını (stream) gösterir</li>
            <li>• Aynı akış yolunda aynı sayı tekrar edemez</li>
            <li>• Sudoku + ekstra kısıtlama!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StrimkoGame;

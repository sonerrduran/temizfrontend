import React, { useState, useEffect } from 'react';

interface MathdokuGameProps {
  onBack: () => void;
}

const MathdokuGame: React.FC<MathdokuGameProps> = ({ onBack }) => {
  const [grid, setGrid] = useState<(number | null)[][]>([]);
  const [cages, setCages] = useState<
    { cells: [number, number][]; target: number; operation: string }[]
  >([]);
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

    const newCages = [
      {
        cells: [
          [0, 0],
          [0, 1],
        ],
        target: 11,
        operation: '+',
      },
      {
        cells: [
          [0, 2],
          [1, 2],
        ],
        target: 2,
        operation: '÷',
      },
      {
        cells: [
          [0, 3],
          [0, 4],
          [0, 5],
        ],
        target: 20,
        operation: '×',
      },
      {
        cells: [
          [1, 0],
          [2, 0],
        ],
        target: 2,
        operation: '-',
      },
      {
        cells: [
          [1, 1],
          [2, 1],
        ],
        target: 3,
        operation: '÷',
      },
      {
        cells: [
          [1, 3],
          [1, 4],
        ],
        target: 3,
        operation: '-',
      },
      {
        cells: [
          [1, 5],
          [2, 5],
        ],
        target: 3,
        operation: '÷',
      },
      {
        cells: [
          [2, 2],
          [2, 3],
          [2, 4],
        ],
        target: 6,
        operation: '+',
      },
      {
        cells: [
          [3, 0],
          [4, 0],
        ],
        target: 3,
        operation: '-',
      },
      {
        cells: [
          [3, 1],
          [3, 2],
        ],
        target: 2,
        operation: '÷',
      },
      {
        cells: [
          [3, 3],
          [4, 3],
        ],
        target: 1,
        operation: '-',
      },
      {
        cells: [
          [3, 4],
          [3, 5],
        ],
        target: 11,
        operation: '+',
      },
      {
        cells: [
          [4, 1],
          [4, 2],
        ],
        target: 5,
        operation: '+',
      },
      {
        cells: [
          [4, 4],
          [4, 5],
        ],
        target: 4,
        operation: '×',
      },
      {
        cells: [
          [5, 0],
          [5, 1],
        ],
        target: 10,
        operation: '+',
      },
      {
        cells: [
          [5, 2],
          [5, 3],
        ],
        target: 4,
        operation: '×',
      },
      {
        cells: [
          [5, 4],
          [5, 5],
        ],
        target: 7,
        operation: '+',
      },
    ];

    setGrid(newGrid);
    setCages(newCages);
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

    return true;
  };

  const checkCompletion = (currentGrid: (number | null)[][]) => {
    const isFilled = currentGrid.every((row) => row.every((cell) => cell !== null));
    if (isFilled) setIsComplete(true);
  };

  const getCageForCell = (row: number, col: number) => {
    return cages.find((cage) => cage.cells.some(([r, c]) => r === row && c === col));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCageColor = (cageIndex: number) => {
    const colors = [
      'bg-red-200/50',
      'bg-blue-200/50',
      'bg-green-200/50',
      'bg-yellow-200/50',
      'bg-purple-200/50',
      'bg-pink-200/50',
      'bg-indigo-200/50',
      'bg-orange-200/50',
      'bg-teal-200/50',
      'bg-cyan-200/50',
      'bg-lime-200/50',
      'bg-amber-200/50',
      'bg-rose-200/50',
      'bg-violet-200/50',
      'bg-fuchsia-200/50',
      'bg-emerald-200/50',
      'bg-sky-200/50',
    ];
    return colors[cageIndex % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            ⬅ GERİ DÖN
          </button>
          <div className="text-white text-center">
            <h2 className="text-3xl font-black">Mathdoku</h2>
            <p className="text-sm opacity-80">Matematik kafesleri</p>
          </div>
          <div className="text-white text-right">
            <div className="text-2xl font-bold">{formatTime(time)}</div>
            <div className="text-sm">Hata: {mistakes}</div>
          </div>
        </div>

        {isComplete && (
          <div className="bg-green-500 text-white p-4 rounded-xl mb-4 text-center font-bold animate-bounce">
            🎉 Tebrikler! {formatTime(time)} sürede tamamladın!
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-4">
          <div className="grid gap-1 mb-4" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const isSelected = selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex;
                const cage = getCageForCell(rowIndex, colIndex);
                const cageIndex = cages.indexOf(cage!);
                const isFirstInCage =
                  cage && cage.cells[0][0] === rowIndex && cage.cells[0][1] === colIndex;

                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className={`
                      aspect-square flex items-center justify-center text-2xl font-bold rounded relative
                      ${isSelected ? 'ring-4 ring-yellow-400' : ''}
                      ${cage ? getCageColor(cageIndex) : 'bg-white/20'}
                      ${cell ? 'text-gray-900' : 'text-blue-300'}
                      hover:bg-white/30 transition-all border-2 border-white/30
                    `}
                  >
                    {isFirstInCage && (
                      <div className="absolute top-0 left-0 text-[10px] font-bold text-gray-900 p-1">
                        {cage.target}
                        {cage.operation}
                      </div>
                    )}
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
                className="bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white w-12 h-12 rounded-xl font-bold text-xl transition-all hover:scale-110"
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
          <h3 className="font-bold mb-2">🔢 Nasıl Oynanır?</h3>
          <ul className="text-sm space-y-1 opacity-90">
            <li>• Her satır ve sütunda 1-6 arası her sayı bir kez bulunmalı</li>
            <li>• Renkli kafeslerdeki sayılar verilen işlemi sağlamalı</li>
            <li>• Örnek: "11+" = kafesteki sayıların toplamı 11</li>
            <li>• "2÷" = kafesteki sayılardan biri diğerine bölününce 2</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MathdokuGame;

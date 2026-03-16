import React, { useState, useEffect } from 'react';

interface LatinSquaresGameProps {
  onBack: () => void;
}

const LatinSquaresGame: React.FC<LatinSquaresGameProps> = ({ onBack }) => {
  const [grid, setGrid] = useState<(string | null)[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const size = 6;
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  useEffect(() => {
    generatePuzzle();
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const generatePuzzle = () => {
    const newGrid: (string | null)[][] = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));

    // Bazı başlangıç harfleri
    const startingCells = [
      [0, 0, 'A'],
      [0, 3, 'D'],
      [1, 1, 'B'],
      [1, 4, 'E'],
      [2, 2, 'C'],
      [2, 5, 'F'],
      [3, 0, 'D'],
      [3, 3, 'A'],
      [4, 1, 'E'],
      [4, 4, 'B'],
      [5, 2, 'F'],
      [5, 5, 'C'],
    ];

    startingCells.forEach(([r, c, val]) => {
      newGrid[r][c] = val as string;
    });

    setGrid(newGrid);
  };

  const handleCellClick = (row: number, col: number) => {
    if (grid[row][col] === null) {
      setSelectedCell([row, col]);
    }
  };

  const handleLetterInput = (letter: string) => {
    if (!selectedCell) return;

    const [row, col] = selectedCell;
    const newGrid = grid.map((r) => [...r]);
    newGrid[row][col] = letter;

    if (!isValidMove(row, col, letter, newGrid)) {
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

  const isValidMove = (
    row: number,
    col: number,
    letter: string,
    currentGrid: (string | null)[][]
  ) => {
    // Satır kontrolü
    for (let c = 0; c < size; c++) {
      if (c !== col && currentGrid[row][c] === letter) return false;
    }

    // Sütun kontrolü
    for (let r = 0; r < size; r++) {
      if (r !== row && currentGrid[r][col] === letter) return false;
    }

    return true;
  };

  const checkCompletion = (currentGrid: (string | null)[][]) => {
    const isFilled = currentGrid.every((row) => row.every((cell) => cell !== null));
    if (isFilled) setIsComplete(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getLetterColor = (letter: string) => {
    const colors: { [key: string]: string } = {
      A: 'bg-red-500',
      B: 'bg-blue-500',
      C: 'bg-green-500',
      D: 'bg-yellow-500',
      E: 'bg-purple-500',
      F: 'bg-pink-500',
    };
    return colors[letter] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            ⬅ GERİ DÖN
          </button>
          <div className="text-white text-center">
            <h2 className="text-3xl font-black">Latin Squares</h2>
            <p className="text-sm opacity-80">Latin kareleri</p>
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
          <div className="grid gap-2 mb-4" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const isSelected = selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex;
                const isFixed = cell !== null && grid[rowIndex][colIndex] !== null;

                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    disabled={isFixed}
                    className={`
                      aspect-square flex items-center justify-center text-2xl font-bold rounded-xl
                      ${isSelected ? 'ring-4 ring-yellow-400' : ''}
                      ${cell ? getLetterColor(cell) + ' text-white' : 'bg-white/20 hover:bg-white/30'}
                      ${isFixed ? 'cursor-not-allowed opacity-80' : ''}
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
            {letters.map((letter) => (
              <button
                key={letter}
                onClick={() => handleLetterInput(letter)}
                disabled={!selectedCell}
                className={`${getLetterColor(letter)} hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed text-white w-14 h-14 rounded-xl font-bold text-xl transition-all hover:scale-110`}
              >
                {letter}
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
              className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 h-14 rounded-xl font-bold transition-all"
            >
              Sil
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-white">
          <h3 className="font-bold mb-2">🔠 Nasıl Oynanır?</h3>
          <ul className="text-sm space-y-1 opacity-90">
            <li>• Her satırda A-F harflerinin her biri bir kez bulunmalı</li>
            <li>• Her sütunda A-F harflerinin her biri bir kez bulunmalı</li>
            <li>• Sudoku gibi ama harflerle!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LatinSquaresGame;

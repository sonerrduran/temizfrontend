import React, { useState, useEffect } from 'react';

interface GreaterThanKillerSudokuGameProps {
  onBack: () => void;
}

const GreaterThanKillerSudokuGame: React.FC<GreaterThanKillerSudokuGameProps> = ({ onBack }) => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [initialGrid, setInitialGrid] = useState<number[][]>([]);
  const [cages, setCages] = useState<{ cells: [number, number][]; sum: number; color: string }[]>(
    []
  );
  const [greaterThan, setGreaterThan] = useState<
    { row: number; col: number; direction: 'right' | 'down' }[]
  >([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
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
    const size = 6;
    const newSolution: number[][] = Array(size)
      .fill(0)
      .map(() => Array(size).fill(0));

    // Generate solution
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        newSolution[i][j] = ((i * 2 + j) % size) + 1;
      }
    }

    // Generate cages
    const colors = [
      'bg-red-200/40',
      'bg-blue-200/40',
      'bg-green-200/40',
      'bg-yellow-200/40',
      'bg-purple-200/40',
      'bg-pink-200/40',
    ];
    const newCages: { cells: [number, number][]; sum: number; color: string }[] = [];

    // Simple 2-cell cages
    for (let i = 0; i < 6; i++) {
      const cells: [number, number][] = [
        [i, 0],
        [i, 1],
      ];
      const sum = newSolution[i][0] + newSolution[i][1];
      newCages.push({ cells, sum, color: colors[i % colors.length] });
    }

    // Generate greater-than constraints
    const newGreaterThan: { row: number; col: number; direction: 'right' | 'down' }[] = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size - 1; j++) {
        if (Math.random() > 0.6) {
          if (newSolution[i][j] > newSolution[i][j + 1]) {
            newGreaterThan.push({ row: i, col: j, direction: 'right' });
          }
        }
      }
    }
    for (let i = 0; i < size - 1; i++) {
      for (let j = 0; j < size; j++) {
        if (Math.random() > 0.6) {
          if (newSolution[i][j] > newSolution[i + 1][j]) {
            newGreaterThan.push({ row: i, col: j, direction: 'down' });
          }
        }
      }
    }

    const newGrid = newSolution.map((row) => [...row]);
    const cellsToRemove = 20;
    let removed = 0;

    while (removed < cellsToRemove) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      if (newGrid[row][col] !== 0) {
        newGrid[row][col] = 0;
        removed++;
      }
    }

    setGrid(newGrid);
    setSolution(newSolution);
    setInitialGrid(newGrid.map((row) => [...row]));
    setCages(newCages);
    setGreaterThan(newGreaterThan);
    setMistakes(0);
    setTime(0);
    setIsComplete(false);
  };

  const handleCellClick = (row: number, col: number) => {
    if (initialGrid[row][col] === 0) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    if (initialGrid[row][col] !== 0) return;

    const newGrid = grid.map((r) => [...r]);
    newGrid[row][col] = num;
    setGrid(newGrid);

    if (num !== 0 && num !== solution[row][col]) {
      setMistakes((m) => m + 1);
    }

    checkCompletion(newGrid);
  };

  const checkCompletion = (currentGrid: number[][]) => {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (currentGrid[i][j] !== solution[i][j]) return;
      }
    }
    setIsComplete(true);
  };

  const getCageColor = (row: number, col: number): string => {
    const cage = cages.find((c) => c.cells.some(([r, c]) => r === row && c === col));
    return cage?.color || 'bg-white/90';
  };

  const getCageSum = (row: number, col: number): number | null => {
    const cage = cages.find((c) => c.cells[0][0] === row && c.cells[0][1] === col);
    return cage?.sum || null;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all backdrop-blur-sm border border-white/20"
          >
            ⬅ GERİ DÖN
          </button>
          <h1 className="text-2xl md:text-3xl font-black text-white">Büyüktür Killer Sudoku</h1>
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
                  <li>• Her satır ve sütunda 1-6 arası sayılar bir kez</li>
                  <li>• Renkli kafesler: Hücrelerin toplamı gösterilen sayı</li>
                  <li>• &gt; işareti: Sol/üst hücre sağ/alt hücreden büyük</li>
                  <li>• Her 2x3 ve 3x2 bölgede tekrar yok</li>
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
          <div className="inline-block relative">
            {grid.map((row, i) => (
              <div key={i} className="flex">
                {row.map((cell, j) => (
                  <div key={j} className="relative">
                    <button
                      onClick={() => handleCellClick(i, j)}
                      className={`w-12 h-12 md:w-14 md:h-14 border-2 font-bold text-lg md:text-xl transition-all ${getCageColor(
                        i,
                        j
                      )} ${
                        initialGrid[i][j] !== 0
                          ? 'text-blue-900 cursor-default'
                          : cell === 0
                            ? 'text-gray-800 hover:bg-blue-100'
                            : cell === solution[i][j]
                              ? 'text-green-900'
                              : 'text-red-900'
                      } ${
                        selectedCell?.row === i && selectedCell?.col === j
                          ? 'ring-4 ring-yellow-400'
                          : ''
                      } ${
                        j % 3 === 2 && j < 5 ? 'border-r-4 border-r-gray-800' : 'border-r-gray-400'
                      } ${
                        i % 2 === 1 && i < 5 ? 'border-b-4 border-b-gray-800' : 'border-b-gray-400'
                      }`}
                    >
                      {cell !== 0 ? cell : ''}
                    </button>

                    {/* Cage sum */}
                    {getCageSum(i, j) && (
                      <div className="absolute top-0 left-0 text-xs font-bold text-gray-700 bg-white/70 px-1 rounded">
                        {getCageSum(i, j)}
                      </div>
                    )}

                    {/* Greater than symbols */}
                    {greaterThan.find(
                      (gt) => gt.row === i && gt.col === j && gt.direction === 'right'
                    ) && (
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-red-600 font-bold text-xl z-10">
                        &gt;
                      </div>
                    )}
                    {greaterThan.find(
                      (gt) => gt.row === i && gt.col === j && gt.direction === 'down'
                    ) && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-red-600 font-bold text-xl z-10 rotate-90">
                        &gt;
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberInput(num)}
              className="py-4 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold text-xl transition-all backdrop-blur-sm border border-white/20"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleNumberInput(0)}
            className="py-4 bg-red-500/30 hover:bg-red-500/40 rounded-xl text-white font-bold transition-all backdrop-blur-sm border border-red-300/30"
          >
            Sil
          </button>
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
              <h2 className="text-3xl font-black text-white mb-4">Harika!</h2>
              <p className="text-white/90 mb-6">
                Büyüktür Killer Sudoku'yu {formatTime(time)} sürede, {mistakes} hata ile
                tamamladınız!
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

export default GreaterThanKillerSudokuGame;

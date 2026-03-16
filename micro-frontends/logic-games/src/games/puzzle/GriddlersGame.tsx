import React, { useState, useEffect } from 'react';

interface GriddlersGameProps {
  onBack: () => void;
}

const GriddlersGame: React.FC<GriddlersGameProps> = ({ onBack }) => {
  const [grid, setGrid] = useState<(boolean | null)[][]>([]);
  const [solution, setSolution] = useState<boolean[][]>([]);
  const [rowClues, setRowClues] = useState<number[][]>([]);
  const [colClues, setColClues] = useState<number[][]>([]);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const size = 12;

  useEffect(() => {
    generatePuzzle();
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const generatePuzzle = () => {
    // Yıldız şekli
    const newSolution: boolean[][] = [
      [false, false, false, false, false, true, true, false, false, false, false, false],
      [false, false, false, false, false, true, true, false, false, false, false, false],
      [false, false, false, false, false, true, true, false, false, false, false, false],
      [true, true, true, true, true, true, true, true, true, true, true, true],
      [false, true, true, true, true, true, true, true, true, true, true, false],
      [false, false, true, true, true, true, true, true, true, true, false, false],
      [false, false, true, true, true, true, true, true, true, true, false, false],
      [false, true, true, true, true, true, true, true, true, true, true, false],
      [true, true, true, true, true, true, true, true, true, true, true, true],
      [false, false, false, false, false, true, true, false, false, false, false, false],
      [false, false, false, false, false, true, true, false, false, false, false, false],
      [false, false, false, false, false, true, true, false, false, false, false, false],
    ];

    const newGrid: (boolean | null)[][] = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));

    const newRowClues: number[][] = [];
    const newColClues: number[][] = [];

    for (let r = 0; r < size; r++) {
      const clues: number[] = [];
      let count = 0;
      for (let c = 0; c < size; c++) {
        if (newSolution[r][c]) {
          count++;
        } else if (count > 0) {
          clues.push(count);
          count = 0;
        }
      }
      if (count > 0) clues.push(count);
      newRowClues.push(clues.length > 0 ? clues : [0]);
    }

    for (let c = 0; c < size; c++) {
      const clues: number[] = [];
      let count = 0;
      for (let r = 0; r < size; r++) {
        if (newSolution[r][c]) {
          count++;
        } else if (count > 0) {
          clues.push(count);
          count = 0;
        }
      }
      if (count > 0) clues.push(count);
      newColClues.push(clues.length > 0 ? clues : [0]);
    }

    setGrid(newGrid);
    setSolution(newSolution);
    setRowClues(newRowClues);
    setColClues(newColClues);
  };

  const handleCellClick = (row: number, col: number, rightClick: boolean = false) => {
    const newGrid = grid.map((r) => [...r]);

    if (rightClick) {
      newGrid[row][col] = newGrid[row][col] === false ? null : false;
    } else {
      newGrid[row][col] = newGrid[row][col] === true ? null : true;
    }

    setGrid(newGrid);
    checkCompletion(newGrid);
  };

  const checkCompletion = (currentGrid: (boolean | null)[][]) => {
    let correct = true;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (solution[r][c] && currentGrid[r][c] !== true) correct = false;
        if (!solution[r][c] && currentGrid[r][c] === true) correct = false;
      }
    }
    if (correct) {
      const allFilled = currentGrid.every((row) => row.every((cell) => cell !== null));
      if (allFilled) setIsComplete(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            ⬅ GERİ DÖN
          </button>
          <div className="text-white text-center">
            <h2 className="text-3xl font-black">Griddlers</h2>
            <p className="text-sm opacity-80">Izgara bulmacası</p>
          </div>
          <div className="text-white text-right">
            <div className="text-2xl font-bold">{formatTime(time)}</div>
          </div>
        </div>

        {isComplete && (
          <div className="bg-green-500 text-white p-4 rounded-xl mb-4 text-center font-bold animate-bounce">
            ⭐ Harika! {formatTime(time)} sürede tamamladın!
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-4 overflow-auto">
          <div className="flex">
            <div className="flex flex-col">
              <div style={{ height: '60px' }} className="mb-1"></div>
              {colClues.map((clues, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-end"
                  style={{ width: '35px', height: '35px' }}
                >
                  <div className="text-[10px] text-white font-bold">{clues.join(' ')}</div>
                </div>
              ))}
            </div>

            <div>
              {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-center">
                  <div className="w-16 text-right pr-2 text-[10px] text-white font-bold">
                    {rowClues[rowIndex].join(' ')}
                  </div>
                  {row.map((cell, colIndex) => (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleCellClick(rowIndex, colIndex, false)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        handleCellClick(rowIndex, colIndex, true);
                      }}
                      className={`
                        w-[35px] h-[35px] border border-white/20 flex items-center justify-center text-sm font-bold
                        ${cell === true ? 'bg-green-600' : ''}
                        ${cell === false ? 'bg-red-900/30' : ''}
                        ${cell === null ? 'bg-white/10 hover:bg-white/20' : ''}
                        transition-all
                      `}
                    >
                      {cell === false ? '×' : ''}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-white">
          <h3 className="font-bold mb-2">🎯 Nasıl Oynanır?</h3>
          <ul className="text-sm space-y-1 opacity-90">
            <li>• Sol tık: Hücreyi doldur</li>
            <li>• Sağ tık: Hücreyi boş işaretle</li>
            <li>• Sayılar dolu hücre gruplarını gösterir</li>
            <li>• Gruplar arasında en az 1 boş hücre olmalı</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GriddlersGame;

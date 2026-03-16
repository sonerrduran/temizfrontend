import React, { useState, useEffect } from 'react';

interface PicrossGameProps {
  onBack: () => void;
}

const PicrossGame: React.FC<PicrossGameProps> = ({ onBack }) => {
  const [grid, setGrid] = useState<(boolean | null)[][]>([]);
  const [solution, setSolution] = useState<boolean[][]>([]);
  const [rowClues, setRowClues] = useState<number[][]>([]);
  const [colClues, setColClues] = useState<number[][]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const size = 10;

  useEffect(() => {
    generatePuzzle();
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const generatePuzzle = () => {
    // Basit bir kalp şekli
    const newSolution: boolean[][] = [
      [false, true, true, false, false, false, true, true, false, false],
      [true, true, true, true, false, true, true, true, true, false],
      [true, true, true, true, true, true, true, true, true, false],
      [true, true, true, true, true, true, true, true, true, false],
      [false, true, true, true, true, true, true, true, false, false],
      [false, false, true, true, true, true, true, false, false, false],
      [false, false, false, true, true, true, false, false, false, false],
      [false, false, false, false, true, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
    ];

    const newGrid: (boolean | null)[][] = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));

    // İpuçlarını hesapla
    const newRowClues: number[][] = [];
    const newColClues: number[][] = [];

    // Satır ipuçları
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

    // Sütun ipuçları
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
      // Sağ tık: X işareti (boş)
      newGrid[row][col] = newGrid[row][col] === false ? null : false;
    } else {
      // Sol tık: Dolu
      newGrid[row][col] = newGrid[row][col] === true ? null : true;
    }

    setGrid(newGrid);
    checkCompletion(newGrid);
  };

  const checkCompletion = (currentGrid: (boolean | null)[][]) => {
    let correct = true;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (solution[r][c] && currentGrid[r][c] !== true) {
          correct = false;
        }
        if (!solution[r][c] && currentGrid[r][c] === true) {
          correct = false;
        }
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-teal-900 to-blue-900 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            ⬅ GERİ DÖN
          </button>
          <div className="text-white text-center">
            <h2 className="text-3xl font-black">Picross</h2>
            <p className="text-sm opacity-80">Resmi ortaya çıkar</p>
          </div>
          <div className="text-white text-right">
            <div className="text-2xl font-bold">{formatTime(time)}</div>
            <div className="text-sm">Hata: {mistakes}</div>
          </div>
        </div>

        {isComplete && (
          <div className="bg-green-500 text-white p-4 rounded-xl mb-4 text-center font-bold animate-bounce">
            🎉 Tebrikler! Resmi {formatTime(time)} sürede tamamladın!
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-4">
          <div className="flex">
            {/* Sütun ipuçları */}
            <div className="flex flex-col">
              <div style={{ height: '80px' }} className="mb-1"></div>
              {colClues.map((clues, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-end"
                  style={{ width: '40px', height: '40px' }}
                >
                  <div className="text-xs text-white font-bold">{clues.join(' ')}</div>
                </div>
              ))}
            </div>

            <div>
              {/* Satır ipuçları ve grid */}
              {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-center">
                  <div className="w-20 text-right pr-2 text-xs text-white font-bold">
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
                        w-10 h-10 border border-white/20 flex items-center justify-center text-xl font-bold
                        ${cell === true ? 'bg-blue-600' : ''}
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
          <h3 className="font-bold mb-2">🖼️ Nasıl Oynanır?</h3>
          <ul className="text-sm space-y-1 opacity-90">
            <li>• Sol tık: Hücreyi doldur (mavi)</li>
            <li>• Sağ tık: Hücreyi boş işaretle (X)</li>
            <li>• Sayılar, o satır/sütundaki dolu hücre gruplarını gösterir</li>
            <li>• Örnek: "2 3" = 2 dolu, boşluk, 3 dolu</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PicrossGame;

import React, { useState, useEffect } from 'react';

interface LogicGridPuzzleGameProps {
  onBack: () => void;
}

const LogicGridPuzzleGame: React.FC<LogicGridPuzzleGameProps> = ({ onBack }) => {
  const [grid, setGrid] = useState<('yes' | 'no' | '')[][]>([]);
  const [solution, setSolution] = useState<('yes' | 'no')[][]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [cluesVisible, setCluesVisible] = useState(true);

  const categories = {
    names: ['Ali', 'Ayşe', 'Mehmet'],
    colors: ['Kırmızı', 'Mavi', 'Yeşil'],
    fruits: ['Elma', 'Muz', 'Portakal'],
  };

  const clues = [
    '1. Ali kırmızı rengi sever',
    '2. Muz seven kişi mavi rengi sever',
    '3. Ayşe elma sever',
    '4. Mehmet yeşil rengi sever',
  ];

  useEffect(() => {
    initializePuzzle();
  }, []);

  useEffect(() => {
    if (!isComplete) {
      const timer = setInterval(() => setTime((t) => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isComplete]);

  const initializePuzzle = () => {
    // Solution: Ali-Kırmızı-Portakal, Ayşe-Yeşil-Elma, Mehmet-Mavi-Muz
    // Grid is 6x6: Names vs Colors (3x3) and Names vs Fruits (3x3)
    const newSolution: ('yes' | 'no')[][] = [
      // Names vs Colors
      ['yes', 'no', 'no'], // Ali: Kırmızı-yes, Mavi-no, Yeşil-no
      ['no', 'no', 'yes'], // Ayşe: Kırmızı-no, Mavi-no, Yeşil-yes
      ['no', 'yes', 'no'], // Mehmet: Kırmızı-no, Mavi-yes, Yeşil-no
      // Names vs Fruits
      ['no', 'no', 'yes'], // Ali: Elma-no, Muz-no, Portakal-yes
      ['yes', 'no', 'no'], // Ayşe: Elma-yes, Muz-no, Portakal-no
      ['no', 'yes', 'no'], // Mehmet: Elma-no, Muz-yes, Portakal-no
    ];

    const newGrid: ('yes' | 'no' | '')[][] = Array(6)
      .fill(0)
      .map(() => Array(3).fill(''));

    setGrid(newGrid);
    setSolution(newSolution);
    setMistakes(0);
    setTime(0);
    setIsComplete(false);
  };

  const handleCellClick = (row: number, col: number) => {
    const newGrid = grid.map((r) => [...r]);

    if (newGrid[row][col] === '') {
      newGrid[row][col] = 'yes';
    } else if (newGrid[row][col] === 'yes') {
      newGrid[row][col] = 'no';
    } else {
      newGrid[row][col] = '';
    }

    setGrid(newGrid);

    // Check if wrong
    if (newGrid[row][col] !== '' && newGrid[row][col] !== solution[row][col]) {
      setMistakes((m) => m + 1);
    }

    checkCompletion(newGrid);
  };

  const checkCompletion = (currentGrid: ('yes' | 'no' | '')[][]) => {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
        if (currentGrid[i][j] !== solution[i][j]) return;
      }
    }
    setIsComplete(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCellContent = (value: 'yes' | 'no' | '') => {
    if (value === 'yes') return '✓';
    if (value === 'no') return '✗';
    return '';
  };

  const getCellColor = (value: 'yes' | 'no' | '', row: number, col: number) => {
    if (value === '') return 'bg-white/20 hover:bg-white/30';
    if (value === solution[row][col]) {
      return value === 'yes' ? 'bg-green-500/50' : 'bg-red-500/30';
    }
    return 'bg-orange-500/50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all backdrop-blur-sm border border-white/20"
          >
            ⬅ GERİ DÖN
          </button>
          <h1 className="text-3xl md:text-4xl font-black text-white">Mantık Tablosu</h1>
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
                  <li>• İpuçlarını kullanarak tabloyu doldurun</li>
                  <li>• Tıklayarak: Boş → ✓ (Evet) → ✗ (Hayır) → Boş</li>
                  <li>• ✓ = Bu eşleşme doğru</li>
                  <li>• ✗ = Bu eşleşme yanlış</li>
                  <li>• Her kişi bir renk ve bir meyve ile eşleşir</li>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Grid */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            {/* Names vs Colors */}
            <div className="mb-6">
              <h3 className="text-white font-bold mb-3">İsimler - Renkler</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border-2 border-white/30 p-2 bg-cyan-600/50 text-white font-bold text-sm"></th>
                    {categories.colors.map((color) => (
                      <th
                        key={color}
                        className="border-2 border-white/30 p-2 bg-cyan-600/50 text-white font-bold text-sm"
                      >
                        {color}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categories.names.map((name, i) => (
                    <tr key={name}>
                      <td className="border-2 border-white/30 p-2 bg-cyan-500/30 text-white font-bold text-sm">
                        {name}
                      </td>
                      {[0, 1, 2].map((j) => (
                        <td
                          key={j}
                          onClick={() => handleCellClick(i, j)}
                          className={`border-2 border-white/30 p-3 cursor-pointer transition-all text-center text-2xl ${getCellColor(
                            grid[i][j],
                            i,
                            j
                          )}`}
                        >
                          {getCellContent(grid[i][j])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Names vs Fruits */}
            <div>
              <h3 className="text-white font-bold mb-3">İsimler - Meyveler</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border-2 border-white/30 p-2 bg-cyan-600/50 text-white font-bold text-sm"></th>
                    {categories.fruits.map((fruit) => (
                      <th
                        key={fruit}
                        className="border-2 border-white/30 p-2 bg-cyan-600/50 text-white font-bold text-sm"
                      >
                        {fruit}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categories.names.map((name, i) => (
                    <tr key={name}>
                      <td className="border-2 border-white/30 p-2 bg-cyan-500/30 text-white font-bold text-sm">
                        {name}
                      </td>
                      {[0, 1, 2].map((j) => (
                        <td
                          key={j}
                          onClick={() => handleCellClick(i + 3, j)}
                          className={`border-2 border-white/30 p-3 cursor-pointer transition-all text-center text-2xl ${getCellColor(
                            grid[i + 3][j],
                            i + 3,
                            j
                          )}`}
                        >
                          {getCellContent(grid[i + 3][j])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Clues Panel */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold">İpuçları</h3>
              <button
                onClick={() => setCluesVisible(!cluesVisible)}
                className="text-white/70 hover:text-white text-sm"
              >
                {cluesVisible ? '▼' : '▶'}
              </button>
            </div>
            {cluesVisible && (
              <div className="space-y-3">
                {clues.map((clue, idx) => (
                  <div key={idx} className="text-white/90 text-sm p-3 bg-white/5 rounded-lg">
                    {clue}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={initializePuzzle}
          className="w-full mt-6 py-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-xl text-white font-bold text-lg transition-all shadow-lg"
        >
          🔄 Yeniden Başlat
        </button>

        {/* Completion Modal */}
        {isComplete && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-black text-white mb-4">Mükemmel!</h2>
              <p className="text-white/90 mb-6">
                Mantık Tablosu'nu {formatTime(time)} sürede, {mistakes} hata ile çözdünüz!
              </p>
              <div className="flex gap-3">
                <button
                  onClick={initializePuzzle}
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

export default LogicGridPuzzleGame;

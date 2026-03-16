import React, { useState, useEffect } from 'react';

interface ShapeLabyrinthGameProps {
  onBack: () => void;
}

type ShapeType = 'circle' | 'square' | 'triangle' | 'star';

interface Cell {
  x: number;
  y: number;
  shape: ShapeType | null;
  isPath: boolean;
  isStart: boolean;
  isEnd: boolean;
  visited: boolean;
}

const ShapeLabyrinthGame: React.FC<ShapeLabyrinthGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gridSize] = useState(5);
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [targetShape, setTargetShape] = useState<ShapeType>('circle');
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showRules, setShowRules] = useState(true);

  const shapes: ShapeType[] = ['circle', 'square', 'triangle', 'star'];
  const shapeEmojis: Record<ShapeType, string> = {
    circle: '🔵',
    square: '🟦',
    triangle: '🔺',
    star: '⭐',
  };

  useEffect(() => {
    generateMaze();
  }, [level]);

  const generateMaze = () => {
    const target = shapes[Math.floor(Math.random() * shapes.length)];
    setTargetShape(target);

    const newGrid: Cell[][] = [];
    for (let y = 0; y < gridSize; y++) {
      const row: Cell[] = [];
      for (let x = 0; x < gridSize; x++) {
        row.push({
          x,
          y,
          shape: Math.random() > 0.3 ? shapes[Math.floor(Math.random() * shapes.length)] : null,
          isPath: true,
          isStart: x === 0 && y === 0,
          isEnd: x === gridSize - 1 && y === gridSize - 1,
          visited: x === 0 && y === 0,
        });
      }
      newGrid.push(row);
    }

    setGrid(newGrid);
    setPlayerPos({ x: 0, y: 0 });
    setFeedback('');
  };

  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    let newX = playerPos.x;
    let newY = playerPos.y;

    switch (direction) {
      case 'up':
        newY = Math.max(0, newY - 1);
        break;
      case 'down':
        newY = Math.min(gridSize - 1, newY + 1);
        break;
      case 'left':
        newX = Math.max(0, newX - 1);
        break;
      case 'right':
        newX = Math.min(gridSize - 1, newX + 1);
        break;
    }

    const cell = grid[newY][newX];

    if (cell.shape && cell.shape !== targetShape) {
      setFeedback('❌ Yanlış şekil! Başa dön.');
      setTimeout(() => {
        setPlayerPos({ x: 0, y: 0 });
        const resetGrid = grid.map((row) => row.map((c) => ({ ...c, visited: c.isStart })));
        setGrid(resetGrid);
        setFeedback('');
      }, 1500);
      return;
    }

    setPlayerPos({ x: newX, y: newY });
    const newGrid = grid.map((row) =>
      row.map((c) => (c.x === newX && c.y === newY ? { ...c, visited: true } : c))
    );
    setGrid(newGrid);

    if (cell.isEnd) {
      setScore(score + 20);
      setFeedback('🎉 Çıkışı buldun!');
      setTimeout(() => {
        if (level < 5) {
          setLevel(level + 1);
        } else {
          setShowCelebration(true);
        }
      }, 1500);
    }
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setShowCelebration(false);
    generateMaze();
  };

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl p-12 text-center border border-cyan-500/30 max-w-2xl">
          <div className="text-8xl mb-6">🌀🎉</div>
          <h2 className="text-5xl font-black text-white mb-4">Harika!</h2>
          <p className="text-3xl text-white mb-2">Toplam Puan: {score}</p>
          <p className="text-xl text-white/80 mb-8">Tüm labirentleri tamamladın!</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetGame}
              className="px-8 py-4 bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
            >
              Tekrar Oyna
            </button>
            <button
              onClick={onBack}
              className="px-8 py-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
            >
              Menüye Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all transform hover:scale-105"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">Seviye: {level}/5</span>
            </div>
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">⭐ {score}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black">🌀 Şekil Labirenti</h1>
          <p className="text-slate-400 text-lg mt-2">Doğru şekilleri takip et!</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          <div className="bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-600 rounded-2xl p-8 md:p-12 mb-8">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setShowRules(true)}
                className="px-4 py-2 bg-cyan-700/40 hover:bg-cyan-600/40 border-2 border-cyan-300 text-white rounded-xl font-bold transition-all transform hover:scale-105"
              >
                📖 NASIL OYNANIR?
              </button>
              <div className="bg-cyan-700/40 border-2 border-cyan-300 rounded-xl px-6 py-3">
                <span className="text-white font-bold">Takip Et: {shapeEmojis[targetShape]}</span>
              </div>
            </div>

            <div className="bg-cyan-700/40 rounded-2xl p-6 mb-6 border-2 border-cyan-300">
              <div
                className="grid gap-2"
                style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
              >
                {grid.map((row, y) =>
                  row.map((cell, x) => {
                    const isPlayer = playerPos.x === x && playerPos.y === y;
                    return (
                      <div
                        key={`${x}-${y}`}
                        className={`aspect-square rounded-lg flex items-center justify-center text-3xl transition-all ${
                          isPlayer
                            ? 'bg-yellow-400 scale-110'
                            : cell.visited
                              ? 'bg-cyan-600/40'
                              : cell.isEnd
                                ? 'bg-green-500'
                                : 'bg-cyan-800/40 border border-cyan-300'
                        }`}
                      >
                        {isPlayer && '🚶'}
                        {cell.isEnd && !isPlayer && '🏁'}
                        {!isPlayer && !cell.isEnd && cell.shape && shapeEmojis[cell.shape]}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div></div>
              <button
                onClick={() => handleMove('up')}
                className="p-4 bg-cyan-700/40 hover:bg-cyan-600/40 border-2 border-cyan-300 rounded-xl text-3xl transition-all transform hover:scale-105"
              >
                ⬆️
              </button>
              <div></div>
              <button
                onClick={() => handleMove('left')}
                className="p-4 bg-cyan-700/40 hover:bg-cyan-600/40 border-2 border-cyan-300 rounded-xl text-3xl transition-all transform hover:scale-105"
              >
                ⬅️
              </button>
              <div></div>
              <button
                onClick={() => handleMove('right')}
                className="p-4 bg-cyan-700/40 hover:bg-cyan-600/40 border-2 border-cyan-300 rounded-xl text-3xl transition-all transform hover:scale-105"
              >
                ➡️
              </button>
              <div></div>
              <button
                onClick={() => handleMove('down')}
                className="p-4 bg-cyan-700/40 hover:bg-cyan-600/40 border-2 border-cyan-300 rounded-xl text-3xl transition-all transform hover:scale-105"
              >
                ⬇️
              </button>
              <div></div>
            </div>

            {feedback && (
              <div
                className={`mt-6 text-center text-2xl font-black p-6 rounded-xl ${feedback.includes('🎉') ? 'bg-green-500/90 border-2 border-green-300 text-white' : 'bg-red-500/90 border-2 border-red-300 text-white'}`}
              >
                {feedback}
              </div>
            )}
          </div>
        </div>
      </div>

      {showRules && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-3xl border border-cyan-500/30 max-w-md w-full">
            <div className="text-5xl mb-4">🌀</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Nasıl Oynanır?</h3>
            <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base">
              <li className="flex gap-2">
                <span className="text-cyan-400 font-bold">1.</span> Sadece hedef şekillerin
                üzerinden geç
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 font-bold">2.</span> Yön tuşlarıyla hareket et
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 font-bold">3.</span> Yanlış şekle basarsan başa
                dönersin
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 font-bold">4.</span> Çıkışa (🏁) ulaş ve puan kazan!
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black py-4 rounded-xl transition-all transform hover:scale-105"
            >
              ANLADIM, BAŞLA! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShapeLabyrinthGame;

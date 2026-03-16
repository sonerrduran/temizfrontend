import React, { useState, useEffect } from 'react';

interface VacationRouteGameProps {
  onBack: () => void;
}

type Direction = 'up' | 'down' | 'left' | 'right';

interface Step {
  direction: Direction;
  steps: number;
}

const VacationRouteGame: React.FC<VacationRouteGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gridSize] = useState(5);
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 4, y: 4 });
  const [route, setRoute] = useState<Step[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const start = { x: 0, y: 0 };
    const target = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };

    setPlayerPos(start);
    setTargetPos(target);
    setRoute([]);
    setFeedback('');
  };

  const addDirection = (direction: Direction) => {
    if (isMoving) return;
    setRoute([...route, { direction, steps: 1 }]);
  };

  const executeRoute = () => {
    if (route.length === 0 || isMoving) return;

    setIsMoving(true);
    let pos = { ...playerPos };
    let stepIndex = 0;

    const moveNext = () => {
      if (stepIndex >= route.length) {
        setIsMoving(false);
        checkWin(pos);
        return;
      }

      const step = route[stepIndex];
      switch (step.direction) {
        case 'up':
          pos.y = Math.max(0, pos.y - 1);
          break;
        case 'down':
          pos.y = Math.min(gridSize - 1, pos.y + 1);
          break;
        case 'left':
          pos.x = Math.max(0, pos.x - 1);
          break;
        case 'right':
          pos.x = Math.min(gridSize - 1, pos.x + 1);
          break;
      }

      setPlayerPos({ ...pos });
      stepIndex++;
      setTimeout(moveNext, 500);
    };

    moveNext();
  };

  const checkWin = (finalPos: { x: number; y: number }) => {
    if (finalPos.x === targetPos.x && finalPos.y === targetPos.y) {
      setScore(score + 20);
      setFeedback('🎉 Hedefe ulaştın!');
      setTimeout(() => {
        if (level < 5) {
          setLevel(level + 1);
        } else {
          setShowCelebration(true);
        }
      }, 2000);
    } else {
      setFeedback('❌ Hedefe ulaşamadın! Tekrar dene.');
      setTimeout(() => {
        setPlayerPos({ x: 0, y: 0 });
        setRoute([]);
        setFeedback('');
      }, 2000);
    }
  };

  const resetRoute = () => {
    setPlayerPos({ x: 0, y: 0 });
    setRoute([]);
    setFeedback('');
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setShowCelebration(false);
    generateLevel();
  };

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl p-12 text-center border border-green-500/30 max-w-2xl">
          <div className="text-8xl mb-6">🗺️🎉</div>
          <h2 className="text-5xl font-black text-white mb-4">Mükemmel!</h2>
          <p className="text-3xl text-white mb-2">Toplam Puan: {score}</p>
          <p className="text-xl text-white/80 mb-8">Tüm rotaları tamamladın!</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetGame}
              className="px-8 py-4 bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 hover:from-green-400 hover:to-emerald-500 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
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
          <h1 className="text-white text-4xl md:text-5xl font-black">🗺️ Tatil Rotası</h1>
          <p className="text-slate-400 text-lg mt-2">Yönerge takip ederek yolu bul!</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 rounded-2xl p-8 md:p-12 mb-8">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setShowRules(true)}
                className="px-4 py-2 bg-green-700/40 hover:bg-green-600/40 border-2 border-green-300 text-white rounded-xl font-bold transition-all transform hover:scale-105"
              >
                📖 NASIL OYNANIR?
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-700/40 rounded-2xl p-6 border-2 border-green-300">
                <h3 className="text-xl font-black text-white text-center mb-4">Harita</h3>
                <div
                  className="grid gap-2"
                  style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
                >
                  {Array.from({ length: gridSize * gridSize }).map((_, idx) => {
                    const x = idx % gridSize;
                    const y = Math.floor(idx / gridSize);
                    const isPlayer = playerPos.x === x && playerPos.y === y;
                    const isTarget = targetPos.x === x && targetPos.y === y;
                    return (
                      <div
                        key={idx}
                        className={`aspect-square rounded-lg flex items-center justify-center text-3xl ${
                          isPlayer
                            ? 'bg-blue-500'
                            : isTarget
                              ? 'bg-yellow-500'
                              : 'bg-green-800/40 border border-green-300'
                        }`}
                      >
                        {isPlayer && '🚗'}
                        {isTarget && '🏖️'}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-green-700/40 rounded-2xl p-6 border-2 border-green-300">
                <h3 className="text-xl font-black text-white text-center mb-4">Yön Komutları</h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div></div>
                  <button
                    onClick={() => addDirection('up')}
                    disabled={isMoving}
                    className="p-4 bg-green-800/40 hover:bg-green-700/40 border-2 border-green-300 rounded-xl text-3xl disabled:opacity-50"
                  >
                    ⬆️
                  </button>
                  <div></div>
                  <button
                    onClick={() => addDirection('left')}
                    disabled={isMoving}
                    className="p-4 bg-green-800/40 hover:bg-green-700/40 border-2 border-green-300 rounded-xl text-3xl disabled:opacity-50"
                  >
                    ⬅️
                  </button>
                  <div></div>
                  <button
                    onClick={() => addDirection('right')}
                    disabled={isMoving}
                    className="p-4 bg-green-800/40 hover:bg-green-700/40 border-2 border-green-300 rounded-xl text-3xl disabled:opacity-50"
                  >
                    ➡️
                  </button>
                  <div></div>
                  <button
                    onClick={() => addDirection('down')}
                    disabled={isMoving}
                    className="p-4 bg-green-800/40 hover:bg-green-700/40 border-2 border-green-300 rounded-xl text-3xl disabled:opacity-50"
                  >
                    ⬇️
                  </button>
                  <div></div>
                </div>

                <div className="bg-green-800/40 rounded-xl p-3 border border-green-300 mb-3 min-h-[60px]">
                  <p className="text-white text-sm mb-2">Rota:</p>
                  <div className="flex flex-wrap gap-2">
                    {route.map((step, idx) => (
                      <span key={idx} className="text-2xl">
                        {step.direction === 'up' && '⬆️'}
                        {step.direction === 'down' && '⬇️'}
                        {step.direction === 'left' && '⬅️'}
                        {step.direction === 'right' && '➡️'}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={executeRoute}
                    disabled={isMoving || route.length === 0}
                    className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-400 text-white font-black rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ▶️ Başlat
                  </button>
                  <button
                    onClick={resetRoute}
                    disabled={isMoving}
                    className="flex-1 py-3 bg-red-500 hover:bg-red-400 text-white font-black rounded-xl disabled:opacity-50"
                  >
                    🔄 Sıfırla
                  </button>
                </div>
              </div>
            </div>

            {feedback && (
              <div
                className={`mt-6 text-center text-2xl font-black p-6 rounded-xl ${
                  feedback.includes('🎉')
                    ? 'bg-green-500/90 border-2 border-green-300 text-white'
                    : 'bg-red-500/90 border-2 border-red-300 text-white'
                }`}
              >
                {feedback}
              </div>
            )}
          </div>
        </div>
      </div>

      {showRules && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-3xl border border-green-500/30 max-w-md w-full">
            <div className="text-5xl mb-4">🗺️</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Nasıl Oynanır?</h3>
            <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base">
              <li className="flex gap-2">
                <span className="text-green-400 font-bold">1.</span> Yön butonlarına tıklayarak rota
                oluştur
              </li>
              <li className="flex gap-2">
                <span className="text-green-400 font-bold">2.</span> Arabayı (🚗) plaja (🏖️) götür
              </li>
              <li className="flex gap-2">
                <span className="text-green-400 font-bold">3.</span> Başlat butonuna bas ve rotayı
                izle
              </li>
              <li className="flex gap-2">
                <span className="text-green-400 font-bold">4.</span> Hedefe ulaş ve puan kazan!
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 hover:from-green-400 hover:to-emerald-500 text-white font-black py-4 rounded-xl transition-all transform hover:scale-105"
            >
              ANLADIM, BAŞLA! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VacationRouteGame;

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AttentionTrackingGame() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<'idle' | 'showing' | 'moving' | 'guessing' | 'result'>(
    'idle'
  );
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const [circles, setCircles] = useState<{ x: number; y: number; id: number }[]>([]);
  const [message, setMessage] = useState('Hazır mısın? Hedefi takip et!');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);

  const circleCount = 5;

  const initCircles = useCallback(() => {
    const newCircles = Array.from({ length: circleCount }).map((_, i) => ({
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      id: i,
    }));
    setCircles(newCircles);
    const target = Math.floor(Math.random() * circleCount);
    setTargetIndex(target);
    setGameState('showing');
    setMessage('HEDEFİN BU! Akılda tut...');

    setTimeout(() => {
      setGameState('moving');
      setMessage('TAKİP ET!');
    }, 2000);
  }, []);

  useEffect(() => {
    if (gameState === 'moving') {
      let moveCount = 0;
      const interval = setInterval(() => {
        setCircles((prev) =>
          prev.map((c) => ({
            x: Math.max(10, Math.min(90, c.x + (Math.random() - 0.5) * 15)),
            y: Math.max(10, Math.min(90, c.y + (Math.random() - 0.5) * 15)),
            id: c.id,
          }))
        );
        moveCount++;
        if (moveCount > 20) {
          clearInterval(interval);
          setGameState('guessing');
          setMessage('Hadi bul bakalım! Hedef hangisiydi?');
        }
      }, 250);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  const handleCircleClick = (index: number) => {
    if (gameState !== 'guessing') return;

    if (index === targetIndex) {
      setScore((s) => s + 10);
      setMessage('TEBRİKLER! Doğru hedef.');
    } else {
      setMessage('Üzgünüm, hedefi kaçırdın.');
    }
    setGameState('result');
    setRound((r) => r + 1);
  };

  const handleNewRound = () => {
    setGameState('idle');
    setTimeout(() => initCircles(), 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Ana Kart - Dış Katman */}
      <div className="w-full max-w-3xl bg-slate-800/80 backdrop-blur-xl rounded-[40px] p-1 border border-slate-700 shadow-2xl">
        {/* İç Oyun Alanı */}
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-[36px] p-8 relative overflow-hidden">
          {/* Çıkış Butonu */}
          <button
            onClick={() => navigate('/focus')}
            className="absolute top-6 left-6 w-12 h-12 bg-red-600/90 hover:bg-red-500/90 rounded-full flex items-center justify-center text-white font-black text-xl transition-all z-10 shadow-lg"
          >
            ✕
          </button>

          {/* Sağ Üst Bilgi */}
          <div className="absolute top-6 right-6 bg-slate-800/80 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/20">
            <p className="text-white/90 text-sm font-bold">
              Tur: {round} | Puan: {score}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center min-h-[600px] text-white pt-12">
            <div className="text-center mb-8">
              <h3 className="font-black tracking-widest text-xs uppercase mb-2 opacity-80">
                DİKKAT VE TAKİP
              </h3>
              <p className="text-xl font-bold">{message}</p>
            </div>

            <div className="relative w-full max-w-2xl h-[400px] bg-slate-900/40 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden mb-8">
              {circles.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => handleCircleClick(i)}
                  className={`absolute w-12 h-12 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 flex items-center justify-center font-black ${
                    gameState === 'showing' && i === targetIndex
                      ? 'bg-yellow-400 scale-125 shadow-[0_0_20px_rgba(250,204,21,0.8)]'
                      : 'bg-white'
                  } ${gameState === 'guessing' ? 'hover:scale-110 active:scale-95 cursor-pointer border-2 border-slate-900' : 'cursor-default'}`}
                  style={{
                    left: `${c.x}%`,
                    top: `${c.y}%`,
                    transitionProperty: gameState === 'moving' ? 'left, top' : 'all',
                  }}
                >
                  {gameState === 'guessing' ? '?' : ''}
                </button>
              ))}

              {gameState === 'idle' && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
                  <button
                    onClick={initCircles}
                    className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl"
                  >
                    OYUNU BAŞLAT
                  </button>
                </div>
              )}
            </div>

            {gameState === 'result' && (
              <div className="text-center animate-in zoom-in duration-300">
                <button
                  onClick={handleNewRound}
                  className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl"
                >
                  YENİ TUR 🔄
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

}

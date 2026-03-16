import React, { useState, useEffect, useRef } from 'react';
import { GameMode, UserStats } from '../../types';

interface EyeExerciseProps {
  stats: UserStats;
  setMode: (mode: GameMode) => void;
}

type Pattern = 'HORIZONTAL' | 'VERTICAL' | 'ZIGZAG' | 'CIRCLE';

const EyeExercise: React.FC<EyeExerciseProps> = ({ stats, setMode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(3); // 1 to 5
  const [pattern, setPattern] = useState<Pattern>('HORIZONTAL');

  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();

  // Animation state
  const timeRef = useRef(0);

  useEffect(() => {
    if (!isPlaying) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const animate = (time: number) => {
      if (!containerRef.current || !dotRef.current) return;

      const container = containerRef.current.getBoundingClientRect();
      const dotSize = 40; // 10 units (w-10 h-10) approx 40px

      const maxX = container.width - dotSize;
      const maxY = container.height - dotSize;

      // Speed multiplier
      const speedMult = speed * 0.001;
      timeRef.current += speedMult;
      const t = timeRef.current; // continuous time variable

      let x = 0;
      let y = 0;

      switch (pattern) {
        case 'HORIZONTAL':
          // ping pong horizontally
          x = ((Math.sin(t * 2) + 1) / 2) * maxX;
          y = maxY / 2;
          break;
        case 'VERTICAL':
          x = maxX / 2;
          y = ((Math.sin(t * 2) + 1) / 2) * maxY;
          break;
        case 'CIRCLE':
          x = ((Math.cos(t * 2) + 1) / 2) * maxX;
          y = ((Math.sin(t * 2) + 1) / 2) * maxY;
          break;
        case 'ZIGZAG':
          // horizontal ping pong, vertical slow movement
          x = ((Math.sin(t * 4) + 1) / 2) * maxX;
          y = ((t % 2) / 2) * maxY; // moves down and resets
          break;
      }

      dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speed, pattern]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 animate-in fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setMode(GameMode.FAST_READING_MENU)}
          className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
        >
          ⬅
        </button>
        <h2 className="text-3xl md:text-5xl font-black text-white italic">Göz Egzersizi</h2>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-[40px] p-6 md:p-10 mb-8 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex justify-between text-orange-300 font-bold mb-2">
              <span>Hız Seviyesi</span>
              <span className="text-white text-xl">{speed}</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          <div>
            <div className="text-orange-300 font-bold mb-2">Hareket Şekli</div>
            <div className="flex gap-2">
              {(['HORIZONTAL', 'VERTICAL', 'ZIGZAG', 'CIRCLE'] as Pattern[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPattern(p)}
                  className={`flex-1 py-2 rounded-xl text-xs md:text-sm font-bold transition-colors ${pattern === p ? 'bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
                >
                  {p === 'HORIZONTAL'
                    ? 'Yatay'
                    : p === 'VERTICAL'
                      ? 'Dikey'
                      : p === 'CIRCLE'
                        ? 'Dairesel'
                        : 'Zigzag'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => {
              if (!isPlaying) timeRef.current = 0; // reset time on start
              setIsPlaying(!isPlaying);
            }}
            className={`px-12 py-4 rounded-full font-black text-xl shadow-xl transition-all ${isPlaying ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:scale-105 active:scale-95'}`}
          >
            {isPlaying ? 'DURDUR' : 'BAŞLA'}
          </button>
        </div>

        {/* Animation Container */}
        <div
          ref={containerRef}
          className="w-full h-[300px] md:h-[500px] bg-black/50 border-4 border-slate-700 rounded-3xl relative overflow-hidden"
        >
          {/* Grid lines for visual tracking guide */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

          <div
            ref={dotRef}
            className="w-10 h-10 bg-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,1)] absolute top-0 left-0"
            style={{
              transform: 'translate(0px, 0px)',
              // Use will-change to optimize animations
              willChange: 'transform',
            }}
          />
        </div>

        <p className="text-center text-slate-400 mt-6 font-medium">
          Başını hareket ettirmeden sadece gözlerinle noktayı takip et.
        </p>
      </div>
    </div>
  );
};

export default EyeExercise;

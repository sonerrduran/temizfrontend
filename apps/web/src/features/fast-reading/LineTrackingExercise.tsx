import React, { useState, useEffect, useRef } from 'react';
import { GameMode, UserStats } from '../../types';

interface LineTrackingExerciseProps {
  stats: UserStats;
  setMode: (mode: GameMode) => void;
}

const LineTrackingExercise: React.FC<LineTrackingExerciseProps> = ({ stats, setMode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(30); // 10-100 pixels per frame
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();

  const text = `Hızlı okuma, metinleri daha kısa sürede anlayarak okuma becerisini geliştiren teknikler bütünüdür. 
Geleneksel okuma yöntemlerinde kelimeler tek tek ve içten seslendirilerek okunurken, 
hızlı okumada kelime grupları bir bütün olarak algılanır ve göz sıçramaları (saccade) optimize edilir. 
Bu egzersizde amacınız, satırların altında hareket eden rehber çizgiyi gözlerinizle takip ederken, 
çizginin gösterdiği kelime gruplarına odaklanmaktır. Çizgi sağdan sola veya soldan sağa akarken 
başınızı hareket ettirmeden sadece gözlerinizi kullanmaya özen gösterin.
Düzenli pratik yaparak okuma hızınızı ve anlama oranınızı ciddi ölçüde artırabilirsiniz. 
`;

  useEffect(() => {
    let yPos = 0;
    let xPos = 0;
    let direction = 1; // 1 = sağa, -1 = sola
    const lineHeight = 40; // Approx px per line in our applied class

    const animate = () => {
      if (!isPlaying || !containerRef.current || !lineRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const speedMultiplier = speed / 10;

      xPos += speedMultiplier * direction;

      // if hits edge, move down a line and switch direction
      if (xPos >= containerWidth) {
        xPos = containerWidth;
        direction = -1;
        yPos += lineHeight;
      } else if (xPos <= 0 && direction === -1) {
        xPos = 0;
        direction = 1;
        yPos += lineHeight;
      }

      // Reset to top if we reach bottom
      if (yPos > containerRef.current.clientHeight - lineHeight) {
        yPos = 0;
        xPos = 0;
        direction = 1;
      }

      // Update DOM
      lineRef.current.style.transform = `translate(${xPos}px, ${yPos}px)`;

      requestRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speed]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 animate-in fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setMode(GameMode.FAST_READING_MENU)}
          className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
        >
          ⬅
        </button>
        <h2 className="text-3xl md:text-5xl font-black text-white italic">Satır Takibi</h2>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-[40px] p-6 md:p-12 mb-8 shadow-2xl">
        <div className="flex justify-between items-center mb-8 bg-black/20 p-6 rounded-3xl">
          <div className="flex-1 mr-8">
            <div className="text-sky-300 font-bold mb-2">Çizgi Hızı</div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-8 py-4 rounded-2xl font-black text-xl transition-all ${isPlaying ? 'bg-red-500 text-white' : 'bg-sky-500 text-slate-900 shadow-[0_0_20px_rgba(14,165,233,0.5)]'}`}
          >
            {isPlaying ? 'DURDUR' : 'BAŞLA'}
          </button>
        </div>

        <div className="relative w-full bg-slate-900/80 border border-sky-500/30 rounded-3xl p-8 overflow-hidden">
          <div
            ref={containerRef}
            className="text-lg md:text-xl md:text-2xl text-slate-300 font-medium leading-[40px] tracking-wide text-justify"
          >
            {text}
          </div>

          {/* Tracker guide line */}
          <div
            ref={lineRef}
            className="absolute top-8 left-8 w-[100px] h-[40px] bg-sky-500/20 border-b-4 border-sky-500 pointer-events-none rounded-sm"
            style={{
              transform: 'translate(0px, 0px)',
              display: isPlaying ? 'block' : 'none',
              filter: 'blur(1px)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LineTrackingExercise;

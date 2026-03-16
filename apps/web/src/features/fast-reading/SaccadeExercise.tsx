import React, { useState, useEffect, useRef } from 'react';
import { GameMode, UserStats } from '../../types';

interface SaccadeExerciseProps {
  stats: UserStats;
  setMode: (mode: GameMode) => void;
}

const SaccadeExercise: React.FC<SaccadeExerciseProps> = ({ stats, setMode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(3); // 1-5
  const [currentPos, setCurrentPos] = useState<'LEFT' | 'RIGHT'>('LEFT');
  const [word, setWord] = useState('BAŞLA');

  const words = [
    'KİTAP',
    'UZAY',
    'BİLİM',
    'ROKET',
    'YILDIZ',
    'DÜNYA',
    'AKIL',
    'BİLGİ',
    'BAŞARI',
    'ODAK',
    'MANTIK',
    'ZEKA',
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(
        () => {
          setCurrentPos((prev) => (prev === 'LEFT' ? 'RIGHT' : 'LEFT'));
          setWord(words[Math.floor(Math.random() * words.length)]);
        },
        Math.max(300, 1500 - speed * 200)
      );
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, words]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 animate-in fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setMode(GameMode.FAST_READING_MENU)}
          className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
        >
          ⬅
        </button>
        <h2 className="text-3xl md:text-5xl font-black text-white italic">Göz Sıçrama (Saccade)</h2>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-[40px] p-6 md:p-12 mb-8 shadow-2xl text-center">
        <div className="flex justify-between items-center mb-8 px-8">
          <div className="text-amber-300 font-bold">Hız: {speed}</div>
          <input
            type="range"
            min="1"
            max="5"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-48 accent-amber-500"
          />
        </div>

        <div className="relative w-full h-48 md:h-64 bg-black/40 border-2 border-amber-500/30 rounded-3xl flex items-center overflow-hidden mb-8">
          <div className="absolute w-full h-px bg-white/10 top-1/2 -translate-y-1/2" />
          <div className="absolute w-px h-full bg-white/10 left-1/2 -translate-x-1/2" />

          {isPlaying && (
            <div
              className={`absolute top-1/2 -translate-y-1/2 text-3xl md:text-6xl font-black text-amber-400 transition-all duration-75`}
              style={{
                left: currentPos === 'LEFT' ? '10%' : 'auto',
                right: currentPos === 'RIGHT' ? '10%' : 'auto',
              }}
            >
              {word}
            </div>
          )}
          {!isPlaying && (
            <div className="w-full text-center text-slate-500 font-bold text-2xl">
              Başlamak için butona tıkla
            </div>
          )}
        </div>

        <div className="mb-8">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-12 py-4 rounded-full font-black text-xl transition-all ${isPlaying ? 'bg-red-500 text-white' : 'bg-amber-500 text-slate-900 shadow-[0_0_20px_rgba(245,158,11,0.5)]'}`}
          >
            {isPlaying ? 'DURDUR' : 'BAŞLA'}
          </button>
        </div>

        <p className="text-slate-400 font-medium max-w-2xl mx-auto">
          💡 İpucu: Başını hareket ettirme! Sadece gözlerinle ekranın bir ucundan diğer ucuna
          sıçrayan kelimeleri oku. Bu egzersiz okuma sırasındaki göz sıçramalarını (saccade)
          hızlandırır.
        </p>
      </div>
    </div>
  );
};

export default SaccadeExercise;

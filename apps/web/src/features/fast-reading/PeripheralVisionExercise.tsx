import React, { useState, useEffect } from 'react';
import { GameMode, UserStats } from '../../types';

interface PeripheralVisionExerciseProps {
  stats: UserStats;
  setMode: (mode: GameMode) => void;
}

const PeripheralVisionExercise: React.FC<PeripheralVisionExerciseProps> = ({ stats, setMode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [level, setLevel] = useState(1);
  const [leftWord, setLeftWord] = useState('');
  const [rightWord, setRightWord] = useState('');

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
          setLeftWord(words[Math.floor(Math.random() * words.length)]);
          setRightWord(words[Math.floor(Math.random() * words.length)]);
        },
        Math.max(500, 2000 - level * 300)
      ); // Gets faster
    }
    return () => clearInterval(interval);
  }, [isPlaying, level, words]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 animate-in fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setMode(GameMode.FAST_READING_MENU)}
          className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
        >
          ⬅
        </button>
        <h2 className="text-3xl md:text-5xl font-black text-white italic">Periferik Görüş</h2>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-[40px] p-6 md:p-12 mb-8 shadow-2xl text-center">
        <div className="flex justify-between items-center mb-8 px-8">
          <div className="text-cyan-300 font-bold">Seviye: {level}</div>
          <input
            type="range"
            min="1"
            max="5"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-48 accent-cyan-500"
          />
        </div>

        <div className="relative w-full h-64 md:h-96 bg-black/40 border-2 border-cyan-500/30 rounded-3xl flex items-center justify-center overflow-hidden mb-8">
          {/* Center Focus Point */}
          <div className="w-8 h-8 md:w-12 md:h-12 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.8)] z-10">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>

          {/* Peripheral Words */}
          {isPlaying && (
            <>
              <div
                className="absolute left-4 md:left-12 text-2xl md:text-5xl font-black text-white/80 transition-all duration-200"
                style={{ letterSpacing: '0.2em' }}
              >
                {leftWord}
              </div>
              <div
                className="absolute right-4 md:right-12 text-2xl md:text-5xl font-black text-white/80 transition-all duration-200"
                style={{ letterSpacing: '0.2em' }}
              >
                {rightWord}
              </div>
            </>
          )}

          {/* Distance markers */}
          <div className="absolute w-full h-px bg-white/5" />
          <div className="absolute h-full w-px bg-white/5" />
        </div>

        <div className="mb-8">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-12 py-4 rounded-full font-black text-xl transition-all ${isPlaying ? 'bg-red-500 text-white' : 'bg-cyan-500 text-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.5)]'}`}
          >
            {isPlaying ? 'DURDUR' : 'BAŞLA'}
          </button>
        </div>

        <p className="text-slate-400 font-medium max-w-2xl mx-auto">
          💡 İpucu: Sadece ortadaki <strong>mavi noktaya</strong> bak. Gözlerini sağa veya sola
          çevirmeden, her iki taraftaki kelimeleri aynı anda görmeye (algılamaya) çalış.
        </p>
      </div>
    </div>
  );
};

export default PeripheralVisionExercise;

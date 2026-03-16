import React, { useState, useEffect, useRef } from 'react';
import { GameMode, UserStats } from '../../types';

// Mock reading texts
const READING_TEXTS = [
  {
    id: 1,
    title: 'Örnek Metin',
    content:
      'Bu hızlı okuma egzersizi için örnek bir metindir. Kelimeler tek tek veya gruplar halinde gösterilecektir. Okuma hızınızı ayarlayabilir ve pratik yapabilirsiniz.',
    difficulty: 'easy',
  },
];

interface WordFlowExerciseProps {
  stats: UserStats;
  setMode: (mode: GameMode) => void;
}

const WordFlowExercise: React.FC<WordFlowExerciseProps> = ({ stats, setMode }) => {
  const [wpm, setWpm] = useState(300);
  const [wordsPerFlash, setWordsPerFlash] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const [words, setWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load a text (we'll just use the first text as dummy or concat all)
  useEffect(() => {
    const textStr = READING_TEXTS[0].content;
    const wordArray = textStr.split(/\s+/).filter((w) => w.trim() !== '');
    setWords(wordArray);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      // WPM = words per minute -> flashes per minute = WPM / wordsPerFlash
      // MS per flash = 60000 / (WPM / wordsPerFlash) = (60000 * wordsPerFlash) / WPM
      const msPerFlash = (60000 * wordsPerFlash) / wpm;

      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev + wordsPerFlash >= words.length) {
            setIsPlaying(false);
            return prev;
          }
          return prev + wordsPerFlash;
        });
      }, msPerFlash);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, wpm, wordsPerFlash, words.length]);

  const handlePlayPause = () => {
    if (currentIndex >= words.length - 1) {
      setCurrentIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const currentDisplayWords = words.slice(currentIndex, currentIndex + wordsPerFlash).join(' ');

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-in fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setMode(GameMode.FAST_READING_MENU)}
          className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
        >
          ⬅
        </button>
        <h2 className="text-3xl md:text-5xl font-black text-white italic">Kelime Akışı</h2>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-[40px] p-8 md:p-12 mb-8 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Controls */}
          <div className="flex-1 space-y-6">
            <div>
              <div className="flex justify-between text-indigo-300 font-bold mb-2">
                <span>Hız (WPM)</span>
                <span className="text-white text-xl">{wpm}</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={wpm}
                onChange={(e) => setWpm(Number(e.target.value))}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-indigo-300 font-bold mb-2">
                <span>Kelime Grubu (Flash)</span>
                <span className="text-white text-xl">{wordsPerFlash}</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={wordsPerFlash}
                onChange={(e) => setWordsPerFlash(Number(e.target.value))}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={handlePlayPause}
              className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-[0_0_30px_rgba(99,102,241,0.5)] flex items-center justify-center text-4xl hover:scale-105 active:scale-95 transition-all text-white"
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
          </div>
        </div>

        {/* Display Frame */}
        <div className="bg-black/40 h-64 md:h-80 rounded-3xl border-2 border-indigo-500/30 flex items-center justify-center relative overflow-hidden">
          {/* Focus Lines */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-indigo-500/20 -translate-x-1/2" />
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-indigo-500/20 -translate-y-1/2" />

          <div className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">
            {words.length === 0 ? 'Yükleniyor...' : currentDisplayWords || 'Aferin!'}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 flex items-center gap-4">
          <span className="text-xs font-bold text-slate-400">{currentIndex}</span>
          <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-100"
              style={{ width: `${(currentIndex / words.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-400">{words.length}</span>
        </div>

        <div className="mt-8 text-center space-x-4">
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentIndex(0);
            }}
            className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-colors"
          >
            BAŞA SAR
          </button>
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 10))}
            className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-colors"
          >
            -10 Kelime
          </button>
          <button
            onClick={() => setCurrentIndex(Math.min(words.length - 1, currentIndex + 10))}
            className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-colors"
          >
            +10 Kelime
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordFlowExercise;

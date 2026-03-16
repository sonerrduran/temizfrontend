import React, { useState, useEffect, useRef } from 'react';
import { GameMode, UserStats } from '../../types';

interface CatchWordGameProps {
  stats: UserStats;
  setMode: (mode: GameMode) => void;
}

const CatchWordGame: React.FC<CatchWordGameProps> = ({ stats, setMode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [targetWord, setTargetWord] = useState('');
  const [fallingWords, setFallingWords] = useState<
    { id: number; word: string; x: number; y: number }[]
  >([]);

  const wordBank = [
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
  const requestRef = useRef<number>();
  const idCounter = useRef(0);

  const startGame = () => {
    setScore(0);
    setFallingWords([]);
    setTargetWord(wordBank[Math.floor(Math.random() * wordBank.length)]);
    setIsPlaying(true);
  };

  const handleWordClick = (id: number, word: string) => {
    if (!isPlaying) return;
    if (word === targetWord) {
      setScore((s) => s + 10);
      setTargetWord(wordBank[Math.floor(Math.random() * wordBank.length)]);
    } else {
      setScore((s) => Math.max(0, s - 5));
    }
    setFallingWords((prev) => prev.filter((w) => w.id !== id));
  };

  useEffect(() => {
    if (!isPlaying) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    let lastSpawnTime = 0;
    const animate = (time: number) => {
      // Spawn new word every 800ms
      if (time - lastSpawnTime > 800) {
        lastSpawnTime = time;
        const newWord = {
          id: idCounter.current++,
          word: wordBank[Math.floor(Math.random() * wordBank.length)],
          x: Math.random() * 80 + 10, // 10% to 90%
          y: -10, // start above
        };
        setFallingWords((prev) => [...prev, newWord]);
      }

      setFallingWords(
        (prev) =>
          prev
            .map((w) => ({ ...w, y: w.y + 0.5 })) // speed of fall
            .filter((w) => w.y < 110) // remove if out of bounds
      );

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 animate-in fade-in">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setMode(GameMode.FAST_READING_BRAIN_GAMES)}
          className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
        >
          ⬅
        </button>
        <h2 className="text-3xl md:text-5xl font-black text-white italic">Kelime Yakalama</h2>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-[40px] p-6 md:p-8 mb-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="bg-orange-500 text-white font-black px-6 py-2 rounded-2xl text-xl shadow-lg">
            HEDEF: <span className="text-yellow-300 ml-2">{targetWord || '---'}</span>
          </div>
          <div className="text-2xl font-black text-white">
            SKOR: <span className="text-emerald-400">{score}</span>
          </div>
        </div>

        <div className="relative w-full h-[60vh] md:h-[500px] bg-slate-900 border-4 border-orange-500/30 rounded-3xl overflow-hidden cursor-crosshair">
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10">
              <p className="text-white text-xl font-bold mb-6 text-center px-4 max-w-lg">
                Yukarıdan düşen kelimeler arasından <strong>HEDEF</strong> kelimeyi bularak tıkla.
                Yanlış tıklamalar puan kaybettirir.
              </p>
              <button
                onClick={startGame}
                className="px-12 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full font-black text-2xl text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                BAŞLA
              </button>
            </div>
          )}

          {fallingWords.map((fw) => (
            <button
              key={fw.id}
              onMouseDown={() => handleWordClick(fw.id, fw.word)} // Using onMouseDown instead of onClick for better mobile/animation response
              className="absolute px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-bold hover:bg-white/30 transition-colors shadow-lg z-50 cursor-pointer"
              style={{
                left: `${fw.x}%`,
                top: `${fw.y}%`,
                transform: 'translateX(-50%)',
              }}
            >
              {fw.word}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatchWordGame;

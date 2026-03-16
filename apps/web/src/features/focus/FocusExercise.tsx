import React, { useState, useEffect, useRef } from 'react';
import { GameMode, UserStats } from '../../types';

interface FocusExerciseProps {
  stats: UserStats;
  setMode: (mode: GameMode) => void;
}

const FocusExercise: React.FC<FocusExerciseProps> = ({ stats, setMode }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [targetWord, setTargetWord] = useState('');
  const [options, setOptions] = useState<string[]>([]);

  type Phase = 'WAITING' | 'FLASHING' | 'GUESSING' | 'RESULT';
  const [phase, setPhase] = useState<Phase>('WAITING');
  const [resultMsg, setResultMsg] = useState('');

  const wordBank = [
    'Galaksi',
    'Gezegen',
    'Yıldız',
    'Teleskop',
    'Uzay',
    'Roket',
    'Astronot',
    'Meteor',
    'Kara Delik',
    'Uydu',
    'Bilim',
    'Teknoloji',
    'Fizik',
    'Kimya',
    'Biyoloji',
    'Matematik',
    'Tarih',
    'Kültür',
    'Sanat',
    'Edebiyat',
  ];

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRound = () => {
    // Generate new word and options
    const shuffled = [...wordBank].sort(() => 0.5 - Math.random());
    const target = shuffled[0];
    const newOptions = shuffled.slice(0, 4);
    if (!newOptions.includes(target)) newOptions[0] = target;
    setOptions(newOptions.sort(() => 0.5 - Math.random()));
    setTargetWord(target);

    setPhase('FLASHING');

    // Flash duration gets shorter as level increases
    const flashDuration = Math.max(100, 1000 - level * 100);

    timerRef.current = setTimeout(() => {
      setPhase('GUESSING');
    }, flashDuration);
  };

  const handleGuess = (guess: string) => {
    if (guess === targetWord) {
      setScore((s) => s + 10);
      setResultMsg('Harika! Doğru bildin.');
      if (score > 0 && score % 40 === 0) {
        setLevel((l) => Math.min(l + 1, 9));
      }
    } else {
      setResultMsg(`Yanlış! Doğru cevap: ${targetWord}`);
      setLevel((l) => Math.max(l - 1, 1)); // Penalty
    }
    setPhase('RESULT');

    setTimeout(() => {
      setPhase('WAITING');
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-in fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setMode(GameMode.FAST_READING_MENU)}
          className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
        >
          ⬅
        </button>
        <h2 className="text-3xl md:text-5xl font-black text-white italic">Odak Egzersizi</h2>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-[40px] p-6 md:p-12 shadow-2xl">
        <div className="flex justify-between items-center mb-12">
          <div className="bg-cyan-500/20 text-cyan-300 font-bold px-4 py-2 rounded-xl text-lg">
            Seviye: {level}
          </div>
          <div className="bg-fuchsia-500/20 text-fuchsia-300 font-bold px-4 py-2 rounded-xl text-lg">
            Puan: {score}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[300px]">
          {phase === 'WAITING' && (
            <button
              onClick={startRound}
              className="px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl font-black text-2xl text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              BAŞLA
            </button>
          )}

          {phase === 'FLASHING' && (
            <div className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]">
              {targetWord}
            </div>
          )}

          {phase === 'GUESSING' && (
            <div className="w-full max-w-2xl bg-black/40 p-8 rounded-3xl animate-in zoom-in">
              <h3 className="text-2xl text-center text-white font-bold mb-8">
                Hangi kelimeyi gördün?
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleGuess(opt)}
                    className="p-4 bg-white/10 hover:bg-cyan-500/30 border border-white/20 hover:border-cyan-500 rounded-2xl text-white font-bold text-xl transition-all"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {phase === 'RESULT' && (
            <div className="text-3xl font-black text-center animate-in bounce-in">
              <span className={resultMsg.includes('Harika') ? 'text-emerald-400' : 'text-rose-400'}>
                {resultMsg}
              </span>
            </div>
          )}
        </div>

        <div className="mt-12 text-center text-slate-400 font-medium bg-black/20 p-4 rounded-xl">
          Ekranda çok kısa süreliğine beliren kelimeyi yakalamaya çalış. Seviye ilerledikçe
          kelimenin ekranda kalma süresi kısalır!
        </div>
      </div>
    </div>
  );
};

export default FocusExercise;

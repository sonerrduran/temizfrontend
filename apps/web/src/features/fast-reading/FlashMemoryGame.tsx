import React, { useState, useEffect, useRef } from 'react';
import { GameMode, UserStats } from '../../types';

interface FlashMemoryGameProps {
  stats: UserStats;
  setMode: (mode: GameMode) => void;
}

const FlashMemoryGame: React.FC<FlashMemoryGameProps> = ({ stats, setMode }) => {
  type Phase = 'WAITING' | 'MEMORIZE' | 'RECALL' | 'RESULT';

  const [phase, setPhase] = useState<Phase>('WAITING');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1); // determines number of words

  const [targetWords, setTargetWords] = useState<string[]>([]);
  const [userSelection, setUserSelection] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [resultMsg, setResultMsg] = useState('');

  const wordBank = [
    'ELMA',
    'ARMUT',
    'ÇİLEK',
    'KİRAZ',
    'KAVUN',
    'KARPUZ',
    'MUZ',
    'ÜZÜM',
    'LİMON',
    'PORTAKAL',
    'KİTAP',
    'MASA',
    'KALEM',
    'DEFTER',
    'SİLGİ',
    'OKUL',
    'SINIF',
    'ÖĞRETMEN',
    'TAHTA',
    'ÇANTA',
  ];

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRound = () => {
    const wordCount = Math.min(3 + Math.floor(level / 2), 8); // Starts with 3 words, increases
    const shuffled = [...wordBank].sort(() => 0.5 - Math.random());

    const selectedTargets = shuffled.slice(0, wordCount);
    setTargetWords(selectedTargets);

    // Create options (targets + some distractors)
    const distractors = shuffled.slice(wordCount, wordCount + wordCount);
    const allOptions = [...selectedTargets, ...distractors].sort(() => 0.5 - Math.random());
    setOptions(allOptions);

    setUserSelection([]);
    setPhase('MEMORIZE');

    // Show duration (e.g., 3-5 seconds depending on count)
    const showDuration = Math.max(2000, wordCount * 1000 - level * 200);

    timerRef.current = setTimeout(() => {
      setPhase('RECALL');
    }, showDuration);
  };

  const toggleSelection = (word: string) => {
    if (userSelection.includes(word)) {
      setUserSelection((prev) => prev.filter((w) => w !== word));
    } else {
      if (userSelection.length < targetWords.length) {
        setUserSelection((prev) => [...prev, word]);
      }
    }
  };

  const checkAnswer = () => {
    // Check if userSelection exactly matches targetWords (order doesn't matter)
    const isCorrect =
      userSelection.length === targetWords.length &&
      userSelection.every((w) => targetWords.includes(w));

    if (isCorrect) {
      setScore((s) => s + targetWords.length * 10);
      setLevel((l) => l + 1);
      setResultMsg('Mükemmel Hafıza!');
    } else {
      setLevel((l) => Math.max(1, l - 1));
      setResultMsg('Yanlış! Doğru kelimeler: ' + targetWords.join(', '));
    }

    setPhase('RESULT');

    setTimeout(() => {
      setPhase('WAITING');
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 animate-in fade-in">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setMode(GameMode.FAST_READING_BRAIN_GAMES)}
          className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
        >
          ⬅
        </button>
        <h2 className="text-3xl md:text-5xl font-black text-white italic">Hafıza Kartları</h2>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-[40px] p-6 md:p-12 mb-8 shadow-2xl">
        <div className="flex justify-between items-center mb-12">
          <div className="bg-purple-500/20 text-purple-300 font-bold px-6 py-2 rounded-2xl text-xl">
            Seviye: {level}
          </div>
          <div className="text-2xl font-black text-white">
            SKOR: <span className="text-emerald-400">{score}</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          {phase === 'WAITING' && (
            <div className="text-center">
              <p className="text-slate-400 text-xl font-medium mb-8 max-w-lg">
                Ekranda beliren kelimeleri aklında tut. Süre bittiğinde, gösterilen kelimeleri
                seçenekler arasından işaretle.
              </p>
              <button
                onClick={startRound}
                className="px-12 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full font-black text-2xl text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                HAZIRIM
              </button>
            </div>
          )}

          {phase === 'MEMORIZE' && (
            <div className="text-center animate-in zoom-in">
              <h3 className="text-purple-300 font-bold text-xl mb-6">BU KELİMELERİ UNUTMA</h3>
              <div className="flex gap-4 flex-wrap justify-center">
                {targetWords.map((word, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 px-6 py-4 rounded-2xl border-2 border-purple-500/50 text-white font-black text-3xl shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  >
                    {word}
                  </div>
                ))}
              </div>
              {/* Tiny progress bar for time could go here */}
              <div className="mt-8 text-xl animate-pulse text-rose-400 font-bold">
                Zaman Daralıyor...
              </div>
            </div>
          )}

          {phase === 'RECALL' && (
            <div className="w-full text-center animate-in slide-in-from-bottom">
              <h3 className="text-white font-bold text-2xl mb-2">Hangi kelimeleri gördün?</h3>
              <p className="text-slate-400 mb-8">
                Tam {targetWords.length} kelime seçmelisin. ({userSelection.length}/
                {targetWords.length})
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {options.map((opt, idx) => {
                  const isSelected = userSelection.includes(opt);
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleSelection(opt)}
                      className={`p-4 rounded-2xl font-bold text-xl transition-all border-2 ${
                        isSelected
                          ? 'bg-purple-600 border-purple-400 text-white shadow-lg scale-105'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={checkAnswer}
                disabled={userSelection.length !== targetWords.length}
                className="px-12 py-4 bg-emerald-500 text-white rounded-full font-black text-xl hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                ONAYLA
              </button>
            </div>
          )}

          {phase === 'RESULT' && (
            <div className="text-center animate-in bounce-in">
              <div
                className={`text-4xl md:text-5xl font-black mb-4 ${resultMsg.includes('Mükemmel') ? 'text-emerald-400' : 'text-rose-400'}`}
              >
                {resultMsg.split('!')[0]}!
              </div>
              {resultMsg.includes('Yanlış') && (
                <div className="text-xl text-white mt-4">{resultMsg.split('!')[1]}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashMemoryGame;

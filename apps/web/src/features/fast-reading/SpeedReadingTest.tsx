import React, { useState, useEffect, useRef } from 'react';
import { GameMode, UserStats } from '../../types';

// Mock reading texts
interface ReadingText {
  id: number;
  title: string;
  content: string;
  difficulty: string;
}

const READING_TEXTS: ReadingText[] = [
  {
    id: 1,
    title: 'Örnek Metin 1',
    content:
      'Bu hızlı okuma testi için hazırlanmış örnek bir metindir. Metni okuyun ve sonunda soruları cevaplayın. Okuma hızınız ve anlama seviyeniz ölçülecektir.',
    difficulty: 'easy',
  },
  {
    id: 2,
    title: 'Örnek Metin 2',
    content:
      'İkinci örnek metin burada yer almaktadır. Daha uzun ve detaylı bir içerik sunmaktadır. Dikkatli okuyun.',
    difficulty: 'medium',
  },
];

interface SpeedReadingTestProps {
  stats: UserStats;
  setMode: (mode: GameMode) => void;
}

type TestPhase = 'SELECTION' | 'PREPARATION' | 'READING' | 'COMPREHENSION' | 'RESULTS';

const SpeedReadingTest: React.FC<SpeedReadingTestProps> = ({ stats, setMode }) => {
  const [phase, setPhase] = useState<TestPhase>('SELECTION');
  const [selectedText, setSelectedText] = useState<ReadingText | null>(null);
  const [countdown, setCountdown] = useState(3);

  // Timer states
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [readingTimeSeconds, setReadingTimeSeconds] = useState(0);
  const [wpm, setWpm] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Comprehension test states
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);

  // --- SELECTION PHASE ---
  const handleSelectText = (text: ReadingText) => {
    setSelectedText(text);
    setPhase('PREPARATION');
  };

  // --- PREPARATION PHASE ---
  useEffect(() => {
    if (phase === 'PREPARATION') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        startReading();
      }
    }
  }, [phase, countdown]);

  // --- READING PHASE ---
  const startReading = () => {
    setPhase('READING');
    setStartTime(Date.now());

    // Safety interval to update UI if needed, though we only care about end time
    timerRef.current = setInterval(() => {
      setReadingTimeSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
  };

  const finishReading = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const end = Date.now();
    setEndTime(end);

    const timeInSeconds = (end - startTime) / 1000;
    const timeInMinutes = timeInSeconds / 60;

    if (selectedText) {
      const calculatedWpm = Math.round(selectedText.wordCount / timeInMinutes);
      setWpm(calculatedWpm);
    }

    setPhase('COMPREHENSION');
    setCurrentQuestionIdx(0);
    setScore(0);
  };

  // --- COMPREHENSION PHASE ---
  const handleAnswerSubmit = (selectedIndex: number) => {
    if (!selectedText) return;

    const currentQ = selectedText.questions[currentQuestionIdx];
    if (selectedIndex === currentQ.correctAnswer) {
      setScore((s) => s + 1);
    }

    if (currentQuestionIdx < selectedText.questions.length - 1) {
      setCurrentQuestionIdx((idx) => idx + 1);
    } else {
      finishTest();
    }
  };

  // --- RESULTS PHASE ---
  const finishTest = () => {
    setPhase('RESULTS');

    // Save best WPM to localStorage via a global state update if we had a direct setter for it,
    // For now we assume the parent container or App context handles global stats updates if needed,
    // but React state passed via props is hard to update without a setStats prop.
    // We'll just display it here.

    // Local storage update for fastReadingWpm if it's a new record
    try {
      const savedStats = localStorage.getItem('userStats');
      let parsedStats = savedStats ? JSON.parse(savedStats) : stats;
      if (!parsedStats.fastReadingWpm || wpm > parsedStats.fastReadingWpm) {
        parsedStats.fastReadingWpm = wpm;
        localStorage.setItem('userStats', JSON.stringify(parsedStats));
        // Note: This won't reflect immediately in App's React state until reload,
        // but it's okay for now since we'll exit to menu soon.
      }
    } catch (e) {}
  };

  // -- RENDERERS --

  if (phase === 'SELECTION') {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-8 animate-in fade-in">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setMode(GameMode.FAST_READING_MENU)}
            className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            ⬅
          </button>
          <h2 className="text-3xl md:text-5xl font-black text-white italic">Okuma Hızı Testi</h2>
        </div>

        <p className="text-white/80 mb-8 text-lg">
          Bir metin seç ve okuma hızını (WPM - Dakikadaki Kelime Sayısı) ölçmeye başla!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {READING_TEXTS.map((text) => (
            <div
              key={text.id}
              className="bg-slate-800/80 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all cursor-pointer group"
              onClick={() => handleSelectText(text)}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold">
                  {text.category}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${text.level === 'Kolay' ? 'bg-green-500/20 text-green-300' : text.level === 'Orta' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'}`}
                >
                  {text.level}
                </span>
              </div>
              <h3 className="text-2xl font-black text-white mb-2 group-hover:text-indigo-400 transition-colors">
                {text.title}
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                {text.wordCount} Kelime • {text.questions.length} Soru
              </p>

              <button className="w-full py-3 bg-white/5 group-hover:bg-indigo-600 rounded-xl font-bold text-white transition-colors">
                TESTE BAŞLA
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (phase === 'PREPARATION') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in zoom-in duration-300">
        <h2 className="text-2xl text-white/80 font-bold mb-8">
          Metin hazırlanıyor... Hadi başlayalım!
        </h2>
        <div className="text-8xl font-black text-indigo-400 animate-pulse">{countdown}</div>
      </div>
    );
  }

  if (phase === 'READING' && selectedText) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-in fade-in">
        <div className="bg-slate-800/90 backdrop-blur-xl p-8 md:p-12 rounded-[40px] shadow-2xl border border-white/10 relative">
          <div className="absolute top-6 right-8 text-indigo-400 font-mono font-bold text-xl flex items-center gap-2">
            ⏱️ {Math.floor((Date.now() - startTime) / 1000)} sn
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 text-center">
            {selectedText.title}
          </h2>

          <div className="text-xl md:text-2xl text-slate-200 leading-relaxed font-medium mb-12 select-none text-justify">
            {selectedText.content}
          </div>

          <button
            onClick={finishReading}
            className="w-full md:w-auto mx-auto block px-12 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-2xl rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            OKUDUM, BİTİRDİM!
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'COMPREHENSION' && selectedText) {
    const q = selectedText.questions[currentQuestionIdx];
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-8 animate-in slide-in-from-right">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2">Anlama Testi</h2>
          <p className="text-indigo-300 font-bold">
            Soru {currentQuestionIdx + 1} / {selectedText.questions.length}
          </p>
        </div>

        <div className="bg-slate-800/90 rounded-[32px] p-8 border border-white/10 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-8">{q.text}</h3>
          <div className="space-y-4">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerSubmit(idx)}
                className="w-full p-5 text-left bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500 rounded-2xl text-white text-lg font-medium transition-all hover:pl-8"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'RESULTS' && selectedText) {
    const accuracy = Math.round((score / selectedText.questions.length) * 100);
    const readingTimeSecs = (endTime - startTime) / 1000;

    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-in zoom-in">
        <h2 className="text-4xl md:text-6xl font-black text-center text-white italic mb-12">
          TEST SONUCU
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* WPM Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-800 p-8 rounded-[40px] text-center shadow-xl border border-white/20">
            <p className="text-indigo-200 font-bold uppercase tracking-widest text-sm mb-4">
              Okuma Hızı
            </p>
            <div className="text-7xl font-black text-white mb-2 drop-shadow-lg">{wpm}</div>
            <p className="text-indigo-200 font-bold text-lg">Kelime / Dakika (WPM)</p>
          </div>

          {/* Comprehension Card */}
          <div
            className={`p-8 rounded-[40px] text-center shadow-xl border border-white/20 bg-gradient-to-br ${accuracy >= 70 ? 'from-emerald-600 to-teal-800' : 'from-orange-600 to-red-800'}`}
          >
            <p className="text-white/80 font-bold uppercase tracking-widest text-sm mb-4">
              Anlama Oranı
            </p>
            <div className="text-7xl font-black text-white mb-2 drop-shadow-lg">%{accuracy}</div>
            <p className="text-white/80 font-bold text-lg">
              {score} / {selectedText.questions.length} Doğru
            </p>
          </div>
        </div>

        <div className="bg-slate-800/80 p-6 rounded-3xl mb-12 text-center border border-white/10">
          <p className="text-slate-300 text-lg">
            Toplam <strong>{selectedText.wordCount}</strong> kelimeyi{' '}
            <strong>{readingTimeSecs.toFixed(1)}</strong> saniyede okudun.
          </p>
          {accuracy < 60 && (
            <p className="text-orange-400 mt-2 font-bold">
              Anlama oranın düşük. Okuduğunu anlamak, hızlı okumak kadar önemlidir. Yavaşlayarak
              tekrar dene!
            </p>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setPhase('SELECTION')}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white font-bold transition-colors"
          >
            🔄 TEKRAR TEST ET
          </button>
          <button
            onClick={() => setMode(GameMode.FAST_READING_MENU)}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-white font-black shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            MENÜYE DÖN
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default SpeedReadingTest;

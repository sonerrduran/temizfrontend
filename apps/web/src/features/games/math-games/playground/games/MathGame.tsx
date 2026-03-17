
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Difficulty, GameMode } from '../../../types';
import { generateQuestions } from '../../../services/geminiService';

interface MathGameProps {
  mode: GameMode;
  difficulty: Difficulty;
  grade: number;
  onComplete: (earnedStars: number) => void;
  onExit: () => void;
}

const playSound = (type: 'correct' | 'error' | 'combo') => {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;
  const ctx = new AudioContextClass();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  const now = ctx.currentTime;

  switch (type) {
    case 'correct':
      osc.frequency.setValueAtTime(523, now);
      osc.frequency.exponentialRampToValueAtTime(659, now + 0.1);
      gain.gain.setValueAtTime(0.05, now);
      osc.start(); osc.stop(now + 0.2);
      break;
    case 'combo':
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
      gain.gain.setValueAtTime(0.05, now);
      osc.start(); osc.stop(now + 0.3);
      break;
    case 'error':
      osc.frequency.setValueAtTime(150, now);
      gain.gain.setValueAtTime(0.05, now);
      osc.start(); osc.stop(now + 0.3);
      break;
  }
};

const MathGame: React.FC<MathGameProps> = ({ mode, difficulty, grade, onComplete, onExit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | 'info',
    message: string,
    combo?: boolean,
    selectedIdx?: number,
    correctIdx?: number
  } | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const QUESTION_COUNT = 20;
  const TIME_LIMIT = 30;

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    const aiQuestions = await generateQuestions(mode, difficulty, grade, QUESTION_COUNT);
    if (aiQuestions && aiQuestions.length > 0) {
      setQuestions(aiQuestions);
    } else {
      const qList = Array.from({ length: 5 }, (_, i) => ({
        text: `${Math.floor(Math.random() * 10)} + ${Math.floor(Math.random() * 10)} kaç eder?`,
        options: ["5", "10", "15", "20"],
        correctAnswer: "10"
      }));
      setQuestions(qList);
    }
    setLoading(false);
  }, [mode, grade, difficulty]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    if (loading || !!feedback || currentQuestion >= questions.length) return;
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else {
      handleAnswer(null, -1);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [timeLeft, loading, feedback, currentQuestion, questions.length]);

  const handleAnswer = (selected: any, index: number) => {
    if (feedback) return;

    const currentQ = questions[currentQuestion];
    const isTimeout = selected === null;
    const correct = !isTimeout && String(selected).toLowerCase().trim() === String(currentQ.correctAnswer).toLowerCase().trim();

    // Doğru şıkkın indeksini bul
    const correctIdx = currentQ.options.findIndex(
      (o: any) => String(o).toLowerCase().trim() === String(currentQ.correctAnswer).toLowerCase().trim()
    );

    if (timerRef.current) clearTimeout(timerRef.current);

    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      const isCombo = newStreak >= 5;
      const points = isCombo ? 2 : 1;
      setScore(s => s + points);
      playSound(isCombo ? 'combo' : 'correct');
      setFeedback({
        type: 'success',
        message: isCombo ? 'KOMBO! +2 PUAN 🔥' : 'HARİKA! ✨',
        combo: isCombo,
        selectedIdx: index,
        correctIdx: correctIdx
      });
    } else {
      playSound('error');
      setStreak(0);
      setFeedback({
        type: 'error',
        message: isTimeout ? 'SÜRE BİTTİ! ⌛' : 'DİKKAT ET! 🛡️',
        selectedIdx: index,
        correctIdx: correctIdx
      });
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(c => c + 1);
        setTimeLeft(TIME_LIMIT);
      } else {
        onComplete(score);
      }
    }, correct ? 1200 : 2500);
  };

  const getSubjectName = () => {
    switch (mode) {
      case GameMode.TURKISH: return 'Türkçe';
      case GameMode.SCIENCE: return 'Fen Bilgisi';
      case GameMode.SCIENCE_LIFE: return 'Canlılar ve Yaşam';
      case GameMode.SCIENCE_MATTER: return 'Madde ve Doğası';
      case GameMode.SCIENCE_PHYSICAL: return 'Fiziksel Olaylar';
      case GameMode.SCIENCE_EARTH: return 'Dünya ve Evren';
      case GameMode.SOCIAL_STUDIES: return 'Sosyal Bilgiler';
      case GameMode.INFORMATICS: return 'Bilişim';
      case GameMode.TURKISH: return 'Türkçe';
      case GameMode.TURKISH_LISTENING: return 'Dinleme / İzleme';
      case GameMode.TURKISH_SPEAKING: return 'Konuşma';
      case GameMode.TURKISH_READING: return 'Okuma';
      case GameMode.TURKISH_WRITING: return 'Yazma';
      case GameMode.ENGLISH: return 'İngilizce';
      case GameMode.MUSIC: return 'Müzik';
      case GameMode.CHESS: return 'Satranç';
      case GameMode.RELIGION_MENU: return 'Din Kültürü';
      case GameMode.RELIGION_BELIEF: return 'İnanç Esasları';
      case GameMode.RELIGION_WORSHIP: return 'İbadetler';
      case GameMode.RELIGION_PROPHET: return 'Hz. Muhammed';
      case GameMode.RELIGION_QURAN: return 'Kur\'an-ı Kerim';
      case GameMode.RELIGION_MORALS: return 'Ahlak ve Değerler';
      case GameMode.ART_MENU: return 'Görsel Sanatlar';
      case GameMode.ART_VISUAL_COMMUNICATION: return 'Görsel İletişim';
      case GameMode.ART_CULTURAL_HERITAGE: return 'Kültürel Miras';
      case GameMode.ART_CRITICISM_AESTHETICS: return 'Sanat Eleştirisi';
      case GameMode.LIFE_SCIENCE_MENU: return 'Hayat Bilgisi';
      case GameMode.LIFE_SCIENCE_SCHOOL: return 'Okulumuzda Hayat';
      case GameMode.LIFE_SCIENCE_HOME: return 'Evimizde Hayat';
      case GameMode.LIFE_SCIENCE_HEALTH: return 'Sağlıklı Hayat';
      case GameMode.LIFE_SCIENCE_SAFE: return 'Güvenli Hayat';
      case GameMode.LIFE_SCIENCE_COUNTRY: return 'Ülkemizde Hayat';
      case GameMode.PRESCHOOL_MENU: return 'Okul Öncesi';
      case GameMode.PRESCHOOL_COGNITIVE: return 'Bilişsel Gelişim';
      case GameMode.PRESCHOOL_LANGUAGE: return 'Dil Gelişimi';
      case GameMode.PRESCHOOL_SOCIAL: return 'Sosyal Gelişim';
      case GameMode.PRESCHOOL_MOTOR: return 'Motor Gelişim';
      case GameMode.PRESCHOOL_SELF_CARE: return 'Öz Bakım';
      case GameMode.PRESCHOOL_VALUES: return 'Değerler Eğitimi';
      case GameMode.PHYSICAL_EDUCATION: return 'Beden Eğitimi';
      case GameMode.PE_MOVEMENT: return 'Hareket Yetkinliği';
      case GameMode.PE_HEALTHY_LIFE: return 'Sağlıklı Hayat';
      case GameMode.PE_SOCIAL_EMOTIONAL: return 'Sosyal Gelişim';
      case GameMode.MATH_NUMBERS: return 'Sayılar';
      case GameMode.MATH_OPERATIONS: return 'İşlemler';
      case GameMode.MATH_GEOMETRY: return 'Geometri';
      case GameMode.MATH_DATA: return 'Veri & Olasılık';
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 px-4">
      <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm md:text-lg font-black italic text-cyan-400 animate-pulse uppercase tracking-widest text-center">
        {getSubjectName()} Dersi Yükleniyor...
      </p>
    </div>
  );

  const q = questions[currentQuestion];

  return (
    <div className={`w-full max-w-2xl mx-auto bg-slate-900/80 backdrop-blur-3xl rounded-[32px] md:rounded-[40px] p-4 md:p-8 border border-white/10 shadow-2xl relative transition-all duration-500 ${streak >= 5 ? 'ring-4 ring-orange-500 shadow-[0_0_60px_rgba(249,115,22,0.4)]' : ''}`}>

      {/* Header Info */}
      <div className="flex justify-between items-center mb-5 gap-2">
        <button onClick={onExit} className="bg-white/5 hover:bg-white/10 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center border border-white/10 transition-all">🔙</button>

        <div className="flex-1 flex justify-center gap-1.5 md:gap-2 overflow-hidden">
          {streak >= 5 && <div className="bg-orange-600 px-2 py-1 rounded-full text-[8px] md:text-[10px] font-black animate-pulse">2X PUAN 🔥</div>}
          <div className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-[8px] md:text-[10px] font-bold whitespace-nowrap uppercase tracking-widest">
            {getSubjectName()} • {currentQuestion + 1}/{questions.length}
          </div>
        </div>

        <div className="bg-yellow-400 text-slate-900 px-3 py-1 rounded-xl font-black text-xs md:text-sm flex items-center gap-1.5">
          <span>✨</span> {score}
        </div>
      </div>

      {/* Timer Bar */}
      <div className="w-full h-1.5 bg-white/10 rounded-full mb-6 overflow-hidden">
        <div className={`h-full transition-all duration-1000 ${timeLeft <= 5 ? 'bg-red-500 animate-pulse' : 'bg-cyan-400'}`} style={{ width: `${(timeLeft / TIME_LIMIT) * 100}%` }}></div>
      </div>

      {/* Question */}
      <div className="min-h-[120px] md:min-h-[180px] flex items-center justify-center mb-6 px-2 overflow-y-auto max-h-[250px] custom-scrollbar">
        <h2 className="text-base md:text-2xl font-extrabold text-center text-white text-balance leading-snug md:leading-relaxed tracking-tight break-words">
          {q.text}
        </h2>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-2">
        {q.options.map((opt: any, idx: number) => {
          // Dinamik stil belirleme
          let buttonStyle = "bg-white/5 border-white/5 hover:border-cyan-400/50 hover:bg-white/10";
          let iconStyle = "bg-cyan-500/20 text-cyan-300";

          if (feedback) {
            const isCorrect = idx === feedback.correctIdx;
            const isSelected = idx === feedback.selectedIdx;

            if (isCorrect) {
              buttonStyle = "bg-green-500/90 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.4)] scale-[1.02]";
              iconStyle = "bg-white text-green-600";
            } else if (isSelected) {
              buttonStyle = "bg-red-500/90 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)]";
              iconStyle = "bg-white text-red-600";
            } else {
              buttonStyle = "bg-white/5 border-transparent opacity-40 grayscale-[0.5]";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(opt, idx)}
              disabled={!!feedback}
              className={`group relative flex items-center min-h-[60px] md:min-h-[80px] w-full p-3.5 md:p-4 rounded-2xl md:rounded-3xl border transition-all active:scale-95 overflow-hidden ${buttonStyle}`}
            >
              <span className={`w-7 h-7 md:w-9 md:h-9 rounded-lg flex items-center justify-center font-black text-xs md:text-base shrink-0 mr-3 md:mr-4 transition-colors ${iconStyle}`}>
                {['A', 'B', 'C', 'D'][idx]}
              </span>
              <span className={`flex-1 text-left font-bold text-xs md:text-base leading-tight md:leading-snug break-words ${feedback ? 'text-white' : ''}`}>
                {opt}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback Message (Floating) */}
      {feedback && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none w-full px-4 animate-in zoom-in duration-300">
          <div className="bg-slate-900/40 backdrop-blur-sm p-8 rounded-full flex flex-col items-center justify-center">
            <div className="text-6xl md:text-8xl mb-2 animate-bounce drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
              {feedback.type === 'success' ? (feedback.combo ? '🔥' : '🌟') : '❌'}
            </div>
            <p className={`text-2xl md:text-4xl font-black uppercase tracking-tighter drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] ${feedback.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {feedback.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathGame;

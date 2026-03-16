import React, { useState, useEffect } from 'react';

const PASSAGES = [
  {
    title: 'Uzay Gezginleri',
    text: "Gelecekte insanlar sadece Dünya'da değil, Mars ve Ay'daki üslerde de yaşayacaklar. Bu üsler, güneş enerjisi ve geri dönüştürülmüş su sistemleri ile kendi kendilerine yetebilecek şekilde tasarlanıyor. Uzay yolculuğu ise ışık hızına yaklaşan yeni motor teknolojileri ile çok daha kısa sürecek.",
    questions: [
      {
        q: 'Metne göre insanların gelecekte nerede yaşaması bekleniyor?',
        a: ["Sadece Mars'ta", "Sadece Ay'da", "Mars ve Ay'daki üslerde", "Güneş'te"],
        correct: 2,
      },
      {
        q: 'Üslerin tasarımındaki temel özellik nedir?',
        a: [
          'Kendi kendine yetebilmeleri',
          'Çok büyük olmaları',
          'Sadece su üretmeleri',
          'Lüks olmaları',
        ],
        correct: 0,
      },
    ],
  },
  {
    title: 'Robotların Dünyası',
    text: 'Yapay zeka ve robotik sistemler artık fabrikalardan çıkıp evlerimize kadar girdi. Akıllı süpürgelerden kişisel asistanlara kadar her alanda robotlar bize yardım ediyor. Ancak en önemli gelişme, robotların karmaşık problemleri insanlar gibi çözebilmeye başlamasıdır.',
    questions: [
      {
        q: 'Robotlar artık nerede bulunuyor?',
        a: [
          'Sadece fabrikalarda',
          'Sadece laboratuvarlarda',
          'Evlerimizde ve her alanda',
          'Sadece uzayda',
        ],
        correct: 2,
      },
      {
        q: 'Robot teknolojisindeki en önemli gelişme nedir?',
        a: [
          'Hızlı hareket etmeleri',
          'Karmaşık problemleri çözebilmeleri',
          'Daha ucuz olmaları',
          'Renkli olmaları',
        ],
        correct: 1,
      },
    ],
  },
];

const SpeedComprehension: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'reading' | 'quiz' | 'result'>('intro');
  const [passageIndex, setPassageIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);

  const currentPassage = PASSAGES[passageIndex];

  useEffect(() => {
    if (step === 'reading' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (step === 'reading' && timeLeft === 0) {
      setStep('quiz');
    }
  }, [step, timeLeft]);

  const startReading = () => {
    const idx = Math.floor(Math.random() * PASSAGES.length);
    setPassageIndex(idx);
    setStep('reading');
    setTimeLeft(15);
    setAnswers([]);
    setQuizIndex(0);
  };

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (quizIndex < currentPassage.questions.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      setStep('result');
    }
  };

  const calculateScore = () => {
    return answers.reduce((score, ans, i) => {
      return ans === currentPassage.questions[i].correct ? score + 50 : score;
    }, 0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-4 text-white">
      <div className="w-full max-w-2xl bg-slate-900/80 backdrop-blur-2xl rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden text-center">
        {step === 'intro' && (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="text-4xl mb-6">📖</div>
            <h2 className="text-3xl font-black mb-4 uppercase italic">Hızlı Anlama Testi</h2>
            <p className="text-white/60 mb-10">
              Metni 15 saniye içinde okuyup anlamanız gerekiyor. Süre bitince sorular gelecek!
            </p>
            <button
              onClick={startReading}
              className="bg-indigo-600 hover:bg-indigo-500 px-12 py-5 rounded-2xl font-black text-xl shadow-xl transition-all active:scale-95"
            >
              HAZIRIM, BAŞLAT!
            </button>
          </div>
        )}

        {step === 'reading' && (
          <div className="animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-sm font-black text-cyan-400 uppercase tracking-widest">
                {currentPassage.title}
              </h3>
              <div className="bg-rose-500/20 text-rose-400 px-4 py-1 rounded-full font-black text-sm">
                {timeLeft}s
              </div>
            </div>
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-left text-white/90 mb-8">
              {currentPassage.text}
            </p>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-400 transition-all duration-1000 ease-linear"
                style={{ width: `${(timeLeft / 15) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {step === 'quiz' && (
          <div className="animate-in slide-in-from-right duration-300">
            <p className="text-xs font-black opacity-40 mb-2 uppercase tracking-widest">
              Soru {quizIndex + 1} / {currentPassage.questions.length}
            </p>
            <h3 className="text-2xl font-bold mb-8">{currentPassage.questions[quizIndex].q}</h3>
            <div className="grid grid-cols-1 gap-4">
              {currentPassage.questions[quizIndex].a.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 py-5 px-8 rounded-2xl font-bold text-lg text-left transition-all active:scale-[0.98]"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'result' && (
          <div className="animate-in zoom-in duration-500">
            <div className="text-5xl mb-6">🏆</div>
            <h2 className="text-4xl font-black mb-2 uppercase">Test Tamamlandı</h2>
            <p className="text-cyan-400 text-6xl font-black mb-10">{calculateScore()}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={startReading}
                className="bg-indigo-600 hover:bg-indigo-500 px-10 py-4 rounded-2xl font-black transition-all"
              >
                TEKRAR DENE
              </button>
              <button
                onClick={() => setStep('intro')}
                className="bg-white/10 hover:bg-white/20 px-10 py-4 rounded-2xl font-black transition-all border border-white/10"
              >
                ANA MENÜ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeedComprehension;

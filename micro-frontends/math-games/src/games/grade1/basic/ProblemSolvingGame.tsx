import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const ProblemSolvingGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [problem, setProblem] = useState({ text: '', answer: 0, options: [0, 0, 0, 0] });
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const problems = [
    {
      text: "Ali'nin 3 elmasi var. Ayşe ona 2 elma daha verdi. Ali'nin kaç elması oldu?",
      answer: 5,
    },
    { text: 'Bahçede 7 kelebek var. 3 tanesi uçtu. Kaç kelebek kaldı?', answer: 4 },
    {
      text: 'Sepette 4 portakal var. Anne 3 portakal daha aldı. Toplam kaç portakal var?',
      answer: 7,
    },
    { text: 'Parkta 8 çocuk oynuyor. 2 çocuk eve gitti. Kaç çocuk kaldı?', answer: 6 },
    {
      text: "Ahmet'in 5 arabası var. Babası ona 4 araba daha aldı. Toplam kaç arabası var?",
      answer: 9,
    },
    { text: 'Ağaçta 10 kuş var. 4 kuş uçtu. Kaç kuş kaldı?', answer: 6 },
    { text: 'Sınıfta 6 kız ve 5 erkek var. Toplam kaç öğrenci var?', answer: 11 },
    { text: "Zeynep'in 9 kalemi var. 3 tanesini kaybetti. Kaç kalemi kaldı?", answer: 6 },
  ];

  useEffect(() => {
    generateProblem();
  }, [level]);

  const generateProblem = () => {
    const prob = problems[Math.floor(Math.random() * problems.length)];
    const correctAnswer = prob.answer;

    const opts = [correctAnswer];
    while (opts.length < 4) {
      const wrong =
        correctAnswer + (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 3) + 1);
      if (wrong > 0 && wrong <= 20 && !opts.includes(wrong)) {
        opts.push(wrong);
      }
    }

    setProblem({
      text: prob.text,
      answer: correctAnswer,
      options: opts.sort(() => Math.random() - 0.5),
    });
    setFeedback('');
  };

  const handleAnswer = (answer: number) => {
    if (answer === problem.answer) {
      const points = 10 + level * 5;
      setScore(score + points);
      setFeedback('🎉 Harika! Doğru cevap!');
      setShowCelebration(true);

      setTimeout(() => {
        setShowCelebration(false);
        if (level < 5) {
          setLevel(level + 1);
        } else {
          onComplete(score + points);
        }
      }, 2000);
    } else {
      setFeedback('❌ Tekrar dene!');
      setTimeout(() => setFeedback(''), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          >
            {['🧮', '📚', '✏️', '🎯'][i % 4]}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all transform hover:scale-105 border border-red-500"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-700">
              <span className="text-white font-black text-xl">Seviye: {level}/5</span>
            </div>
            <div className="px-6 py-3 bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-700">
              <span className="text-white font-black text-xl">⭐ {score}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">🗺️ Problem Çözme 🗺️</h1>
          <p className="text-xl md:text-2xl text-cyan-300 font-bold">
            Matematik problemlerini çöz!
          </p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8 mb-8">
          <div className="bg-gradient-to-br from-purple-500 via-violet-500 to-purple-600 rounded-2xl p-8 mb-8">
            <p className="text-white text-2xl md:text-3xl font-bold text-center leading-relaxed">
              {problem.text}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {problem.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="h-24 bg-purple-500 hover:bg-purple-400 text-white rounded-2xl font-black text-4xl transition-all transform hover:scale-105"
              >
                {option}
              </button>
            ))}
          </div>

          {feedback && (
            <div
              className={`mt-8 text-center text-2xl font-black ${
                feedback.includes('Harika') ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {feedback}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-cyan-300/30">
          <h3 className="text-xl font-black text-cyan-300 mb-3">📋 Nasıl Oynanır?</h3>
          <ul className="text-white space-y-2">
            <li>• Problemi dikkatlice oku</li>
            <li>• Doğru cevabı hesapla</li>
            <li>• Doğru şıkkı seç ve puan kazan!</li>
          </ul>
        </div>
      </div>

      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-9xl animate-bounce">🎉</div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ProblemSolvingGame;

import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const ToyGraphGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [toys, setToys] = useState<{ emoji: string; name: string; count: number }[]>([]);
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const toyData = [
    { emoji: '🧸', name: 'Ayıcık' },
    { emoji: '🚗', name: 'Araba' },
    { emoji: '⚽', name: 'Top' },
    { emoji: '🎮', name: 'Oyun' },
    { emoji: '🪀', name: 'Yoyo' },
    { emoji: '🎲', name: 'Zar' },
  ];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const numToys = Math.min(3 + Math.floor(level / 2), 5);
    const selectedToys = [...toyData]
      .sort(() => Math.random() - 0.5)
      .slice(0, numToys)
      .map((toy) => ({
        ...toy,
        count: Math.floor(Math.random() * (5 + level * 2)) + 1,
      }));

    setToys(selectedToys);

    // Generate question
    const questionType = Math.random();
    let answer = 0;
    let questionText = '';

    if (questionType < 0.33) {
      // Which toy has most?
      const maxToy = selectedToys.reduce((max, toy) => (toy.count > max.count ? toy : max));
      answer = maxToy.count;
      questionText = `${maxToy.name} kaç tane?`;
    } else if (questionType < 0.66) {
      // Total count
      answer = selectedToys.reduce((sum, toy) => sum + toy.count, 0);
      questionText = 'Toplam kaç oyuncak var?';
    } else {
      // Specific toy count
      const randomToy = selectedToys[Math.floor(Math.random() * selectedToys.length)];
      answer = randomToy.count;
      questionText = `${randomToy.name} kaç tane?`;
    }

    setQuestion(questionText);
    setCorrectAnswer(answer);

    // Generate options
    const wrongOptions: number[] = [];
    while (wrongOptions.length < 2) {
      const wrong = answer + Math.floor(Math.random() * 5) - 2;
      if (wrong > 0 && wrong !== answer && !wrongOptions.includes(wrong)) {
        wrongOptions.push(wrong);
      }
    }

    setOptions([answer, ...wrongOptions].sort(() => Math.random() - 0.5));
    setFeedback('');
  };

  const handleAnswer = (selected: number) => {
    if (selected === correctAnswer) {
      const points = 10 + level * 5;
      setScore(score + points);
      setFeedback('🎉 Doğru! Grafiği okudun!');
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
      setFeedback('❌ Yanlış! Grafiğe tekrar bak.');
      setTimeout(() => {
        setFeedback('');
      }, 1500);
    }
  };

  const maxCount = Math.max(...toys.map((t) => t.count));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-6xl opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          >
            🧸
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
              <span className="text-white font-black text-xl">Seviye: {level}/5</span>
            </div>
            <div className="px-6 py-3 bg-yellow-500/90 backdrop-blur-xl rounded-xl border border-yellow-300/50">
              <span className="text-white font-black text-xl">⭐ {score}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
            🧸 Oyuncak Grafiği 🧸
          </h1>
          <p className="text-xl md:text-2xl text-cyan-300 font-bold">
            Grafiği oku ve soruyu cevapla!
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
          {/* Bar Graph */}
          <div className="mb-8 bg-white/5 rounded-2xl p-6">
            <div className="flex items-end justify-around gap-4 h-64">
              {toys.map((toy, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                  <div className="text-white text-sm font-bold text-center">{toy.count}</div>
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-xl transition-all duration-500 flex items-end justify-center pb-2"
                    style={{ height: `${(toy.count / maxCount) * 100}%`, minHeight: '40px' }}
                  >
                    <span className="text-4xl">{toy.emoji}</span>
                  </div>
                  <div className="text-white text-xs font-bold text-center">{toy.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-white text-2xl font-bold mb-6">{question}</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="h-24 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white rounded-2xl font-black text-5xl transition-all transform hover:scale-105 shadow-xl"
              >
                {option}
              </button>
            ))}
          </div>

          {feedback && (
            <div
              className={`mt-8 text-center text-3xl font-black ${
                feedback.includes('Doğru') ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {feedback}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-cyan-300/30">
          <h3 className="text-xl font-black text-cyan-300 mb-3">📋 Nasıl Oynanır?</h3>
          <ul className="text-white space-y-2">
            <li>• Grafikteki çubukları say</li>
            <li>• Her oyuncağın sayısına bak</li>
            <li>• Soruyu cevapla!</li>
          </ul>
        </div>
      </div>

      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-9xl animate-bounce">📊</div>
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

export default ToyGraphGame;

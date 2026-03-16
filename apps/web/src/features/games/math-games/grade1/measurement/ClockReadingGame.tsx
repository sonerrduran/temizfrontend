import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const ClockReadingGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [targetHour, setTargetHour] = useState(3);
  const [targetMinute, setTargetMinute] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    // Basit saatler: tam saat ve yarım saat
    const hour = Math.floor(Math.random() * 12) + 1;
    const minute = level <= 2 ? 0 : Math.random() < 0.5 ? 0 : 30;

    setTargetHour(hour);
    setTargetMinute(minute);

    const correctAnswer = minute === 0 ? `${hour}:00` : `${hour}:30`;

    const wrongOptions = [];
    while (wrongOptions.length < 2) {
      const wrongHour = Math.floor(Math.random() * 12) + 1;
      const wrongMinute = Math.random() < 0.5 ? 0 : 30;
      const wrongAnswer = wrongMinute === 0 ? `${wrongHour}:00` : `${wrongHour}:30`;

      if (wrongAnswer !== correctAnswer && !wrongOptions.includes(wrongAnswer)) {
        wrongOptions.push(wrongAnswer);
      }
    }

    const allOptions = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
    setFeedback('');
  };

  const handleAnswer = (selected: string) => {
    const correctAnswer = targetMinute === 0 ? `${targetHour}:00` : `${targetHour}:30`;

    if (selected === correctAnswer) {
      const points = 10 + level * 5;
      setScore(score + points);
      setFeedback('🎉 Doğru! Saati okudun!');
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
      setFeedback('❌ Yanlış! Tekrar dene.');
      setTimeout(() => {
        setFeedback('');
      }, 1500);
    }
  };

  const getClockHandRotation = () => {
    const hourRotation = (targetHour % 12) * 30 + (targetMinute / 60) * 30;
    const minuteRotation = targetMinute * 6;
    return { hourRotation, minuteRotation };
  };

  const { hourRotation, minuteRotation } = getClockHandRotation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 p-4 md:p-8 relative overflow-hidden">
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
            🕐
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
            🕐 Saat Kaç? 🕐
          </h1>
          <p className="text-xl md:text-2xl text-cyan-300 font-bold">Saati okumayı öğren!</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-64 h-64 bg-white rounded-full shadow-2xl">
              {/* Clock face */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, idx) => {
                  const angle = (idx * 30 - 90) * (Math.PI / 180);
                  const x = 50 + 40 * Math.cos(angle);
                  const y = 50 + 40 * Math.sin(angle);
                  return (
                    <div
                      key={num}
                      className="absolute text-2xl font-black text-gray-800"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {num}
                    </div>
                  );
                })}
              </div>

              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20"></div>

              {/* Hour hand */}
              <div
                className="absolute top-1/2 left-1/2 w-2 h-16 bg-gray-800 rounded-full origin-bottom transform -translate-x-1/2"
                style={{
                  transform: `translate(-50%, -100%) rotate(${hourRotation}deg)`,
                  transformOrigin: 'bottom center',
                }}
              ></div>

              {/* Minute hand */}
              <div
                className="absolute top-1/2 left-1/2 w-1.5 h-24 bg-blue-600 rounded-full origin-bottom transform -translate-x-1/2"
                style={{
                  transform: `translate(-50%, -100%) rotate(${minuteRotation}deg)`,
                  transformOrigin: 'bottom center',
                }}
              ></div>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-white text-2xl font-bold">Saat kaç?</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="h-24 bg-gradient-to-br from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white rounded-2xl font-black text-4xl transition-all transform hover:scale-105 shadow-xl"
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
            <li>• Saatin akrep ve yelkovanına bak</li>
            <li>• Kısa akrep saati gösterir</li>
            <li>• Uzun yelkovan dakikayı gösterir</li>
            <li>• Doğru saati seç!</li>
          </ul>
        </div>
      </div>

      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-9xl animate-bounce">🕐</div>
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

export default ClockReadingGame;

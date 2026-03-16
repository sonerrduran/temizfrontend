import React, { useState, useEffect } from 'react';

interface BalloonCountGameProps {
  onBack: () => void;
}

const BalloonCountGame: React.FC<BalloonCountGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(10);
  const [balloonCount, setBalloonCount] = useState(0);
  const [balloons, setBalloons] = useState<
    Array<{ id: number; x: number; y: number; color: string }>
  >([]);
  const [options, setOptions] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const BALLOON_COLORS = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

  useEffect(() => {
    generateRound();
  }, []);

  const generateRound = () => {
    const count = Math.floor(Math.random() * 10) + 1;
    setBalloonCount(count);

    const newBalloons = [];
    for (let i = 0; i < count; i++) {
      newBalloons.push({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 10,
        color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      });
    }
    setBalloons(newBalloons);

    const wrongOptions = [];
    while (wrongOptions.length < 3) {
      const wrong = Math.floor(Math.random() * 10) + 1;
      if (wrong !== count && !wrongOptions.includes(wrong)) {
        wrongOptions.push(wrong);
      }
    }

    const allOptions = [count, ...wrongOptions].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
    setFeedback('');
  };

  const handleAnswer = (selected: number) => {
    if (selected === balloonCount) {
      setFeedback('🎉 Doğru!');
      setScore(score + 10);

      setTimeout(() => {
        if (round < totalRounds) {
          setRound(round + 1);
          generateRound();
        } else {
          setShowCelebration(true);
        }
      }, 1500);
    } else {
      setFeedback('❌ Tekrar say!');
      setTimeout(() => setFeedback(''), 1000);
    }
  };

  const resetGame = () => {
    setScore(0);
    setRound(1);
    setShowCelebration(false);
    generateRound();
  };

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl max-w-2xl">
          <div className="text-8xl mb-6">🎈🎉</div>
          <h2 className="text-5xl font-black text-white mb-4">Harika!</h2>
          <p className="text-3xl text-white mb-2">Toplam Puan: {score}</p>
          <p className="text-xl text-white/80 mb-8">Sayma konusunda çok iyisin!</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetGame}
              className="px-8 py-4 bg-green-500 hover:bg-green-600 rounded-xl text-white font-bold text-xl transition-all"
            >
              Tekrar Oyna
            </button>
            <button
              onClick={onBack}
              className="px-8 py-4 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold text-xl transition-all"
            >
              Menüye Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold transition-all backdrop-blur-sm"
          >
            ← Geri
          </button>
          <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">
            🎈 Balon Say
          </h1>
          <div className="w-24"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Puan</div>
            <div className="text-3xl font-black text-white">{score}</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Tur</div>
            <div className="text-3xl font-black text-white">
              {round}/{totalRounds}
            </div>
          </div>
        </div>

        {/* Instruction */}
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 mb-6 text-center shadow-2xl">
          <h3 className="text-3xl font-black text-white">Balonları Say!</h3>
        </div>

        {/* Balloon Area */}
        <div className="relative bg-gradient-to-br from-cyan-400/30 to-blue-500/30 backdrop-blur-sm rounded-3xl h-96 mb-6 overflow-hidden border-4 border-white/20 shadow-2xl">
          {balloons.map((balloon) => (
            <div
              key={balloon.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-bounce"
              style={{
                left: `${balloon.x}%`,
                top: `${balloon.y}%`,
                animationDelay: `${balloon.id * 0.1}s`,
                animationDuration: '2s',
              }}
            >
              <div
                className="w-16 h-20 rounded-full shadow-xl"
                style={{ backgroundColor: balloon.color }}
              />
              <div className="w-0.5 h-12 bg-gray-400 mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Options */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={!!feedback}
              className="bg-white/30 hover:bg-white/40 backdrop-blur-sm rounded-2xl p-6 text-5xl font-black text-white transition-all hover:scale-105 active:scale-95 shadow-xl disabled:opacity-50"
            >
              {option}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`text-center text-3xl font-black p-6 rounded-xl ${
              feedback.includes('🎉')
                ? 'bg-green-500/30 text-green-100'
                : 'bg-red-500/30 text-red-100'
            }`}
          >
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
};

export default BalloonCountGame;

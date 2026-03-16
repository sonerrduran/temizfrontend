import { useState, useEffect } from 'react';

interface ColorMatchGameProps {
  onBack: () => void;
}

const ColorMatchGame = ({ onBack }: ColorMatchGameProps) => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [currentColor, setCurrentColor] = useState({ name: '', color: '', turkish: '' });
  const [options, setOptions] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(120);

  const colors = [
    { name: 'RED', color: '#EF4444', turkish: 'Kırmızı' },
    { name: 'BLUE', color: '#3B82F6', turkish: 'Mavi' },
    { name: 'GREEN', color: '#10B981', turkish: 'Yeşil' },
    { name: 'YELLOW', color: '#FBBF24', turkish: 'Sarı' },
    { name: 'ORANGE', color: '#F97316', turkish: 'Turuncu' },
    { name: 'PURPLE', color: '#A855F7', turkish: 'Mor' },
    { name: 'PINK', color: '#EC4899', turkish: 'Pembe' },
    { name: 'BLACK', color: '#1F2937', turkish: 'Siyah' },
    { name: 'WHITE', color: '#F3F4F6', turkish: 'Beyaz' },
    { name: 'BROWN', color: '#92400E', turkish: 'Kahverengi' },
  ];

  useEffect(() => {
    generateQuestion();
  }, [round]);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showFeedback]);

  const generateQuestion = () => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    setCurrentColor(color);

    const wrongOptions = colors
      .filter((c) => c.name !== color.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((c) => c.name);

    const allOptions = [color.name, ...wrongOptions].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const correct = answer === currentColor.name;
    if (correct) setScore(score + 10);

    setTimeout(() => {
      if (round < 15) {
        setRound(round + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        alert(`Game Over! Your Score: ${score + (correct ? 10 : 0)}`);
        onBack();
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold hover:scale-105 transition-all"
          >
            ← Back
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-slate-700/50 backdrop-blur-xl rounded-xl border border-white/10">
              <span className="text-white font-bold">Level: {round}/15</span>
            </div>
            <div className="px-6 py-3 bg-slate-700/50 backdrop-blur-xl rounded-xl border border-white/10">
              <span className="text-white font-bold">⭐ {score}</span>
            </div>
            <div className="px-6 py-3 bg-slate-700/50 backdrop-blur-xl rounded-xl border border-white/10">
              <span className="text-white font-bold">⏱️ {timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black text-white text-center mb-8">
          🎨 Color Match 🎨
        </h1>

        {/* Game Content */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8">
          <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-8 mb-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-white mb-6">What color is this?</p>
              <div
                className="w-48 h-48 mx-auto rounded-3xl shadow-2xl border-8 border-white/30"
                style={{ backgroundColor: currentColor.color }}
              ></div>
              <p className="text-lg text-gray-200 mt-4 font-semibold">({currentColor.turkish})</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={showFeedback}
                className={`text-white text-xl font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  showFeedback && option === currentColor.name
                    ? 'bg-green-600'
                    : showFeedback && option === selectedAnswer
                    ? 'bg-red-600'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div
              className={`mt-8 p-6 rounded-2xl text-center font-bold text-2xl ${
                selectedAnswer === currentColor.name
                  ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                  : 'bg-red-500/20 border border-red-500/30 text-red-300'
              }`}
            >
              {selectedAnswer === currentColor.name
                ? '🎉 Correct! Great job!'
                : `❌ Wrong! It's ${currentColor.name}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorMatchGame;

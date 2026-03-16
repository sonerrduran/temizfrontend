import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const CarefulEyesGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [targetEmoji, setTargetEmoji] = useState('');
  const [grid, setGrid] = useState<string[]>([]);
  const [targetCount, setTargetCount] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const emojis = ['🌟', '⭐', '✨', '💫', '🌙', '☀️', '🌈', '☁️'];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const target = emojis[Math.floor(Math.random() * emojis.length)];
    setTargetEmoji(target);

    const gridSize = Math.min(16 + level * 4, 36);
    const count = Math.floor(Math.random() * (5 + level)) + 3;
    const gridData = [];

    for (let i = 0; i < count; i++) {
      gridData.push(target);
    }

    while (gridData.length < gridSize) {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      if (randomEmoji !== target) {
        gridData.push(randomEmoji);
      }
    }

    setGrid(gridData.sort(() => Math.random() - 0.5));
    setTargetCount(count);
    setUserAnswer('');
    setFeedback('');
  };

  const handleSubmit = () => {
    const answer = parseInt(userAnswer);

    if (isNaN(answer)) {
      setFeedback('❌ Lütfen bir sayı gir!');
      setTimeout(() => setFeedback(''), 1500);
      return;
    }

    if (answer === targetCount) {
      const points = 10 + level * 5;
      setScore(score + points);
      setFeedback('🎉 Mükemmel! Doğru saydın!');

      setTimeout(() => {
        if (level < 5) {
          setLevel(level + 1);
        } else {
          onComplete(score + points);
        }
      }, 1500);
    } else {
      setFeedback('❌ Yanlış! Tekrar say.');
      setTimeout(() => {
        setUserAnswer('');
        setFeedback('');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-white/10 rounded-xl">
              <span className="text-white font-black">Seviye: {level}/5</span>
            </div>
            <div className="px-6 py-3 bg-yellow-500/90 rounded-xl">
              <span className="text-white font-black">⭐ {score}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">👀 Dikkatli Gözler 👀</h1>
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl px-8 py-4 inline-block">
            <p className="text-white text-2xl font-black">
              🎯 <span className="text-5xl">{targetEmoji}</span> kaç tane?
            </p>
          </div>
        </div>

        <div className="bg-white/10 rounded-3xl p-8 mb-8">
          <div className={`grid gap-4 mb-8 ${grid.length <= 20 ? 'grid-cols-5' : 'grid-cols-6'}`}>
            {grid.map((emoji, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white/20 to-white/10 rounded-xl p-4 flex items-center justify-center h-20"
              >
                <span className="text-4xl">{emoji}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-6">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-48 h-20 bg-white/20 text-white text-5xl font-black text-center rounded-2xl border-4 border-white/30 focus:border-yellow-400 outline-none"
              placeholder="?"
            />
            <button
              onClick={handleSubmit}
              className="px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-2xl font-black text-2xl shadow-lg transform hover:scale-105 transition-all"
            >
              Kontrol Et ✓
            </button>
          </div>

          {feedback && (
            <div
              className={`mt-8 text-center text-3xl font-black ${feedback.includes('Mükemmel') || feedback.includes('Doğru') ? 'text-green-400' : 'text-red-400'}`}
            >
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarefulEyesGame;

import React, { useState, useEffect } from 'react';

interface SpaceAdditionGameProps {
  onExit: () => void;
}

const SpaceAdditionGame: React.FC<SpaceAdditionGameProps> = ({ onExit }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [level, setLevel] = useState(1);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const n1 = Math.floor(Math.random() * 5) + 1;
    const n2 = Math.floor(Math.random() * 5) + 1;
    setNum1(n1);
    setNum2(n2);
    setUserAnswer('');
    setFeedback('');
  };

  const checkAnswer = () => {
    const correctAnswer = num1 + num2;
    const isCorrect = parseInt(userAnswer) === correctAnswer;

    setShowFeedback(true);

    if (isCorrect) {
      const points = 10 + level * 5;
      setScore(score + points);
      setFeedback('✅ Roket fırlatıldı! Harika!');
    } else {
      setFeedback(`❌ Roket fırlatılamadı! Doğru cevap: ${correctAnswer}`);
    }

    setTimeout(() => {
      if (level < 5) {
        setLevel(level + 1);
        generateQuestion();
        setShowFeedback(false);
      } else {
        const finalScore = isCorrect ? score + 10 + level * 5 : score;
        alert(`Oyun Bitti! Toplam Puanın: ${finalScore}`);
        onExit();
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all transform hover:scale-105 border border-red-500"
          >
            ← Çıkış
          </button>

          <div className="flex gap-4">
            <div className="px-6 py-3 bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-700">
              <span className="text-white font-black">Seviye: {level}/5</span>
            </div>
            <div className="px-6 py-3 bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-700">
              <span className="text-white font-black">⭐ {score}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black flex items-center justify-center gap-3">
            🚀 Uzay Toplama
          </h1>
          <p className="text-slate-400 text-lg mt-2">Puan: {score}</p>
        </div>

        {/* Game Card - Koyu Lacivert (Dış Katman) */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          {/* Question Card - Purple Gradient (Oyun Kutusu Rengi) */}
          <div className="bg-gradient-to-br from-purple-500 via-violet-500 to-purple-600 rounded-2xl p-8 md:p-12 mb-8">
            <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap">
              {/* First Planet */}
              <div className="flex flex-col items-center bg-purple-700/40 p-4 md:p-5 rounded-2xl border-2 border-purple-400 w-[140px] md:w-[160px]">
                <div className="text-6xl md:text-7xl mb-2">🪐</div>
                <span className="text-3xl md:text-4xl font-black text-white">{num1}</span>
              </div>

              {/* Plus Sign */}
              <span className="text-4xl md:text-5xl font-black text-white">+</span>

              {/* Second Planet */}
              <div className="flex flex-col items-center bg-purple-700/40 p-4 md:p-5 rounded-2xl border-2 border-purple-400 w-[140px] md:w-[160px]">
                <div className="text-6xl md:text-7xl mb-2">🌍</div>
                <span className="text-3xl md:text-4xl font-black text-white">{num2}</span>
              </div>

              {/* Equals */}
              <span className="text-4xl md:text-5xl font-black text-white">=</span>

              {/* Answer Box with Rocket */}
              <div className="flex flex-col items-center gap-2">
                <div className="text-5xl">🚀</div>
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !showFeedback && checkAnswer()}
                  disabled={showFeedback}
                  className="w-24 h-24 md:w-28 md:h-28 text-4xl md:text-5xl font-black text-center border-4 border-white rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/50 bg-white text-slate-800 disabled:opacity-50"
                  placeholder="?"
                  autoFocus
                />
              </div>
            </div>
          </div>

          {/* Check Button - Açık Purple (Net Beyaz Yazı, Gölgesiz) */}
          <button
            onClick={checkAnswer}
            disabled={!userAnswer || showFeedback}
            className="w-full bg-purple-500 hover:bg-purple-400 text-white text-2xl md:text-3xl font-black py-5 md:py-6 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            Roketi Fırlat! 🚀
          </button>

          {/* Feedback */}
          {showFeedback && (
            <div
              className={`mt-8 p-6 rounded-2xl text-center font-bold text-2xl ${
                feedback.includes('✅')
                  ? 'bg-green-500/90 border-2 border-green-300 text-white'
                  : 'bg-red-500/90 border-2 border-red-300 text-white'
              }`}
            >
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpaceAdditionGame;

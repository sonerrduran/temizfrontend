import React, { useState, useEffect } from 'react';

interface AlienSubtractionGameProps {
  onExit: () => void;
}

const AlienSubtractionGame: React.FC<AlienSubtractionGameProps> = ({ onExit }) => {
  const [totalAliens, setTotalAliens] = useState(0);
  const [leftAliens, setLeftAliens] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [level, setLevel] = useState(1);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const total = Math.floor(Math.random() * 6) + 4; // 4-9 aliens
    const left = Math.floor(Math.random() * (total - 1)) + 1;
    setTotalAliens(total);
    setLeftAliens(left);
    setUserAnswer('');
    setFeedback('');
  };

  const checkAnswer = () => {
    const correctAnswer = totalAliens - leftAliens;
    const isCorrect = parseInt(userAnswer) === correctAnswer;

    setShowFeedback(true);

    if (isCorrect) {
      const points = 10 + level * 5;
      setScore(score + points);
      setFeedback('✅ Doğru! Harika!');
    } else {
      setFeedback(`❌ Yanlış! Doğru cevap: ${correctAnswer}`);
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

        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black flex items-center justify-center gap-3">
            👽 Uzaylı Çıkarma
          </h1>
          <p className="text-slate-400 text-lg mt-2">Puan: {score}</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          <div className="bg-gradient-to-br from-indigo-500 via-blue-500 to-indigo-600 rounded-2xl p-8 md:p-12 mb-8">
            <div className="flex flex-col items-center gap-6">
              <div className="bg-indigo-700/40 p-6 rounded-2xl border-2 border-indigo-400 w-full max-w-md">
                <p className="text-white text-lg mb-3 text-center">{totalAliens} uzaylı vardı:</p>
                <div className="flex gap-2 flex-wrap justify-center">
                  {Array.from({ length: totalAliens }).map((_, i) => (
                    <span key={i} className="text-5xl">
                      {i < leftAliens ? '🚀' : '👽'}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <p className="text-white text-2xl font-black mb-4">
                  {leftAliens} uzaylı uzay gemisine bindi!
                </p>
                <p className="text-white text-xl font-bold">Kaç uzaylı kaldı?</p>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !showFeedback && checkAnswer()}
                  disabled={showFeedback}
                  className="w-28 h-28 text-5xl font-black text-center border-4 border-white rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/50 bg-white text-slate-800 disabled:opacity-50"
                  placeholder="?"
                  autoFocus
                />
                <span className="text-4xl">👽</span>
              </div>
            </div>
          </div>

          <button
            onClick={checkAnswer}
            disabled={!userAnswer || showFeedback}
            className="w-full bg-indigo-500 hover:bg-indigo-400 text-white text-2xl md:text-3xl font-black py-5 md:py-6 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            Kontrol Et
          </button>

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

export default AlienSubtractionGame;

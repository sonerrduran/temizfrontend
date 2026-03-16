import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SpeedGame: React.FC = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentWord, setCurrentWord] = useState(0);

  const words = ['elma', 'armut', 'kiraz', 'üzüm', 'muz', 'portakal', 'çilek', 'karpuz'];

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      alert(`Süre doldu! ${score} kelime okudun!`);
      navigate('/academic/turkish/grade2');
    }
  }, [timeLeft]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-black text-white">⚡ Hızlı Okuma</h1>
            <div className="text-3xl font-bold text-white">⏱️ {timeLeft}s</div>
          </div>

          <div className="bg-white/20 rounded-xl p-12 mb-6 text-center">
            <p className="text-6xl font-black text-white">{words[currentWord]}</p>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                if (currentWord < words.length - 1) {
                  setCurrentWord(currentWord + 1);
                  setScore(score + 1);
                } else {
                  setCurrentWord(0);
                  setScore(score + 1);
                }
              }}
              className="px-12 py-6 bg-green-500 hover:bg-green-400 text-white rounded-xl font-bold text-2xl"
            >
              Okudum! ✓
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-white text-xl">Okunan: {score} kelime</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedGame;

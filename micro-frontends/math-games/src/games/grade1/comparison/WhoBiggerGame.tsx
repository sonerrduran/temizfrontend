import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const WhoBiggerGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const maxNum = 10 + level * 10;
    const n1 = Math.floor(Math.random() * maxNum) + 1;
    let n2 = Math.floor(Math.random() * maxNum) + 1;

    while (n1 === n2) {
      n2 = Math.floor(Math.random() * maxNum) + 1;
    }

    setNum1(n1);
    setNum2(n2);
    setFeedback('');
  };

  const handleAnswer = (selected: 'bigger' | 'smaller' | 'equal') => {
    let isCorrect = false;

    if (selected === 'bigger' && num1 > num2) isCorrect = true;
    if (selected === 'smaller' && num1 < num2) isCorrect = true;
    if (selected === 'equal' && num1 === num2) isCorrect = true;

    if (isCorrect) {
      const points = 10 + level * 5;
      setScore(score + points);
      setFeedback('🎉 Doğru!');

      setTimeout(() => {
        if (level < 5) {
          setLevel(level + 1);
        } else {
          onComplete(score + points);
        }
      }, 1500);
    } else {
      setFeedback('❌ Yanlış! Tekrar dene.');
      setTimeout(() => setFeedback(''), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 p-4 md:p-8">
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
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">🔢 Kim Daha Büyük? 🔢</h1>
        </div>

        <div className="bg-white/10 rounded-3xl p-8 mb-8">
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-12 text-center">
              <div className="text-white text-9xl font-black mb-4">{num1}</div>
              <div className="text-white text-2xl font-bold">Birinci Sayı</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-12 text-center">
              <div className="text-white text-9xl font-black mb-4">{num2}</div>
              <div className="text-white text-2xl font-bold">İkinci Sayı</div>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-white text-3xl font-bold">Birinci sayı ikinci sayıdan...</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <button
              onClick={() => handleAnswer('bigger')}
              className="h-32 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-2xl font-black text-3xl flex flex-col items-center justify-center gap-2"
            >
              <span className="text-5xl">{'>'}</span>
              <span>BÜYÜK</span>
            </button>
            <button
              onClick={() => handleAnswer('equal')}
              className="h-32 bg-gradient-to-br from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-white rounded-2xl font-black text-3xl flex flex-col items-center justify-center gap-2"
            >
              <span className="text-5xl">{'='}</span>
              <span>EŞİT</span>
            </button>
            <button
              onClick={() => handleAnswer('smaller')}
              className="h-32 bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 text-white rounded-2xl font-black text-3xl flex flex-col items-center justify-center gap-2"
            >
              <span className="text-5xl">{'<'}</span>
              <span>KÜÇÜK</span>
            </button>
          </div>

          {feedback && (
            <div
              className={`mt-8 text-center text-3xl font-black ${feedback.includes('Doğru') ? 'text-green-400' : 'text-red-400'}`}
            >
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhoBiggerGame;

import React, { useState, useEffect } from 'react';

interface MoneyCountGameProps {
  onExit: () => void;
}

export default function MoneyCountGame({ onExit }: MoneyCountGameProps) {
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState<number[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  const [round, setRound] = useState(1);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const coinValues = [1, 5, 10];
    const numCoins = Math.floor(Math.random() * 4) + 2;
    const newCoins = Array.from(
      { length: numCoins },
      () => coinValues[Math.floor(Math.random() * coinValues.length)]
    );

    const total = newCoins.reduce((sum, coin) => sum + coin, 0);
    const wrong1 = total + Math.floor(Math.random() * 5) + 1;
    const wrong2 = Math.max(1, total - Math.floor(Math.random() * 5) - 1);

    const shuffled = [total, wrong1, wrong2].sort(() => Math.random() - 0.5);

    setCoins(newCoins);
    setCorrectAnswer(total);
    setOptions(shuffled);
    setFeedback('');
  };

  const handleAnswer = (selected: number) => {
    if (selected === correctAnswer) {
      setScore(score + 10);
      setFeedback('✅ Doğru! Aferin!');
      setTimeout(() => {
        setRound(round + 1);
        generateQuestion();
      }, 1500);
    } else {
      setFeedback('❌ Yanlış! Tekrar say.');
      setTimeout(() => setFeedback(''), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">Round: {round}</span>
            </div>
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">⭐ {score}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black mb-4">💰 Para Sayma</h1>
          <p className="text-white/80 text-lg">Bu paraların toplamı kaç lira?</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-green-500/30 p-8">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              {coins.map((coin, index) => (
                <div
                  key={index}
                  className="bg-yellow-400 rounded-full w-20 h-20 flex items-center justify-center text-2xl font-black text-slate-800 border-4 border-yellow-600"
                >
                  {coin}₺
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="bg-white/10 hover:bg-white/20 border-2 border-white/20 rounded-2xl p-6 transition-all transform hover:scale-105"
              >
                <p className="text-white font-black text-3xl">{option}₺</p>
              </button>
            ))}
          </div>

          {feedback && (
            <div
              className={`text-center text-2xl font-black p-4 rounded-xl ${
                feedback.includes('✅')
                  ? 'bg-green-500/20 text-green-300'
                  : 'bg-red-500/20 text-red-300'
              }`}
            >
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

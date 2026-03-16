import React, { useState, useEffect } from 'react';

interface CoinMatchGameProps {
  onExit: () => void;
}

const coins = [
  { value: 0.05, name: '5 Kuruş', image: '🪙' },
  { value: 0.1, name: '10 Kuruş', image: '🪙' },
  { value: 0.25, name: '25 Kuruş', image: '🪙' },
  { value: 0.5, name: '50 Kuruş', image: '🪙' },
  { value: 1, name: '1 Lira', image: '💰' },
];

const bills = [
  { value: 5, name: '5 Lira', image: '💵' },
  { value: 10, name: '10 Lira', image: '💵' },
  { value: 20, name: '20 Lira', image: '💵' },
  { value: 50, name: '50 Lira', image: '💵' },
  { value: 100, name: '100 Lira', image: '💵' },
];

export default function CoinMatchGame({ onExit }: CoinMatchGameProps) {
  const [score, setScore] = useState(0);
  const [currentMoney, setCurrentMoney] = useState<(typeof coins)[0] | (typeof bills)[0]>();
  const [options, setOptions] = useState<Array<(typeof coins)[0] | (typeof bills)[0]>>([]);
  const [feedback, setFeedback] = useState('');
  const [round, setRound] = useState(1);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const allMoney = [...coins, ...bills];
    const correct = allMoney[Math.floor(Math.random() * allMoney.length)];
    const wrongOptions = allMoney.filter((m) => m.value !== correct.value);
    const shuffled = [correct, ...wrongOptions.sort(() => Math.random() - 0.5).slice(0, 2)].sort(
      () => Math.random() - 0.5
    );

    setCurrentMoney(correct);
    setOptions(shuffled);
    setFeedback('');
  };

  const handleAnswer = (selected: (typeof coins)[0] | (typeof bills)[0]) => {
    if (selected.value === currentMoney?.value) {
      setScore(score + 10);
      setFeedback('✅ Doğru! Aferin!');
      setTimeout(() => {
        setRound(round + 1);
        generateQuestion();
      }, 1500);
    } else {
      setFeedback('❌ Yanlış! Tekrar dene.');
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
          <h1 className="text-white text-4xl md:text-5xl font-black mb-4">🪙 Para Eşleştirme</h1>
          <p className="text-white/80 text-lg">Bu parayı bul!</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-green-500/30 p-8">
          {currentMoney && (
            <>
              <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl p-12 mb-8 text-center">
                <div className="text-9xl mb-4">{currentMoney.image}</div>
                <h2 className="text-4xl font-black text-white">{currentMoney.name}</h2>
                <p className="text-2xl text-white/90 mt-2">
                  {currentMoney.value >= 1
                    ? `${currentMoney.value}₺`
                    : `${currentMoney.value * 100} Kuruş`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="bg-white/10 hover:bg-white/20 border-2 border-white/20 rounded-2xl p-6 transition-all transform hover:scale-105"
                  >
                    <div className="text-6xl mb-2">{option.image}</div>
                    <p className="text-white font-bold text-lg">{option.name}</p>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

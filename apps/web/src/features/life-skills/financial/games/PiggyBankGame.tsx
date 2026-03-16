import React, { useState } from 'react';

interface PiggyBankGameProps {
  onExit: () => void;
}

export default function PiggyBankGame({ onExit }: PiggyBankGameProps) {
  const [savings, setSavings] = useState(0);
  const [goal, setGoal] = useState(100);
  const [message, setMessage] = useState('');

  const addMoney = (amount: number) => {
    const newSavings = savings + amount;
    setSavings(newSavings);

    if (newSavings >= goal) {
      setMessage('🎉 Tebrikler! Hedefinize ulaştınız!');
      setTimeout(() => {
        setSavings(0);
        setGoal(goal + 50);
        setMessage('');
      }, 2000);
    } else {
      setMessage(`💰 ${amount}₺ eklendi!`);
      setTimeout(() => setMessage(''), 1000);
    }
  };

  const progress = (savings / goal) * 100;

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
          <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
            <span className="text-white font-black">Hedef: {goal}₺</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black mb-4">🐷 Kumbara Oyunu</h1>
          <p className="text-white/80 text-lg">Para biriktir ve hedefinize ulaşın!</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-pink-500/30 p-8">
          <div className="text-center mb-8">
            <div className="text-9xl mb-4">🐷</div>
            <h2 className="text-5xl font-black text-white mb-4">{savings}₺</h2>

            <div className="w-full bg-slate-700 rounded-full h-8 mb-4">
              <div
                className="bg-gradient-to-r from-pink-500 to-rose-500 h-8 rounded-full transition-all duration-500 flex items-center justify-center"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <span className="text-white font-bold text-sm">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[1, 5, 10, 20].map((amount) => (
              <button
                key={amount}
                onClick={() => addMoney(amount)}
                className="bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-2xl p-6 font-black text-2xl transition-all transform hover:scale-105"
              >
                +{amount}₺
              </button>
            ))}
          </div>

          {message && (
            <div
              className={`text-center text-2xl font-black p-4 rounded-xl ${
                message.includes('🎉')
                  ? 'bg-green-500/20 text-green-300'
                  : 'bg-blue-500/20 text-blue-300'
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

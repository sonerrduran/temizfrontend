import React, { useState, useEffect } from 'react';

interface NeedWantGameProps {
  onExit: () => void;
}

const items = [
  { name: 'Ekmek', icon: '🍞', isNeed: true },
  { name: 'Su', icon: '💧', isNeed: true },
  { name: 'Oyuncak Araba', icon: '🚗', isNeed: false },
  { name: 'Giysi', icon: '👕', isNeed: true },
  { name: 'Çikolata', icon: '🍫', isNeed: false },
  { name: 'Ev', icon: '🏠', isNeed: true },
  { name: 'Oyun Konsolu', icon: '🎮', isNeed: false },
  { name: 'Meyve', icon: '🍎', isNeed: true },
  { name: 'Dondurma', icon: '🍦', isNeed: false },
  { name: 'Kitap', icon: '📚', isNeed: true },
  { name: 'Bisiklet', icon: '🚲', isNeed: false },
  { name: 'Ayakkabı', icon: '👟', isNeed: true },
];

export default function NeedWantGame({ onExit }: NeedWantGameProps) {
  const [score, setScore] = useState(0);
  const [currentItem, setCurrentItem] = useState(items[0]);
  const [feedback, setFeedback] = useState('');
  const [round, setRound] = useState(1);
  const [usedItems, setUsedItems] = useState<string[]>([]);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const availableItems = items.filter((item) => !usedItems.includes(item.name));
    if (availableItems.length === 0) {
      setUsedItems([]);
      return;
    }
    const item = availableItems[Math.floor(Math.random() * availableItems.length)];
    setCurrentItem(item);
    setFeedback('');
  };

  const handleAnswer = (isNeed: boolean) => {
    if (isNeed === currentItem.isNeed) {
      setScore(score + 10);
      setFeedback('✅ Doğru! Aferin!');
    } else {
      setFeedback(
        `❌ Yanlış! ${currentItem.name} bir ${currentItem.isNeed ? 'ihtiyaç' : 'istek'}tir.`
      );
    }

    setTimeout(() => {
      setUsedItems([...usedItems, currentItem.name]);
      setRound(round + 1);
      generateQuestion();
    }, 2000);
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
          <h1 className="text-white text-4xl md:text-5xl font-black mb-4">
            🎯 İhtiyaç-İstek Ayırma
          </h1>
          <p className="text-white/80 text-lg">Bu bir ihtiyaç mı yoksa istek mi?</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-blue-500/30 p-8">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-12 mb-8 text-center">
            <div className="text-9xl mb-4">{currentItem.icon}</div>
            <h2 className="text-4xl font-black text-white">{currentItem.name}</h2>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <button
              onClick={() => handleAnswer(true)}
              className="bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-2xl p-8 font-black text-2xl transition-all transform hover:scale-105"
            >
              <div className="text-5xl mb-2">✅</div>
              İHTİYAÇ
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white rounded-2xl p-8 font-black text-2xl transition-all transform hover:scale-105"
            >
              <div className="text-5xl mb-2">💭</div>
              İSTEK
            </button>
          </div>

          {feedback && (
            <div
              className={`text-center text-xl font-black p-4 rounded-xl ${
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

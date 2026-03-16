import React, { useState, useEffect } from 'react';

interface PrivacyGameProps {
  onExit: () => void;
}

const items = [
  { name: 'Adın', icon: '👤', isPrivate: true },
  { name: 'En sevdiğin renk', icon: '🎨', isPrivate: false },
  { name: 'Ev adresin', icon: '🏠', isPrivate: true },
  { name: 'Telefon numaran', icon: '📱', isPrivate: true },
  { name: 'Favori hayvanın', icon: '🐶', isPrivate: false },
  { name: 'Okul numaranız', icon: '🎓', isPrivate: true },
  { name: 'Şifren', icon: '🔑', isPrivate: true },
  { name: 'Favori yemeğin', icon: '🍕', isPrivate: false },
  { name: 'Doğum tarihin', icon: '🎂', isPrivate: true },
  { name: 'Sevdiğin oyun', icon: '🎮', isPrivate: false },
];

export default function PrivacyGame({ onExit }: PrivacyGameProps) {
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

  const handleAnswer = (isPrivate: boolean) => {
    if (isPrivate === currentItem.isPrivate) {
      setScore(score + 10);
      setFeedback('✅ Doğru! Aferin!');
    } else {
      setFeedback(
        `❌ Yanlış! ${currentItem.name} ${currentItem.isPrivate ? 'kişisel bilgidir, paylaşmamalısın' : 'paylaşılabilir'}.`
      );
    }

    setTimeout(() => {
      setUsedItems([...usedItems, currentItem.name]);
      setRound(round + 1);
      generateQuestion();
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
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
          <h1 className="text-white text-4xl md:text-5xl font-black mb-4">🔐 Gizlilik Oyunu</h1>
          <p className="text-white/80 text-lg">Bu bilgiyi paylaşabilir misin?</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-purple-500/30 p-8">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-12 mb-8 text-center">
            <div className="text-9xl mb-4">{currentItem.icon}</div>
            <h2 className="text-4xl font-black text-white">{currentItem.name}</h2>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <button
              onClick={() => handleAnswer(false)}
              className="bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-2xl p-8 font-black text-2xl transition-all transform hover:scale-105"
            >
              <div className="text-5xl mb-2">✅</div>
              PAYLAŞABİLİRİM
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 text-white rounded-2xl p-8 font-black text-2xl transition-all transform hover:scale-105"
            >
              <div className="text-5xl mb-2">🔒</div>
              GİZLİ TUTMALIYIM
            </button>
          </div>

          {feedback && (
            <div
              className={`text-center text-lg font-black p-4 rounded-xl ${
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

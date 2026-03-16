import React, { useState, useEffect } from 'react';

interface InsideOutsideGameProps {
  onBack: () => void;
}

interface Item {
  id: number;
  emoji: string;
  name: string;
  correctZone: 'inside' | 'outside';
  currentZone: 'none' | 'inside' | 'outside';
}

const InsideOutsideGame: React.FC<InsideOutsideGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showRules, setShowRules] = useState(true);

  const allItems = [
    { emoji: '🐕', name: 'Köpek', inside: true },
    { emoji: '🐈', name: 'Kedi', inside: true },
    { emoji: '🪴', name: 'Bitki', inside: true },
    { emoji: '📺', name: 'TV', inside: true },
    { emoji: '🛋️', name: 'Koltuk', inside: true },
    { emoji: '🌳', name: 'Ağaç', inside: false },
    { emoji: '🌻', name: 'Çiçek', inside: false },
    { emoji: '🦋', name: 'Kelebek', inside: false },
    { emoji: '☀️', name: 'Güneş', inside: false },
    { emoji: '🌙', name: 'Ay', inside: false },
  ];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const count = Math.min(4 + level, 8);
    const shuffled = [...allItems].sort(() => Math.random() - 0.5).slice(0, count);

    setItems(
      shuffled.map((item, idx) => ({
        id: idx,
        emoji: item.emoji,
        name: item.name,
        correctZone: item.inside ? 'inside' : 'outside',
        currentZone: 'none',
      }))
    );

    setSelectedItem(null);
    setFeedback('');
  };

  const handleItemClick = (itemId: number) => {
    setSelectedItem(itemId);
  };

  const handleZoneClick = (zone: 'inside' | 'outside') => {
    if (selectedItem === null) return;

    const item = items.find((i) => i.id === selectedItem);
    if (!item || item.currentZone !== 'none') return;

    const isCorrect = item.correctZone === zone;

    if (isCorrect) {
      const newItems = items.map((i) => (i.id === selectedItem ? { ...i, currentZone: zone } : i));
      setItems(newItems);
      setScore(score + 10);
      setFeedback('✅ Doğru!');
      setSelectedItem(null);

      if (newItems.every((i) => i.currentZone !== 'none')) {
        setTimeout(() => {
          if (level < 5) {
            setLevel(level + 1);
          } else {
            setShowCelebration(true);
          }
        }, 1500);
      } else {
        setTimeout(() => setFeedback(''), 1000);
      }
    } else {
      setFeedback('❌ Yanlış konum!');
      setTimeout(() => setFeedback(''), 1000);
    }
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setShowCelebration(false);
    generateLevel();
  };

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl p-12 text-center border border-pink-500/30 max-w-2xl">
          <div className="text-8xl mb-6">🎯🎉</div>
          <h2 className="text-5xl font-black text-white mb-4">Harika!</h2>
          <p className="text-3xl text-white mb-2">Toplam Puan: {score}</p>
          <p className="text-xl text-white/80 mb-8">Tüm nesneleri doğru yerleştirdin!</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetGame}
              className="px-8 py-4 bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 hover:from-pink-400 hover:to-rose-500 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
            >
              Tekrar Oyna
            </button>
            <button
              onClick={onBack}
              className="px-8 py-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
            >
              Menüye Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all transform hover:scale-105"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">Seviye: {level}/5</span>
            </div>
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">⭐ {score}</span>
            </div>
          </div>
        </div>

        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black">🏠 İçinde-Dışında</h1>
          <p className="text-slate-400 text-lg mt-2">Nesneleri doğru konuma yerleştir!</p>
        </div>

        {/* Dış Kart - Lacivert */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          {/* İç Kart - Pembe/Rose Gradient */}
          <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 rounded-2xl p-8 md:p-12 mb-8">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setShowRules(true)}
                className="px-4 py-2 bg-pink-700/40 hover:bg-pink-600/40 border-2 border-pink-300 text-white rounded-xl font-bold transition-all transform hover:scale-105"
              >
                📖 NASIL OYNANIR?
              </button>
            </div>

            {/* Game Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Inside Zone */}
              <div
                onClick={() => handleZoneClick('inside')}
                className="bg-pink-700/40 border-4 border-pink-300 rounded-2xl p-6 min-h-[300px] cursor-pointer hover:bg-pink-600/40 transition-all"
              >
                <h3 className="text-2xl font-black text-white text-center mb-4">🏠 İÇERİDE</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {items
                    .filter((i) => i.currentZone === 'inside')
                    .map((item) => (
                      <div key={item.id} className="text-5xl">
                        {item.emoji}
                      </div>
                    ))}
                </div>
              </div>

              {/* Outside Zone */}
              <div
                onClick={() => handleZoneClick('outside')}
                className="bg-pink-700/40 border-4 border-pink-300 rounded-2xl p-6 min-h-[300px] cursor-pointer hover:bg-pink-600/40 transition-all"
              >
                <h3 className="text-2xl font-black text-white text-center mb-4">🌳 DIŞARIDA</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {items
                    .filter((i) => i.currentZone === 'outside')
                    .map((item) => (
                      <div key={item.id} className="text-5xl">
                        {item.emoji}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Available Items */}
            <div className="bg-pink-700/40 rounded-2xl p-6 border-2 border-pink-300">
              <h3 className="text-xl font-black text-white text-center mb-4">Nesneleri Seç</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                {items
                  .filter((i) => i.currentZone === 'none')
                  .map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`p-4 rounded-2xl text-6xl transition-all transform ${
                        selectedItem === item.id
                          ? 'bg-yellow-400 scale-110 border-4 border-yellow-300'
                          : 'bg-pink-800/40 hover:bg-pink-700/40 border-2 border-pink-300 hover:scale-105'
                      }`}
                    >
                      {item.emoji}
                    </button>
                  ))}
              </div>
            </div>

            {feedback && (
              <div
                className={`mt-6 text-center text-2xl font-black p-6 rounded-xl ${
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

      {/* Kurallar Overlay */}
      {showRules && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-3xl border border-pink-500/30 max-w-md w-full">
            <div className="text-5xl mb-4">🏠</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Nasıl Oynanır?</h3>
            <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base">
              <li className="flex gap-2">
                <span className="text-pink-400 font-bold">1.</span> Nesneleri doğru konuma yerleştir
              </li>
              <li className="flex gap-2">
                <span className="text-pink-400 font-bold">2.</span> Önce nesneyi seç, sonra içeride
                veya dışarıda alanına tıkla
              </li>
              <li className="flex gap-2">
                <span className="text-pink-400 font-bold">3.</span> Ev içi nesneler içeride, doğa
                nesneleri dışarıda olmalı
              </li>
              <li className="flex gap-2">
                <span className="text-pink-400 font-bold">4.</span> Tüm nesneleri doğru yerleştir ve
                seviyeyi tamamla!
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 hover:from-pink-400 hover:to-rose-500 text-white font-black py-4 rounded-xl transition-all transform hover:scale-105"
            >
              ANLADIM, BAŞLA! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsideOutsideGame;

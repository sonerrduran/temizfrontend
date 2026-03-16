import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const SizeOrderGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [items, setItems] = useState<{ id: number; size: number; emoji: string }[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const emojis = ['🐘', '🦒', '🐕', '🐈', '🐁', '🦋', '🐜', '🌳', '🌲', '🌱', '🏠', '🏢', '🏰'];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const count = Math.min(3 + level, 6);
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const newItems = Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 80) + 40,
      emoji,
    })).sort(() => Math.random() - 0.5);

    setItems(newItems);
    setSelectedOrder([]);
    setFeedback('');
  };

  const handleItemClick = (id: number) => {
    if (selectedOrder.includes(id)) return;

    const newOrder = [...selectedOrder, id];
    setSelectedOrder(newOrder);

    if (newOrder.length === items.length) {
      checkAnswer(newOrder);
    }
  };

  const checkAnswer = (order: number[]) => {
    const sortedItems = [...items].sort((a, b) => a.size - b.size);
    const correctOrder = sortedItems.map((item) => item.id);

    const isCorrect = order.every((id, idx) => id === correctOrder[idx]);

    if (isCorrect) {
      const points = 10 + level * 5;
      setScore(score + points);
      setFeedback('🎉 Harika! Doğru sıraladın!');
      setShowCelebration(true);

      setTimeout(() => {
        setShowCelebration(false);
        if (level < 5) {
          setLevel(level + 1);
        } else {
          onComplete(score + points);
        }
      }, 2000);
    } else {
      setFeedback('❌ Tekrar dene! Küçükten büyüğe sırala.');
      setTimeout(() => {
        setSelectedOrder([]);
        setFeedback('');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 md:p-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          >
            <span className="text-2xl opacity-20">📏</span>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
              <span className="text-white font-black text-xl">Seviye: {level}/5</span>
            </div>
            <div className="px-6 py-3 bg-yellow-500/90 backdrop-blur-xl rounded-xl border border-yellow-300/50">
              <span className="text-white font-black text-xl">⭐ {score}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
            📏 Boyut Sıralama 📏
          </h1>
          <p className="text-xl md:text-2xl text-cyan-300 font-bold">
            Nesneleri küçükten büyüğe sırala!
          </p>
        </div>

        {/* Game Area */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
          <div className="text-center mb-8">
            <p className="text-2xl text-white font-bold">
              {selectedOrder.length === 0
                ? 'En küçüğünden başlayarak sırala!'
                : `${selectedOrder.length}/${items.length} seçildi`}
            </p>
          </div>

          {/* Items Grid */}
          <div className="flex flex-wrap justify-center items-end gap-8 min-h-[300px]">
            {items.map((item, idx) => {
              const isSelected = selectedOrder.includes(item.id);
              const orderIndex = selectedOrder.indexOf(item.id);

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  disabled={isSelected}
                  className={`relative transition-all duration-300 ${
                    isSelected
                      ? 'opacity-50 scale-90'
                      : 'hover:scale-110 hover:-translate-y-2 cursor-pointer'
                  }`}
                  style={{
                    fontSize: `${item.size}px`,
                    filter: isSelected ? 'grayscale(50%)' : 'none',
                  }}
                >
                  <span>{item.emoji}</span>
                  {isSelected && (
                    <div className="absolute -top-4 -right-4 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg">
                      {orderIndex + 1}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`mt-8 text-center text-2xl font-black ${
                feedback.includes('Harika') ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {feedback}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-cyan-300/30">
          <h3 className="text-xl font-black text-cyan-300 mb-3">📋 Nasıl Oynanır?</h3>
          <ul className="text-white space-y-2">
            <li>• Nesneleri küçükten büyüğe doğru sırala</li>
            <li>• En küçük olanı ilk seç, en büyüğü son seç</li>
            <li>• Her doğru sıralama puan kazandırır!</li>
          </ul>
        </div>
      </div>

      {/* Celebration */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-9xl animate-bounce">🎉</div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SizeOrderGame;

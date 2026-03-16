import React, { useState, useEffect } from 'react';

interface MarketBasketGameProps {
  onBack: () => void;
}

interface Item {
  name: string;
  icon: string;
  price: number;
}

const ITEMS: Item[] = [
  { name: 'Ekmek', icon: '🍞', price: 5 },
  { name: 'Süt', icon: '🥛', price: 8 },
  { name: 'Yumurta', icon: '🥚', price: 12 },
  { name: 'Peynir', icon: '🧀', price: 15 },
  { name: 'Domates', icon: '🍅', price: 6 },
  { name: 'Elma', icon: '🍎', price: 7 },
  { name: 'Muz', icon: '🍌', price: 10 },
  { name: 'Portakal', icon: '🍊', price: 9 },
  { name: 'Çikolata', icon: '🍫', price: 14 },
  { name: 'Su', icon: '💧', price: 3 },
];

const MarketBasketGame: React.FC<MarketBasketGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(8);
  const [basket, setBasket] = useState<Item[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    generateRound();
  }, []);

  const generateRound = () => {
    const itemCount = Math.min(2 + Math.floor(round / 2), 5);
    const selectedItems: Item[] = [];

    for (let i = 0; i < itemCount; i++) {
      const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
      selectedItems.push(item);
    }

    setBasket(selectedItems);
    setUserAnswer('');
    setFeedback('');
  };

  const calculateTotal = () => {
    return basket.reduce((sum, item) => sum + item.price, 0);
  };

  const handleCheck = () => {
    const total = calculateTotal();

    if (parseInt(userAnswer) === total) {
      setFeedback('✅ Doğru! Harika hesaplama!');
      setScore(score + 20);

      setTimeout(() => {
        if (round < totalRounds) {
          setRound(round + 1);
          generateRound();
        } else {
          setShowCelebration(true);
        }
      }, 1500);
    } else {
      setFeedback(`❌ Yanlış! Doğru cevap: ${total} TL`);
      setTimeout(() => {
        setFeedback('');
      }, 2000);
    }
  };

  const resetGame = () => {
    setScore(0);
    setRound(1);
    setShowCelebration(false);
    generateRound();
  };

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl max-w-2xl">
          <div className="text-8xl mb-6">🛒🎉</div>
          <h2 className="text-5xl font-black text-white mb-4">Harika!</h2>
          <p className="text-3xl text-white mb-2">Toplam Puan: {score}</p>
          <p className="text-xl text-white/80 mb-8">Toplama konusunda çok iyisin!</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetGame}
              className="px-8 py-4 bg-green-500 hover:bg-green-600 rounded-xl text-white font-bold text-xl transition-all"
            >
              Tekrar Oyna
            </button>
            <button
              onClick={onBack}
              className="px-8 py-4 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold text-xl transition-all"
            >
              Menüye Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold transition-all backdrop-blur-sm"
          >
            ← Geri
          </button>
          <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">
            🛒 Market Sepeti
          </h1>
          <div className="w-24"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Puan</div>
            <div className="text-3xl font-black text-white">{score}</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Tur</div>
            <div className="text-3xl font-black text-white">
              {round}/{totalRounds}
            </div>
          </div>
        </div>

        {/* Instruction */}
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 mb-6 text-center shadow-2xl">
          <h3 className="text-2xl font-black text-white">
            Sepetteki Ürünlerin Toplam Fiyatını Hesapla!
          </h3>
        </div>

        {/* Basket */}
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 mb-6 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {basket.map((item, index) => (
              <div key={index} className="bg-white/40 rounded-2xl p-6 text-center shadow-lg">
                <div className="text-6xl mb-2">{item.icon}</div>
                <div className="text-xl font-bold text-white mb-1">{item.name}</div>
                <div className="text-2xl font-black text-yellow-300">{item.price} TL</div>
              </div>
            ))}
          </div>

          {/* Calculation Area */}
          <div className="bg-white/20 rounded-2xl p-6">
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {basket.map((item, index) => (
                <span key={index} className="text-3xl font-black text-white">
                  {item.price}
                  {index < basket.length - 1 && <span className="text-yellow-300 mx-2">+</span>}
                </span>
              ))}
              <span className="text-3xl font-black text-yellow-300 mx-2">=</span>
              <span className="text-3xl font-black text-white">?</span>
            </div>
          </div>
        </div>

        {/* Answer Input */}
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 mb-4 shadow-2xl">
          <div className="flex items-center justify-center gap-4">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
              className="w-32 h-20 text-5xl font-black text-center border-4 border-white rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-300 bg-white text-green-600 shadow-lg"
              placeholder="?"
              autoFocus
            />
            <span className="text-4xl font-black text-white">TL</span>
          </div>
        </div>

        {/* Check Button */}
        <button
          onClick={handleCheck}
          disabled={!userAnswer || !!feedback}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white text-2xl font-black py-6 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg mb-4"
        >
          Kontrol Et
        </button>

        {/* Feedback */}
        {feedback && (
          <div
            className={`text-center text-3xl font-black p-6 rounded-xl ${
              feedback.includes('✅')
                ? 'bg-green-500/30 text-green-100'
                : 'bg-red-500/30 text-red-100'
            }`}
          >
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketBasketGame;

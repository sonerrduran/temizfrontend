import React, { useState, useEffect } from 'react';

interface ChangeCalculatorGameProps {
  onBack: () => void;
}

const ChangeCalculatorGame: React.FC<ChangeCalculatorGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(10);
  const [itemPrice, setItemPrice] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [itemIcon, setItemIcon] = useState('');

  const items = [
    { icon: '🍎', name: 'Elma' },
    { icon: '🍌', name: 'Muz' },
    { icon: '🍞', name: 'Ekmek' },
    { icon: '🥛', name: 'Süt' },
    { icon: '🍫', name: 'Çikolata' },
    { icon: '🧃', name: 'Meyve Suyu' },
    { icon: '🍪', name: 'Kurabiye' },
    { icon: '🥤', name: 'İçecek' },
  ];

  useEffect(() => {
    generateRound();
  }, []);

  const generateRound = () => {
    const item = items[Math.floor(Math.random() * items.length)];
    const price = Math.floor(Math.random() * 40) + 10;
    const paid = price + Math.floor(Math.random() * 30) + 5;

    setItemIcon(item.icon);
    setItemPrice(price);
    setPaidAmount(paid);
    setUserAnswer('');
    setFeedback('');
  };

  const handleCheck = () => {
    const correctChange = paidAmount - itemPrice;

    if (parseInt(userAnswer) === correctChange) {
      setFeedback('✅ Doğru! Mükemmel hesaplama!');
      setScore(score + 10);

      setTimeout(() => {
        if (round < totalRounds) {
          setRound(round + 1);
          generateRound();
        } else {
          setShowCelebration(true);
        }
      }, 1500);
    } else {
      setFeedback(`❌ Yanlış! Doğru cevap: ${correctChange} TL`);
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
      <div className="min-h-screen bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl max-w-2xl">
          <div className="text-8xl mb-6">💰🎉</div>
          <h2 className="text-5xl font-black text-white mb-4">Harika!</h2>
          <p className="text-3xl text-white mb-2">Toplam Puan: {score}</p>
          <p className="text-xl text-white/80 mb-8">Para üstü hesaplamada ustasın!</p>
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
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500 p-4 md:p-8">
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
            💰 Para Üstü Hesapla
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

        {/* Scenario */}
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 mb-6 shadow-2xl">
          <div className="text-center mb-6">
            <div className="text-8xl mb-4">{itemIcon}</div>
            <h3 className="text-3xl font-black text-white mb-6">Alışveriş Senaryosu</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Item Price */}
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-center shadow-xl">
              <div className="text-white/80 text-lg mb-2">Ürün Fiyatı</div>
              <div className="text-5xl font-black text-white">{itemPrice} TL</div>
            </div>

            {/* Paid Amount */}
            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-6 text-center shadow-xl">
              <div className="text-white/80 text-lg mb-2">Ödenen Para</div>
              <div className="text-5xl font-black text-white">{paidAmount} TL</div>
            </div>
          </div>

          {/* Calculation */}
          <div className="mt-6 bg-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-center gap-4 text-4xl font-black text-white">
              <span>{paidAmount}</span>
              <span className="text-yellow-300">-</span>
              <span>{itemPrice}</span>
              <span className="text-yellow-300">=</span>
              <span>?</span>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 mb-6 text-center shadow-2xl">
          <h3 className="text-2xl font-black text-white">Para Üstü Kaç TL?</h3>
        </div>

        {/* Answer Input */}
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 mb-4 shadow-2xl">
          <div className="flex items-center justify-center gap-4">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
              className="w-32 h-20 text-5xl font-black text-center border-4 border-white rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-300 bg-white text-orange-600 shadow-lg"
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
          className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-2xl font-black py-6 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg mb-4"
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

export default ChangeCalculatorGame;

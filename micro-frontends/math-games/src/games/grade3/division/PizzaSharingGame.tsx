import React, { useState, useEffect } from 'react';

interface PizzaSharingGameProps {
  onBack: () => void;
}

const PizzaSharingGame: React.FC<PizzaSharingGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(10);
  const [pizzas, setPizzas] = useState(0);
  const [people, setPeople] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    generateRound();
  }, []);

  const generateRound = () => {
    const peopleCount = Math.floor(Math.random() * 6) + 2;
    const slicesPerPerson = Math.floor(Math.random() * 4) + 1;
    const totalPizzas = peopleCount * slicesPerPerson;

    setPizzas(totalPizzas);
    setPeople(peopleCount);
    setUserAnswer('');
    setFeedback('');
  };

  const handleCheck = () => {
    const correctAnswer = pizzas / people;

    if (parseInt(userAnswer) === correctAnswer) {
      setFeedback('✅ Doğru! Mükemmel paylaşım!');
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
      setFeedback(`❌ Yanlış! Doğru cevap: ${correctAnswer}`);
      setTimeout(() => setFeedback(''), 2000);
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
      <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl max-w-2xl">
          <div className="text-8xl mb-6">🍕🎉</div>
          <h2 className="text-5xl font-black text-white mb-4">Harika!</h2>
          <p className="text-3xl text-white mb-2">Toplam Puan: {score}</p>
          <p className="text-xl text-white/80 mb-8">Bölme konusunda ustasın!</p>
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
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold transition-all backdrop-blur-sm"
          >
            ← Geri
          </button>
          <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">
            🍕 Pizza Paylaşımı
          </h1>
          <div className="w-24"></div>
        </div>

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

        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 mb-6 shadow-2xl">
          <h3 className="text-2xl font-black text-white text-center mb-6">
            {pizzas} dilim pizzayı {people} kişiye eşit paylaştır!
          </h3>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-white/20 rounded-2xl p-6 text-center">
              <div className="text-6xl mb-2">🍕</div>
              <div className="text-4xl font-black text-white">{pizzas}</div>
              <div className="text-lg text-white/80">Dilim</div>
            </div>
            <div className="bg-white/20 rounded-2xl p-6 text-center">
              <div className="text-6xl mb-2">👥</div>
              <div className="text-4xl font-black text-white">{people}</div>
              <div className="text-lg text-white/80">Kişi</div>
            </div>
          </div>

          <div className="bg-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-center gap-4 text-4xl font-black text-white">
              <span>{pizzas}</span>
              <span className="text-yellow-300">÷</span>
              <span>{people}</span>
              <span className="text-yellow-300">=</span>
              <span>?</span>
            </div>
          </div>
        </div>

        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 mb-6 text-center shadow-2xl">
          <h3 className="text-2xl font-black text-white mb-4">Her Kişiye Kaç Dilim Düşer?</h3>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
            className="w-32 h-20 text-5xl font-black text-center border-4 border-white rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-300 bg-white text-orange-600 shadow-lg"
            placeholder="?"
            autoFocus
          />
        </div>

        <button
          onClick={handleCheck}
          disabled={!userAnswer || !!feedback}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white text-2xl font-black py-6 rounded-2xl transition-all disabled:opacity-50 shadow-lg mb-4"
        >
          Kontrol Et
        </button>

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

export default PizzaSharingGame;

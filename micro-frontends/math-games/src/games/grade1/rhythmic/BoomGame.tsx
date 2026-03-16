import React, { useState, useEffect } from 'react';

interface BoomGameProps {
  onBack: () => void;
}

const BoomGame: React.FC<BoomGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [boomNumber, setBoomNumber] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    startNewRound();
  }, [level]);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const startNewRound = () => {
    const boomNumbers = [2, 3, 4, 5];
    setBoomNumber(boomNumbers[Math.floor(Math.random() * boomNumbers.length)]);
    setCurrentNumber(1);
    setFeedback('');
  };

  const handleNumberClick = () => {
    if (currentNumber % boomNumber === 0) {
      setFeedback('❌ Bu sayıda "BOM" demeliydin!');
      setTimeout(() => {
        setFeedback('');
        setCurrentNumber(currentNumber + 1);
      }, 1500);
    } else {
      setScore(score + 5);
      setCurrentNumber(currentNumber + 1);

      if (currentNumber % 20 === 0) {
        setLevel(level + 1);
      }
    }
  };

  const handleBoomClick = () => {
    if (currentNumber % boomNumber === 0) {
      setScore(score + 10);
      setFeedback('💣 BOM! Doğru!');
      setTimeout(() => {
        setFeedback('');
        setCurrentNumber(currentNumber + 1);
      }, 800);

      if (currentNumber % 20 === 0) {
        setLevel(level + 1);
      }
    } else {
      setScore(Math.max(0, score - 10));
      setFeedback('❌ Bu sayı katı değil!');
      setTimeout(() => {
        setFeedback('');
        setCurrentNumber(currentNumber + 1);
      }, 1500);
    }
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setTimeLeft(60);
    setGameOver(false);
    startNewRound();
  };

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
            💣 Bom Oyunu
          </h1>
          <div className="w-24"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Puan</div>
            <div className="text-3xl font-black text-white">{score}</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Süre</div>
            <div className="text-3xl font-black text-white">{timeLeft}s</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Seviye</div>
            <div className="text-3xl font-black text-white">{level}</div>
          </div>
        </div>

        {!gameOver ? (
          <>
            {/* Instructions */}
            <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 mb-8 text-center shadow-2xl">
              <h3 className="text-2xl font-black text-white mb-2">
                {boomNumber}'ün katlarında "BOM" de!
              </h3>
              <p className="text-lg text-white/80">Diğer sayılarda sayıyı söyle</p>
            </div>

            {/* Current Number */}
            <div className="bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-md rounded-3xl p-12 mb-8 text-center shadow-2xl">
              <div className="text-9xl font-black text-white mb-4 animate-pulse">
                {currentNumber}
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={handleNumberClick}
                className="bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-3xl p-12 text-white transition-all hover:scale-105 active:scale-95 shadow-2xl"
              >
                <div className="text-6xl font-black mb-2">{currentNumber}</div>
                <div className="text-xl">Sayıyı Söyle</div>
              </button>

              <button
                onClick={handleBoomClick}
                className="bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 rounded-3xl p-12 text-white transition-all hover:scale-105 active:scale-95 shadow-2xl"
              >
                <div className="text-6xl mb-2">💣</div>
                <div className="text-6xl font-black mb-2">BOM!</div>
                <div className="text-xl">Kat Sayısı</div>
              </button>
            </div>

            {/* Feedback */}
            {feedback && (
              <div
                className={`mt-6 text-center text-3xl font-black p-6 rounded-xl ${
                  feedback.includes('💣')
                    ? 'bg-green-500/30 text-green-100'
                    : 'bg-red-500/30 text-red-100'
                }`}
              >
                {feedback}
              </div>
            )}
          </>
        ) : (
          /* Game Over */
          <div className="bg-white/30 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl">
            <div className="text-6xl mb-4">💣</div>
            <h2 className="text-4xl font-black text-white mb-4">Oyun Bitti!</h2>
            <p className="text-2xl text-white mb-8">Toplam Puan: {score}</p>
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
        )}
      </div>
    </div>
  );
};

export default BoomGame;

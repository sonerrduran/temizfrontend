import React, { useState, useEffect } from 'react';

interface LeftRightRaceGameProps {
  onBack: () => void;
}

type Direction = 'left' | 'right';

const LeftRightRaceGame: React.FC<LeftRightRaceGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(10);
  const [targetDirection, setTargetDirection] = useState<Direction>('left');
  const [timeLeft, setTimeLeft] = useState(3);
  const [feedback, setFeedback] = useState('');
  const [showRules, setShowRules] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive && timeLeft > 0 && !showRules) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isActive) {
      handleTimeout();
    }
  }, [timeLeft, isActive, showRules]);

  const generateRound = () => {
    const direction: Direction = Math.random() > 0.5 ? 'left' : 'right';
    setTargetDirection(direction);
    setTimeLeft(Math.max(2, 4 - Math.floor(level / 2)));
    setFeedback('');
    setIsActive(true);
  };

  const handleTimeout = () => {
    setFeedback('⏰ Süre doldu!');
    setIsActive(false);
    setTimeout(() => {
      if (round < totalRounds) {
        setRound(round + 1);
        generateRound();
      } else {
        setShowCelebration(true);
      }
    }, 1500);
  };

  const handleDirectionClick = (direction: Direction) => {
    if (!isActive) return;

    setIsActive(false);
    if (direction === targetDirection) {
      const points = 10 + timeLeft * 2;
      setScore(score + points);
      setFeedback(`✅ Doğru! +${points}`);

      if (round % 5 === 0 && level < 5) {
        setLevel(level + 1);
      }
    } else {
      setFeedback('❌ Yanlış yön!');
    }

    setTimeout(() => {
      if (round < totalRounds) {
        setRound(round + 1);
        generateRound();
      } else {
        setShowCelebration(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setRound(1);
    setShowCelebration(false);
    generateRound();
  };

  useEffect(() => {
    if (!showRules && round === 1) {
      generateRound();
    }
  }, [showRules]);

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl p-12 text-center border border-orange-500/30 max-w-2xl">
          <div className="text-8xl mb-6">🏁🎉</div>
          <h2 className="text-5xl font-black text-white mb-4">Harika!</h2>
          <p className="text-3xl text-white mb-2">Toplam Puan: {score}</p>
          <p className="text-xl text-white/80 mb-8">Yarışı tamamladın!</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetGame}
              className="px-8 py-4 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-500 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
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
      <div className="max-w-4xl mx-auto">
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
              <span className="text-white font-black">
                Tur: {round}/{totalRounds}
              </span>
            </div>
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">⭐ {score}</span>
            </div>
          </div>
        </div>

        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black">🏁 Sağ-Sol Yarışı</h1>
          <p className="text-slate-400 text-lg mt-2">Doğru yönü hızlıca seç!</p>
        </div>

        {/* Dış Kart - Lacivert */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          {/* İç Kart - Turuncu Gradient */}
          <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-2xl p-8 md:p-12 mb-8">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setShowRules(true)}
                className="px-4 py-2 bg-orange-700/40 hover:bg-orange-600/40 border-2 border-orange-300 text-white rounded-xl font-bold transition-all transform hover:scale-105"
              >
                📖 NASIL OYNANIR?
              </button>
              <div
                className={`px-6 py-3 rounded-xl font-black text-2xl ${
                  timeLeft <= 1
                    ? 'bg-red-500/90 text-white animate-pulse'
                    : 'bg-orange-700/40 border-2 border-orange-300 text-white'
                }`}
              >
                ⏱️ {timeLeft}s
              </div>
            </div>

            {/* Direction Display */}
            <div className="bg-orange-700/40 rounded-2xl p-12 mb-8 border-2 border-orange-300 text-center">
              <div className="text-9xl mb-4 animate-pulse">
                {targetDirection === 'left' ? '⬅️' : '➡️'}
              </div>
              <p className="text-white text-3xl font-black">
                {targetDirection === 'left' ? 'SOL' : 'SAĞ'}
              </p>
            </div>

            {/* Direction Buttons */}
            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={() => handleDirectionClick('left')}
                disabled={!isActive}
                className="bg-orange-700/40 hover:bg-orange-600/40 border-2 border-orange-300 rounded-2xl p-12 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-8xl mb-2">⬅️</div>
                <p className="text-white text-2xl font-black">SOL</p>
              </button>
              <button
                onClick={() => handleDirectionClick('right')}
                disabled={!isActive}
                className="bg-orange-700/40 hover:bg-orange-600/40 border-2 border-orange-300 rounded-2xl p-12 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-8xl mb-2">➡️</div>
                <p className="text-white text-2xl font-black">SAĞ</p>
              </button>
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
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-3xl border border-orange-500/30 max-w-md w-full">
            <div className="text-5xl mb-4">🏁</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Nasıl Oynanır?</h3>
            <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base">
              <li className="flex gap-2">
                <span className="text-orange-400 font-bold">1.</span> Ekranda bir yön gösterilecek
                (Sol veya Sağ)
              </li>
              <li className="flex gap-2">
                <span className="text-orange-400 font-bold">2.</span> Hızlıca doğru yön butonuna
                tıkla
              </li>
              <li className="flex gap-2">
                <span className="text-orange-400 font-bold">3.</span> Hızlı cevap verirsen daha
                fazla puan kazanırsın
              </li>
              <li className="flex gap-2">
                <span className="text-orange-400 font-bold">4.</span> 10 turu tamamla ve kazanan sen
                ol!
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-500 text-white font-black py-4 rounded-xl transition-all transform hover:scale-105"
            >
              ANLADIM, BAŞLA! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftRightRaceGame;

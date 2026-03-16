import React, { useState, useEffect } from 'react';

interface CountdownGameProps {
  onBack: () => void;
}

const CountdownGame: React.FC<CountdownGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(10);
  const [startNumber, setStartNumber] = useState(10);
  const [currentSequence, setCurrentSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    generateRound();
  }, []);

  const generateRound = () => {
    const start = Math.floor(Math.random() * 5) + 5 + Math.floor(round / 2);
    const sequence = Array.from({ length: start + 1 }, (_, i) => start - i);

    setStartNumber(start);
    setCurrentSequence(sequence);
    setUserSequence([]);

    // Create shuffled numbers for selection
    const shuffled = [...sequence].sort(() => Math.random() - 0.5);
    setAvailableNumbers(shuffled);
    setFeedback('');
    setIsLaunching(false);
  };

  const handleNumberSelect = (num: number) => {
    if (feedback || isLaunching) return;

    const newSequence = [...userSequence, num];
    setUserSequence(newSequence);

    // Remove from available
    setAvailableNumbers(availableNumbers.filter((n) => n !== num));

    // Check if sequence is complete
    if (newSequence.length === currentSequence.length) {
      checkSequence(newSequence);
    }
  };

  const checkSequence = (sequence: number[]) => {
    const isCorrect = sequence.every((num, index) => num === currentSequence[index]);

    if (isCorrect) {
      setFeedback('🚀 Mükemmel! Roket fırlatılıyor!');
      setScore(score + 20);
      setIsLaunching(true);

      setTimeout(() => {
        if (round < totalRounds) {
          setRound(round + 1);
          generateRound();
        } else {
          setShowCelebration(true);
        }
      }, 3000);
    } else {
      setFeedback('❌ Yanlış sıra! Tekrar dene.');
      setTimeout(() => {
        setUserSequence([]);
        setAvailableNumbers([...currentSequence].sort(() => Math.random() - 0.5));
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
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black p-4 md:p-8 flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl max-w-2xl">
          <div className="text-8xl mb-6 animate-bounce">🚀🎉</div>
          <h2 className="text-5xl font-black text-white mb-4">Harika!</h2>
          <p className="text-3xl text-white mb-2">Toplam Puan: {score}</p>
          <p className="text-xl text-white/80 mb-8">Tüm roketleri başarıyla fırlattın!</p>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold transition-all backdrop-blur-sm"
          >
            ← Geri
          </button>
          <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">
            🚀 Geri Sayım
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
            {startNumber}'dan 0'a kadar geriye say!
          </h3>
        </div>

        {/* Rocket and Sequence Display */}
        <div className="bg-gradient-to-b from-blue-900/40 to-purple-900/40 backdrop-blur-sm rounded-3xl p-8 mb-6 shadow-2xl border-4 border-white/20 min-h-[300px] relative overflow-hidden">
          {/* Stars background */}
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
                }}
              />
            ))}
          </div>

          {/* Rocket */}
          <div
            className={`text-center mb-6 transition-all duration-1000 ${isLaunching ? 'transform -translate-y-96 scale-50 opacity-0' : ''}`}
          >
            <div className="text-8xl mb-4">🚀</div>
          </div>

          {/* User Sequence */}
          <div className="flex flex-wrap gap-3 justify-center">
            {userSequence.map((num, index) => (
              <div
                key={index}
                className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-3xl font-black text-white shadow-xl"
              >
                {num}
              </div>
            ))}
            {userSequence.length < currentSequence.length && (
              <div className="w-16 h-16 bg-white/20 border-4 border-dashed border-white/60 rounded-xl flex items-center justify-center text-3xl text-white/40">
                ?
              </div>
            )}
          </div>
        </div>

        {/* Available Numbers */}
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 shadow-2xl">
          <h3 className="text-xl font-black text-white text-center mb-4">Sayıları Sırayla Seç</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {availableNumbers.map((num, index) => (
              <button
                key={index}
                onClick={() => handleNumberSelect(num)}
                disabled={!!feedback && !isLaunching}
                className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 rounded-2xl text-4xl font-black text-white transition-all hover:scale-110 active:scale-95 shadow-xl disabled:opacity-50"
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`mt-6 text-center text-3xl font-black p-6 rounded-xl ${
              feedback.includes('🚀')
                ? 'bg-green-500/30 text-green-100'
                : 'bg-red-500/30 text-red-100'
            }`}
          >
            {feedback}
          </div>
        )}
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CountdownGame;

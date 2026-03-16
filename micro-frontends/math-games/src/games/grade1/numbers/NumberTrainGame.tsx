import React, { useState, useEffect } from 'react';

interface NumberTrainGameProps {
  onBack: () => void;
}

const NumberTrainGame: React.FC<NumberTrainGameProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(8);
  const [trainSlots, setTrainSlots] = useState<(number | null)[]>([]);
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    generateRound();
  }, []);

  const generateRound = () => {
    const start = Math.floor(Math.random() * 5) + 1;
    const length = Math.min(5 + Math.floor(round / 2), 8);

    const sequence = Array.from({ length }, (_, i) => start + i);
    const slots: (number | null)[] = [...sequence];

    // Remove 2-3 numbers to create gaps
    const gapCount = Math.min(2 + Math.floor(round / 3), 3);
    const gapIndices: number[] = [];

    while (gapIndices.length < gapCount) {
      const index = Math.floor(Math.random() * length);
      if (!gapIndices.includes(index)) {
        gapIndices.push(index);
      }
    }

    const missing: number[] = [];
    gapIndices.forEach((index) => {
      const value = slots[index];
      if (value !== null) {
        missing.push(value);
      }
      slots[index] = null;
    });

    setTrainSlots(slots);
    setAvailableNumbers(missing.sort(() => Math.random() - 0.5));
    setSelectedNumber(null);
    setFeedback('');
  };

  const handleNumberSelect = (num: number) => {
    setSelectedNumber(num);
  };

  const handleSlotClick = (index: number) => {
    if (selectedNumber === null || trainSlots[index] !== null || feedback) return;

    // Simple check: find the correct number for this position
    let correctNumber = 0;
    if (index > 0 && trainSlots[index - 1] !== null) {
      correctNumber = trainSlots[index - 1]! + 1;
    } else if (index < trainSlots.length - 1 && trainSlots[index + 1] !== null) {
      correctNumber = trainSlots[index + 1]! - 1;
    } else {
      // Find any non-null number and calculate
      for (let i = 0; i < trainSlots.length; i++) {
        if (trainSlots[i] !== null) {
          correctNumber = trainSlots[i]! + (index - i);
          break;
        }
      }
    }

    if (selectedNumber === correctNumber) {
      const newSlots = [...trainSlots];
      newSlots[index] = selectedNumber;
      setTrainSlots(newSlots);

      const newAvailable = availableNumbers.filter((n) => n !== selectedNumber);
      setAvailableNumbers(newAvailable);
      setSelectedNumber(null);
      setScore(score + 10);

      if (newAvailable.length === 0) {
        setFeedback('🎉 Tren tamamlandı!');
        setTimeout(() => {
          if (round < totalRounds) {
            setRound(round + 1);
            generateRound();
          } else {
            setShowCelebration(true);
          }
        }, 1500);
      }
    } else {
      setFeedback('❌ Yanlış vagon!');
      setTimeout(() => setFeedback(''), 1000);
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
      <div className="min-h-screen bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl max-w-2xl">
          <div className="text-8xl mb-6">🚂🎉</div>
          <h2 className="text-5xl font-black text-white mb-4">Mükemmel!</h2>
          <p className="text-3xl text-white mb-2">Toplam Puan: {score}</p>
          <p className="text-xl text-white/80 mb-8">Tüm trenleri tamamladın!</p>
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
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 p-4 md:p-8">
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
            🚂 Sayı Treni
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
          <h3 className="text-2xl font-black text-white">Vagonları Doğru Sıraya Koy!</h3>
        </div>

        {/* Train */}
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-2xl">
          <div className="flex items-center gap-2 overflow-x-auto pb-4">
            {/* Engine */}
            <div className="flex-shrink-0 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-6 text-4xl shadow-xl">
              🚂
            </div>

            {/* Wagons */}
            {trainSlots.map((num, index) => (
              <div key={index} className="flex items-center flex-shrink-0">
                <div className="w-4 h-1 bg-gray-400"></div>
                <button
                  onClick={() => handleSlotClick(index)}
                  disabled={num !== null || !selectedNumber || !!feedback}
                  className={`w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-black transition-all shadow-xl ${
                    num !== null
                      ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white'
                      : selectedNumber
                        ? 'bg-white/40 hover:bg-white/60 text-white border-4 border-dashed border-white cursor-pointer'
                        : 'bg-white/20 text-white/40 border-4 border-dashed border-white/40'
                  }`}
                >
                  {num !== null ? num : '?'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Available Numbers */}
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 shadow-2xl">
          <h3 className="text-xl font-black text-white text-center mb-4">Sayıları Seç</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {availableNumbers.map((num, index) => (
              <button
                key={index}
                onClick={() => handleNumberSelect(num)}
                className={`w-20 h-20 rounded-2xl text-4xl font-black transition-all shadow-xl ${
                  selectedNumber === num
                    ? 'bg-yellow-400 scale-110 text-gray-800'
                    : 'bg-white/40 hover:bg-white/60 text-white'
                }`}
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
              feedback.includes('🎉')
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

export default NumberTrainGame;

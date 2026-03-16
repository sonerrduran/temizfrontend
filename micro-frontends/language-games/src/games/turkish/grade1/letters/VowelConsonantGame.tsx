import React, { useState, useEffect } from 'react';

interface VowelConsonantGameProps {
  onBack: () => void;
}

const VowelConsonantGame: React.FC<VowelConsonantGameProps> = ({ onBack }) => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [currentLetter, setCurrentLetter] = useState('A');
  const [isVowel, setIsVowel] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(120);

  const vowels = ['A', 'E', 'I', 'İ', 'O', 'Ö', 'U', 'Ü'];
  const consonants = [
    'B',
    'C',
    'Ç',
    'D',
    'F',
    'G',
    'Ğ',
    'H',
    'J',
    'K',
    'L',
    'M',
    'N',
    'P',
    'R',
    'S',
    'Ş',
    'T',
    'V',
    'Y',
    'Z',
  ];

  useEffect(() => {
    generateQuestion();
  }, [round]);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showFeedback]);

  const generateQuestion = () => {
    const useVowel = Math.random() > 0.5;
    const letter = useVowel
      ? vowels[Math.floor(Math.random() * vowels.length)]
      : consonants[Math.floor(Math.random() * consonants.length)];

    setCurrentLetter(letter);
    setIsVowel(useVowel);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const correct = (answer === 'sesli' && isVowel) || (answer === 'sessiz' && !isVowel);
    if (correct) setScore(score + 10);

    setTimeout(() => {
      if (round < 15) {
        setRound(round + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        alert(`Oyun Bitti! Skorun: ${score + (correct ? 10 : 0)}`);
        onBack();
      }
    }, 1500);
  };

  const correctAnswer = isVowel ? 'sesli' : 'sessiz';

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 via-rose-500 to-red-500 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-xl font-bold"
          >
            ← Geri
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl text-white font-black">
              ⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl text-white font-black">
              ⭐ {score}
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-black text-pink-600 mb-8 text-center">
            Sesli mi Sessiz mi? 🎵
          </h3>

          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-16 mb-8 border-4 border-yellow-400">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-700 mb-6">Bu harf sesli mi sessiz mi?</p>
              <div className="text-9xl font-black text-pink-600 animate-bounce">
                {currentLetter}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={() => !showFeedback && handleAnswer('sesli')}
              disabled={showFeedback}
              className={`p-8 rounded-2xl font-black text-3xl transition-all ${
                showFeedback
                  ? correctAnswer === 'sesli'
                    ? 'bg-green-500 text-white scale-105'
                    : selectedAnswer === 'sesli'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105'
              }`}
            >
              🎵 SESLİ HARF
            </button>
            <button
              onClick={() => !showFeedback && handleAnswer('sessiz')}
              disabled={showFeedback}
              className={`p-8 rounded-2xl font-black text-3xl transition-all ${
                showFeedback
                  ? correctAnswer === 'sessiz'
                    ? 'bg-green-500 text-white scale-105'
                    : selectedAnswer === 'sessiz'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105'
              }`}
            >
              🔇 SESSİZ HARF
            </button>
          </div>

          {showFeedback && (
            <div
              className={`mt-6 p-4 rounded-2xl text-center font-bold text-xl ${selectedAnswer === correctAnswer ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            >
              {selectedAnswer === correctAnswer
                ? '🎉 Doğru! Aferin!'
                : `❌ Yanlış! ${currentLetter} ${correctAnswer} harftir.`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VowelConsonantGame;

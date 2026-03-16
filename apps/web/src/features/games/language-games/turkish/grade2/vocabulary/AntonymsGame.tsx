import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const antonymPairs = [
  { word: 'büyük', antonym: 'küçük', emoji: '🐘', antonymEmoji: '🐭' },
  { word: 'sıcak', antonym: 'soğuk', emoji: '🔥', antonymEmoji: '❄️' },
  { word: 'hızlı', antonym: 'yavaş', emoji: '🐆', antonymEmoji: '🐢' },
  { word: 'mutlu', antonym: 'üzgün', emoji: '😊', antonymEmoji: '😢' },
  { word: 'açık', antonym: 'kapalı', emoji: '🚪', antonymEmoji: '🔒' },
  { word: 'temiz', antonym: 'kirli', emoji: '✨', antonymEmoji: '💩' },
  { word: 'gündüz', antonym: 'gece', emoji: '☀️', antonymEmoji: '🌙' },
  { word: 'yukarı', antonym: 'aşağı', emoji: '⬆️', antonymEmoji: '⬇️' },
  { word: 'eski', antonym: 'yeni', emoji: '📻', antonymEmoji: '📱' },
  { word: 'dolu', antonym: 'boş', emoji: '🥤', antonymEmoji: '🥛' },
];

const AntonymsGame: React.FC = () => {
  const navigate = useNavigate();
  const [currentPair, setCurrentPair] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  React.useEffect(() => {
    generateOptions();
  }, [currentPair]);

  const generateOptions = () => {
    const current = antonymPairs[currentPair];
    const wrongOptions = antonymPairs
      .filter((_, i) => i !== currentPair)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((p) => p.antonym);

    const allOptions = [current.antonym, ...wrongOptions].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  const handleAnswer = (answer: string) => {
    const current = antonymPairs[currentPair];
    const isCorrect = answer === current.antonym;

    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (isCorrect) {
      setScore(score + 10);
    }

    setTimeout(() => {
      if (currentPair < antonymPairs.length - 1) {
        setCurrentPair(currentPair + 1);
        setShowFeedback(false);
        setSelectedAnswer(null);
      } else {
        navigate('/academic/turkish/grade2');
      }
    }, 2000);
  };

  const current = antonymPairs[currentPair];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-500 to-pink-500 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/academic/turkish/grade2')}
            className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-xl font-bold hover:bg-white/30 transition-all"
          >
            ← Geri
          </button>
          <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl text-white font-black">
            ⭐ {score}
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-black text-orange-600 mb-2">Zıt Anlamlı Kelimeler</h1>
            <p className="text-gray-600">Kelimenin zıt anlamlısını bul</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 mb-6 border-2 border-orange-200">
            <div className="text-center">
              <div className="text-8xl mb-4">{current.emoji}</div>
              <div className="text-5xl font-black text-orange-600 mb-2">{current.word}</div>
              <div className="text-xl text-gray-600">kelimesinin zıt anlamlısı nedir?</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {options.map((option, index) => {
              const isCorrect = option === current.antonym;
              const isSelected = option === selectedAnswer;

              return (
                <button
                  key={index}
                  onClick={() => !showFeedback && handleAnswer(option)}
                  disabled={showFeedback}
                  className={`p-6 rounded-2xl font-bold text-2xl transition-all ${
                    showFeedback
                      ? isCorrect
                        ? 'bg-green-500 text-white scale-105'
                        : isSelected
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-400'
                      : 'bg-white border-2 border-orange-300 text-gray-800 hover:bg-orange-100 hover:scale-105'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div
              className={`p-6 rounded-2xl text-center ${
                selectedAnswer === current.antonym ? 'bg-green-100' : 'bg-orange-100'
              }`}
            >
              <div className="text-6xl mb-4">
                {selectedAnswer === current.antonym ? current.antonymEmoji : '💡'}
              </div>
              <h3
                className={`text-2xl font-bold mb-2 ${
                  selectedAnswer === current.antonym ? 'text-green-700' : 'text-orange-700'
                }`}
              >
                {selectedAnswer === current.antonym ? 'Harika!' : `Doğru Cevap: ${current.antonym}`}
              </h3>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">{current.emoji}</div>
                  <div className="font-bold text-gray-700">{current.word}</div>
                </div>
                <div className="text-3xl">↔️</div>
                <div className="text-center">
                  <div className="text-4xl mb-2">{current.antonymEmoji}</div>
                  <div className="font-bold text-gray-700">{current.antonym}</div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-center gap-2">
            {antonymPairs.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === currentPair ? 'bg-orange-500' : idx < currentPair ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AntonymsGame;

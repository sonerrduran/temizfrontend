/**
 * Büyük-Küçük Harf Eşleştirme - 1. Sınıf
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Check, X } from 'lucide-react';

const LETTER_PAIRS = [
  { upper: 'A', lower: 'a' },
  { upper: 'B', lower: 'b' },
  { upper: 'C', lower: 'c' },
  { upper: 'Ç', lower: 'ç' },
  { upper: 'D', lower: 'd' },
  { upper: 'E', lower: 'e' },
  { upper: 'F', lower: 'f' },
  { upper: 'G', lower: 'g' },
  { upper: 'Ğ', lower: 'ğ' },
  { upper: 'H', lower: 'h' },
  { upper: 'I', lower: 'ı' },
  { upper: 'İ', lower: 'i' },
  { upper: 'J', lower: 'j' },
  { upper: 'K', lower: 'k' },
  { upper: 'L', lower: 'l' },
  { upper: 'M', lower: 'm' },
  { upper: 'N', lower: 'n' },
  { upper: 'O', lower: 'o' },
  { upper: 'Ö', lower: 'ö' },
  { upper: 'P', lower: 'p' },
  { upper: 'R', lower: 'r' },
  { upper: 'S', lower: 's' },
  { upper: 'Ş', lower: 'ş' },
  { upper: 'T', lower: 't' },
  { upper: 'U', lower: 'u' },
  { upper: 'Ü', lower: 'ü' },
  { upper: 'V', lower: 'v' },
  { upper: 'Y', lower: 'y' },
  { upper: 'Z', lower: 'z' },
];

const UppercaseLowercaseGame: React.FC = () => {
  const navigate = useNavigate();
  const [currentPair, setCurrentPair] = useState(LETTER_PAIRS[0]);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  useEffect(() => {
    generateQuestion();
  }, [level]);

  const generateQuestion = () => {
    const randomPair = LETTER_PAIRS[Math.floor(Math.random() * LETTER_PAIRS.length)];
    setCurrentPair(randomPair);

    // Generate wrong options
    const wrongOptions = LETTER_PAIRS.filter((p) => p.lower !== randomPair.lower)
      .map((p) => p.lower)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const allOptions = [randomPair.lower, ...wrongOptions].sort(() => Math.random() - 0.5);

    setOptions(allOptions);
    setFeedback(null);
  };

  const handleAnswer = (selectedLower: string) => {
    if (selectedLower === currentPair.lower) {
      setScore(score + 10);
      setFeedback('correct');
      setTimeout(() => {
        if (level < 15) {
          setLevel(level + 1);
        } else {
          alert(`Tebrikler! Oyunu tamamladın! Toplam Puan: ${score + 10}`);
          navigate('/turkish/grade1');
        }
      }, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <button
        onClick={() => navigate('/turkish/grade1')}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Geri Dön
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Büyük-Küçük Harf</h1>
              <p className="text-gray-600">Seviye {level}/15</p>
            </div>
            <div className="flex items-center gap-2 text-yellow-500">
              <Star className="w-6 h-6 fill-current" />
              <span className="text-2xl font-bold">{score}</span>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <p className="text-center text-gray-700 text-xl mb-8">Bu büyük harfin küçüğünü seç:</p>

          <div className="text-center mb-12">
            <div className="inline-block p-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl shadow-2xl">
              <div className="text-9xl font-bold text-white">{currentPair.upper}</div>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={feedback !== null}
                className={`
                  p-6 text-5xl font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg
                  ${
                    feedback === 'correct' && option === currentPair.lower
                      ? 'bg-green-500 text-white'
                      : feedback === 'wrong' && option === currentPair.lower
                        ? 'bg-red-500 text-white'
                        : 'bg-gradient-to-br from-green-100 to-blue-100 hover:from-green-200 hover:to-blue-200'
                  }
                `}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="mt-8 flex justify-center">
              {feedback === 'correct' ? (
                <div className="flex items-center gap-2 text-green-600 text-2xl font-bold">
                  <Check className="w-8 h-8" />
                  Doğru!
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600 text-2xl font-bold">
                  <X className="w-8 h-8" />
                  Tekrar dene!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UppercaseLowercaseGame;

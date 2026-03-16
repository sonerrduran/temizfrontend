import React, { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const metaphors = [
  {
    sentence: 'Güneş gibi parlıyorsun',
    meaning: 'Çok mutlu ve enerjik görünüyorsun',
    options: ['Üzgün görünüyorsun', 'Çok mutlu ve enerjik görünüyorsun', 'Yorgun görünüyorsun'],
    correct: 1,
  },
  {
    sentence: 'Aslan gibi cesur',
    meaning: 'Çok cesur ve korkusuz',
    options: ['Çok korkak', 'Çok cesur ve korkusuz', 'Çok hızlı'],
    correct: 1,
  },
  {
    sentence: 'Kar gibi beyaz',
    meaning: 'Çok temiz ve bembeyaz',
    options: ['Çok kirli', 'Çok temiz ve bembeyaz', 'Çok siyah'],
    correct: 1,
  },
  {
    sentence: 'Kuş gibi hafif',
    meaning: 'Çok hafif ve uçarcasına',
    options: ['Çok ağır', 'Çok hafif ve uçarcasına', 'Çok yavaş'],
    correct: 1,
  },
];

export default function MetaphorGame() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = metaphors[currentQuestion];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === question.correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < metaphors.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Tebrikler!</h2>
          <div className="text-6xl mb-4">🎉</div>
          <p className="text-2xl text-gray-700 mb-8">
            Skorun: {score} / {metaphors.length}
          </p>
          <button
            onClick={() => navigate('/turkish/grade3')}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Menüye Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-8">
      <button
        onClick={() => navigate('/turkish/grade3')}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        Geri Dön
      </button>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-orange-500" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Benzetmeler</h1>
          </div>

          <div className="mb-8 p-6 bg-orange-50 rounded-xl text-center">
            <p className="text-2xl font-bold text-gray-800 mb-4">"{question.sentence}"</p>
            <p className="text-gray-600">Bu benzetme ne anlama gelir?</p>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-xl text-left text-lg transition-all ${
                  selectedAnswer === null
                    ? 'bg-gray-100 hover:bg-gray-200'
                    : selectedAnswer === index
                      ? index === question.correct
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-red-100 border-2 border-red-500'
                      : index === question.correct
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-gray-100'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-6 text-center text-gray-600">
            Soru {currentQuestion + 1}/{metaphors.length}
          </div>
        </div>
      </div>
    </div>
  );
}

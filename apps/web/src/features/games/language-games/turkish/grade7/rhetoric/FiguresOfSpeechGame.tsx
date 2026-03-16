import React, { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    sentence: 'Yıldızlar gökyüzünde dans ediyordu.',
    figure: 'Kişileştirme',
    explanation: 'Cansız varlıklara (yıldızlar) insana özgü özellikler (dans etmek) verilmiştir.',
    options: ['Kişileştirme', 'Benzetme', 'Abartma', 'Mecaz'],
  },
  {
    sentence: 'Saçları kar gibi beyazdı.',
    figure: 'Benzetme',
    explanation: 'İki şey arasında benzerlik ilişkisi kurulmuştur (saçlar - kar).',
    options: ['Kişileştirme', 'Benzetme', 'Abartma', 'Mecaz'],
  },
  {
    sentence: 'Bin yıl beklesem yine gelmezsin.',
    figure: 'Abartma',
    explanation: 'Gerçek olmayan, abartılı bir ifade kullanılmıştır.',
    options: ['Kişileştirme', 'Benzetme', 'Abartma', 'Mecaz'],
  },
  {
    sentence: 'Gözleri doldu.',
    figure: 'Mecaz',
    explanation: 'Kelime gerçek anlamının dışında kullanılmıştır (ağlamak anlamında).',
    options: ['Kişileştirme', 'Benzetme', 'Abartma', 'Mecaz'],
  },
];

export default function FiguresOfSpeechGame() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    if (answer === question.figure) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      navigate('/turkish/grade7');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 p-8">
      <button
        onClick={() => navigate('/turkish/grade7')}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        Geri Dön
      </button>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-violet-500" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Söz Sanatları</h1>
          </div>

          <div className="mb-8 p-6 bg-violet-50 rounded-xl text-center">
            <p className="text-2xl font-semibold text-gray-800 italic">"{question.sentence}"</p>
          </div>

          <p className="text-xl text-gray-700 mb-6 text-center">
            Bu cümlede hangi söz sanatı kullanılmıştır?
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
                className={`p-6 rounded-xl text-lg font-semibold transition-all ${
                  selectedAnswer === null
                    ? 'bg-gray-100 hover:bg-gray-200'
                    : selectedAnswer === option
                      ? option === question.figure
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-red-100 border-2 border-red-500'
                      : option === question.figure
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-gray-100'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="mb-6 p-6 bg-blue-50 rounded-xl">
              <h4 className="font-semibold text-gray-800 mb-2">Açıklama:</h4>
              <p className="text-gray-700">{question.explanation}</p>
            </div>
          )}

          {showExplanation && (
            <button
              onClick={nextQuestion}
              className="w-full py-3 bg-violet-500 text-white rounded-xl hover:bg-violet-600"
            >
              {currentQuestion < questions.length - 1 ? 'Sonraki Soru' : 'Bitir'}
            </button>
          )}

          <div className="mt-6 text-center text-gray-600">
            Soru {currentQuestion + 1}/{questions.length} - Skor: {score}
          </div>
        </div>
      </div>
    </div>
  );
}

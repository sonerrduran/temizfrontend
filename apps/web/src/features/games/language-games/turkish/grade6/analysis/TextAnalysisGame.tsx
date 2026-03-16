import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const texts = [
  {
    text: 'Güneş doğudan doğar, batıdan batar. Bu doğanın değişmez kuralıdır.',
    questions: [
      {
        question: 'Ana fikir nedir?',
        options: [
          'Güneşin hareketi',
          'Doğanın değişmez kuralları',
          'Doğu ve batı yönleri',
          'Gün ve gece',
        ],
        correct: 1,
      },
      {
        question: 'Metnin türü nedir?',
        options: ['Bilgilendirici', 'Öyküleyici', 'Tartışmacı', 'Betimleyici'],
        correct: 0,
      },
    ],
  },
  {
    text: 'Kitap okumak insanın hayal gücünü geliştirir. Ayrıca kelime dağarcığını zenginleştirir ve farklı dünyaları tanıma fırsatı verir.',
    questions: [
      {
        question: 'Metnin konusu nedir?',
        options: ['Hayal gücü', 'Kitap okumanın faydaları', 'Kelime dağarcığı', 'Farklı dünyalar'],
        correct: 1,
      },
      {
        question: 'Metinde kaç fayda sayılmıştır?',
        options: ['1', '2', '3', '4'],
        correct: 2,
      },
    ],
  },
];

export default function TextAnalysisGame() {
  const navigate = useNavigate();
  const [currentText, setCurrentText] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const text = texts[currentText];
  const question = text.questions[currentQuestion];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === question.correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < text.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else if (currentText < texts.length - 1) {
        setCurrentText(currentText + 1);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  if (showResult) {
    const totalQuestions = texts.reduce((sum, t) => sum + t.questions.length, 0);
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Tebrikler!</h2>
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-2xl text-gray-700 mb-8">
            Skorun: {score} / {totalQuestions}
          </p>
          <button
            onClick={() => navigate('/turkish/grade6')}
            className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            Menüye Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-8">
      <button
        onClick={() => navigate('/turkish/grade6')}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        Geri Dön
      </button>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Search className="text-teal-500" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Metin Analizi</h1>
          </div>

          <div className="mb-8 p-6 bg-teal-50 rounded-xl">
            <p className="text-lg text-gray-800 leading-relaxed">{text.text}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">{question.question}</h3>
            <div className="grid gap-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`p-4 rounded-xl text-left text-lg transition-all ${
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
          </div>

          <div className="mt-6 text-center text-gray-600">
            Metin {currentText + 1}/{texts.length} - Soru {currentQuestion + 1}/
            {text.questions.length}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    word: 'ev',
    question: 'Hangi ek "evde" kelimesini oluşturur?',
    options: ['-de', '-den', '-e', '-i'],
    correct: 0,
    explanation: '"-de" eki bulunma hali ekidir.',
  },
  {
    word: 'kitap',
    question: 'Hangi ek "kitaplar" kelimesini oluşturur?',
    options: ['-lar', '-ler', '-lar/-ler', '-lık'],
    correct: 2,
    explanation: '"-lar/-ler" eki çoğul ekidir.',
  },
  {
    word: 'güzel',
    question: 'Hangi ek "güzellik" kelimesini oluşturur?',
    options: ['-lık', '-lik', '-luk', '-lük'],
    correct: 1,
    explanation: '"-lik" eki isim yapım ekidir.',
  },
  {
    word: 'oku',
    question: 'Hangi ek "okuyorum" kelimesini oluşturur?',
    options: ['-yor', '-iyor', '-uyor', '-üyor'],
    correct: 2,
    explanation: '"-uyor" eki şimdiki zaman ekidir.',
  },
];

export default function SuffixGame() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === question.correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      navigate('/turkish/grade3');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
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
            <BookOpen className="text-green-500" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Ekler</h1>
          </div>

          <div className="mb-8 text-center">
            <div className="inline-block px-8 py-4 bg-green-100 rounded-xl mb-4">
              <p className="text-4xl font-bold text-green-700">{question.word}</p>
            </div>
            <p className="text-xl text-gray-700">{question.question}</p>
          </div>

          <div className="space-y-3 mb-6">
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

          {showExplanation && (
            <div className="mb-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-gray-700">{question.explanation}</p>
            </div>
          )}

          {showExplanation && (
            <button
              onClick={nextQuestion}
              className="w-full py-3 bg-green-500 text-white rounded-xl hover:bg-green-600"
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

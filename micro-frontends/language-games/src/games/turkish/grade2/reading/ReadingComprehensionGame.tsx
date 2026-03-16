import { useState } from 'react';
import { ArrowLeft, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stories = [
  {
    id: 1,
    title: 'Yardımsever Kedi',
    text: 'Bir zamanlar küçük bir köyde yaşlı bir kedi vardı. Kedi her gün köyün sokaklarında dolaşır, yavru kedilere yardım ederdi. Bir gün yağmur yağarken, ıslanan bir yavru kediyi buldu ve onu sıcak bir yere götürdü.',
    questions: [
      {
        question: 'Kedi nerede yaşıyordu?',
        options: ['Şehirde', 'Köyde', 'Ormanda', 'Dağda'],
        correct: 1,
      },
      {
        question: 'Kedi kimlere yardım ediyordu?',
        options: ['Köpeklere', 'Kuşlara', 'Yavru kedilere', 'İnsanlara'],
        correct: 2,
      },
    ],
  },
  {
    id: 2,
    title: 'Küçük Fidan',
    text: 'Bahçede küçük bir fidan vardı. Fidan her gün güneşi ve suyu bekliyordu. Çocuklar fidana su verip, onunla konuşuyorlardı. Zamanla fidan büyüdü ve güzel bir ağaç oldu.',
    questions: [
      {
        question: 'Fidan neyi bekliyordu?',
        options: ['Yağmuru', 'Güneş ve suyu', 'Rüzgarı', 'Karı'],
        correct: 1,
      },
      {
        question: 'Fidan zamanla ne oldu?',
        options: ['Kurudu', 'Güzel bir ağaç oldu', 'Taşındı', 'Kayboldu'],
        correct: 1,
      },
    ],
  },
];

export default function ReadingComprehensionGame() {
  const navigate = useNavigate();
  const [currentStory, setCurrentStory] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const story = stories[currentStory];
  const question = story.questions[currentQuestion];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === question.correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < story.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else if (currentStory < stories.length - 1) {
        setCurrentStory(currentStory + 1);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentStory(0);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  if (showResult) {
    const totalQuestions = stories.reduce((sum, s) => sum + s.questions.length, 0);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Tebrikler!</h2>
          <div className="text-6xl mb-4">🎉</div>
          <p className="text-2xl text-gray-700 mb-8">
            Skorun: {score} / {totalQuestions}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Tekrar Oyna
            </button>
            <button
              onClick={() => navigate('/turkish/grade/2')}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Menüye Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <button
        onClick={() => navigate('/turkish/grade/2')}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        Geri Dön
      </button>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-blue-500" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Okuduğunu Anlama</h1>
          </div>

          <div className="mb-8 p-6 bg-blue-50 rounded-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{story.title}</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{story.text}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{question.question}</h3>
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
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selectedAnswer !== null && index === question.correct && (
                      <CheckCircle className="text-green-500" size={24} />
                    )}
                    {selectedAnswer === index && index !== question.correct && (
                      <XCircle className="text-red-500" size={24} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center text-gray-600">
            Hikaye {currentStory + 1}/{stories.length} - Soru {currentQuestion + 1}/
            {story.questions.length}
          </div>
        </div>
      </div>
    </div>
  );
}

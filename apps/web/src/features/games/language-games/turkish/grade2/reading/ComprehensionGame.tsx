import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const stories = [
  {
    id: 1,
    title: 'Ayşe ve Kedisi',
    text: 'Ayşe\'nin çok sevdiği bir kedisi vardı. Kedinin adı Pamuk\'tu. Pamuk beyaz ve çok tüylüydü. Her sabah Ayşe\'nin yatağında uyurdu. Ayşe okula giderken Pamuk ona veda ederdi.',
    questions: [
      {
        question: 'Ayşe\'nin kedisinin adı neydi?',
        options: ['Pamuk', 'Minnoş', 'Tekir', 'Boncuk'],
        correct: 0,
      },
      {
        question: 'Pamuk ne renkteydi?',
        options: ['Siyah', 'Sarı', 'Beyaz', 'Kahverengi'],
        correct: 2,
      },
      {
        question: 'Pamuk sabahları nerede uyurdu?',
        options: ['Bahçede', 'Ayşe\'nin yatağında', 'Mutfakta', 'Balkonda'],
        correct: 1,
      },
    ],
  },
  {
    id: 2,
    title: 'Piknik Günü',
    text: 'Cumartesi günü hava çok güzeldi. Aile pikniğe gitmeye karar verdi. Anne sandviçler hazırladı. Baba meyve suyu aldı. Çocuklar top ve oyuncaklarını aldılar. Parkta çok eğlendiler.',
    questions: [
      {
        question: 'Aile hangi gün pikniğe gitti?',
        options: ['Pazar', 'Cumartesi', 'Cuma', 'Pazartesi'],
        correct: 1,
      },
      {
        question: 'Anne ne hazırladı?',
        options: ['Pasta', 'Sandviç', 'Börek', 'Salata'],
        correct: 1,
      },
      {
        question: 'Çocuklar ne aldılar?',
        options: ['Kitap', 'Kalem', 'Top ve oyuncak', 'Defter'],
        correct: 2,
      },
    ],
  },
];

const ComprehensionGame: React.FC = () => {
  const navigate = useNavigate();
  const [currentStory, setCurrentStory] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showStory, setShowStory] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const story = stories[currentStory];
  const question = story.questions[currentQuestion];

  const handleReadComplete = () => {
    setShowStory(false);
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);

    if (index === question.correct) {
      setScore(score + 10);
    }

    setTimeout(() => {
      if (currentQuestion < story.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else if (currentStory < stories.length - 1) {
        setCurrentStory(currentStory + 1);
        setCurrentQuestion(0);
        setShowStory(true);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        navigate('/academic/turkish/grade2');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500 p-4 md:p-8">
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
            <h1 className="text-3xl font-black text-purple-600 mb-2">Okuduğunu Anlama</h1>
            <p className="text-gray-600">Metni oku ve soruları cevapla</p>
          </div>

          {showStory ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                <h2 className="text-2xl font-bold text-purple-700 mb-4">{story.title}</h2>
                <p className="text-xl leading-relaxed text-gray-800">{story.text}</p>
              </div>
              <button
                onClick={handleReadComplete}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-xl hover:scale-105 transition-all"
              >
                ✓ Okudum, Sorulara Geç
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-purple-50 rounded-2xl p-6">
                <div className="text-sm text-purple-600 font-semibold mb-2">
                  Soru {currentQuestion + 1}/{story.questions.length}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h3>

                <div className="grid grid-cols-1 gap-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => !showFeedback && handleAnswer(index)}
                      disabled={showFeedback}
                      className={`p-4 rounded-xl text-left font-semibold text-lg transition-all ${
                        showFeedback
                          ? index === question.correct
                            ? 'bg-green-500 text-white scale-105'
                            : index === selectedAnswer
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-200 text-gray-400'
                          : 'bg-white hover:bg-purple-100 hover:scale-105 border-2 border-purple-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {showFeedback && (
                <div
                  className={`p-4 rounded-2xl text-center font-bold text-xl ${
                    selectedAnswer === question.correct
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {selectedAnswer === question.correct ? '🎉 Doğru!' : '❌ Yanlış!'}
                </div>
              )}
            </div>
          )}

          <div className="mt-6 flex justify-center gap-2">
            {stories.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === currentStory ? 'bg-purple-500' : idx < currentStory ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensionGame;

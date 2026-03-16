import React, { useState, useEffect } from 'react';

interface StoryComprehensionGameProps {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const stories = [
  {
    title: 'Küçük Kedi',
    text: 'Bahçede küçük bir kedi vardı. Kedi çok açtı. Anne ona süt verdi. Kedi mutlu oldu.',
    questions: [
      { q: 'Kedi neredeydi?', options: ['Bahçede', 'Evde', 'Okulda'], answer: 0 },
      { q: 'Kedi ne istedi?', options: ['Su', 'Süt', 'Yemek'], answer: 1 },
      { q: 'Kedi nasıl oldu?', options: ['Üzgün', 'Mutlu', 'Kızgın'], answer: 1 },
    ],
  },
  {
    title: 'Okula Gidiş',
    text: 'Ali sabah erken kalktı. Çantasını hazırladı. Okula yürüyerek gitti. Arkadaşlarını gördü.',
    questions: [
      { q: 'Ali ne zaman kalktı?', options: ['Sabah', 'Öğlen', 'Akşam'], answer: 0 },
      { q: 'Ali ne hazırladı?', options: ['Yemek', 'Çanta', 'Oyuncak'], answer: 1 },
      { q: 'Ali okula nasıl gitti?', options: ['Yürüyerek', 'Koşarak', 'Arabayla'], answer: 0 },
    ],
  },
  {
    title: 'Parkta Oyun',
    text: 'Ayşe parkta oyun oynadı. Salıncakta sallandı. Kaydıraktan kaydı. Çok eğlendi.',
    questions: [
      { q: 'Ayşe nerede oynadı?', options: ['Evde', 'Parkta', 'Okulda'], answer: 1 },
      {
        q: 'Ayşe nerede sallandı?',
        options: ['Salıncakta', 'Kaydırakta', 'Tahterevallide'],
        answer: 0,
      },
      { q: 'Ayşe nasıl hissetti?', options: ['Üzgün', 'Kızgın', 'Mutlu'], answer: 2 },
    ],
  },
];

const StoryComprehensionGame: React.FC<StoryComprehensionGameProps> = ({ onComplete, onExit }) => {
  const [currentStory, setCurrentStory] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showStory, setShowStory] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showFeedback]);

  const story = stories[currentStory];
  const question = story.questions[currentQuestion];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    if (answerIndex === question.answer) {
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
        setSelectedAnswer(null);
        setShowFeedback(false);
        setShowStory(true);
      } else {
        onComplete(score + (answerIndex === question.answer ? 10 : 0));
      }
    }, 1500);
  };

  if (showStory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500 p-4 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-purple-600 mb-2">{story.title}</h2>
            <p className="text-gray-600 font-semibold">Hikayeyi oku ve sorulara cevap ver!</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8 mb-8 border-4 border-yellow-400">
            <p className="text-2xl leading-relaxed text-gray-800 font-semibold text-center">
              {story.text}
            </p>
          </div>

          <button
            onClick={() => setShowStory(false)}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-lg"
          >
            Sorulara Geç 📝
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-xl font-bold hover:bg-white/30 transition-all"
          >
            ← Çıkış
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

        {/* Progress */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-bold">
              Hikaye {currentStory + 1}/{stories.length}
            </span>
            <span className="text-white font-bold">
              Soru {currentQuestion + 1}/{story.questions.length}
            </span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${((currentStory * 3 + currentQuestion + 1) / (stories.length * 3)) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-black text-purple-600 mb-8 text-center">{question.q}</h3>

          <div className="grid gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && handleAnswer(index)}
                disabled={showFeedback}
                className={`p-6 rounded-2xl font-bold text-xl transition-all ${
                  showFeedback
                    ? index === question.answer
                      ? 'bg-green-500 text-white scale-105'
                      : index === selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 active:scale-95'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div
              className={`mt-6 p-4 rounded-2xl text-center font-bold text-lg ${
                selectedAnswer === question.answer
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {selectedAnswer === question.answer
                ? '🎉 Doğru! Aferin!'
                : '❌ Yanlış! Doğru cevap: ' + question.options[question.answer]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryComprehensionGame;

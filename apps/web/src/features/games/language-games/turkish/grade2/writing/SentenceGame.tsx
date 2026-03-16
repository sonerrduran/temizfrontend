import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const exercises = [
  {
    id: 1,
    image: '🐱',
    words: ['kedi', 'süt', 'içiyor'],
    correctSentence: 'Kedi süt içiyor.',
    hint: 'Kedi ne yapıyor?',
  },
  {
    id: 2,
    image: '☀️',
    words: ['güneş', 'parlıyor', 'gökyüzünde'],
    correctSentence: 'Güneş gökyüzünde parlıyor.',
    hint: 'Güneş nerede parlıyor?',
  },
  {
    id: 3,
    image: '📚',
    words: ['çocuk', 'kitap', 'okuyor'],
    correctSentence: 'Çocuk kitap okuyor.',
    hint: 'Çocuk ne yapıyor?',
  },
  {
    id: 4,
    image: '🌸',
    words: ['bahçede', 'çiçekler', 'açıyor'],
    correctSentence: 'Bahçede çiçekler açıyor.',
    hint: 'Çiçekler nerede açıyor?',
  },
  {
    id: 5,
    image: '⚽',
    words: ['çocuklar', 'top', 'oynuyorlar'],
    correctSentence: 'Çocuklar top oynuyorlar.',
    hint: 'Çocuklar ne yapıyorlar?',
  },
];

const SentenceGame: React.FC = () => {
  const navigate = useNavigate();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(
    [...exercises[0].words].sort(() => Math.random() - 0.5)
  );
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const exercise = exercises[currentExercise];

  const handleWordClick = (word: string, fromAvailable: boolean) => {
    if (showFeedback) return;

    if (fromAvailable) {
      setSelectedWords([...selectedWords, word]);
      setAvailableWords(availableWords.filter((w) => w !== word));
    } else {
      setAvailableWords([...availableWords, word]);
      setSelectedWords(selectedWords.filter((w) => w !== word));
    }
  };

  const handleCheck = () => {
    const userSentence = selectedWords.join(' ') + '.';
    const correct = userSentence.toLowerCase() === exercise.correctSentence.toLowerCase();

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 20);
    }

    setTimeout(() => {
      if (currentExercise < exercises.length - 1) {
        const nextExercise = currentExercise + 1;
        setCurrentExercise(nextExercise);
        setSelectedWords([]);
        setAvailableWords([...exercises[nextExercise].words].sort(() => Math.random() - 0.5));
        setShowFeedback(false);
      } else {
        navigate('/academic/turkish/grade2');
      }
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-500 to-teal-500 p-4 md:p-8">
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
            <h1 className="text-3xl font-black text-green-600 mb-2">Cümle Yazma</h1>
            <p className="text-gray-600">Kelimeleri sıraya koyarak cümle oluştur</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border-2 border-green-200">
            <div className="text-8xl text-center mb-4">{exercise.image}</div>
            <p className="text-center text-lg text-gray-600 font-semibold">{exercise.hint}</p>
          </div>

          {/* Selected Words Area */}
          <div className="bg-white rounded-2xl p-6 mb-6 min-h-[100px] border-2 border-dashed border-green-300">
            <div className="text-sm text-gray-500 mb-2">Cümlen:</div>
            <div className="flex flex-wrap gap-2">
              {selectedWords.map((word, index) => (
                <button
                  key={index}
                  onClick={() => handleWordClick(word, false)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all"
                >
                  {word}
                </button>
              ))}
              {selectedWords.length > 0 && (
                <span className="text-2xl text-green-600 font-bold">.</span>
              )}
            </div>
          </div>

          {/* Available Words */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <div className="text-sm text-gray-500 mb-2">Kelimeler:</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {availableWords.map((word, index) => (
                <button
                  key={index}
                  onClick={() => handleWordClick(word, true)}
                  className="px-4 py-2 bg-white border-2 border-green-300 text-gray-800 rounded-lg font-semibold hover:bg-green-100 hover:scale-105 transition-all"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {!showFeedback && selectedWords.length === exercise.words.length && (
            <button
              onClick={handleCheck}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold text-xl hover:scale-105 transition-all"
            >
              ✓ Kontrol Et
            </button>
          )}

          {showFeedback && (
            <div
              className={`p-6 rounded-2xl text-center ${
                isCorrect ? 'bg-green-100' : 'bg-orange-100'
              }`}
            >
              <div className="text-5xl mb-2">{isCorrect ? '🎉' : '💡'}</div>
              <h3 className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-green-700' : 'text-orange-700'}`}>
                {isCorrect ? 'Harika!' : 'Doğru Cümle:'}
              </h3>
              {!isCorrect && (
                <p className="text-xl text-gray-700 font-semibold">{exercise.correctSentence}</p>
              )}
            </div>
          )}

          <div className="mt-6 flex justify-center gap-2">
            {exercises.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === currentExercise ? 'bg-green-500' : idx < currentExercise ? 'bg-emerald-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentenceGame;

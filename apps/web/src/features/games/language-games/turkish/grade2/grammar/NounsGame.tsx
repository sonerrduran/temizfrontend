import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const exercises = [
  {
    id: 1,
    sentence: 'Kedi bahçede oynuyor.',
    words: ['Kedi', 'bahçede', 'oynuyor'],
    nouns: ['Kedi', 'bahçede'],
    hint: 'İsimler varlıkların adlarıdır',
  },
  {
    id: 2,
    sentence: 'Ali okula gidiyor.',
    words: ['Ali', 'okula', 'gidiyor'],
    nouns: ['Ali', 'okula'],
    hint: 'Kişi ve yer isimleri',
  },
  {
    id: 3,
    sentence: 'Çocuklar parkta top oynuyorlar.',
    words: ['Çocuklar', 'parkta', 'top', 'oynuyorlar'],
    nouns: ['Çocuklar', 'parkta', 'top'],
    hint: 'Birden fazla isim olabilir',
  },
  {
    id: 4,
    sentence: 'Anne mutfakta yemek pişiriyor.',
    words: ['Anne', 'mutfakta', 'yemek', 'pişiriyor'],
    nouns: ['Anne', 'mutfakta', 'yemek'],
    hint: 'Kişi, yer ve nesne isimleri',
  },
  {
    id: 5,
    sentence: 'Kuş ağaçta şarkı söylüyor.',
    words: ['Kuş', 'ağaçta', 'şarkı', 'söylüyor'],
    nouns: ['Kuş', 'ağaçta', 'şarkı'],
    hint: 'Canlı ve yer isimleri',
  },
];

const NounsGame: React.FC = () => {
  const navigate = useNavigate();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const exercise = exercises[currentExercise];

  const handleWordClick = (word: string) => {
    if (showFeedback) return;

    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleCheck = () => {
    const correctNouns = exercise.nouns.sort();
    const userNouns = selectedWords.sort();
    const isCorrect = JSON.stringify(correctNouns) === JSON.stringify(userNouns);

    setShowFeedback(true);

    if (isCorrect) {
      setScore(score + 20);
    }

    setTimeout(() => {
      if (currentExercise < exercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
        setSelectedWords([]);
        setShowFeedback(false);
        setShowHint(false);
      } else {
        navigate('/academic/turkish/grade2');
      }
    }, 2500);
  };

  const isCorrect = () => {
    const correctNouns = exercise.nouns.sort();
    const userNouns = selectedWords.sort();
    return JSON.stringify(correctNouns) === JSON.stringify(userNouns);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-violet-500 to-indigo-500 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/academic/turkish/grade2')}
            className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-xl font-bold hover:bg-white/30 transition-all"
          >
            ← Geri
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-6 py-3 bg-yellow-500/80 backdrop-blur-md text-white rounded-xl font-bold hover:bg-yellow-600/80 transition-all"
            >
              💡 İpucu
            </button>
            <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl text-white font-black">
              ⭐ {score}
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-black text-purple-600 mb-2">İsim Bulma</h1>
            <p className="text-gray-600">Cümledeki isimleri bul</p>
          </div>

          {showHint && (
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💡</span>
                <p className="text-yellow-800 font-semibold">{exercise.hint}</p>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 mb-6 border-2 border-purple-200">
            <p className="text-2xl text-center text-gray-800 font-semibold leading-relaxed">
              {exercise.sentence}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-6">
            <div className="text-sm text-gray-500 mb-4">Kelimelere tıklayarak isimleri seç:</div>
            <div className="flex flex-wrap gap-3 justify-center">
              {exercise.words.map((word, index) => {
                const isSelected = selectedWords.includes(word);
                const isNoun = exercise.nouns.includes(word);

                return (
                  <button
                    key={index}
                    onClick={() => handleWordClick(word)}
                    disabled={showFeedback}
                    className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
                      showFeedback
                        ? isNoun
                          ? 'bg-green-500 text-white scale-105'
                          : isSelected
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 text-gray-400'
                        : isSelected
                          ? 'bg-purple-500 text-white scale-105'
                          : 'bg-white border-2 border-purple-300 text-gray-800 hover:bg-purple-100 hover:scale-105'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          </div>

          {!showFeedback && selectedWords.length > 0 && (
            <button
              onClick={handleCheck}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-xl font-bold text-xl hover:scale-105 transition-all"
            >
              ✓ Kontrol Et
            </button>
          )}

          {showFeedback && (
            <div
              className={`p-6 rounded-2xl text-center ${
                isCorrect() ? 'bg-green-100' : 'bg-orange-100'
              }`}
            >
              <div className="text-5xl mb-2">{isCorrect() ? '🎉' : '💡'}</div>
              <h3 className={`text-2xl font-bold mb-2 ${isCorrect() ? 'text-green-700' : 'text-orange-700'}`}>
                {isCorrect() ? 'Harika! Tüm isimleri buldun!' : 'Doğru İsimler:'}
              </h3>
              {!isCorrect() && (
                <p className="text-xl text-gray-700 font-semibold">{exercise.nouns.join(', ')}</p>
              )}
            </div>
          )}

          <div className="mt-6 flex justify-center gap-2">
            {exercises.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === currentExercise ? 'bg-purple-500' : idx < currentExercise ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NounsGame;

import { useState } from 'react';
import { ArrowLeft, Shuffle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const sentences = [
  {
    correct: 'Kedi bahçede oynuyor',
    words: ['bahçede', 'Kedi', 'oynuyor'],
    image: '🐱',
  },
  {
    correct: 'Çocuklar parkta koşuyor',
    words: ['parkta', 'Çocuklar', 'koşuyor'],
    image: '👦',
  },
  {
    correct: 'Kuş ağaçta şarkı söylüyor',
    words: ['şarkı', 'Kuş', 'ağaçta', 'söylüyor'],
    image: '🐦',
  },
  {
    correct: 'Anne mutfakta yemek yapıyor',
    words: ['mutfakta', 'Anne', 'yemek', 'yapıyor'],
    image: '👩‍🍳',
  },
];

export default function SentenceBuilderGame() {
  const navigate = useNavigate();
  const [currentSentence, setCurrentSentence] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState(sentences[0].words);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const sentence = sentences[currentSentence];

  const handleWordClick = (word: string) => {
    setSelectedWords([...selectedWords, word]);
    setAvailableWords(availableWords.filter((w) => w !== word));
  };

  const handleRemoveWord = (index: number) => {
    const word = selectedWords[index];
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
    setAvailableWords([...availableWords, word]);
  };

  const checkAnswer = () => {
    const userSentence = selectedWords.join(' ');
    const correct = userSentence === sentence.correct;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
      setTimeout(() => {
        if (currentSentence < sentences.length - 1) {
          setCurrentSentence(currentSentence + 1);
          setSelectedWords([]);
          setAvailableWords(sentences[currentSentence + 1].words);
          setIsCorrect(null);
        }
      }, 2000);
    }
  };

  const shuffleWords = () => {
    setAvailableWords([...availableWords].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <button
        onClick={() => navigate('/turkish/grade/2')}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        Geri Dön
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Cümle Kurma Oyunu</h1>

          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{sentence.image}</div>
            <p className="text-gray-600">
              Soru {currentSentence + 1}/{sentences.length}
            </p>
            <p className="text-lg font-semibold text-purple-600 mt-2">Skor: {score}</p>
          </div>

          <div className="mb-8 p-6 bg-purple-50 rounded-xl min-h-[100px]">
            <h3 className="text-sm text-gray-600 mb-3">Cümlen:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedWords.map((word, index) => (
                <button
                  key={index}
                  onClick={() => handleRemoveWord(index)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm text-gray-600">Kelimeler:</h3>
              <button
                onClick={shuffleWords}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
              >
                <Shuffle size={16} />
                Karıştır
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableWords.map((word, index) => (
                <button
                  key={index}
                  onClick={() => handleWordClick(word)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={checkAnswer}
            disabled={selectedWords.length === 0}
            className="w-full py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Kontrol Et
          </button>

          {isCorrect !== null && (
            <div
              className={`mt-4 p-4 rounded-xl text-center ${
                isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {isCorrect ? (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle size={24} />
                  <span className="font-semibold">Harika! Doğru cümle kurdun!</span>
                </div>
              ) : (
                <span className="font-semibold">
                  Tekrar dene! Doğru cümle: "{sentence.correct}"
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

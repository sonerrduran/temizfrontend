import { useState, useEffect } from 'react';

interface SyllableCountGameProps {
  onBack: () => void;
}

const SyllableCountGame = ({ onBack }: SyllableCountGameProps) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState({ word: '', syllables: 0 });
  const [options, setOptions] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const words = [
    { word: 'ev', syllables: 1 },
    { word: 'at', syllables: 1 },
    { word: 'el', syllables: 1 },
    { word: 'anne', syllables: 2 },
    { word: 'baba', syllables: 2 },
    { word: 'masa', syllables: 2 },
    { word: 'kedi', syllables: 2 },
    { word: 'köpek', syllables: 2 },
    { word: 'elma', syllables: 2 },
    { word: 'armut', syllables: 2 },
    { word: 'kalem', syllables: 2 },
    { word: 'kitap', syllables: 2 },
    { word: 'okul', syllables: 2 },
    { word: 'araba', syllables: 3 },
    { word: 'uçak', syllables: 2 },
    { word: 'bisiklet', syllables: 3 },
    { word: 'çikolata', syllables: 4 },
    { word: 'kelebek', syllables: 3 },
    { word: 'karınca', syllables: 3 },
    { word: 'ayakkabı', syllables: 4 },
  ];

  useEffect(() => {
    generateQuestion();
  }, [level]);

  const generateQuestion = () => {
    const word = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(word);

    const correctAnswer = word.syllables;
    const wrongOptions = [correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].filter(
      (n) => n > 0 && n <= 5
    );

    const allOptions = [correctAnswer, ...wrongOptions.slice(0, 2)].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const correct = answer === currentWord.syllables;
    if (correct) {
      const points = 10 + level * 5;
      setScore(score + points);
    }

    setTimeout(() => {
      if (level < 5) {
        setLevel(level + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        alert(`Oyun Bitti! Skorun: ${score + (correct ? 10 + level * 5 : 0)}`);
        onBack();
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold hover:scale-105 transition-all"
          >
            ← Geri
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-slate-700/50 backdrop-blur-xl rounded-xl border border-white/10">
              <span className="text-white font-bold">Seviye: {level}/5</span>
            </div>
            <div className="px-6 py-3 bg-slate-700/50 backdrop-blur-xl rounded-xl border border-white/10">
              <span className="text-white font-bold">⭐ {score}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black text-white text-center mb-8">
          Hece Sayma 📝
        </h1>

        {/* Game Content */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8">
          <div className="bg-cyan-500/20 border border-cyan-500/30 rounded-2xl p-8 mb-8">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-white mb-8">Bu kelime kaç heceli?</p>
              <div className="text-6xl md:text-8xl font-black text-white mb-8">{currentWord.word}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={showFeedback}
                className={`text-white text-xl font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  showFeedback && option === currentWord.syllables
                    ? 'bg-green-600'
                    : showFeedback && option === selectedAnswer
                    ? 'bg-red-600'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 hover:scale-105'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div
              className={`mt-8 p-6 rounded-2xl text-center font-bold text-2xl ${
                selectedAnswer === currentWord.syllables
                  ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                  : 'bg-red-500/20 border border-red-500/30 text-red-300'
              }`}
            >
              {selectedAnswer === currentWord.syllables
                ? '🎉 Harika! Doğru!'
                : `❌ Yanlış! "${currentWord.word}" ${currentWord.syllables} hecelidir.`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyllableCountGame;

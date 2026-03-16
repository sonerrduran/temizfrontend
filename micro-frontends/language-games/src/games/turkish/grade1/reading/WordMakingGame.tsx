import React, { useState, useEffect } from 'react';

interface WordMakingGameProps {
  onBack: () => void;
}

const WordMakingGame: React.FC<WordMakingGameProps> = ({ onBack }) => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [targetWord, setTargetWord] = useState('');
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);
  const [userWord, setUserWord] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(150);

  const words = [
    'ANNE',
    'BABA',
    'KEDI',
    'KÖPEK',
    'ELMA',
    'ARMUT',
    'OKUL',
    'KALEM',
    'KİTAP',
    'MASA',
    'ARABA',
    'UÇAK',
  ];

  useEffect(() => {
    generateQuestion();
  }, [round]);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showFeedback]);

  const generateQuestion = () => {
    const word = words[Math.floor(Math.random() * words.length)];
    setTargetWord(word);

    const letters = word.split('');
    const scrambled = [...letters].sort(() => Math.random() - 0.5);
    setScrambledLetters(scrambled);
    setUserWord([]);
  };

  const handleLetterClick = (letter: string, index: number) => {
    if (showFeedback) return;
    setUserWord([...userWord, letter]);
    setScrambledLetters(scrambledLetters.filter((_, i) => i !== index));
  };

  const handleRemoveLetter = (index: number) => {
    if (showFeedback) return;
    const letter = userWord[index];
    setScrambledLetters([...scrambledLetters, letter]);
    setUserWord(userWord.filter((_, i) => i !== index));
  };

  const handleCheck = () => {
    if (userWord.length !== targetWord.length) return;

    setShowFeedback(true);
    const correct = userWord.join('') === targetWord;
    if (correct) setScore(score + 15);

    setTimeout(() => {
      if (round < 10) {
        setRound(round + 1);
        setShowFeedback(false);
      } else {
        alert(`Oyun Bitti! Skorun: ${score + (correct ? 15 : 0)}`);
        onBack();
      }
    }, 2000);
  };

  const isCorrect = userWord.join('') === targetWord;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-violet-500 to-indigo-500 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-xl font-bold"
          >
            ← Geri
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

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-black text-purple-600 mb-8 text-center">Kelime Yapma 🔤</h3>

          <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-8 mb-8 border-4 border-pink-400">
            <p className="text-xl font-bold text-center text-gray-700 mb-6">
              Harfleri sırala ve kelimeyi oluştur!
            </p>

            <div className="flex justify-center gap-3 mb-6 min-h-[80px] items-center flex-wrap">
              {userWord.length > 0 ? (
                userWord.map((letter, index) => (
                  <button
                    key={index}
                    onClick={() => handleRemoveLetter(index)}
                    className="w-16 h-16 bg-white rounded-xl font-black text-3xl text-purple-600 shadow-lg hover:scale-110 transition-all"
                  >
                    {letter}
                  </button>
                ))
              ) : (
                <p className="text-gray-400 text-lg">Harflere tıklayarak kelimeyi oluştur...</p>
              )}
            </div>

            <div className="flex justify-center gap-3 flex-wrap">
              {scrambledLetters.map((letter, index) => (
                <button
                  key={index}
                  onClick={() => handleLetterClick(letter, index)}
                  disabled={showFeedback}
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-black text-3xl shadow-lg hover:scale-110 transition-all disabled:opacity-50"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {userWord.length === targetWord.length && !showFeedback && (
            <button
              onClick={handleCheck}
              className="w-full p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-black text-2xl hover:scale-105 transition-all"
            >
              KONTROL ET ✓
            </button>
          )}

          {showFeedback && (
            <div
              className={`mt-6 p-4 rounded-2xl text-center font-bold text-xl ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            >
              {isCorrect ? '🎉 Mükemmel! Doğru kelime!' : `❌ Yanlış! Doğru kelime: ${targetWord}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordMakingGame;

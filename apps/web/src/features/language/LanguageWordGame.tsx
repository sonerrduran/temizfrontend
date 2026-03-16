import React, { useState, useEffect } from 'react';

interface LanguageWordGameProps {
  onExit: () => void;
}

const WORD_CATEGORIES = [
  {
    name: 'Eş Anlamlı Eşleştirme',
    type: 'synonym-match',
    pairs: [
      { word: 'güzel', match: 'hoş' },
      { word: 'hızlı', match: 'süratli' },
      { word: 'akıl', match: 'zeka' },
      { word: 'cevap', match: 'yanıt' },
      { word: 'görev', match: 'vazife' },
      { word: 'kalp', match: 'yürek' },
    ],
  },
  {
    name: 'Zıt Anlamlı Eşleştirme',
    type: 'antonym-match',
    pairs: [
      { word: 'büyük', match: 'küçük' },
      { word: 'sıcak', match: 'soğuk' },
      { word: 'hızlı', match: 'yavaş' },
      { word: 'iyi', match: 'kötü' },
      { word: 'doğru', match: 'yanlış' },
      { word: 'erken', match: 'geç' },
    ],
  },
  {
    name: 'Deyim Anlamı',
    type: 'idiom-meaning',
    pairs: [
      { word: 'kulağına küpe olmak', match: 'öğüt almak' },
      { word: 'gözden düşmek', match: 'değer kaybetmek' },
      { word: 'etekleri zil çalmak', match: 'çok sevinmek' },
      { word: 'taş kalpli', match: 'acımasız' },
      { word: 'dil dökmek', match: 'iltifat etmek' },
      { word: 'içi yanmak', match: 'üzülmek' },
    ],
  },
];

const LanguageWordGame: React.FC<LanguageWordGameProps> = ({ onExit }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [gameWords, setGameWords] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (selectedCategory !== null) {
      const category = WORD_CATEGORIES[selectedCategory];
      const words: string[] = [];
      category.pairs.forEach((pair) => {
        words.push(pair.word, pair.match);
      });
      // Shuffle words
      setGameWords(words.sort(() => Math.random() - 0.5));
    }
  }, [selectedCategory]);

  const handleWordClick = (word: string) => {
    if (matchedPairs.has(word)) return;

    if (!selectedWord) {
      setSelectedWord(word);
    } else {
      if (selectedWord === word) {
        setSelectedWord(null);
        return;
      }

      setAttempts((prev) => prev + 1);
      const category = WORD_CATEGORIES[selectedCategory!];
      const isMatch = category.pairs.some(
        (pair) =>
          (pair.word === selectedWord && pair.match === word) ||
          (pair.match === selectedWord && pair.word === word)
      );

      if (isMatch) {
        setMatchedPairs((prev) => new Set([...prev, selectedWord, word]));
        setScore((prev) => prev + 10);
        setSelectedWord(null);

        if (matchedPairs.size + 2 === gameWords.length) {
          setTimeout(() => setShowResult(true), 500);
        }
      } else {
        setTimeout(() => setSelectedWord(null), 800);
      }
    }
  };

  const resetGame = () => {
    setSelectedCategory(null);
    setGameWords([]);
    setSelectedWord(null);
    setMatchedPairs(new Set());
    setScore(0);
    setAttempts(0);
    setShowResult(false);
  };

  if (showResult) {
    const accuracy = attempts > 0 ? Math.round((matchedPairs.size / 2 / attempts) * 100) : 0;
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-black text-white mb-4">Tebrikler!</h2>
          <div className="space-y-3 mb-6">
            <p className="text-white/90 text-lg">
              Puan: <span className="font-black text-yellow-400">{score}</span>
            </p>
            <p className="text-white/90 text-lg">
              Doğruluk: <span className="font-black text-green-400">{accuracy}%</span>
            </p>
            <p className="text-white/90">Toplam Deneme: {attempts}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={resetGame}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition-all"
            >
              🔄 Yeni Oyun
            </button>
            <button
              onClick={onExit}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold transition-all"
            >
              ⬅ Geri Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedCategory === null) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <button
            onClick={onExit}
            className="mb-6 px-6 py-2 bg-white/10 text-white rounded-full font-bold border border-white/20 hover:bg-white/20 transition-all"
          >
            ⬅ Geri Dön
          </button>

          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">🎮 Kelime Oyunları</h1>
            <p className="text-white/80 text-lg">Eşleştirme yaparak kelime dağarcığını geliştir!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WORD_CATEGORIES.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(index)}
                className="bg-white/10 backdrop-blur-xl hover:bg-white/20 p-8 rounded-2xl border border-white/20 transition-all hover:scale-105 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {category.type === 'synonym-match'
                    ? '🔄'
                    : category.type === 'antonym-match'
                      ? '⚖️'
                      : '💬'}
                </div>
                <h3 className="text-xl font-black text-white mb-2">{category.name}</h3>
                <p className="text-white/70 text-sm">{category.pairs.length} Eşleştirme</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const category = WORD_CATEGORIES[selectedCategory];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-white/10 text-white rounded-full font-bold border border-white/20 hover:bg-white/20 transition-all"
          >
            ⬅ Kategoriler
          </button>
          <div className="bg-white/10 backdrop-blur-xl px-6 py-2 rounded-full border border-white/20">
            <span className="text-white font-bold">Puan: {score}</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-2">{category.name}</h2>
          <p className="text-white/80">Eşleşen kelimeleri bul!</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gameWords.map((word, index) => {
            const isMatched = matchedPairs.has(word);
            const isSelected = selectedWord === word;

            return (
              <button
                key={index}
                onClick={() => handleWordClick(word)}
                disabled={isMatched}
                className={`p-6 rounded-2xl font-bold text-center transition-all ${
                  isMatched
                    ? 'bg-green-500 text-white scale-95 opacity-50'
                    : isSelected
                      ? 'bg-yellow-400 text-slate-900 scale-105 shadow-xl'
                      : 'bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 hover:scale-105'
                } border border-white/20`}
              >
                {word}
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/70">
            Eşleşen: {matchedPairs.size / 2} / {category.pairs.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageWordGame;

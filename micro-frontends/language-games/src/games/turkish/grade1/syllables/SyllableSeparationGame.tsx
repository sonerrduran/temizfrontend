/**
 * Hece Ayırma Oyunu - 1. Sınıf
 * Kelimeleri hecelere ayırma
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Check, X } from 'lucide-react';

const WORDS = [
  { word: 'elma', syllables: ['el', 'ma'], count: 2 },
  { word: 'araba', syllables: ['a', 'ra', 'ba'], count: 3 },
  { word: 'masa', syllables: ['ma', 'sa'], count: 2 },
  { word: 'kalem', syllables: ['ka', 'lem'], count: 2 },
  { word: 'kitap', syllables: ['ki', 'tap'], count: 2 },
  { word: 'okul', syllables: ['o', 'kul'], count: 2 },
  { word: 'çanta', syllables: ['çan', 'ta'], count: 2 },
  { word: 'pencere', syllables: ['pen', 'ce', 're'], count: 3 },
  { word: 'kapı', syllables: ['ka', 'pı'], count: 2 },
  { word: 'sandalye', syllables: ['san', 'dal', 'ye'], count: 3 },
  { word: 'bilgisayar', syllables: ['bil', 'gi', 'sa', 'yar'], count: 4 },
  { word: 'telefon', syllables: ['te', 'le', 'fon'], count: 3 },
  { word: 'oyuncak', syllables: ['o', 'yun', 'cak'], count: 3 },
  { word: 'defter', syllables: ['def', 'ter'], count: 2 },
  { word: 'silgi', syllables: ['sil', 'gi'], count: 2 },
];

const SyllableSeparationGame: React.FC = () => {
  const navigate = useNavigate();
  const [currentWord, setCurrentWord] = useState(WORDS[0]);
  const [userSyllables, setUserSyllables] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  useEffect(() => {
    generateQuestion();
  }, [level]);

  const generateQuestion = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWord(randomWord);
    setUserSyllables([]);
    setCurrentInput('');
    setFeedback(null);
  };

  const addSyllable = () => {
    if (currentInput.trim()) {
      setUserSyllables([...userSyllables, currentInput.trim()]);
      setCurrentInput('');
    }
  };

  const removeSyllable = (index: number) => {
    setUserSyllables(userSyllables.filter((_, i) => i !== index));
  };

  const checkAnswer = () => {
    const isCorrect =
      userSyllables.length === currentWord.syllables.length &&
      userSyllables.every((syl, i) => syl.toLowerCase() === currentWord.syllables[i].toLowerCase());

    if (isCorrect) {
      setScore(score + 15);
      setFeedback('correct');
      setTimeout(() => {
        if (level < 10) {
          setLevel(level + 1);
        } else {
          alert(`Tebrikler! Oyunu tamamladın! Toplam Puan: ${score + 15}`);
          navigate('/turkish/grade1');
        }
      }, 2000);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <button
        onClick={() => navigate('/turkish/grade1')}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Geri Dön
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Hece Ayırma</h1>
              <p className="text-gray-600">Seviye {level}/10</p>
            </div>
            <div className="flex items-center gap-2 text-yellow-500">
              <Star className="w-6 h-6 fill-current" />
              <span className="text-2xl font-bold">{score}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <p className="text-center text-gray-700 text-xl mb-6">Bu kelimeyi hecelere ayır:</p>

          <div className="text-center mb-8">
            <div className="inline-block px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
              <div className="text-6xl font-bold text-white">{currentWord.word}</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSyllable()}
                placeholder="Hece yaz..."
                className="flex-1 px-4 py-3 text-xl border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={addSyllable}
                className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-bold"
              >
                Ekle
              </button>
            </div>

            <div className="flex flex-wrap gap-3 min-h-[60px] p-4 bg-purple-50 rounded-lg">
              {userSyllables.map((syllable, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow"
                >
                  <span className="text-xl font-bold text-purple-600">{syllable}</span>
                  <button
                    onClick={() => removeSyllable(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={checkAnswer}
            disabled={userSyllables.length === 0 || feedback !== null}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Kontrol Et
          </button>

          {feedback && (
            <div className="mt-6 text-center">
              {feedback === 'correct' ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 text-green-600 text-2xl font-bold">
                    <Check className="w-8 h-8" />
                    Doğru!
                  </div>
                  <div className="text-gray-600">
                    Doğru cevap: {currentWord.syllables.join(' - ')}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 text-red-600 text-2xl font-bold">
                    <X className="w-8 h-8" />
                    Tekrar dene!
                  </div>
                  <div className="text-gray-600">İpucu: {currentWord.count} hece var</div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 bg-purple-50 rounded-xl p-6">
          <h3 className="font-bold text-gray-800 mb-2">Nasıl Oynanır?</h3>
          <ul className="text-gray-700 space-y-1">
            <li>• Kelimeyi hecelere ayır</li>
            <li>• Her heceyi sırayla yaz ve "Ekle" butonuna bas</li>
            <li>• Yanlış hece eklediysen X ile silebilirsin</li>
            <li>• "Kontrol Et" ile cevabını kontrol et</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SyllableSeparationGame;

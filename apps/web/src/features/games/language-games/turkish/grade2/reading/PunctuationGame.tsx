/**
 * Noktalama İşaretleri Oyunu - 2. Sınıf
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Check, X } from 'lucide-react';

const SENTENCES = [
  {
    text: 'Bugün hava çok güzel',
    correct: 'Bugün hava çok güzel.',
    punctuation: '.',
    explanation: 'Cümle nokta ile biter.',
  },
  {
    text: 'Sen okula gidiyor musun',
    correct: 'Sen okula gidiyor musun?',
    punctuation: '?',
    explanation: 'Soru cümleleri soru işareti ile biter.',
  },
  {
    text: 'Ne kadar güzel bir gün',
    correct: 'Ne kadar güzel bir gün!',
    punctuation: '!',
    explanation: 'Ünlem cümleleri ünlem işareti ile biter.',
  },
  {
    text: 'Ali Ayşe ve Mehmet okula gitti',
    correct: 'Ali, Ayşe ve Mehmet okula gitti.',
    punctuation: ',',
    explanation: 'Sıralı kelimeler virgül ile ayrılır.',
  },
  {
    text: 'Annem dedi ki Ödevini yap',
    correct: 'Annem dedi ki: "Ödevini yap."',
    punctuation: ': "',
    explanation: 'Konuşmalar iki nokta ve tırnak işareti ile gösterilir.',
  },
];

const PunctuationGame: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentSentence = SENTENCES[currentIndex];

  const checkAnswer = () => {
    if (userAnswer.trim() === currentSentence.correct) {
      setScore(score + 20);
      setFeedback('correct');
      setShowExplanation(true);
    } else {
      setFeedback('wrong');
      setShowExplanation(true);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < SENTENCES.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
      setFeedback(null);
      setShowExplanation(false);
    } else {
      alert(`Oyun bitti! Toplam Puan: ${score}`);
      navigate('/turkish/grade/2');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <button
        onClick={() => navigate('/turkish/grade/2')}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Geri Dön
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Noktalama İşaretleri</h1>
              <p className="text-gray-600">
                Soru {currentIndex + 1}/{SENTENCES.length}
              </p>
            </div>
            <div className="flex items-center gap-2 text-yellow-500">
              <Star className="w-6 h-6 fill-current" />
              <span className="text-2xl font-bold">{score}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <p className="text-gray-700 text-lg mb-6">
            Bu cümleye doğru noktalama işaretlerini ekle:
          </p>

          <div className="mb-6 p-6 bg-indigo-50 rounded-xl">
            <p className="text-2xl text-gray-800 font-medium">{currentSentence.text}</p>
          </div>

          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Cümleyi noktalama işaretleriyle yaz..."
            className="w-full p-4 text-xl border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-500 mb-4"
            rows={3}
            disabled={showExplanation}
          />

          {!showExplanation ? (
            <button
              onClick={checkAnswer}
              className="w-full py-3 bg-indigo-500 text-white text-xl font-bold rounded-lg hover:bg-indigo-600"
            >
              Kontrol Et
            </button>
          ) : (
            <div>
              <div
                className={`mb-4 p-4 rounded-lg ${
                  feedback === 'correct' ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {feedback === 'correct' ? (
                    <>
                      <Check className="w-6 h-6 text-green-600" />
                      <span className="text-green-600 font-bold text-xl">Doğru!</span>
                    </>
                  ) : (
                    <>
                      <X className="w-6 h-6 text-red-600" />
                      <span className="text-red-600 font-bold text-xl">Yanlış!</span>
                    </>
                  )}
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Doğru cevap:</strong> {currentSentence.correct}
                </p>
                <p className="text-gray-600 text-sm">{currentSentence.explanation}</p>
              </div>

              <button
                onClick={nextQuestion}
                className="w-full py-3 bg-indigo-500 text-white text-xl font-bold rounded-lg hover:bg-indigo-600"
              >
                {currentIndex < SENTENCES.length - 1 ? 'Sonraki Soru' : 'Bitir'}
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 bg-indigo-50 rounded-xl p-6">
          <h3 className="font-bold text-gray-800 mb-2">Noktalama İşaretleri</h3>
          <ul className="text-gray-700 space-y-1">
            <li>
              • <strong>Nokta (.)</strong> - Cümle sonu
            </li>
            <li>
              • <strong>Soru işareti (?)</strong> - Soru cümleleri
            </li>
            <li>
              • <strong>Ünlem (!)</strong> - Ünlem cümleleri
            </li>
            <li>
              • <strong>Virgül (,)</strong> - Sıralama, ayırma
            </li>
            <li>
              • <strong>İki nokta (:)</strong> - Açıklama, konuşma
            </li>
            <li>
              • <strong>Tırnak ("")</strong> - Konuşmalar
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PunctuationGame;

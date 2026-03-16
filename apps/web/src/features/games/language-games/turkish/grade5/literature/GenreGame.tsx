import React, { useState } from 'react';
import { ArrowLeft, BookMarked } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const texts = [
  {
    text: 'Bir varmış bir yokmuş, evvel zaman içinde...',
    genre: 'Masal',
    options: ['Masal', 'Şiir', 'Hikaye', 'Tiyatro'],
  },
  {
    text: 'Gökyüzünde yıldızlar parlar\nGece sessizce akar\nRüyalar düşer yollara',
    genre: 'Şiir',
    options: ['Masal', 'Şiir', 'Hikaye', 'Tiyatro'],
  },
  {
    text: 'ALİ: Merhaba, nasılsın?\nAYŞE: İyiyim, teşekkür ederim.',
    genre: 'Tiyatro',
    options: ['Masal', 'Şiir', 'Hikaye', 'Tiyatro'],
  },
  {
    text: 'Ahmet okula giderken yolda bir köpek buldu. Köpek çok açıkmış gibi görünüyordu.',
    genre: 'Hikaye',
    options: ['Masal', 'Şiir', 'Hikaye', 'Tiyatro'],
  },
  {
    text: 'Keloğlan padişahın kızını güldürmek için saraya gitti.',
    genre: 'Masal',
    options: ['Masal', 'Şiir', 'Hikaye', 'Tiyatro'],
  },
];

export default function GenreGame() {
  const navigate = useNavigate();
  const [currentText, setCurrentText] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const text = texts[currentText];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === text.genre) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentText < texts.length - 1) {
        setCurrentText(currentText + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Tebrikler!</h2>
          <div className="text-6xl mb-4">📚</div>
          <p className="text-2xl text-gray-700 mb-8">
            Skorun: {score} / {texts.length}
          </p>
          <button
            onClick={() => navigate('/turkish/grade5')}
            className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            Menüye Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <button
        onClick={() => navigate('/turkish/grade5')}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        Geri Dön
      </button>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <BookMarked className="text-indigo-500" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Edebi Türler</h1>
          </div>

          <div className="mb-8 p-6 bg-indigo-50 rounded-xl">
            <p className="text-lg text-gray-800 whitespace-pre-wrap leading-relaxed">{text.text}</p>
          </div>

          <p className="text-xl text-gray-700 mb-6 text-center">Bu metin hangi türe aittir?</p>

          <div className="grid grid-cols-2 gap-4">
            {text.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
                className={`p-6 rounded-xl text-lg font-semibold transition-all ${
                  selectedAnswer === null
                    ? 'bg-gray-100 hover:bg-gray-200'
                    : selectedAnswer === option
                      ? option === text.genre
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-red-100 border-2 border-red-500'
                      : option === text.genre
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-gray-100'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-6 text-center text-gray-600">
            Metin {currentText + 1}/{texts.length}
          </div>
        </div>
      </div>
    </div>
  );
}

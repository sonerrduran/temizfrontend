import React, { useState, useEffect } from 'react';

interface SimpleGraphGameProps {
  onBack: () => void;
}

const SimpleGraphGame: React.FC<SimpleGraphGameProps> = ({ onBack }) => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [data, setData] = useState({ apples: 0, oranges: 0, bananas: 0 });
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

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
    const apples = Math.floor(Math.random() * 8) + 2;
    const oranges = Math.floor(Math.random() * 8) + 2;
    const bananas = Math.floor(Math.random() * 8) + 2;

    setData({ apples, oranges, bananas });

    const questionType = Math.floor(Math.random() * 3);
    let q = '';
    let answer = 0;

    if (questionType === 0) {
      q = 'Kaç tane elma var?';
      answer = apples;
    } else if (questionType === 1) {
      q = 'Kaç tane portakal var?';
      answer = oranges;
    } else {
      q = 'Toplam kaç meyve var?';
      answer = apples + oranges + bananas;
    }

    setQuestion(q);
    setCorrectAnswer(answer);

    const wrongOptions = [answer + 2, answer - 2, answer + 4].filter((v) => v > 0);
    const allOptions = [answer, ...wrongOptions.slice(0, 2)].sort(() => Math.random() - 0.5);

    setOptions(allOptions);
  };

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const correct = answer === correctAnswer;
    if (correct) setScore(score + 10);

    setTimeout(() => {
      if (round < 10) {
        setRound(round + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        alert(`Oyun Bitti! Skorun: ${score + (correct ? 10 : 0)}`);
        onBack();
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 via-cyan-500 to-blue-500 p-4">
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
          <h3 className="text-3xl font-black text-teal-600 mb-8 text-center">Grafik Okuma 📊</h3>

          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8 mb-8 border-4 border-yellow-400">
            <div className="flex justify-around items-end h-64">
              <div className="flex flex-col items-center">
                <div
                  className="bg-red-500 rounded-t-lg"
                  style={{ width: '60px', height: `${data.apples * 20}px` }}
                ></div>
                <div className="text-4xl mt-2">🍎</div>
                <div className="font-bold">{data.apples}</div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="bg-orange-500 rounded-t-lg"
                  style={{ width: '60px', height: `${data.oranges * 20}px` }}
                ></div>
                <div className="text-4xl mt-2">🍊</div>
                <div className="font-bold">{data.oranges}</div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="bg-yellow-500 rounded-t-lg"
                  style={{ width: '60px', height: `${data.bananas * 20}px` }}
                ></div>
                <div className="text-4xl mt-2">🍌</div>
                <div className="font-bold">{data.bananas}</div>
              </div>
            </div>
          </div>

          <p className="text-2xl font-bold text-center mb-6">{question}</p>

          <div className="grid grid-cols-3 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && handleAnswer(option)}
                disabled={showFeedback}
                className={`p-8 rounded-2xl font-black text-5xl transition-all ${
                  showFeedback
                    ? option === correctAnswer
                      ? 'bg-green-500 text-white scale-105'
                      : option === selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div
              className={`mt-6 p-4 rounded-2xl text-center font-bold text-xl ${selectedAnswer === correctAnswer ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            >
              {selectedAnswer === correctAnswer
                ? '🎉 Doğru!'
                : `❌ Yanlış! Doğru cevap: ${correctAnswer}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleGraphGame;

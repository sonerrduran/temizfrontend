import React, { useState } from 'react';

const QUESTIONS = [
  {
    question: '"Güzel" kelimesinin eş anlamlısı nedir?',
    options: ['Hoş', 'Çirkin', 'Büyük', 'Hızlı'],
    correct: 0,
    explanation: 'Güzel ve hoş kelimeleri eş anlamlıdır.',
    type: 'Eş Anlamlı',
  },
  {
    question: '"Büyük" kelimesinin zıt anlamlısı nedir?',
    options: ['Uzun', 'Küçük', 'Yavaş', 'İyi'],
    correct: 1,
    explanation: 'Büyük ve küçük kelimeleri zıt anlamlıdır.',
    type: 'Zıt Anlamlı',
  },
  {
    question: '"Kulağına küpe olmak" deyiminin anlamı nedir?',
    options: ['Küpe takmak', 'İyi dinlemek', 'Duymamak', 'Konuşmak'],
    correct: 1,
    explanation: 'Bu deyim söyleneni iyi dinlemek ve unutmamak anlamına gelir.',
    type: 'Deyim',
  },
  {
    question: '"Damlaya damlaya göl olur" atasözünün anlamı nedir?',
    options: ['Su içmek', 'Sabırlı olmak', 'Yüzmek', 'Temizlik'],
    correct: 1,
    explanation: 'Bu atasözü küçük birikimlerle büyük sonuçlar elde edilebileceğini anlatır.',
    type: 'Atasözü',
  },
  {
    question: '"Taş kalpli" ifadesinin mecaz anlamı nedir?',
    options: ['Taştan yapılmış', 'Duygusuz', 'Güçlü', 'Sağlam'],
    correct: 1,
    explanation: 'Taş kalpli, duygusuz ve acımasız anlamında kullanılır.',
    type: 'Mecaz',
  },
  {
    question: '"Hızlı" kelimesinin eş anlamlısı nedir?',
    options: ['Yavaş', 'Süratli', 'Büyük', 'Güzel'],
    correct: 1,
    explanation: 'Hızlı ve süratli kelimeleri eş anlamlıdır.',
    type: 'Eş Anlamlı',
  },
  {
    question: '"İyi" kelimesinin zıt anlamlısı nedir?',
    options: ['Güzel', 'Kötü', 'Büyük', 'Hızlı'],
    correct: 1,
    explanation: 'İyi ve kötü kelimeleri zıt anlamlıdır.',
    type: 'Zıt Anlamlı',
  },
  {
    question: '"Gözden düşmek" deyiminin anlamı nedir?',
    options: ['Düşmek', 'Değer kaybetmek', 'Görmek', 'Bakmak'],
    correct: 1,
    explanation: 'Bu deyim saygınlığını yitirmek anlamına gelir.',
    type: 'Deyim',
  },
  {
    question: '"Ne ekersen onu biçersin" atasözünün anlamı nedir?',
    options: ['Tarım yapmak', 'Yaptığının sonucunu görmek', 'Ekmek yemek', 'Çalışmak'],
    correct: 1,
    explanation: 'Bu atasözü yaptığın işin sonucunu göreceğini anlatır.',
    type: 'Atasözü',
  },
  {
    question: '"Dil dökmek" ifadesinin mecaz anlamı nedir?',
    options: ['Konuşmak', 'Güzel konuşmak', 'Susmak', 'Bağırmak'],
    correct: 1,
    explanation: 'Dil dökmek, çok güzel konuşmak ve iltifat etmek anlamında kullanılır.',
    type: 'Mecaz',
  },
];

interface Props {
  onExit: () => void;
}

const LanguageAIQuiz: React.FC<Props> = ({ onExit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = QUESTIONS[currentQuestion];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === question.correct) {
      setScore(score + 10);
    }
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (showResult) {
    const percentage = (score / (QUESTIONS.length * 10)) * 100;
    return (
      <div className="min-h-screen text-white p-4 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 max-w-2xl w-full text-center">
          <div className="text-8xl mb-6">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎉' : '📚'}
          </div>
          <h2 className="text-4xl font-black mb-4">Test Tamamlandı!</h2>
          <div className="text-6xl font-black text-yellow-400 mb-4">
            {score} / {QUESTIONS.length * 10}
          </div>
          <p className="text-2xl mb-8">Başarı: %{percentage.toFixed(0)}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 rounded-xl font-black hover:scale-105 transition-all"
            >
              🔄 TEKRAR DENE
            </button>
            <button
              onClick={onExit}
              className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-xl font-black transition-all"
            >
              ⬅ GERİ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl border border-white/10 transition-all font-bold"
          >
            ⬅ GERİ
          </button>
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-black">🤖 AI KELİME TESTİ</h2>
            <p className="text-sm text-white/60">
              Soru {currentQuestion + 1} / {QUESTIONS.length}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-yellow-400">{score}</div>
            <p className="text-xs text-white/60">PUAN</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 mb-6">
          <div className="text-center mb-6">
            <span className="bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full text-sm font-bold">
              {question.type}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-center mb-8">{question.question}</h3>

          <div className="grid gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => selectedAnswer === null && handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`p-6 rounded-2xl font-bold text-lg transition-all ${
                  selectedAnswer !== null
                    ? index === question.correct
                      ? 'bg-green-500 scale-105'
                      : index === selectedAnswer
                        ? 'bg-red-500'
                        : 'bg-white/5 opacity-50'
                    : 'bg-white/10 hover:bg-white/20 hover:scale-105'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {selectedAnswer !== null && (
          <div
            className={`p-6 rounded-2xl mb-6 ${
              selectedAnswer === question.correct
                ? 'bg-green-500/20 border-2 border-green-500'
                : 'bg-red-500/20 border-2 border-red-500'
            }`}
          >
            <p className="font-bold text-xl mb-2">
              {selectedAnswer === question.correct ? '✅ Doğru!' : '❌ Yanlış!'}
            </p>
            <p className="text-white/90">{question.explanation}</p>
          </div>
        )}

        {selectedAnswer !== null && (
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 py-4 rounded-2xl font-black text-xl hover:scale-105 transition-all"
          >
            {currentQuestion < QUESTIONS.length - 1 ? 'SONRAKİ SORU ➡️' : 'TESTİ BİTİR 🏁'}
          </button>
        )}
      </div>
    </div>
  );
};

export default LanguageAIQuiz;

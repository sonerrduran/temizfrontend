import React, { useState, useEffect } from 'react';
import { fetchPracticeQuestions, PracticeQuestion, preloadQuestions } from '../../../services/practiceQuestionService';

interface TrueFalseGameProps {
  grade: number;
  topic: string;
  onComplete: (score: number) => void;
  onExit: () => void;
}

const TrueFalseGame: React.FC<TrueFalseGameProps> = ({ grade, topic, onComplete, onExit }) => {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(10);
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<PracticeQuestion | null>(null);
  const [isCorrect, setIsCorrect] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
    // Preload other question types in background
    preloadQuestions(grade, topic, ['fill-blank', 'classic', 'test']);
  }, [grade, topic]);

  useEffect(() => {
    if (questions.length > 0 && round <= totalRounds) {
      setCurrentQuestion(questions[round - 1]);
      setFeedback('');
    }
  }, [round, questions]);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const fetchedQuestions = await fetchPracticeQuestions(grade, topic, 'true-false', totalRounds);
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (userAnswer: boolean) => {
    if (!currentQuestion) return;
    
    // For true-false, we check if the first option is "Doğru" or similar
    const correctIsTrue = currentQuestion.correctAnswer.toLowerCase().includes('doğru') || 
                          currentQuestion.correctAnswer.toLowerCase() === 'true' ||
                          currentQuestion.correctAnswer === currentQuestion.options[0];
    
    const correct = userAnswer === correctIsTrue;
    
    if (correct) {
      setScore(score + 10);
      setFeedback('✅ Doğru!');
    } else {
      setFeedback('❌ Yanlış!');
    }

    setTimeout(() => {
      if (round < totalRounds) {
        setRound(round + 1);
      } else {
        setShowCelebration(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setScore(0);
    setRound(1);
    setShowCelebration(false);
    loadQuestions();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 flex items-center justify-center">
        <div className="text-white text-2xl">Sorular yükleniyor...</div>
      </div>
    );
  }

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl p-12 text-center border border-green-500/30 max-w-2xl">
          <div className="text-8xl mb-6">✅🎉</div>
          <h2 className="text-5xl font-black text-white mb-4">Harika!</h2>
          <p className="text-3xl text-white mb-2">Toplam Puan: {score}</p>
          <p className="text-xl text-white/80 mb-8">Tüm soruları tamamladın!</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetGame}
              className="px-8 py-4 bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 hover:from-green-400 hover:to-emerald-500 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
            >
              Tekrar Oyna
            </button>
            <button
              onClick={() => {
                onComplete(score);
                onExit();
              }}
              className="px-8 py-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl text-white font-bold text-xl transition-all transform hover:scale-105"
            >
              Menüye Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all transform hover:scale-105"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">Soru: {round}/{totalRounds}</span>
            </div>
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">⭐ {score}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black">✅❌ Doğru Yanlış</h1>
          <p className="text-slate-400 text-lg mt-2">İşlem doğru mu yanlış mı?</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
          <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 rounded-2xl p-8 md:p-12">
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={() => setShowRules(true)}
                className="px-4 py-2 bg-green-700/40 hover:bg-green-600/40 border-2 border-green-300 text-white rounded-xl font-bold transition-all transform hover:scale-105"
              >
                📖 NASIL OYNANIR?
              </button>
            </div>

            <div className="bg-green-700/40 rounded-2xl p-12 mb-8 border-2 border-green-300">
              <p className="text-white text-5xl md:text-6xl font-black text-center">{currentQuestion?.text || 'Soru yükleniyor...'}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={() => handleAnswer(true)}
                disabled={!!feedback}
                className="h-32 bg-green-700/40 hover:bg-green-600/40 border-4 border-green-300 rounded-2xl text-white font-black text-4xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-2"
              >
                <span className="text-5xl">✅</span>
                <span>DOĞRU</span>
              </button>
              <button
                onClick={() => handleAnswer(false)}
                disabled={!!feedback}
                className="h-32 bg-red-700/40 hover:bg-red-600/40 border-4 border-red-300 rounded-2xl text-white font-black text-4xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-2"
              >
                <span className="text-5xl">❌</span>
                <span>YANLIŞ</span>
              </button>
            </div>

            {feedback && (
              <div className={`mt-8 text-center text-2xl font-black p-6 rounded-xl ${
                feedback.includes('✅') ? 'bg-green-500/90 border-2 border-green-300 text-white' : 'bg-red-500/90 border-2 border-red-300 text-white'
              }`}>
                {feedback}
              </div>
            )}
          </div>
        </div>
      </div>

      {showRules && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-3xl border border-green-500/30 max-w-md w-full">
            <div className="text-5xl mb-4">✅❌</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Nasıl Oynanır?</h3>
            <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base">
              <li className="flex gap-2"><span className="text-green-400 font-bold">1.</span> Ekranda bir matematik işlemi göreceksin</li>
              <li className="flex gap-2"><span className="text-green-400 font-bold">2.</span> İşlemin sonucu doğru mu yanlış mı kontrol et</li>
              <li className="flex gap-2"><span className="text-green-400 font-bold">3.</span> Doğru veya Yanlış butonuna bas</li>
              <li className="flex gap-2"><span className="text-green-400 font-bold">4.</span> Her doğru cevap 10 puan kazandırır!</li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="w-full bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 hover:from-green-400 hover:to-emerald-500 text-white font-black py-4 rounded-xl transition-all transform hover:scale-105"
            >
              ANLADIM, BAŞLA! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrueFalseGame;

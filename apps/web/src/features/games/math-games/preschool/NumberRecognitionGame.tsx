import React, { useState, useEffect } from 'react';

interface NumberRecognitionGameProps {
    onExit: () => void;
    onComplete?: (score: number) => void;
}

const NumberRecognitionGame: React.FC<NumberRecognitionGameProps> = ({ onExit, onComplete }) => {
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [gameWon, setGameWon] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);

    const levels = [
        { questions: 5, range: [1, 10], timePerQuestion: 10 },
        { questions: 8, range: [1, 20], timePerQuestion: 8 },
        { questions: 10, range: [1, 50], timePerQuestion: 6 }
    ];

    const [questions, setQuestions] = useState<Array<{ number: number; options: number[]; correct: number }>>([]);

    useEffect(() => {
        generateQuestions();
    }, [level]);

    useEffect(() => {
        if (timeLeft > 0 && !gameWon && currentQuestion < questions.length) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && currentQuestion < questions.length) {
            handleAnswer(-1);
        }
    }, [timeLeft, gameWon, currentQuestion]);

    const generateQuestions = () => {
        const currentLevel = levels[level - 1];
        const newQuestions = [];
        
        for (let i = 0; i < currentLevel.questions; i++) {
            const [min, max] = currentLevel.range;
            const correct = Math.floor(Math.random() * (max - min + 1)) + min;
            
            // Yanlış seçenekler oluştur
            const options = [correct];
            while (options.length < 4) {
                const wrong = Math.floor(Math.random() * (max - min + 1)) + min;
                if (!options.includes(wrong)) {
                    options.push(wrong);
                }
            }
            
            newQuestions.push({
                number: correct,
                options: options.sort(() => Math.random() - 0.5),
                correct
            });
        }
        
        setQuestions(newQuestions);
        setCurrentQuestion(0);
        setCorrectAnswers(0);
        setTimeLeft(currentLevel.timePerQuestion);
    };

    const handleAnswer = (answer: number) => {
        const question = questions[currentQuestion];
        const isCorrect = answer === question.correct;
        
        if (isCorrect) {
            setCorrectAnswers(correctAnswers + 1);
            setScore(score + 20);
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setTimeLeft(levels[level - 1].timePerQuestion);
        } else {
            setGameWon(true);
        }
    };

    const handleNextLevel = () => {
        if (level < levels.length) {
            setLevel(level + 1);
            setGameWon(false);
        } else {
            if (onComplete) onComplete(score);
            onExit();
        }
    };

    const handleRestart = () => {
        generateQuestions();
        setGameWon(false);
        setScore(0);
    };

    if (questions.length === 0) return null;

    const currentQ = questions[currentQuestion];
    const currentLevel = levels[level - 1];

    // Sayıyı görsel olarak göster (noktalar)
    const renderDots = (num: number) => {
        const dots = [];
        const rows = Math.ceil(Math.sqrt(num));
        const cols = Math.ceil(num / rows);
        
        for (let i = 0; i < num; i++) {
            dots.push(
                <div key={i} className="w-8 h-8 bg-blue-500 rounded-full shadow-lg" />
            );
        }
        
        return (
            <div 
                className="grid gap-3 mx-auto w-fit"
                style={{ gridTemplateColumns: `repeat(${Math.min(cols, 10)}, 1fr)` }}
            >
                {dots}
            </div>
        );
    };

    return (
        <div className="min-h-screen text-white p-4 flex items-center justify-center">
            <div className="w-full max-w-4xl">
                <div className="bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-8 border border-blue-500/30 shadow-2xl">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <button
                            onClick={onExit}
                            className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all font-bold"
                        >
                            ⬅ GERİ
                        </button>
                        <h2 className="text-2xl md:text-3xl font-black text-white">
                            🔢 SAYI TANIMA
                        </h2>
                        <div className="text-sm font-bold bg-blue-500/20 px-4 py-2 rounded-xl">
                            Seviye {level}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-center gap-4 mb-6">
                        <div className="bg-blue-500/20 px-6 py-3 rounded-xl">
                            <span className="text-blue-300 font-bold">Soru: {currentQuestion + 1}/{currentLevel.questions}</span>
                        </div>
                        <div className="bg-red-500/20 px-6 py-3 rounded-xl">
                            <span className="text-red-300 font-bold">⏱️ {timeLeft}s</span>
                        </div>
                        <div className="bg-green-500/20 px-6 py-3 rounded-xl">
                            <span className="text-green-300 font-bold">Puan: {score}</span>
                        </div>
                    </div>

                    {!gameWon && (
                        <>
                            {/* Question */}
                            <div className="text-center mb-8">
                                <h3 className="text-white/80 font-bold mb-6 text-xl">🎯 Kaç tane nokta var?</h3>
                                <div className="bg-slate-800/50 p-8 rounded-3xl border-2 border-blue-500/30 mb-6">
                                    {renderDots(currentQ.number)}
                                </div>
                            </div>

                            {/* Answer Options */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                {currentQ.options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleAnswer(option)}
                                        className="p-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl text-5xl font-black hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/50"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                                <div 
                                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-1000"
                                    style={{ width: `${(timeLeft / currentLevel.timePerQuestion) * 100}%` }}
                                />
                            </div>
                        </>
                    )}

                    {/* Win Modal */}
                    {gameWon && (
                        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                            <div className="bg-slate-900 p-8 rounded-3xl border-4 border-green-500 text-center animate-in zoom-in">
                                <div className="text-6xl mb-4">🎉</div>
                                <h3 className="text-3xl font-black mb-4 text-green-400">HARIKA!</h3>
                                <p className="text-xl mb-2">Doğru Cevap: {correctAnswers}/{currentLevel.questions}</p>
                                <p className="text-lg mb-6">Toplam Puan: {score}</p>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={handleRestart}
                                        className="px-6 py-3 bg-blue-500 rounded-xl font-bold hover:bg-blue-400"
                                    >
                                        🔄 Tekrar Oyna
                                    </button>
                                    {level < levels.length ? (
                                        <button
                                            onClick={handleNextLevel}
                                            className="px-6 py-3 bg-green-500 rounded-xl font-bold hover:bg-green-400"
                                        >
                                            Sonraki Seviye →
                                        </button>
                                    ) : (
                                        <button
                                            onClick={onExit}
                                            className="px-6 py-3 bg-purple-500 rounded-xl font-bold hover:bg-purple-400"
                                        >
                                            Tamamla ✓
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Instructions */}
                    <div className="mt-6 text-center text-white/60 text-sm">
                        <p>💡 Noktaları say ve doğru sayıyı seç!</p>
                        <p>Süre dolmadan cevap ver</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NumberRecognitionGame;

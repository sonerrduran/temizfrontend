import React, { useState, useEffect } from 'react';

interface DirectionGameProps {
    onExit: () => void;
    onComplete?: (score: number) => void;
}

const DirectionGame: React.FC<DirectionGameProps> = ({ onExit, onComplete }) => {
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [gameWon, setGameWon] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    const directions = ['⬆️', '⬇️', '⬅️', '➡️'];
    const bodies = ['🧍', '🏃', '🚶', '🧘'];

    const levels = [
        { questions: 5, timePerQuestion: 10, speed: 'Yavaş' },
        { questions: 8, timePerQuestion: 8, speed: 'Orta' },
        { questions: 10, timePerQuestion: 5, speed: 'Hızlı' }
    ];

    const [questions, setQuestions] = useState<Array<{ body: string; direction: string; correctDirection: string }>>([]);

    useEffect(() => {
        generateQuestions();
    }, [level]);

    useEffect(() => {
        if (timeLeft > 0 && !gameWon && currentQuestion < questions.length) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && currentQuestion < questions.length) {
            handleAnswer('');
        }
    }, [timeLeft, gameWon, currentQuestion]);

    const generateQuestions = () => {
        const currentLevel = levels[level - 1];
        const newQuestions = [];
        
        for (let i = 0; i < currentLevel.questions; i++) {
            const body = bodies[Math.floor(Math.random() * bodies.length)];
            const correctDirection = directions[Math.floor(Math.random() * directions.length)];
            const wrongDirection = directions[Math.floor(Math.random() * directions.length)];
            
            newQuestions.push({
                body,
                direction: Math.random() > 0.5 ? correctDirection : wrongDirection,
                correctDirection
            });
        }
        
        setQuestions(newQuestions);
        setCurrentQuestion(0);
        setCorrectAnswers(0);
        setTimeLeft(currentLevel.timePerQuestion);
    };

    const handleAnswer = (answer: string) => {
        const question = questions[currentQuestion];
        const isCorrect = answer === question.correctDirection;
        
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

    return (
        <div className="min-h-screen text-white p-4 flex items-center justify-center">
            <div className="w-full max-w-4xl">
                <div className="bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-8 border border-orange-500/30 shadow-2xl">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <button
                            onClick={onExit}
                            className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all font-bold"
                        >
                            ⬅ GERİ
                        </button>
                        <h2 className="text-2xl md:text-3xl font-black text-white">
                            🧭 YÖN OYUNU
                        </h2>
                        <div className="text-sm font-bold bg-orange-500/20 px-4 py-2 rounded-xl">
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
                                <div className="bg-slate-800/50 p-8 rounded-3xl border-2 border-orange-500/30 mb-6">
                                    <div className="text-8xl mb-4">{currentQ.body}</div>
                                    <div className="text-6xl mb-4">{currentQ.direction}</div>
                                    <p className="text-xl text-white/80 font-bold">
                                        Bu yön doğru mu?
                                    </p>
                                </div>
                            </div>

                            {/* Answer Options */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                {directions.map((dir) => (
                                    <button
                                        key={dir}
                                        onClick={() => handleAnswer(dir)}
                                        className="p-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl text-5xl hover:scale-105 transition-all shadow-lg hover:shadow-orange-500/50"
                                    >
                                        {dir}
                                    </button>
                                ))}
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                                <div 
                                    className="bg-gradient-to-r from-orange-500 to-red-500 h-full transition-all duration-1000"
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
                                <h3 className="text-3xl font-black mb-4 text-green-400">TAMAMLANDI!</h3>
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
                        <p>💡 Karakterin baktığı yönü hızlıca belirle!</p>
                        <p>Süre dolmadan doğru yönü seç</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DirectionGame;

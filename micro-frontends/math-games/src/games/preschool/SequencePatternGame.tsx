import React, { useState, useEffect } from 'react';

interface SequencePatternGameProps {
    onExit: () => void;
    onComplete?: (score: number) => void;
}

const SequencePatternGame: React.FC<SequencePatternGameProps> = ({ onExit, onComplete }) => {
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [gameWon, setGameWon] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    const shapes = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟤', '🟠', '⚫', '⚪'];

    const levels = [
        { questions: 5, patternLength: 3 },
        { questions: 7, patternLength: 4 },
        { questions: 10, patternLength: 5 }
    ];

    const [questions, setQuestions] = useState<Array<{ pattern: string[]; options: string[]; correct: string }>>([]);

    useEffect(() => {
        generateQuestions();
    }, [level]);

    const generateQuestions = () => {
        const currentLevel = levels[level - 1];
        const newQuestions = [];
        
        for (let i = 0; i < currentLevel.questions; i++) {
            // Basit tekrarlayan desen oluştur
            const basePattern = shapes.slice(0, 2 + Math.floor(Math.random() * 2));
            const pattern = [];
            
            for (let j = 0; j < currentLevel.patternLength; j++) {
                pattern.push(basePattern[j % basePattern.length]);
            }
            
            const correct = basePattern[currentLevel.patternLength % basePattern.length];
            
            // Yanlış seçenekler ekle
            const wrongOptions = shapes.filter(s => s !== correct && !pattern.includes(s)).slice(0, 3);
            const options = [correct, ...wrongOptions].sort(() => Math.random() - 0.5);
            
            newQuestions.push({ pattern, options, correct });
        }
        
        setQuestions(newQuestions);
        setCurrentQuestion(0);
        setCorrectAnswers(0);
    };

    const handleAnswer = (answer: string) => {
        const question = questions[currentQuestion];
        const isCorrect = answer === question.correct;
        
        if (isCorrect) {
            setCorrectAnswers(correctAnswers + 1);
            setScore(score + 30);
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
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
                <div className="bg-slate-900/90 backdrop-blur-xl rounded-[40px] p-8 border border-teal-500/30 shadow-2xl">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <button
                            onClick={onExit}
                            className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all font-bold"
                        >
                            ⬅ GERİ
                        </button>
                        <h2 className="text-2xl md:text-3xl font-black text-white">
                            🔢 ÖRÜNTÜ OYUNU
                        </h2>
                        <div className="text-sm font-bold bg-teal-500/20 px-4 py-2 rounded-xl">
                            Seviye {level}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-center gap-4 mb-6">
                        <div className="bg-blue-500/20 px-6 py-3 rounded-xl">
                            <span className="text-blue-300 font-bold">Soru: {currentQuestion + 1}/{currentLevel.questions}</span>
                        </div>
                        <div className="bg-yellow-500/20 px-6 py-3 rounded-xl">
                            <span className="text-yellow-300 font-bold">Doğru: {correctAnswers}</span>
                        </div>
                        <div className="bg-green-500/20 px-6 py-3 rounded-xl">
                            <span className="text-green-300 font-bold">Puan: {score}</span>
                        </div>
                    </div>

                    {!gameWon && (
                        <>
                            {/* Pattern Display */}
                            <div className="text-center mb-8">
                                <h3 className="text-white/80 font-bold mb-4 text-xl">🎯 Örüntüyü Tamamla</h3>
                                <div className="bg-slate-800/50 p-8 rounded-3xl border-2 border-teal-500/30 mb-6">
                                    <div className="flex justify-center items-center gap-4 mb-6">
                                        {currentQ.pattern.map((shape, i) => (
                                            <div key={i} className="text-6xl">{shape}</div>
                                        ))}
                                        <div className="text-6xl text-white/30">→</div>
                                        <div className="w-20 h-20 bg-slate-700/50 rounded-xl flex items-center justify-center text-4xl">
                                            ❓
                                        </div>
                                    </div>
                                    <p className="text-white/70 text-sm">Sıradaki şekil hangisi?</p>
                                </div>
                            </div>

                            {/* Answer Options */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                {currentQ.options.map((option, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswer(option)}
                                        className="p-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl text-6xl hover:scale-105 transition-all shadow-lg hover:shadow-teal-500/50"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>

                            {/* Progress */}
                            <div className="flex justify-center gap-2">
                                {Array.from({ length: currentLevel.questions }).map((_, i) => (
                                    <div 
                                        key={i}
                                        className={`w-3 h-3 rounded-full ${
                                            i < currentQuestion ? 'bg-green-500' :
                                            i === currentQuestion ? 'bg-teal-500 animate-pulse' :
                                            'bg-slate-700'
                                        }`}
                                    />
                                ))}
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
                        <p>💡 Örüntüyü incele ve sıradaki şekli bul!</p>
                        <p>Şekiller belirli bir düzende tekrar ediyor</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SequencePatternGame;

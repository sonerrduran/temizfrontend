import React, { useState, useEffect, useCallback } from 'react';

interface SpeedMathGameProps {
    onComplete: (stars: number) => void;
    onExit: () => void;
}

const generateQuestion = () => {
    const isAddition = Math.random() > 0.5;
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;

    // Ensure no negative results for simplicity
    const [a, b] = isAddition ? [num1, num2] : [Math.max(num1, num2), Math.min(num1, num2)];

    const answer = isAddition ? a + b : a - b;
    const operator = isAddition ? '+' : '-';

    // Generate 3 random wrong options
    let options = [answer];
    while (options.length < 4) {
        const offset = Math.floor(Math.random() * 9) - 4; // -4 to +4
        const wrongOpt = answer + (offset === 0 ? 1 : offset);
        if (!options.includes(wrongOpt) && wrongOpt >= 0) {
            options.push(wrongOpt);
        }
    }

    return {
        text: `${a} ${operator} ${b} = ?`,
        options: options.sort(() => Math.random() - 0.5),
        answer
    };
};

const SpeedMathGame: React.FC<SpeedMathGameProps> = ({ onComplete, onExit }) => {
    const [timeLeft, setTimeLeft] = useState(60);
    const [score, setScore] = useState(0);
    const [currentQ, setCurrentQ] = useState(generateQuestion());
    const [isGameOver, setIsGameOver] = useState(false);
    const [combo, setCombo] = useState(0);

    useEffect(() => {
        if (isGameOver) return;

        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            endGame();
        }
    }, [timeLeft, isGameOver]);

    const endGame = () => {
        setIsGameOver(true);
        // 1 star per 5 correct answers
        const earnedStars = Math.min(5, Math.floor(score / 5) + (score > 0 ? 1 : 0));

        setTimeout(() => {
            onComplete(earnedStars);
        }, 2500);
    };

    const handleAnswer = (selectedOpt: number) => {
        if (isGameOver) return;

        if (selectedOpt === currentQ.answer) {
            setScore(s => s + 1);
            setCombo(c => c + 1);
            setCurrentQ(generateQuestion());
        } else {
            setCombo(0);
            setTimeLeft(prev => Math.max(0, prev - 3)); // Time penalty
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <button onClick={onExit} className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all">
                        ← Çıkış
                    </button>
                    <div className="flex gap-4">
                        <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
                            <span className="text-white font-black">Puan: {score}</span>
                        </div>
                        <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
                            <span className="text-white font-black">⏱️ {timeLeft}s</span>
                        </div>
                    </div>
                </div>

                {/* Başlık */}
                <div className="text-center mb-8">
                    <h1 className="text-white text-4xl md:text-5xl font-black">
                        ☄️ Kuyruklu Yıldız
                    </h1>
                    <p className="text-slate-400 text-lg mt-2">{combo >= 3 && `🔥 ${combo} KOMBO!`}</p>
                </div>

                {/* Dış Kart - Lacivert */}
                <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
                    {/* İç Kart - Oyun Rengi (Turuncu) */}
                    <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-2xl p-8 md:p-12 mb-8">
                        <div className="bg-orange-700/40 border-2 border-orange-400 rounded-3xl w-full p-8 mb-8 flex justify-center items-center h-40">
                            <h3 className="text-6xl md:text-8xl font-black text-white">
                                {currentQ.text}
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full">
                            {currentQ.options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(opt)}
                                    className="bg-orange-700/40 hover:bg-orange-500 border-2 border-orange-400 hover:border-orange-300 text-white rounded-2xl py-6 md:py-8 text-4xl md:text-5xl font-black transition-all hover:scale-105"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {isGameOver && (
                    <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in duration-500 p-6 text-center">
                        <h3 className="text-5xl md:text-7xl font-black text-orange-400 mb-2">
                            ZAMAN DOLDU!
                        </h3>
                        <p className="text-xl md:text-3xl text-white font-bold mb-8">Toplam Çözülen: <span className="text-orange-400">{score} Soru</span></p>
                        <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpeedMathGame;

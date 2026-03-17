import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Difficulty } from '../../../types';

interface NumberCatcherGameProps {
    grade: number;
    difficulty: Difficulty;
    onComplete: (stars: number) => void;
    onExit: () => void;
}

interface FallingNumber {
    id: number;
    value: number;
    x: number; // percentage width
    y: number; // percentage height
    speed: number;
}

const NumberCatcherGame: React.FC<NumberCatcherGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
    const [timeLeft, setTimeLeft] = useState(45);
    const [score, setScore] = useState(0);
    const [numbers, setNumbers] = useState<FallingNumber[]>([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [rule, setRule] = useState<{ text: string, check: (val: number) => boolean }>({ text: '', check: () => false });
    const [feedback, setFeedback] = useState<{ x: number, y: number, text: string, type: 'success' | 'error' } | null>(null);

    const nextId = useRef(0);
    const requestRef = useRef<number>();

    useEffect(() => {
        // Generate rules based on grade
        let newRule;
        if (grade <= 1) {
            const rules = [
                { text: "Sadece ÇİFT Sayıları Yakala!", check: (v: number) => v % 2 === 0 },
                { text: "10'dan KÜÇÜK Sayıları Yakala!", check: (v: number) => v < 10 },
            ];
            newRule = rules[Math.floor(Math.random() * rules.length)];
        } else if (grade === 2) {
            const rules = [
                { text: "3'ün Katlarını Yakala!", check: (v: number) => v % 3 === 0 },
                { text: "Sadece TEK Sayıları Yakala!", check: (v: number) => v % 2 !== 0 },
            ];
            newRule = rules[Math.floor(Math.random() * rules.length)];
        } else if (grade === 3) {
            const rules = [
                { text: "4'ün veya 5'in Katlarını Yakala!", check: (v: number) => v % 4 === 0 || v % 5 === 0 },
                { text: "20'den BÜYÜK Sayıları Yakala!", check: (v: number) => v > 20 },
            ];
            newRule = rules[Math.floor(Math.random() * rules.length)];
        } else {
            const isPrime = (num: number) => {
                for (let i = 2, s = Math.sqrt(num); i <= s; i++) if (num % i === 0) return false;
                return num > 1;
            }
            const rules = [
                { text: "Sadece ASAL Sayıları Yakala!", check: (v: number) => isPrime(v) },
                { text: "Hem 2'ye Hem 3'e Bölünenleri Yakala!", check: (v: number) => v % 6 === 0 },
            ];
            newRule = rules[Math.floor(Math.random() * rules.length)];
        }
        setRule(newRule);
    }, [grade]);

    // Game loop for falling objects
    const updateLoop = useCallback(() => {
        if (isGameOver) return;

        setNumbers(prev => {
            let next = prev.map(n => ({ ...n, y: n.y + n.speed }));
            // Remove off-screen numbers
            next = next.filter(n => n.y < 110);

            // Add new numbers randomly depending on difficulty
            const spawnRate = difficulty === Difficulty.EASY ? 0.01 : difficulty === Difficulty.HARD ? 0.03 : 0.02;
            if (Math.random() < spawnRate) {
                const valMax = grade <= 1 ? 20 : grade === 2 ? 50 : 100;
                const speedBase = difficulty === Difficulty.EASY ? 0.05 : difficulty === Difficulty.HARD ? 0.15 : 0.1;

                next.push({
                    id: nextId.current++,
                    value: Math.floor(Math.random() * valMax) + 1,
                    x: 10 + Math.random() * 80, // keep away from absolute edges
                    y: -10,
                    speed: speedBase + Math.random() * 0.1
                });
            }
            return next;
        });

        requestRef.current = requestAnimationFrame(updateLoop);
    }, [isGameOver, difficulty, grade]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(updateLoop);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [updateLoop]);

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
        setNumbers([]);
        const stars = Math.min(5, Math.floor(score / 5));
        setTimeout(() => onComplete(stars), 2500);
    };

    const handleCatch = (target: FallingNumber) => {
        if (isGameOver) return;
        setNumbers(prev => prev.filter(n => n.id !== target.id));

        if (rule.check(target.value)) {
            setScore(s => s + 1);
            setFeedback({ x: target.x, y: target.y, text: '+1', type: 'success' });
        } else {
            setScore(s => Math.max(0, s - 1));
            setFeedback({ x: target.x, y: target.y, text: '-1', type: 'error' });
        }

        setTimeout(() => setFeedback(null), 600);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
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
                        🎈 Sayı Avcısı
                    </h1>
                    <p className="text-slate-400 text-lg mt-2">🚀 {rule.text}</p>
                </div>

                {/* Dış Kart - Lacivert */}
                <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8" style={{ height: '500px' }}>
                    {/* İç Kart - Oyun Rengi (Cyan/Mavi) */}
                    <div className="bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-600 rounded-2xl p-8 md:p-12 h-full relative overflow-hidden">

                        {numbers.map(n => (
                            <button
                                key={n.id}
                                onClick={() => handleCatch(n)}
                                className="absolute w-14 h-14 md:w-16 md:h-16 rounded-full bg-cyan-700/60 border-2 border-cyan-300 flex items-center justify-center font-black text-xl md:text-2xl text-white hover:scale-110 active:scale-95 transition-transform"
                                style={{ left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%, -50%)' }}
                            >
                                {n.value}
                            </button>
                        ))}

                        {feedback && (
                            <div
                                className={`absolute pointer-events-none font-black text-4xl p-2 rounded-xl animate-bounce z-50
                                  ${feedback.type === 'success' ? 'text-green-400' : 'text-red-500'}`}
                                style={{ left: `${feedback.x}%`, top: `${feedback.y}%`, transform: 'translate(-50%, -100%)' }}
                            >
                                {feedback.text}
                            </div>
                        )}
                    </div>
                </div>

                {isGameOver && (
                    <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in p-6 text-center rounded-3xl">
                        <h3 className="text-5xl md:text-7xl font-black text-cyan-400 mb-4">OYUN BİTTİ!</h3>
                        <p className="text-2xl text-white font-bold mb-8">Toplanan Başarılı Sayı: <span className="text-cyan-400">{score}</span></p>
                        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NumberCatcherGame;

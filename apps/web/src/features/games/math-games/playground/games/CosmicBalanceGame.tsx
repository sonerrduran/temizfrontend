import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';

interface CosmicBalanceGameProps {
    grade: number;
    difficulty: Difficulty;
    onComplete: (stars: number) => void;
    onExit: () => void;
}

const generateBalanceQuestion = (grade: number) => {
    // Determine operations allowed based on grade
    const ops = grade === 1 ? ['+'] : grade === 2 ? ['+', '-'] : grade === 3 ? ['+', '-', '*'] : ['+', '-', '*', '/'];
    const leftOp = ops[Math.floor(Math.random() * ops.length)];
    const rightOp = ops[Math.floor(Math.random() * ops.length)];

    const maxVal = grade === 1 ? 10 : grade === 2 ? 30 : grade === 3 ? 50 : 100;

    // Generate left side
    let a = Math.floor(Math.random() * maxVal) + 1;
    let b = Math.floor(Math.random() * maxVal) + 1;

    if (leftOp === '-') { [a, b] = [Math.max(a, b), Math.min(a, b)]; }
    if (leftOp === '*' && grade <= 3) { a = Math.floor(Math.random() * 10) + 1; b = Math.floor(Math.random() * 10) + 1; }
    if (leftOp === '/') { b = Math.floor(Math.random() * 9) + 2; a = b * (Math.floor(Math.random() * 10) + 1); }

    const leftResult = leftOp === '+' ? a + b : leftOp === '-' ? a - b : leftOp === '*' ? a * b : a / b;

    // Generate right side such that c (rightOp) d = leftResult. We need to find d.
    let c = Math.floor(Math.random() * maxVal) + 1;
    let d = 0;
    let valid = false;

    // Try to generate a valid 'c' that leaves a clean integer 'd'
    let attempts = 0;
    while (!valid && attempts < 50) {
        c = Math.floor(Math.random() * maxVal) + 1;
        if (rightOp === '+') { d = leftResult - c; valid = d >= 0; }
        else if (rightOp === '-') { d = c - leftResult; valid = d >= 0; } // c - d = leftResult => d = c - leftResult
        else if (rightOp === '*') { d = leftResult / c; valid = Number.isInteger(d) && d >= 0; }
        else if (rightOp === '/') { d = c / leftResult; valid = Number.isInteger(d) && d > 0 && leftResult !== 0; }
        attempts++;
    }

    // Fallback to simple addition if complex generation fails
    if (!valid) {
        c = Math.max(0, leftResult - 5);
        d = leftResult - c;
        return { a, leftOp: '+', b, c, rightOp: '+', answer: d };
    }

    return { a, leftOp, b, c, rightOp, answer: d };
};

const CosmicBalanceGame: React.FC<CosmicBalanceGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
    const [timeLeft, setTimeLeft] = useState(difficulty === Difficulty.HARD ? 45 : difficulty === Difficulty.EASY ? 90 : 60);
    const [score, setScore] = useState(0);
    const [q, setQ] = useState(generateBalanceQuestion(grade));
    const [options, setOptions] = useState<number[]>([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [tilt, setTilt] = useState(0); // -1 left heavy, 1 right heavy, 0 balanced

    const generateOptions = useCallback((answer: number) => {
        let opts = [answer];
        while (opts.length < 4) {
            const offset = Math.floor(Math.random() * 10) - 5;
            const wrong = answer + (offset === 0 ? 2 : offset);
            if (!opts.includes(wrong) && wrong >= 0) opts.push(wrong);
        }
        setOptions(opts.sort(() => Math.random() - 0.5));
    }, []);

    useEffect(() => {
        generateOptions(q.answer);
    }, [q, generateOptions]);

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
        const stars = Math.min(5, Math.floor(score / 3) + (score > 0 ? 1 : 0));
        setTimeout(() => onComplete(stars), 2500);
    };

    const handleAnswer = (val: number) => {
        if (isGameOver) return;

        if (val === q.answer) {
            setTilt(0); // Balanced
            setScore(s => s + 1);
            setTimeout(() => {
                setQ(generateBalanceQuestion(grade));
            }, 800);
        } else {
            // Wrong context logic
            const rightSideVal = q.rightOp === '+' ? q.c + val : q.rightOp === '-' ? q.c - val : q.rightOp === '*' ? q.c * val : q.c / val;
            const leftSideVal = q.leftOp === '+' ? q.a + q.b : q.leftOp === '-' ? q.a - q.b : q.leftOp === '*' ? q.a * q.b : q.a / q.b;

            setTilt(rightSideVal > leftSideVal ? 10 : -10);
            setTimeLeft(prev => Math.max(0, prev - 2));
            setTimeout(() => setTilt(0), 500);
        }
    };

    const getOpIcon = (op: string) => op === '*' ? '×' : op === '/' ? '÷' : op;

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
                        ⚖️ Kozmik Terazi
                    </h1>
                    <p className="text-slate-400 text-lg mt-2">Eşitliği Sağla!</p>
                </div>

                {/* Dış Kart - Lacivert */}
                <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
                    {/* İç Kart - Oyun Rengi (Pembe/Mor) */}
                    <div className="bg-gradient-to-br from-fuchsia-500 via-purple-500 to-fuchsia-600 rounded-2xl p-8 md:p-12 mb-8">
                        {/* Balance Scale UI */}
                        <div className="w-full max-w-lg mx-auto relative mb-16 transition-transform duration-500 ease-in-out" style={{ transform: `rotate(${tilt}deg)` }}>
                            {/* Scale Beam */}
                            <div className="w-full h-4 bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400 rounded-full relative">
                                {/* Center Pivot */}
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-amber-500 rounded-full border-4 border-amber-700 z-10"></div>
                                <div className="absolute left-1/2 top-full -translate-x-1/2 w-4 h-32 bg-amber-600 rounded-b-lg"></div>
                                <div className="absolute left-1/2 top-full -translate-x-1/2 mt-32 w-16 h-4 bg-amber-700 rounded-full"></div>

                                {/* Left Plate Content */}
                                <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-full pb-4">
                                    <div className="bg-fuchsia-700/60 backdrop-blur border-2 border-fuchsia-300 p-4 md:p-6 rounded-2xl">
                                        <span className="text-3xl md:text-5xl font-black text-white whitespace-nowrap">
                                            {q.a} <span className="text-amber-300 mx-1">{getOpIcon(q.leftOp)}</span> {q.b}
                                        </span>
                                    </div>
                                    <div className="w-0.5 h-10 bg-slate-300 mx-auto"></div>
                                </div>

                                {/* Right Plate Content */}
                                <div className="absolute right-0 top-0 translate-x-1/2 -translate-y-full pb-4">
                                    <div className="bg-fuchsia-700/60 backdrop-blur border-2 border-fuchsia-300 p-4 md:p-6 rounded-2xl flex items-center gap-2">
                                        <span className="text-3xl md:text-5xl font-black text-white whitespace-nowrap">
                                            {q.c} <span className="text-amber-300 mx-1">{getOpIcon(q.rightOp)}</span> <span className="text-fuchsia-200 border-b-4 border-dashed border-fuchsia-300 pb-1 ml-1 w-12 inline-block text-center">?</span>
                                        </span>
                                    </div>
                                    <div className="w-0.5 h-10 bg-slate-300 mx-auto"></div>
                                </div>
                            </div>
                        </div>

                        {/* Options Grid */}
                        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-2xl mx-auto">
                            {options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(opt)}
                                    className="bg-fuchsia-700/40 hover:bg-fuchsia-500 border-2 border-fuchsia-400 hover:border-fuchsia-300 text-white rounded-2xl py-6 md:py-8 text-3xl md:text-4xl font-black transition-all hover:scale-105"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {isGameOver && (
                    <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in p-6 text-center">
                        <h3 className="text-5xl md:text-7xl font-black text-fuchsia-400 mb-4">SÜRE BİTTİ!</h3>
                        <p className="text-2xl text-white font-bold mb-8">Kurulan Denge: <span className="text-fuchsia-400">{score}</span></p>
                        <div className="w-16 h-16 border-4 border-fuchsia-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CosmicBalanceGame;

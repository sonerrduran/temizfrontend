import React, { useState, useEffect } from 'react';

interface GameLayoutProps {
  children: React.ReactNode;
  title: string;
  score?: number;
  timer?: number;
  level?: number;
  onExit?: () => void;
  showHeader?: boolean;
}

export default function GameLayout({
  children,
  title,
  score = 0,
  timer,
  level,
  onExit,
  showHeader = true,
}: GameLayoutProps) {
  const [timeLeft, setTimeLeft] = useState(timer || 0);

  useEffect(() => {
    if (timer && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, timeLeft]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {showHeader && (
        <div className="bg-black/20 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Left: Exit Button */}
              {onExit && (
                <button
                  onClick={onExit}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all"
                >
                  ← Çıkış
                </button>
              )}

              {/* Center: Title */}
              <h1 className="text-2xl font-black text-white">{title}</h1>

              {/* Right: Stats */}
              <div className="flex items-center gap-4">
                {level !== undefined && (
                  <div className="px-4 py-2 bg-white/10 rounded-xl">
                    <span className="text-white/60 text-sm">Seviye</span>
                    <span className="text-white font-bold ml-2">{level}</span>
                  </div>
                )}

                {timer !== undefined && (
                  <div
                    className={`px-4 py-2 rounded-xl ${
                      timeLeft <= 10 ? 'bg-red-500/20 animate-pulse' : 'bg-white/10'
                    }`}
                  >
                    <span className="text-white/60 text-sm">⏱️</span>
                    <span className="text-white font-bold ml-2">{timeLeft}s</span>
                  </div>
                )}

                <div className="px-4 py-2 bg-white/10 rounded-xl">
                  <span className="text-white/60 text-sm">⭐</span>
                  <span className="text-white font-bold ml-2">{score}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">{children}</div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { GameMode } from '../../types';

interface PomodoroTimerProps {
  setMode: (mode: GameMode) => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ setMode }) => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setTimerMode] = useState<'work' | 'break'>('work');
  const [task, setTask] = useState('');
  const [completedCycles, setCompletedCycles] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && seconds > 0) {
      timerRef.current = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    } else if (seconds === 0) {
      handleTimerComplete();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, seconds]);

  const handleTimerComplete = () => {
    setIsActive(false);
    if (mode === 'work') {
      setTimerMode('break');
      setSeconds(5 * 60);
      setCompletedCycles((c) => c + 1);
      alert('Harika! Şimdi 5 dakikalık mola zamanı.');
    } else {
      setTimerMode('work');
      setSeconds(25 * 60);
      alert('Mola bitti! Çalışmaya devam edelim mi?');
    }
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setSeconds(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = 100 - (seconds / (mode === 'work' ? 25 * 60 : 5 * 60)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Ana Kart - Dış Katman */}
      <div className="w-full max-w-2xl bg-slate-800/80 backdrop-blur-xl rounded-[40px] p-1 border border-slate-700 shadow-2xl">
        {/* İç Oyun Alanı */}
        <div
          className={`bg-gradient-to-br ${mode === 'work' ? 'from-rose-500 to-red-600' : 'from-cyan-500 to-blue-600'} rounded-[36px] p-8 relative overflow-hidden`}
        >
          {/* Çıkış Butonu */}
          <button
            onClick={() => setMode(GameMode.FOCUS_MENU)}
            className="absolute top-6 left-6 w-12 h-12 bg-red-600/90 hover:bg-red-500/90 rounded-full flex items-center justify-center text-white font-black text-xl transition-all z-10 shadow-lg"
          >
            ✕
          </button>

          {/* Sağ Üst Bilgi */}
          <div className="absolute top-6 right-6 bg-slate-800/80 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/20">
            <p className="text-white/90 text-sm font-bold">Döngü: {completedCycles}/4</p>
          </div>

          <div className="flex flex-col items-center justify-center min-h-[600px] text-white">
            <h3 className="text-center font-black tracking-widest text-xs uppercase mb-8 opacity-80">
              {mode === 'work' ? '🏢 ODAKLANMA ZAMANI' : '☕ MOLA ZAMANI'}
            </h3>

            {/* Progress Ring */}
            <div className="relative w-64 h-64 mx-auto mb-8 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-white/10"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={754}
                  strokeDashoffset={754 - (754 * progress) / 100}
                  className="transition-all duration-1000 text-white shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-6xl font-black tabular-nums tracking-tighter drop-shadow-lg">
                {formatTime(seconds)}
              </div>
            </div>

            <div className="w-full max-w-md space-y-6">
              <input
                type="text"
                placeholder="Şu an neye odaklanıyorsun?"
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-center font-bold text-white placeholder-white/60"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />

              <div className="flex gap-4">
                <button
                  onClick={toggleTimer}
                  className={`flex-1 py-4 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-xl ${isActive ? 'bg-white/20 text-white border-2 border-white/40' : 'bg-white text-slate-900 hover:bg-white/90'}`}
                >
                  {isActive ? 'DURAKLAT' : 'BAŞLAT'}
                </button>
                <button
                  onClick={resetTimer}
                  className="px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-xl hover:bg-white/20 transition-all"
                >
                  🔄
                </button>
              </div>

              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${i <= completedCycles ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,1)]' : 'bg-white/20'}`}
                  ></div>
                ))}
              </div>
              <p className="text-center text-[10px] font-bold opacity-60">
                4 DÖNGÜ SONRASI UZUN MOLA
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;

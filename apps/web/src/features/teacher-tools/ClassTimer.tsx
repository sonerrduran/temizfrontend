import React, { useState, useEffect, useRef } from 'react';

interface Props {
  onExit: () => void;
}

const ClassTimer: React.FC<Props> = ({ onExit }) => {
  const [mode, setMode] = useState<'TIMER' | 'STOPWATCH'>('TIMER');
  const [time, setTime] = useState(300); // Default 5 mins for Timer
  const [isRunning, setIsRunning] = useState(false);
  const [inputMins, setInputMins] = useState('5');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => {
          if (mode === 'TIMER') {
            if (prev <= 1) {
              clearInterval(timerRef.current!);
              setIsRunning(false);
              return 0;
            }
            return prev - 1;
          } else {
            return prev + 1;
          }
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    if (mode === 'TIMER') {
      const mins = parseInt(inputMins) || 5;
      setTime(mins * 60);
    } else {
      setTime(0);
    }
  };

  const setTimerMins = (mins: number) => {
    setIsRunning(false);
    setInputMins(mins.toString());
    setTime(mins * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const isTimeUp = mode === 'TIMER' && time === 0 && !isRunning;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full p-4 relative">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onExit}
          className="px-6 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-2 border border-slate-700 font-bold"
        >
          <span>⬅</span> Çıkış
        </button>
      </div>

      <div
        className={`bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 rounded-[50px] shadow-2xl border transition-all duration-500 w-full max-w-4xl flex flex-col items-center ${isTimeUp ? 'border-rose-500 shadow-[0_0_100px_rgba(244,63,94,0.4)]' : 'border-white/10'}`}
      >
        {/* Top Controls */}
        <div className="flex bg-slate-950 p-1 rounded-full mb-8">
          <button
            onClick={() => {
              setMode('TIMER');
              setIsRunning(false);
              setTime(parseInt(inputMins) * 60 || 300);
            }}
            className={`px-8 py-2 rounded-full font-bold text-sm transition-all ${mode === 'TIMER' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            GERİ SAYIM
          </button>
          <button
            onClick={() => {
              setMode('STOPWATCH');
              setIsRunning(false);
              setTime(0);
            }}
            className={`px-8 py-2 rounded-full font-bold text-sm transition-all ${mode === 'STOPWATCH' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            KRONOMETRE
          </button>
        </div>

        {/* Display */}
        <div
          className={`font-black text-[100px] md:text-[180px] leading-none tracking-tighter transition-colors duration-300 drop-shadow-2xl 
            ${isTimeUp ? 'text-rose-500 animate-pulse' : 'text-white'}
        `}
        >
          {formatTime(time)}
        </div>

        {/* Quick Sets for Timer */}
        {mode === 'TIMER' && !isRunning && (
          <div className="flex gap-2 mt-4 mb-4">
            {[1, 3, 5, 10, 15, 30].map((m) => (
              <button
                key={m}
                onClick={() => setTimerMins(m)}
                className="w-12 h-12 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white font-bold transition-colors"
              >
                {m}'
              </button>
            ))}
          </div>
        )}

        <div className="h-8 mb-6 mt-2">
          {isTimeUp && (
            <span className="text-rose-400 font-black text-2xl tracking-widest uppercase">
              SÜRE DOLDU!
            </span>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <button
            onClick={toggleTimer}
            className={`px-12 py-4 rounded-full font-black text-2xl transition-all shadow-xl
                    ${isRunning ? 'bg-amber-500 hover:bg-amber-400 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-white hover:-translate-y-1 hover:shadow-emerald-500/30'}
                `}
          >
            {isRunning ? 'DURAKLAT' : 'BAŞLAT'}
          </button>
          <button
            onClick={resetTimer}
            className="px-8 py-4 bg-slate-800 text-slate-300 hover:text-white rounded-full font-bold text-xl hover:bg-slate-700 transition-colors"
          >
            SIFIRLA
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassTimer;

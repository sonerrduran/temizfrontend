import React, { useState, useEffect, useRef } from 'react';

type AdvancedMode =
  | '13_POINT'
  | 'HOURGLASS'
  | 'ZIGZAG_VERTICAL'
  | 'ZIGZAG_HORIZONTAL'
  | 'OPENING_VERTICAL'
  | 'OPENING_HORIZONTAL'
  | 'CIRCULAR';

// M5 Bilişim styled 13-point star coordinates (Normalized 0-100)
const THIRTEEN_POINTS = [
  { x: 50, y: 50, label: '0' }, // Center
  { x: 50, y: 10, label: '1' }, // Top
  { x: 75, y: 15, label: '2' }, // Top-mid-right
  { x: 90, y: 35, label: '3' }, // Mid-top-right
  { x: 90, y: 65, label: '4' }, // Mid-bottom-right
  { x: 75, y: 85, label: '5' }, // Bottom-mid-right
  { x: 50, y: 90, label: '6' }, // Bottom
  { x: 25, y: 85, label: '7' }, // Bottom-mid-left
  { x: 10, y: 65, label: '8' }, // Mid-bottom-left
  { x: 10, y: 35, label: '9' }, // Mid-top-left
  { x: 25, y: 15, label: '10' }, // Top-mid-left
  { x: 70, y: 50, label: '11' }, // Inner Right
  { x: 30, y: 50, label: '12' }, // Inner Left
];

// The sequence for 13-point eye movement (M5 Bilişim style star path)
const THIRTEEN_SEQUENCE = [0, 6, 1, 7, 2, 8, 3, 9, 4, 10, 5, 0, 11, 12, 0];

const AdvancedEyeExercises: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [mode, setMode] = useState<AdvancedMode>('13_POINT');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(3); // Jump delay in deciseconds (3 = 300ms)
  const [timer, setTimer] = useState(60);
  const [stats, setStats] = useState({ cycles: 0, points: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Movement state
  const [currentPointIdx, setCurrentPointIdx] = useState(0);

  // Initial timer and metronome setup
  useEffect(() => {
    let interval: any;
    if (isPlaying && timer > 0) {
      interval = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            setIsPlaying(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timer]);

  // Metronome Beep
  const playTick = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);
    osc.frequency.value = 880;
    gain.gain.value = 0.1;
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.00001, audioCtxRef.current.currentTime + 0.1);
    osc.stop(audioCtxRef.current.currentTime + 0.1);
  };

  // Main movement loop for jump-based exercises (13 Points)
  useEffect(() => {
    if (!isPlaying) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const animate = () => {
      if (!containerRef.current || !dotRef.current) return;
      const container = containerRef.current.getBoundingClientRect();
      const dotSize = 48; // Size of the dot div
      const maxX = container.width - dotSize;
      const maxY = container.height - dotSize;

      // Adjust speed factor for smoother animation across different modes
      const speedFactor = speed * 0.01; // speed is in deciseconds, convert to ~seconds

      timeRef.current += speedFactor;
      const t = timeRef.current;

      let x = 0,
        y = 0;

      switch (mode) {
        case '13_POINT':
          const pIdx = Math.floor(t) % THIRTEEN_SEQUENCE.length;
          // Normalize coordinates from 0-100 to actual pixel values
          x = (THIRTEEN_POINTS[THIRTEEN_SEQUENCE[pIdx]].x / 100) * maxX;
          y = (THIRTEEN_POINTS[THIRTEEN_SEQUENCE[pIdx]].y / 100) * maxY;
          // Play tick only when point changes
          if (Math.floor(t) !== Math.floor(t - speedFactor)) playTick();
          break;
        case 'HOURGLASS':
          // Top Left -> Top Right -> Bottom Right -> Bottom Left -> Top Left
          // This creates a square path, not an hourglass. Let's adjust for hourglass.
          // Hourglass: Top-Left -> Bottom-Right -> Top-Right -> Bottom-Left -> Top-Left
          const hg = t % 4;
          if (hg < 1) {
            // Top-Left to Bottom-Right
            x = hg * maxX;
            y = hg * maxY;
          } else if (hg < 2) {
            // Bottom-Right to Top-Right
            x = maxX;
            y = maxY - (hg - 1) * maxY;
          } else if (hg < 3) {
            // Top-Right to Bottom-Left
            x = maxX - (hg - 2) * maxX;
            y = (hg - 2) * maxY;
          } else {
            // Bottom-Left to Top-Left
            x = 0;
            y = maxY - (hg - 3) * maxY;
          }
          break;
        case 'CIRCULAR':
          // Ponte (Dairesel) Wave
          // Center the circle and make it fit within the container
          const radiusX = maxX / 2;
          const radiusY = maxY / 2;
          const centerX = maxX / 2;
          const centerY = maxY / 2;
          x = centerX + radiusX * Math.cos(t * 0.5); // Slower rotation
          y = centerY + radiusY * Math.sin(t * 0.5);
          break;
        case 'ZIGZAG_VERTICAL':
          // Zigzag: Top-Left -> Top-Right -> Mid-Left -> Mid-Right -> Bottom-Left -> Bottom-Right
          // Let's simplify to a 4-point zigzag for now:
          // Top-Left -> Top-Right -> Bottom-Left -> Bottom-Right -> Top-Left
          const zv = t % 4;
          if (zv < 1) {
            // Top-Left to Top-Right
            x = zv * maxX;
            y = 0;
          } else if (zv < 2) {
            // Top-Right to Bottom-Left
            x = maxX - (zv - 1) * maxX;
            y = (zv - 1) * maxY;
          } else if (zv < 3) {
            // Bottom-Left to Bottom-Right
            x = (zv - 2) * maxX;
            y = maxY;
          } else {
            // Bottom-Right to Top-Left
            x = maxX - (zv - 3) * maxX;
            y = maxY - (zv - 3) * maxY;
          }
          break;
        case 'ZIGZAG_HORIZONTAL':
          // Zigzag: Top-Left -> Bottom-Left -> Top-Right -> Bottom-Right -> Top-Left
          const zh = t % 4;
          if (zh < 1) {
            // Top-Left to Bottom-Left
            x = 0;
            y = zh * maxY;
          } else if (zh < 2) {
            // Bottom-Left to Top-Right
            x = (zh - 1) * maxX;
            y = maxY - (zh - 1) * maxY;
          } else if (zh < 3) {
            // Top-Right to Bottom-Right
            x = maxX;
            y = (zh - 2) * maxY;
          } else {
            // Bottom-Right to Top-Left
            x = maxX - (zh - 3) * maxX;
            y = maxY - (zh - 3) * maxY;
          }
          break;
      }

      // Ensure dot stays within bounds (adjust for dot's own size)
      x = Math.max(0, Math.min(x, maxX));
      y = Math.max(0, Math.min(y, maxY));

      if (!mode.startsWith('OPENING')) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speed, mode]);

  // Timer logic
  useEffect(() => {
    let interval: any;
    if (isPlaying && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timer]);

  const renderThirteenPointPath = () => {
    let pathD = '';
    THIRTEEN_SEQUENCE.forEach((ptIdx, i) => {
      const pt = THIRTEEN_POINTS[ptIdx];
      if (i === 0) pathD += `M${pt.x},${pt.y}`;
      else pathD += ` L${pt.x},${pt.y}`;
    });
    return (
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="0.5" strokeDasharray="2,2" />
        {THIRTEEN_SEQUENCE.map((ptIdx, i) => {
          if (i === 0) return null;
          const prev = THIRTEEN_POINTS[THIRTEEN_SEQUENCE[i - 1]];
          const curr = THIRTEEN_POINTS[ptIdx];
          const midX = (prev.x + curr.x) / 2;
          const midY = (prev.y + curr.y) / 2;
          const angle = (Math.atan2(curr.y - prev.y, curr.x - prev.x) * 180) / Math.PI;
          return (
            <text
              key={i}
              x={midX}
              y={midY}
              fontSize="2"
              fill="currentColor"
              transform={`rotate(${angle}, ${midX}, ${midY})`}
              textAnchor="middle"
            >
              ▶
            </text>
          );
        })}
      </svg>
    );
  };

  const renderHourglassBg = () => (
    <svg
      className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Hourglass path: Top-Left -> Bottom-Right -> Top-Right -> Bottom-Left -> Top-Left */}
      <path
        d="M5,5 L95,95 L95,5 L5,95 Z"
        fill="none"
        stroke="#2563eb"
        strokeWidth="0.5"
        strokeDasharray="2,2"
      />
    </svg>
  );

  const renderZigzagBg = (horizontal: boolean) => (
    <svg
      className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {horizontal ? (
        // Zigzag Horizontal: Top-Left -> Bottom-Left -> Top-Right -> Bottom-Right
        <path
          d="M5,5 L5,95 L95,5 L95,95"
          fill="none"
          stroke="#2563eb"
          strokeWidth="0.5"
          strokeDasharray="2,2"
        />
      ) : (
        // Zigzag Vertical: Top-Left -> Top-Right -> Bottom-Left -> Bottom-Right
        <path
          d="M5,5 L95,5 L5,95 L95,95"
          fill="none"
          stroke="#2563eb"
          strokeWidth="0.5"
          strokeDasharray="2,2"
        />
      )}
    </svg>
  );

  const renderCircularBg = () => (
    <svg
      className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d="M50,5 A45,45 0 1,1 50,95 A45,45 0 1,1 50,5"
        fill="none"
        stroke="#2563eb"
        strokeWidth="0.5"
        strokeDasharray="2,2"
      />
    </svg>
  );

  const renderOverlay = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-100/40 backdrop-blur-[4px] z-50 rounded-[32px] animate-in fade-in duration-500">
      <div className="bg-white p-12 rounded-[40px] shadow-2xl text-slate-800 text-center max-w-xl border border-slate-200/50">
        <div className="w-20 h-20 bg-sky-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">👁️</span>
        </div>
        <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter text-slate-700">
          {mode === '13_POINT'
            ? '13 Nokta Göz Egzersizi'
            : mode === 'CIRCULAR'
              ? 'PONTE: Dairesel Göz Egzersizi'
              : mode.startsWith('OPENING')
                ? 'Açılan Nesneler'
                : 'Göz Egzersizi'}
        </h3>
        <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium px-6">
          M5 Bilişim standartlarına göre optimize edilmiş bu rota, göz kaslarınızın esnekliğini
          artırır. Başınızı oynatmadan mavi noktayı takip edin.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              setIsPlaying(true);
              setTimer(60);
              timeRef.current = 0;
            }}
            className="bg-slate-700 hover:bg-slate-800 text-white px-10 py-4 rounded-2xl font-black uppercase text-sm transition-all shadow-xl hover:-translate-y-1 active:translate-y-0"
          >
            Egzersizi Başlat
          </button>
          <button className="bg-slate-200 hover:bg-slate-300 text-slate-600 px-10 py-4 rounded-2xl font-black uppercase text-sm transition-all">
            Ayarlar
          </button>
        </div>
      </div>
    </div>
  );

  const EMOJIS = ['📦', '💻', '🧪', '🍃', '💼', '🌍', '🛟', '🎁', '🪙', '📖'];

  return (
    <div className="w-full h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      {/* Professional Toolbar */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm z-30">
        <div className="flex items-center gap-6">
          <button
            onClick={onExit}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-all font-black"
          >
            ⬅
          </button>
          <div>
            <h1 className="text-lg font-black text-slate-700 uppercase tracking-tight leading-none mb-1">
              {mode.replace('_', ' ')}
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              HIZLI OKUMA EGZERSİZLERİ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-400 uppercase ml-1 mb-1">Süre</span>
            <select
              value={timer}
              onChange={(e) => setTimer(Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-black text-slate-600 outline-none focus:ring-2 ring-sky-500/20"
            >
              <option value={60}>1:00</option>
              <option value={120}>2:00</option>
            </select>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-400 uppercase ml-1 mb-1">
              Hız (ms)
            </span>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-black text-slate-600 outline-none focus:ring-2 ring-sky-500/20"
            >
              <option value={1}>100ms</option>
              <option value={3}>300ms</option>
              <option value={5}>500ms</option>
              <option value={8}>800ms</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest leading-none mb-1">
              CANLI SÜRE
            </span>
            <div className="bg-slate-800 text-white px-5 py-2 rounded-xl font-mono font-black text-xl shadow-lg border-b-4 border-slate-900">
              {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-100 p-8 flex gap-8">
        {/* Main Exercise Area */}
        <div className="flex-1 h-full bg-slate-300/50 rounded-[48px] border-4 border-white shadow-2xl relative overflow-hidden flex items-center justify-center group">
          {!isPlaying && renderOverlay()}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_100%)] opacity-50" />

          {/* Mode Specifics */}
          {mode === '13_POINT' && (
            <div className="w-full h-full relative p-12">
              {renderThirteenPointPath()}
              {THIRTEEN_POINTS.map((p, i) => (
                <div
                  key={i}
                  className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <div className="w-12 h-12 rounded-full border-2 border-slate-300 bg-white/50 backdrop-blur-sm flex items-center justify-center text-slate-400 text-xs font-black shadow-sm">
                    {i}
                  </div>
                </div>
              ))}
              {isPlaying && (
                <div
                  className="absolute w-12 h-12 bg-sky-500 rounded-full shadow-[0_0_30px_rgba(14,165,233,0.6)] border-4 border-white z-50 transition-all duration-150 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${THIRTEEN_POINTS[THIRTEEN_SEQUENCE[currentPointIdx]].x}%`,
                    top: `${THIRTEEN_POINTS[THIRTEEN_SEQUENCE[currentPointIdx]].y}%`,
                  }}
                />
              )}
            </div>
          )}

          {/* Opening Objects */}
          {mode.startsWith('OPENING') && isPlaying && (
            <div
              className={`flex ${mode === 'OPENING_VERTICAL' ? 'flex-col' : 'flex-row'} gap-4 animate-in zoom-in duration-700`}
            >
              {EMOJIS.map((e, i) => (
                <div
                  key={i}
                  className="w-16 h-16 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center text-3xl shadow-lg transform hover:scale-110 transition-all"
                >
                  {e}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Vertical Sidebar Selector */}
        <div className="w-24 h-full flex flex-col gap-3 py-4">
          {[
            { id: '13_POINT', icon: '🎯', label: '13 Nokta' },
            { id: 'CIRCULAR', icon: '➰', label: 'Ponte' },
            { id: 'HOURGLASS', icon: '⏳', label: 'Kum Saati' },
            { id: 'ZIGZAG_VERTICAL', icon: '↕️', label: 'Dikey Zikzak' },
            { id: 'OPENING_VERTICAL', icon: '📂', label: 'Açılan Dikey' },
            { id: 'OPENING_HORIZONTAL', icon: '📁', label: 'Açılan Yatay' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id as AdvancedMode);
                setIsPlaying(false);
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-3xl transition-all border-2 ${mode === m.id ? 'bg-sky-500 border-white text-white shadow-xl scale-110 z-10' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'}`}
            >
              <span className="text-2xl mb-1">{m.icon}</span>
              <span className="text-[8px] font-black uppercase tracking-tighter text-center leading-none">
                {m.label}
              </span>
            </button>
          ))}
          <div className="mt-auto">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-full aspect-square rounded-3xl flex items-center justify-center text-white text-xl shadow-2xl transition-all active:scale-95 ${isPlaying ? 'bg-rose-500' : 'bg-emerald-500'}`}
            >
              {isPlaying ? '⏹️' : '▶️'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedEyeExercises;

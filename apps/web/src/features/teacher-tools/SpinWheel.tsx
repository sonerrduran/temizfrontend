import React, { useState, useRef, useEffect } from 'react';

interface Props {
  onExit: () => void;
}

const SEGMENT_COLORS = [
  '#6366f1',
  '#f43f5e',
  '#10b981',
  '#f59e0b',
  '#3b82f6',
  '#ec4899',
  '#14b8a6',
  '#f97316',
  '#8b5cf6',
  '#22c55e',
  '#ef4444',
  '#06b6d4',
];

const SpinWheel: React.FC<Props> = ({ onExit }) => {
  const [items, setItems] = useState([
    'Ahmet',
    'Ayşe',
    'Mehmet',
    'Fatma',
    'Ali',
    'Zeynep',
    'Can',
    'Selin',
  ]);
  const [inputText, setInputText] = useState(items.join('\n'));
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [showWinner, setShowWinner] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  const drawWheel = (angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas || items.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const size = canvas.width;
    const cx = size / 2,
      cy = size / 2,
      r = size / 2 - 8;
    const arc = (2 * Math.PI) / items.length;

    ctx.clearRect(0, 0, size, size);

    items.forEach((item, i) => {
      const start = angle + i * arc;
      const end = start + arc;
      // Segment
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();
      ctx.fillStyle = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(start + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${Math.min(16, 120 / items.length)}px Inter, sans-serif`;
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 4;
      const label = item.length > 10 ? item.slice(0, 10) + '…' : item;
      ctx.fillText(label, r - 12, 5);
      ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(cx, cy, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#1e1b4b';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Pointer (top)
    ctx.beginPath();
    ctx.moveTo(cx - 12, 0);
    ctx.lineTo(cx + 12, 0);
    ctx.lineTo(cx, 32);
    ctx.closePath();
    ctx.fillStyle = '#fbbf24';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
  };

  useEffect(() => {
    drawWheel(currentAngle);
  }, [items, currentAngle]);

  const spin = () => {
    if (isSpinning || items.length < 2) return;
    setIsSpinning(true);
    setShowWinner(false);
    setWinner(null);

    const extraSpins = 5 + Math.floor(Math.random() * 5); // 5-10 full spins
    const extraAngle = Math.random() * 2 * Math.PI;
    const totalAngle = extraSpins * 2 * Math.PI + extraAngle;
    const duration = 3000 + Math.random() * 1500;
    const startTime = performance.now();
    const startAngle = currentAngle;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 4);
      const angle = startAngle + totalAngle * eased;
      setCurrentAngle(angle);
      drawWheel(angle);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        // Calculate winner: pointer is at top (angle = 0), find which segment is there
        const norm = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const arc = (2 * Math.PI) / items.length;
        // Pointer at top = angle 0 in canvas coords = π/2 offset
        const pointerAngle = (2 * Math.PI - norm) % (2 * Math.PI);
        const idx = Math.floor(pointerAngle / arc) % items.length;
        setWinner(items[idx]);
        setShowWinner(true);
      }
    };
    animRef.current = requestAnimationFrame(animate);
  };

  const applyEdit = () => {
    const list = inputText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    if (list.length >= 2) setItems(list);
    setShowEdit(false);
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] w-full p-4 relative">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onExit}
          className="px-6 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-2 border border-slate-700 font-bold"
        >
          <span>⬅</span> Çıkış
        </button>
      </div>

      <div className="w-full max-w-4xl mt-14 md:mt-0 flex flex-col md:flex-row items-center gap-8">
        {/* Wheel */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={340}
              height={340}
              className="rounded-full shadow-2xl shadow-indigo-500/30"
            />
          </div>
          <button
            onClick={spin}
            disabled={isSpinning || items.length < 2}
            className={`px-16 py-4 rounded-full font-black text-2xl shadow-xl transition-all ${isSpinning ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:-translate-y-1 hover:shadow-indigo-500/40'}`}
          >
            {isSpinning ? 'DÖNÜYOR...' : '🎯 ÇEVİR!'}
          </button>
        </div>

        {/* Right */}
        <div className="flex-1 flex flex-col gap-4 w-full">
          {/* Winner Banner */}
          {showWinner && winner && (
            <div className="bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-400/40 rounded-2xl p-6 text-center animate-bounce">
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-white/50 text-sm font-bold mb-1">Seçilen</p>
              <p className="text-yellow-300 text-4xl font-black">{winner}</p>
            </div>
          )}

          {/* Items list */}
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white font-black text-sm">{items.length} Kişi / Seçenek</h3>
              <button
                onClick={() => setShowEdit(!showEdit)}
                className="text-white/50 text-xs font-bold hover:text-white transition-colors"
              >
                {showEdit ? '💾 Kaydet' : '✏️ Düzenle'}
              </button>
            </div>

            {showEdit ? (
              <>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={8}
                  className="w-full bg-slate-950 text-white p-3 rounded-xl border border-white/10 focus:border-indigo-500 outline-none resize-none text-sm font-medium"
                  placeholder="Her satıra bir isim yazın..."
                />
                <button
                  onClick={applyEdit}
                  className="mt-2 w-full py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl font-bold text-sm transition-all"
                >
                  ✅ Listeyi Güncelle
                </button>
              </>
            ) : (
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                {items.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-white text-xs font-bold"
                    style={{
                      background: SEGMENT_COLORS[i % SEGMENT_COLORS.length] + '33',
                      border: `1px solid ${SEGMENT_COLORS[i % SEGMENT_COLORS.length]}55`,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinWheel;

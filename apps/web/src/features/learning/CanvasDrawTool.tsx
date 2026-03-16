import React, { useRef, useState, useEffect } from 'react';

const CanvasDrawTool: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ffffff');
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-4 text-white">
      <div className="w-full max-w-5xl bg-slate-900/80 backdrop-blur-3xl rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <h3 className="font-black tracking-widest text-[10px] uppercase mb-2 opacity-40">
            DİJİTAL SANAT ATÖLYESİ
          </h3>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">
            Yaratıcı Çizim Deneyimi
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Tools */}
          <div className="lg:w-32 flex lg:flex-col gap-4 justify-center">
            {['#ffffff', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'].map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl border-2 transition-all hover:scale-110 active:scale-90 ${color === c ? 'border-white scale-110 shadow-lg' : 'border-transparent'}`}
                style={{ backgroundColor: c }}
              />
            ))}
            <div className="h-px bg-white/10 my-2 hidden lg:block" />
            <button
              onClick={clearCanvas}
              className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all text-xl"
              title="Temizle"
            >
              🗑️
            </button>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 bg-white/5 rounded-[32px] border border-white/10 overflow-hidden relative cursor-crosshair h-[400px] md:h-[500px]">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full h-full"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
          <div className="flex items-center gap-4 w-full md:w-64">
            <span className="text-[10px] font-black uppercase opacity-40">FIRÇA</span>
            <input
              type="range"
              min="1"
              max="50"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="flex-1 accent-indigo-500"
            />
          </div>
          <div className="bg-indigo-500/20 text-indigo-300 px-6 py-3 rounded-2xl font-black text-[10px] uppercase border border-indigo-500/20">
            🎨 HAYAL GÜCÜNÜ SERBEST BIRAK
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasDrawTool;

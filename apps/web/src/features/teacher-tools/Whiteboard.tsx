import React, { useRef, useState, useEffect, useCallback } from 'react';

interface Props {
  onExit: () => void;
}

type Tool = 'PEN' | 'ERASER' | 'LINE' | 'RECTANGLE' | 'CIRCLE' | 'ARROW' | 'TEXT';

interface Point {
  x: number;
  y: number;
}

interface TextElement {
  text: string;
  x: number;
  y: number;
  color: string;
  font: string;
}

const Whiteboard: React.FC<Props> = ({ onExit }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [tool, setTool] = useState<Tool>('PEN');
  const [color, setColor] = useState<string>('#000000'); // Default to black on white background
  const [lineWidth, setLineWidth] = useState<number>(3);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPoint, setStartPoint] = useState<Point>({ x: 0, y: 0 });

  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyStep, setHistoryStep] = useState<number>(-1);
  const [showTextPrompt, setShowTextPrompt] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [textPos, setTextPos] = useState<Point>({ x: 0, y: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  const colors = [
    '#ffffff',
    '#ef4444',
    '#f97316',
    '#eab308',
    '#22c55e',
    '#0ea5e9',
    '#6366f1',
    '#a855f7',
    '#ec4899',
    '#000000',
  ];
  const widths = [1, 3, 5, 8, 12, 20];

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set proper resolution for high DPI displays
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        // Sadece ilk seferde veya pencere boyutu değiştiğinde
        if (canvas.width !== rect.width || canvas.height !== rect.height) {
          // If we have history, we need to save it before resize
          let savedImageData: ImageData | null = null;
          if (canvas.width > 0 && canvas.height > 0) {
            savedImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          }

          canvas.width = rect.width;
          canvas.height = rect.height;

          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          // Fill with white
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          if (savedImageData) {
            ctx.putImageData(savedImageData, 0, 0);
          } else {
            saveState();
          }
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);

    setHistory((prev) => {
      const newHistory = prev.slice(0, historyStep + 1);
      newHistory.push(data);
      setHistoryStep(newHistory.length - 1);
      return newHistory;
    });
  }, [historyStep]);

  const undo = () => {
    if (historyStep > 0) {
      setHistoryStep((prev) => prev - 1);
      drawFromHistory(historyStep - 1);
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      setHistoryStep((prev) => prev + 1);
      drawFromHistory(historyStep + 1);
    }
  };

  const drawFromHistory = (step: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (history[step]) {
      ctx.putImageData(history[step], 0, 0);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `beyaz-tahta-${new Date().getTime()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();

    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    // If text prompt is open, ignore clicks on canvas to avoid confusing behavior
    // let text handle it
    if (showTextPrompt) return;

    const { x, y } = getCoordinates(e);

    if (tool === 'TEXT') {
      setTextPos({ x, y });
      setShowTextPrompt(true);
      setTimeout(() => inputRef.current?.focus(), 50);
      return;
    }

    setIsDrawing(true);
    setStartPoint({ x, y });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);

    if (tool === 'PEN' || tool === 'ERASER') {
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = tool === 'ERASER' ? '#ffffff' : color;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const addText = () => {
    if (!textInput.trim()) {
      setShowTextPrompt(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = color;
    ctx.font = `${lineWidth * 5 + 10}px 'Inter', sans-serif`;
    ctx.textBaseline = 'top';
    ctx.fillText(textInput, textPos.x, textPos.y);

    saveState();
    setTextInput('');
    setShowTextPrompt(false);
  };

  const handleTextKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addText();
    } else if (e.key === 'Escape') {
      setShowTextPrompt(false);
      setTextInput('');
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;

    e.preventDefault(); // Prevent scrolling on touch

    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (tool === 'PEN' || tool === 'ERASER') {
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = tool === 'ERASER' ? '#ffffff' : color;
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      // For shapes, we need to redraw the canvas from the last state, then draw the shape on top
      drawFromHistory(historyStep);

      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;

      if (tool === 'LINE') {
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(x, y);
      } else if (tool === 'RECTANGLE') {
        ctx.rect(startPoint.x, startPoint.y, x - startPoint.x, y - startPoint.y);
      } else if (tool === 'CIRCLE') {
        const radius = Math.sqrt(Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2));
        ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
      } else if (tool === 'ARROW') {
        const headlen = 15 + lineWidth; // length of head in pixels
        const dx = x - startPoint.x;
        const dy = y - startPoint.y;
        const angle = Math.atan2(dy, dx);

        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(x, y);
        ctx.lineTo(
          x - headlen * Math.cos(angle - Math.PI / 6),
          y - headlen * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(x, y);
        ctx.lineTo(
          x - headlen * Math.cos(angle + Math.PI / 6),
          y - headlen * Math.sin(angle + Math.PI / 6)
        );
      }

      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.closePath();
    setIsDrawing(false);
    saveState();
  };

  return (
    <div
      className="w-full h-screen max-w-7xl mx-auto flex flex-col p-2 pt-4 pb-6 md:p-6"
      ref={containerRef}
    >
      {/* Header section */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onExit}
            className="px-4 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-2 border border-slate-700"
          >
            <span>⬅</span> Çıkış
          </button>
          <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3">
            <span className="text-3xl">✏️</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400">
              Beyaz Tahta
            </span>
          </h2>
        </div>

        {/* Actions (Undo/Redo/Download) */}
        <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={undo}
            disabled={historyStep <= 0}
            className={`p-2 rounded-xl transition-all ${historyStep > 0 ? 'hover:bg-slate-700 text-white' : 'opacity-30 text-white cursor-not-allowed'}`}
            title="Geri Al"
          >
            ↩️
          </button>
          <button
            onClick={redo}
            disabled={historyStep >= history.length - 1}
            className={`p-2 rounded-xl transition-all ${historyStep < history.length - 1 ? 'hover:bg-slate-700 text-white' : 'opacity-30 text-white cursor-not-allowed'}`}
            title="İleri Al"
          >
            ↪️
          </button>
          <div className="w-px h-6 bg-slate-700 mx-1"></div>
          <button
            onClick={clearCanvas}
            className="p-2 hover:bg-red-500/20 text-red-400 rounded-xl transition-all"
            title="Temizle"
          >
            🗑️
          </button>
          <button
            onClick={handleDownload}
            className="p-2 hover:bg-emerald-500/20 text-emerald-400 rounded-xl transition-all"
            title="İndir"
          >
            💾
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Tools */}
        <div className="flex gap-1.5 bg-slate-800/80 backdrop-blur-md p-2 rounded-2xl border border-slate-700 overflow-x-auto custom-scrollbar flex-shrink-0">
          {[
            { id: 'PEN', icon: '✏️', label: 'Kalem' },
            { id: 'ERASER', icon: '🧽', label: 'Silgi' },
            { id: 'LINE', icon: '➖', label: 'Çizgi' },
            { id: 'RECTANGLE', icon: '⬜', label: 'Kutu' },
            { id: 'CIRCLE', icon: '⭕', label: 'Daire' },
            { id: 'ARROW', icon: '↗️', label: 'Ok' },
            { id: 'TEXT', icon: 'T', label: 'Metin' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTool(t.id as Tool)}
              className={`flex flex-col items-center justify-center p-2 min-w-[3.5rem] rounded-xl transition-all ${tool === t.id ? 'bg-teal-500 shadow-lg text-white scale-105' : 'hover:bg-slate-700 text-slate-300'}`}
            >
              <span className="text-xl mb-1">{t.icon}</span>
              <span className="text-[10px] font-bold">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Properties (Color & Width) */}
        <div className="flex-1 flex items-center gap-4 bg-slate-800/80 backdrop-blur-md p-2 px-4 rounded-2xl border border-slate-700 overflow-x-auto custom-scrollbar">
          {/* Colors */}
          <div className="flex gap-2 border-r border-slate-700 pr-4">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full transition-all border-2 ${color === c ? 'scale-125 border-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'border-transparent hover:scale-110'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          {/* Line Width */}
          <div className="flex items-center gap-3 pl-2">
            <span className="text-xs text-slate-400 font-medium">Kalınlık:</span>
            {widths.map((w) => (
              <button
                key={w}
                onClick={() => setLineWidth(w)}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${lineWidth === w ? 'bg-slate-600' : 'hover:bg-slate-700'}`}
              >
                <div
                  className="bg-white rounded-full transition-all"
                  style={{
                    width: `${Math.max(4, w)}px`,
                    height: `${Math.max(4, w)}px`,
                    backgroundColor: tool === 'ERASER' ? '#cbd5e1' : color,
                    boxShadow: lineWidth === w ? '0 0 5px rgba(255,255,255,0.5)' : 'none',
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 w-full bg-white rounded-[32px] overflow-hidden border-2 border-slate-700 shadow-2xl relative shadow-teal-900/20">
        <canvas
          ref={canvasRef}
          className={`block w-full h-full ${tool === 'ERASER' ? 'cursor-[url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA8SURBVDhPY/iPDAwM/xjA2EwgZkSjYdSAYdSAQWggG6hOAxSgGzXAgEagGjVAwKAB1KgBBlLDCAMDAwMDALwGDRY0uQAAAAAASUVORK5CYII=)_10_10,auto]' : tool === 'TEXT' ? 'cursor-text' : 'cursor-crosshair'}`}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        {showTextPrompt && (
          <div
            className="absolute z-10 p-2 bg-slate-800/90 backdrop-blur-md rounded-xl border border-teal-500 shadow-2xl animate-in zoom-in duration-200"
            style={{
              left: `${Math.min(textPos.x, (canvasRef.current?.offsetWidth || window.innerWidth) - 200)}px`,
              top: `${Math.min(textPos.y, (canvasRef.current?.offsetHeight || window.innerHeight) - 50)}px`,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              autoFocus
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={handleTextKeyDown}
              placeholder="Metin yazın (Enter ile bitir)"
              className="bg-transparent border-none outline-none text-white w-48 placeholder:text-slate-400"
              style={{
                color,
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            />
            <div className="text-[9px] text-teal-400 mt-1 flex justify-between">
              <span>Kaydet: Enter</span>
              <span>İptal: Esc</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Whiteboard;

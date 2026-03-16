import React, { useState } from 'react';

interface Node {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
}

const MindMapTool: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [inputText, setInputText] = useState('');
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const addNode = () => {
    if (!inputText.trim()) return;
    const newNode: Node = {
      id: Date.now(),
      text: inputText,
      x: 50 + Math.random() * 20,
      y: 50 + Math.random() * 20,
      color: ['bg-rose-500', 'bg-cyan-500', 'bg-indigo-500', 'bg-emerald-500', 'bg-amber-500'][
        Math.floor(Math.random() * 5)
      ],
    };
    setNodes([...nodes, newNode]);
    setInputText('');
  };

  const deleteNode = (id: number) => {
    setNodes(nodes.filter((n) => n.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-4 text-white">
      <div className="w-full max-w-5xl bg-slate-900/80 backdrop-blur-3xl rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl flex flex-col h-[700px]">
        <div className="text-center mb-8">
          <h3 className="font-black tracking-widest text-xs uppercase mb-2 opacity-40">
            GÖRSEL HAFIZA HARİTASI
          </h3>
          <h2 className="text-3xl font-black">Zihin Haritanı Oluştur</h2>
        </div>

        <div className="flex gap-4 mb-8">
          <input
            type="text"
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-bold"
            placeholder="Yeni bir kavram ekle..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addNode()}
          />
          <button
            onClick={addNode}
            className="bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-2xl font-black transition-all shadow-xl active:scale-95"
          >
            EKLE +
          </button>
        </div>

        <div className="flex-1 bg-black/30 rounded-[32px] border border-white/5 relative overflow-hidden cursor-crosshair">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          ></div>

          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-white/20 font-black text-xl uppercase italic tracking-widest">
                Henüz bir kavram yok. Yukarıdan ekle!
              </p>
            </div>
          )}

          {nodes.map((node) => (
            <div
              key={node.id}
              className={`absolute px-6 py-3 rounded-2xl shadow-2xl cursor-move select-none animate-in zoom-in duration-300 flex items-center gap-3 border border-white/20 ${node.color}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseDown={(e) => {
                // Basic mobile-unfriendly drag simulation for demo
                const startX = e.clientX;
                const startY = e.clientY;
                const initialX = node.x;
                const initialY = node.y;

                const moveHandler = (moveEvent: MouseEvent) => {
                  const dx = ((moveEvent.clientX - startX) / window.innerWidth) * 100;
                  const dy = ((moveEvent.clientY - startY) / window.innerHeight) * 100;
                  setNodes((curr) =>
                    curr.map((n) =>
                      n.id === node.id ? { ...n, x: initialX + dx, y: initialY + dy } : n
                    )
                  );
                };

                const upHandler = () => {
                  document.removeEventListener('mousemove', moveHandler);
                  document.removeEventListener('mouseup', upHandler);
                };

                document.addEventListener('mousemove', moveHandler);
                document.addEventListener('mouseup', upHandler);
              }}
            >
              <span className="font-black text-sm whitespace-nowrap">{node.text}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNode(node.id);
                }}
                className="w-5 h-5 bg-black/20 hover:bg-black/40 rounded-full text-[10px] flex items-center justify-center transition-all"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-[10px] font-black opacity-30 uppercase tracking-widest italic">
          Kavramları istediğin yerlere sürükleyerek görsel bir yapı oluşturabilirsin.
        </p>
      </div>
    </div>
  );
};

export default MindMapTool;

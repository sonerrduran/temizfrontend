import React, { useState, useRef, useEffect } from 'react';

interface Props {
  onExit: () => void;
}

interface Note {
  id: string;
  text: string;
  color: string;
  x: number;
  y: number;
  isEditing: boolean;
}

const COLORS = [
  'bg-yellow-200 text-yellow-900', // Classic yellow
  'bg-rose-200 text-rose-900', // Pink
  'bg-emerald-200 text-emerald-900', // Green
  'bg-cyan-200 text-cyan-900', // Blue
  'bg-amber-200 text-amber-900', // Orange
  'bg-purple-200 text-purple-900', // Purple
];

const StickyNotes: React.FC<Props> = ({ onExit }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);

  // Dragging state
  const [draggedNoteId, setDraggedNoteId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const addNote = () => {
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      text: '',
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      x: Math.random() * 200 + 50,
      y: Math.random() * 200 + 50,
      isEditing: true,
    };
    setNotes([...notes, newNote]);
  };

  const updateNoteText = (id: string, newText: string) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, text: newText } : n)));
  };

  const toggleEditNote = (id: string, editing: boolean) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, isEditing: editing } : n)));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const changeColor = (id: string, color: string) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, color } : n)));
  };

  // Dragging logic
  const handlePointerDown = (e: React.PointerEvent, note: Note) => {
    if (note.isEditing) return; // Don't drag while editing text

    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    const rect = target.getBoundingClientRect();
    const boardRect = boardRef.current?.getBoundingClientRect();

    if (!boardRect) return;

    setDraggedNoteId(note.id);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggedNoteId || !boardRef.current) return;

    const boardRect = boardRef.current.getBoundingClientRect();

    let newX = e.clientX - boardRect.left - dragOffset.x;
    let newY = e.clientY - boardRect.top - dragOffset.y;

    // Keep within bounds roughly
    newX = Math.max(0, Math.min(newX, boardRect.width - 250)); // 250 is approx max note width
    newY = Math.max(0, Math.min(newY, boardRect.height - 250));

    setNotes(notes.map((n) => (n.id === draggedNoteId ? { ...n, x: newX, y: newY } : n)));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!draggedNoteId) return;
    const target = e.currentTarget as HTMLElement;
    target.releasePointerCapture(e.pointerId);
    setDraggedNoteId(null);
  };

  return (
    <div className="flex flex-col min-h-[85vh] w-full p-4 relative">
      <div className="absolute top-4 left-4 z-20 flex gap-4">
        <button
          onClick={onExit}
          className="px-6 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-2 border border-slate-700 font-bold shadow-lg"
        >
          <span>⬅</span> Çıkış
        </button>
        <button
          onClick={addNote}
          className="px-6 py-2 bg-yellow-400 text-yellow-900 rounded-xl hover:bg-yellow-300 transition-colors flex items-center gap-2 font-black shadow-lg hover:scale-105"
        >
          + YENİ NOT EKLE
        </button>
      </div>

      <div
        ref={boardRef}
        className="flex-1 bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')] bg-yellow-900/30 rounded-[40px] shadow-[inset_0_30px_50px_rgba(0,0,0,0.5)] border-8 border-stone-800 relative overflow-hidden touching-none mt-16 md:mt-0"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {notes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
            <span className="text-4xl font-black text-white mix-blend-overlay">
              📌 Sol üstten yeni not ekleyin
            </span>
          </div>
        )}

        {notes.map((note) => (
          <div
            key={note.id}
            className={`absolute w-64 min-h-64 p-6 shadow-2xl transition-transform duration-150 ${note.color} ${draggedNoteId === note.id ? 'scale-105 z-50 cursor-grabbing' : 'cursor-grab hover:scale-105 z-10'}`}
            style={{
              left: note.x,
              top: note.y,
              transform: `rotate(${(parseInt(note.id, 36) % 6) - 3}deg) ${draggedNoteId === note.id ? 'scale(1.05)' : ''}`, // Random slight rotation
              boxShadow: '4px 8px 15px rgba(0,0,0,0.3), inset 0 0 40px rgba(0,0,0,0.05)',
            }}
            onPointerDown={(e) => handlePointerDown(e, note)}
          >
            {/* Pin Graphic */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-red-500 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.5),2px_4px_6px_rgba(0,0,0,0.5)] z-20">
              <div className="w-2 h-2 rounded-full bg-white/50 m-1"></div>
            </div>

            {/* Actions */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 hover:opacity-100 transition-opacity z-20">
              <div className="group relative">
                <button className="w-6 h-6 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center text-xs">
                  🎨
                </button>
                <div className="absolute right-0 top-full mt-1 bg-white p-2 rounded-xl shadow-xl flex gap-1 hidden group-hover:flex">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => changeColor(note.id, c)}
                      className={`w-6 h-6 rounded-full border-2 ${note.color === c ? 'border-black' : 'border-transparent'} ${c.split(' ')[0]}`}
                    ></button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => deleteNote(note.id)}
                className="w-6 h-6 bg-red-500/20 hover:bg-red-500/40 rounded-full flex items-center justify-center text-red-900 font-bold text-xs"
              >
                ×
              </button>
            </div>

            {/* Content */}
            {note.isEditing ? (
              <textarea
                autoFocus
                value={note.text}
                onChange={(e) => updateNoteText(note.id, e.target.value)}
                onBlur={() => toggleEditNote(note.id, false)}
                className="w-full h-full bg-transparent outline-none resize-none font-medium custom-scrollbar mt-4"
                placeholder="Notunuzu buraya yazın..."
                style={{ fontFamily: "'Indie Flower', 'Comic Sans MS', cursive" }}
              />
            ) : (
              <div
                className="w-full h-full cursor-text mt-4 whitespace-pre-wrap overflow-hidden"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEditNote(note.id, true);
                }}
                style={{ fontFamily: "'Indie Flower', 'Comic Sans MS', cursive" }}
              >
                {note.text || (
                  <span className="opacity-50 italic">Boş not (düzenlemek için tıkla)</span>
                )}
              </div>
            )}

            {/* Folded corner effect */}
            <div
              className={`absolute bottom-0 right-0 w-8 h-8 rounded-tl-xl shadow-[-2px_-2px_4px_rgba(0,0,0,0.1)] bg-black/5`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickyNotes;

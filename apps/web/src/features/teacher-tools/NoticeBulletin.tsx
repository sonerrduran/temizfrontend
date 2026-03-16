import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

type NoteColor = 'yellow' | 'blue' | 'green' | 'pink' | 'orange' | 'purple';

interface Note {
  id: number;
  title: string;
  body: string;
  color: NoteColor;
  pinned: boolean;
  createdAt: string;
}

const COLOR_STYLES: Record<NoteColor, { bg: string; border: string; title: string }> = {
  yellow: { bg: 'bg-yellow-400/15', border: 'border-yellow-400/30', title: 'text-yellow-300' },
  blue: { bg: 'bg-blue-500/15', border: 'border-blue-500/30', title: 'text-blue-300' },
  green: { bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', title: 'text-emerald-300' },
  pink: { bg: 'bg-pink-500/15', border: 'border-pink-500/30', title: 'text-pink-300' },
  orange: { bg: 'bg-orange-500/15', border: 'border-orange-500/30', title: 'text-orange-300' },
  purple: { bg: 'bg-purple-500/15', border: 'border-purple-500/30', title: 'text-purple-300' },
};

let nextId = 5;

const SAMPLE_NOTES: Note[] = [
  {
    id: 1,
    title: '📅 Bu Hafta Sınav',
    body: '5 Mart Çarşamba günü Matematik sınavı var. Kesirler ve ondalık sayılar konularını tekrar edin.',
    color: 'pink',
    pinned: true,
    createdAt: '5 Mar',
  },
  {
    id: 2,
    title: '🏃 Spor Günü',
    body: '7 Mart Cuma günü okul spor günü. Spor kıyafeti getirilmesi zorunludur.',
    color: 'blue',
    pinned: false,
    createdAt: '5 Mar',
  },
  {
    id: 3,
    title: '📚 Ödev Hatırlatması',
    body: 'Haftalık okuma ödevi Cuma gününe kadar teslim edilecek.',
    color: 'yellow',
    pinned: false,
    createdAt: '4 Mar',
  },
];

const NoticeBulletin: React.FC<Props> = ({ onExit }) => {
  const [notes, setNotes] = useState<Note[]>(SAMPLE_NOTES);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', body: '', color: 'yellow' as NoteColor });

  const addNote = () => {
    if (!form.title.trim() && !form.body.trim()) return;
    const now = new Date();
    const date = `${now.getDate()} ${['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'][now.getMonth()]}`;
    setNotes((prev) => [{ id: nextId++, ...form, pinned: false, createdAt: date }, ...prev]);
    setForm({ title: '', body: '', color: 'yellow' });
    setShowForm(false);
  };

  const togglePin = (id: number) =>
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  const deleteNote = (id: number) => setNotes((prev) => prev.filter((n) => n.id !== id));

  const sorted = [...notes].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

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

      <div className="w-full max-w-4xl mt-14 md:mt-4">
        <div className="bg-slate-900/80 backdrop-blur-xl p-6 md:p-8 rounded-[40px] shadow-2xl border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-black text-amber-400 italic">Duyuru Panosu</h2>
              <p className="text-white/40 text-sm">
                {notes.length} duyuru · {notes.filter((n) => n.pinned).length} sabit
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-white rounded-xl font-bold text-sm transition-all"
            >
              {showForm ? '✕ İptal' : '➕ Duyuru Ekle'}
            </button>
          </div>

          {/* Add Form */}
          {showForm && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Başlık (emoji ile başlayabilirsiniz!)"
                className="w-full bg-slate-950 text-white p-3 rounded-xl border border-white/10 focus:border-amber-500 outline-none mb-3"
              />
              <textarea
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                placeholder="Duyuru içeriği..."
                rows={3}
                className="w-full bg-slate-950 text-white p-3 rounded-xl border border-white/10 focus:border-amber-500 outline-none resize-none mb-3"
              />
              <div className="flex items-center gap-3 mb-3">
                <span className="text-white/50 text-sm font-bold">Renk:</span>
                {(Object.keys(COLOR_STYLES) as NoteColor[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setForm((f) => ({ ...f, color: c }))}
                    className={`w-7 h-7 rounded-lg border-2 transition-all ${COLOR_STYLES[c].bg} ${form.color === c ? 'border-white scale-125' : 'border-transparent'}`}
                  />
                ))}
              </div>
              <button
                onClick={addNote}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-white rounded-xl font-black text-sm transition-all"
              >
                📌 Duyuruyu Ekle
              </button>
            </div>
          )}

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sorted.map((note) => {
              const style = COLOR_STYLES[note.color];
              return (
                <div
                  key={note.id}
                  className={`${style.bg} ${style.border} border rounded-2xl p-5 group relative transition-all hover:scale-[1.02]`}
                >
                  {note.pinned && (
                    <div className="absolute -top-2 -right-2 text-lg rotate-12">📌</div>
                  )}
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`font-black text-sm ${style.title} flex-1 pr-2`}>
                      {note.title}
                    </h3>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button
                        onClick={() => togglePin(note.id)}
                        className="w-7 h-7 rounded-lg bg-white/5 text-white/40 hover:text-white text-xs flex items-center justify-center transition-all"
                      >
                        {note.pinned ? '📌' : '📍'}
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="w-7 h-7 rounded-lg bg-white/5 text-white/40 hover:text-red-400 text-xs flex items-center justify-center transition-all"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">{note.body}</p>
                  <p className="text-white/25 text-[10px] mt-3">{note.createdAt}</p>
                </div>
              );
            })}

            {notes.length === 0 && (
              <div className="col-span-2 text-center py-12">
                <div className="text-5xl mb-2">📋</div>
                <p className="text-white/30">Henüz duyuru yok.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBulletin;

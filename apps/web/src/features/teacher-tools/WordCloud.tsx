import React, { useState, useMemo } from 'react';

interface Props {
  onExit: () => void;
}

interface Word {
  text: string;
  count: number;
}

const COLORS = [
  'text-cyan-400',
  'text-blue-400',
  'text-purple-400',
  'text-pink-400',
  'text-rose-400',
  'text-amber-400',
  'text-emerald-400',
  'text-indigo-400',
  'text-fuchsia-400',
  'text-teal-400',
  'text-orange-400',
  'text-lime-400',
  'text-yellow-400',
  'text-violet-400',
  'text-sky-400',
  'text-red-400',
];

const WordCloud: React.FC<Props> = ({ onExit }) => {
  const [inputText, setInputText] = useState('');
  const [words, setWords] = useState<Word[]>([]);
  const [showInput, setShowInput] = useState(true);

  const addWord = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    setWords((prev) => {
      const existing = prev.find((w) => w.text.toLowerCase() === trimmed.toLowerCase());
      if (existing) {
        return prev.map((w) =>
          w.text.toLowerCase() === trimmed.toLowerCase() ? { ...w, count: w.count + 1 } : w
        );
      }
      return [...prev, { text: trimmed, count: 1 }];
    });
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addWord();
    }
  };

  const clearAll = () => setWords([]);

  const maxCount = useMemo(() => Math.max(...words.map((w) => w.count), 1), [words]);

  const getSize = (count: number) => {
    const ratio = count / maxCount;
    if (ratio > 0.8) return 'text-5xl md:text-7xl';
    if (ratio > 0.6) return 'text-4xl md:text-5xl';
    if (ratio > 0.4) return 'text-3xl md:text-4xl';
    if (ratio > 0.2) return 'text-2xl md:text-3xl';
    return 'text-xl md:text-2xl';
  };

  // Shuffle words for display
  const shuffledWords = useMemo(() => {
    const sorted = [...words].sort((a, b) => b.count - a.count);
    // Interleave big and small for visual variety
    const result: Word[] = [];
    const mid = Math.ceil(sorted.length / 2);
    for (let i = 0; i < mid; i++) {
      result.push(sorted[i]);
      if (i + mid < sorted.length) result.push(sorted[i + mid]);
    }
    return result;
  }, [words]);

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

      <div className="bg-slate-900/80 backdrop-blur-xl p-6 md:p-8 rounded-[40px] shadow-2xl border border-white/10 w-full max-w-4xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-cyan-400 italic mb-1">Kelime Bulutu</h2>
          <p className="text-white/40 text-sm">Öğrencilerden kelimeler toplayın, bulut oluşsun!</p>
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-slate-950 text-white p-4 rounded-2xl border border-white/10 focus:border-cyan-500 outline-none font-bold text-lg"
            placeholder="Bir kelime yazın ve Enter'a basın..."
            autoFocus
          />
          <button
            onClick={addWord}
            className="px-6 bg-cyan-500 hover:bg-cyan-400 text-white rounded-2xl font-black text-lg transition-all shadow-lg"
          >
            +
          </button>
        </div>

        {/* Cloud Display */}
        <div className="bg-slate-950/50 rounded-3xl border border-white/5 p-8 min-h-[300px] md:min-h-[400px] flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-4">
          {words.length === 0 ? (
            <p className="text-white/20 font-bold text-lg">Kelimeler burada görünecek...</p>
          ) : (
            shuffledWords.map((word, i) => (
              <span
                key={word.text}
                className={`${getSize(word.count)} ${COLORS[i % COLORS.length]} font-black transition-all duration-300 hover:scale-110 cursor-default select-none`}
                style={{
                  transform: `rotate(${((i % 5) - 2) * 3}deg)`,
                  opacity: 0.6 + (word.count / maxCount) * 0.4,
                }}
                title={`${word.text}: ${word.count} kez`}
              >
                {word.text}
              </span>
            ))
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4 text-sm text-white/40">
            <span>💬 {words.length} kelime</span>
            <span>📊 {words.reduce((s, w) => s + w.count, 0)} toplam giriş</span>
          </div>
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-slate-800 text-white/50 rounded-xl text-sm font-bold hover:bg-slate-700 hover:text-white transition-all"
          >
            🗑️ Temizle
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordCloud;

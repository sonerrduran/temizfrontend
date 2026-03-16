import React, { useState, useEffect } from 'react';
import { GameMode, UserStats } from '../../types';

// Mock reading texts
const READING_TEXTS = [
  {
    id: 1,
    title: 'Örnek Metin',
    content:
      'Kelime gruplama egzersizi için örnek metin. Kelimeleri gruplar halinde okuyarak hızınızı artırın.',
    difficulty: 'easy',
  },
];

interface WordGroupingExerciseProps {
  stats: UserStats;
  setMode: (mode: GameMode) => void;
}

const WordGroupingExercise: React.FC<WordGroupingExerciseProps> = ({ stats, setMode }) => {
  const [groupSize, setGroupSize] = useState(2);
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    // Load text and prep
    const textStr = READING_TEXTS[0].content;
    const wordArray = textStr.split(/\s+/).filter((w) => w.trim() !== '');
    setWords(wordArray);
  }, []);

  const renderGroupedText = () => {
    const groups = [];
    for (let i = 0; i < words.length; i += groupSize) {
      groups.push(words.slice(i, i + groupSize).join(' '));
    }

    return groups.map((group, idx) => (
      <span
        key={idx}
        className="inline-block px-2 py-1 m-1 bg-white/5 border-b-2 border-transparent hover:border-emerald-500 hover:bg-emerald-500/10 cursor-pointer transition-colors rounded"
      >
        {group}
      </span>
    ));
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-in fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setMode(GameMode.FAST_READING_MENU)}
          className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
        >
          ⬅
        </button>
        <h2 className="text-3xl md:text-5xl font-black text-white italic">Kelime Gruplama</h2>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-[40px] p-8 md:p-12 mb-8 shadow-2xl">
        <div className="flex items-center gap-6 mb-12 bg-black/20 p-6 rounded-3xl">
          <div className="flex-1">
            <div className="flex justify-between text-emerald-300 font-bold mb-2">
              <span>Grup Boyutu (Kelime/Grup)</span>
              <span className="text-white text-xl">{groupSize}</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={groupSize}
              onChange={(e) => setGroupSize(Number(e.target.value))}
              className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>

        <div className="bg-black/30 p-8 rounded-3xl border border-emerald-500/20 text-lg md:text-xl font-medium text-slate-200 leading-relaxed text-justify">
          {words.length === 0 ? 'Yükleniyor...' : renderGroupedText()}
        </div>

        <div className="mt-8 text-center bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-emerald-200 font-medium">
          💡 İpucu: Her gruba tek bir bütün olarak bakmaya çalış, kelimeleri içinden tek tek okumak
          yerine bloğu fotoğraflandırarak gör.
        </div>
      </div>
    </div>
  );
};

export default WordGroupingExercise;

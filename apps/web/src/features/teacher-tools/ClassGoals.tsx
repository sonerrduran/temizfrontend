import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

interface Goal {
  id: number;
  text: string;
  target: number;
  current: number;
  unit: string;
  color: string;
  emoji: string;
  done: boolean;
}

const COLORS = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-purple-500 to-fuchsia-600',
  'from-rose-500 to-pink-600',
  'from-cyan-500 to-sky-600',
];
const EMOJIS = ['🎯', '📚', '⭐', '🏆', '🔥', '💡', '🚀', '✅'];

let nextId = 10;

const SAMPLE_GOALS: Goal[] = [
  {
    id: 1,
    text: 'Kitap Okuma',
    target: 10,
    current: 6,
    unit: 'kitap',
    color: COLORS[1],
    emoji: '📚',
    done: false,
  },
  {
    id: 2,
    text: 'Matematik Sorusu',
    target: 100,
    current: 78,
    unit: 'soru',
    color: COLORS[0],
    emoji: '🔢',
    done: false,
  },
  {
    id: 3,
    text: 'Devam Puanı',
    target: 20,
    current: 20,
    unit: 'gün',
    color: COLORS[2],
    emoji: '🔥',
    done: true,
  },
];

const ClassGoals: React.FC<Props> = ({ onExit }) => {
  const [goals, setGoals] = useState<Goal[]>(SAMPLE_GOALS);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    text: '',
    target: 10,
    unit: 'soru',
    emoji: '🎯',
    color: COLORS[0],
  });

  const addGoal = () => {
    if (!form.text.trim()) return;
    setGoals((prev) => [
      ...prev,
      { id: nextId++, ...form, target: +form.target, current: 0, done: false },
    ]);
    setForm({ text: '', target: 10, unit: 'soru', emoji: '🎯', color: COLORS[0] });
    setShowAdd(false);
  };

  const increment = (id: number, amount: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        const newVal = Math.max(0, Math.min(g.target, g.current + amount));
        return { ...g, current: newVal, done: newVal >= g.target };
      })
    );
  };

  const deleteGoal = (id: number) => setGoals((prev) => prev.filter((g) => g.id !== id));

  const totalDone = goals.filter((g) => g.done).length;

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

      <div className="w-full max-w-3xl mt-14 md:mt-4">
        <div className="bg-slate-900/80 backdrop-blur-xl p-6 md:p-8 rounded-[40px] shadow-2xl border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-black text-emerald-400 italic">Sınıf Hedefleri</h2>
              <p className="text-white/40 text-sm mt-1">
                {totalDone}/{goals.length} hedef tamamlandı
              </p>
            </div>
            <button
              onClick={() => setShowAdd(!showAdd)}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold text-sm transition-all"
            >
              {showAdd ? '✕ İptal' : '➕ Yeni Hedef'}
            </button>
          </div>

          {/* Add Form */}
          {showAdd && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-white/50 text-xs font-bold block mb-1">Hedef Adı</label>
                  <input
                    value={form.text}
                    onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                    placeholder="örn: Kitap Okuma"
                    className="w-full bg-slate-950 text-white p-3 rounded-xl border border-white/10 focus:border-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs font-bold block mb-1">Hedef Sayı</label>
                  <input
                    type="number"
                    value={form.target}
                    onChange={(e) => setForm((f) => ({ ...f, target: +e.target.value }))}
                    className="w-full bg-slate-950 text-white p-3 rounded-xl border border-white/10 focus:border-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs font-bold block mb-1">Birim</label>
                  <input
                    value={form.unit}
                    onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
                    placeholder="soru, kitap, gün..."
                    className="w-full bg-slate-950 text-white p-3 rounded-xl border border-white/10 focus:border-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs font-bold block mb-1">Emoji</label>
                  <div className="flex flex-wrap gap-2">
                    {EMOJIS.map((e) => (
                      <button
                        key={e}
                        onClick={() => setForm((f) => ({ ...f, emoji: e }))}
                        className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all ${form.emoji === e ? 'bg-emerald-500 scale-110' : 'bg-white/5 hover:bg-white/10'}`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-white/50 text-xs font-bold block mb-1">Renk</label>
                  <div className="flex gap-2">
                    {COLORS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setForm((f) => ({ ...f, color: c }))}
                        className={`w-7 h-7 rounded-lg bg-gradient-to-br ${c} transition-all ${form.color === c ? 'scale-125 ring-2 ring-white' : ''}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={addGoal}
                className="w-full mt-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-black text-sm transition-all"
              >
                ✅ Hedef Ekle
              </button>
            </div>
          )}

          {/* Goals List */}
          <div className="space-y-4">
            {goals.map((goal) => {
              const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
              return (
                <div
                  key={goal.id}
                  className={`bg-gradient-to-r ${goal.color} p-[1px] rounded-2xl group`}
                >
                  <div className="bg-slate-900/95 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{goal.emoji}</span>
                        <div>
                          <div className="text-white font-bold">{goal.text}</div>
                          <div className="text-white/40 text-xs">
                            {goal.current} / {goal.target} {goal.unit}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {goal.done && (
                          <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">
                            TAMAMLANDI!
                          </span>
                        )}
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <button
                            onClick={() => increment(goal.id, -1)}
                            className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 font-bold text-sm transition-all"
                          >
                            -
                          </button>
                          <button
                            onClick={() => increment(goal.id, 1)}
                            className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 font-bold text-sm transition-all"
                          >
                            +
                          </button>
                          <button
                            onClick={() => deleteGoal(goal.id)}
                            className="w-7 h-7 rounded-lg bg-white/5 text-white/30 hover:text-red-400 hover:bg-red-500/10 text-xs transition-all"
                          >
                            🗑️
                          </button>
                        </div>
                        <span className="text-white font-black text-lg">{pct}%</span>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${goal.color} rounded-full transition-all duration-700 ${goal.done ? 'animate-pulse' : ''}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            {goals.length === 0 && (
              <div className="text-center py-8">
                <div className="text-5xl mb-2">🎯</div>
                <p className="text-white/30">
                  Henüz hedef yok. &quot;Yeni Hedef&quot; butonuna tıklayın.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassGoals;

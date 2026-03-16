import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

interface Team {
  name: string;
  score: number;
  color: string;
}

const Scoreboard: React.FC<Props> = ({ onExit }) => {
  const [teams, setTeams] = useState<Team[]>([
    { name: 'Takım A', score: 0, color: 'from-blue-500 to-indigo-700' },
    { name: 'Takım B', score: 0, color: 'from-emerald-400 to-teal-600' },
  ]);

  const updateScore = (idx: number, delta: number) => {
    const newTeams = [...teams];
    newTeams[idx].score += delta;
    setTeams(newTeams);
  };

  const updateName = (idx: number, newName: string) => {
    const newTeams = [...teams];
    newTeams[idx].name = newName;
    setTeams(newTeams);
  };

  const resetScores = () => {
    setTeams(teams.map((t) => ({ ...t, score: 0 })));
  };

  const addTeam = () => {
    if (teams.length >= 4) return;
    const colors = ['from-rose-500 to-red-700', 'from-amber-400 to-orange-600'];
    const newTeam = {
      name: `Takım ${String.fromCharCode(65 + teams.length)}`,
      score: 0,
      color: colors[teams.length % 2],
    };
    setTeams([...teams, newTeam]);
  };

  const removeTeam = (idx: number) => {
    if (teams.length <= 2) return;
    setTeams(teams.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full p-4 relative">
      <div className="absolute top-4 left-4 z-10 flex gap-4">
        <button
          onClick={onExit}
          className="px-6 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-2 border border-slate-700 font-bold"
        >
          <span>⬅</span> Çıkış
        </button>
        <button
          onClick={resetScores}
          className="px-6 py-2 bg-rose-500/20 text-rose-300 rounded-xl hover:bg-rose-500/40 transition-colors flex items-center gap-2 border border-rose-500/30 font-bold"
        >
          Sıfırla
        </button>
      </div>

      <div className="w-full max-w-7xl flex flex-col gap-8">
        <h2 className="text-4xl md:text-5xl font-black text-white text-center drop-shadow-2xl">
          SKOR TABLOSU
        </h2>

        <div
          className={`grid gap-6 ${teams.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' : teams.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}
        >
          {teams.map((team, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-b ${team.color} rounded-[40px] p-8 shadow-2xl border border-white/20 flex flex-col items-center relative group`}
            >
              {teams.length > 2 && (
                <button
                  onClick={() => removeTeam(idx)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              )}

              <input
                value={team.name}
                onChange={(e) => updateName(idx, e.target.value)}
                className="bg-transparent text-white font-black text-2xl md:text-3xl text-center outline-none border-b-2 border-transparent focus:border-white/50 w-full mb-8 uppercase"
              />

              <span className="text-[100px] md:text-[140px] font-black text-white leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] mb-8">
                {team.score}
              </span>

              <div className="flex gap-4 w-full">
                <button
                  onClick={() => updateScore(idx, -1)}
                  className="flex-1 py-4 bg-black/20 hover:bg-black/40 rounded-2xl text-white font-black text-3xl transition-colors"
                >
                  -1
                </button>
                <button
                  onClick={() => updateScore(idx, 1)}
                  className="flex-[2] py-4 bg-white hover:bg-slate-100 text-slate-800 rounded-2xl font-black text-4xl shadow-xl transition-transform hover:scale-105"
                >
                  +1
                </button>
              </div>
              <div className="flex gap-4 w-full mt-4">
                <button
                  onClick={() => updateScore(idx, -5)}
                  className="flex-1 py-2 bg-black/10 hover:bg-black/30 rounded-xl text-white font-bold text-lg transition-colors"
                >
                  -5
                </button>
                <button
                  onClick={() => updateScore(idx, 5)}
                  className="flex-1 py-2 bg-black/10 hover:bg-black/30 rounded-xl text-white font-bold text-lg transition-colors"
                >
                  +5
                </button>
                <button
                  onClick={() => updateScore(idx, 10)}
                  className="flex-1 py-2 bg-black/10 hover:bg-black/30 rounded-xl text-white font-bold text-lg transition-colors"
                >
                  +10
                </button>
              </div>
            </div>
          ))}
        </div>

        {teams.length < 4 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={addTeam}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl font-bold transition-all flex items-center gap-2"
            >
              <span className="text-xl">+</span> Yeni Takım Ekle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scoreboard;

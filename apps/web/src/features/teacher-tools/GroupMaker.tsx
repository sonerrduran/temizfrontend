import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

const GroupMaker: React.FC<Props> = ({ onExit }) => {
  const [namesText, setNamesText] = useState(
    'Ahmet\nAyşe\nMehmet\nFatma\nAli\nVeli\nZeynep\nDeniz\nCan\nCanan'
  );
  const [groupCount, setGroupCount] = useState(2);
  const [groups, setGroups] = useState<string[][]>([]);

  const generateGroups = () => {
    const list = namesText
      .split('\n')
      .map((n) => n.trim())
      .filter((n) => n.length > 0);
    if (list.length === 0 || groupCount < 2) return;

    // Suffle array
    const shuffled = [...list].sort(() => 0.5 - Math.random());

    // Distribute into teams
    const newGroups: string[][] = Array.from({ length: groupCount }, () => []);
    shuffled.forEach((name, index) => {
      newGroups[index % groupCount].push(name);
    });

    setGroups(newGroups);
  };

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

      <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-[40px] shadow-2xl border border-white/10 w-full max-w-5xl flex flex-col md:flex-row gap-8 items-stretch">
        {/* Input Panel */}
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-3xl font-black text-emerald-400 italic">Gruplara Ayır</h2>
          <p className="text-white/60 text-sm">
            Öğrenci listesini girin, otomatik takımlar oluşturun.
          </p>

          <textarea
            value={namesText}
            onChange={(e) => setNamesText(e.target.value)}
            className="w-full flex-1 min-h-[200px] bg-slate-950 text-white p-4 rounded-2xl border border-white/10 focus:border-emerald-500 outline-none resize-none font-medium"
            placeholder="İsimleri alt alta sıralayın..."
          ></textarea>

          <div className="flex gap-4 items-center bg-slate-800/50 p-4 rounded-2xl border border-white/5">
            <span className="text-white/80 font-bold">Grup Sayısı:</span>
            <input
              type="number"
              min="2"
              max="10"
              value={groupCount}
              onChange={(e) => setGroupCount(parseInt(e.target.value) || 2)}
              className="w-20 bg-slate-950 text-white p-2 text-center rounded-xl border border-white/10 outline-none"
            />
          </div>

          <button
            onClick={generateGroups}
            className="py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xl rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:-translate-y-1"
          >
            Dağıt ve Eşleştir ⚡
          </button>
        </div>

        {/* Results Panel */}
        <div className="flex-[1.5] bg-slate-800/30 rounded-3xl border border-white/5 p-6 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">Takımlar</span>
            <span className="text-sm bg-white/10 px-2 py-0.5 rounded-full text-white/50">
              {groups.length > 0 ? 'Oluşturuldu' : 'Bekleniyor...'}
            </span>
          </h3>

          {groups.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-slate-500 font-medium">
              Listeyi girip "Dağıt ve Eşleştir" butonuna basınız.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar">
              {groups.map((team, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800 border border-slate-700 p-4 rounded-2xl shadow-lg relative overflow-hidden group"
                >
                  <div className="absolute -right-4 -top-4 text-7xl opacity-5 group-hover:opacity-10 transition-opacity">
                    🏆
                  </div>
                  <h4 className="font-black text-emerald-300 mb-3 border-b border-white/10 pb-2">
                    Takım {idx + 1}
                  </h4>
                  <ul className="text-white/90 text-sm space-y-1">
                    {team.map((name, nIdx) => (
                      <li key={nIdx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></div>
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupMaker;

import React, { useState } from 'react';

const SCENARIOS = [
  {
    id: 1,
    title: 'Uzay İstasyonu Krizi',
    description:
      'İstasyonun enerji sistemlerinde bir arıza var ve yedek güç sadece bir bölümü besleyebilir. Ne yaparsın?',
    options: [
      {
        text: 'Yaşam destek ünitesine güç ver (Güvenli Yol)',
        result: 'Herkes güvende ancak görev verileri kayboldu.',
        score: 50,
      },
      {
        text: 'Laboratuvar verilerini koru (Riskli Yol)',
        result: 'Veriler kurtarıldı ama oksijen seviyesi kritik seviyeye indi!',
        score: 30,
      },
      {
        text: 'Tüm sistemleri %20 kapasiteyle çalıştır (Dengeli)',
        result: 'Sistemler stabil kaldı, harika bir kriz yönetimi!',
        score: 100,
      },
    ],
  },
];

const DecisionSimulator: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [selection, setSelection] = useState<number | null>(null);

  const scenario = SCENARIOS[index];

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-4 text-white">
      <div className="w-full max-w-3xl bg-slate-900/80 backdrop-blur-3xl rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="text-center mb-10">
          <h3 className="font-black tracking-widest text-xs uppercase mb-2 opacity-40">
            STRATEJİ VE KARAR VERME
          </h3>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">
            Karar Simülatörü
          </h2>
        </div>

        <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 mb-10">
          <h4 className="text-xl font-black text-cyan-400 mb-4 uppercase">{scenario.title}</h4>
          <p className="text-lg md:text-xl font-medium leading-relaxed italic text-white/90">
            "{scenario.description}"
          </p>
        </div>

        <div className="space-y-4">
          {scenario.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelection(i)}
              disabled={selection !== null}
              className={`w-full text-left p-6 rounded-3xl transition-all border ${selection === i ? 'bg-indigo-600 border-white shadow-xl scale-[1.02]' : 'bg-white/5 border-white/10 hover:bg-white/20'}`}
            >
              <span className="font-bold text-lg">{opt.text}</span>
            </button>
          ))}
        </div>

        {selection !== null && (
          <div className="mt-10 p-8 bg-black/40 rounded-[32px] border border-cyan-500/30 animate-in zoom-in duration-500 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-cyan-400 mb-2">SONUÇ</p>
            <p className="text-xl font-bold mb-6 italic">"{scenario.options[selection].result}"</p>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-8">
              Puan: {scenario.options[selection].score}
            </p>
            <button
              onClick={() => setSelection(null)}
              className="bg-white text-slate-900 px-12 py-4 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              YENİ SENARYO ➡️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecisionSimulator;

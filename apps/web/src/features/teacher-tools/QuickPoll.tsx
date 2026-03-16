import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

interface PollOption {
  text: string;
  votes: number;
  color: string;
}

const COLORS = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-purple-500',
  'bg-cyan-500',
  'bg-orange-500',
  'bg-pink-500',
];

const QuickPoll: React.FC<Props> = ({ onExit }) => {
  const [question, setQuestion] = useState('Bugünkü ders nasıldı?');
  const [optionsText, setOptionsText] = useState(
    'Çok güzeldi 🌟\nİyiydi 👍\nOrtalama 😐\nAnlamadım 😟'
  );
  const [options, setOptions] = useState<PollOption[]>([]);
  const [started, setStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const startPoll = () => {
    const list = optionsText
      .split('\n')
      .map((n) => n.trim())
      .filter((n) => n.length > 0);
    if (list.length < 2) return;
    setOptions(list.map((text, i) => ({ text, votes: 0, color: COLORS[i % COLORS.length] })));
    setStarted(true);
    setShowResults(false);
  };

  const vote = (index: number) => {
    setOptions((prev) => prev.map((o, i) => (i === index ? { ...o, votes: o.votes + 1 } : o)));
  };

  const totalVotes = options.reduce((s, o) => s + o.votes, 0);

  const resetPoll = () => {
    setStarted(false);
    setShowResults(false);
    setOptions([]);
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

      <div className="bg-slate-900/80 backdrop-blur-xl p-6 md:p-10 rounded-[40px] shadow-2xl border border-white/10 w-full max-w-2xl">
        <h2 className="text-3xl font-black text-purple-400 italic text-center mb-6">Hızlı Anket</h2>

        {!started ? (
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-white/60 text-sm font-bold mb-2">Soru:</label>
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full bg-slate-950 text-white p-4 rounded-2xl border border-white/10 focus:border-purple-500 outline-none font-bold text-lg"
                placeholder="Sorunuzu yazın..."
              />
            </div>
            <div>
              <label className="block text-white/60 text-sm font-bold mb-2">
                Seçenekler (her satıra bir tane):
              </label>
              <textarea
                value={optionsText}
                onChange={(e) => setOptionsText(e.target.value)}
                className="w-full h-32 bg-slate-950 text-white p-4 rounded-2xl border border-white/10 focus:border-purple-500 outline-none resize-none font-medium"
                placeholder="Seçenekleri her satıra bir tane yazın..."
              />
            </div>
            <button
              onClick={startPoll}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-black text-lg transition-all shadow-xl hover:shadow-purple-500/30"
            >
              📊 Anketi Başlat
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white/5 rounded-2xl p-5 mb-6 border border-white/10 text-center">
              <p className="text-white font-black text-xl">{question}</p>
              <p className="text-white/40 text-sm mt-1">Toplam {totalVotes} oy</p>
            </div>

            <div className="space-y-3 mb-6">
              {options.map((opt, i) => (
                <div key={i} className="relative">
                  <button
                    onClick={() => vote(i)}
                    className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all group text-left relative overflow-hidden"
                  >
                    {/* Progress bar background */}
                    {showResults && totalVotes > 0 && (
                      <div
                        className={`absolute inset-0 ${opt.color} opacity-20 transition-all duration-700`}
                        style={{ width: `${(opt.votes / totalVotes) * 100}%` }}
                      />
                    )}
                    <div
                      className={`relative z-10 w-10 h-10 rounded-xl ${opt.color} flex items-center justify-center text-white font-black text-lg shadow-lg`}
                    >
                      {showResults ? opt.votes : String.fromCharCode(65 + i)}
                    </div>
                    <span className="relative z-10 text-white font-semibold flex-1">
                      {opt.text}
                    </span>
                    {showResults && totalVotes > 0 && (
                      <span className="relative z-10 text-white/60 font-black text-sm">
                        {Math.round((opt.votes / totalVotes) * 100)}%
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowResults(!showResults)}
                className={`flex-1 px-4 py-3 rounded-xl font-bold text-sm transition-all ${showResults ? 'bg-purple-500 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'} border border-white/10`}
              >
                {showResults ? '👁️ Sonuçlar Açık' : '📊 Sonuçları Göster'}
              </button>
              <button
                onClick={resetPoll}
                className="px-6 py-3 bg-slate-800 text-white/60 rounded-xl font-bold text-sm hover:bg-slate-700 hover:text-white transition-all"
              >
                🔄 Sıfırla
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuickPoll;

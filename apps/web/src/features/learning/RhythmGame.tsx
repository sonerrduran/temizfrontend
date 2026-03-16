import React, { useState, useEffect } from 'react';

const RhythmGame: React.FC = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [canPlay, setCanPlay] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [level, setLevel] = useState(1);
  const [step, setStep] = useState<'intro' | 'playing' | 'result'>('intro');

  const colors = [
    'bg-rose-500 shadow-rose-500/50',
    'bg-cyan-500 shadow-cyan-500/50',
    'bg-amber-500 shadow-amber-500/50',
    'bg-emerald-500 shadow-emerald-500/50',
  ];

  const startLevel = () => {
    setStep('playing');
    setPlayerSequence([]);
    const newSequence = Array.from({ length: level + 2 }, () => Math.floor(Math.random() * 4));
    setSequence(newSequence);
    playSequence(newSequence);
  };

  const playSequence = async (seq: number[]) => {
    setCanPlay(false);
    for (const id of seq) {
      await new Promise((r) => setTimeout(r, 600));
      setActiveButton(id);
      // Play sound simulation if we had audio
      await new Promise((r) => setTimeout(r, 400));
      setActiveButton(null);
    }
    setCanPlay(true);
  };

  const handleButtonClick = (id: number) => {
    if (!canPlay) return;

    setActiveButton(id);
    setTimeout(() => setActiveButton(null), 200);

    const newPlayerSeq = [...playerSequence, id];
    setPlayerSequence(newPlayerSeq);

    if (id !== sequence[newPlayerSeq.length - 1]) {
      setStep('result');
      return;
    }

    if (newPlayerSeq.length === sequence.length) {
      setLevel((l) => l + 1);
      setStep('result');
    }
  };

  const isWin = playerSequence.length === sequence.length && sequence.length > 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-4 text-white">
      <div className="w-full max-w-xl bg-slate-900/80 backdrop-blur-3xl rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden text-center">
        <h3 className="font-black tracking-widest text-[10px] uppercase mb-10 opacity-40">
          RİTİM VE GÖRSEL HAFIZA
        </h3>

        {step === 'intro' && (
          <div className="animate-in zoom-in duration-500">
            <div className="text-4xl mb-6">🎵</div>
            <h2 className="text-3xl font-black mb-4 uppercase italic">Ritim Ustası</h2>
            <p className="text-white/60 mb-10">
              Renklerin ve seslerin dizilimini aklında tut ve aynı ritimle tekrar et!
            </p>
            <button
              onClick={startLevel}
              className="bg-indigo-600 hover:bg-indigo-500 px-12 py-5 rounded-2xl font-black text-xl shadow-xl active:scale-95"
            >
              BAŞLAT
            </button>
          </div>
        )}

        {step === 'playing' && (
          <div className="animate-in fade-in duration-300">
            <div className="text-xs font-black mb-10 opacity-30 uppercase tracking-widest">
              {canPlay ? 'SENİN SIRAN!' : 'DİKKATLİCE İZLE...'}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  onClick={() => handleButtonClick(i)}
                  className={`aspect-square rounded-[32px] transition-all duration-200 border-4 ${activeButton === i ? 'scale-105 border-white ' + colors[i] : 'bg-white/5 border-transparent'}`}
                ></button>
              ))}
            </div>
          </div>
        )}

        {step === 'result' && (
          <div className="animate-in zoom-in duration-500">
            <div className="text-5xl mb-6">{isWin ? '🎹' : '🔇'}</div>
            <h2 className="text-4xl font-black mb-2 uppercase">
              {isWin ? 'RİTİM HARİKA!' : 'SESLER KARIŞTI'}
            </h2>
            <p className="text-white/60 mb-10">
              {isWin
                ? `Seviye ${level - 1} tamamlandı. Ritim hızlanıyor!`
                : 'Bir notayı hatalı bastın. Müziğe kulak ver!'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={startLevel}
                className="bg-indigo-600 hover:bg-indigo-500 px-10 py-4 rounded-2xl font-black transition-all shadow-xl"
              >
                {isWin ? 'SIRADAKİ RİTİM' : 'TEKRAR DENE'}
              </button>
              <button
                onClick={() => {
                  setLevel(1);
                  setStep('intro');
                }}
                className="bg-white/10 hover:bg-white/20 px-10 py-4 rounded-2xl font-black transition-all border border-white/10"
              >
                MENÜYE DÖN
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RhythmGame;

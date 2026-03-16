import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

const RandomStudentPicker: React.FC<Props> = ({ onExit }) => {
  const [namesText, setNamesText] = useState(
    'Ahmet\nAyşe\nMehmet\nFatma\nAli\nVeli\nZeynep\nDeniz'
  );
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handlePick = () => {
    const list = namesText
      .split('\n')
      .map((n) => n.trim())
      .filter((n) => n.length > 0);
    if (list.length === 0) return;

    setIsSpinning(true);
    setSelectedName('Karıştırılıyor...');

    let counter = 0;
    const maxSpins = 20;

    const interval = setInterval(() => {
      counter++;
      const randomIdx = Math.floor(Math.random() * list.length);
      setSelectedName(list[randomIdx]);

      if (counter >= maxSpins) {
        clearInterval(interval);
        setIsSpinning(false);
        // Final pick to be sure
        const finalPick = list[Math.floor(Math.random() * list.length)];
        setSelectedName(finalPick);
      }
    }, 100);
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

      <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-[40px] shadow-2xl border border-white/10 w-full max-w-4xl flex flex-col md:flex-row gap-8">
        {/* Settings Panel */}
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-3xl font-black text-indigo-400 italic">Rastgele Seçici</h2>
          <p className="text-white/60 text-sm">
            Öğrenci isimlerini her satıra bir tane gelecek şekilde yazın.
          </p>
          <textarea
            value={namesText}
            onChange={(e) => setNamesText(e.target.value)}
            className="w-full h-48 md:h-64 bg-slate-950 text-white p-4 rounded-2xl border border-white/10 focus:border-indigo-500 outline-none resize-none font-medium"
            placeholder="İsimleri buraya yazın..."
          ></textarea>
        </div>

        {/* Display Panel */}
        <div className="flex-[1.5] flex flex-col items-center justify-center bg-slate-800/50 rounded-3xl border border-white/5 p-8">
          <div
            className={`
                w-full h-48 rounded-3xl flex items-center justify-center transition-all duration-300
                ${selectedName && !isSpinning ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-[0_0_40px_rgba(79,70,229,0.5)] scale-105' : 'bg-slate-900'}
                ${isSpinning ? 'animate-pulse bg-slate-800' : ''}
            `}
          >
            <span
              className={`text-5xl font-black text-center px-4 ${selectedName && !isSpinning ? 'text-white drop-shadow-lg' : 'text-slate-400'}`}
            >
              {selectedName || 'Hazır!'}
            </span>
          </div>

          <button
            onClick={handlePick}
            disabled={isSpinning || namesText.trim().length === 0}
            className={`mt-8 px-12 py-4 rounded-full font-black text-xl transition-all w-full md:w-auto
                    ${isSpinning ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-xl hover:shadow-indigo-500/50 hover:-translate-y-1'}
                `}
          >
            {isSpinning ? 'SEÇİLİYOR...' : '🎯 KİM ÇIKACAK?'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomStudentPicker;

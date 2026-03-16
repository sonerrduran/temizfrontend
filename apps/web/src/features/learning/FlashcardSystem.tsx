import React, { useState } from 'react';

const INITIAL_CARDS = [
  { id: 1, front: 'Metamorphosis', back: 'Başkalaşım, değişim (Biyoloji veya edebiyatta).' },
  { id: 2, front: 'Photosynthesis', back: 'Bitkilerin ışık enerjisini kullanarak besin üretmesi.' },
  {
    id: 3,
    front: 'Sovereignty',
    back: 'Egemenlik, bir devletin kendi toprakları üzerindeki tam kontrolü.',
  },
  { id: 4, front: 'Algorithm', back: 'Bir problemi çözmek için izlenen adım adım yol.' },
];

const FlashcardSystem: React.FC = () => {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      setIsComplete(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-4 text-white">
      <div className="w-full max-w-xl bg-slate-900/80 backdrop-blur-3xl rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden text-center">
        <h3 className="font-black tracking-widest text-[10px] uppercase mb-10 opacity-40">
          SRS EZBER SİSTEMİ (Aralıklı Tekrar)
        </h3>

        {!isComplete ? (
          <div className="animate-in fade-in duration-500">
            {/* Progress */}
            <div className="text-xs font-black mb-6 opacity-30">
              KART {currentIndex + 1} / {cards.length}
            </div>

            {/* Main Flashcard */}
            <div
              onClick={handleFlip}
              className={`relative w-full h-80 cursor-pointer transition-all duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
            >
              {/* Front */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[32px] flex items-center justify-center p-8 [backface-visibility:hidden] border border-white/20 shadow-xl">
                <h4 className="text-4xl font-black italic">{cards[currentIndex].front}</h4>
                <div className="absolute bottom-6 text-[10px] font-black opacity-40 uppercase tracking-widest">
                  ÇEVİRMEK İÇİN TIKLA
                </div>
              </div>

              {/* Back */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 to-slate-900 rounded-[32px] flex items-center justify-center p-8 [transform:rotateY(180deg)] [backface-visibility:hidden] border border-white/10 shadow-xl">
                <p className="text-2xl font-bold leading-relaxed">{cards[currentIndex].back}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-12 flex flex-col gap-4">
              {isFlipped && (
                <div className="flex gap-2 animate-in slide-in-from-bottom-4">
                  <button
                    onClick={nextCard}
                    className="flex-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 py-4 rounded-2xl font-black text-xs uppercase border border-rose-500/20 uppercase"
                  >
                    ZOR (TEKRAR ET)
                  </button>
                  <button
                    onClick={nextCard}
                    className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 py-4 rounded-2xl font-black text-xs uppercase border border-cyan-500/20 uppercase"
                  >
                    KOLAY (ÖĞRENDİM)
                  </button>
                </div>
              )}
              {!isFlipped && (
                <button
                  onClick={handleFlip}
                  className="w-full bg-white text-slate-900 py-5 rounded-2xl font-black text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                >
                  CEVABI GÖR 👀
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="animate-in zoom-in duration-500">
            <div className="text-5xl mb-6">🎯</div>
            <h2 className="text-3xl font-black mb-4 uppercase italic">Tebrikler!</h2>
            <p className="text-white/60 mb-8 font-medium">
              Bu oturumdaki tüm kartları tamamladın. Yarın tekrar ederek kalıcı hafızanı
              güçlendirebilirsin.
            </p>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setIsComplete(false);
                setIsFlipped(false);
              }}
              className="bg-indigo-600 hover:bg-indigo-500 px-10 py-4 rounded-2xl font-black transition-all shadow-xl"
            >
              BAŞA DÖN
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardSystem;

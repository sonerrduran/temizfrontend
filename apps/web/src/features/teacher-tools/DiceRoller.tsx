import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

const DiceRoller: React.FC<Props> = ({ onExit }) => {
  const [diceCount, setDiceCount] = useState(1);
  const [diceValues, setDiceValues] = useState<number[]>([1]);
  const [isRolling, setIsRolling] = useState(false);
  const [maxNumber, setMaxNumber] = useState(100);
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  const rollDice = () => {
    setIsRolling(true);
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      setDiceValues(Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1));

      if (counter > 15) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 100);
  };

  const drawNumber = () => {
    setIsRolling(true);
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      setRandomNumber(Math.floor(Math.random() * maxNumber) + 1);

      if (counter > 15) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 80);
  };

  const getDiceDots = (value: number) => {
    switch (value) {
      case 1:
        return (
          <div className="w-4 h-4 bg-slate-800 rounded-full mx-auto my-auto self-center"></div>
        );
      case 2:
        return (
          <div className="flex justify-between w-full h-full p-2">
            <div className="w-4 h-4 bg-slate-800 rounded-full"></div>
            <div className="w-4 h-4 bg-slate-800 rounded-full self-end"></div>
          </div>
        );
      case 3:
        return (
          <div className="flex justify-between w-full h-full p-2">
            <div className="w-4 h-4 bg-slate-800 rounded-full"></div>
            <div className="w-4 h-4 bg-slate-800 rounded-full self-center"></div>
            <div className="w-4 h-4 bg-slate-800 rounded-full self-end"></div>
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 grid-rows-2 w-full h-full p-2 gap-4">
            <div className="w-4 h-4 bg-slate-800 rounded-full"></div>
            <div className="w-4 h-4 bg-slate-800 rounded-full justify-self-end"></div>
            <div className="w-4 h-4 bg-slate-800 rounded-full self-end"></div>
            <div className="w-4 h-4 bg-slate-800 rounded-full self-end justify-self-end"></div>
          </div>
        );
      case 5:
        return (
          <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-2">
            <div className="w-4 h-4 bg-slate-800 rounded-full col-start-1 row-start-1"></div>
            <div className="w-4 h-4 bg-slate-800 rounded-full col-start-3 row-start-1 justify-self-end"></div>
            <div className="w-4 h-4 bg-slate-800 rounded-full col-start-2 row-start-2 place-self-center"></div>
            <div className="w-4 h-4 bg-slate-800 rounded-full col-start-1 row-start-3 self-end"></div>
            <div className="w-4 h-4 bg-slate-800 rounded-full col-start-3 row-start-3 self-end justify-self-end"></div>
          </div>
        );
      case 6:
        return (
          <div className="grid grid-cols-2 grid-rows-3 w-full h-full p-2 gap-y-2">
            <div className="w-4 h-4 bg-slate-800 rounded-full"></div>
            <div className="w-4 h-4 bg-slate-800 rounded-full justify-self-end"></div>
            <div className="w-4 h-4 bg-slate-800 rounded-full self-center"></div>
            <div className="w-4 h-4 bg-slate-800 rounded-full self-center justify-self-end"></div>
            <div className="w-4 h-4 bg-slate-800 rounded-full self-end"></div>
            <div className="w-4 h-4 bg-slate-800 rounded-full self-end justify-self-end"></div>
          </div>
        );
      default:
        return null;
    }
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

      <div className="flex flex-col md:flex-row w-full max-w-5xl gap-6 items-stretch">
        {/* Dice Section */}
        <div className="flex-1 bg-gradient-to-br from-amber-600 to-orange-800 p-8 rounded-[40px] shadow-2xl border border-white/20 flex flex-col items-center relative overflow-hidden">
          <h2 className="text-3xl font-black text-white drop-shadow-lg mb-8 z-10">Zar At</h2>

          <div
            className={`flex flex-wrap gap-6 justify-center min-h-[160px] items-center z-10 ${isRolling ? 'animate-bounce' : ''}`}
          >
            {diceValues.map((val, idx) => (
              <div
                key={idx}
                className="w-32 h-32 bg-white rounded-3xl shadow-[0_10px_0_#cbd5e1,0_15px_30px_rgba(0,0,0,0.5)] flex items-center justify-center rotate-3 hover:rotate-0 transition-transform cursor-pointer"
                onClick={rollDice}
              >
                {getDiceDots(val)}
              </div>
            ))}
          </div>

          <div className="mt-auto z-10 w-full">
            <div className="flex justify-between items-center mb-4 bg-black/20 p-4 rounded-2xl">
              <span className="text-white font-bold">Zar Sayısı:</span>
              <div className="flex gap-2">
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    onClick={() => {
                      setDiceCount(n);
                      setDiceValues(Array(n).fill(1));
                    }}
                    className={`w-10 h-10 rounded-full font-bold ${diceCount === n ? 'bg-white text-orange-600' : 'bg-white/20 text-white hover:bg-white/40'}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={rollDice}
              disabled={isRolling}
              className="w-full py-4 bg-white text-orange-600 font-black text-2xl rounded-2xl shadow-xl hover:scale-105 transition-transform"
            >
              {isRolling ? 'Atılıyor...' : 'ZARI AT 🎲'}
            </button>
          </div>

          <div className="absolute -bottom-10 -right-10 text-9xl opacity-10">🎲</div>
        </div>

        {/* Random Number Section */}
        <div className="flex-1 bg-gradient-to-br from-indigo-600 to-purple-800 p-8 rounded-[40px] shadow-2xl border border-white/20 flex flex-col items-center relative overflow-hidden">
          <h2 className="text-3xl font-black text-white drop-shadow-lg mb-8 z-10">Sayı Çek</h2>

          <div className="flex justify-center flex-1 items-center z-10 w-full min-h-[160px]">
            <div
              className={`text-[120px] font-black text-white leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] ${isRolling ? 'animate-pulse blur-sm' : ''}`}
            >
              {randomNumber !== null ? randomNumber : '?'}
            </div>
          </div>

          <div className="mt-auto z-10 w-full">
            <div className="flex justify-between items-center mb-4 bg-black/20 p-4 rounded-2xl gap-4">
              <span className="text-white font-bold whitespace-nowrap">Maks Sayı:</span>
              <input
                type="number"
                min="2"
                max="10000"
                value={maxNumber}
                onChange={(e) => setMaxNumber(parseInt(e.target.value) || 100)}
                className="w-full bg-black/30 text-white font-bold p-2 text-center rounded-xl border border-white/20 outline-none"
              />
            </div>
            <button
              onClick={drawNumber}
              disabled={isRolling}
              className="w-full py-4 bg-white text-indigo-600 font-black text-2xl rounded-2xl shadow-xl hover:scale-105 transition-transform"
            >
              {isRolling ? 'Çekiliyor...' : 'SAYI ÇEK 🔢'}
            </button>
          </div>

          <div className="absolute -bottom-10 -left-10 text-9xl opacity-10">🔢</div>
        </div>
      </div>
    </div>
  );
};

export default DiceRoller;

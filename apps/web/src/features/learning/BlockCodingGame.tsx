import React, { useState } from 'react';

const BlockCodingGame: React.FC = () => {
  const gridSize = 5;
  const [robotPos, setRobotPos] = useState({ x: 0, y: 0 });
  const [goalPos, setGoalPos] = useState({ x: 4, y: 4 });
  const [commands, setCommands] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [message, setMessage] = useState('Robotu hedefe ulaştırmak için komutları diz!');

  const addCommand = (cmd: string) => {
    if (commands.length < 10) setCommands([...commands, cmd]);
  };

  const runCommands = async () => {
    setIsExecuting(true);
    let currentPos = { ...robotPos };

    for (const cmd of commands) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (cmd === '⬆️') currentPos.y = Math.max(0, currentPos.y - 1);
      if (cmd === '⬇️') currentPos.y = Math.min(gridSize - 1, currentPos.y + 1);
      if (cmd === '⬅️') currentPos.x = Math.max(0, currentPos.x - 1);
      if (cmd === '➡️') currentPos.x = Math.min(gridSize - 1, currentPos.x + 1);
      setRobotPos({ ...currentPos });
    }

    if (currentPos.x === goalPos.x && currentPos.y === goalPos.y) {
      setMessage('TEBRİKLER! Hedefe ulaştın.');
    } else {
      setMessage('Hedefe ulaşamadık, tekrar dene.');
    }
    setIsExecuting(false);
  };

  const reset = () => {
    setRobotPos({ x: 0, y: 0 });
    setCommands([]);
    setMessage('Robotu hedefe ulaştırmak için komutları diz!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-4 text-white">
      <div className="w-full max-w-4xl bg-slate-900/80 backdrop-blur-3xl rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <h3 className="font-black tracking-widest text-[10px] uppercase mb-2 opacity-40">
            ALGORİTMA VE MANTIK
          </h3>
          <h2 className="text-3xl font-black mb-2 italic uppercase">Kodlama Akademisi</h2>
          <p className="text-cyan-400 font-bold">{message}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Grid Area */}
          <div className="bg-black/20 p-4 rounded-3xl border border-white/5 relative aspect-square max-w-[400px] mx-auto w-full">
            <div className="grid grid-cols-5 grid-rows-5 h-full w-full gap-1">
              {Array.from({ length: 25 }).map((_, i) => {
                const x = i % 5;
                const y = Math.floor(i / 5);
                const isRobot = robotPos.x === x && robotPos.y === y;
                const isGoal = goalPos.x === x && goalPos.y === y;
                return (
                  <div
                    key={i}
                    className={`rounded-lg flex items-center justify-center text-2xl transition-all border ${isRobot ? 'bg-indigo-500 scale-90 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)]' : isGoal ? 'bg-emerald-500/20 border-emerald-500 animate-pulse' : 'bg-white/5 border-white/5'}`}
                  >
                    {isRobot ? '🤖' : isGoal ? '🏁' : ''}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls Area */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {['⬆️', '⬇️', '⬅️', '➡️'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => addCommand(cmd)}
                  disabled={isExecuting}
                  className="w-14 h-14 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-2xl transition-all active:scale-90 disabled:opacity-30"
                >
                  {cmd}
                </button>
              ))}
            </div>

            <div className="bg-white/5 p-6 rounded-2xl min-h-[120px] relative border border-white/5">
              <label className="absolute -top-2 left-4 bg-slate-900 px-2 text-[10px] font-black tracking-widest uppercase opacity-40">
                KOMUT DİZİSİ
              </label>
              <div className="flex flex-wrap gap-2">
                {commands.map((cmd, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg animate-in slide-in-from-left-2"
                  >
                    {cmd}
                  </div>
                ))}
                {commands.length === 0 && (
                  <p className="text-white/20 italic text-sm">Henüz komut eklenmedi...</p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={runCommands}
                disabled={isExecuting || commands.length === 0}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 py-4 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95 disabled:opacity-30"
              >
                ÇALIŞTIR ▶️
              </button>
              <button
                onClick={reset}
                className="px-8 bg-white/5 hover:bg-white/10 py-4 rounded-2xl font-black transition-all border border-white/10"
              >
                TEMİZLE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockCodingGame;

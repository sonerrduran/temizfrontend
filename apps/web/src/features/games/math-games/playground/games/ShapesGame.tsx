
import React, { useState } from 'react';

const SHAPES = [
  { name: 'Kare', icon: '■', color: 'bg-red-500', corners: 4, edges: 4, example: 'Hediye paketi' },
  { name: 'Üçgen', icon: '▲', color: 'bg-green-500', corners: 3, edges: 3, example: 'Çatı' },
  { name: 'Daire', icon: '●', color: 'bg-blue-500', corners: 0, edges: 0, example: 'Duvar saati' },
  { name: 'Dikdörtgen', icon: '▬', color: 'bg-yellow-500', corners: 4, edges: 4, example: 'Televizyon' },
];

interface ShapesGameProps {
  onComplete: (stars: number) => void;
  onExit: () => void;
}

const ShapesGame: React.FC<ShapesGameProps> = ({ onComplete, onExit }) => {
  const [currentShapeIdx, setCurrentShapeIdx] = useState(0);
  const [mode, setMode] = useState<'learning' | 'quiz'>('learning');
  const [quizQuestion, setQuizQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const nextShape = () => {
    if (currentShapeIdx < SHAPES.length - 1) {
      setCurrentShapeIdx(s => s + 1);
    } else {
      setMode('quiz');
    }
  };

  const handleQuizAnswer = (name: string) => {
    const correct = name === SHAPES[quizQuestion].name;
    if (correct) {
      setScore(s => s + 1);
    }

    if (quizQuestion < SHAPES.length - 1) {
      setQuizQuestion(q => q + 1);
    } else {
      onComplete(score + (correct ? 1 : 0));
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-3xl p-8 shadow-2xl text-indigo-900 bounce-in border-t-8 border-blue-200">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onExit} className="text-indigo-400 hover:text-indigo-600 font-bold uppercase tracking-widest text-sm">← Geri Dön</button>
        <h2 className="text-2xl font-black uppercase tracking-tight">{mode === 'learning' ? 'Şekilleri Tanıyalım' : 'Şekil Bilmecesi'}</h2>
      </div>

      {mode === 'learning' ? (
        <div className="text-center">
          <div className={`text-9xl mb-8 flex items-center justify-center p-12 rounded-[40px] mx-auto w-56 h-56 text-white shadow-xl ${SHAPES[currentShapeIdx].color}`}>
            {SHAPES[currentShapeIdx].icon}
          </div>
          <h3 className="text-5xl font-black mb-6 uppercase text-indigo-600">{SHAPES[currentShapeIdx].name}</h3>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-indigo-50 p-6 rounded-[30px] border-b-4 border-indigo-100">
              <p className="text-xs text-indigo-400 font-bold uppercase mb-1">Köşe Sayısı</p>
              <p className="text-3xl font-black text-indigo-700">{SHAPES[currentShapeIdx].corners}</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-[30px] border-b-4 border-indigo-100">
              <p className="text-xs text-indigo-400 font-bold uppercase mb-1">Örnek Nesne</p>
              <p className="text-xl font-black text-indigo-700">{SHAPES[currentShapeIdx].example}</p>
            </div>
          </div>
          <button 
            onClick={nextShape}
            className="w-full py-5 bg-indigo-600 text-white rounded-[25px] font-black text-xl hover:bg-indigo-700 transition-all shadow-lg border-b-8 border-indigo-900 active:border-b-0 active:translate-y-2"
          >
            SONRAKİ ŞEKİL ➜
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-2xl mb-10 font-black text-indigo-600 bg-indigo-50 py-4 rounded-2xl">Hangi şekil "{SHAPES[quizQuestion].name}"?</p>
          <div className="grid grid-cols-2 gap-6">
            {SHAPES.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleQuizAnswer(s.name)}
                className={`p-10 rounded-[35px] text-7xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 bg-white border-4 border-indigo-50 shadow-lg hover:border-indigo-300`}
              >
                <span className={s.name === 'Dikdörtgen' ? 'scale-x-150' : ''}>{s.icon}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShapesGame;

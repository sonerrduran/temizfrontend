import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AloudGame: React.FC = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const texts = [
    { text: 'Güneş doğuyor. Kuşlar ötüyor. Çiçekler açıyor.', title: 'Sabah' },
    { text: 'Kedi süt içiyor. Köpek kemik yiyor. Tavşan havuç yiyor.', title: 'Hayvanlar' },
    { text: 'Ali okula gidiyor. Ayşe kitap okuyor. Mehmet top oynuyor.', title: 'Çocuklar' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
          <h1 className="text-4xl font-black text-white mb-4 text-center">📢 Sesli Okuma</h1>
          <p className="text-white/80 text-center mb-8">Metni yüksek sesle oku!</p>

          <div className="bg-white/20 rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">{texts[currentText].title}</h2>
            <p className="text-xl text-white leading-relaxed">{texts[currentText].text}</p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                if (currentText < texts.length - 1) {
                  setCurrentText(currentText + 1);
                  setScore(score + 10);
                } else {
                  alert(`Tebrikler! ${score + 10} puan kazandın!`);
                  navigate('/academic/turkish/grade2');
                }
              }}
              className="px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-bold text-lg"
            >
              Okudum ✓
            </button>
            <button
              onClick={() => navigate('/academic/turkish/grade2')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold"
            >
              Geri
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AloudGame;

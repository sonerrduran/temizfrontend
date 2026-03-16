import React, { useState, useEffect } from 'react';

interface CyberbullyGameProps {
  onExit: () => void;
}

const messages = [
  { text: 'Bugün çok güzel bir gün! 😊', isBullying: false },
  { text: 'Sen çok aptalsın, hiçbir şey yapamazsın!', isBullying: true },
  { text: 'Ödevini yapabilir misin?', isBullying: false },
  { text: 'Kimse seninle arkadaş olmak istemiyor!', isBullying: true },
  { text: 'Yarın sinemaya gidelim mi?', isBullying: false },
  { text: 'Senin gibi biri bu okulda olmamalı!', isBullying: true },
  { text: 'Dersini anladın mı?', isBullying: false },
  { text: 'Herkes senden nefret ediyor!', isBullying: true },
  { text: 'Oyun oynamak ister misin?', isBullying: false },
  { text: 'Çok çirkinsin, fotoğrafını paylaşacağım!', isBullying: true },
];

export default function CyberbullyGame({ onExit }: CyberbullyGameProps) {
  const [score, setScore] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [feedback, setFeedback] = useState('');
  const [round, setRound] = useState(1);
  const [usedMessages, setUsedMessages] = useState<string[]>([]);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const availableMessages = messages.filter((msg) => !usedMessages.includes(msg.text));
    if (availableMessages.length === 0) {
      setUsedMessages([]);
      return;
    }
    const msg = availableMessages[Math.floor(Math.random() * availableMessages.length)];
    setCurrentMessage(msg);
    setFeedback('');
  };

  const handleAnswer = (isBullying: boolean) => {
    if (isBullying === currentMessage.isBullying) {
      setScore(score + 10);
      setFeedback('✅ Doğru! Aferin!');
    } else {
      setFeedback(
        `❌ Yanlış! Bu mesaj ${currentMessage.isBullying ? 'siber zorbalıktır' : 'normal bir mesajdır'}.`
      );
    }

    setTimeout(() => {
      setUsedMessages([...usedMessages, currentMessage.text]);
      setRound(round + 1);
      generateQuestion();
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">Round: {round}</span>
            </div>
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">⭐ {score}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black mb-4">
            🚫 Siber Zorbalığı Durdur
          </h1>
          <p className="text-white/80 text-lg">Bu mesaj siber zorbalık mı?</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-red-500/30 p-8">
          <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl p-8 mb-8">
            <div className="bg-white/10 rounded-xl p-6">
              <p className="text-white text-xl leading-relaxed">{currentMessage.text}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <button
              onClick={() => handleAnswer(false)}
              className="bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-2xl p-8 font-black text-2xl transition-all transform hover:scale-105"
            >
              <div className="text-5xl mb-2">✅</div>
              NORMAL MESAJ
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 text-white rounded-2xl p-8 font-black text-2xl transition-all transform hover:scale-105"
            >
              <div className="text-5xl mb-2">🚫</div>
              SİBER ZORBALIK
            </button>
          </div>

          {feedback && (
            <div
              className={`text-center text-lg font-black p-4 rounded-xl ${
                feedback.includes('✅')
                  ? 'bg-green-500/20 text-green-300'
                  : 'bg-red-500/20 text-red-300'
              }`}
            >
              {feedback}
            </div>
          )}

          <div className="mt-8 bg-red-500/20 rounded-2xl p-6 border border-red-500/30">
            <h3 className="text-xl font-black text-red-300 mb-4">⚠️ Önemli</h3>
            <ul className="space-y-2 text-white/90 text-sm">
              <li>• Siber zorbalığa maruz kalırsan yetişkine söyle</li>
              <li>• Zorbalık yapan kişiyi engelle</li>
              <li>• Ekran görüntüsü al (kanıt için)</li>
              <li>• Asla karşılık verme, durumu kötüleştirir</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

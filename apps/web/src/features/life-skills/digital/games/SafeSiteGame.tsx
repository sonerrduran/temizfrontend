import React, { useState, useEffect } from 'react';

interface SafeSiteGameProps {
  onExit: () => void;
}

const sites = [
  { name: 'www.cocukoyunlari.com', isSafe: true, icon: '🎮' },
  { name: 'www.bedavahediye.xyz', isSafe: false, icon: '🎁' },
  { name: 'www.egitimportal.gov.tr', isSafe: true, icon: '📚' },
  { name: 'www.tiklakazan.net', isSafe: false, icon: '💰' },
  { name: 'www.cocukkutuphanesi.com', isSafe: true, icon: '📖' },
  { name: 'www.virusindirme.com', isSafe: false, icon: '🦠' },
  { name: 'www.guvenlioyun.edu.tr', isSafe: true, icon: '🎯' },
  { name: 'www.sahtesite.tk', isSafe: false, icon: '⚠️' },
];

export default function SafeSiteGame({ onExit }: SafeSiteGameProps) {
  const [score, setScore] = useState(0);
  const [currentSite, setCurrentSite] = useState(sites[0]);
  const [feedback, setFeedback] = useState('');
  const [round, setRound] = useState(1);
  const [usedSites, setUsedSites] = useState<string[]>([]);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const availableSites = sites.filter((site) => !usedSites.includes(site.name));
    if (availableSites.length === 0) {
      setUsedSites([]);
      return;
    }
    const site = availableSites[Math.floor(Math.random() * availableSites.length)];
    setCurrentSite(site);
    setFeedback('');
  };

  const handleAnswer = (isSafe: boolean) => {
    if (isSafe === currentSite.isSafe) {
      setScore(score + 10);
      setFeedback('✅ Doğru! Aferin!');
    } else {
      setFeedback(`❌ Yanlış! Bu site ${currentSite.isSafe ? 'güvenli' : 'tehlikeli'}dir.`);
    }

    setTimeout(() => {
      setUsedSites([...usedSites, currentSite.name]);
      setRound(round + 1);
      generateQuestion();
    }, 2000);
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
          <h1 className="text-white text-4xl md:text-5xl font-black mb-4">🔒 Güvenli Site Bulma</h1>
          <p className="text-white/80 text-lg">Bu site güvenli mi?</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-purple-500/30 p-8">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-12 mb-8 text-center">
            <div className="text-9xl mb-4">{currentSite.icon}</div>
            <h2 className="text-3xl font-black text-white break-all">{currentSite.name}</h2>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <button
              onClick={() => handleAnswer(true)}
              className="bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-2xl p-8 font-black text-2xl transition-all transform hover:scale-105"
            >
              <div className="text-5xl mb-2">✅</div>
              GÜVENLİ
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 text-white rounded-2xl p-8 font-black text-2xl transition-all transform hover:scale-105"
            >
              <div className="text-5xl mb-2">⚠️</div>
              TEHLİKELİ
            </button>
          </div>

          {feedback && (
            <div
              className={`text-center text-xl font-black p-4 rounded-xl ${
                feedback.includes('✅')
                  ? 'bg-green-500/20 text-green-300'
                  : 'bg-red-500/20 text-red-300'
              }`}
            >
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

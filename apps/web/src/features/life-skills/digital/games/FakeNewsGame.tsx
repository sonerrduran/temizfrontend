import React, { useState, useEffect } from 'react';

interface FakeNewsGameProps {
  onExit: () => void;
}

const news = [
  {
    title: 'Bilim İnsanları Yeni Aşı Geliştirdi',
    source: 'Sağlık Bakanlığı Resmi Sitesi',
    isFake: false,
    icon: '💉',
  },
  {
    title: 'Uzaylılar Dünyaya Geldi!',
    source: 'Bilinmeyen Blog',
    isFake: true,
    icon: '👽',
  },
  {
    title: 'Okullar Yarın Tatil Edildi',
    source: 'Milli Eğitim Bakanlığı',
    isFake: false,
    icon: '🏫',
  },
  {
    title: 'Su İçmek Zararlıdır!',
    source: 'Şüpheli Site',
    isFake: true,
    icon: '💧',
  },
  {
    title: 'Yeni Kütüphane Açıldı',
    source: 'Belediye Resmi Sitesi',
    isFake: false,
    icon: '📚',
  },
  {
    title: 'Telefonlar Beyin Okuyabiliyor!',
    source: 'Kaynak Yok',
    isFake: true,
    icon: '📱',
  },
];

export default function FakeNewsGame({ onExit }: FakeNewsGameProps) {
  const [score, setScore] = useState(0);
  const [currentNews, setCurrentNews] = useState(news[0]);
  const [feedback, setFeedback] = useState('');
  const [round, setRound] = useState(1);
  const [usedNews, setUsedNews] = useState<string[]>([]);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const availableNews = news.filter((n) => !usedNews.includes(n.title));
    if (availableNews.length === 0) {
      setUsedNews([]);
      return;
    }
    const item = availableNews[Math.floor(Math.random() * availableNews.length)];
    setCurrentNews(item);
    setFeedback('');
  };

  const handleAnswer = (isFake: boolean) => {
    if (isFake === currentNews.isFake) {
      setScore(score + 10);
      setFeedback('✅ Doğru! Kaynağı kontrol ettin mi?');
    } else {
      setFeedback(
        `❌ Yanlış! Bu haber ${currentNews.isFake ? 'sahte' : 'gerçek'}. Kaynağa dikkat et!`
      );
    }

    setTimeout(() => {
      setUsedNews([...usedNews, currentNews.title]);
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
            📰 Sahte Haber Dedektifi
          </h1>
          <p className="text-white/80 text-lg">Bu haber gerçek mi sahte mi?</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-orange-500/30 p-8">
          <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-8 mb-8">
            <div className="text-center mb-4">
              <div className="text-7xl mb-4">{currentNews.icon}</div>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-2xl font-black text-slate-800 mb-4">{currentNews.title}</h2>
              <p className="text-slate-600 text-sm">
                <span className="font-bold">Kaynak:</span> {currentNews.source}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <button
              onClick={() => handleAnswer(false)}
              className="bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-2xl p-8 font-black text-2xl transition-all transform hover:scale-105"
            >
              <div className="text-5xl mb-2">✅</div>
              GERÇEK
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 text-white rounded-2xl p-8 font-black text-2xl transition-all transform hover:scale-105"
            >
              <div className="text-5xl mb-2">❌</div>
              SAHTE
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

          <div className="mt-8 bg-orange-500/20 rounded-2xl p-6 border border-orange-500/30">
            <h3 className="text-xl font-black text-orange-300 mb-4">🔍 Kontrol Listesi</h3>
            <ul className="space-y-2 text-white/90 text-sm">
              <li>• Kaynağı güvenilir mi?</li>
              <li>• Resmi bir site mi?</li>
              <li>• Başka kaynaklarda da var mı?</li>
              <li>• Mantıklı mı?</li>
              <li>• Tarih güncel mi?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';

interface PhishingGameProps {
  onExit: () => void;
}

const emails = [
  {
    from: 'destek@banka.com.tr',
    subject: 'Hesap Güvenliği',
    body: 'Hesabınızı doğrulamak için lütfen şifrenizi gönderin.',
    isPhishing: true,
    icon: '🎣',
  },
  {
    from: 'ogretmen@okul.edu.tr',
    subject: 'Ödev Hatırlatması',
    body: 'Yarın matematik ödevi teslim günü.',
    isPhishing: false,
    icon: '📧',
  },
  {
    from: 'hediye@kazandin.xyz',
    subject: 'Tebrikler! Hediye Kazandınız!',
    body: 'Hemen tıklayın ve kişisel bilgilerinizi girin!',
    isPhishing: true,
    icon: '🎁',
  },
  {
    from: 'kutuphane@belediye.gov.tr',
    subject: 'Yeni Kitaplar',
    body: 'Kütüphanemize yeni kitaplar geldi.',
    isPhishing: false,
    icon: '📚',
  },
  {
    from: 'acil@guvenlik.net',
    subject: 'ACİL! Hesabınız Kapatılacak!',
    body: 'Şifrenizi hemen değiştirin yoksa hesabınız silinecek!',
    isPhishing: true,
    icon: '⚠️',
  },
  {
    from: 'bildirim@sosyalmedya.com',
    subject: 'Yeni Mesajınız Var',
    body: 'Arkadaşınız size mesaj gönderdi.',
    isPhishing: false,
    icon: '💬',
  },
];

export default function PhishingGame({ onExit }: PhishingGameProps) {
  const [score, setScore] = useState(0);
  const [currentEmail, setCurrentEmail] = useState(emails[0]);
  const [feedback, setFeedback] = useState('');
  const [round, setRound] = useState(1);
  const [usedEmails, setUsedEmails] = useState<string[]>([]);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const availableEmails = emails.filter((e) => !usedEmails.includes(e.subject));
    if (availableEmails.length === 0) {
      setUsedEmails([]);
      return;
    }
    const email = availableEmails[Math.floor(Math.random() * availableEmails.length)];
    setCurrentEmail(email);
    setFeedback('');
  };

  const handleAnswer = (isPhishing: boolean) => {
    if (isPhishing === currentEmail.isPhishing) {
      setScore(score + 10);
      setFeedback('✅ Doğru! İyi tespit ettin!');
    } else {
      setFeedback(
        `❌ Yanlış! Bu ${currentEmail.isPhishing ? 'phishing (dolandırıcılık)' : 'güvenli bir e-posta'}.`
      );
    }

    setTimeout(() => {
      setUsedEmails([...usedEmails, currentEmail.subject]);
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
          <h1 className="text-white text-4xl md:text-5xl font-black mb-4">🎣 Phishing Dedektifi</h1>
          <p className="text-white/80 text-lg">Bu e-posta güvenli mi?</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-red-500/30 p-8">
          <div className="bg-white rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-4 mb-4 pb-4 border-b-2 border-slate-200">
              <div className="text-5xl">{currentEmail.icon}</div>
              <div className="flex-1">
                <p className="text-slate-600 text-sm mb-1">Gönderen:</p>
                <p className="text-slate-900 font-bold">{currentEmail.from}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-slate-600 text-sm mb-1">Konu:</p>
              <p className="text-slate-900 font-bold text-lg">{currentEmail.subject}</p>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">Mesaj:</p>
              <p className="text-slate-800">{currentEmail.body}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <button
              onClick={() => handleAnswer(false)}
              className="bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-2xl p-8 font-black text-2xl transition-all transform hover:scale-105"
            >
              <div className="text-5xl mb-2">✅</div>
              GÜVENLİ
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 text-white rounded-2xl p-8 font-black text-2xl transition-all transform hover:scale-105"
            >
              <div className="text-5xl mb-2">🎣</div>
              PHİSHİNG
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
            <h3 className="text-xl font-black text-red-300 mb-4">🚨 Phishing İşaretleri</h3>
            <ul className="space-y-2 text-white/90 text-sm">
              <li>• Şifre veya kişisel bilgi istiyor</li>
              <li>• Acil durum yaratıyor</li>
              <li>• Şüpheli e-posta adresi (.xyz, .net vb.)</li>
              <li>• Yazım hataları var</li>
              <li>• Çok güzel teklifler sunuyor</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

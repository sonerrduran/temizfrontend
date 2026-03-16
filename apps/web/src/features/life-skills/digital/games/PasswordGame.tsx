import React, { useState } from 'react';

interface PasswordGameProps {
  onExit: () => void;
}

export default function PasswordGame({ onExit }: PasswordGameProps) {
  const [password, setPassword] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const checkPassword = () => {
    let strength = 0;
    const feedbacks = [];

    if (password.length >= 8) {
      strength += 20;
      feedbacks.push('✅ En az 8 karakter');
    } else {
      feedbacks.push('❌ En az 8 karakter olmalı');
    }

    if (/[A-Z]/.test(password)) {
      strength += 20;
      feedbacks.push('✅ Büyük harf var');
    } else {
      feedbacks.push('❌ Büyük harf ekle');
    }

    if (/[a-z]/.test(password)) {
      strength += 20;
      feedbacks.push('✅ Küçük harf var');
    } else {
      feedbacks.push('❌ Küçük harf ekle');
    }

    if (/[0-9]/.test(password)) {
      strength += 20;
      feedbacks.push('✅ Rakam var');
    } else {
      feedbacks.push('❌ Rakam ekle');
    }

    if (/[!@#$%^&*]/.test(password)) {
      strength += 20;
      feedbacks.push('✅ Özel karakter var');
    } else {
      feedbacks.push('❌ Özel karakter ekle (!@#$%^&*)');
    }

    setScore(strength);
    setFeedback(feedbacks.join('\n'));
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
          <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
            <span className="text-white font-black">Güç: {score}/100</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black mb-4">🔐 Şifre Oluşturma</h1>
          <p className="text-white/80 text-lg">Güçlü bir şifre oluştur!</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-purple-500/30 p-8">
          <div className="mb-8">
            <label className="text-white font-bold text-xl mb-4 block">Şifreni Yaz:</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border-2 border-purple-500/30 rounded-xl p-4 text-white text-2xl font-mono"
              placeholder="Şifreni buraya yaz..."
            />
          </div>

          <button
            onClick={checkPassword}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-black text-xl py-4 rounded-xl transition-all mb-6"
          >
            Şifreyi Kontrol Et
          </button>

          {feedback && (
            <div className="bg-slate-700/50 rounded-2xl p-6">
              <div className="w-full bg-slate-600 rounded-full h-6 mb-4">
                <div
                  className={`h-6 rounded-full transition-all duration-500 ${
                    score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${score}%` }}
                />
              </div>
              <div className="space-y-2 whitespace-pre-line text-white">{feedback}</div>
            </div>
          )}

          <div className="mt-8 bg-purple-500/20 rounded-2xl p-6 border border-purple-500/30">
            <h3 className="text-xl font-black text-purple-300 mb-4">💡 İpuçları</h3>
            <ul className="space-y-2 text-white/90">
              <li>• En az 8 karakter kullan</li>
              <li>• Büyük ve küçük harf karıştır</li>
              <li>• Rakam ekle</li>
              <li>• Özel karakter kullan (!@#$%^&*)</li>
              <li>• Doğum tarihi veya adını kullanma</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

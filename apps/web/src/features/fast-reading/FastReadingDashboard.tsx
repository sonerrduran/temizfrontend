import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function FastReadingDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // Mock stats - gerçek API'den gelecek
  const stats = {
    fastReadingWpm: user?.fastReadingWpm || 0,
    totalSessions: 12,
    averageWpm: 180,
    improvement: 25
  };

  const wpm = stats.fastReadingWpm;

  // Badge belirleme
  let badge = 'Okumaya Başla!';
  let badgeColor = 'text-slate-400';
  if (wpm >= 500) {
    badge = '🔥 500 WPM Kulübü (Hız Ustası)';
    badgeColor = 'text-rose-500';
  } else if (wpm >= 300) {
    badge = '⚡ Süper Okuyucu';
    badgeColor = 'text-orange-500';
  } else if (wpm >= 200) {
    badge = '🚀 Gelişen Okuyucu';
    badgeColor = 'text-emerald-500';
  } else if (wpm > 0) {
    badge = '🌱 Başlangıç';
    badgeColor = 'text-cyan-500';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            ⬅
          </button>
          <h2 className="text-3xl md:text-5xl font-black text-white italic">Okuma Analizleri</h2>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/30 p-8 rounded-3xl text-center shadow-lg">
              <h3 className="text-indigo-300 font-bold uppercase tracking-widest text-sm mb-4">
                En Yüksek WPM
              </h3>
              <div className="text-7xl font-black text-white mb-2">{wpm}</div>
              <p className="text-slate-400 font-medium">Kelime / Dakika</p>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 p-8 rounded-3xl flex flex-col items-center justify-center shadow-lg">
              <h3 className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-4">
                Mevcut Seviye & Rozet
              </h3>
              <div className={`text-2xl md:text-3xl font-black text-center ${badgeColor}`}>
                {badge}
              </div>
              {wpm < 500 && wpm > 0 && (
                <p className="text-slate-500 mt-4 text-sm font-medium">
                  Sonraki rozet için {wpm < 200 ? 200 : wpm < 300 ? 300 : 500} WPM'e ulaş!
                </p>
              )}
            </div>
          </div>

          <div className="bg-black/30 p-6 rounded-3xl border border-white/5 space-y-4 mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>📈</span> Gelişim Grafiği (Demo)
            </h3>
            <div className="h-40 flex items-end justify-between gap-2 px-2">
              {[120, 150, 180, 175, 210, 240, wpm || 100].map((val, i, arr) => {
                const max = Math.max(...arr, 500);
                const height = (val / max) * 100;
                return (
                  <div
                    key={i}
                    className="w-full bg-slate-700 rounded-t-lg relative group transition-all hover:bg-indigo-500"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {val} WPM
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs font-bold text-slate-500 px-2 mt-2">
              <span>Pzt</span>
              <span>Sal</span>
              <span>Çar</span>
              <span>Per</span>
              <span>Cum</span>
              <span>Cmt</span>
              <span>Bugün</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => navigate('/fast-reading/menu')}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
          >
            Egzersizlere Başla 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

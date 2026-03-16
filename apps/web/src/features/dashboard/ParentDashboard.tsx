import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { userAPI, analyticsAPI, sessionAPI } from '../../services/api';

export default function ParentDashboard() {
  const { user, logout } = useAuthStore();
  const [children, setChildren] = useState<any[]>([]);
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [aiReport, setAiReport] = useState('');
  const [loading, setLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(false);

  useEffect(() => {
    loadChildren();
  }, []);

  const loadChildren = async () => {
    try {
      const res: any = await userAPI.getChildren();
      const kids = res.data || [];
      setChildren(kids);
      if (kids.length > 0) {
        selectChild(kids[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const selectChild = async (child: any) => {
    setSelectedChild(child);
    setAiReport('');
    try {
      const res: any = await analyticsAPI.student(child.id);
      setAnalytics(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const generateAIReport = async () => {
    if (!analytics || !selectedChild) return;
    setReportLoading(true);
    try {
      // Generate AI report based on analytics data
      const summary = analytics.summary;
      const report = generateLocalReport(selectedChild, summary, analytics);
      setAiReport(report);
    } catch (e) {
      setAiReport('Rapor oluşturulurken bir hata oluştu.');
    } finally {
      setReportLoading(false);
    }
  };

  const generateLocalReport = (child: any, summary: any, data: any) => {
    const stars = child.stars || 0;
    const level = child.level || 1;
    const correctRate = summary.correctRate || 0;
    const streak = child.streakDays || 0;
    const sessions = summary.totalSessions || 0;
    const weekSessions = summary.weeklySessions || 0;

    let grade = '';
    if (correctRate >= 90) grade = '🌟 Mükemmel';
    else if (correctRate >= 75) grade = '✨ Çok İyi';
    else if (correctRate >= 60) grade = '👍 İyi';
    else if (correctRate >= 40) grade = '📈 Gelişiyor';
    else grade = '💪 Başlangıç';

    let report = `📊 ${child.name} — Haftalık Karne Raporu\n\n`;
    report += `Genel Değerlendirme: ${grade}\n\n`;
    report += `${child.name}, bu hafta toplam ${weekSessions} oturum tamamladı. `;

    if (correctRate >= 75) {
      report += `Doğru cevap oranı %${correctRate} ile oldukça yüksek bir performans sergiledi. `;
    } else if (correctRate >= 50) {
      report += `Doğru cevap oranı %${correctRate} ile iyi bir seviyede. Biraz daha pratik yaparak daha da gelişebilir. `;
    } else {
      report += `Doğru cevap oranı %${correctRate} — daha fazla pratik yapması önerilir. `;
    }

    if (streak >= 7) {
      report += `🔥 ${streak} günlük bir serisi var, bu harika bir düzenlilik! `;
    } else if (streak >= 3) {
      report += `${streak} günlük serisi devam ediyor, teşvik edin! `;
    }

    report += `\n\nSeviye ${level} • ${stars} yıldız • ${summary.totalCorrect} doğru cevap`;

    if (data.badges?.length > 0) {
      report += `\n\n🏅 Kazanılan Rozetler: ${data.badges.map((b: any) => `${b.icon} ${b.name}`).join(', ')}`;
    }

    report += `\n\n💡 Öneri: `;
    if (weekSessions < 3) {
      report += 'Haftalık aktiviteyi artırmak için her gün en az bir oyun oynamayı hedefleyin.';
    } else if (correctRate < 60) {
      report += 'Zorlandığı konularda tekrar egzersizleri yapması faydalı olacaktır.';
    } else {
      report += 'Performansı çok iyi! Zorluk seviyesini artırarak daha da gelişebilir.';
    }

    return report;
  };

  const exportPDF = () => {
    if (!selectedChild || !analytics) return;
    const w = window.open('', '_blank');
    if (!w) return;

    const s = analytics.summary;
    let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Haftalık Rapor - ${selectedChild.name}</title>
        <style>
            body { font-family: 'Segoe UI', sans-serif; padding: 30px; max-width: 800px; margin: auto; }
            h1 { color: #1a1a2e; } h2 { color: #302b63; border-bottom: 2px solid #eee; padding-bottom: 8px; }
            .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 20px 0; }
            .stat { background: #f8f9fa; border-radius: 12px; padding: 16px; text-align: center; }
            .stat .value { font-size: 28px; font-weight: bold; color: #302b63; }
            .stat .label { font-size: 12px; color: #666; margin-top: 4px; }
            .report { background: #f0f0ff; border-left: 4px solid #302b63; padding: 16px; border-radius: 8px; margin: 20px 0; white-space: pre-line; }
            @media print { body { padding: 0; } }
        </style></head><body>
        <h1>📊 Haftalık Öğrenci Raporu</h1>
        <p><strong>Öğrenci:</strong> ${selectedChild.name} | <strong>Sınıf:</strong> ${selectedChild.gradeLevel}. Sınıf | <strong>Tarih:</strong> ${new Date().toLocaleDateString('tr-TR')}</p>

        <h2>📈 Genel İstatistikler</h2>
        <div class="stats">
            <div class="stat"><div class="value">${s.totalSessions}</div><div class="label">Toplam Oturum</div></div>
            <div class="stat"><div class="value">%${s.correctRate}</div><div class="label">Doğru Oranı</div></div>
            <div class="stat"><div class="value">${selectedChild.xp || 0}</div><div class="label">Toplam XP</div></div>
            <div class="stat"><div class="value">${selectedChild.stars || 0}⭐</div><div class="label">Yıldız</div></div>
        </div>

        <h2>🎯 Haftalık Performans</h2>
        <div class="stats">
            <div class="stat"><div class="value">${s.weeklySessions}</div><div class="label">Bu Hafta Oturum</div></div>
            <div class="stat"><div class="value">${s.weeklyXp}</div><div class="label">Bu Hafta XP</div></div>
            <div class="stat"><div class="value">${s.avgScore}</div><div class="label">Ort. Puan</div></div>
            <div class="stat"><div class="value">${selectedChild.streakDays || 0}🔥</div><div class="label">Seri</div></div>
        </div>`;

    if (aiReport) {
      html += `<h2>🤖 AI Karne Yorumu</h2><div class="report">${aiReport}</div>`;
    }

    html += `<script>window.print();</script></body></html>`;
    w.document.write(html);
    w.document.close();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center">
        <div className="text-6xl animate-bounce">👨‍👩‍👧</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      {/* Header */}
      <header className="bg-[#1a1a2e]/80 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">👨‍👩‍👧</span>
            <div>
              <h1 className="text-xl font-bold text-white">Veli Paneli</h1>
              <p className="text-white/40 text-xs">{user?.name}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 transition-all"
          >
            Çıkış 🚪
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Child Selector */}
        {children.length > 1 && (
          <div className="flex gap-2 mb-6">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => selectChild(child)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all
                                    ${
                                      selectedChild?.id === child.id
                                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                                    }`}
              >
                <span className="text-xl">{child.avatar || '👦'}</span>
                <span className="font-medium">{child.name}</span>
              </button>
            ))}
          </div>
        )}

        {selectedChild && analytics ? (
          <>
            {/* Student Info */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{selectedChild.avatar || '👦'}</div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedChild.name}</h2>
                  <p className="text-white/40">
                    {selectedChild.gradeLevel}. Sınıf • Seviye {selectedChild.level || 1}
                  </p>
                </div>
                <div className="ml-auto flex gap-3">
                  <button
                    onClick={generateAIReport}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm hover:opacity-90 transition-all flex items-center gap-2"
                  >
                    {reportLoading ? '⏳' : '🤖'} AI Karne Yorumu
                  </button>
                  <button
                    onClick={exportPDF}
                    className="px-4 py-2 rounded-lg bg-green-500/20 text-green-300 text-sm hover:bg-green-500/30 transition-all flex items-center gap-2"
                  >
                    📄 PDF Rapor
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                {
                  icon: '⭐',
                  label: 'Yıldız',
                  value: selectedChild.stars || 0,
                  color: 'from-yellow-500/20 to-amber-500/10',
                },
                {
                  icon: '🎯',
                  label: 'Doğru Oranı',
                  value: `%${analytics.summary.correctRate}`,
                  color: 'from-green-500/20 to-emerald-500/10',
                },
                {
                  icon: '🔥',
                  label: 'Seri',
                  value: `${selectedChild.streakDays || 0} gün`,
                  color: 'from-red-500/20 to-orange-500/10',
                },
                {
                  icon: '📊',
                  label: 'Toplam XP',
                  value: selectedChild.xp || 0,
                  color: 'from-blue-500/20 to-cyan-500/10',
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-br ${stat.color} border border-white/10 rounded-xl p-5 text-center`}
                >
                  <div className="text-3xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/40 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Weekly Performance */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">📈 Haftalık Performans</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">Oturum Sayısı</span>
                    <span className="text-white font-semibold">
                      {analytics.summary.weeklySessions}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">Kazanılan XP</span>
                    <span className="text-cyan-300 font-semibold">
                      {analytics.summary.weeklyXp}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">Doğru Cevap</span>
                    <span className="text-green-300 font-semibold">
                      {analytics.summary.totalCorrect}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">Ortalama Puan</span>
                    <span className="text-white font-semibold">{analytics.summary.avgScore}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">Ort. Süre</span>
                    <span className="text-white/60 font-semibold">
                      {Math.round((analytics.summary.avgDuration || 0) / 60)} dk
                    </span>
                  </div>
                </div>
                {/* Simple Bar Chart */}
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-white/40 text-xs mb-2">Doğru / Yanlış</p>
                  <div className="flex gap-1 h-6 rounded-full overflow-hidden bg-white/5">
                    <div
                      className="bg-green-500/60 rounded-l-full transition-all"
                      style={{ width: `${analytics.summary.correctRate}%` }}
                    />
                    <div className="bg-red-500/40 rounded-r-full flex-1" />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-green-400 text-xs">
                      ✅ {analytics.summary.totalCorrect}
                    </span>
                    <span className="text-red-400 text-xs">
                      ❌ {analytics.summary.totalIncorrect}
                    </span>
                  </div>
                </div>
              </div>

              {/* Game Distribution */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">🎮 Oyun Dağılımı</h3>
                {Object.keys(analytics.gameDistribution || {}).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(analytics.gameDistribution).map(
                      ([mode, data]: [string, any]) => (
                        <div key={mode}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white/70 text-sm">{mode}</span>
                            <span className="text-white/40 text-xs">{data.count} oturum</span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all"
                              style={{
                                width: `${Math.min(100, (data.count / Math.max(1, analytics.summary.totalSessions)) * 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-white/30 text-center py-4">Henüz veri yok</p>
                )}
              </div>
            </div>

            {/* Badges */}
            {analytics.badges?.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">🏅 Kazanılan Rozetler</h3>
                <div className="flex flex-wrap gap-3">
                  {analytics.badges.map((badge: any, i: number) => (
                    <div
                      key={i}
                      className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-xl px-4 py-3 text-center"
                    >
                      <div className="text-2xl">{badge.icon}</div>
                      <div className="text-white text-xs mt-1 font-medium">{badge.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Report */}
            {aiReport && (
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">🤖 AI Karne Yorumu</h3>
                <pre className="text-white/80 text-sm whitespace-pre-line font-sans leading-relaxed">
                  {aiReport}
                </pre>
              </div>
            )}

            {/* Recent Sessions */}
            {analytics.recentSessions?.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">🕐 Son Aktiviteler</h3>
                <div className="space-y-2">
                  {analytics.recentSessions.slice(0, 5).map((s: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">🎮</span>
                        <div>
                          <div className="text-white text-sm font-medium">{s.gameMode}</div>
                          <div className="text-white/40 text-xs">
                            {new Date(s.completedAt).toLocaleDateString('tr-TR')} •{' '}
                            {Math.round(s.durationSec / 60)} dk
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-sm font-semibold">{s.score} puan</div>
                        <div className="text-green-400 text-xs">
                          {s.correctAnswers}/{s.totalQuestions} doğru
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 text-white/30">
            <div className="text-6xl mb-4">👨‍👩‍👧</div>
            <p>Henüz bağlı çocuk hesabı yok.</p>
            <p className="text-sm mt-2">Çocuğunuzun hesabından veli bağlantısı kurulmalıdır.</p>
          </div>
        )}
      </main>
    </div>
  );
}

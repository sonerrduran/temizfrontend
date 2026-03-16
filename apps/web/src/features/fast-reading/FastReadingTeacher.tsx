import React, { useState } from 'react';
import { GameMode, UserStats } from '../../types';

interface FastReadingTeacherProps {
  stats: UserStats;
  setMode: (mode: GameMode) => void;
}

const MOCK_CLASS = [
  { name: 'Ahmet Y.', wpm: 620, badge: '🔥 Hız Ustası' },
  { name: 'Zeynep K.', wpm: 590, badge: '🔥 Hız Ustası' },
  { name: 'Mehmet A.', wpm: 560, badge: '🔥 Hız Ustası' },
  { name: 'Elif T.', wpm: 480, badge: '⚡ Süper Okuyucu' },
  { name: 'Can B.', wpm: 320, badge: '⚡ Süper Okuyucu' },
  { name: 'Ayşe G.', wpm: 210, badge: '🚀 Gelişen Okuyucu' },
  { name: 'Kerem S.', wpm: 120, badge: '🌱 Başlangıç' },
];

const FastReadingTeacher: React.FC<FastReadingTeacherProps> = ({ stats, setMode }) => {
  const [activeTab, setActiveTab] = useState<'LEADERBOARD' | 'ASSIGN'>('LEADERBOARD');

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-in fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setMode(GameMode.FAST_READING_MENU)}
          className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
        >
          ⬅
        </button>
        <h2 className="text-3xl md:text-5xl font-black text-white italic">Öğretmen Paneli</h2>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-[40px] p-6 md:p-12 shadow-2xl">
        <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('LEADERBOARD')}
            className={`px-6 py-3 rounded-2xl font-bold transition-all ${activeTab === 'LEADERBOARD' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}
          >
            Sınıf Sıralaması (Haftalık)
          </button>
          <button
            onClick={() => setActiveTab('ASSIGN')}
            className={`px-6 py-3 rounded-2xl font-bold transition-all ${activeTab === 'ASSIGN' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}
          >
            Ödev İzleme & Atama
          </button>
        </div>

        {activeTab === 'LEADERBOARD' && (
          <div className="animate-in slide-in-from-bottom flex flex-col gap-4">
            <div className="flex justify-between items-center bg-indigo-500/10 px-6 py-4 rounded-2xl text-indigo-300 font-bold">
              <span>Öğrenci Adı</span>
              <span>Başarı (WPM & Rozet)</span>
            </div>
            {MOCK_CLASS.map((student, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-6 rounded-3xl border border-white/5 transition-all hover:bg-white/5 ${idx < 3 ? 'bg-gradient-to-r from-orange-500/10 to-transparent border-l-4 border-l-orange-500' : 'bg-black/20'}`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`text-2xl font-black ${idx === 0 ? 'text-yellow-400' : idx === 1 ? 'text-slate-300' : idx === 2 ? 'text-amber-600' : 'text-slate-600'}`}
                  >
                    #{idx + 1}
                  </span>
                  <span className="text-white font-bold text-lg md:text-xl">{student.name}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-2xl font-black text-white">{student.wpm}</span>
                  <span
                    className="text-xs md:text-sm font-bold opacity-80 currentcolor"
                    style={{
                      color:
                        student.wpm >= 500
                          ? '#f43f5e'
                          : student.wpm >= 300
                            ? '#f97316'
                            : student.wpm >= 200
                              ? '#10b981'
                              : '#06b6d4',
                    }}
                  >
                    {student.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'ASSIGN' && (
          <div className="animate-in zoom-in h-40 flex items-center justify-center bg-black/20 border border-white/10 rounded-3xl p-8 text-center text-slate-400 font-medium">
            Öğretmenler bu bölümden öğrencilere özel metinler ekleyebilir ve süre kısıtlamalı
            testler atayabilir. (Backend bağlantısı ile aktifleşecektir.)
          </div>
        )}
      </div>
    </div>
  );
};

export default FastReadingTeacher;

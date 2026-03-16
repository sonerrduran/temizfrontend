import React, { useState, useEffect } from 'react';

interface ScreenTimeGameProps {
  onExit: () => void;
}

export default function ScreenTimeGame({ onExit }: ScreenTimeGameProps) {
  const [screenTime, setScreenTime] = useState(0);
  const [activities, setActivities] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [day, setDay] = useState(1);

  const activityOptions = [
    { name: 'Tablet Oyunu', time: 60, icon: '📱', isScreen: true },
    { name: 'Dışarıda Oyna', time: 60, icon: '⚽', isScreen: false },
    { name: 'TV İzle', time: 30, icon: '📺', isScreen: true },
    { name: 'Kitap Oku', time: 30, icon: '📚', isScreen: false },
    { name: 'Bilgisayar Oyunu', time: 45, icon: '💻', isScreen: true },
    { name: 'Arkadaşlarla Oyna', time: 45, icon: '👫', isScreen: false },
  ];

  const addActivity = (activity: (typeof activityOptions)[0]) => {
    if (screenTime + (activity.isScreen ? activity.time : 0) > 120) {
      setMessage('⚠️ Ekran süresi çok fazla! Başka aktivite seç.');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    setActivities([...activities, activity.name]);
    if (activity.isScreen) {
      setScreenTime(screenTime + activity.time);
    }
    setMessage(`✅ ${activity.name} eklendi!`);
    setTimeout(() => setMessage(''), 1000);
  };

  const endDay = () => {
    if (screenTime <= 120) {
      setMessage('🎉 Harika! Dengeli bir gün geçirdin!');
      setTimeout(() => {
        setDay(day + 1);
        setScreenTime(0);
        setActivities([]);
        setMessage('');
      }, 2000);
    } else {
      setMessage('❌ Çok fazla ekran kullandın!');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span className="text-white font-black">Gün: {day}</span>
            </div>
            <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
              <span
                className={`font-black ${screenTime > 120 ? 'text-red-400' : 'text-green-400'}`}
              >
                Ekran: {screenTime}/120 dk
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black mb-4">
            ⏰ Ekran Süresi Yönetimi
          </h1>
          <p className="text-white/80 text-lg">Dengeli bir gün planla! (Max 2 saat ekran)</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-blue-500/30 p-6 mb-6">
              <h2 className="text-2xl font-black text-white mb-4">Aktiviteler</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {activityOptions.map((activity, index) => (
                  <button
                    key={index}
                    onClick={() => addActivity(activity)}
                    className={`bg-gradient-to-br ${
                      activity.isScreen
                        ? 'from-purple-500/20 to-pink-500/20'
                        : 'from-green-500/20 to-emerald-500/20'
                    } hover:from-purple-500/30 hover:to-pink-500/30 border-2 border-purple-500/30 rounded-2xl p-4 transition-all transform hover:scale-105`}
                  >
                    <div className="text-5xl mb-2">{activity.icon}</div>
                    <p className="text-white font-bold text-sm">{activity.name}</p>
                    <p className="text-white/70 text-xs">{activity.time} dk</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={endDay}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-black text-xl py-4 rounded-xl transition-all"
            >
              Günü Bitir
            </button>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-purple-500/30 p-6">
            <h2 className="text-2xl font-black text-white mb-4">Bugünkü Plan</h2>
            {activities.length === 0 ? (
              <p className="text-white/60 text-center py-8">Henüz aktivite eklemedin</p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {activities.map((activity, index) => (
                  <div key={index} className="bg-white/5 p-3 rounded-lg">
                    <span className="text-white">{activity}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {message && (
          <div
            className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 text-xl font-black p-4 rounded-xl ${
              message.includes('✅') || message.includes('🎉')
                ? 'bg-green-500/90 text-white'
                : message.includes('⚠️') || message.includes('❌')
                  ? 'bg-red-500/90 text-white'
                  : 'bg-blue-500/90 text-white'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LessonCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
  route: string;
}

export default function TurkishLessonsMenu() {
  const navigate = useNavigate();

  const lessonCards: LessonCard[] = [
    {
      id: 'learn',
      title: 'ÖĞREN',
      subtitle: 'Alıştırmalarla pekiştir!',
      icon: '🎯',
      gradient: 'from-orange-500 to-red-600',
      route: '/lessons/turkish/learn',
    },
    {
      id: 'practice',
      title: 'PRATİK YAP',
      subtitle: 'Türkçe becerilerini geliştir!',
      icon: '✏️',
      gradient: 'from-blue-500 to-cyan-600',
      route: '/lessons/turkish/practice',
    },
    {
      id: 'games',
      title: 'OYUN ALANI',
      subtitle: 'Kelime oyunlarıyla eğlen!',
      icon: '📝',
      gradient: 'from-pink-500 to-rose-600',
      route: '/games?category=language',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
          >
            ⬅ GERİ DÖN
          </button>

          <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">
            TÜRKÇE DÜNYASI
          </h2>

          <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">
            Kelimeler, hikayeler ve dil becerileri! Türkçe yolculuğuna hazır mısın?
          </p>

          {/* Grade Selector */}
          <div className="flex justify-center gap-3">
            <div className="bg-white/10 text-white px-4 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border border-white/20 flex items-center gap-2">
              <span className="text-white/60">Sınıf:</span>
              <select className="bg-transparent text-white font-bold outline-none cursor-pointer">
                <option value="1" className="bg-slate-800">
                  1. SINIF
                </option>
                <option value="2" className="bg-slate-800">
                  2. SINIF
                </option>
                <option value="3" className="bg-slate-800">
                  3. SINIF
                </option>
                <option value="4" className="bg-slate-800">
                  4. SINIF
                </option>
                <option value="5" className="bg-slate-800">
                  5. SINIF
                </option>
                <option value="6" className="bg-slate-800">
                  6. SINIF
                </option>
                <option value="7" className="bg-slate-800">
                  7. SINIF
                </option>
                <option value="8" className="bg-slate-800">
                  8. SINIF
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Lesson Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-32 max-w-7xl mx-auto">
          {lessonCards.map((card) => (
            <button
              key={card.id}
              onClick={() => navigate(card.route)}
              className={`group bg-gradient-to-br ${card.gradient} p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48`}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">
                {card.icon}
              </div>
              <h3 className="text-white font-black text-xl mb-1 mt-auto">{card.title}</h3>
              <p className="text-white/80 text-xs font-medium relative z-10">{card.subtitle}</p>

              {/* Right Arrow */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                <span className="text-white text-xl font-black">›</span>
              </div>

              <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                {card.icon}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

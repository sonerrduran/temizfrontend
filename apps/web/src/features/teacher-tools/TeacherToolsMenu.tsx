import React from 'react';

interface Props {
  onBack: () => void;
  onSelectTool: (toolKey: string) => void;
}

const TOOLS = [
  {
    key: 'whiteboard',
    icon: '✏️',
    label: 'Beyaz Tahta',
    desc: 'Çiz, tasarla, karala!',
    color: 'from-stone-500 to-neutral-700',
  },
  {
    key: 'random',
    icon: '🎡',
    label: 'Rastgele Öğrenci',
    desc: 'Çarkı çevir, isim belirle!',
    color: 'from-indigo-500 to-purple-700',
  },
  {
    key: 'timer',
    icon: '⏱️',
    label: 'Zamanlayıcı',
    desc: 'Geri sayım ve kronometre',
    color: 'from-rose-500 to-red-700',
  },
  {
    key: 'group',
    icon: '👥',
    label: 'Grup Oluşturucu',
    desc: 'Sınıfı adil takımlara ayır',
    color: 'from-emerald-500 to-teal-700',
  },
  {
    key: 'dice',
    icon: '🎲',
    label: 'Zar & Sayı',
    desc: 'Zarları at, sayı çek',
    color: 'from-amber-500 to-orange-700',
  },
  {
    key: 'scoreboard',
    icon: '📊',
    label: 'Skor Tablosu',
    desc: 'Takım puan tahtası',
    color: 'from-cyan-500 to-blue-700',
  },
  {
    key: 'noise',
    icon: '🤫',
    label: 'Gürültü Ölçer',
    desc: 'Sınıf ses seviyesi',
    color: 'from-fuchsia-500 to-pink-700',
  },
  {
    key: 'sticky',
    icon: '📝',
    label: 'Mantar Pano',
    desc: 'Notlar ve hatırlatmalar',
    color: 'from-yellow-400 to-yellow-600',
  },
  {
    key: 'attendance',
    icon: '📋',
    label: 'Yoklama',
    desc: 'Hızlı yoklama takibi',
    color: 'from-emerald-600 to-green-800',
  },
  {
    key: 'seating',
    icon: '🪑',
    label: 'Oturma Düzeni',
    desc: 'Sınıf oturma planı',
    color: 'from-blue-500 to-indigo-700',
  },
  {
    key: 'poll',
    icon: '📊',
    label: 'Hızlı Anket',
    desc: 'Sınıf içi oylama',
    color: 'from-purple-500 to-pink-700',
  },
  {
    key: 'wordcloud',
    icon: '☁️',
    label: 'Kelime Bulutu',
    desc: 'Fikir ve kelime toplama',
    color: 'from-cyan-400 to-teal-600',
  },
  {
    key: 'birthday',
    icon: '🎂',
    label: 'Doğum Günü Takvimi',
    desc: 'Sınıf doğum günleri',
    color: 'from-pink-500 to-rose-700',
  },
  {
    key: 'goals',
    icon: '🎯',
    label: 'Hedef Takip',
    desc: 'Sınıf hedefleri ve ilerleme',
    color: 'from-emerald-400 to-green-600',
  },
  {
    key: 'notice',
    icon: '📮',
    label: 'Duyuru Panosu',
    desc: 'Duyurular ve notlar',
    color: 'from-amber-400 to-orange-600',
  },
  {
    key: 'spinwheel',
    icon: '🎪',
    label: 'Çarkıfelek',
    desc: 'Animasyonlu seçim çarkı',
    color: 'from-violet-500 to-purple-700',
  },
];

const TeacherToolsMenu: React.FC<Props> = ({ onBack, onSelectTool }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-2 bounce-in relative z-20">
      <div className="text-center mb-8">
        <button
          onClick={onBack}
          className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm"
        >
          ⬅ ANA EKRAN
        </button>
        <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">
          Öğretmen Araçları
        </h2>
        <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">
          Sınıf yönetimi ve eğitim için yardımcı araçlar.
        </p>
        <div className="flex justify-center gap-3">
          <span className="bg-white/10 text-white px-4 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border border-white/20">
            🎓 16 ARAÇ
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-32 max-w-7xl mx-auto">
        {TOOLS.map((tool) => (
          <button
            key={tool.key}
            onClick={() => onSelectTool(tool.key)}
            className={`group bg-gradient-to-br ${tool.color} p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48`}
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">
              {tool.icon}
            </div>
            <h3 className="text-white font-black text-xl mb-1 mt-auto">{tool.label}</h3>
            <p
              className={`${tool.key === 'sticky' ? 'text-black/60' : 'text-white/80'} text-xs font-medium relative z-10`}
            >
              {tool.desc}
            </p>

            {/* Right Arrow */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
              <span className="text-white text-xl font-black">›</span>
            </div>

            <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
              {tool.icon}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeacherToolsMenu;

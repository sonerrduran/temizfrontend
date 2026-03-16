interface DigitalSecurityLessonsProps {
  gradeLevel: number;
  onExit: () => void;
}

export default function DigitalSecurityLessons({ gradeLevel, onExit }: DigitalSecurityLessonsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={onExit} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all">
          ⬅ GERİ DÖN
        </button>
        <h1 className="text-4xl font-black text-white mb-8">Dijital Güvenlik Dersleri - {gradeLevel}. Sınıf</h1>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <p className="text-white text-lg">İçerik geliştiriliyor...</p>
        </div>
      </div>
    </div>
  );
}

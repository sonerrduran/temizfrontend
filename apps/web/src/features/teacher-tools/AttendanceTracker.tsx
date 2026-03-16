import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

interface Student {
  name: string;
  status: 'present' | 'absent' | 'late' | 'unset';
}

const AttendanceTracker: React.FC<Props> = ({ onExit }) => {
  const [namesText, setNamesText] = useState(
    'Ahmet\nAyşe\nMehmet\nFatma\nAli\nVeli\nZeynep\nDeniz\nEfe\nEla'
  );
  const [students, setStudents] = useState<Student[]>([]);
  const [started, setStarted] = useState(false);
  const [date] = useState(
    new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
  );

  const startAttendance = () => {
    const list = namesText
      .split('\n')
      .map((n) => n.trim())
      .filter((n) => n.length > 0);
    if (list.length === 0) return;
    setStudents(list.map((name) => ({ name, status: 'unset' })));
    setStarted(true);
  };

  const setStatus = (index: number, status: Student['status']) => {
    setStudents((prev) => prev.map((s, i) => (i === index ? { ...s, status } : s)));
  };

  const markAllPresent = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, status: 'present' })));
  };

  const counts = {
    present: students.filter((s) => s.status === 'present').length,
    absent: students.filter((s) => s.status === 'absent').length,
    late: students.filter((s) => s.status === 'late').length,
    unset: students.filter((s) => s.status === 'unset').length,
  };

  const statusConfig = {
    present: { icon: '✅', label: 'Var', color: 'bg-emerald-500', ring: 'ring-emerald-500/30' },
    absent: { icon: '❌', label: 'Yok', color: 'bg-red-500', ring: 'ring-red-500/30' },
    late: { icon: '⏰', label: 'Geç', color: 'bg-amber-500', ring: 'ring-amber-500/30' },
    unset: { icon: '⬜', label: '—', color: 'bg-slate-600', ring: '' },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full p-4 relative">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onExit}
          className="px-6 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-2 border border-slate-700 font-bold"
        >
          <span>⬅</span> Çıkış
        </button>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-xl p-6 md:p-8 rounded-[40px] shadow-2xl border border-white/10 w-full max-w-3xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-emerald-400 italic mb-1">Yoklama</h2>
          <p className="text-white/40 text-sm">📅 {date}</p>
        </div>

        {!started ? (
          <div className="flex flex-col gap-4">
            <p className="text-white/60 text-sm">
              Öğrenci isimlerini her satıra bir tane gelecek şekilde yazın:
            </p>
            <textarea
              value={namesText}
              onChange={(e) => setNamesText(e.target.value)}
              className="w-full h-48 bg-slate-950 text-white p-4 rounded-2xl border border-white/10 focus:border-emerald-500 outline-none resize-none font-medium"
              placeholder="İsimleri buraya yazın..."
            />
            <button
              onClick={startAttendance}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-black text-lg transition-all shadow-xl"
            >
              📋 Yoklamayı Başlat
            </button>
          </div>
        ) : (
          <>
            {/* Summary */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              <div className="bg-emerald-500/15 rounded-xl p-3 text-center">
                <div className="text-2xl font-black text-emerald-400">{counts.present}</div>
                <div className="text-white/50 text-[10px] font-bold uppercase">Var</div>
              </div>
              <div className="bg-red-500/15 rounded-xl p-3 text-center">
                <div className="text-2xl font-black text-red-400">{counts.absent}</div>
                <div className="text-white/50 text-[10px] font-bold uppercase">Yok</div>
              </div>
              <div className="bg-amber-500/15 rounded-xl p-3 text-center">
                <div className="text-2xl font-black text-amber-400">{counts.late}</div>
                <div className="text-white/50 text-[10px] font-bold uppercase">Geç</div>
              </div>
              <div className="bg-slate-500/15 rounded-xl p-3 text-center">
                <div className="text-2xl font-black text-slate-400">{counts.unset}</div>
                <div className="text-white/50 text-[10px] font-bold uppercase">Bekliyor</div>
              </div>
            </div>

            <button
              onClick={markAllPresent}
              className="w-full mb-4 px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xl font-bold text-sm hover:bg-emerald-500/20 transition-all"
            >
              ✅ Hepsini Var İşaretle
            </button>

            {/* Student List */}
            <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
              {students.map((student, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 transition-all ${student.status !== 'unset' ? 'ring-2 ' + statusConfig[student.status].ring : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg w-8 text-center font-bold text-white/30">{i + 1}</span>
                    <span className="text-white font-semibold">{student.name}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {(['present', 'late', 'absent'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => setStatus(i, status)}
                        className={`w-10 h-10 rounded-lg font-bold text-sm transition-all flex items-center justify-center ${student.status === status ? statusConfig[status].color + ' text-white scale-110 shadow-lg' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                        title={statusConfig[status].label}
                      >
                        {statusConfig[status].icon}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStarted(false)}
              className="w-full mt-4 px-4 py-3 bg-slate-800 text-white/60 rounded-xl font-bold text-sm hover:bg-slate-700 hover:text-white transition-all"
            >
              🔄 Listeyi Düzenle
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AttendanceTracker;

import React, { useState, useMemo } from 'react';

interface Props {
  onExit: () => void;
}

interface Student {
  name: string;
  birthdate: string; // "YYYY-MM-DD" or "DD.MM.YYYY"
}

const MONTHS_TR = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
];
const DAYS_TR = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

const SAMPLE_STUDENTS: Student[] = [
  { name: 'Ahmet Yılmaz', birthdate: '2014-03-05' },
  { name: 'Ayşe Kaya', birthdate: '2014-07-15' },
  { name: 'Mehmet Demir', birthdate: '2013-11-22' },
  { name: 'Fatma Çelik', birthdate: '2014-01-30' },
  { name: 'Ali Şahin', birthdate: '2014-05-08' },
  { name: 'Zeynep Aydın', birthdate: '2013-12-25' },
  { name: 'Can Arslan', birthdate: '2014-03-05' },
  { name: 'Selin Öztürk', birthdate: '2014-08-19' },
  { name: 'Berk Yıldız', birthdate: '2014-02-14' },
  { name: 'Elif Güneş', birthdate: '2014-06-01' },
];

function parseDate(str: string): Date | null {
  if (!str) return null;
  // Try YYYY-MM-DD
  const iso = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) return new Date(+iso[1], +iso[2] - 1, +iso[3]);
  // Try DD.MM.YYYY
  const tr = str.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (tr) return new Date(+tr[3], +tr[2] - 1, +tr[1]);
  return null;
}

const BirthdayCalendar: React.FC<Props> = ({ onExit }) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [students, setStudents] = useState<Student[]>(SAMPLE_STUDENTS);
  const [showEdit, setShowEdit] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDate, setNewDate] = useState('');

  // Build birthday map: "MM-DD" -> students[]
  const birthdayMap = useMemo(() => {
    const map = new Map<string, Student[]>();
    students.forEach((s) => {
      const d = parseDate(s.birthdate);
      if (!d) return;
      const key = `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(s);
    });
    return map;
  }, [students]);

  // Upcoming birthdays (next 30 days)
  const upcoming = useMemo(() => {
    const result: { daysLeft: number; student: Student; date: Date }[] = [];
    students.forEach((s) => {
      const d = parseDate(s.birthdate);
      if (!d) return;
      const thisYear = new Date(today.getFullYear(), d.getMonth(), d.getDate());
      let diff = Math.ceil((thisYear.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      if (diff < 0) diff += 365;
      if (diff <= 30) result.push({ daysLeft: diff, student: s, date: thisYear });
    });
    return result.sort((a, b) => a.daysLeft - b.daysLeft);
  }, [students]);

  // Calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1);
  const lastDay = new Date(viewYear, viewMonth + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7; // Mon=0
  const totalCells = startOffset + lastDay.getDate();
  const cells = Array.from({ length: Math.ceil(totalCells / 7) * 7 }, (_, i) => {
    const day = i - startOffset + 1;
    return day >= 1 && day <= lastDay.getDate() ? day : null;
  });

  const addStudent = () => {
    if (!newName.trim() || !newDate) return;
    setStudents((prev) => [...prev, { name: newName.trim(), birthdate: newDate }]);
    setNewName('');
    setNewDate('');
  };
  const removeStudent = (i: number) => setStudents((prev) => prev.filter((_, idx) => idx !== i));

  const todayKey = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const todayBirthdays = birthdayMap.get(todayKey) || [];

  return (
    <div className="flex flex-col items-center min-h-[80vh] w-full p-4 relative">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onExit}
          className="px-6 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-2 border border-slate-700 font-bold"
        >
          <span>⬅</span> Çıkış
        </button>
      </div>

      <div className="w-full max-w-5xl mt-14 md:mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Calendar */}
        <div className="md:col-span-2 bg-slate-900/80 backdrop-blur-xl p-6 rounded-[32px] shadow-2xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => {
                const d = new Date(viewYear, viewMonth - 1);
                setViewMonth(d.getMonth());
                setViewYear(d.getFullYear());
              }}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all"
            >
              ‹
            </button>
            <h2 className="text-xl font-black text-white">
              {MONTHS_TR[viewMonth]} {viewYear}
            </h2>
            <button
              onClick={() => {
                const d = new Date(viewYear, viewMonth + 1);
                setViewMonth(d.getMonth());
                setViewYear(d.getFullYear());
              }}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all"
            >
              ›
            </button>
          </div>

          {/* Header */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS_TR.map((d) => (
              <div key={d} className="text-center text-white/30 text-xs font-bold py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const key = `${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const bdays = birthdayMap.get(key) || [];
              const isToday =
                day === today.getDate() &&
                viewMonth === today.getMonth() &&
                viewYear === today.getFullYear();
              return (
                <div
                  key={i}
                  title={bdays.map((s) => s.name).join(', ')}
                  className={`relative min-h-[48px] rounded-xl p-1 flex flex-col items-center justify-start transition-all ${isToday ? 'bg-purple-500/30 border border-purple-500/60' : bdays.length > 0 ? 'bg-pink-500/15 border border-pink-500/30' : 'bg-white/3 hover:bg-white/8 border border-white/5'}`}
                >
                  <span
                    className={`text-xs font-bold ${isToday ? 'text-purple-300' : 'text-white/70'}`}
                  >
                    {day}
                  </span>
                  {bdays.length > 0 && (
                    <div className="flex flex-col items-center gap-0.5 mt-0.5">
                      <span className="text-[10px]">🎂</span>
                      {bdays.length > 1 && (
                        <span className="text-[8px] text-pink-300 font-bold">+{bdays.length}</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col gap-4">
          {/* Today's birthdays */}
          {todayBirthdays.length > 0 && (
            <div className="bg-gradient-to-br from-pink-500/20 to-rose-600/20 border border-pink-500/30 rounded-2xl p-4">
              <h3 className="text-pink-300 font-black text-sm mb-2 flex items-center gap-1">
                🎉 Bugün Doğum Günü!
              </h3>
              {todayBirthdays.map((s, i) => (
                <div
                  key={i}
                  className="text-white font-bold text-sm bg-white/10 rounded-lg px-3 py-1.5 mb-1"
                >
                  {s.name} 🎂
                </div>
              ))}
            </div>
          )}

          {/* Upcoming */}
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 flex-1">
            <h3 className="text-white/70 font-black text-sm mb-3">📅 Yaklaşan (30 Gün)</h3>
            {upcoming.length === 0 ? (
              <p className="text-white/30 text-xs">30 gün içinde doğum günü yok.</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {upcoming.map(({ daysLeft, student, date }, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                    <span className={`text-lg ${daysLeft === 0 ? 'animate-bounce' : ''}`}>
                      {daysLeft === 0 ? '🎉' : '🎂'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-xs font-bold truncate">{student.name}</div>
                      <div className="text-white/40 text-[10px]">
                        {date.getDate()} {MONTHS_TR[date.getMonth()]}
                      </div>
                    </div>
                    <span
                      className={`text-xs font-black px-2 py-0.5 rounded-full ${daysLeft === 0 ? 'bg-pink-500 text-white' : 'bg-white/10 text-white/50'}`}
                    >
                      {daysLeft === 0 ? 'BUGÜN' : `${daysLeft}g`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Edit toggle */}
          <button
            onClick={() => setShowEdit(!showEdit)}
            className="px-4 py-2.5 bg-white/5 border border-white/10 text-white/60 hover:text-white rounded-xl text-sm font-bold transition-all hover:bg-white/10"
          >
            {showEdit ? '▲ Listeyi Gizle' : '✏️ Öğrenci Ekle / Düzenle'}
          </button>

          {/* Edit panel */}
          {showEdit && (
            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4">
              <div className="flex flex-col gap-2 mb-3">
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Öğrenci adı"
                  className="bg-slate-950 text-white p-2.5 rounded-lg border border-white/10 focus:border-pink-500 outline-none text-sm"
                />
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="bg-slate-950 text-white p-2.5 rounded-lg border border-white/10 focus:border-pink-500 outline-none text-sm"
                />
                <button
                  onClick={addStudent}
                  className="py-2 bg-pink-500 hover:bg-pink-400 text-white rounded-lg font-bold text-sm transition-all"
                >
                  ➕ Ekle
                </button>
              </div>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {students.map((s, i) => {
                  const d = parseDate(s.birthdate);
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-1.5 bg-white/5 rounded-lg group"
                    >
                      <span className="text-[10px] text-white/50 w-4">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-xs truncate">{s.name}</div>
                        <div className="text-white/30 text-[10px]">
                          {d ? `${d.getDate()} ${MONTHS_TR[d.getMonth()]}` : ''}
                        </div>
                      </div>
                      <button
                        onClick={() => removeStudent(i)}
                        className="opacity-0 group-hover:opacity-100 text-red-400 text-xs transition-all"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BirthdayCalendar;

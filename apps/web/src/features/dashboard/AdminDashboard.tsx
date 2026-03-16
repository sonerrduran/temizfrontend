import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import {
  schoolAPI,
  classroomAPI,
  userAPI,
  timetableAPI,
  dutyAPI,
  curriculumAPI,
  questionAPI,
  analyticsAPI,
} from '../../services/api';

type Tab = 'overview' | 'timetable' | 'duty' | 'users' | 'curriculum' | 'questions' | 'analytics';

const DAYS = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
const PERIODS = [
  { period: 1, start: '08:30', end: '09:10' },
  { period: 2, start: '09:20', end: '10:00' },
  { period: 3, start: '10:10', end: '10:50' },
  { period: 4, start: '11:00', end: '11:40' },
  { period: 5, start: '11:50', end: '12:30' },
  { period: 6, start: '13:20', end: '14:00' },
  { period: 7, start: '14:10', end: '14:50' },
  { period: 8, start: '15:00', end: '15:40' },
];

const DUTY_LOCATIONS = [
  'Bahçe',
  'Koridor 1. Kat',
  'Koridor 2. Kat',
  'Koridor 3. Kat',
  'Yemekhane',
  'Otopark Girişi',
  'Ana Giriş',
];

export default function AdminDashboard() {
  const { user, logout } = useAuthStore();
  const [tab, setTab] = useState<Tab>('overview');
  const [stats, setStats] = useState<any>({ classrooms: 0, teachers: '—', students: '—' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const cls: any = await classroomAPI.list();
      const users: any = await userAPI.listUsers({ role: 'TEACHER' });
      const students: any = await userAPI.listUsers({ role: 'STUDENT' });
      setStats({
        classrooms: cls.data?.length || 0,
        teachers: users.data?.length || 0,
        students: students.data?.length || 0,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const tabs: { key: Tab; icon: string; label: string }[] = [
    { key: 'overview', icon: '📊', label: 'Genel Bakış' },
    { key: 'timetable', icon: '📅', label: 'Ders Programı' },
    { key: 'duty', icon: '🛎️', label: 'Nöbet Listesi' },
    { key: 'users', icon: '👥', label: 'Kullanıcılar' },
    { key: 'curriculum', icon: '📚', label: 'Müfredat' },
    { key: 'questions', icon: '❓', label: 'Soru Havuzu' },
    { key: 'analytics', icon: '📈', label: 'Analitik' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      {/* Header */}
      <header className="bg-[#1a1a2e]/80 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏫</span>
            <div>
              <h1 className="text-xl font-bold text-white">Yönetici Paneli</h1>
              <p className="text-white/40 text-xs">{user?.school?.name || 'Platform Yönetimi'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/60 text-sm hidden md:block">{user?.name}</span>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 transition-all"
            >
              Çıkış 🚪
            </button>
          </div>
        </div>
      </header>

      {/* Tab Bar */}
      <div className="bg-[#1a1a2e]/40 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2
                                    ${tab === t.key ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}
              >
                <span>{t.icon}</span> {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {tab === 'overview' && <OverviewTab stats={stats} setTab={setTab} />}
        {tab === 'timetable' && <TimetableTab />}
        {tab === 'duty' && <DutyTab />}
        {tab === 'users' && <UsersTab />}
        {tab === 'curriculum' && <CurriculumTab />}
        {tab === 'questions' && <QuestionsTab />}
        {tab === 'analytics' && <AnalyticsTab />}
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// OVERVIEW TAB
// ═══════════════════════════════════════════════════════════
function OverviewTab({ stats, setTab }: { stats: any; setTab: (t: Tab) => void }) {
  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-6">Yönetim Merkezi</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            icon: '📚',
            label: 'Sınıflar',
            value: stats.classrooms,
            color: 'from-blue-500/20 to-blue-600/10',
          },
          {
            icon: '👩‍🏫',
            label: 'Öğretmenler',
            value: stats.teachers,
            color: 'from-green-500/20 to-green-600/10',
          },
          {
            icon: '👨‍🎓',
            label: 'Öğrenciler',
            value: stats.students,
            color: 'from-purple-500/20 to-purple-600/10',
          },
          {
            icon: '📋',
            label: 'Müfredat',
            value: '—',
            color: 'from-orange-500/20 to-orange-600/10',
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${stat.color} border border-white/10 rounded-xl p-5 text-center`}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-white/40 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          {
            icon: '📅',
            label: 'Ders Programı',
            desc: 'Haftalık program oluştur',
            tab: 'timetable' as Tab,
            color: 'hover:border-blue-500/50 hover:bg-blue-500/10',
          },
          {
            icon: '🛎️',
            label: 'Nöbet Listesi',
            desc: 'Öğretmen nöbet planı',
            tab: 'duty' as Tab,
            color: 'hover:border-orange-500/50 hover:bg-orange-500/10',
          },
          {
            icon: '📚',
            label: 'Müfredat',
            desc: 'Ders ve konu yönetimi',
            tab: 'curriculum' as Tab,
            color: 'hover:border-green-500/50 hover:bg-green-500/10',
          },
          {
            icon: '❓',
            label: 'Soru Havuzu',
            desc: 'Soru bankası yönetimi',
            tab: 'questions' as Tab,
            color: 'hover:border-yellow-500/50 hover:bg-yellow-500/10',
          },
          {
            icon: '👥',
            label: 'Kullanıcılar',
            desc: 'Öğretmen ve öğrenci yönetimi',
            tab: 'users' as Tab,
            color: 'hover:border-purple-500/50 hover:bg-purple-500/10',
          },
          {
            icon: '📈',
            label: 'Analitik',
            desc: 'Okul bazlı raporlar',
            tab: 'analytics' as Tab,
            color: 'hover:border-cyan-500/50 hover:bg-cyan-500/10',
          },
        ].map((a, i) => (
          <button
            key={i}
            onClick={() => setTab(a.tab)}
            className={`bg-white/5 border border-white/10 rounded-xl p-6 ${a.color} transition-all cursor-pointer group text-left`}
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{a.icon}</div>
            <div className="text-white font-semibold">{a.label}</div>
            <div className="text-white/40 text-xs mt-1">{a.desc}</div>
          </button>
        ))}
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// TIMETABLE TAB
// ═══════════════════════════════════════════════════════════
function TimetableTab() {
  const [timetables, setTimetables] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [addSlot, setAddSlot] = useState<{ day: number; period: number } | null>(null);
  const [slotForm, setSlotForm] = useState({ classroomId: '', subjectId: '' });

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const [tt, cls, subj]: any[] = await Promise.all([
        timetableAPI.list(),
        classroomAPI.list(),
        curriculumAPI.subjects(),
      ]);
      setTimetables(tt.data || []);
      setClassrooms(cls.data || []);
      setSubjects(subj.data || []);
      // Auto-select first active
      const active = (tt.data || []).find((t: any) => t.isActive);
      if (active) loadTimetable(active.id);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadTimetable = async (id: string) => {
    try {
      const res: any = await timetableAPI.get(id);
      setSelected(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const createTimetable = async () => {
    if (!newName.trim()) return;
    try {
      const res: any = await timetableAPI.create({ name: newName });
      setTimetables((prev) => [res.data, ...prev]);
      setSelected(res.data);
      setNewName('');
      setShowCreate(false);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteTimetable = async (id: string) => {
    if (!confirm('Bu ders programını silmek istediğinize emin misiniz?')) return;
    try {
      await timetableAPI.delete(id);
      setTimetables((prev) => prev.filter((t) => t.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddSlot = async () => {
    if (!addSlot || !slotForm.classroomId || !slotForm.subjectId || !selected) return;
    const p = PERIODS.find((p) => p.period === addSlot.period)!;
    try {
      await timetableAPI.addSlot(selected.id, {
        classroomId: slotForm.classroomId,
        subjectId: slotForm.subjectId,
        dayOfWeek: addSlot.day,
        period: addSlot.period,
        startTime: p.start,
        endTime: p.end,
      });
      loadTimetable(selected.id);
      setAddSlot(null);
      setSlotForm({ classroomId: '', subjectId: '' });
    } catch (e: any) {
      alert(e?.error || 'Slot eklenemedi');
    }
  };

  const deleteSlot = async (slotId: string) => {
    if (!selected) return;
    try {
      await timetableAPI.deleteSlot(selected.id, slotId);
      loadTimetable(selected.id);
    } catch (e) {
      console.error(e);
    }
  };

  const getSlot = (day: number, period: number) => {
    return selected?.slots?.find((s: any) => s.dayOfWeek === day && s.period === period);
  };

  const exportPDF = () => {
    if (!selected) return;
    const w = window.open('', '_blank');
    if (!w) return;

    let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Ders Programı - ${selected.name}</title>
        <style>
            body { font-family: 'Segoe UI', sans-serif; padding: 20px; }
            h1 { text-align: center; color: #1a1a2e; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 12px; }
            th { background: #1a1a2e; color: white; }
            .period-header { background: #f0f0f0; font-weight: bold; }
            @media print { body { padding: 0; } }
        </style></head><body>
        <h1>📅 ${selected.name}</h1>
        <table><thead><tr><th>Saat</th>`;
    DAYS.forEach((d) => (html += `<th>${d}</th>`));
    html += '</tr></thead><tbody>';

    PERIODS.forEach((p) => {
      html += `<tr><td class="period-header">${p.period}. Ders<br/><small>${p.start}-${p.end}</small></td>`;
      for (let d = 1; d <= 5; d++) {
        const slot = getSlot(d, p.period);
        html += `<td>${slot ? `${slot.subject?.icon || ''} ${slot.subject?.name || ''}<br/><small>${slot.classroom?.name || ''}</small>` : ''}</td>`;
      }
      html += '</tr>';
    });

    html += '</tbody></table><script>window.print();</script></body></html>';
    w.document.write(html);
    w.document.close();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">📅 Ders Programı</h2>
        <div className="flex gap-2">
          {selected && (
            <button
              onClick={exportPDF}
              className="px-4 py-2 rounded-lg bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-all text-sm flex items-center gap-2"
            >
              📄 PDF Yazdır
            </button>
          )}
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-all text-sm"
          >
            + Yeni Program
          </button>
        </div>
      </div>

      {/* Create Form */}
      {showCreate && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 flex gap-3">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Program adı (örn: 2025-2026 Güz)"
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50"
          />
          <button
            onClick={createTimetable}
            className="px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition-all"
          >
            Oluştur
          </button>
          <button
            onClick={() => setShowCreate(false)}
            className="px-4 py-2 rounded-lg bg-white/10 text-white/60 hover:bg-white/20 transition-all"
          >
            İptal
          </button>
        </div>
      )}

      {/* Timetable List */}
      {timetables.length > 0 && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {timetables.map((t) => (
            <button
              key={t.id}
              onClick={() => loadTimetable(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all
                                ${selected?.id === t.id ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
            >
              {t.isActive && <span className="w-2 h-2 bg-green-400 rounded-full"></span>}
              {t.name}
              <span className="text-white/30 text-xs ml-1">({t._count?.slots || 0})</span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTimetable(t.id);
                }}
                className="ml-1 text-red-400/60 hover:text-red-400 cursor-pointer"
              >
                ✕
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Timetable Grid */}
      {selected ? (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1a1a2e]/80">
                  <th className="px-3 py-3 text-left text-white/60 text-xs font-medium w-24">
                    Saat
                  </th>
                  {DAYS.map((d, i) => (
                    <th
                      key={i}
                      className="px-3 py-3 text-center text-white/80 text-sm font-semibold"
                    >
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERIODS.map((p) => (
                  <tr key={p.period} className="border-t border-white/5">
                    <td className="px-3 py-2 text-white/40 text-xs">
                      <div className="font-semibold text-white/60">{p.period}. Ders</div>
                      <div>
                        {p.start}-{p.end}
                      </div>
                    </td>
                    {DAYS.map((_, di) => {
                      const slot = getSlot(di + 1, p.period);
                      return (
                        <td key={di} className="px-2 py-1 text-center border-l border-white/5">
                          {slot ? (
                            <div className="bg-gradient-to-br from-cyan-500/15 to-purple-500/15 rounded-lg p-2 relative group">
                              <div className="text-lg">{slot.subject?.icon || '📚'}</div>
                              <div className="text-white text-xs font-medium mt-0.5">
                                {slot.subject?.name}
                              </div>
                              <div className="text-white/40 text-[10px]">
                                {slot.classroom?.name}
                              </div>
                              <button
                                onClick={() => deleteSlot(slot.id)}
                                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500/80 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setAddSlot({ day: di + 1, period: p.period })}
                              className="w-full h-full min-h-[60px] rounded-lg border border-dashed border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all text-white/20 hover:text-cyan-400 text-lg"
                            >
                              +
                            </button>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 text-white/30">
          <div className="text-6xl mb-4">📅</div>
          <p>Henüz ders programı yok. Yeni bir program oluşturun.</p>
        </div>
      )}

      {/* Add Slot Modal */}
      {addSlot && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setAddSlot(null)}
        >
          <div
            className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-white mb-4">
              Ders Ekle — {DAYS[addSlot.day - 1]}, {addSlot.period}. Ders
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-white/60 text-sm">Sınıf</label>
                <select
                  value={slotForm.classroomId}
                  onChange={(e) => setSlotForm({ ...slotForm, classroomId: e.target.value })}
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="">Sınıf seçin</option>
                  {classrooms.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.gradeLevel}. Sınıf)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-white/60 text-sm">Ders</label>
                <select
                  value={slotForm.subjectId}
                  onChange={(e) => setSlotForm({ ...slotForm, subjectId: e.target.value })}
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="">Ders seçin</option>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.icon} {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddSlot}
                className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:opacity-90 transition-all"
              >
                Ekle
              </button>
              <button
                onClick={() => setAddSlot(null)}
                className="px-6 py-2.5 rounded-lg bg-white/10 text-white/60 hover:bg-white/20 transition-all"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// DUTY TAB
// ═══════════════════════════════════════════════════════════
function DutyTab() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: '', weekStart: '', weekEnd: '' });
  const [addAssign, setAddAssign] = useState<number | null>(null); // dayOfWeek
  const [assignForm, setAssignForm] = useState({ teacherId: '', location: '' });

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const [sch, tch]: any[] = await Promise.all([dutyAPI.list(), dutyAPI.getTeachers()]);
      setSchedules(sch.data || []);
      setTeachers(tch.data || []);
      const active = (sch.data || []).find((s: any) => s.isActive);
      if (active) loadSchedule(active.id);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadSchedule = async (id: string) => {
    try {
      const res: any = await dutyAPI.get(id);
      setSelected(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const createSchedule = async () => {
    if (!form.name || !form.weekStart || !form.weekEnd) return;
    try {
      const res: any = await dutyAPI.create(form);
      setSchedules((prev) => [res.data, ...prev]);
      setSelected(res.data);
      setForm({ name: '', weekStart: '', weekEnd: '' });
      setShowCreate(false);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteSchedule = async (id: string) => {
    if (!confirm('Bu nöbet listesini silmek istediğinize emin misiniz?')) return;
    try {
      await dutyAPI.delete(id);
      setSchedules((prev) => prev.filter((s) => s.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch (e) {
      console.error(e);
    }
  };

  const addAssignment = async () => {
    if (addAssign === null || !assignForm.teacherId || !selected) return;
    try {
      await dutyAPI.addAssignment(selected.id, {
        teacherId: assignForm.teacherId,
        dayOfWeek: addAssign,
        location: assignForm.location || undefined,
      });
      loadSchedule(selected.id);
      setAddAssign(null);
      setAssignForm({ teacherId: '', location: '' });
    } catch (e: any) {
      alert(e?.error || 'Atama yapılamadı');
    }
  };

  const deleteAssignment = async (assignmentId: string) => {
    if (!selected) return;
    try {
      await dutyAPI.deleteAssignment(selected.id, assignmentId);
      loadSchedule(selected.id);
    } catch (e) {
      console.error(e);
    }
  };

  const getAssignments = (day: number) => {
    return (selected?.assignments || []).filter((a: any) => a.dayOfWeek === day);
  };

  const exportPDF = () => {
    if (!selected) return;
    const w = window.open('', '_blank');
    if (!w) return;

    let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Nöbet Listesi - ${selected.name}</title>
        <style>
            body { font-family: 'Segoe UI', sans-serif; padding: 20px; }
            h1 { text-align: center; color: #1a1a2e; }
            h3 { text-align: center; color: #666; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: center; }
            th { background: #1a1a2e; color: white; }
            @media print { body { padding: 0; } }
        </style></head><body>
        <h1>🛎️ ${selected.name}</h1>
        <h3>${selected.weekStart} — ${selected.weekEnd}</h3>
        <table><thead><tr>`;
    DAYS.forEach((d) => (html += `<th>${d}</th>`));
    html += '</tr></thead><tbody><tr>';

    for (let d = 1; d <= 5; d++) {
      const assigns = getAssignments(d);
      html += '<td>';
      assigns.forEach((a: any) => {
        html += `<div style="margin-bottom:8px"><strong>${a.teacher?.name}</strong>`;
        if (a.location) html += `<br/><small>${a.location}</small>`;
        html += '</div>';
      });
      if (assigns.length === 0) html += '<em style="color:#999">—</em>';
      html += '</td>';
    }

    html += '</tr></tbody></table><script>window.print();</script></body></html>';
    w.document.write(html);
    w.document.close();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">🛎️ Nöbet Listesi</h2>
        <div className="flex gap-2">
          {selected && (
            <button
              onClick={exportPDF}
              className="px-4 py-2 rounded-lg bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-all text-sm flex items-center gap-2"
            >
              📄 PDF Yazdır
            </button>
          )}
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-all text-sm"
          >
            + Yeni Nöbet Listesi
          </button>
        </div>
      </div>

      {/* Create Form */}
      {showCreate && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 space-y-3">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nöbet listesi adı"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50"
          />
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-white/40 text-xs">Başlangıç</label>
              <input
                type="date"
                value={form.weekStart}
                onChange={(e) => setForm({ ...form, weekStart: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div className="flex-1">
              <label className="text-white/40 text-xs">Bitiş</label>
              <input
                type="date"
                value={form.weekEnd}
                onChange={(e) => setForm({ ...form, weekEnd: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={createSchedule}
              className="px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition-all"
            >
              Oluştur
            </button>
            <button
              onClick={() => setShowCreate(false)}
              className="px-4 py-2 rounded-lg bg-white/10 text-white/60 hover:bg-white/20 transition-all"
            >
              İptal
            </button>
          </div>
        </div>
      )}

      {/* Schedule List */}
      {schedules.length > 0 && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {schedules.map((s) => (
            <button
              key={s.id}
              onClick={() => loadSchedule(s.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all
                                ${selected?.id === s.id ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
            >
              {s.isActive && <span className="w-2 h-2 bg-green-400 rounded-full"></span>}
              {s.name}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSchedule(s.id);
                }}
                className="ml-1 text-red-400/60 hover:text-red-400 cursor-pointer"
              >
                ✕
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Duty Grid */}
      {selected ? (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <div>
              <span className="text-white/40 text-sm">
                📆 {selected.weekStart} — {selected.weekEnd}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-5 divide-x divide-white/5">
            {DAYS.map((day, di) => (
              <div key={di} className="min-h-[200px]">
                <div className="bg-[#1a1a2e]/60 px-3 py-2 text-center text-white/80 text-sm font-semibold border-b border-white/5">
                  {day}
                </div>
                <div className="p-2 space-y-2">
                  {getAssignments(di + 1).map((a: any) => (
                    <div
                      key={a.id}
                      className="bg-gradient-to-r from-orange-500/15 to-red-500/10 rounded-lg p-3 relative group"
                    >
                      <div className="text-lg">{a.teacher?.avatar || '👩‍🏫'}</div>
                      <div className="text-white text-sm font-medium mt-1">{a.teacher?.name}</div>
                      {a.location && (
                        <div className="text-white/40 text-xs mt-0.5">📍 {a.location}</div>
                      )}
                      <button
                        onClick={() => deleteAssignment(a.id)}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500/80 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setAddAssign(di + 1)}
                    className="w-full py-3 rounded-lg border border-dashed border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all text-white/20 hover:text-cyan-400 text-sm"
                  >
                    + Öğretmen Ekle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 text-white/30">
          <div className="text-6xl mb-4">🛎️</div>
          <p>Henüz nöbet listesi yok. Yeni bir liste oluşturun.</p>
        </div>
      )}

      {/* Add Assignment Modal */}
      {addAssign !== null && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setAddAssign(null)}
        >
          <div
            className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-white mb-4">
              Nöbet Ataması — {DAYS[addAssign - 1]}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-white/60 text-sm">Öğretmen</label>
                <select
                  value={assignForm.teacherId}
                  onChange={(e) => setAssignForm({ ...assignForm, teacherId: e.target.value })}
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="">Öğretmen seçin</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.email})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-white/60 text-sm">Konum</label>
                <select
                  value={assignForm.location}
                  onChange={(e) => setAssignForm({ ...assignForm, location: e.target.value })}
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="">Konum seçin (opsiyonel)</option>
                  {DUTY_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={addAssignment}
                className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:opacity-90 transition-all"
              >
                Ata
              </button>
              <button
                onClick={() => setAddAssign(null)}
                className="px-6 py-2.5 rounded-lg bg-white/10 text-white/60 hover:bg-white/20 transition-all"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// USERS TAB
// ═══════════════════════════════════════════════════════════
function UsersTab() {
  const [users, setUsers] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res: any = await userAPI.listUsers();
      setUsers(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string, name: string) => {
    if (!confirm(`"${name}" adlı kullanıcıyı silmek istediğinize emin misiniz?`)) return;
    try {
      await fetch(`http://localhost:3005/api/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (e) {
      alert('Silme işlemi başarısız.');
    }
  };

  const roleColors: Record<string, string> = {
    SUPER_ADMIN: 'bg-red-500/20 text-red-300 border-red-500/30',
    SCHOOL_ADMIN: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    TEACHER: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    STUDENT: 'bg-green-500/20 text-green-300 border-green-500/30',
    PARENT: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  };
  const roleLabels: Record<string, string> = {
    SUPER_ADMIN: 'Süper Admin',
    SCHOOL_ADMIN: 'Okul Müdürü',
    TEACHER: 'Öğretmen',
    STUDENT: 'Öğrenci',
    PARENT: 'Veli',
  };

  const filtered = users.filter((u) => {
    const matchText =
      u.name?.toLowerCase().includes(filter.toLowerCase()) ||
      u.email?.toLowerCase().includes(filter.toLowerCase());
    const matchRole = !roleFilter || u.role === roleFilter;
    return matchText && matchRole;
  });

  const counts = {
    total: users.length,
    teachers: users.filter((u) => u.role === 'TEACHER').length,
    students: users.filter((u) => u.role === 'STUDENT').length,
    parents: users.filter((u) => u.role === 'PARENT').length,
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">👥 Kullanıcı Yönetimi</h2>
        <div className="flex gap-3 text-sm">
          {[
            ['Tümü', '', counts.total],
            ['Öğretmen', 'TEACHER', counts.teachers],
            ['Öğrenci', 'STUDENT', counts.students],
            ['Veli', 'PARENT', counts.parents],
          ].map(([label, key, count]) => (
            <button
              key={String(key)}
              onClick={() => setRoleFilter(String(key))}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${roleFilter === String(key) ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
            >
              {label} <span className="opacity-60">({count})</span>
            </button>
          ))}
        </div>
      </div>

      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="🔍 İsim veya email ile ara..."
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 mb-4"
      />

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1a1a2e]/60 border-b border-white/5">
                <th className="px-4 py-3 text-left text-white/60 text-xs">Kullanıcı</th>
                <th className="px-4 py-3 text-left text-white/60 text-xs">Email</th>
                <th className="px-4 py-3 text-center text-white/60 text-xs">Rol</th>
                <th className="px-4 py-3 text-center text-white/60 text-xs">Seviye</th>
                <th className="px-4 py-3 text-center text-white/60 text-xs">XP</th>
                <th className="px-4 py-3 text-center text-white/60 text-xs">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr
                  key={u.id}
                  className="border-t border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{u.avatar || '👤'}</span>
                      <div>
                        <div className="text-white font-medium text-sm">{u.name}</div>
                        {u.gradeLevel && (
                          <div className="text-white/30 text-xs">{u.gradeLevel}. Sınıf</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white/50 text-sm">{u.email}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${roleColors[u.role] || 'bg-white/10 text-white/50 border-white/10'}`}
                    >
                      {roleLabels[u.role] || u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-amber-400 font-bold text-sm">Lv.{u.level || 1}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-cyan-400 font-medium text-sm">
                    {(u.xp || 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => deleteUser(u.id, u.name)}
                      className="opacity-0 group-hover:opacity-100 px-2 py-1 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/40 text-xs font-medium transition-all"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-8 text-white/30">Kullanıcı bulunamadı</div>
        )}
        <div className="px-4 py-3 border-t border-white/5 text-white/30 text-xs">
          {filtered.length} / {users.length} kullanıcı gösteriliyor
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// CURRICULUM TAB
// ═══════════════════════════════════════════════════════════
function CurriculumTab() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    curriculumAPI
      .tree()
      .then((res: any) => {
        setSubjects(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-6">📚 Müfredat</h2>
      {subjects.length === 0 ? (
        <div className="text-center py-16 text-white/30">
          <div className="text-6xl mb-4">📚</div>
          <p>Henüz müfredat oluşturulmamış.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {subjects.map((s: any) => (
            <div
              key={s.id}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
            >
              <div className="px-5 py-4 flex items-center gap-3 border-b border-white/5">
                <span className="text-2xl">{s.icon || '📚'}</span>
                <div>
                  <div className="text-white font-semibold">{s.name}</div>
                  <div className="text-white/40 text-xs">
                    {s.code} • Sınıf {s.gradeMin}-{s.gradeMax}
                  </div>
                </div>
                <span className="ml-auto bg-white/10 text-white/50 px-2 py-1 rounded-full text-xs">
                  {s.topics?.length || 0} konu
                </span>
              </div>
              {s.topics?.length > 0 && (
                <div className="px-5 py-3 space-y-1">
                  {s.topics.map((t: any) => (
                    <div key={t.id} className="flex items-center gap-2 text-sm text-white/60 py-1">
                      <span className="text-white/20">├─</span>
                      <span>{t.name}</span>
                      <span className="text-white/20 text-xs">({t.gradeLevel}. sınıf)</span>
                      {t.subTopics?.length > 0 && (
                        <span className="text-white/30 text-xs ml-1">
                          ({t.subTopics.length} alt konu)
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// QUESTIONS TAB
// ═══════════════════════════════════════════════════════════
function QuestionsTab() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res: any = await questionAPI.list({ limit: 200 });
      setQuestions(res.data?.questions || res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteQ = async (id: string) => {
    if (!confirm('Bu soruyu silmek istediğinize emin misiniz?')) return;
    setDeleting(id);
    try {
      await fetch(`http://localhost:3005/api/questions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch {
      alert('Soru silinemedi.');
    } finally {
      setDeleting(null);
    }
  };

  const DIFF_MAP: Record<string, string> = { EASY: 'Kolay', MEDIUM: 'Orta', HARD: 'Zor' };
  const DIFF_COLORS: Record<string, string> = {
    EASY: 'text-emerald-400 bg-emerald-400/10',
    MEDIUM: 'text-amber-400 bg-amber-400/10',
    HARD: 'text-red-400 bg-red-400/10',
  };

  const grades = [...new Set(questions.map((q) => q.gradeLevel).filter(Boolean))].sort();

  const filtered = questions.filter((q) => {
    const matchText = !search || q.text?.toLowerCase().includes(search.toLowerCase());
    const matchDiff = !diffFilter || q.difficulty === diffFilter;
    const matchGrade = !gradeFilter || String(q.gradeLevel) === gradeFilter;
    return matchText && matchDiff && matchGrade;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">❓ Soru Havuzu</h2>
        <span className="text-white/40 text-sm">{questions.length} toplam soru</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Soru metni ara..."
          className="flex-1 min-w-[200px] bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 text-sm"
        />
        <select
          value={diffFilter}
          onChange={(e) => setDiffFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 text-sm"
        >
          <option value="">Tüm Zorluklar</option>
          <option value="EASY">Kolay</option>
          <option value="MEDIUM">Orta</option>
          <option value="HARD">Zor</option>
        </select>
        <select
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 text-sm"
        >
          <option value="">Tüm Sınıflar</option>
          {grades.map((g) => (
            <option key={g} value={g}>
              {g}. Sınıf
            </option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {['EASY', 'MEDIUM', 'HARD'].map((d) => (
          <div key={d} className={`rounded-xl p-4 border border-white/10 ${DIFF_COLORS[d]}`}>
            <div className="text-2xl font-black">
              {questions.filter((q) => q.difficulty === d).length}
            </div>
            <div className="text-xs font-medium mt-1">{DIFF_MAP[d]} Soru</div>
          </div>
        ))}
      </div>

      <p className="text-white/40 text-sm mb-3">{filtered.length} soru gösteriliyor</p>

      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
        {filtered.map((q) => (
          <div
            key={q.id}
            className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-4 group hover:bg-white/8 transition-all"
          >
            <span
              className={`px-2 py-0.5 rounded-md text-xs font-bold border shrink-0 ${DIFF_COLORS[q.difficulty] || 'bg-white/10 text-white/50 border-white/10'}`}
            >
              {DIFF_MAP[q.difficulty] || q.difficulty}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium leading-snug line-clamp-2">{q.text}</p>
              <div className="flex gap-3 mt-1.5 text-white/30 text-xs">
                {q.gradeLevel && <span>📚 {q.gradeLevel}. Sınıf</span>}
                {q.subject?.name && <span>📖 {q.subject.name}</span>}
                {q.topic?.name && <span>🏷️ {q.topic.name}</span>}
              </div>
            </div>
            <button
              onClick={() => deleteQ(q.id)}
              disabled={deleting === q.id}
              className="opacity-0 group-hover:opacity-100 px-2 py-1 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/40 text-xs font-medium transition-all shrink-0"
            >
              {deleting === q.id ? '⏳' : 'Sil'}
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/30">
            <div className="text-6xl mb-4">❓</div>
            <p>Hiç soru bulunamadı.</p>
          </div>
        )}
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// ANALYTICS TAB
// ═══════════════════════════════════════════════════════════
function AnalyticsTab() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsAPI
      .school()
      .then((res: any) => {
        setData(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  if (!data)
    return (
      <div className="text-center py-16 text-white/30">
        <div className="text-6xl mb-4">📈</div>
        <p>Analitik verisi yüklenemedi.</p>
      </div>
    );

  const topStudents: any[] = data.topStudents || [];
  const gameStats: any[] = data.gameModeStats || [];
  const overview = data.overview || {};
  const maxXP = Math.max(...topStudents.map((s: any) => s.xp || 0), 1);
  const maxPlays = Math.max(...gameStats.map((g: any) => g._count?.id || 0), 1);

  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-6">📈 Okul Analitiği</h2>

      {/* Overview stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: 'Toplam Oturum',
            value: overview.totalSessions ?? '—',
            icon: '🎮',
            color: 'from-blue-500/20 to-blue-600/10',
          },
          {
            label: 'Doğru Cevap',
            value: `${Math.round((overview.correctRate || 0) * 100)}%`,
            icon: '✅',
            color: 'from-green-500/20 to-green-600/10',
          },
          {
            label: 'Aktif Öğrenci',
            value: overview.activeStudents ?? '—',
            icon: '👨‍🎓',
            color: 'from-purple-500/20 to-purple-600/10',
          },
          {
            label: 'Top. Soru Çözüldü',
            value: (overview.totalAnswers || 0).toLocaleString(),
            icon: '❓',
            color: 'from-orange-500/20 to-orange-600/10',
          },
        ].map((s, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${s.color} border border-white/10 rounded-xl p-5`}
          >
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className="text-white/40 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top students bar chart */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h3 className="text-white font-bold mb-4">🏆 En İyi Öğrenciler</h3>
          {topStudents.length === 0 ? (
            <p className="text-white/30 text-sm">Henüz veri yok.</p>
          ) : (
            <div className="space-y-3">
              {topStudents.slice(0, 8).map((s: any, i: number) => (
                <div key={s.id} className="flex items-center gap-3">
                  <span className="text-white/40 text-xs w-4 text-right">{i + 1}</span>
                  <span className="text-base shrink-0">{s.avatar || '👤'}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-white text-xs font-medium truncate max-w-[120px]">
                        {s.name}
                      </span>
                      <span className="text-cyan-400 text-xs font-bold">
                        {(s.xp || 0).toLocaleString()} XP
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700"
                        style={{ width: `${((s.xp || 0) / maxXP) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Game mode stats */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h3 className="text-white font-bold mb-4">🎮 Oyun Modu İstatistikleri</h3>
          {gameStats.length === 0 ? (
            <p className="text-white/30 text-sm">Henüz oyun oturumu yok.</p>
          ) : (
            <div className="space-y-3">
              {gameStats.map((g: any, i: number) => {
                const count = g._count?.id || 0;
                const correct = g._avg?.score ? Math.round(g._avg.score * 100) : 0;
                return (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-white text-xs font-medium">
                        {g.gameMode || 'Bilinmeyen'}
                      </span>
                      <span className="text-white/50 text-xs">
                        {count} oturum · %{correct} doğru
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                        style={{ width: `${(count / maxPlays) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// SHARED
// ═══════════════════════════════════════════════════════════
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-6xl animate-bounce">🏫</div>
    </div>
  );
}

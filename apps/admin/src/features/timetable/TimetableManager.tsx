import { useState } from 'react';
import { Card, Button } from '@egitim-galaksisi/ui';
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2,
  Clock,
  BookOpen,
  Users,
  School,
  AlertCircle
} from 'lucide-react';

interface TimeSlot {
  id: string;
  day: string;
  period: number;
  startTime: string;
  endTime: string;
  subject: string;
  teacher: string;
  class: string;
  room?: string;
}

// Mock data
const mockTimeSlots: TimeSlot[] = [
  // Pazartesi
  { id: '1', day: 'Pazartesi', period: 1, startTime: '08:30', endTime: '09:20', subject: 'Matematik', teacher: 'Ayşe Demir', class: '5-A', room: 'A101' },
  { id: '2', day: 'Pazartesi', period: 2, startTime: '09:30', endTime: '10:20', subject: 'Türkçe', teacher: 'Mehmet Yılmaz', class: '5-A', room: 'A102' },
  { id: '3', day: 'Pazartesi', period: 3, startTime: '10:30', endTime: '11:20', subject: 'Fen Bilgisi', teacher: 'Fatma Kaya', class: '5-A', room: 'B201' },
  { id: '4', day: 'Pazartesi', period: 4, startTime: '11:30', endTime: '12:20', subject: 'İngilizce', teacher: 'Ali Şahin', class: '5-A', room: 'C301' },
  
  // Salı
  { id: '5', day: 'Salı', period: 1, startTime: '08:30', endTime: '09:20', subject: 'Türkçe', teacher: 'Mehmet Yılmaz', class: '5-A', room: 'A102' },
  { id: '6', day: 'Salı', period: 2, startTime: '09:30', endTime: '10:20', subject: 'Matematik', teacher: 'Ayşe Demir', class: '5-A', room: 'A101' },
  { id: '7', day: 'Salı', period: 3, startTime: '10:30', endTime: '11:20', subject: 'Sosyal Bilgiler', teacher: 'Mehmet Yılmaz', class: '5-A', room: 'A103' },
  { id: '8', day: 'Salı', period: 4, startTime: '11:30', endTime: '12:20', subject: 'Beden Eğitimi', teacher: 'Ali Şahin', class: '5-A', room: 'Spor Salonu' },
  
  // Çarşamba
  { id: '9', day: 'Çarşamba', period: 1, startTime: '08:30', endTime: '09:20', subject: 'Matematik', teacher: 'Ayşe Demir', class: '5-A', room: 'A101' },
  { id: '10', day: 'Çarşamba', period: 2, startTime: '09:30', endTime: '10:20', subject: 'İngilizce', teacher: 'Ali Şahin', class: '5-A', room: 'C301' },
  { id: '11', day: 'Çarşamba', period: 3, startTime: '10:30', endTime: '11:20', subject: 'Fen Bilgisi', teacher: 'Fatma Kaya', class: '5-A', room: 'B201' },
  { id: '12', day: 'Çarşamba', period: 4, startTime: '11:30', endTime: '12:20', subject: 'Müzik', teacher: 'Mehmet Yılmaz', class: '5-A', room: 'Müzik Odası' },
  
  // Perşembe
  { id: '13', day: 'Perşembe', period: 1, startTime: '08:30', endTime: '09:20', subject: 'Türkçe', teacher: 'Mehmet Yılmaz', class: '5-A', room: 'A102' },
  { id: '14', day: 'Perşembe', period: 2, startTime: '09:30', endTime: '10:20', subject: 'Matematik', teacher: 'Ayşe Demir', class: '5-A', room: 'A101' },
  { id: '15', day: 'Perşembe', period: 3, startTime: '10:30', endTime: '11:20', subject: 'Görsel Sanatlar', teacher: 'Fatma Kaya', class: '5-A', room: 'Sanat Atölyesi' },
  { id: '16', day: 'Perşembe', period: 4, startTime: '11:30', endTime: '12:20', subject: 'Din Kültürü', teacher: 'Ali Şahin', class: '5-A', room: 'A104' },
  
  // Cuma
  { id: '17', day: 'Cuma', period: 1, startTime: '08:30', endTime: '09:20', subject: 'Matematik', teacher: 'Ayşe Demir', class: '5-A', room: 'A101' },
  { id: '18', day: 'Cuma', period: 2, startTime: '09:30', endTime: '10:20', subject: 'Fen Bilgisi', teacher: 'Fatma Kaya', class: '5-A', room: 'B201' },
  { id: '19', day: 'Cuma', period: 3, startTime: '10:30', endTime: '11:20', subject: 'İngilizce', teacher: 'Ali Şahin', class: '5-A', room: 'C301' },
  { id: '20', day: 'Cuma', period: 4, startTime: '11:30', endTime: '12:20', subject: 'Türkçe', teacher: 'Mehmet Yılmaz', class: '5-A', room: 'A102' },
];

const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
const periods = [
  { period: 1, startTime: '08:30', endTime: '09:20' },
  { period: 2, startTime: '09:30', endTime: '10:20' },
  { period: 3, startTime: '10:30', endTime: '11:20' },
  { period: 4, startTime: '11:30', endTime: '12:20' },
];

export function TimetableManager() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(mockTimeSlots);
  const [selectedClass, setSelectedClass] = useState<string>('5-A');
  const [selectedTeacher, setSelectedTeacher] = useState<string>('all');

  const classes = ['5-A', '5-B', '6-A', '6-B', '7-A', '7-B', '8-A', '8-B'];
  const teachers = Array.from(new Set(timeSlots.map(t => t.teacher)));

  const getSlot = (day: string, period: number) => {
    return timeSlots.find(
      slot => slot.day === day && 
              slot.period === period && 
              slot.class === selectedClass &&
              (selectedTeacher === 'all' || slot.teacher === selectedTeacher)
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('Bu dersi silmek istediğinizden emin misiniz?')) {
      setTimeSlots(timeSlots.filter(s => s.id !== id));
    }
  };

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      'Matematik': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'Türkçe': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      'Fen Bilgisi': 'bg-green-500/20 text-green-300 border-green-500/30',
      'İngilizce': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'Sosyal Bilgiler': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'Beden Eğitimi': 'bg-red-500/20 text-red-300 border-red-500/30',
      'Müzik': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      'Görsel Sanatlar': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      'Din Kültürü': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    };
    return colors[subject] || 'bg-white/10 text-white/80 border-white/20';
  };

  // Statistics
  const totalLessons = timeSlots.filter(s => s.class === selectedClass).length;
  const uniqueSubjects = new Set(timeSlots.filter(s => s.class === selectedClass).map(s => s.subject)).size;
  const uniqueTeachers = new Set(timeSlots.filter(s => s.class === selectedClass).map(s => s.teacher)).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Calendar size={32} />
              Ders Programı Yönetimi
            </h1>
            <p className="text-white/60">Haftalık ders programını görüntüleyin ve düzenleyin</p>
          </div>
          <Button
            onClick={() => alert('Ders ekleme formu yakında eklenecek')}
            className="flex items-center gap-2"
          >
            <Plus size={18} />
            Yeni Ders
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Class Filter */}
            <div>
              <label className="block text-white/60 text-sm mb-2">Sınıf Seçin</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            {/* Teacher Filter */}
            <div>
              <label className="block text-white/60 text-sm mb-2">Öğretmen Filtrele</label>
              <select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="all">Tüm Öğretmenler</option>
                {teachers.map(teacher => (
                  <option key={teacher} value={teacher}>{teacher}</option>
                ))}
              </select>
            </div>

            {/* School Info */}
            <div>
              <label className="block text-white/60 text-sm mb-2">Okul</label>
              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white">
                Atatürk İlkokulu
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <div className="text-2xl font-bold text-white mb-1">{totalLessons}</div>
            <div className="text-white/60 text-sm">Toplam Ders</div>
          </Card>
          <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
            <div className="text-2xl font-bold text-white mb-1">{uniqueSubjects}</div>
            <div className="text-white/60 text-sm">Farklı Ders</div>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20">
            <div className="text-2xl font-bold text-white mb-1">{uniqueTeachers}</div>
            <div className="text-white/60 text-sm">Öğretmen</div>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20">
            <div className="text-2xl font-bold text-white mb-1">{days.length}</div>
            <div className="text-white/60 text-sm">Gün</div>
          </Card>
        </div>

        {/* Timetable Grid */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/60 font-medium text-sm min-w-[100px]">
                    Saat
                  </th>
                  {days.map(day => (
                    <th key={day} className="text-center py-3 px-4 text-white/60 font-medium text-sm min-w-[150px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {periods.map(({ period, startTime, endTime }) => (
                  <tr key={period} className="border-b border-white/5">
                    <td className="py-3 px-4 text-white/80 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-white/40" />
                        <div>
                          <div className="font-medium">{period}. Ders</div>
                          <div className="text-xs text-white/40">{startTime} - {endTime}</div>
                        </div>
                      </div>
                    </td>
                    {days.map(day => {
                      const slot = getSlot(day, period);
                      return (
                        <td key={`${day}-${period}`} className="py-2 px-2">
                          {slot ? (
                            <div className={`p-3 rounded-lg border ${getSubjectColor(slot.subject)} relative group`}>
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <BookOpen size={14} />
                                  <span className="font-medium text-sm">{slot.subject}</span>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                  <button
                                    onClick={() => alert('Düzenleme formu yakında eklenecek')}
                                    className="p-1 hover:bg-white/10 rounded"
                                    title="Düzenle"
                                  >
                                    <Edit size={12} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(slot.id)}
                                    className="p-1 hover:bg-white/10 rounded"
                                    title="Sil"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                              <div className="text-xs opacity-80 flex items-center gap-1 mb-1">
                                <Users size={12} />
                                {slot.teacher}
                              </div>
                              {slot.room && (
                                <div className="text-xs opacity-60 flex items-center gap-1">
                                  <School size={12} />
                                  {slot.room}
                                </div>
                              )}
                            </div>
                          ) : (
                            <button
                              onClick={() => alert('Ders ekleme formu yakında eklenecek')}
                              className="w-full h-full min-h-[80px] border-2 border-dashed border-white/10 rounded-lg hover:border-purple-500/50 hover:bg-white/5 transition-colors flex items-center justify-center text-white/40 hover:text-white/60"
                            >
                              <Plus size={20} />
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
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-blue-500/10 border-blue-500/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-blue-400 flex-shrink-0" size={20} />
            <div>
              <h3 className="text-white font-medium mb-1">Ders Programı Bilgileri</h3>
              <ul className="text-white/60 text-sm space-y-1">
                <li>• Ders eklemek için boş hücrelere tıklayın</li>
                <li>• Dersleri düzenlemek için ders kartının üzerine gelin</li>
                <li>• Çakışma kontrolü otomatik olarak yapılır</li>
                <li>• Öğretmen ve sınıf bazlı filtreleme yapabilirsiniz</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

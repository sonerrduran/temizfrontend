import { useState } from 'react';
import { Card, Button } from '@egitim-galaksisi/ui';
import { 
  UserCog, 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  BookOpen,
  Users,
  Calendar,
  Award
} from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
  school: string;
  employeeId: string;
  assignedClasses: string[];
  subjects: string[];
  experience: number;
  status: 'active' | 'inactive';
  joinDate: string;
}

// Mock data
const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Ayşe Demir',
    email: 'ayse.demir@okul.com',
    phone: '0532 123 45 67',
    branch: 'Matematik',
    school: 'Atatürk İlkokulu',
    employeeId: 'OGR001',
    assignedClasses: ['5-A', '5-B', '6-A'],
    subjects: ['Matematik', 'Geometri'],
    experience: 8,
    status: 'active',
    joinDate: '2016-09-01'
  },
  {
    id: '2',
    name: 'Mehmet Yılmaz',
    email: 'mehmet.yilmaz@okul.com',
    phone: '0533 234 56 78',
    branch: 'Türkçe',
    school: 'Atatürk İlkokulu',
    employeeId: 'OGR002',
    assignedClasses: ['7-A', '7-B', '8-A'],
    subjects: ['Türkçe', 'Edebiyat'],
    experience: 12,
    status: 'active',
    joinDate: '2012-09-01'
  },
  {
    id: '3',
    name: 'Fatma Kaya',
    email: 'fatma.kaya@okul.com',
    phone: '0534 345 67 89',
    branch: 'Fen Bilgisi',
    school: 'Cumhuriyet Ortaokulu',
    employeeId: 'OGR003',
    assignedClasses: ['6-A', '6-B'],
    subjects: ['Fen Bilgisi', 'Biyoloji'],
    experience: 5,
    status: 'active',
    joinDate: '2019-09-01'
  },
  {
    id: '4',
    name: 'Ali Şahin',
    email: 'ali.sahin@okul.com',
    phone: '0535 456 78 90',
    branch: 'İngilizce',
    school: 'Gazi İlköğretim Okulu',
    employeeId: 'OGR004',
    assignedClasses: ['5-A', '5-B', '6-A', '6-B'],
    subjects: ['İngilizce'],
    experience: 10,
    status: 'active',
    joinDate: '2014-09-01'
  },
];

export function TeacherList() {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState<string>('all');
  const [filterSchool, setFilterSchool] = useState<string>('all');

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = filterBranch === 'all' || teacher.branch === filterBranch;
    const matchesSchool = filterSchool === 'all' || teacher.school === filterSchool;
    return matchesSearch && matchesBranch && matchesSchool;
  });

  const branches = Array.from(new Set(teachers.map(t => t.branch)));
  const schools = Array.from(new Set(teachers.map(t => t.school)));

  const handleDelete = (id: string) => {
    if (confirm('Bu öğretmeni silmek istediğinizden emin misiniz?')) {
      setTeachers(teachers.filter(t => t.id !== id));
    }
  };

  const totalClasses = teachers.reduce((sum, t) => sum + t.assignedClasses.length, 0);
  const avgExperience = Math.round(teachers.reduce((sum, t) => sum + t.experience, 0) / teachers.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <UserCog size={32} />
              Öğretmen Yönetimi
            </h1>
            <p className="text-white/60">Tüm öğretmenleri görüntüleyin ve yönetin</p>
          </div>
          <Button
            onClick={() => alert('Öğretmen ekleme formu yakında eklenecek')}
            className="flex items-center gap-2"
          >
            <Plus size={18} />
            Yeni Öğretmen
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="text"
                  placeholder="İsim, email veya sicil no ile ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Branch Filter */}
            <div>
              <select
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="all">Tüm Branşlar</option>
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>

            {/* School Filter */}
            <div>
              <select
                value={filterSchool}
                onChange={(e) => setFilterSchool(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="all">Tüm Okullar</option>
                {schools.map(school => (
                  <option key={school} value={school}>{school}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <div className="text-2xl font-bold text-white mb-1">{teachers.length}</div>
            <div className="text-white/60 text-sm">Toplam Öğretmen</div>
          </Card>
          <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
            <div className="text-2xl font-bold text-white mb-1">{totalClasses}</div>
            <div className="text-white/60 text-sm">Atanan Sınıf</div>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20">
            <div className="text-2xl font-bold text-white mb-1">{avgExperience} Yıl</div>
            <div className="text-white/60 text-sm">Ort. Deneyim</div>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20">
            <div className="text-2xl font-bold text-white mb-1">{branches.length}</div>
            <div className="text-white/60 text-sm">Branş Sayısı</div>
          </Card>
        </div>

        {/* Teacher Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTeachers.map((teacher) => (
            <Card key={teacher.id} className="hover:border-cyan-500/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                    <UserCog size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{teacher.name}</h3>
                    <p className="text-white/60 text-sm">{teacher.branch}</p>
                    <p className="text-white/40 text-xs">Sicil: {teacher.employeeId}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300">
                  Aktif
                </span>
              </div>

              {/* Contact & School */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div>
                  <p className="text-white/40">Email</p>
                  <p className="text-white/80">{teacher.email}</p>
                </div>
                <div>
                  <p className="text-white/40">Telefon</p>
                  <p className="text-white/80">{teacher.phone}</p>
                </div>
                <div>
                  <p className="text-white/40">Okul</p>
                  <p className="text-white/80">{teacher.school}</p>
                </div>
                <div>
                  <p className="text-white/40">Deneyim</p>
                  <p className="text-white/80">{teacher.experience} yıl</p>
                </div>
              </div>

              {/* Subjects */}
              <div className="mb-4">
                <p className="text-white/40 text-xs mb-2">Dersler</p>
                <div className="flex flex-wrap gap-2">
                  {teacher.subjects.map((subject, idx) => (
                    <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* Assigned Classes */}
              <div className="mb-4">
                <p className="text-white/40 text-xs mb-2">Atanan Sınıflar</p>
                <div className="flex flex-wrap gap-2">
                  {teacher.assignedClasses.map((cls, idx) => (
                    <span key={idx} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs">
                      {cls}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <BookOpen size={18} className="text-purple-400 mx-auto mb-1" />
                  <div className="text-sm font-bold text-white">{teacher.subjects.length}</div>
                  <div className="text-xs text-white/60">Ders</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <Users size={18} className="text-cyan-400 mx-auto mb-1" />
                  <div className="text-sm font-bold text-white">{teacher.assignedClasses.length}</div>
                  <div className="text-xs text-white/60">Sınıf</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <Award size={18} className="text-green-400 mx-auto mb-1" />
                  <div className="text-sm font-bold text-white">{teacher.experience}</div>
                  <div className="text-xs text-white/60">Yıl</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                <Button
                  variant="secondary"
                  onClick={() => alert('Ders atama sayfası yakında eklenecek')}
                  className="flex-1 flex items-center justify-center gap-2 text-sm"
                >
                  <BookOpen size={14} />
                  Ders Ata
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => alert('Sınıf atama sayfası yakında eklenecek')}
                  className="flex-1 flex items-center justify-center gap-2 text-sm"
                >
                  <Users size={14} />
                  Sınıf Ata
                </Button>
                <button
                  onClick={() => alert('Düzenleme formu yakında eklenecek')}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Düzenle"
                >
                  <Edit size={16} className="text-cyan-400" />
                </button>
                <button
                  onClick={() => handleDelete(teacher.id)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Sil"
                >
                  <Trash2 size={16} className="text-red-400" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <UserCog size={48} className="text-white/20 mx-auto mb-4" />
              <p className="text-white/60">Öğretmen bulunamadı</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

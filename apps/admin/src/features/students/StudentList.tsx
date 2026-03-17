import { useState } from 'react';
import { Card, Button } from '@egitim-galaksisi/ui';
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  GraduationCap,
  School,
  Calendar,
  Award,
  Upload,
  Download
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  studentNumber: string;
  email: string;
  phone: string;
  school: string;
  grade: string;
  class: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  birthDate: string;
  enrollmentDate: string;
  status: 'active' | 'inactive';
  gpa?: number;
}

// Mock data
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Zeynep Yılmaz',
    studentNumber: 'OGR2024001',
    email: 'zeynep.yilmaz@ogrenci.com',
    phone: '0532 111 22 33',
    school: 'Atatürk İlkokulu',
    grade: '5',
    class: '5-A',
    parentName: 'Mehmet Yılmaz',
    parentPhone: '0533 222 33 44',
    parentEmail: 'mehmet.yilmaz@email.com',
    birthDate: '2014-05-15',
    enrollmentDate: '2020-09-01',
    status: 'active',
    gpa: 4.2
  },
  {
    id: '2',
    name: 'Ahmet Demir',
    studentNumber: 'OGR2024002',
    email: 'ahmet.demir@ogrenci.com',
    phone: '0534 222 33 44',
    school: 'Atatürk İlkokulu',
    grade: '5',
    class: '5-A',
    parentName: 'Ayşe Demir',
    parentPhone: '0535 333 44 55',
    parentEmail: 'ayse.demir@email.com',
    birthDate: '2014-03-20',
    enrollmentDate: '2020-09-01',
    status: 'active',
    gpa: 3.8
  },
  {
    id: '3',
    name: 'Elif Kaya',
    studentNumber: 'OGR2024003',
    email: 'elif.kaya@ogrenci.com',
    phone: '0536 333 44 55',
    school: 'Cumhuriyet Ortaokulu',
    grade: '6',
    class: '6-B',
    parentName: 'Fatma Kaya',
    parentPhone: '0537 444 55 66',
    parentEmail: 'fatma.kaya@email.com',
    birthDate: '2013-08-10',
    enrollmentDate: '2019-09-01',
    status: 'active',
    gpa: 4.5
  },
  {
    id: '4',
    name: 'Can Şahin',
    studentNumber: 'OGR2024004',
    email: 'can.sahin@ogrenci.com',
    phone: '0538 444 55 66',
    school: 'Cumhuriyet Ortaokulu',
    grade: '7',
    class: '7-A',
    parentName: 'Ali Şahin',
    parentPhone: '0539 555 66 77',
    parentEmail: 'ali.sahin@email.com',
    birthDate: '2012-11-25',
    enrollmentDate: '2018-09-01',
    status: 'active',
    gpa: 3.9
  },
  {
    id: '5',
    name: 'Selin Öztürk',
    studentNumber: 'OGR2024005',
    email: 'selin.ozturk@ogrenci.com',
    phone: '0540 555 66 77',
    school: 'Gazi İlköğretim Okulu',
    grade: '8',
    class: '8-A',
    parentName: 'Hasan Öztürk',
    parentPhone: '0541 666 77 88',
    parentEmail: 'hasan.ozturk@email.com',
    birthDate: '2011-02-14',
    enrollmentDate: '2017-09-01',
    status: 'active',
    gpa: 4.7
  },
  {
    id: '6',
    name: 'Burak Arslan',
    studentNumber: 'OGR2024006',
    email: 'burak.arslan@ogrenci.com',
    phone: '0542 666 77 88',
    school: 'Gazi İlköğretim Okulu',
    grade: '8',
    class: '8-B',
    parentName: 'Zeynep Arslan',
    parentPhone: '0543 777 88 99',
    parentEmail: 'zeynep.arslan@email.com',
    birthDate: '2011-07-30',
    enrollmentDate: '2017-09-01',
    status: 'inactive',
    gpa: 3.5
  },
];

export function StudentList() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [filterSchool, setFilterSchool] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === 'all' || student.grade === filterGrade;
    const matchesSchool = filterSchool === 'all' || student.school === filterSchool;
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesGrade && matchesSchool && matchesStatus;
  });

  const grades = Array.from(new Set(students.map(s => s.grade))).sort();
  const schools = Array.from(new Set(students.map(s => s.school)));

  const handleDelete = (id: string) => {
    if (confirm('Bu öğrenciyi silmek istediğinizden emin misiniz?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const activeStudents = students.filter(s => s.status === 'active').length;
  const avgGpa = students.reduce((sum, s) => sum + (s.gpa || 0), 0) / students.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <GraduationCap size={32} />
              Öğrenci Yönetimi
            </h1>
            <p className="text-white/60">Tüm öğrencileri görüntüleyin ve yönetin</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => alert('Excel import özelliği yakında eklenecek')}
              className="flex items-center gap-2"
            >
              <Upload size={18} />
              İçe Aktar
            </Button>
            <Button
              variant="secondary"
              onClick={() => alert('Excel export özelliği yakında eklenecek')}
              className="flex items-center gap-2"
            >
              <Download size={18} />
              Dışa Aktar
            </Button>
            <Button
              onClick={() => alert('Öğrenci ekleme formu yakında eklenecek')}
              className="flex items-center gap-2"
            >
              <Plus size={18} />
              Yeni Öğrenci
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="text"
                  placeholder="İsim, numara veya email ile ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Grade Filter */}
            <div>
              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="all">Tüm Sınıflar</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}. Sınıf</option>
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

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="active">Aktif</option>
                <option value="inactive">Pasif</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <div className="text-2xl font-bold text-white mb-1">{students.length}</div>
            <div className="text-white/60 text-sm">Toplam Öğrenci</div>
          </Card>
          <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
            <div className="text-2xl font-bold text-white mb-1">{activeStudents}</div>
            <div className="text-white/60 text-sm">Aktif Öğrenci</div>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20">
            <div className="text-2xl font-bold text-white mb-1">{avgGpa.toFixed(2)}</div>
            <div className="text-white/60 text-sm">Ortalama Not</div>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20">
            <div className="text-2xl font-bold text-white mb-1">{schools.length}</div>
            <div className="text-white/60 text-sm">Okul Sayısı</div>
          </Card>
        </div>

        {/* Student Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:border-green-500/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                    <GraduationCap size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{student.name}</h3>
                    <p className="text-white/60 text-sm">{student.class}</p>
                    <p className="text-white/40 text-xs">No: {student.studentNumber}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  student.status === 'active' 
                    ? 'bg-green-500/20 text-green-300' 
                    : 'bg-red-500/20 text-red-300'
                }`}>
                  {student.status === 'active' ? 'Aktif' : 'Pasif'}
                </span>
              </div>

              {/* Student Info */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div>
                  <p className="text-white/40">Email</p>
                  <p className="text-white/80 truncate">{student.email}</p>
                </div>
                <div>
                  <p className="text-white/40">Telefon</p>
                  <p className="text-white/80">{student.phone}</p>
                </div>
                <div>
                  <p className="text-white/40">Okul</p>
                  <p className="text-white/80">{student.school}</p>
                </div>
                <div>
                  <p className="text-white/40">Doğum Tarihi</p>
                  <p className="text-white/80">{student.birthDate}</p>
                </div>
              </div>

              {/* Parent Info */}
              <div className="bg-white/5 rounded-lg p-3 mb-4">
                <p className="text-white/40 text-xs mb-2">Veli Bilgileri</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-white/60 text-xs">İsim</p>
                    <p className="text-white/90">{student.parentName}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Telefon</p>
                    <p className="text-white/90">{student.parentPhone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-white/60 text-xs">Email</p>
                    <p className="text-white/90 truncate">{student.parentEmail}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <School size={18} className="text-purple-400 mx-auto mb-1" />
                  <div className="text-sm font-bold text-white">{student.grade}</div>
                  <div className="text-xs text-white/60">Sınıf</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <Award size={18} className="text-green-400 mx-auto mb-1" />
                  <div className="text-sm font-bold text-white">{student.gpa?.toFixed(1) || '-'}</div>
                  <div className="text-xs text-white/60">Not Ort.</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <Calendar size={18} className="text-cyan-400 mx-auto mb-1" />
                  <div className="text-sm font-bold text-white">
                    {new Date().getFullYear() - new Date(student.enrollmentDate).getFullYear()}
                  </div>
                  <div className="text-xs text-white/60">Yıl</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                <Button
                  variant="secondary"
                  onClick={() => alert('Öğrenci detayları yakında eklenecek')}
                  className="flex-1 flex items-center justify-center gap-2 text-sm"
                >
                  <Users size={14} />
                  Detaylar
                </Button>
                <button
                  onClick={() => alert('Düzenleme formu yakında eklenecek')}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Düzenle"
                >
                  <Edit size={16} className="text-cyan-400" />
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Sil"
                >
                  <Trash2 size={16} className="text-red-400" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <GraduationCap size={48} className="text-white/20 mx-auto mb-4" />
              <p className="text-white/60">Öğrenci bulunamadı</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

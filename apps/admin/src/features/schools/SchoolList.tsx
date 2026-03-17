import { useState } from 'react';
import { Card, Button } from '@egitim-galaksisi/ui';
import { 
  School, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MapPin,
  Users,
  BookOpen,
  Settings
} from 'lucide-react';

interface School {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  district: string;
  phone: string;
  email: string;
  principalName: string;
  studentCount: number;
  teacherCount: number;
  classroomCount: number;
  status: 'active' | 'inactive';
  foundedYear: string;
}

// Mock data
const mockSchools: School[] = [
  {
    id: '1',
    name: 'Atatürk İlkokulu',
    code: 'ATK001',
    address: 'Cumhuriyet Mah. Atatürk Cad. No:15',
    city: 'İstanbul',
    district: 'Kadıköy',
    phone: '0216 123 45 67',
    email: 'ataturk@okul.com',
    principalName: 'Mehmet Yılmaz',
    studentCount: 450,
    teacherCount: 35,
    classroomCount: 18,
    status: 'active',
    foundedYear: '1985'
  },
  {
    id: '2',
    name: 'Cumhuriyet Ortaokulu',
    code: 'CUM002',
    address: 'İstiklal Mah. Cumhuriyet Sok. No:8',
    city: 'İstanbul',
    district: 'Beşiktaş',
    phone: '0212 234 56 78',
    email: 'cumhuriyet@okul.com',
    principalName: 'Ayşe Demir',
    studentCount: 380,
    teacherCount: 28,
    classroomCount: 15,
    status: 'active',
    foundedYear: '1990'
  },
  {
    id: '3',
    name: 'Gazi İlköğretim Okulu',
    code: 'GAZ003',
    address: 'Zafer Mah. Gazi Bulvarı No:42',
    city: 'Ankara',
    district: 'Çankaya',
    phone: '0312 345 67 89',
    email: 'gazi@okul.com',
    principalName: 'Ali Kaya',
    studentCount: 520,
    teacherCount: 42,
    classroomCount: 22,
    status: 'active',
    foundedYear: '1980'
  },
];

export function SchoolList() {
  const [schools, setSchools] = useState<School[]>(mockSchools);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState<string>('all');

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = filterCity === 'all' || school.city === filterCity;
    return matchesSearch && matchesCity;
  });

  const cities = Array.from(new Set(schools.map(s => s.city)));

  const handleDelete = (id: string) => {
    if (confirm('Bu okulu silmek istediğinizden emin misiniz?')) {
      setSchools(schools.filter(s => s.id !== id));
    }
  };

  const totalStudents = schools.reduce((sum, s) => sum + s.studentCount, 0);
  const totalTeachers = schools.reduce((sum, s) => sum + s.teacherCount, 0);
  const totalClassrooms = schools.reduce((sum, s) => sum + s.classroomCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <School size={32} />
              Okul Yönetimi
            </h1>
            <p className="text-white/60">Tüm okulları görüntüleyin ve yönetin</p>
          </div>
          <Button
            onClick={() => alert('Okul ekleme formu yakında eklenecek')}
            className="flex items-center gap-2"
          >
            <Plus size={18} />
            Yeni Okul
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="text"
                  placeholder="Okul adı, kod veya ilçe ile ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* City Filter */}
            <div>
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="all">Tüm Şehirler</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <div className="text-2xl font-bold text-white mb-1">{schools.length}</div>
            <div className="text-white/60 text-sm">Toplam Okul</div>
          </Card>
          <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
            <div className="text-2xl font-bold text-white mb-1">{totalStudents.toLocaleString()}</div>
            <div className="text-white/60 text-sm">Toplam Öğrenci</div>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20">
            <div className="text-2xl font-bold text-white mb-1">{totalTeachers}</div>
            <div className="text-white/60 text-sm">Toplam Öğretmen</div>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20">
            <div className="text-2xl font-bold text-white mb-1">{totalClassrooms}</div>
            <div className="text-white/60 text-sm">Toplam Sınıf</div>
          </Card>
        </div>

        {/* School Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSchools.map((school) => (
            <Card key={school.id} className="hover:border-purple-500/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500">
                    <School size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{school.name}</h3>
                    <p className="text-white/60 text-sm">Kod: {school.code}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300">
                  Aktif
                </span>
              </div>

              {/* Location */}
              <div className="flex items-start gap-2 mb-3">
                <MapPin size={16} className="text-white/40 mt-1 flex-shrink-0" />
                <div className="text-white/80 text-sm">
                  <p>{school.address}</p>
                  <p>{school.district} / {school.city}</p>
                </div>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div>
                  <p className="text-white/40">Telefon</p>
                  <p className="text-white/80">{school.phone}</p>
                </div>
                <div>
                  <p className="text-white/40">Email</p>
                  <p className="text-white/80">{school.email}</p>
                </div>
                <div>
                  <p className="text-white/40">Müdür</p>
                  <p className="text-white/80">{school.principalName}</p>
                </div>
                <div>
                  <p className="text-white/40">Kuruluş</p>
                  <p className="text-white/80">{school.foundedYear}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <Users size={20} className="text-cyan-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{school.studentCount}</div>
                  <div className="text-xs text-white/60">Öğrenci</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <Users size={20} className="text-green-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{school.teacherCount}</div>
                  <div className="text-xs text-white/60">Öğretmen</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <BookOpen size={20} className="text-purple-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{school.classroomCount}</div>
                  <div className="text-xs text-white/60">Sınıf</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                <Button
                  variant="secondary"
                  onClick={() => alert('Okul detayları yakında eklenecek')}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <Settings size={16} />
                  Yönet
                </Button>
                <button
                  onClick={() => alert('Düzenleme formu yakında eklenecek')}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Düzenle"
                >
                  <Edit size={18} className="text-cyan-400" />
                </button>
                <button
                  onClick={() => handleDelete(school.id)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Sil"
                >
                  <Trash2 size={18} className="text-red-400" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {filteredSchools.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <School size={48} className="text-white/20 mx-auto mb-4" />
              <p className="text-white/60">Okul bulunamadı</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

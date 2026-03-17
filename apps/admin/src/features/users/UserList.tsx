import { useState } from 'react';
import { Card, Button } from '@egitim-galaksisi/ui';
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Filter,
  Download,
  Upload,
  MoreVertical
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
}

// Mock data
const mockUsers: User[] = [
  { id: '1', name: 'Ahmet Yılmaz', email: 'ahmet@example.com', role: 'admin', status: 'active', createdAt: '2024-01-15', lastLogin: '2024-03-17' },
  { id: '2', name: 'Ayşe Demir', email: 'ayse@example.com', role: 'teacher', status: 'active', createdAt: '2024-01-20', lastLogin: '2024-03-16' },
  { id: '3', name: 'Mehmet Kaya', email: 'mehmet@example.com', role: 'student', status: 'active', createdAt: '2024-02-01', lastLogin: '2024-03-17' },
  { id: '4', name: 'Fatma Şahin', email: 'fatma@example.com', role: 'teacher', status: 'active', createdAt: '2024-02-10', lastLogin: '2024-03-15' },
  { id: '5', name: 'Ali Çelik', email: 'ali@example.com', role: 'student', status: 'inactive', createdAt: '2024-02-15', lastLogin: '2024-03-10' },
];

export function UserList() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'bg-purple-500/20 text-purple-300',
      teacher: 'bg-cyan-500/20 text-cyan-300',
      student: 'bg-green-500/20 text-green-300',
    };
    const labels = {
      admin: 'Yönetici',
      teacher: 'Öğretmen',
      student: 'Öğrenci',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[role as keyof typeof colors]}`}>
        {labels[role as keyof typeof labels]}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300">
        Aktif
      </span>
    ) : (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300">
        Pasif
      </span>
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Users size={32} />
              Kullanıcı Yönetimi
            </h1>
            <p className="text-white/60">Tüm kullanıcıları görüntüleyin ve yönetin</p>
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
              onClick={() => alert('Kullanıcı ekleme formu yakında eklenecek')}
              className="flex items-center gap-2"
            >
              <Plus size={18} />
              Yeni Kullanıcı
            </Button>
          </div>
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
                  placeholder="İsim veya email ile ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="all">Tüm Roller</option>
                <option value="admin">Yönetici</option>
                <option value="teacher">Öğretmen</option>
                <option value="student">Öğrenci</option>
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
            <div className="text-2xl font-bold text-white mb-1">{users.length}</div>
            <div className="text-white/60 text-sm">Toplam Kullanıcı</div>
          </Card>
          <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
            <div className="text-2xl font-bold text-white mb-1">
              {users.filter(u => u.status === 'active').length}
            </div>
            <div className="text-white/60 text-sm">Aktif Kullanıcı</div>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20">
            <div className="text-2xl font-bold text-white mb-1">
              {users.filter(u => u.role === 'teacher').length}
            </div>
            <div className="text-white/60 text-sm">Öğretmen</div>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20">
            <div className="text-2xl font-bold text-white mb-1">
              {users.filter(u => u.role === 'student').length}
            </div>
            <div className="text-white/60 text-sm">Öğrenci</div>
          </Card>
        </div>

        {/* User Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Kullanıcı</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Email</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Rol</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Durum</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Kayıt Tarihi</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Son Giriş</th>
                  <th className="text-right py-3 px-4 text-white/60 font-medium text-sm">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <span className="text-white font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-white/60">{user.email}</td>
                    <td className="py-3 px-4">{getRoleBadge(user.role)}</td>
                    <td className="py-3 px-4">{getStatusBadge(user.status)}</td>
                    <td className="py-3 px-4 text-white/60">{user.createdAt}</td>
                    <td className="py-3 px-4 text-white/60">{user.lastLogin || '-'}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => alert('Düzenleme formu yakında eklenecek')}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Düzenle"
                        >
                          <Edit size={16} className="text-cyan-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Sil"
                        >
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                        <button
                          onClick={() => alert('Detay sayfası yakında eklenecek')}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Daha Fazla"
                        >
                          <MoreVertical size={16} className="text-white/60" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users size={48} className="text-white/20 mx-auto mb-4" />
                <p className="text-white/60">Kullanıcı bulunamadı</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

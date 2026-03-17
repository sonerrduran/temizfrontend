import { Card, Button } from '@egitim-galaksisi/ui';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { 
  Users, 
  School, 
  BookOpen, 
  BarChart3, 
  Settings, 
  LogOut, 
  UserCog,
  Calendar,
  Shield,
  TrendingUp
} from 'lucide-react';

export function AdminDashboard() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const stats = [
    { label: 'Toplam Öğrenci', value: '1,245', icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Toplam Öğretmen', value: '87', icon: UserCog, color: 'from-cyan-500 to-blue-500' },
    { label: 'Aktif Okul', value: '5', icon: School, color: 'from-orange-500 to-red-500' },
    { label: 'Toplam Sınıf', value: '42', icon: BookOpen, color: 'from-green-500 to-emerald-500' },
  ];

  const quickActions = [
    { label: 'Kullanıcı Yönetimi', icon: Users, path: '/users' },
    { label: 'Okul Yönetimi', icon: School, path: '/schools' },
    { label: 'Öğretmen Yönetimi', icon: UserCog, path: '/teachers' },
    { label: 'Öğrenci Yönetimi', icon: Users, path: '/students' },
    { label: 'Sınıf Yönetimi', icon: BookOpen, path: '/classrooms' },
    { label: 'Ders Programı', icon: Calendar, path: '/timetable' },
    { label: 'Raporlar', icon: BarChart3, path: '/reports' },
    { label: 'Sistem Ayarları', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Hoş Geldiniz, {user?.name || 'Yönetici'}
            </h1>
            <p className="text-white/60">Sistem Yönetim Paneli</p>
          </div>
          <Button
            variant="secondary"
            onClick={logout}
            className="flex items-center gap-2"
          >
            <LogOut size={18} />
            Çıkış Yap
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -mr-16 -mt-16`} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                      <Icon className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Hızlı İşlemler</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => {
                    if (action.path === '/users') {
                      navigate('/users');
                    } else if (action.path === '/schools') {
                      navigate('/schools');
                    } else if (action.path === '/teachers') {
                      navigate('/teachers');
                    } else if (action.path === '/students') {
                      navigate('/students');
                    } else if (action.path === '/timetable') {
                      navigate('/timetable');
                    } else if (action.path === '/settings') {
                      navigate('/settings');
                    } else if (action.path === '/reports') {
                      navigate('/reports');
                    } else {
                      alert(`${action.label} sayfası yakında eklenecek`);
                    }
                  }}
                  className="flex flex-col items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 group-hover:scale-110 transition-transform">
                    <Icon className="text-white" size={20} />
                  </div>
                  <span className="text-white text-xs text-center">{action.label}</span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Status */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-green-400" size={24} />
              <h2 className="text-xl font-bold text-white">Sistem Durumu</h2>
            </div>
            <div className="space-y-3">
              {[
                { label: 'API Sunucusu', status: 'Çalışıyor', color: 'green' },
                { label: 'Veritabanı', status: 'Çalışıyor', color: 'green' },
                { label: 'Yedekleme', status: 'Aktif', color: 'green' },
                { label: 'Güvenlik', status: 'Güvenli', color: 'green' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-white text-sm">{item.label}</span>
                  <span className={`text-${item.color}-400 text-xs font-medium`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activities */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-cyan-400" size={24} />
              <h2 className="text-xl font-bold text-white">Son Aktiviteler</h2>
            </div>
            <div className="space-y-3">
              {[
                { text: 'Yeni öğretmen eklendi', time: '10 dakika önce' },
                { text: 'Sınıf programı güncellendi', time: '1 saat önce' },
                { text: 'Sistem yedeklemesi tamamlandı', time: '2 saat önce' },
                { text: 'Yeni öğrenci kaydı', time: '3 saat önce' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2" />
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.text}</p>
                    <p className="text-white/40 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="text-purple-400" size={24} />
              <h2 className="text-xl font-bold text-white">Bu Ay</h2>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Yeni Kayıt', value: '45', change: '+12%' },
                { label: 'Aktif Kullanıcı', value: '1,189', change: '+8%' },
                { label: 'Tamamlanan Sınav', value: '234', change: '+15%' },
                { label: 'Sistem Kullanımı', value: '94%', change: '+3%' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-xs">{stat.label}</p>
                    <p className="text-white text-lg font-bold">{stat.value}</p>
                  </div>
                  <span className="text-green-400 text-xs font-medium">{stat.change}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

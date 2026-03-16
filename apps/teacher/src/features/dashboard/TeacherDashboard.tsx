import { Card, Button } from '@egitim-galaksisi/ui';
import { useAuthStore } from '../../stores/authStore';
import { Users, BookOpen, BarChart3, Settings, LogOut, FileText, Calendar } from 'lucide-react';

export function TeacherDashboard() {
  const { user, logout } = useAuthStore();

  const stats = [
    { label: 'Toplam Öğrenci', value: '45', icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Aktif Sınıf', value: '3', icon: BookOpen, color: 'from-cyan-500 to-blue-500' },
    { label: 'Bekleyen Ödev', value: '12', icon: FileText, color: 'from-orange-500 to-red-500' },
    { label: 'Bu Hafta Sınav', value: '2', icon: Calendar, color: 'from-green-500 to-emerald-500' },
  ];

  const quickActions = [
    { label: 'Öğrencilerim', icon: Users, path: '/students' },
    { label: 'Sınıflarım', icon: BookOpen, path: '/classrooms' },
    { label: 'Ödev Oluştur', icon: FileText, path: '/assignments/new' },
    { label: 'Sınav Oluştur', icon: Calendar, path: '/exams/new' },
    { label: 'Raporlar', icon: BarChart3, path: '/reports' },
    { label: 'Ayarlar', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Hoş Geldiniz, {user?.name || 'Öğretmen'}
            </h1>
            <p className="text-white/60">Öğretmen Kontrol Paneli</p>
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => alert(`${action.label} sayfası yakında eklenecek`)}
                  className="flex flex-col items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 group-hover:scale-110 transition-transform">
                    <Icon className="text-white" size={24} />
                  </div>
                  <span className="text-white text-sm text-center">{action.label}</span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-bold text-white mb-4">Son Aktiviteler</h2>
            <div className="space-y-3">
              {[
                { text: 'Ahmet Yılmaz matematik ödevini teslim etti', time: '5 dakika önce' },
                { text: 'Ayşe Demir sınava katıldı', time: '1 saat önce' },
                { text: 'Mehmet Kaya yeni mesaj gönderdi', time: '2 saat önce' },
                { text: 'Fatma Şahin ödevi geç teslim etti', time: '3 saat önce' },
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

          <Card>
            <h2 className="text-xl font-bold text-white mb-4">Yaklaşan Etkinlikler</h2>
            <div className="space-y-3">
              {[
                { title: 'Matematik Sınavı', date: '15 Mart 2026', class: '5-A' },
                { title: 'Fen Bilgisi Quiz', date: '17 Mart 2026', class: '5-B' },
                { title: 'Türkçe Ödev Teslim', date: '20 Mart 2026', class: '5-A' },
                { title: 'Veli Toplantısı', date: '22 Mart 2026', class: 'Tüm Sınıflar' },
              ].map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div>
                    <p className="text-white font-medium text-sm">{event.title}</p>
                    <p className="text-white/60 text-xs mt-1">{event.class}</p>
                  </div>
                  <div className="text-cyan-400 text-xs">{event.date}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Card, Button } from '@egitim-galaksisi/ui';
import { 
  BarChart3, 
  TrendingUp,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Download,
  Filter,
  PieChart,
  Activity,
  Clock,
  Award
} from 'lucide-react';

export function ReportsAnalytics() {
  const [dateRange, setDateRange] = useState<string>('month');
  const [reportType, setReportType] = useState<string>('overview');

  // Mock data
  const stats = {
    totalUsers: 1342,
    activeUsers: 1189,
    totalStudents: 1245,
    totalTeachers: 87,
    totalClasses: 42,
    totalLessons: 856,
    avgAttendance: 94.5,
    avgGrade: 4.2,
  };

  const userGrowth = [
    { month: 'Ocak', users: 980 },
    { month: 'Şubat', users: 1050 },
    { month: 'Mart', users: 1189 },
    { month: 'Nisan', users: 1245 },
    { month: 'Mayıs', users: 1342 },
  ];

  const topPerformers = [
    { name: 'Zeynep Yılmaz', class: '5-A', grade: 4.8, trend: '+0.3' },
    { name: 'Ahmet Demir', class: '6-B', grade: 4.7, trend: '+0.2' },
    { name: 'Elif Kaya', class: '7-A', grade: 4.6, trend: '+0.4' },
    { name: 'Can Şahin', class: '8-A', grade: 4.5, trend: '+0.1' },
    { name: 'Selin Öztürk', class: '5-B', grade: 4.4, trend: '+0.2' },
  ];

  const subjectPerformance = [
    { subject: 'Matematik', avg: 4.3, students: 450, color: 'purple' },
    { subject: 'Türkçe', avg: 4.5, students: 450, color: 'cyan' },
    { subject: 'Fen Bilgisi', avg: 4.1, students: 380, color: 'green' },
    { subject: 'İngilizce', avg: 4.0, students: 450, color: 'orange' },
    { subject: 'Sosyal Bilgiler', avg: 4.2, students: 380, color: 'blue' },
  ];

  const recentActivities = [
    { type: 'Yeni Kayıt', description: '15 yeni öğrenci kaydedildi', time: '2 saat önce', icon: Users },
    { type: 'Sınav', description: '5-A sınıfı matematik sınavı tamamlandı', time: '4 saat önce', icon: BookOpen },
    { type: 'Devamsızlık', description: '3 öğrenci devamsızlık bildirimi', time: '6 saat önce', icon: Calendar },
    { type: 'Başarı', description: 'Zeynep Yılmaz rozet kazandı', time: '1 gün önce', icon: Award },
  ];

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      purple: 'bg-purple-500',
      cyan: 'bg-cyan-500',
      green: 'bg-green-500',
      orange: 'bg-orange-500',
      blue: 'bg-blue-500',
    };
    return colors[color] || 'bg-white';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <BarChart3 size={32} />
              Raporlar ve Analitik
            </h1>
            <p className="text-white/60">Sistem performansını ve istatistikleri görüntüleyin</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => alert('Filtre özelliği yakında eklenecek')}
              className="flex items-center gap-2"
            >
              <Filter size={18} />
              Filtrele
            </Button>
            <Button
              onClick={() => alert('PDF export özelliği yakında eklenecek')}
              className="flex items-center gap-2"
            >
              <Download size={18} />
              PDF İndir
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white/60 text-sm mb-2">Tarih Aralığı</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="week">Son 7 Gün</option>
                <option value="month">Son 30 Gün</option>
                <option value="quarter">Son 3 Ay</option>
                <option value="year">Son 1 Yıl</option>
              </select>
            </div>

            <div>
              <label className="block text-white/60 text-sm mb-2">Rapor Türü</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="overview">Genel Bakış</option>
                <option value="students">Öğrenci Raporları</option>
                <option value="teachers">Öğretmen Raporları</option>
                <option value="performance">Performans Analizi</option>
              </select>
            </div>

            <div>
              <label className="block text-white/60 text-sm mb-2">Okul</label>
              <select
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="all">Tüm Okullar</option>
                <option value="ataturk">Atatürk İlkokulu</option>
                <option value="cumhuriyet">Cumhuriyet Ortaokulu</option>
                <option value="gazi">Gazi İlköğretim</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <div className="flex items-center justify-between mb-4">
              <Users className="text-purple-400" size={24} />
              <span className="text-green-400 text-sm font-medium">+8.2%</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.totalUsers.toLocaleString()}</div>
            <div className="text-white/60 text-sm">Toplam Kullanıcı</div>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
            <div className="flex items-center justify-between mb-4">
              <GraduationCap className="text-cyan-400" size={24} />
              <span className="text-green-400 text-sm font-medium">+5.1%</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.totalStudents.toLocaleString()}</div>
            <div className="text-white/60 text-sm">Toplam Öğrenci</div>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="text-green-400" size={24} />
              <span className="text-green-400 text-sm font-medium">+12.3%</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.totalLessons.toLocaleString()}</div>
            <div className="text-white/60 text-sm">Toplam Ders</div>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20">
            <div className="flex items-center justify-between mb-4">
              <Activity className="text-orange-400" size={24} />
              <span className="text-green-400 text-sm font-medium">+2.1%</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.avgAttendance}%</div>
            <div className="text-white/60 text-sm">Ortalama Devam</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* User Growth Chart */}
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-purple-400" size={24} />
                <h2 className="text-xl font-bold text-white">Kullanıcı Artışı</h2>
              </div>
              <span className="text-green-400 text-sm font-medium">+36.9% bu ay</span>
            </div>

            <div className="space-y-4">
              {userGrowth.map((data, index) => {
                const maxUsers = Math.max(...userGrowth.map(d => d.users));
                const percentage = (data.users / maxUsers) * 100;
                
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/80 text-sm">{data.month}</span>
                      <span className="text-white font-medium">{data.users.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Top Performers */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Award className="text-yellow-400" size={24} />
              <h2 className="text-xl font-bold text-white">En Başarılılar</h2>
            </div>

            <div className="space-y-3">
              {topPerformers.map((student, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">{student.name}</div>
                    <div className="text-white/40 text-xs">{student.class}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{student.grade}</div>
                    <div className="text-green-400 text-xs">{student.trend}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subject Performance */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="text-cyan-400" size={24} />
              <h2 className="text-xl font-bold text-white">Ders Performansı</h2>
            </div>

            <div className="space-y-4">
              {subjectPerformance.map((subject, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getColorClass(subject.color)}`} />
                      <span className="text-white/80 text-sm">{subject.subject}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-white/60 text-xs">{subject.students} öğrenci</span>
                      <span className="text-white font-medium">{subject.avg}</span>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className={`${getColorClass(subject.color)} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${(subject.avg / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activities */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Clock className="text-green-400" size={24} />
              <h2 className="text-xl font-bold text-white">Son Aktiviteler</h2>
            </div>

            <div className="space-y-3">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500">
                      <Icon size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium text-sm mb-1">{activity.type}</div>
                      <div className="text-white/60 text-xs mb-1">{activity.description}</div>
                      <div className="text-white/40 text-xs">{activity.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

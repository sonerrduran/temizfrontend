import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { userAPI, badgeAPI } from '../../services/api';
import { SUBJECTS } from '../../config/subjects';
import { 
  LIFE_SKILLS_CARDS, 
  MENTAL_DEVELOPMENT_CARDS, 
  LANGUAGE_COMMUNICATION_CARDS, 
  FUN_GAMES_CARDS 
} from '../../config/dashboardCategories';
import CategorySection from './components/CategorySection';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [dashData, setDashData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadDashboard(); }, []);

  const loadDashboard = async () => {
    try {
      const [dashRes] = await Promise.all([
        userAPI.getDashboard(),
        badgeAPI.check(),
      ]);
      setDashData((dashRes as any).data);
    } catch (e) {
      console.error('Dashboard load error:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-bounce">🚀</div>
          <p className="text-white/50 mt-4 text-lg">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  const u = dashData?.user || user;
  const xpProgress = ((u?.xp || 0) % 100);

  // Akademik dersler için kartları hazırla
  const academicCards = SUBJECTS.map(subject => ({
    id: subject.id,
    title: subject.name,
    description: subject.description,
    icon: subject.icon,
    gradient: subject.gradient,
    path: subject.path
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      {/* Modern Header */}
      <header className="bg-[#1a1a2e]/80 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🚀</span>
            <h1 className="text-xl font-bold text-white">Eğitim Galaksisi</h1>
          </div>
          
          {/* Stats Bar */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-yellow-500/10 px-3 py-1.5 rounded-full">
              <span>⭐</span>
              <span className="text-yellow-300 font-bold">{u?.stars || 0}</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-500/10 px-3 py-1.5 rounded-full">
              <span>🔮</span>
              <span className="text-purple-300 font-bold">Lv.{u?.level || 1}</span>
            </div>
            <div className="flex items-center gap-2 bg-orange-500/10 px-3 py-1.5 rounded-full">
              <span>🔥</span>
              <span className="text-orange-300 font-bold">{u?.streakDays || 0} gün</span>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center gap-3 ml-2 pl-4 border-l border-white/10">
              <span className="text-2xl">{u?.avatar || '👨‍🚀'}</span>
              <div>
                <div className="text-white text-sm font-medium">{u?.name}</div>
                <div className="text-white/40 text-xs">{u?.gradeLevel}. Sınıf</div>
              </div>
              <button 
                onClick={logout}
                className="ml-2 p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors" 
                title="Çıkış"
              >
                🚪
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Merhaba, {u?.name?.split(' ')[0]}! 👋
          </h2>
          <p className="text-white/50">Bugün hangi dersi keşfetmek istersin?</p>
          
          {/* XP Progress Bar */}
          <div className="mt-4 bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-purple-300">Level {u?.level}</span>
              <span className="text-white/40">{xpProgress}/100 XP</span>
              <span className="text-purple-300">Level {(u?.level || 1) + 1}</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${xpProgress}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: '⭐', label: 'Toplam Yıldız', value: u?.stars || 0, color: 'yellow' },
            { icon: '✅', label: 'Çözülen Soru', value: u?.solvedProblems || 0, color: 'green' },
            { icon: '🔥', label: 'Gün Serisi', value: `${u?.streakDays || 0} gün`, color: 'orange' },
            { icon: '🏆', label: 'Rozetler', value: dashData?.badges?.length || 0, color: 'blue' },
          ].map((stat, i) => (
            <div 
              key={i} 
              className={`bg-${stat.color}-500/10 border border-${stat.color}-500/20 rounded-xl p-5 text-center`}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-white/40 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Akademik Dersler */}
        <CategorySection
          title="Akademik Dersler"
          icon="📚"
          cards={academicCards}
          userGrade={u?.gradeLevel}
        />

        {/* Yaşam Becerileri */}
        <CategorySection
          title="Yaşam Becerileri"
          icon="🌟"
          cards={LIFE_SKILLS_CARDS}
          userGrade={u?.gradeLevel}
        />

        {/* Zihinsel Gelişim */}
        <CategorySection
          title="Zihinsel Gelişim"
          icon="🧠"
          cards={MENTAL_DEVELOPMENT_CARDS}
          userGrade={u?.gradeLevel}
        />

        {/* Dil ve İletişim */}
        <CategorySection
          title="Dil ve İletişim"
          icon="💬"
          cards={LANGUAGE_COMMUNICATION_CARDS}
          userGrade={u?.gradeLevel}
        />

        {/* Oyun ve Eğlence */}
        <CategorySection
          title="Oyun ve Eğlence"
          icon="🎮"
          cards={FUN_GAMES_CARDS}
          userGrade={u?.gradeLevel}
        />
      </main>
    </div>
  );
}

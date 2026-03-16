import { useAuthStore } from '../../../stores/authStore';
import LifeSkillsCategoryMenu from '../components/LifeSkillsCategoryMenu';
import TrafficLessons from './lessons/TrafficLessons';
import TrafficTests from './tests/TrafficTests';
import TrafficScenarios from './scenarios/TrafficScenarios';
import TrafficGames from './games/TrafficGames';

export default function TrafficMenu() {
  const { user } = useAuthStore();
  const gradeLevel = user?.gradeLevel || 1;

  // Sadece renkler tanımlanır, aktiviteler config'den gelir
  const activityColors = [
    { id: 'lessons', color: 'from-red-500 to-orange-600' },
    { id: 'tests', color: 'from-orange-500 to-amber-600' },
    { id: 'scenarios', color: 'from-amber-500 to-yellow-600' },
    { id: 'games', color: 'from-yellow-500 to-orange-600' }
  ];

  return (
    <LifeSkillsCategoryMenu
      title="Trafik ve Yol Güvenliği"
      subtitle="Güvenli trafik için öğren!"
      bgGradient="from-slate-900 via-red-900 to-slate-900"
      badgeColor="bg-red-500/20 text-red-300"
      activityColors={activityColors}
      components={{
        lessons: <TrafficLessons gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        tests: <TrafficTests gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        scenarios: <TrafficScenarios gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        games: <TrafficGames gradeLevel={gradeLevel} onExit={() => window.history.back()} />
      }}
    />
  );
}

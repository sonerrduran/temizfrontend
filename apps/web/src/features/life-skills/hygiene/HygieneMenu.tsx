import { useAuthStore } from '../../../stores/authStore';
import LifeSkillsCategoryMenu from '../components/LifeSkillsCategoryMenu';
import HygieneLessons from './lessons/HygieneLessons';
import HygieneTests from './tests/HygieneTests';
import HygieneScenarios from './scenarios/HygieneScenarios';
import HygieneGames from './games/HygieneGames';

export default function HygieneMenu() {
  const { user } = useAuthStore();
  const gradeLevel = user?.gradeLevel || 1;

  // Sadece renkler tanımlanır, aktiviteler config'den gelir
  const activityColors = [
    { id: 'lessons', color: 'from-blue-500 to-cyan-600' },
    { id: 'tests', color: 'from-cyan-500 to-teal-600' },
    { id: 'scenarios', color: 'from-teal-500 to-emerald-600' },
    { id: 'games', color: 'from-emerald-500 to-green-600' }
  ];

  return (
    <LifeSkillsCategoryMenu
      title="Kişisel Hijyen ve Sağlık"
      subtitle="Sağlıklı yaşam için öğren!"
      bgGradient="from-slate-900 via-blue-900 to-slate-900"
      badgeColor="bg-blue-500/20 text-blue-300"
      activityColors={activityColors}
      components={{
        lessons: <HygieneLessons gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        tests: <HygieneTests gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        scenarios: <HygieneScenarios gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        games: <HygieneGames gradeLevel={gradeLevel} onExit={() => window.history.back()} />
      }}
    />
  );
}

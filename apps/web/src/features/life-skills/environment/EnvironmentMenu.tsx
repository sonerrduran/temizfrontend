import { useAuthStore } from '../../../stores/authStore';
import LifeSkillsCategoryMenu from '../components/LifeSkillsCategoryMenu';
import EnvironmentLessons from './lessons/EnvironmentLessons';
import EnvironmentTests from './tests/EnvironmentTests';
import EnvironmentScenarios from './scenarios/EnvironmentScenarios';
import EnvironmentGames from './games/EnvironmentGames';

export default function EnvironmentMenu() {
  const { user } = useAuthStore();
  const gradeLevel = user?.gradeLevel || 1;

  const activityColors = [
    { id: 'lessons', color: 'from-teal-500 to-cyan-600' },
    { id: 'tests', color: 'from-cyan-500 to-blue-600' },
    { id: 'scenarios', color: 'from-blue-500 to-indigo-600' },
    { id: 'games', color: 'from-indigo-500 to-purple-600' }
  ];

  return (
    <LifeSkillsCategoryMenu
      title="Çevre Bilinci"
      subtitle="Doğayı korumayı öğren!"
      bgGradient="from-slate-900 via-teal-900 to-slate-900"
      badgeColor="bg-teal-500/20 text-teal-300"
      activityColors={activityColors}
      components={{
        lessons: <EnvironmentLessons gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        tests: <EnvironmentTests gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        scenarios: <EnvironmentScenarios gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        games: <EnvironmentGames gradeLevel={gradeLevel} onExit={() => window.history.back()} />
      }}
    />
  );
}

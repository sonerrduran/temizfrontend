import { useAuthStore } from '../../../stores/authStore';
import LifeSkillsCategoryMenu from '../components/LifeSkillsCategoryMenu';
import FinancialLessons from './lessons/FinancialLessons';
import FinancialTests from './tests/FinancialTests';
import FinancialScenarios from './scenarios/FinancialScenarios';
import FinancialGames from './games/FinancialGames';

export default function FinancialMenu() {
  const { user } = useAuthStore();
  const gradeLevel = user?.gradeLevel || 1;

  const activityColors = [
    { id: 'lessons', color: 'from-amber-500 to-yellow-600' },
    { id: 'tests', color: 'from-yellow-500 to-orange-600' },
    { id: 'scenarios', color: 'from-orange-500 to-red-600' },
    { id: 'games', color: 'from-red-500 to-pink-600' }
  ];

  return (
    <LifeSkillsCategoryMenu
      title="Finansal Okuryazarlık"
      subtitle="Para yönetimini öğren!"
      bgGradient="from-slate-900 via-amber-900 to-slate-900"
      badgeColor="bg-amber-500/20 text-amber-300"
      activityColors={activityColors}
      components={{
        lessons: <FinancialLessons gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        tests: <FinancialTests gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        scenarios: <FinancialScenarios gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        games: <FinancialGames gradeLevel={gradeLevel} onExit={() => window.history.back()} />
      }}
    />
  );
}

import { useAuthStore } from '../../../stores/authStore';
import LifeSkillsCategoryMenu from '../components/LifeSkillsCategoryMenu';
import NutritionLessons from './lessons/NutritionLessons';
import NutritionTests from './tests/NutritionTests';
import NutritionScenarios from './scenarios/NutritionScenarios';
import NutritionGames from './games/NutritionGames';

export default function NutritionMenu() {
  const { user } = useAuthStore();
  const gradeLevel = user?.gradeLevel || 1;

  const activityColors = [
    { id: 'lessons', color: 'from-lime-500 to-green-600' },
    { id: 'tests', color: 'from-green-500 to-emerald-600' },
    { id: 'scenarios', color: 'from-emerald-500 to-teal-600' },
    { id: 'games', color: 'from-teal-500 to-cyan-600' }
  ];

  return (
    <LifeSkillsCategoryMenu
      title="Sağlıklı Beslenme"
      subtitle="Sağlıklı yaşam için öğren!"
      bgGradient="from-slate-900 via-lime-900 to-slate-900"
      badgeColor="bg-lime-500/20 text-lime-300"
      activityColors={activityColors}
      components={{
        lessons: <NutritionLessons gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        tests: <NutritionTests gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        scenarios: <NutritionScenarios gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        games: <NutritionGames gradeLevel={gradeLevel} onExit={() => window.history.back()} />
      }}
    />
  );
}

import { useAuthStore } from '../../../stores/authStore';
import LifeSkillsCategoryMenu from '../components/LifeSkillsCategoryMenu';
import FirstAidLessons from './lessons/FirstAidLessons';
import FirstAidTests from './tests/FirstAidTests';
import FirstAidScenarios from './scenarios/FirstAidScenarios';
import FirstAidGames from './games/FirstAidGames';

export default function FirstAidMenu() {
  const { user } = useAuthStore();
  const gradeLevel = user?.gradeLevel || 1;

  const activityColors = [
    { id: 'lessons', color: 'from-red-500 to-rose-600' },
    { id: 'tests', color: 'from-rose-500 to-pink-600' },
    { id: 'scenarios', color: 'from-pink-500 to-fuchsia-600' },
    { id: 'games', color: 'from-fuchsia-500 to-purple-600' }
  ];

  return (
    <LifeSkillsCategoryMenu
      title="İlk Yardım"
      subtitle="Hayat kurtaran bilgiler öğren!"
      bgGradient="from-slate-900 via-red-900 to-slate-900"
      badgeColor="bg-red-500/20 text-red-300"
      activityColors={activityColors}
      components={{
        lessons: <FirstAidLessons gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        tests: <FirstAidTests gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        scenarios: <FirstAidScenarios gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        games: <FirstAidGames gradeLevel={gradeLevel} onExit={() => window.history.back()} />
      }}
    />
  );
}

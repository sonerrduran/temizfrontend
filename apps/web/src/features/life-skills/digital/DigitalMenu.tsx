import { useAuthStore } from '../../../stores/authStore';
import LifeSkillsCategoryMenu from '../components/LifeSkillsCategoryMenu';
import DigitalLessons from './lessons/DigitalLessons';
import DigitalTests from './tests/DigitalTests';
import DigitalScenarios from './scenarios/DigitalScenarios';
import DigitalGames from './games/DigitalGames';

export default function DigitalMenu() {
  const { user } = useAuthStore();
  const gradeLevel = user?.gradeLevel || 1;

  const activityColors = [
    { id: 'lessons', color: 'from-blue-500 to-indigo-600' },
    { id: 'tests', color: 'from-indigo-500 to-purple-600' },
    { id: 'scenarios', color: 'from-purple-500 to-pink-600' },
    { id: 'games', color: 'from-pink-500 to-rose-600' }
  ];

  return (
    <LifeSkillsCategoryMenu
      title="Dijital Okuryazarlık"
      subtitle="Dijital dünyayı güvenle keşfet!"
      bgGradient="from-slate-900 via-blue-900 to-slate-900"
      badgeColor="bg-blue-500/20 text-blue-300"
      activityColors={activityColors}
      components={{
        lessons: <DigitalLessons gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        tests: <DigitalTests gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        scenarios: <DigitalScenarios gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        games: <DigitalGames gradeLevel={gradeLevel} onExit={() => window.history.back()} />
      }}
    />
  );
}

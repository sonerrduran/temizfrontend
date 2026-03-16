import { useAuthStore } from '../../../stores/authStore';
import LifeSkillsCategoryMenu from '../components/LifeSkillsCategoryMenu';
import DigitalHealthLessons from './lessons/DigitalHealthLessons';
import DigitalHealthTests from './tests/DigitalHealthTests';
import DigitalHealthScenarios from './scenarios/DigitalHealthScenarios';
import DigitalHealthGames from './games/DigitalHealthGames';

export default function DigitalHealthMenu() {
  const { user } = useAuthStore();
  const gradeLevel = user?.gradeLevel || 1;

  const activityColors = [
    { id: 'lessons', color: 'from-violet-500 to-purple-600' },
    { id: 'tests', color: 'from-purple-500 to-fuchsia-600' },
    { id: 'scenarios', color: 'from-fuchsia-500 to-pink-600' },
    { id: 'games', color: 'from-pink-500 to-rose-600' }
  ];

  return (
    <LifeSkillsCategoryMenu
      title="Dijital Sağlık"
      subtitle="Ekran başında sağlıklı kal!"
      bgGradient="from-slate-900 via-violet-900 to-slate-900"
      badgeColor="bg-violet-500/20 text-violet-300"
      activityColors={activityColors}
      components={{
        lessons: <DigitalHealthLessons gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        tests: <DigitalHealthTests gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        scenarios: <DigitalHealthScenarios gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        games: <DigitalHealthGames gradeLevel={gradeLevel} onExit={() => window.history.back()} />
      }}
    />
  );
}

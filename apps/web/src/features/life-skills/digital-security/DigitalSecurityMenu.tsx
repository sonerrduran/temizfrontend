import { useAuthStore } from '../../../stores/authStore';
import LifeSkillsCategoryMenu from '../components/LifeSkillsCategoryMenu';
import DigitalSecurityLessons from './lessons/DigitalSecurityLessons';
import DigitalSecurityTests from './tests/DigitalSecurityTests';
import DigitalSecurityScenarios from './scenarios/DigitalSecurityScenarios';
import DigitalSecurityGames from './games/DigitalSecurityGames';

export default function DigitalSecurityMenu() {
  const { user } = useAuthStore();
  const gradeLevel = user?.gradeLevel || 1;

  const activityColors = [
    { id: 'lessons', color: 'from-purple-500 to-indigo-600' },
    { id: 'tests', color: 'from-indigo-500 to-violet-600' },
    { id: 'scenarios', color: 'from-violet-500 to-purple-600' },
    { id: 'games', color: 'from-purple-500 to-fuchsia-600' }
  ];

  return (
    <LifeSkillsCategoryMenu
      title="Dijital Güvenlik"
      subtitle="İnternet ve dijital dünyada güvende kal!"
      bgGradient="from-slate-900 via-purple-900 to-slate-900"
      badgeColor="bg-purple-500/20 text-purple-300"
      activityColors={activityColors}
      components={{
        lessons: <DigitalSecurityLessons gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        tests: <DigitalSecurityTests gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        scenarios: <DigitalSecurityScenarios gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        games: <DigitalSecurityGames gradeLevel={gradeLevel} onExit={() => window.history.back()} />
      }}
    />
  );
}

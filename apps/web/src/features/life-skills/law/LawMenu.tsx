import { useAuthStore } from '../../../stores/authStore';
import LifeSkillsCategoryMenu from '../components/LifeSkillsCategoryMenu';
import LawLessons from './lessons/LawLessons';
import LawTests from './tests/LawTests';
import LawScenarios from './scenarios/LawScenarios';
import LawGames from './games/LawGames';

export default function LawMenu() {
  const { user } = useAuthStore();
  const gradeLevel = user?.gradeLevel || 1;

  const activityColors = [
    { id: 'lessons', color: 'from-slate-500 to-gray-600' },
    { id: 'tests', color: 'from-gray-500 to-zinc-600' },
    { id: 'scenarios', color: 'from-zinc-500 to-stone-600' },
    { id: 'games', color: 'from-stone-500 to-neutral-600' }
  ];

  return (
    <LifeSkillsCategoryMenu
      title="Hukuk Bilinci"
      subtitle="Hak ve sorumluluklarını öğren!"
      bgGradient="from-slate-900 via-gray-900 to-slate-900"
      badgeColor="bg-slate-500/20 text-slate-300"
      activityColors={activityColors}
      components={{
        lessons: <LawLessons gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        tests: <LawTests gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        scenarios: <LawScenarios gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        games: <LawGames gradeLevel={gradeLevel} onExit={() => window.history.back()} />
      }}
    />
  );
}

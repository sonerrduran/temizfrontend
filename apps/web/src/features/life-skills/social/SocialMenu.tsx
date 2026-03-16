import { useAuthStore } from '../../../stores/authStore';
import LifeSkillsCategoryMenu from '../components/LifeSkillsCategoryMenu';
import SocialLessons from './lessons/SocialLessons';
import SocialTests from './tests/SocialTests';
import SocialScenarios from './scenarios/SocialScenarios';
import SocialGames from './games/SocialGames';

export default function SocialMenu() {
  const { user } = useAuthStore();
  const gradeLevel = user?.gradeLevel || 1;

  const activityColors = [
    { id: 'lessons', color: 'from-rose-500 to-pink-600' },
    { id: 'tests', color: 'from-pink-500 to-fuchsia-600' },
    { id: 'scenarios', color: 'from-fuchsia-500 to-purple-600' },
    { id: 'games', color: 'from-purple-500 to-indigo-600' }
  ];

  return (
    <LifeSkillsCategoryMenu
      title="Sosyal Beceriler"
      subtitle="İletişim ve empati geliştir!"
      bgGradient="from-slate-900 via-rose-900 to-slate-900"
      badgeColor="bg-rose-500/20 text-rose-300"
      activityColors={activityColors}
      components={{
        lessons: <SocialLessons gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        tests: <SocialTests gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        scenarios: <SocialScenarios gradeLevel={gradeLevel} onExit={() => window.history.back()} />,
        games: <SocialGames gradeLevel={gradeLevel} onExit={() => window.history.back()} />
      }}
    />
  );
}

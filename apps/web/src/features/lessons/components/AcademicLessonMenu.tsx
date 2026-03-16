import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import { GameCard } from '@egitim-galaksisi/ui';
import { ACADEMIC_ACTIVITIES } from '../../../config/categoryActivities';

interface ActivityWithPath {
  id: string;
  color: string;
  path: string;
}

interface AcademicLessonMenuProps {
  subjectName: string;
  subjectIcon: string;
  bgGradient: string;
  activityPaths: ActivityWithPath[];
}

export default function AcademicLessonMenu({
  subjectName,
  subjectIcon,
  bgGradient,
  activityPaths
}: AcademicLessonMenuProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const gradeLevel = user?.gradeLevel || 1;

  // Merge base activities with paths and colors
  const activities = ACADEMIC_ACTIVITIES.map((activity) => {
    const pathConfig = activityPaths.find(p => p.id === activity.id);
    return {
      ...activity,
      color: pathConfig?.color || 'from-gray-500 to-gray-600',
      path: pathConfig?.path || '#'
    };
  });

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgGradient} p-4 md:p-8`}>
      <div className="w-full max-w-7xl mx-auto px-2">
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-white/60 hover:text-white mb-4 flex items-center gap-2 text-sm"
          >
            ← Geri
          </button>
          <div className="text-center">
            <div className="text-7xl mb-4">{subjectIcon}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{subjectName}</h1>
            <p className="text-white/60 text-lg">Nasıl öğrenmek istersin?</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
          {activities.map((activity) => (
            <GameCard
              key={activity.id}
              title={activity.title}
              icon={activity.icon}
              color={activity.color}
              description={activity.description}
              onClick={() => navigate(activity.path)}
            />
          ))}
        </div>

        <div className="text-center">
          <p className="text-white/50 text-sm mb-4">Senin sınıfın: {gradeLevel}. Sınıf</p>
        </div>
      </div>
    </div>
  );
}

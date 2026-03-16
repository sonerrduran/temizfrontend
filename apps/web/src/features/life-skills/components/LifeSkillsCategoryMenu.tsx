import { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameCard } from '@egitim-galaksisi/ui';
import { useAuthStore } from '../../../stores/authStore';
import { LIFE_SKILLS_ACTIVITIES } from '../../../config/categoryActivities';

interface ActivityWithColor {
  id: string;
  color: string;
}

interface LifeSkillsCategoryMenuProps {
  title: string;
  subtitle: string;
  bgGradient: string;
  badgeColor: string;
  activityColors: ActivityWithColor[];
  components: Record<string, ReactNode>;
}

export default function LifeSkillsCategoryMenu({
  title,
  subtitle,
  bgGradient,
  badgeColor,
  activityColors,
  components
}: LifeSkillsCategoryMenuProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const gradeLevel = user?.gradeLevel || 1;
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  // Merge base activities with colors
  const activities = LIFE_SKILLS_ACTIVITIES.map((activity) => {
    const colorConfig = activityColors.find(c => c.id === activity.id);
    return {
      ...activity,
      color: colorConfig?.color || 'from-gray-500 to-gray-600'
    };
  });

  // Render selected activity component
  if (selectedActivity && components[selectedActivity]) {
    return <>{components[selectedActivity]}</>;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgGradient} p-4 md:p-8`}>
      <div className="w-full max-w-7xl mx-auto px-2">
        <div className="text-center mb-12">
          <button
            onClick={() => navigate('/dashboard')}
            className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm relative z-50"
          >
            ⬅ GERİ DÖN
          </button>
          <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">
            {title}
          </h2>
          <p className="text-white/80 text-lg mt-4">{subtitle}</p>
          <div className="flex justify-center gap-3 mt-4">
            <span className={`${badgeColor} px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest`}>
              {gradeLevel}. SINIF
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto pb-32">
          {activities.map((activity) => (
            <GameCard
              key={activity.id}
              title={activity.title}
              icon={activity.icon}
              color={activity.color}
              description={activity.description}
              onClick={() => setSelectedActivity(activity.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

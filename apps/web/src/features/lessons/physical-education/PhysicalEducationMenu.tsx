import AcademicLessonMenu from '../components/AcademicLessonMenu';

const PhysicalEducationMenu = () => {
  const activityPaths = [
    { id: 'learn', color: 'from-blue-500 to-cyan-500', path: '/lessons/physical-education/learn' },
    { id: 'practice', color: 'from-green-500 to-emerald-500', path: '/lessons/physical-education/practice' },
    { id: 'playground', color: 'from-purple-500 to-pink-500', path: '/games/physical-education/playground' }
  ];

  return (
    <AcademicLessonMenu
      subjectName="Beden Eğitimi"
      subjectIcon="⚽"
      bgGradient="from-orange-900 via-orange-700 to-red-600"
      activityPaths={activityPaths}
    />
  );
};

export default PhysicalEducationMenu;

import AcademicLessonMenu from '../components/AcademicLessonMenu';

const TurkishMenu = () => {
  const activityPaths = [
    { id: 'learn', color: 'from-blue-500 to-cyan-500', path: '/lessons/turkish/learn' },
    { id: 'practice', color: 'from-green-500 to-emerald-500', path: '/lessons/turkish/practice' },
    { id: 'playground', color: 'from-purple-500 to-pink-500', path: '/games/turkish/playground' }
  ];

  return (
    <AcademicLessonMenu
      subjectName="Türkçe"
      subjectIcon="📚"
      bgGradient="from-red-900 via-red-700 to-orange-600"
      activityPaths={activityPaths}
    />
  );
};

export default TurkishMenu;

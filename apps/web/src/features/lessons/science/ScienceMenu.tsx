import AcademicLessonMenu from '../components/AcademicLessonMenu';

const ScienceMenu = () => {
  const activityPaths = [
    { id: 'learn', color: 'from-blue-500 to-cyan-500', path: '/lessons/science/learn' },
    { id: 'practice', color: 'from-green-500 to-emerald-500', path: '/lessons/science/practice' },
    { id: 'playground', color: 'from-purple-500 to-pink-500', path: '/games/science/playground' }
  ];

  return (
    <AcademicLessonMenu
      subjectName="Fen Bilgisi"
      subjectIcon="🔬"
      bgGradient="from-teal-900 via-teal-700 to-cyan-600"
      activityPaths={activityPaths}
    />
  );
};

export default ScienceMenu;

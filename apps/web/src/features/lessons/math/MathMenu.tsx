import AcademicLessonMenu from '../components/AcademicLessonMenu';

const MathMenu = () => {
  const activityPaths = [
    { id: 'learn', color: 'from-blue-500 to-cyan-500', path: '/lessons/math/learn' },
    { id: 'practice', color: 'from-green-500 to-emerald-500', path: '/lessons/math/practice' },
    { id: 'playground', color: 'from-purple-500 to-pink-500', path: '/games/math/playground' }
  ];

  return (
    <AcademicLessonMenu
      subjectName="Matematik"
      subjectIcon="🔢"
      bgGradient="from-indigo-900 via-indigo-700 to-blue-600"
      activityPaths={activityPaths}
    />
  );
};

export default MathMenu;

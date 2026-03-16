import AcademicLessonMenu from '../components/AcademicLessonMenu';

const GermanMenu = () => {
  const activityPaths = [
    { id: 'learn', color: 'from-blue-500 to-cyan-500', path: '/lessons/german/learn' },
    { id: 'practice', color: 'from-green-500 to-emerald-500', path: '/lessons/german/practice' },
    { id: 'playground', color: 'from-purple-500 to-pink-500', path: '/games/german/playground' }
  ];

  return (
    <AcademicLessonMenu
      subjectName="Almanca"
      subjectIcon="🇩🇪"
      bgGradient="from-gray-900 via-gray-700 to-slate-600"
      activityPaths={activityPaths}
    />
  );
};

export default GermanMenu;

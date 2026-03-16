import AcademicLessonMenu from '../components/AcademicLessonMenu';

const LifeScienceMenu = () => {
  const activityPaths = [
    { id: 'learn', color: 'from-blue-500 to-cyan-500', path: '/lessons/life-science/learn' },
    { id: 'practice', color: 'from-green-500 to-emerald-500', path: '/lessons/life-science/practice' },
    { id: 'playground', color: 'from-purple-500 to-pink-500', path: '/games/life-science/playground' }
  ];

  return (
    <AcademicLessonMenu
      subjectName="Hayat Bilgisi"
      subjectIcon="🌱"
      bgGradient="from-lime-900 via-lime-700 to-green-600"
      activityPaths={activityPaths}
    />
  );
};

export default LifeScienceMenu;

import AcademicLessonMenu from '../components/AcademicLessonMenu';

const ReligionMenu = () => {
  const activityPaths = [
    { id: 'learn', color: 'from-blue-500 to-cyan-500', path: '/lessons/religion/learn' },
    { id: 'practice', color: 'from-green-500 to-emerald-500', path: '/lessons/religion/practice' },
    { id: 'playground', color: 'from-purple-500 to-pink-500', path: '/games/religion/playground' }
  ];

  return (
    <AcademicLessonMenu
      subjectName="Din Kültürü"
      subjectIcon="☪️"
      bgGradient="from-emerald-900 via-emerald-700 to-teal-600"
      activityPaths={activityPaths}
    />
  );
};

export default ReligionMenu;

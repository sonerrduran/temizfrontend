import AcademicLessonMenu from '../components/AcademicLessonMenu';

const EnglishMenu = () => {
  const activityPaths = [
    { id: 'learn', color: 'from-blue-500 to-cyan-500', path: '/lessons/english/learn' },
    { id: 'practice', color: 'from-green-500 to-emerald-500', path: '/lessons/english/practice' },
    { id: 'playground', color: 'from-purple-500 to-pink-500', path: '/games/english/playground' }
  ];

  return (
    <AcademicLessonMenu
      subjectName="İngilizce"
      subjectIcon="🇬🇧"
      bgGradient="from-sky-900 via-sky-700 to-blue-600"
      activityPaths={activityPaths}
    />
  );
};

export default EnglishMenu;

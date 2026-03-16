import AcademicLessonMenu from '../components/AcademicLessonMenu';

const VisualArtsMenu = () => {
  const activityPaths = [
    { id: 'learn', color: 'from-blue-500 to-cyan-500', path: '/lessons/visual-arts/learn' },
    { id: 'practice', color: 'from-green-500 to-emerald-500', path: '/lessons/visual-arts/practice' },
    { id: 'playground', color: 'from-purple-500 to-pink-500', path: '/games/visual-arts/playground' }
  ];

  return (
    <AcademicLessonMenu
      subjectName="Görsel Sanatlar"
      subjectIcon="🎨"
      bgGradient="from-pink-900 via-pink-700 to-rose-600"
      activityPaths={activityPaths}
    />
  );
};

export default VisualArtsMenu;

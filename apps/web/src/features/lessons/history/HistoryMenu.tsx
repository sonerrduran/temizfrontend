import AcademicLessonMenu from '../components/AcademicLessonMenu';

const HistoryMenu = () => {
  const activityPaths = [
    { id: 'learn', color: 'from-blue-500 to-cyan-500', path: '/lessons/history/learn' },
    { id: 'practice', color: 'from-green-500 to-emerald-500', path: '/lessons/history/practice' },
    { id: 'playground', color: 'from-purple-500 to-pink-500', path: '/games/history/playground' }
  ];

  return (
    <AcademicLessonMenu
      subjectName="Tarih"
      subjectIcon="📜"
      bgGradient="from-stone-900 via-stone-700 to-amber-600"
      activityPaths={activityPaths}
    />
  );
};

export default HistoryMenu;

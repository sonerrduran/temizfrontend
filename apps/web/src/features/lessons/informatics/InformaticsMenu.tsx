import AcademicLessonMenu from '../components/AcademicLessonMenu';

const InformaticsMenu = () => {
  const activityPaths = [
    { id: 'learn', color: 'from-blue-500 to-cyan-500', path: '/lessons/informatics/learn' },
    { id: 'practice', color: 'from-green-500 to-emerald-500', path: '/lessons/informatics/practice' },
    { id: 'playground', color: 'from-purple-500 to-pink-500', path: '/games/informatics/playground' }
  ];

  return (
    <AcademicLessonMenu
      subjectName="Bilişim Teknolojileri"
      subjectIcon="💻"
      bgGradient="from-blue-900 via-blue-700 to-indigo-600"
      activityPaths={activityPaths}
    />
  );
};

export default InformaticsMenu;

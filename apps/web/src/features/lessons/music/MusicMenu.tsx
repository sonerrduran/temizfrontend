import AcademicLessonMenu from '../components/AcademicLessonMenu';

const MusicMenu = () => {
  const activityPaths = [
    { id: 'learn', color: 'from-blue-500 to-cyan-500', path: '/lessons/music/learn' },
    { id: 'practice', color: 'from-green-500 to-emerald-500', path: '/lessons/music/practice' },
    { id: 'playground', color: 'from-purple-500 to-pink-500', path: '/games/music/playground' }
  ];

  return (
    <AcademicLessonMenu
      subjectName="Müzik"
      subjectIcon="🎵"
      bgGradient="from-fuchsia-900 via-fuchsia-700 to-pink-600"
      activityPaths={activityPaths}
    />
  );
};

export default MusicMenu;

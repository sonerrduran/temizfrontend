import AcademicLessonMenu from '../components/AcademicLessonMenu';

const SocialStudiesMenu = () => {
  const activityPaths = [
    { id: 'learn', color: 'from-blue-500 to-cyan-500', path: '/lessons/social-studies/learn' },
    { id: 'practice', color: 'from-green-500 to-emerald-500', path: '/lessons/social-studies/practice' },
    { id: 'playground', color: 'from-purple-500 to-pink-500', path: '/games/social-studies/playground' }
  ];

  return (
    <AcademicLessonMenu
      subjectName="Sosyal Bilgiler"
      subjectIcon="🌍"
      bgGradient="from-amber-900 via-amber-700 to-yellow-600"
      activityPaths={activityPaths}
    />
  );
};

export default SocialStudiesMenu;

/**
 * Lesson Routes
 * Ders içerikleri için route tanımları
 */

import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load lesson menus
const AcademicDashboard = lazy(() => import('./AcademicDashboard'));

// Turkish
const TurkishMenu = lazy(() => import('./turkish/TurkishMenu'));
const TurkishLearnMenu = lazy(() => import('./turkish/TurkishLearnMenu'));
const TurkishLearnGrade = lazy(() => import('./turkish/learn/TurkishLearnGrade'));
const TurkishPracticeMenu = lazy(() => import('./turkish/TurkishPracticeMenu'));
const TurkishPracticeTopic = lazy(() => import('./turkish/practice/TurkishPracticeTopic'));
const TurkishGrade1Menu = lazy(() => import('./turkish/grade1/TurkishGrade1Menu'));
const TurkishGrade2Menu = lazy(() => import('../../../../../components/academic/turkish/grade2/TurkishGrade2Menu'));
const TurkishGrade3Menu = lazy(() => import('./turkish/grade3/TurkishGrade3Menu'));
const TurkishGrade4Menu = lazy(() => import('./turkish/grade4/TurkishGrade4Menu'));
const TurkishGrade5Menu = lazy(() => import('./turkish/grade5/TurkishGrade5Menu'));
const TurkishGrade6Menu = lazy(() => import('./turkish/grade6/TurkishGrade6Menu'));
const TurkishGrade7Menu = lazy(() => import('./turkish/grade7/TurkishGrade7Menu'));
const TurkishGrade8Menu = lazy(() => import('./turkish/grade8/TurkishGrade8Menu'));

// Math menus
const MathMenu = lazy(() => import('./math/MathMenu'));
const MathLearnMenu = lazy(() => import('./math/MathLearnMenu'));
const MathLearnGrade = lazy(() => import('./math/learn/MathLearnGrade'));
const MathPracticeMenu = lazy(() => import('./math/MathPracticeMenu'));
const MathPracticeTopic = lazy(() => import('./math/practice/MathPracticeTopic'));

// Other subject menus
const ScienceMenu = lazy(() => import('./science/ScienceMenu'));
const LifeScienceMenu = lazy(() => import('./life-science/LifeScienceMenu'));
const SocialStudiesMenu = lazy(() => import('./social-studies/SocialStudiesMenu'));
const EnglishMenu = lazy(() => import('./english/EnglishMenu'));
const EnglishLearnMenu = lazy(() => import('./english/EnglishLearnMenu'));
const EnglishLearnGrade = lazy(() => import('./english/learn/EnglishLearnGrade'));
const EnglishPracticeMenu = lazy(() => import('./english/EnglishPracticeMenu'));
const EnglishPracticeTopic = lazy(() => import('./english/practice/EnglishPracticeTopic'));
const GermanMenu = lazy(() => import('./german/GermanMenu'));
const ReligionMenu = lazy(() => import('./religion/ReligionMenu'));
const MusicMenu = lazy(() => import('./music/MusicMenu'));
const PhysicalEducationMenu = lazy(() => import('./physical-education/PhysicalEducationMenu'));
const VisualArtsMenu = lazy(() => import('./visual-arts/VisualArtsMenu'));
const HistoryMenu = lazy(() => import('./history/HistoryMenu'));
const InformaticsMenu = lazy(() => import('./informatics/InformaticsMenu'));

export function LessonRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AcademicDashboard />} />
      
      {/* Math Routes */}
      <Route path="/math" element={<MathMenu />} />
      <Route path="/math/learn" element={<MathLearnMenu />} />
      <Route path="/math/learn/:grade" element={<MathLearnGrade />} />
      <Route path="/math/practice" element={<MathPracticeMenu />} />
      <Route path="/math/practice/:topic" element={<MathPracticeTopic />} />
      
      {/* Turkish Routes */}
      <Route path="/turkish" element={<TurkishMenu />} />
      <Route path="/turkish/learn" element={<TurkishLearnMenu />} />
      <Route path="/turkish/learn/:grade" element={<TurkishLearnGrade />} />
      <Route path="/turkish/practice" element={<TurkishPracticeMenu />} />
      <Route path="/turkish/practice/:topic" element={<TurkishPracticeTopic />} />
      <Route path="/turkish/grade1" element={<TurkishGrade1Menu />} />
      <Route path="/turkish/grade2" element={<TurkishGrade2Menu />} />
      <Route path="/turkish/grade3" element={<TurkishGrade3Menu />} />
      <Route path="/turkish/grade4" element={<TurkishGrade4Menu />} />
      <Route path="/turkish/grade5" element={<TurkishGrade5Menu />} />
      <Route path="/turkish/grade6" element={<TurkishGrade6Menu />} />
      <Route path="/turkish/grade7" element={<TurkishGrade7Menu />} />
      <Route path="/turkish/grade8" element={<TurkishGrade8Menu />} />
      
      {/* Science Routes */}
      <Route path="/science" element={<ScienceMenu />} />
      <Route path="/life-science" element={<LifeScienceMenu />} />
      
      {/* Social Studies Routes */}
      <Route path="/social-studies" element={<SocialStudiesMenu />} />
      
      {/* Language Routes */}
      <Route path="/english" element={<EnglishMenu />} />
      <Route path="/english/learn" element={<EnglishLearnMenu />} />
      <Route path="/english/learn/:grade" element={<EnglishLearnGrade />} />
      <Route path="/english/practice" element={<EnglishPracticeMenu />} />
      <Route path="/english/practice/:grade" element={<EnglishPracticeTopic />} />
      <Route path="/german" element={<GermanMenu />} />
      
      {/* Other Subject Routes */}
      <Route path="/religion" element={<ReligionMenu />} />
      <Route path="/music" element={<MusicMenu />} />
      <Route path="/physical-education" element={<PhysicalEducationMenu />} />
      <Route path="/visual-arts" element={<VisualArtsMenu />} />
      <Route path="/history" element={<HistoryMenu />} />
      <Route path="/informatics" element={<InformaticsMenu />} />
      
      <Route path="/*" element={<AcademicDashboard />} />
    </Routes>
  );
}

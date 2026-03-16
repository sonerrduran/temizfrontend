/**
 * Teacher Tools Routes
 * Öğretmen araçları route tanımları
 */

import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const TeacherToolsMenu = lazy(() => import('./TeacherToolsMenu'));
const Whiteboard = lazy(() => import('./Whiteboard'));
const ClassTimer = lazy(() => import('./ClassTimer'));
const RandomStudentPicker = lazy(() => import('./RandomStudentPicker'));
const DiceRoller = lazy(() => import('./DiceRoller'));
const SpinWheel = lazy(() => import('./SpinWheel'));
const GroupMaker = lazy(() => import('./GroupMaker'));
const Scoreboard = lazy(() => import('./Scoreboard'));
const AttendanceTracker = lazy(() => import('./AttendanceTracker'));
const SeatingChart = lazy(() => import('./SeatingChart'));
const QuickPoll = lazy(() => import('./QuickPoll'));
const NoiseMeter = lazy(() => import('./NoiseMeter'));
const BirthdayCalendar = lazy(() => import('./BirthdayCalendar'));
const ClassGoals = lazy(() => import('./ClassGoals'));
const NoticeBulletin = lazy(() => import('./NoticeBulletin'));
const StickyNotes = lazy(() => import('./StickyNotes'));
const WordCloud = lazy(() => import('./WordCloud'));

export function TeacherToolsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TeacherToolsMenu />} />
      <Route path="/whiteboard" element={<Whiteboard />} />
      <Route path="/timer" element={<ClassTimer />} />
      <Route path="/random-picker" element={<RandomStudentPicker />} />
      <Route path="/dice" element={<DiceRoller />} />
      <Route path="/spin-wheel" element={<SpinWheel />} />
      <Route path="/group-maker" element={<GroupMaker />} />
      <Route path="/scoreboard" element={<Scoreboard />} />
      <Route path="/attendance" element={<AttendanceTracker />} />
      <Route path="/seating" element={<SeatingChart />} />
      <Route path="/poll" element={<QuickPoll />} />
      <Route path="/noise-meter" element={<NoiseMeter />} />
      <Route path="/birthday" element={<BirthdayCalendar />} />
      <Route path="/goals" element={<ClassGoals />} />
      <Route path="/bulletin" element={<NoticeBulletin />} />
      <Route path="/sticky-notes" element={<StickyNotes />} />
      <Route path="/word-cloud" element={<WordCloud />} />
    </Routes>
  );
}

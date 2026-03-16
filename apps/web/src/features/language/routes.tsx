/**
 * Language Routes
 * Dil gelişimi route tanımları
 */

import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const LanguageMenu = lazy(() => import('./LanguageMenu'));
const DailyVocabulary = lazy(() => import('./DailyVocabulary'));
const LanguageAIQuiz = lazy(() => import('./LanguageAIQuiz'));
const LanguageAntonyms = lazy(() => import('./LanguageAntonyms'));
const LanguageDailyWords = lazy(() => import('./LanguageDailyWords'));
const LanguageIdioms = lazy(() => import('./LanguageIdioms'));
const LanguageMetaphors = lazy(() => import('./LanguageMetaphors'));
const LanguageProverbs = lazy(() => import('./LanguageProverbs'));
const LanguageSim = lazy(() => import('./LanguageSim'));
const LanguageSynonyms = lazy(() => import('./LanguageSynonyms'));
const LanguageWordGame = lazy(() => import('./LanguageWordGame'));

export function LanguageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LanguageMenu />} />
      <Route path="/daily-vocabulary" element={<DailyVocabulary />} />
      <Route path="/ai-quiz" element={<LanguageAIQuiz />} />
      <Route path="/antonyms" element={<LanguageAntonyms />} />
      <Route path="/daily-words" element={<LanguageDailyWords />} />
      <Route path="/idioms" element={<LanguageIdioms />} />
      <Route path="/metaphors" element={<LanguageMetaphors />} />
      <Route path="/proverbs" element={<LanguageProverbs />} />
      <Route path="/sim" element={<LanguageSim />} />
      <Route path="/synonyms" element={<LanguageSynonyms />} />
      <Route path="/word-game" element={<LanguageWordGame />} />
    </Routes>
  );
}

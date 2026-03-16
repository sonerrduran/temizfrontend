/**
 * Stories Routes
 * Hikayeler route tanımları
 */

import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const StoryBook = lazy(() => import('./StoryBook'));

export function StoriesRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StoryBook />} />
      <Route path="/:storyId" element={<StoryBook />} />
    </Routes>
  );
}

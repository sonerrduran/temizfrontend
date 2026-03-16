import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

// Lazy load components
const TrafficMenu = lazy(() => import('./traffic/TrafficMenu'));
const HygieneMenu = lazy(() => import('./hygiene/HygieneMenu'));
const NutritionMenu = lazy(() => import('./nutrition/NutritionMenu'));
const EnvironmentMenu = lazy(() => import('./environment/EnvironmentMenu'));
const FinancialMenu = lazy(() => import('./financial/FinancialMenu'));
const FirstAidMenu = lazy(() => import('./first-aid/FirstAidMenu'));
const SocialMenu = lazy(() => import('./social/SocialMenu'));
const DigitalMenu = lazy(() => import('./digital/DigitalMenu'));
const DigitalSecurityMenu = lazy(() => import('./digital-security/DigitalSecurityMenu'));
const DigitalHealthMenu = lazy(() => import('./digital-health/DigitalHealthMenu'));
const LawMenu = lazy(() => import('./law/LawMenu'));

export function LifeSkillsRoutes() {
  return (
    <Routes>
      <Route path="/traffic" element={<TrafficMenu />} />
      <Route path="/hygiene" element={<HygieneMenu />} />
      <Route path="/nutrition" element={<NutritionMenu />} />
      <Route path="/environment" element={<EnvironmentMenu />} />
      <Route path="/financial" element={<FinancialMenu />} />
      <Route path="/first-aid" element={<FirstAidMenu />} />
      <Route path="/social" element={<SocialMenu />} />
      <Route path="/digital" element={<DigitalMenu />} />
      <Route path="/digital-security" element={<DigitalSecurityMenu />} />
      <Route path="/digital-health" element={<DigitalHealthMenu />} />
      <Route path="/law" element={<LawMenu />} />
    </Routes>
  );
}

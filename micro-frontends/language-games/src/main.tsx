import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import LanguageGamesRouter from './LanguageGamesRouter';

// Standalone development mode
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageGamesRouter />
    </BrowserRouter>
  </React.StrictMode>
);

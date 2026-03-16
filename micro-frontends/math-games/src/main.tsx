import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import MathGamesRouter from './MathGamesRouter';

// Standalone development mode
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MathGamesRouter />
    </BrowserRouter>
  </React.StrictMode>
);

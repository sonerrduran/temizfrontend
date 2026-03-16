import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import LogicGamesRouter from './LogicGamesRouter';

// Standalone development mode
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LogicGamesRouter />
    </BrowserRouter>
  </React.StrictMode>
);

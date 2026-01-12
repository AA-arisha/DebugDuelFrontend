import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// IMPORTANT: CSS LOAD ORDER MATTERS!
// 1. Global resets first
import './index.css';

// 2. Theme variables and base styles
import './styles/theme.css';

// 3. Component-specific styles
import './styles/components.css';

import App from './App.jsx';
import '@fontsource/orbitron/500.css';
import '@fontsource/orbitron/700.css';
import '@fontsource/fira-code/400.css';
import '@fontsource/fira-code/600.css';
import '@fontsource/audiowide/400.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

import { createRoot } from 'react-dom/client';

import 'younger/styles/index.css';
import App from './App';
import React from 'react';

const container = document.getElementById('root');
createRoot(container!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
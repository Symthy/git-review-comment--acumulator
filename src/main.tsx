import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.js';
import './index.css';

if (import.meta.env.DEV) {
  const { worker } = require('./mocks/browser');
  worker.start().then(() => {
    worker.printHandlers();
  });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

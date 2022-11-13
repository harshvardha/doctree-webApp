import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DoctreeProvider } from './context/doctreeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DoctreeProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </DoctreeProvider>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { KeycloakProvider } from './contexts/KeycloakProvider';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <KeycloakProvider>
    <App />
  </KeycloakProvider>
);

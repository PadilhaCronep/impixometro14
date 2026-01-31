
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './ErrorBoundary';

declare global {
  interface Window {
    __APP_MOUNTED__?: boolean;
  }
}

const rootElement = document.getElementById('root');
const showFatalError = (message: string) => {
  if (!rootElement) {
    document.body.innerHTML = `<div style="background:#000;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;">
      <div><h1 style="font-size:20px;margin-bottom:8px;">Falha ao iniciar</h1><p style="font-size:14px;opacity:0.8;">${message}</p></div>
    </div>`;
    return;
  }
  rootElement.innerHTML = `
    <div id="app-fatal-error" style="background:#000;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;">
      <div>
        <h1 style="font-size:20px;margin-bottom:8px;">Falha ao iniciar</h1>
        <p style="font-size:14px;opacity:0.8;">${message}</p>
      </div>
    </div>
  `;
};

if (!rootElement) {
  showFatalError('Elemento #root não encontrado no HTML.');
} else {
  window.addEventListener('error', (event) => {
    showFatalError(event.message || 'Erro de execução detectado.');
  });

  window.addEventListener('unhandledrejection', () => {
    showFatalError('Promessa rejeitada sem tratamento. Verifique o console.');
  });

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );

  window.__APP_MOUNTED__ = true;
}

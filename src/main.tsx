import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

// ── ANALYTICS INIT ──────────────────────────────────
import ReactGA from 'react-ga4';
import ReactPixel from 'react-facebook-pixel';
 
ReactGA.initialize('G-WHDNY2WK54');
 
ReactPixel.init('1191321999595048', {}, { autoConfig: true, debug: false });
ReactPixel.pageView();
// ─────────────────────────────────────────────────────


const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  console.error('Root element not found');
  document.body.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif;">
      <div style="text-align: center;">
        <h1>Believers Consultancy</h1>
        <p>Loading application...</p>
        <p>If this message persists, please refresh the page.</p>
      </div>
    </div>
  `;
}
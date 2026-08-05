import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import App from './App.tsx';
import './index.css';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={({error, componentStack, resetError}) => (
      <div style={{ padding: '20px' }}>
        <h2>An error occurred.</h2>
        <button onClick={() => Sentry.showReportDialog({ eventId: Sentry.lastEventId() })}>Report feedback</button>
      </div>
    )}>
      <App />
    </Sentry.ErrorBoundary>
  </StrictMode>
);

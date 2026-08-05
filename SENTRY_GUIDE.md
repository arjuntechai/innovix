# Sentry Setup Guide

This guide outlines the steps to set up and integrate Sentry into the `innovix` project for error tracking and user feedback.

## 1. Account & Project Setup
1. **Sign Up / Log In**: Go to [sentry.io](https://sentry.io/) and create an account or log in.
2. **Create a Project**: Create a new project within your Sentry organization. Select the appropriate platform (e.g., React or generic Browser JavaScript).
3. **Get DSN**: Note down the Data Source Name (DSN) provided after project creation. This is required to connect the app to Sentry.

## 2. Installation
Install the Sentry SDK via npm:
```bash
npm install @sentry/react @sentry/tracing
```
*(Adjust package names based on the specific framework used in the project, e.g., `@sentry/nextjs` or `@sentry/browser`)*

## 3. Initialization
In your application's main entry point (e.g., `src/main.tsx` or `src/App.tsx`), import and initialize Sentry:

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN_HERE",
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
```
*Note: It's highly recommended to store the DSN in an environment variable (e.g., `VITE_SENTRY_DSN` or `REACT_APP_SENTRY_DSN`).*

## 4. Verification
1. To test the integration, trigger an intentional error in a component:
   ```typescript
   <button onClick={() => { throw new Error("Sentry Test Error"); }}>Break the world</button>
   ```
2. Verify that the error appears in the Sentry dashboard.

## 5. User Feedback Loops
Sentry provides a user feedback widget that can be triggered on errors.
To set this up, you can catch errors using Sentry's Error Boundary and show a feedback dialog:
```typescript
import * as Sentry from "@sentry/react";

// Wrap your app with the ErrorBoundary
<Sentry.ErrorBoundary fallback={({error, componentStack, resetError}) => (
  <React.Fragment>
    <div>An error occurred.</div>
    <button onClick={() => Sentry.showReportDialog({ eventId: Sentry.lastEventId() })}>Report feedback</button>
  </React.Fragment>
)}>
  <App />
</Sentry.ErrorBoundary>
```

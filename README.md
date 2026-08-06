# Innovix Designs - Agency Dashboard

Welcome to the **Innovix Designs** repository. This project is a comprehensive backend and administrative dashboard built for our web design agency application, designed to help track clients and projects efficiently.

## 🚀 Tech Stack

This project is built using a modern, scalable web stack:

**Frontend**
*   **[React 18](https://react.dev/)**: Core UI library.
*   **[Vite](https://vitejs.dev/)**: Lightning-fast build tool and development server.
*   **[TypeScript](https://www.typescriptlang.org/)**: Static typing for robust code.
*   **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development.
*   **[Framer Motion](https://www.framer.com/motion/)**: For smooth, declarative animations and transitions.
*   **[React Router](https://reactrouter.com/)**: Client-side routing.
*   **[Lucide React](https://lucide.dev/)**: Beautiful and consistent iconography.

**Backend & Services**
*   **[Supabase](https://supabase.com/)**: Open-source Firebase alternative providing our database, authentication, and backend services.
*   **[Sentry](https://sentry.io/)**: Real-time error tracking and performance monitoring.
*   **[Vercel Analytics](https://vercel.com/analytics)**: Web analytics and traffic insights.

## 🛠️ Getting Started

### Prerequisites

*   Node.js (v18+ recommended)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd innovix
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up your environment variables (refer to `.env.example` if available, and ensure you have your Supabase and Sentry keys configured).

4.  Start the development server:
    ```bash
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:5173`.

## 📜 Scripts

*   `npm run dev` - Starts the development server.
*   `npm run build` - Builds the app for production.
*   `npm run preview` - Previews the production build locally.
*   `npm run lint` - Runs ESLint to check for code quality issues.
*   `npm run typecheck` - Runs TypeScript compiler checks without emitting files.

## 📁 Project Structure

*   `/src`: Contains the main application source code (components, pages, utilities, etc.).
*   `/public`: Static assets.
*   `supabase_schema.sql`: Contains the database schema definitions for Supabase.

*For more details on error tracking, please refer to the `SENTRY_GUIDE.md`.*

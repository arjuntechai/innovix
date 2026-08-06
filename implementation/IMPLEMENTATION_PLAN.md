# Supabase Backend & Admin Dashboard Implementation Plan

This plan details the phased approach for adding a full Supabase backend and an admin-only dashboard to the Innovix webapp.

## Open Questions Resolved
- **User Profiles:** Create manually for now in Supabase.
- **Settings Scope:** Split it: a small settings table for agency profile, but keep branding in code.
- **Routing Structure:** Use `/dashboard/*`.

## Proposed Changes

### Phase 1: Setup and Database Schema
- **Supabase Initialization:** Create Supabase project, get connection keys, and install `@supabase/supabase-js`.
- **Database Tables & RLS:** 
  - Define schema for `users/profiles`, `leads`, `clients`, `projects`, and `invoices`.
  - Add Row Level Security (RLS) policies allowing full CRUD for `admin` roles, preparing for future `client` roles.
- **Storage Buckets:** Create a secure bucket for project files/deliverables.

### Phase 2: Authentication & Routing Setup
- **Auth Implementation:** Set up Supabase Authentication (email/password).
- **Protected Routes:** Implement a route guard that checks for authentication and the "admin" role before rendering dashboard pages.
- **State Management:** Set up a lightweight context or state store for the current user and their permissions.

### Phase 3: Dashboard Layout & Branding
- **UI Architecture:** Scaffold the dashboard layout using Shadcn UI principles, incorporating existing branding:
  - Background: `#0A0A0A`
  - Text: `#E8E8E8`
  - Accent: `#9CAF88`
  - Fonts: Instrument Serif (Display) & Inter (Sans)
- **Navigation:** Build the sidebar/navbar with links to Overview, Leads, Clients, Projects, Invoices, and Settings.
- **Toast Notifications:** Integrate a toast notification system (top-left positioning) for all CRUD operations.

### Phase 4: Leads & Clients Management
- **Leads:**
  - Build `List` page and `Detail` page (using slugs).
  - Implement "Convert to Client" action which transitions data to the `clients` table.
- **Clients:**
  - Build `List` page and `Detail` page (using slugs).
  - Show associated projects and invoices within the client detail view.

### Phase 5: Projects & Deliverables
- **Projects:**
  - Build `List` and `Detail` pages.
  - Implement the stage pipeline (brief → design → build → review → deployed → delivered).
- **Files/Deliverables:**
  - Build a file upload interface in the Project Detail page.
  - Wire up uploads and deletions with the Supabase Storage bucket.

### Phase 6: Invoices & Settings
- **Invoices:**
  - Build `List` and `Detail` views.
  - Design the database schema so Stripe fields can be easily added later.
  - Implement "Mark as Paid" toggle and dashboard widgets for outstanding totals.
- **Settings:**
  - Build the settings layout for agency profile and branding updates.

## Verification Plan

### Manual Verification
- Test Authentication flow: login, logout, and route protection.
- Test full CRUD lifecycle: Create a lead, convert to client, create a project, move through stages, attach a file, and generate/pay an invoice.
- Verify RLS policies block unauthorized access by simulating a non-admin session.
- Ensure styling and branding remain perfectly aligned with the landing page design.

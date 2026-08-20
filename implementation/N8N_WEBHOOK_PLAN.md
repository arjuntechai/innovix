# N8N Webhook Integration Plan

## Goal
Make the "Let's start the conversation" modal functional by sending submissions to an n8n webhook. 
We will use a Vercel serverless function (`/api/webhook.ts`) to avoid CORS and keep the webhook URL secret as a server-side environment variable (`N8N_REVIEW_WEBHOOK_URL`).
We will also add a required GDPR checkbox to the form.

## Proposed Changes

### 1. `api/lead-review.ts`
- Create a Vercel serverless function at this path.
- Receive POST requests from the form.
- Read `process.env.N8N_REVIEW_WEBHOOK_URL`.
- Forward the following JSON payload to n8n:
  - `full_name`
  - `business_name`
  - `website_url`
  - `email`
  - `main_goal` (mapped from message)
  - `source: "website_review_request"`
  - `submitted_at`

### 2. `src/components/LeadModal.tsx`
- Add GDPR checkbox state.
- Add checkbox UI above the "Send My Request" button.
- Checkbox text: "I agree to Innovix Designs storing my details to respond to my enquiry. See our [Privacy Policy](/privacy)."
- Add validation: GDPR checkbox must be checked.
- Show `react-hot-toast` error message if submission fails.
- Disable button and show "Sending..." during submission.

### 3. `src/lib/submitLead.ts`
- Replace simulated delay with actual `fetch` request to `/api/lead-review`.
- Format payload to match the Vercel function requirements.
- Throw error on failure so the component can display the toast.

## Constraints Respected
- No visual changes other than the GDPR checkbox.
- No Supabase or database integrations.
- Webhook URL kept strictly server-side.
- Local testing assumes `vercel dev` is used (no mocking of the `/api` route).

export type LeadSource = 'review-request' | 'checklist';

export interface LeadPayload {
  source: LeadSource;
  fullName: string;
  email: string;
  businessName?: string;
  websiteUrl?: string;
  message?: string;
  // Honeypot — should always be empty for real submissions
  company_website?: string;
}

// TODO: replace the simulated delay with a POST to a form service
// (e.g. Formspree/Web3Forms endpoint). Delivers to hello@innovixdesigns.com.
// Nothing else in the app needs to change.
export async function submitLead(payload: LeadPayload): Promise<void> {
  // Simulate network latency so the UI can show its sending state.
  await new Promise((resolve) => setTimeout(resolve, 900));
  console.log('[submitLead] payload:', payload);
}

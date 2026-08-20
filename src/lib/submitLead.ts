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

export async function submitLead(payload: LeadPayload): Promise<void> {
  // Map fields to match the webhook requirements
  const data = {
    source: payload.source === 'review-request' ? 'website_review_request' : payload.source,
    full_name: payload.fullName,
    email: payload.email,
    business_name: payload.businessName,
    website_url: payload.websiteUrl,
    main_goal: payload.message,
    submitted_at: new Date().toISOString(),
  };

  const response = await fetch('/api/lead-review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[submitLead] failed:', response.status, errorText);
    throw new Error('Failed to submit request');
  }

  console.log('[submitLead] success');
}

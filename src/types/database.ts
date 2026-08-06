export type ProjectStage = 'brief' | 'design' | 'build' | 'review' | 'deployed' | 'delivered';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'converted' | 'lost';
export type InvoiceStatus = 'unpaid' | 'paid' | 'overdue';

export interface Lead {
  id: string;
  name: string;
  email: string | null;
  company: string | null;
  source: string | null;
  status: LeadStatus;
  notes: string | null;
  created_at: string;
}

export interface Client {
  id: string;
  lead_id: string | null;
  slug: string;
  name: string;
  email: string | null;
  company: string | null;
  phone: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  slug: string;
  name: string;
  stage: ProjectStage;
  status: string;
  budget: number | null;
  created_at: string;
}

export interface Invoice {
  id: string;
  client_id: string;
  project_id: string | null;
  invoice_number: string;
  amount: number;
  status: InvoiceStatus;
  due_date: string | null;
  stripe_payment_intent_id: string | null;
  stripe_customer_id: string | null;
  created_at: string;
}

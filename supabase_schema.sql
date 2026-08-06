-- Supabase Schema for Innovix Agency Dashboard
-- Run this script in your Supabase SQL Editor.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Custom Types
CREATE TYPE project_stage AS ENUM ('brief', 'design', 'build', 'review', 'deployed', 'delivered');
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'proposal', 'converted', 'lost');
CREATE TYPE invoice_status AS ENUM ('unpaid', 'paid', 'overdue');

-- 2. Tables

-- User Profiles (Linked to auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'client', -- 'admin' or 'client'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leads
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT,
    company TEXT,
    source TEXT,
    status lead_status DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clients
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL, -- Optional tracking
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    company TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    stage project_stage DEFAULT 'brief',
    status TEXT DEFAULT 'active', -- active, on-hold, completed
    budget DECIMAL(12, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Invoices
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    invoice_number TEXT UNIQUE NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    status invoice_status DEFAULT 'unpaid',
    due_date DATE,
    stripe_payment_intent_id TEXT, -- For future Stripe integration
    stripe_customer_id TEXT,       -- For future Stripe integration
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Settings (Agency Profile)
CREATE TABLE agency_settings (
    id INT PRIMARY KEY DEFAULT 1, -- Single row
    agency_name TEXT NOT NULL DEFAULT 'Innovix Designs',
    contact_email TEXT,
    phone TEXT,
    address TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT single_row CHECK (id = 1)
);

-- Initialize the single settings row
INSERT INTO agency_settings (id, agency_name) VALUES (1, 'Innovix Designs') ON CONFLICT DO NOTHING;

-- 3. Row Level Security (RLS)

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_settings ENABLE ROW LEVEL SECURITY;

-- Create an admin check function to easily reuse in policies
CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Profiles Policies
CREATE POLICY "Admins can do everything on profiles" ON profiles FOR ALL USING (is_admin());
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);

-- Leads, Clients, Projects, Invoices, Settings Policies (Admin Only for now)
CREATE POLICY "Admins full access on leads" ON leads FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on clients" ON clients FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on projects" ON projects FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on invoices" ON invoices FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on settings" ON agency_settings FOR ALL USING (is_admin());

-- Setup a trigger to automatically create a profile when a new auth user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  -- Since we create manually for now, we'll default new users to admin if you are doing this manually, 
  -- but generally it's better to default to 'client' and manually update the role to 'admin'.
  VALUES (new.id, new.email, 'admin'); 
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. Storage Bucket Setup (Files)
-- Important: You might need to run this part or create it via the Supabase Dashboard UI.
INSERT INTO storage.buckets (id, name, public) VALUES ('project_files', 'project_files', false) ON CONFLICT DO NOTHING;

-- Storage Policies for Admin (requires joining auth.users with profiles, but storage policies use a different syntax)
-- Easiest way in pure SQL for storage RLS:
CREATE POLICY "Admins can do everything in project files bucket"
ON storage.objects FOR ALL
USING ( 
  bucket_id = 'project_files' 
  AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin' 
);

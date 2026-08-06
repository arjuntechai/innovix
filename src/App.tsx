import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Pages
import { LandingPage } from '@/pages/LandingPage';
import { Login } from '@/pages/auth/Login';
import { DashboardLayout } from '@/pages/dashboard/DashboardLayout';
import { Leads } from '@/pages/dashboard/Leads';
import { LeadDetail } from '@/pages/dashboard/LeadDetail';

// Placeholder for dashboard overview
function DashboardOverview() {
  return (
    <div>
      <h1 className="text-3xl font-display mb-6 text-[#E8E8E8]">Overview</h1>
      <p className="text-gray-400">Dashboard statistics will go here.</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="leads" element={<Leads />} />
              <Route path="leads/:id" element={<LeadDetail />} />
              {/* Other dashboard routes will go here */}
            </Route>
          </Route>
        </Routes>
        <Analytics />
        <Toaster position="top-left" toastOptions={{ 
          style: { background: '#111', color: '#E8E8E8', border: '1px solid #333' } 
        }} />
      </BrowserRouter>
    </AuthProvider>
  );
}

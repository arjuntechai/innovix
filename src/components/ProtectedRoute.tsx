import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function ProtectedRoute() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-[#E8E8E8]">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (profile?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-[#E8E8E8]">
        <h1 className="text-2xl font-display mb-4">Access Denied</h1>
        <p className="text-gray-400">You must be an admin to view this page.</p>
      </div>
    );
  }

  return <Outlet />;
}

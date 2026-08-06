import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FolderKanban, 
  Receipt, 
  Settings,
  LogOut
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Leads', href: '/dashboard/leads', icon: Users },
  { name: 'Clients', href: '/dashboard/clients', icon: Briefcase },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
  { name: 'Invoices', href: '/dashboard/invoices', icon: Receipt },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function DashboardLayout() {
  const { signOut } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#222] bg-[#111] hidden md:flex md:flex-col">
        <div className="h-16 flex items-center px-6 border-b border-[#222]">
          <Link to="/" className="text-2xl font-display text-accent">Innovix</Link>
          <span className="ml-2 text-xs text-gray-500 uppercase tracking-widest pt-1">Admin</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || 
                             (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-accent/10 text-accent' 
                    : 'text-gray-400 hover:bg-[#222] hover:text-[#E8E8E8]'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-accent' : 'text-gray-500'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#222]">
          <button
            onClick={signOut}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-400 rounded-md hover:bg-[#222] hover:text-red-400 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-500" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header can go here */}
        <div className="flex-1 overflow-y-auto bg-[#0A0A0A] p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

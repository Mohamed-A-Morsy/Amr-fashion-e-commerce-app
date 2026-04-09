'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/lib/context/AdminAuthContext';
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Grid3x3,
  User,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const adminNavItems = [
  { icon: Home, label: 'Dashboard', href: '/admin' },
  { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
  { icon: Package, label: 'Products', href: '/admin/products' },
  { icon: Grid3x3, label: 'Categories', href: '/admin/categories' },
  { icon: Users, label: 'Customers', href: '/admin/customers' },
  { icon: TrendingUp, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { isAdminLoggedIn, adminEmail, adminLogout } = useAdminAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!isAdminLoggedIn) {
    router.push('/admin-login');
    return null;
  }

  const handleLogout = () => {
    adminLogout();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-foreground text-background transition-all duration-300 fixed h-screen z-40 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-foreground/10 flex items-center justify-between">
          {isSidebarOpen && <span className="font-bold text-lg">Admin</span>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-foreground/10 rounded transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-foreground/10 transition-colors group"
              title={item.label}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-foreground/10 space-y-2">
          {isSidebarOpen && adminEmail && (
            <p className="text-xs text-foreground/60 truncate px-2">{adminEmail}</p>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-600/20 text-red-400 transition-colors justify-center"
          >
            <LogOut className="w-4 h-4" />
            {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${isSidebarOpen ? 'ml-64' : 'ml-20'} flex-1 flex flex-col transition-all duration-300`}>
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-6 py-4 sticky top-0 z-30 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg md:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  ShoppingCart, 
  Users, 
  FolderOpen,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/pages/admin/home', icon: LayoutDashboard },
  { name: 'Books', href: '/pages/admin/books', icon: BookOpen },
  { name: 'Orders', href: '/pages/admin/orders', icon: ShoppingCart },
  { name: 'Users', href: '/pages/admin/users', icon: Users },
  { name: 'Categories', href: '/pages/admin/categories', icon: FolderOpen },
  { name: 'Settings', href: '/pages/admin/settings', icon: Settings },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    document.cookie = 'authToken=; path=/; max-age=0';
    window.location.href = '/';
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass-panel border-r border-white/10 flex flex-col" style={{ zIndex: 40 }}>
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-white/10">
        <div className="p-2 rounded-lg bg-indigo-500/20 backdrop-blur-xl">
          <BookOpen className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">MyBooks</h1>
          <p className="text-xs text-neutral-400">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all group ${
                isActive
                  ? 'bg-indigo-500/20 text-white'
                  : 'text-neutral-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </div>
              {isActive && (
                <ChevronRight className="w-4 h-4 text-indigo-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

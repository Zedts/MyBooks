'use client';

import React, { useMemo } from 'react';
import { Search, Bell, User } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  breadcrumb?: string[];
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, breadcrumb = [] }) => {
  // Get username from localStorage - memoized to avoid recalculation
  const username = useMemo(() => {
    if (typeof window === 'undefined') return 'Admin';
    
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        return user.username || user.full_name || 'Admin';
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error);
    }
    return 'Admin';
  }, []);

  return (
    <header className="glass-panel border-b border-white/10 px-8 py-4 flex items-center justify-between">
      {/* Left: Breadcrumb & Title */}
      <div>
        {breadcrumb.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-neutral-400 mb-1">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span>/</span>}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </div>
        )}
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>

      {/* Right: Search, Notifications, Profile */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
          <Bell className="w-5 h-5 text-neutral-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
            <User className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-sm font-medium text-white hidden lg:block">{username}</span>
        </div>
      </div>
    </header>
  );
};

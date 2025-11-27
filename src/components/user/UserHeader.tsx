'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Search, ShoppingCart, User, Settings, LogOut, Menu, X } from 'lucide-react';
import { Input } from '../ui/Input';
import { useAuth } from '@/src/hooks/useAuth';

interface UserHeaderProps {
  cartItemsCount: number;
  onSearch: (query: string) => void;
  searchQuery?: string;
}

export const UserHeader: React.FC<UserHeaderProps> = ({
  cartItemsCount,
  onSearch,
  searchQuery = '',
}) => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearchQuery);
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full border-b border-white/5 bg-neutral-950/70 backdrop-blur-xl" style={{ zIndex: 50 }}>
      <div className="flex h-16 max-w-7xl mr-auto ml-auto pr-6 pl-6 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/pages/user/home" className="flex items-center gap-2 group shrink-0">
          <BookOpen className="w-6 h-6 text-white group-hover:text-indigo-400 transition-colors" />
          <span className="text-xl font-bold text-white font-mono">MyBooks</span>
        </Link>

        {/* Search Bar (Desktop) */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative">
          <Input
            type="text"
            placeholder="Search books by title, author, or publisher..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            className="w-full pr-10"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Cart Icon */}
          <Link
            href="/pages/user/cart"
            className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-white"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-indigo-500 text-white text-xs font-bold rounded-full">
                {cartItemsCount > 9 ? '9+' : cartItemsCount}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-white"
            >
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">{user?.username || 'User'}</span>
            </button>

            {/* Mobile Profile Icon */}
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-white"
              aria-label="Profile"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 glass-panel rounded-lg shadow-xl overflow-hidden z-50">
                  <div className="p-4 border-b border-white/10">
                    <p className="text-sm font-medium text-white">{user?.full_name || user?.username}</p>
                    <p className="text-xs text-neutral-400">{user?.email}</p>
                  </div>
                  <div className="py-2">
                    <Link
                      href="/pages/user/account"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 transition-colors text-neutral-300 hover:text-white"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">Account</span>
                    </Link>
                    <Link
                      href="/pages/user/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 transition-colors text-neutral-300 hover:text-white"
                    >
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/5 transition-colors text-red-400 hover:text-red-300"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-white"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-neutral-950/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4 relative">
              <Input
                type="text"
                placeholder="Search books..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="w-full pr-10"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

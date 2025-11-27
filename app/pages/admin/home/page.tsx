'use client';

import React from 'react';
import { AdminSidebar } from '../../../../src/components/admin/AdminSidebar';
import { AdminHeader } from '../../../../src/components/admin/AdminHeader';
import { StatsCard } from '../../../../src/components/admin/StatsCard';
import { BookOpen, ShoppingCart, Users, DollarSign, TrendingUp, Package } from 'lucide-react';

export default function AdminHome() {
  // Mock data - will be replaced with real API calls later
  const stats = {
    totalBooks: 8,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  };

  const recentOrders: unknown[] = [
    // Mock data - empty for now
  ];

  return (
    <div className="relative antialiased selection:bg-white selection:text-black overflow-x-hidden text-neutral-200 bg-neutral-950 min-h-screen">
      {/* Background Image */}
      <div
        className="fixed top-0 left-0 w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/9ebb2efd-59e4-4b29-b860-3694c884d382_3840w.webp")',
          filter: 'blur(40px)',
          maskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)',
          zIndex: 0,
        }}
      />

      {/* Ambient Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-fuchsia-900/10 rounded-full blur-[120px] opacity-40" />
      </div>

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="ml-64 relative" style={{ zIndex: 10 }}>
        {/* Header */}
        <AdminHeader title="Dashboard" breadcrumb={['Admin', 'Dashboard']} />

        {/* Content Area */}
        <main className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Books"
              value={stats.totalBooks}
              icon={BookOpen}
              trend={{ value: '0% from last month', isPositive: true }}
              color="indigo"
            />
            <StatsCard
              title="Total Orders"
              value={stats.totalOrders}
              icon={ShoppingCart}
              trend={{ value: '0% from last month', isPositive: false }}
              color="emerald"
            />
            <StatsCard
              title="Total Users"
              value={stats.totalUsers}
              icon={Users}
              trend={{ value: '0% from last month', isPositive: true }}
              color="orange"
            />
            <StatsCard
              title="Total Revenue"
              value={`Rp ${stats.totalRevenue.toLocaleString('id-ID')}`}
              icon={DollarSign}
              trend={{ value: '0% from last month', isPositive: true }}
              color="pink"
            />
          </div>

          {/* Quick Actions */}
          <div className="glass-panel border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-white transition-all border border-indigo-500/30">
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">Add New Book</span>
              </button>
              <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-white transition-all border border-emerald-500/30">
                <Package className="w-5 h-5" />
                <span className="font-medium">Manage Orders</span>
              </button>
              <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-white transition-all border border-orange-500/30">
                <Users className="w-5 h-5" />
                <span className="font-medium">View Users</span>
              </button>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="glass-panel border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-emerald-400" />
              Recent Orders
            </h2>
            {recentOrders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                <p className="text-neutral-400">No orders yet</p>
                <p className="text-sm text-neutral-500 mt-1">Orders will appear here once users start purchasing books</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Order ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Books</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Total</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Orders will be mapped here */}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="glass-panel border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2"></div>
                <div className="flex-1">
                  <p className="text-white">Database seeded successfully</p>
                  <p className="text-sm text-neutral-400">8 books, 3 categories added</p>
                </div>
                <span className="text-sm text-neutral-500">Just now</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2"></div>
                <div className="flex-1">
                  <p className="text-white">Admin panel initialized</p>
                  <p className="text-sm text-neutral-400">Template created for future development</p>
                </div>
                <span className="text-sm text-neutral-500">Just now</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

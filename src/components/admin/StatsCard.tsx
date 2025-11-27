'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color: 'indigo' | 'emerald' | 'orange' | 'pink';
}

const colorClasses = {
  indigo: {
    bg: 'bg-indigo-500/20',
    text: 'text-indigo-400',
    border: 'border-indigo-500/30',
  },
  emerald: {
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
  },
  orange: {
    bg: 'bg-orange-500/20',
    text: 'text-orange-400',
    border: 'border-orange-500/30',
  },
  pink: {
    bg: 'bg-pink-500/20',
    text: 'text-pink-400',
    border: 'border-pink-500/30',
  },
};

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color,
}) => {
  const colors = colorClasses[color];

  return (
    <div className={`glass-panel border ${colors.border} p-6 rounded-xl hover:scale-[1.02] transition-transform`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-neutral-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white mb-2">{value}</p>
          {trend && (
            <p
              className={`text-sm font-medium ${
                trend.isPositive ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colors.bg} backdrop-blur-xl`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
      </div>
    </div>
  );
};

'use client';

import { memo, useMemo } from 'react';
import { TrendingUp, Check, Bell } from 'lucide-react';

export const Statistics = memo(({ tasks }) => {
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const high = tasks.filter(t => t.priority === 'high').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, high, completionRate };
  }, [tasks]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Total Tasks</p>
            <p className="text-2xl font-bold mt-1">{stats.total}</p>
          </div>
          <TrendingUp className="w-8 h-8 opacity-80" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Completed</p>
            <p className="text-2xl font-bold mt-1">{stats.completed}</p>
          </div>
          <Check className="w-8 h-8 opacity-80" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">High Priority</p>
            <p className="text-2xl font-bold mt-1">{stats.high}</p>
          </div>
          <Bell className="w-8 h-8 opacity-80" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Completion</p>
            <p className="text-2xl font-bold mt-1">{stats.completionRate}%</p>
          </div>
          <TrendingUp className="w-8 h-8 opacity-80" />
        </div>
      </div>
    </div>
  );
});

Statistics.displayName = 'Statistics';
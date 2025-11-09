'use client';

import { Check, Moon, Sun, Users } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">TaskMaster Pro</h1>
              <p className="text-sm text-gray-500">Advanced Task Management</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm">{user?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
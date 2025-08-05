import React from 'react';
import { Home, Shield, BarChart3, User, Settings, LogOut } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const sidebarItems = [
  { id: 'home', label: 'HOME', icon: Home, path: '/dashboard' },
  { id: 'policies', label: 'POLICIES', icon: Shield, path: '/policies' },
  { id: 'reports', label: 'REPORTS', icon: BarChart3, path: '/reports' },
  { id: 'profile', label: 'PROFILE', icon: User, path: '/profile' },
  { id: 'settings', label: 'SETTINGS', icon: Settings, path: '/settings' },
];

export default function Sidebar({ activeItem = 'policies', onItemClick }: SidebarProps) {
  return (
    <div className="w-60 bg-slate-900 border-r border-slate-800 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">SnapDrop</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onItemClick?.(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs tracking-wide">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800"
          onClick={() => onItemClick?.('logout')}
        >
          <LogOut className="w-5 h-5" />
          <span className="text-xs tracking-wide">LOGOUT</span>
        </Button>
      </div>
    </div>
  );
}

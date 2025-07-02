import React from 'react';
import { LayoutDashboard, Database, Settings, FileText, User, ChevronRight } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'settings', label: 'Setting', icon: Settings },
    { id: 'userlog', label: 'User Log History', icon: FileText },
    { id: 'profile', label: 'Profile Settings', icon: User },
  ];

  return (
    <aside className="w-56 bg-gray-200 min-h-screen">
      <nav className="py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <div key={item.id} className="relative">
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-300 transition-colors ${
                  isActive ? 'bg-gray-300' : ''
                }`}
              >
                <Icon className="w-5 h-5 mr-3 text-gray-700" />
                <span className="text-gray-800 font-medium">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto text-gray-700" />}
              </button>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
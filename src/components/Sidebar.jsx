import React from 'react';
import { LayoutDashboard, Database, Settings, FileText, User, ChevronRight } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'settings', label: 'Setting', icon: Settings },
    { id: 'userlog', label: 'User Log History', icon: FileText },
    { id: 'profile', label: 'Profile Settings', icon: User },
  ];

  const handleItemClick = (itemId) => {
    setActiveTab(itemId);
    if (onClose) onClose(); // Close mobile menu after selection
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 lg:w-56 bg-gray-200 min-h-screen
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <nav className="py-4 pt-20 lg:pt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <div key={item.id} className="relative">
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-300 transition-colors ${
                    isActive ? 'bg-gray-300' : ''
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3 text-gray-700" />
                  <span className="text-gray-800 font-medium text-sm lg:text-base">{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto text-gray-700" />}
                </button>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
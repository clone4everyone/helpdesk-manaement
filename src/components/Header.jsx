import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';

const Header = ({ currentUser, onLogout }) => {
  return (
    <header className="bg-teal-400 text-white px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold italic">Helpdesk</h1>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <button className="bg-black text-white px-3 py-1 rounded text-sm font-semibold">
              BM
            </button>
            <button className="bg-white text-black px-3 py-1 rounded text-sm font-semibold">
              BI
            </button>
          </div>
          <Bell className="w-6 h-6 cursor-pointer" />
          <User className="w-6 h-6 cursor-pointer" />
          <button onClick={onLogout}>
            <LogOut className="w-6 h-6 cursor-pointer" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
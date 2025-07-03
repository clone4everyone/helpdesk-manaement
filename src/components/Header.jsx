import React, { useState } from 'react';
import { Bell, User, LogOut, Menu, X } from 'lucide-react';

const Header = ({ currentUser, onLogout, onMenuToggle, isMobileMenuOpen }) => {
  return (
    <header className="bg-teal-400 text-white px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden text-white hover:text-gray-200"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h1 className="text-xl sm:text-2xl font-bold italic">Helpdesk</h1>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden sm:flex space-x-2">
            <button className="bg-black text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-semibold">
              BM
            </button>
            <button className="bg-white text-black px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-semibold">
              BI
            </button>
          </div>
          <Bell className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
          <User className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
          <button onClick={onLogout}>
            <LogOut className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
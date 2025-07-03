import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Database from './Database';
import Settings from './Settings';
import UserLogHistory from './UserLogHistory';
import ProfileSettings from './ProfileSettings';

const AdminDashboard = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'database':
        return <Database />;
      case 'settings':
        return <Settings />;
      case 'userlog':
        return <UserLogHistory />;
      case 'profile':
        return <ProfileSettings currentUser={currentUser} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-300">
      <Header 
        currentUser={currentUser} 
        onLogout={onLogout}
        onMenuToggle={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <div className="flex relative">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
        />
        <main className="flex-1 p-4 sm:p-6 lg:ml-0">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
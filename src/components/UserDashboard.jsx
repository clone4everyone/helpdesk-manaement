import React, { useState } from 'react';
import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';
import UserDashboardContent from './UserDashboardContent';
import UserMyTickets from './UserMyTickets';
import UserNewTicket from './UserNewTicket';
import ProfileSettings from './ProfileSettings';

const UserDashboard = ({ currentUser, onLogout }) => {
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
        return <UserDashboardContent currentUser={currentUser} />;
      case 'newticket':
        return <UserNewTicket currentUser={currentUser} />;
      case 'mytickets':
        return <UserMyTickets currentUser={currentUser} />;
      case 'profile':
        return <ProfileSettings currentUser={currentUser} />;
      default:
        return <UserDashboardContent currentUser={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-300">
      <UserHeader 
        currentUser={currentUser} 
        onLogout={onLogout}
        onMenuToggle={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <div className="flex relative">
        <UserSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
        />
        <main className="flex-1 p-4 sm:p-6 lg:ml-0">
          {renderContent()}
          <div className="mt-8 bg-teal-400 text-center py-4 text-white font-medium rounded-lg">
            Footer Area
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
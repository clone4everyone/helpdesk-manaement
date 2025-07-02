import React, { useState } from 'react';
import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';
import UserDashboardContent from './UserDashboardContent';
import UserMyTickets from './UserMyTickets';
import UserNewTicket from './UserNewTicket';
import ProfileSettings from './ProfileSettings';

const UserDashboard = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

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
    <>
      <UserHeader currentUser={currentUser} onLogout={onLogout} />
      <div className="flex">
        <UserSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6">
          {renderContent()}
          <div className="mt-8 bg-teal-400 text-center py-4 text-white font-medium">
            Footer Area
          </div>
        </main>
      </div>
    </>
  );
};

export default UserDashboard;
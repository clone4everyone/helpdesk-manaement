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
    <>
      <Header currentUser={currentUser} onLogout={onLogout} />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
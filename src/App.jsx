import React, { useState, useEffect } from 'react';
import AuthPage from './components/AuthPage';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import { updateLogSignOut } from './utils/logger';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [currentLogId, setCurrentLogId] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    const savedRole = localStorage.getItem('userRole');
    const savedLogId = localStorage.getItem('currentLogId');
    
    if (savedUser && savedRole) {
      setCurrentUser(JSON.parse(savedUser));
      setUserRole(savedRole);
      setCurrentLogId(savedLogId);
    }
  }, []);

  const handleLogin = (user, role, logId = null) => {
    setCurrentUser(user);
    setUserRole(role);
    setCurrentLogId(logId);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('userRole', role);
    if (logId) {
      localStorage.setItem('currentLogId', logId);
    }
  };

  const handleLogout = () => {
    // Update sign out time in logs
    if (currentLogId) {
      updateLogSignOut(currentLogId);
    }
    
    setCurrentUser(null);
    setUserRole(null);
    setCurrentLogId(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    localStorage.removeItem('currentLogId');
  };

  if (!currentUser) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-300">
      {userRole === 'admin' ? (
        <AdminDashboard currentUser={currentUser} onLogout={handleLogout} />
      ) : (
        <UserDashboard currentUser={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
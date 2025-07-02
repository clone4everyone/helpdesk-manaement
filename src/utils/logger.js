// Utility functions for logging user activities

export const logActivity = (userId, username, activity, department = '', staffId = '') => {
  const logs = JSON.parse(localStorage.getItem('userLogs') || '[]');
  
  const newLog = {
    id: Date.now().toString(),
    userId,
    username,
    staffId: staffId || userId,
    department,
    activity,
    dateSignIn: new Date().toLocaleDateString('en-GB') + ' / ' + new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    dateSignOut: '', // Will be filled when user logs out
    timestamp: new Date().toISOString()
  };
  
  logs.push(newLog);
  localStorage.setItem('userLogs', JSON.stringify(logs));
  
  return newLog.id;
};

export const updateLogSignOut = (logId) => {
  const logs = JSON.parse(localStorage.getItem('userLogs') || '[]');
  const updatedLogs = logs.map(log => 
    log.id === logId 
      ? { 
          ...log, 
          dateSignOut: new Date().toLocaleDateString('en-GB') + ' / ' + new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' })
        }
      : log
  );
  
  localStorage.setItem('userLogs', JSON.stringify(updatedLogs));
};

export const getUserLogs = () => {
  return JSON.parse(localStorage.getItem('userLogs') || '[]');
};
import React, { useState, useEffect } from 'react';

const UserDashboardContent = ({ currentUser }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Get user's tickets from localStorage
    const allTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const userTickets = allTickets.filter(ticket => ticket.userId === currentUser.id);
    setTickets(userTickets);
  }, [currentUser.id]);

  const getStatusCounts = () => {
    const total = tickets.length;
    const solved = tickets.filter(t => t.status === 'Closed').length;
    const awaiting = tickets.filter(t => t.status === 'On hold').length;
    const inProgress = tickets.filter(t => t.status === 'In Progress').length;

    return { total, solved, awaiting, inProgress };
  };

  const { total, solved, awaiting, inProgress } = getStatusCounts();

  const stats = [
    { title: 'Total Tickets', value: total.toString(), color: 'bg-blue-500', textColor: 'text-blue-900' },
    { title: 'Total Solved', value: solved.toString(), color: 'bg-green-500', textColor: 'text-green-900' },
    { title: 'Total Awaiting Approval', value: awaiting.toString(), color: 'bg-red-500', textColor: 'text-red-900' },
    { title: 'Total in Progress', value: inProgress.toString(), color: 'bg-yellow-400', textColor: 'text-yellow-900' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.color} rounded-lg p-6 text-white`}>
            <h3 className="text-sm font-medium mb-2">{stat.title}</h3>
            <p className={`text-4xl font-bold ${stat.textColor}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboardContent;
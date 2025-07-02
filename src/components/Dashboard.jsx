import React, { useState, useEffect } from 'react';
import { BarChart3, Headphones, Wrench, Star } from 'lucide-react';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Get all tickets from localStorage
    const allTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    setTickets(allTickets);
  }, []);

  const getStats = () => {
    const total = tickets.length;
    const solved = tickets.filter(t => t.status === 'Closed').length;
    const awaiting = tickets.filter(t => t.status === 'On hold').length;
    const inProgress = tickets.filter(t => t.status === 'In Progress').length;

    return { total, solved, awaiting, inProgress };
  };

  const { total, solved, awaiting, inProgress } = getStats();

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

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="bg-teal-400 rounded-lg p-8 flex items-center justify-center">
          <BarChart3 className="w-32 h-32 text-blue-900" />
        </div>

        {/* Right Side Cards */}
        <div className="space-y-4">
          {/* Team Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-teal-400 rounded-lg p-6 text-center">
              <Headphones className="w-12 h-12 mx-auto mb-2 text-black" />
              <p className="text-2xl font-bold text-black">3</p>
              <p className="text-sm text-black font-medium">Technical Supports</p>
            </div>
            <div className="bg-teal-400 rounded-lg p-6 text-center">
              <div className="relative">
                <Headphones className="w-12 h-12 mx-auto mb-2 text-black" />
                <Wrench className="w-4 h-4 absolute top-0 right-6 text-black" />
              </div>
              <p className="text-2xl font-bold text-black">4</p>
              <p className="text-sm text-black font-medium">Operation Team</p>
            </div>
          </div>

          {/* Customer Feedback */}
          <div className="bg-teal-400 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-3">Customer Feedback</h3>
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-8 h-8 text-yellow-400 fill-current" />
              ))}
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
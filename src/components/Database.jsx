import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, ChevronLeft, ChevronRight, Users } from 'lucide-react';

const Database = () => {
  const [activeTab, setActiveTab] = useState('user');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Get users from localStorage
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(allUsers);
  }, []);

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'user', label: 'User' },
    { id: 'operation', label: 'Operation Team' },
    { id: 'technical', label: 'Technical Support' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Database</h1>

      {/* Tab Navigation */}
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-8 py-3 font-medium text-lg ${
              activeTab === tab.id
                ? 'bg-teal-400 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } ${tab.id === 'user' ? 'rounded-l-lg' : ''} ${
              tab.id === 'technical' ? 'rounded-r-lg' : ''
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Find user"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4 pr-10 py-2 border border-gray-300 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-500" />
        </div>
      </div>

      {/* Entries Selector */}
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-gray-700">Show:</span>
        <select className="border border-gray-300 rounded px-2 py-1 bg-white">
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
        <span className="text-gray-700">Entries</span>
      </div>

      {/* Sidebar and Table */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-48 bg-gray-200 rounded-l-lg">
          <div className="p-4">
            <div className="flex items-center space-x-2 text-gray-700 mb-4">
              <Users className="w-5 h-5" />
              <span className="font-medium">User</span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="pl-4">Operation Team</div>
              <div className="pl-4">Technical Support</div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 bg-white rounded-r-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">User ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Username</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Role</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Setting</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.username}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 capitalize">{user.role}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex space-x-2">
                        <button className="text-gray-600 hover:text-gray-800">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-gray-600 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50">
            <span className="text-sm text-gray-700">
              Showing 1 to {filteredUsers.length} of {filteredUsers.length} entries
            </span>
            <div className="flex items-center space-x-2">
              <button className="p-1 rounded hover:bg-gray-200">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1 rounded hover:bg-gray-200">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 bg-white border rounded">1</span>
              <button className="p-1 rounded hover:bg-gray-200">
                <ChevronRight className="w-4 h-4" />
              </button>
              <button className="p-1 rounded hover:bg-gray-200">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Database;
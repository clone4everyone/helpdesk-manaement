import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, Filter, Search } from 'lucide-react';
import {getUserLogs} from '../utils/logger'
const UserLogHistory = () => {
  const [logs, setLogs] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Get logs from localStorage
    const userLogs = getUserLogs();
    setLogs(userLogs);
  }, []);

  // Filter logs based on search term
  const filteredLogs = logs.filter(log => 
    log.staffId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.activity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredLogs.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentLogs = filteredLogs.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">User Log History</h1>
        
        {/* Search Bar - Mobile First */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 text-sm">Show:</span>
          <select 
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-2 py-1 bg-white text-sm"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-gray-700 text-sm">entries</span>
        </div>

        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredLogs.length)} of {filteredLogs.length} entries
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-lg overflow-hidden shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">No.</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date/Sign In Time</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Staff ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Department</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Activity</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date/Sign Out Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentLogs.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No log entries found
                </td>
              </tr>
            ) : (
              currentLogs.map((log, index) => (
                <tr key={log.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 text-sm text-gray-900">{startIndex + index + 1}.</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{formatDate(log.dateSignIn)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{log.staffId}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{log.department}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{log.activity}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{formatDate(log.dateSignOut)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Tablet View */}
      <div className="hidden md:block lg:hidden bg-white rounded-lg overflow-hidden shadow">
        <div className="p-4">
          {currentLogs.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No log entries found
            </div>
          ) : (
            <div className="space-y-4">
              {currentLogs.map((log, index) => (
                <div key={log.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">#{startIndex + index + 1}</span>
                      <div className="text-gray-600">Staff ID: {log.staffId}</div>
                      <div className="text-gray-600">Department: {log.department}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Activity: {log.activity}</div>
                      <div className="text-gray-600">Sign In: {formatDate(log.dateSignIn)}</div>
                      <div className="text-gray-600">Sign Out: {formatDate(log.dateSignOut)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {currentLogs.length === 0 ? (
          <div className="bg-white rounded-lg p-6 text-center text-gray-500">
            No log entries found
          </div>
        ) : (
          currentLogs.map((log, index) => (
            <div key={log.id} className="bg-white rounded-lg p-4 shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-semibold text-gray-800">#{startIndex + index + 1}</span>
                <span className="text-sm text-gray-500">{log.staffId}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Department:</span>
                  <span className="text-gray-800">{log.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Activity:</span>
                  <span className="text-gray-800">{log.activity}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-gray-600">Sign In: {formatDate(log.dateSignIn)}</div>
                  <div className="text-gray-600">Sign Out: {formatDate(log.dateSignOut)}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-4 bg-white rounded-lg shadow">
          <div className="flex items-center space-x-2">
            <button 
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {/* Page Numbers */}
            <div className="flex space-x-1">
              {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                const pageNumber = i + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-3 py-1 rounded text-sm ${
                      currentPage === pageNumber
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>
            
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="text-sm text-gray-600 hidden sm:block">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLogHistory;
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getUserLogs } from '../utils/logger';

const UserLogHistory = () => {
  const [logs, setLogs] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  useEffect(() => {
    // Get logs from localStorage
    const userLogs = getUserLogs();
    setLogs(userLogs);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Log History</h1>

      {/* Entries Selector */}
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-gray-700">Show:</span>
        <select 
          value={entriesPerPage}
          onChange={(e) => setEntriesPerPage(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 bg-white"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
        <span className="text-gray-700">Entries</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg overflow-hidden shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">No.</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date/Sign InTime</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Staff ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Department</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Activity</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date/Sign Out time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No log entries found
                </td>
              </tr>
            ) : (
              logs.slice(0, entriesPerPage).map((log, index) => (
                <tr key={log.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 text-sm text-gray-900">{index + 1}.</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{log.dateSignIn}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{log.staffId}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{log.department}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{log.activity}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{log.dateSignOut}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50">
          <span className="text-sm text-gray-700">
            Showing 1 to {Math.min(entriesPerPage, logs.length)} of {logs.length} entries
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
  );
};

export default UserLogHistory;
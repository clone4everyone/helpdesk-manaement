import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Star, X } from 'lucide-react';
import { logActivity } from '../utils/logger';

const UserMyTickets = ({ currentUser }) => {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Get user's tickets from localStorage
    const allTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const userTickets = allTickets.filter(ticket => ticket.userId === currentUser.id);
    setTickets(userTickets);
  }, [currentUser.id]);

  const handleRating = (ticketId, rating) => {
    // Update ticket rating
    const allTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const updatedTickets = allTickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, rating } : ticket
    );
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));
    
    // Update local state
    const updatedUserTickets = tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, rating } : ticket
    );
    setTickets(updatedUserTickets);

    // Update selected ticket if it's the one being rated
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, rating });
    }

    // Log the rating activity
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
      logActivity(
        currentUser.id, 
        currentUser.username, 
        `Rated Ticket #${ticket.ticketNo} - ${rating} stars`, 
        ticket.department || 'General'
      );
    }
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTicket(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'bg-green-500 text-white';
      case 'On hold':
        return 'bg-blue-800 text-white';
      case 'Closed':
        return 'bg-gray-600 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.ticketNo.includes(searchTerm)
  );

  const renderStars = (ticketId, currentRating, isModal = false) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(ticketId, star)}
            className="focus:outline-none"
          >
            <Star
              className={`${isModal ? 'w-6 h-6' : 'w-4 h-4'} ${
                star <= currentRating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">List of Ticket</h1>

      {/* Search Bar */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Find ticket"
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
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Ticket No.</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Subject</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Support by</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTickets.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No tickets found. Create your first ticket!
                </td>
              </tr>
            ) : (
              filteredTickets.slice(0, entriesPerPage).map((ticket, index) => (
                <tr key={ticket.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleViewTicket(ticket)}
                      className="text-blue-600 underline hover:text-blue-800 font-medium"
                    >
                      {ticket.ticketNo}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{ticket.subject}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="text-center">
                      <div className="underline">{ticket.supportBy}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{ticket.date}</td>
                  <td className="px-6 py-4 text-sm">
                    {renderStars(ticket.id, ticket.rating || 0)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50">
          <span className="text-sm text-gray-700">
            Showing 1 to {Math.min(entriesPerPage, filteredTickets.length)} of {filteredTickets.length} entries
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

      {/* Ticket Details Modal */}
      {showModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Ticket Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ticket No:</label>
                  <p className="text-lg font-semibold text-blue-600">{selectedTicket.ticketNo}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
                  <p className="text-gray-900">{selectedTicket.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                  <p className="text-gray-900">{selectedTicket.userName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dept:</label>
                  <p className="text-gray-900">{selectedTicket.department}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
                <p className="text-gray-900">{selectedTicket.subject}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded border min-h-[100px]">
                  {selectedTicket.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
                  <p className="text-gray-900">{selectedTicket.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type:</label>
                  <p className="text-gray-900">{selectedTicket.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority:</label>
                  <p className="text-gray-900">{selectedTicket.priority}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status:</label>
                  <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(selectedTicket.status)}`}>
                    {selectedTicket.status}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attachment:</label>
                <p className="text-gray-500 italic">No attachments</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rate this ticket:</label>
                {renderStars(selectedTicket.id, selectedTicket.rating || 0, true)}
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={closeModal}
                className="bg-green-500 text-white px-6 py-2 rounded font-semibold hover:bg-green-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMyTickets;
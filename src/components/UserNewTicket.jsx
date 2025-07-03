import React, { useState } from 'react';
import { Paperclip } from 'lucide-react';
import { logActivity } from '../utils/logger';

const UserNewTicket = ({ currentUser }) => {
  const [formData, setFormData] = useState({
    ticketNo: '',
    name: currentUser.username,
    date: new Date().toLocaleDateString('en-GB'),
    department: '',
    subject: '',
    category: '',
    description: '',
    type: '',
    priority: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateTicketNumber = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate ticket number
    const ticketNumber = generateTicketNumber();
    
    // Create new ticket
    const newTicket = {
      id: Date.now().toString(),
      ticketNo: ticketNumber,
      userId: currentUser.id,
      userName: currentUser.username,
      subject: formData.subject,
      status: 'In Progress',
      supportBy: 'Tech support',
      date: formData.date,
      category: formData.category,
      description: formData.description,
      type: formData.type,
      priority: formData.priority,
      department: formData.department,
      rating: 0,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    existingTickets.push(newTicket);
    localStorage.setItem('tickets', JSON.stringify(existingTickets));

    // Log the ticket creation activity
    logActivity(
      currentUser.id, 
      currentUser.username, 
      `Created Ticket #${ticketNumber}`, 
      formData.department
    );

    // Reset form
    setFormData({
      ticketNo: '',
      name: currentUser.username,
      date: new Date().toLocaleDateString('en-GB'),
      department: '',
      subject: '',
      category: '',
      description: '',
      type: '',
      priority: ''
    });

    setIsSubmitting(false);
    alert(`Ticket #${ticketNumber} created successfully!`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Create New Ticket</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ticket No.</label>
              <input
                type="text"
                name="ticketNo"
                value="Auto-generated"
                disabled
                className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                disabled
                className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
                required
              >
                <option value="">Select Category</option>
                <option value="Technical">Technical</option>
                <option value="Software">Software</option>
                <option value="Hardware">Hardware</option>
                <option value="Network">Network</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type:</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
                required
              >
                <option value="">Select Type</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Support">Support</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority:</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
                required
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date:</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                disabled
                className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department:</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
                required
              >
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description:</label>
              <div className="relative">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded resize-none"
                  placeholder="Describe your issue in detail..."
                  required
                />
                <button
                  type="button"
                  className="absolute bottom-4 right-4 bg-teal-400 text-white p-2 rounded"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Subject field spanning full width */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
            placeholder="Brief description of the issue"
            required
          />
        </div>

        {/* reCAPTCHA placeholder */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="border-2 border-gray-300 p-4 bg-gray-100 rounded">
            <div className="flex items-center space-x-3">
              <input type="checkbox" required className="w-6 h-6" />
              <span className="text-gray-700">I'm not a robot</span>
              <div className="text-blue-600 text-sm">reCAPTCHA</div>
            </div>
            <div className="text-xs text-gray-500 mt-1">Privacy - Terms</div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-teal-400 text-white px-8 py-3 rounded font-semibold hover:bg-teal-500 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserNewTicket;
import React, { useState } from 'react';

const ProfileSettings = ({ currentUser }) => {
  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    email: currentUser?.email || '',
    realName: '',
    accessLevel: currentUser?.role || '',
    projectAccessLevel: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    // Update user in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(user => 
      user.id === currentUser.id 
        ? { 
            ...user, 
            username: formData.username,
            email: formData.email,
            ...(formData.newPassword && { password: formData.newPassword })
          }
        : user
    );
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Update current user in localStorage
    const updatedCurrentUser = {
      ...currentUser,
      username: formData.username,
      email: formData.email
    };
    localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
    
    alert('Profile updated successfully!');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">User Profile</h1>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl">
        {/* Header */}
        <div className="bg-teal-400 text-white px-4 sm:px-6 py-4">
          <h2 className="text-lg sm:text-xl font-semibold">Edit Account</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* Username */}
              <div>
                <label className="block bg-gray-400 text-white px-4 py-2 font-medium text-sm sm:text-base">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {/* Current Password */}
              <div>
                <label className="block bg-gray-400 text-white px-4 py-2 font-medium text-sm sm:text-base">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block bg-gray-400 text-white px-4 py-2 font-medium text-sm sm:text-base">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block bg-gray-400 text-white px-4 py-2 font-medium text-sm sm:text-base">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div>
                <label className="block bg-gray-400 text-white px-4 py-2 font-medium text-sm sm:text-base">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {/* Real Name */}
              <div>
                <label className="block bg-gray-400 text-white px-4 py-2 font-medium text-sm sm:text-base">
                  Real Name
                </label>
                <input
                  type="text"
                  name="realName"
                  value={formData.realName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {/* Access Level */}
              <div>
                <label className="block bg-gray-400 text-white px-4 py-2 font-medium text-sm sm:text-base">
                  Access Level
                </label>
                <input
                  type="text"
                  name="accessLevel"
                  value={formData.accessLevel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  disabled
                />
              </div>

              {/* Project Access Level */}
              <div>
                <label className="block bg-gray-400 text-white px-4 py-2 font-medium text-sm sm:text-base">
                  Project Access Level
                </label>
                <input
                  type="text"
                  name="projectAccessLevel"
                  value={formData.projectAccessLevel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full sm:w-auto bg-teal-400 text-white px-8 py-3 rounded font-semibold hover:bg-teal-500 transition-colors"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
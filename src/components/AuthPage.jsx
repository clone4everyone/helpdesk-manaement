import React, { useState } from 'react';
import { logActivity } from '../utils/logger';

const AuthPage = ({ onLogin }) => {
  const [currentView, setCurrentView] = useState('signin');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user exists
    const user = users.find(u => 
      u.username === formData.username && u.password === formData.password
    );

    if (user) {
      // Log the sign in activity
      const logId = logActivity(user.id, user.username, 'Sign In', user.department || 'General');
      onLogin(user, user.role, logId);
    } else {
      // Default admin login for demo
      if (formData.username === 'admin' && formData.password === 'admin') {
        const adminUser = {
          id: 'admin',
          username: 'admin',
          email: 'admin@helpdesk.com',
          role: 'admin'
        };
        // Log the admin sign in
        const logId = logActivity(adminUser.id, adminUser.username, 'Admin Sign In', 'Administration');
        onLogin(adminUser, 'admin', logId);
      } else {
        alert('Invalid credentials');
      }
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if username already exists
    if (users.find(u => u.username === formData.username)) {
      alert('Username already exists');
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      username: formData.username,
      password: formData.password,
      email: formData.email,
      role: 'user'
    };

    // Save to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Log the sign up activity
    logActivity(newUser.id, newUser.username, 'Account Created', 'General');
    
    alert('Account created successfully! Please sign in.');
    setCurrentView('signin');
    setFormData({ username: '', password: '', email: '' });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert('Password reset link sent to your email!');
    setCurrentView('signin');
  };

  if (currentView === 'signup') {
    return (
      <div className="min-h-screen bg-teal-400 flex items-center justify-center px-4">
        <div className="bg-teal-200 p-8 sm:p-12 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-black text-center mb-2">Helpdesk System</h1>
          <p className="text-base sm:text-lg text-black text-center mb-8">Sign up here</p>
          
          <form onSubmit={handleSignUp} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-black bg-white text-black placeholder-gray-600 text-sm sm:text-base"
              required
            />
            
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-black bg-white text-black placeholder-gray-600 text-sm sm:text-base"
              required
            />
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-black bg-white text-black placeholder-gray-600 text-sm sm:text-base"
              required
            />
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Sign Up
            </button>
          </form>
          
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-2 sm:space-y-0">
            <button
              onClick={() => setCurrentView('forgot')}
              className="text-red-600 hover:underline text-sm sm:text-base"
            >
              Forgot password
            </button>
            <button
              onClick={() => setCurrentView('signin')}
              className="text-black hover:underline font-semibold text-sm sm:text-base"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'forgot') {
    return (
      <div className="min-h-screen bg-teal-400 flex items-center justify-center px-4">
        <div className="bg-teal-200 p-8 sm:p-12 rounded-lg shadow-lg max-w-md w-full">
          <p className="text-base sm:text-lg text-black text-center mb-8">
            Don't worry, Enter your email below and we will send you a link to change password.
          </p>
          
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-black bg-white text-black placeholder-gray-600 text-sm sm:text-base"
              required
            />
            
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm sm:text-base"
            >
              Submit
            </button>
            
            <button
              type="button"
              onClick={() => setCurrentView('signin')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Default Sign In view
  return (
    <div className="min-h-screen bg-teal-400 flex items-center justify-center px-4">
      <div className="bg-teal-200 p-8 sm:p-12 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-black text-center mb-2">Helpdesk System</h1>
        <p className="text-base sm:text-lg text-black text-center mb-8">Sign in here</p>
        
        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-black bg-white text-black placeholder-gray-600 text-sm sm:text-base"
            required
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-black bg-white text-black placeholder-gray-600 text-sm sm:text-base"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Sign In
          </button>
        </form>
        
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-2 sm:space-y-0">
          <button
            onClick={() => setCurrentView('forgot')}
            className="text-red-600 hover:underline text-sm sm:text-base"
          >
            Forgot password
          </button>
          <button
            onClick={() => setCurrentView('signup')}
            className="text-black hover:underline font-semibold text-sm sm:text-base"
          >
            Sign Up
          </button>
        </div>
        
        <div className="mt-4 text-center text-xs sm:text-sm text-gray-600">
          <p>Demo: admin/admin (Admin) or create new user account</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
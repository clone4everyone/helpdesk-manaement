import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const Settings = () => {
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    connect: true,
    email: true,
    authorization: true,
    notification: true,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const SettingSection = ({ title, sectionKey, children }) => (
    <div className="mb-3 sm:mb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full bg-teal-400 text-white px-4 sm:px-6 py-3 flex items-center justify-between font-medium text-base sm:text-lg hover:bg-teal-500 transition-colors"
      >
        {title}
        <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${expandedSections[sectionKey] ? 'rotate-180' : ''}`} />
      </button>
      {expandedSections[sectionKey] && (
        <div className="bg-white border-l border-r border-b border-gray-200 rounded-b-lg shadow-sm">
          {children}
        </div>
      )}
    </div>
  );

  const SettingItem = ({ label, hasToggle = false, hasDropdown = false, isEnabled = false }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 last:border-b-0 space-y-3 sm:space-y-0">
      <span className="text-gray-700 font-medium text-sm sm:text-base">{label}</span>
      <div className="flex items-center justify-end sm:justify-center space-x-3 sm:space-x-4">
        {hasToggle && (
          <div className="flex space-x-2">
            <button className="bg-black text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-semibold hover:bg-gray-800 transition-colors">
              BM
            </button>
            <button className="bg-white text-black px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-semibold border border-gray-300 hover:bg-gray-50 transition-colors">
              BI
            </button>
          </div>
        )}
        {hasDropdown && (
          <select className="border border-gray-300 rounded px-2 sm:px-3 py-1 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 min-w-0 w-32 sm:w-auto">
            <option>Select option</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        )}
        {isEnabled && <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" />}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">Settings</h1>
        </div>

        <div className="w-full">
          <SettingSection title="General" sectionKey="general">
            <SettingItem label="Language" hasToggle={true} />
            <SettingItem label="Data Backup" isEnabled={true} />
          </SettingSection>

          <SettingSection title="Connect To" sectionKey="connect">
            <SettingItem label="GoDash" isEnabled={true} />
            <SettingItem label="SuperController" isEnabled={true} />
          </SettingSection>

          <SettingSection title="Email" sectionKey="email">
            <SettingItem label="Enable SMTP" isEnabled={true} />
          </SettingSection>

          <SettingSection title="Authorization" sectionKey="authorization">
            <SettingItem label="Edit authorization" isEnabled={true} />
            <SettingItem label="Authority Level" hasDropdown={true} />
          </SettingSection>

          <SettingSection title="Notification" sectionKey="notification">
            <SettingItem label="Enable Notification" isEnabled={true} />
          </SettingSection>
        </div>
      </div>
    </div>
  );
};

export default Settings;
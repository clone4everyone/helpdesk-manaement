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
    <div className="mb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full bg-teal-400 text-white px-6 py-3 flex items-center justify-between font-medium text-lg"
      >
        {title}
        <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections[sectionKey] ? 'rotate-180' : ''}`} />
      </button>
      {expandedSections[sectionKey] && (
        <div className="bg-white border-l border-r border-b border-gray-200">
          {children}
        </div>
      )}
    </div>
  );

  const SettingItem = ({ label, hasToggle = false, hasDropdown = false, isEnabled = false }) => (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 last:border-b-0">
      <span className="text-gray-700 font-medium">{label}</span>
      <div className="flex items-center space-x-4">
        {hasToggle && (
          <div className="flex space-x-2">
            <button className="bg-black text-white px-3 py-1 rounded text-sm font-semibold">
              BM
            </button>
            <button className="bg-white text-black px-3 py-1 rounded text-sm font-semibold border">
              BI
            </button>
          </div>
        )}
        {hasDropdown && (
          <select className="border border-gray-300 rounded px-3 py-1 bg-white">
            <option>Select option</option>
          </select>
        )}
        {isEnabled && <Check className="w-6 h-6 text-green-600" />}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Setting</h1>

      <div className="max-w-4xl">
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
  );
};

export default Settings;
"use client";
import React from "react";
import { useState, useEffect } from "react";
import { updateUser } from "@/api/user";
import { useAuth } from "@/components/auth/AuthContext";
import ToastManager from "@/components/toast/ToastManager";
import AuthSuspense from "@/components/auth/AuthSuspense";
import { FiUser, FiBell, FiLock, FiMail, FiCalendar, FiTag } from "react-icons/fi";

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const settingsSections: SettingsSection[] = [
  { id: 'profile', title: 'Profile Settings', icon: <FiUser className="w-5 h-5" /> },
  { id: 'notifications', title: 'Notifications', icon: <FiBell className="w-5 h-5" /> },
  { id: 'privacy', title: 'Privacy & Security', icon: <FiLock className="w-5 h-5" /> },
  { id: 'communications', title: 'Communications', icon: <FiMail className="w-5 h-5" /> },
  { id: 'events', title: 'Event Preferences', icon: <FiCalendar className="w-5 h-5" /> },
  { id: 'interests', title: 'Interests & Tags', icon: <FiTag className="w-5 h-5" /> }
];

// TODOLIST:
// - Add a loading spinner while updating the user or other items
// - abstract these update functions, update confirmations, and loading
// - use built in react suspense component
// - input validation
// - duplicate username checking
// - rate limiting

export default function Settings() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    organization: '',
    notifyEmail: true,
    notifyPush: true,
    notifyUpcoming: true,
    notifyChanges: true,
    profilePrivate: false,
    showAttending: true,
    autoAddCalendar: false,
    defaultView: 'list',
    interests: new Set<string>(),
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        username: user.user_name,
        email: user.user_email
      }));
    }
  }, [user]);

  const handleUpdate = async () => {
    if (user) {
      try {
        const response = await updateUser(formData.username, user.user_email);
        if (response.body) {
          ToastManager.addToast("Settings updated successfully", "success", 1000);
        } else {
          ToastManager.addToast("Error updating settings", "error", 1000);
        }
      } catch (error) {
        console.error("Error updating settings:", error);
        ToastManager.addToast("Error updating settings", "error", 1000);
      }
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:ring-maroon focus:border-maroon"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:ring-maroon focus:border-maroon"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:ring-maroon focus:border-maroon"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({...formData, organization: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:ring-maroon focus:border-maroon"
              />
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Email Notifications</label>
              <input
                type="checkbox"
                checked={formData.notifyEmail}
                onChange={(e) => setFormData({...formData, notifyEmail: e.target.checked})}
                className="rounded text-maroon focus:ring-maroon"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Push Notifications</label>
              <input
                type="checkbox"
                checked={formData.notifyPush}
                onChange={(e) => setFormData({...formData, notifyPush: e.target.checked})}
                className="rounded text-maroon focus:ring-maroon"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Upcoming Event Reminders</label>
              <input
                type="checkbox"
                checked={formData.notifyUpcoming}
                onChange={(e) => setFormData({...formData, notifyUpcoming: e.target.checked})}
                className="rounded text-maroon focus:ring-maroon"
              />
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Private Profile</label>
              <input
                type="checkbox"
                checked={formData.profilePrivate}
                onChange={(e) => setFormData({...formData, profilePrivate: e.target.checked})}
                className="rounded text-maroon focus:ring-maroon"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Show Events I'm Attending</label>
              <input
                type="checkbox"
                checked={formData.showAttending}
                onChange={(e) => setFormData({...formData, showAttending: e.target.checked})}
                className="rounded text-maroon focus:ring-maroon"
              />
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Delete Account
            </button>
          </div>
        );

      case 'events':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Auto-add to Calendar</label>
              <input
                type="checkbox"
                checked={formData.autoAddCalendar}
                onChange={(e) => setFormData({...formData, autoAddCalendar: e.target.checked})}
                className="rounded text-maroon focus:ring-maroon"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default View</label>
              <select
                value={formData.defaultView}
                onChange={(e) => setFormData({...formData, defaultView: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:ring-maroon focus:border-maroon"
              >
                <option value="list">List View</option>
                <option value="calendar">Calendar View</option>
                <option value="map">Map View</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AuthSuspense>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <div className="flex gap-8">
          {/* Settings Navigation */}
          <div className="w-64 shrink-0">
            <div className="bg-white rounded-lg shadow">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50
                    ${activeSection === section.id ? 'text-maroon border-l-4 border-maroon' : 'text-gray-700'}
                  `}
                >
                  {section.icon}
                  <span>{section.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">
                {settingsSections.find(s => s.id === activeSection)?.title}
              </h2>
              {renderSection()}
              
              <div className="mt-6 pt-6 border-t">
                <button
                  onClick={handleUpdate}
                  className="w-full bg-maroon text-white py-2 px-4 rounded-md hover:bg-darkmaroon transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthSuspense>
  );
}

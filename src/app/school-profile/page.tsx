'use client';

import React, { useEffect, useState } from 'react';
import { SchoolProfile } from '@/types/school';
import DynamicSchoolProfile from '@/components/profile/DynamicSchoolProfile';
import schoolProfileService from '@/services/schoolProfileService';
import { APP_CONFIG } from '@/config/app';

export default function SchoolProfilePage() {
  const [profile, setProfile] = useState<SchoolProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [schoolId, setSchoolId] = useState(APP_CONFIG.school.id); // Use school ID from config

  useEffect(() => {
    fetchSchoolProfile();
  }, [schoolId]);

  const fetchSchoolProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await schoolProfileService.getSchoolProfileById(schoolId);
      setProfile(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load school profile');
      console.error('Error loading school profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading school profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
          <div className="mt-6">
            <label htmlFor="schoolId" className="block text-sm font-medium text-gray-700 mb-2">
              Enter School ID
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="schoolId"
                value={schoolId}
                onChange={(e) => setSchoolId(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                placeholder="e.g., 68c22a22ec3c0fd06634bc93"
              />
              <button
                onClick={fetchSchoolProfile}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Load
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-4">
          <p className="text-gray-600 mb-6">No profile data available</p>
          <div className="mt-6">
            <label htmlFor="schoolId2" className="block text-sm font-medium text-gray-700 mb-2">
              Enter School ID
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="schoolId2"
                value={schoolId}
                onChange={(e) => setSchoolId(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                placeholder="e.g., 68c22a22ec3c0fd06634bc93"
              />
              <button
                onClick={fetchSchoolProfile}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Load
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* School ID Switcher (for demo purposes) */}
      <div className="bg-gray-100 border-b border-gray-200 p-4">
        <div className="container mx-auto flex items-center gap-4 flex-wrap">
          <label htmlFor="schoolId-switch" className="text-sm font-medium text-gray-700">
            School ID:
          </label>
          <input
            type="text"
            id="schoolId-switch"
            value={schoolId}
            onChange={(e) => setSchoolId(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-xs font-mono focus:ring-blue-500 focus:border-blue-500"
            placeholder="68c22a22ec3c0fd06634bc93"
            style={{ width: '220px' }}
          />
          <button
            onClick={fetchSchoolProfile}
            className="px-4 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
          >
            Load
          </button>
          <div className="ml-auto text-sm text-gray-600 flex gap-4 flex-wrap">
            {/* <span>
              <span className="text-gray-500">School:</span> <span className="font-bold">{profile.name || 'N/A'}</span>
            </span>
            <span className="border-l pl-4">
              <span className="text-gray-500">Mission:</span> <span className="font-bold">{profile.profile?.layout?.sections?.mission?.template || 'card'}</span>
            </span>
            <span>
              <span className="text-gray-500">Goals:</span> <span className="font-bold">{profile.profile?.layout?.sections?.goals?.template || 'grid'}</span>
            </span>
            <span>
              <span className="text-gray-500">Facilities:</span> <span className="font-bold">{profile.profile?.layout?.sections?.facilities?.template || 'grid'}</span>
            </span> */}
          </div>
        </div>
      </div>

      {/* Render School Profile with Dynamic Section Layouts */}
      <DynamicSchoolProfile profile={profile} />
    </div>
  );
}


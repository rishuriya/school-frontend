'use client';

import React from 'react';
import { SchoolProfile } from '@/types/school';

interface MissionSectionProps {
  profile: SchoolProfile;
  template?: 'card' | 'banner' | 'split' | 'minimal';
}

export const MissionSection: React.FC<MissionSectionProps> = ({ profile, template = 'card' }) => {
  const mission = profile.profile?.mission;
  const theme = profile.profile?.layout?.globalTheme;
  const primaryColor = theme?.primaryColor || profile.brandColor;

  if (!mission) return null;

  switch (template) {
    case 'banner':
      return (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-5xl font-bold text-white mb-8">Our Mission</h2>
            <p className="text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed">{mission}</p>
          </div>
        </section>
      );

    case 'split':
      return (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-sm uppercase tracking-wider font-semibold" style={{ color: primaryColor }}>
                  What Drives Us
                </span>
                <h2 className="text-5xl font-bold text-gray-900 mt-4 mb-6">Our Mission</h2>
              </div>
              <div>
                <p className="text-xl text-gray-700 leading-relaxed">{mission}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 'minimal':
      return (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm uppercase tracking-widest mb-6" style={{ color: `${primaryColor}80` }}>
              Mission
            </h2>
            <p className="text-3xl font-light leading-relaxed text-gray-800">{mission}</p>
          </div>
        </section>
      );

    case 'card':
    default:
      return (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-12 border-l-4" style={{ borderColor: primaryColor }}>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mr-4" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed">{mission}</p>
            </div>
          </div>
        </section>
      );
  }
};

export default MissionSection;


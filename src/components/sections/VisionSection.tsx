'use client';

import React from 'react';
import { SchoolProfile } from '@/types/school';

interface VisionSectionProps {
  profile: SchoolProfile;
  template?: 'card' | 'banner' | 'split' | 'minimal';
}

export const VisionSection: React.FC<VisionSectionProps> = ({ profile, template = 'card' }) => {
  const vision = profile.profile?.vision;
  const theme = profile.profile?.layout?.globalTheme;
  const primaryColor = theme?.primaryColor || profile.brandColor;
  const secondaryColor = theme?.secondaryColor || '#10B981';

  if (!vision) return null;

  switch (template) {
    case 'banner':
      return (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 opacity-90"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-5xl font-bold text-white mb-8">Our Vision</h2>
            <p className="text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed">{vision}</p>
          </div>
        </section>
      );

    case 'split':
      return (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <p className="text-xl text-gray-700 leading-relaxed">{vision}</p>
              </div>
              <div className="order-1 lg:order-2">
                <span className="text-sm uppercase tracking-wider font-semibold" style={{ color: secondaryColor }}>
                  Where We're Headed
                </span>
                <h2 className="text-5xl font-bold text-gray-900 mt-4 mb-6">Our Vision</h2>
              </div>
            </div>
          </div>
        </section>
      );

    case 'minimal':
      return (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm uppercase tracking-widest mb-6" style={{ color: `${secondaryColor}80` }}>
              Vision
            </h2>
            <p className="text-3xl font-light leading-relaxed text-gray-800">{vision}</p>
          </div>
        </section>
      );

    case 'card':
    default:
      return (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-12 border-l-4" style={{ borderColor: secondaryColor }}>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mr-4" style={{ backgroundColor: `${secondaryColor}20`, color: secondaryColor }}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed">{vision}</p>
            </div>
          </div>
        </section>
      );
  }
};

export default VisionSection;


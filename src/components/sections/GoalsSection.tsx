'use client';

import React from 'react';
import { SchoolProfile } from '@/types/school';

interface GoalsSectionProps {
  profile: SchoolProfile;
  template?: 'grid' | 'list' | 'timeline' | 'cards';
}

export const GoalsSection: React.FC<GoalsSectionProps> = ({ profile, template = 'grid' }) => {
  const goals = profile.profile?.goals;
  const theme = profile.profile?.layout?.globalTheme;
  const primaryColor = theme?.primaryColor || profile.brandColor;

  if (!goals || goals.length === 0) return null;

  switch (template) {
    case 'list':
      return (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Goals</h2>
            <ol className="space-y-6">
              {goals.map((goal, index) => (
                <li key={index} className="flex items-start gap-6">
                  <span className="text-5xl font-bold" style={{ color: `${primaryColor}40` }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-xl text-gray-700 leading-relaxed flex-1 pt-2">{goal}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      );

    case 'timeline':
      return (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Goals</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1" style={{ backgroundColor: `${primaryColor}30` }}></div>
              <div className="space-y-12">
                {goals.map((goal, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                      <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="text-3xl font-bold mb-3" style={{ color: primaryColor }}>
                          Goal {index + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed">{goal}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );

    case 'cards':
      return (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Goals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {goals.map((goal, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-1 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300" style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${theme?.secondaryColor || '#8B5CF6'} 100%)` }}></div>
                  <div className="relative bg-white rounded-xl p-8 shadow-lg">
                    <div className="text-5xl font-bold mb-4" style={{ color: `${primaryColor}40` }}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">{goal}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'grid':
    default:
      return (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Goals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                    <span className="text-2xl font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{goal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
  }
};

export default GoalsSection;


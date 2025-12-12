'use client';

import React from 'react';
import Image from 'next/image';
import { SchoolProfile } from '@/types/school';

interface MinimalLayoutProps {
  profile: SchoolProfile;
}

export const MinimalLayout: React.FC<MinimalLayoutProps> = ({ profile }) => {
  const sections = profile.profile?.layout?.sections;
  const theme = profile.profile?.layout?.globalTheme;
  const primaryColor = theme?.primaryColor || profile.brandColor;

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-light tracking-wide" style={{ color: primaryColor }}>
            {profile.name}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Mission */}
        {sections?.mission?.show !== false && profile.profile?.mission && (
          <section className="mb-20">
            <h2 className="text-sm uppercase tracking-widest mb-6" style={{ color: `${primaryColor}80` }}>
              Mission
            </h2>
            <p className="text-2xl font-light leading-relaxed text-gray-800">
              {profile.profile.mission}
            </p>
          </section>
        )}

        {/* Vision */}
        {sections?.vision?.show !== false && profile.profile?.vision && (
          <section className="mb-20">
            <h2 className="text-sm uppercase tracking-widest mb-6" style={{ color: `${primaryColor}80` }}>
              Vision
            </h2>
            <p className="text-2xl font-light leading-relaxed text-gray-800">
              {profile.profile.vision}
            </p>
          </section>
        )}

        {/* Goals */}
        {sections?.goals?.show !== false && profile.profile?.goals && profile.profile.goals.length > 0 && (
          <section className="mb-20">
            <h2 className="text-sm uppercase tracking-widest mb-6" style={{ color: `${primaryColor}80` }}>
              Goals
            </h2>
            <div className="space-y-8">
              {profile.profile.goals.map((goal, index) => {
                const goalText = typeof goal === 'string' ? goal : (goal.title || goal.text || goal.description || 'Goal');
                return (
                  <div key={index} className="flex items-start gap-6">
                    <span className="text-4xl font-light" style={{ color: `${primaryColor}40` }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-lg text-gray-700 leading-relaxed flex-1">{goalText}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Principal's Message */}
        {sections?.principalMessage?.show !== false && profile.profile?.principalMessage && (
          <section className="mb-20">
            <h2 className="text-sm uppercase tracking-widest mb-6" style={{ color: `${primaryColor}80` }}>
              Principal&apos;s Message
            </h2>
            <div className="border-l-2 pl-8" style={{ borderColor: primaryColor }}>
              <p className="text-xl font-light text-gray-700 leading-relaxed italic">
                {profile.profile.principalMessage}
              </p>
            </div>
          </section>
        )}

        {/* Facilities */}
        {sections?.facilities?.show !== false && profile.profile?.facilities && profile.profile.facilities.length > 0 && (
          <section className="mb-20">
            <h2 className="text-sm uppercase tracking-widest mb-8" style={{ color: `${primaryColor}80` }}>
              Facilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {profile.profile.facilities.map((facility, index) => (
                <div key={index}>
                  <h3 className="text-xl font-medium mb-3" style={{ color: primaryColor }}>
                    {facility.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{facility.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {sections?.achievements?.show !== false && profile.profile?.achievements && profile.profile.achievements.length > 0 && (
          <section className="mb-20">
            <h2 className="text-sm uppercase tracking-widest mb-8" style={{ color: `${primaryColor}80` }}>
              Achievements
            </h2>
            <div className="space-y-10">
              {profile.profile.achievements.map((achievement, index) => (
                <div key={index} className="border-b pb-6">
                  <div className="flex items-baseline gap-6 mb-3">
                    <span className="text-3xl font-light" style={{ color: primaryColor }}>
                      {achievement.year}
                    </span>
                    <h3 className="text-xl font-medium">{achievement.title}</h3>
                  </div>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Admission */}
        {sections?.admission?.show !== false && profile.profile?.admissionInfo?.isOpen && (
          <section className="mb-20">
            <div className="border p-12 text-center">
              <h2 className="text-3xl font-light mb-4" style={{ color: primaryColor }}>
                Admissions Open
              </h2>
              {profile.profile.admissionInfo.process && (
                <p className="text-gray-700 leading-relaxed">{profile.profile.admissionInfo.process}</p>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};


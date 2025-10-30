'use client';

import React from 'react';
import Image from 'next/image';
import { SchoolProfile } from '@/types/school';

interface ClassicLayoutProps {
  profile: SchoolProfile;
}

export const ClassicLayout: React.FC<ClassicLayoutProps> = ({ profile }) => {
  const sections = profile.profile?.layout?.sections;
  const theme = profile.profile?.layout?.theme;
  const primaryColor = theme?.primaryColor || profile.brandColor;

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Classic Header */}
      <div className="bg-gradient-to-b from-amber-100 to-amber-50 border-b-4" style={{ borderColor: primaryColor }}>
        <div className="container mx-auto px-4 py-12 text-center">
          {profile.logoUrl && (
            <div className="relative w-24 h-24 mx-auto mb-6">
              <Image src={profile.logoUrl} alt={profile.name} fill className="object-contain" />
            </div>
          )}
          <h1 className="text-5xl font-serif font-bold mb-4" style={{ color: primaryColor }}>
            {profile.name}
          </h1>
          {profile.profile?.established && (
            <p className="text-xl text-gray-700">
              Est. {new Date(profile.profile.established).getFullYear()}
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Mission & Vision in Classic Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {sections?.showMission && profile.profile?.mission && (
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4" style={{ borderColor: primaryColor }}>
              <h2 className="text-3xl font-serif font-bold mb-4 text-center" style={{ color: primaryColor }}>
                Mission
              </h2>
              <p className="text-gray-700 text-center leading-relaxed">{profile.profile.mission}</p>
            </div>
          )}
          {sections?.showVision && profile.profile?.vision && (
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4" style={{ borderColor: primaryColor }}>
              <h2 className="text-3xl font-serif font-bold mb-4 text-center" style={{ color: primaryColor }}>
                Vision
              </h2>
              <p className="text-gray-700 text-center leading-relaxed">{profile.profile.vision}</p>
            </div>
          )}
        </div>

        {/* Principal's Message in Classic Frame */}
        {sections?.showPrincipalMessage && profile.profile?.principalMessage && (
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8 border-8 border-double" style={{ borderColor: `${primaryColor}30` }}>
              <h2 className="text-3xl font-serif font-bold mb-6 text-center" style={{ color: primaryColor }}>
                From the Principal&apos;s Desk
              </h2>
              <div className="flex flex-col items-center">
                {profile.profile.principalImage && (
                  <div className="relative w-32 h-32 mb-6 rounded-full border-4" style={{ borderColor: primaryColor }}>
                    <Image src={profile.profile.principalImage} alt="Principal" fill className="rounded-full object-cover" />
                  </div>
                )}
                <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl font-serif italic">
                  &ldquo;{profile.profile.principalMessage}&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Goals in Classic List */}
        {sections?.showGoals && profile.profile?.goals && profile.profile.goals.length > 0 && (
          <div className="mb-12">
            <h2 className="text-4xl font-serif font-bold text-center mb-8" style={{ color: primaryColor }}>
              Our Goals
            </h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <ol className="space-y-4">
                {profile.profile.goals.map((goal, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-2xl font-bold mr-4" style={{ color: primaryColor }}>
                      {index + 1}.
                    </span>
                    <span className="text-lg text-gray-700 leading-relaxed">{goal}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* Facilities */}
        {sections?.showFacilities && profile.profile?.facilities && profile.profile.facilities.length > 0 && (
          <div className="mb-12">
            <h2 className="text-4xl font-serif font-bold text-center mb-8" style={{ color: primaryColor }}>
              Facilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.profile.facilities.map((facility, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 border-b-4" style={{ borderColor: primaryColor }}>
                  <h3 className="text-xl font-serif font-bold mb-3" style={{ color: primaryColor }}>
                    {facility.name}
                  </h3>
                  <p className="text-gray-700">{facility.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Timeline */}
        {sections?.showAchievements && profile.profile?.achievements && profile.profile.achievements.length > 0 && (
          <div className="mb-12">
            <h2 className="text-4xl font-serif font-bold text-center mb-8" style={{ color: primaryColor }}>
              Milestones & Achievements
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1" style={{ backgroundColor: `${primaryColor}30` }}></div>
              <div className="space-y-8">
                {profile.profile.achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                      <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>
                          {achievement.year}
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-2">{achievement.title}</h3>
                        <p className="text-gray-700">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


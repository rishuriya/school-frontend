'use client';

import React from 'react';
import Image from 'next/image';
import { SchoolProfile } from '@/types/school';

interface ModernLayoutProps {
  profile: SchoolProfile;
}

export const ModernLayout: React.FC<ModernLayoutProps> = ({ profile }) => {
  const sections = profile.profile?.layout?.sections;
  const theme = profile.profile?.layout?.globalTheme;

  const primaryColor = theme?.primaryColor || profile.brandColor;
  const secondaryColor = theme?.secondaryColor || '#4F46E5';
  const accentColor = theme?.accentColor || '#F59E0B';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header/Hero Section */}
      {profile.profile?.headerImage && (
        <div className="relative h-96 w-full">
          <Image
            src={profile.profile.headerImage}
            alt={profile.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                {profile.name}
              </h1>
              {profile.profile?.established && (
                <p className="text-xl text-white/90">
                  Established {new Date(profile.profile.established).getFullYear()}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        {/* Mission & Vision */}
        {sections?.mission?.show !== false && profile.profile?.mission && (
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border-l-4" style={{ borderColor: primaryColor }}>
              <h2 className="text-3xl font-bold mb-6" style={{ color: primaryColor }}>
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {profile.profile.mission}
              </p>
            </div>
          </section>
        )}

        {sections?.vision?.show !== false && profile.profile?.vision && (
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border-l-4" style={{ borderColor: secondaryColor }}>
              <h2 className="text-3xl font-bold mb-6" style={{ color: secondaryColor }}>
                Our Vision
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {profile.profile.vision}
              </p>
            </div>
          </section>
        )}

        {/* Goals */}
        {sections?.goals?.show !== false && profile.profile?.goals && profile.profile.goals.length > 0 && (
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: primaryColor }}>
              Our Goals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.profile.goals.map((goal, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                  >
                    <span className="text-2xl font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{typeof goal === 'string' ? goal : (goal.title || goal.text || goal.description || 'Goal')}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Principal's Message */}
        {sections?.principalMessage?.show !== false && profile.profile?.principalMessage && (
          <section className="mb-16">
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: primaryColor }}>
                Principal&apos;s Message
              </h2>
              <div className="flex flex-col md:flex-row items-center gap-8">
                {profile.profile.principalImage && (
                  <div className="relative w-48 h-48 flex-shrink-0">
                    <Image
                      src={profile.profile.principalImage}
                      alt="Principal"
                      fill
                      className="rounded-full object-cover shadow-lg"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-lg text-gray-700 leading-relaxed italic">
                    &ldquo;{profile.profile.principalMessage}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Facilities */}
        {sections?.facilities?.show !== false && profile.profile?.facilities && profile.profile.facilities.length > 0 && (
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: primaryColor }}>
              Our Facilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {profile.profile.facilities.map((facility, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {facility.image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={facility.image}
                        alt={facility.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3" style={{ color: primaryColor }}>
                      {facility.name}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {facility.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {sections?.achievements?.show !== false && profile.profile?.achievements && profile.profile.achievements.length > 0 && (
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: primaryColor }}>
              Our Achievements
            </h2>
            <div className="space-y-6">
              {profile.profile.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div
                      className="text-3xl font-bold px-6 py-3 rounded-lg"
                      style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                    >
                      {achievement.year}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>
                        {achievement.title}
                      </h3>
                      <p className="text-gray-700">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Admission Info */}
        {sections?.admission?.show !== false && profile.profile?.admissionInfo?.isOpen && (
          <section className="mb-16">
            <div
              className="rounded-2xl shadow-xl p-8 md:p-12 text-white"
              style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)` }}
            >
              <h2 className="text-4xl font-bold mb-6">Admissions Open!</h2>
              {profile.profile.admissionInfo.startDate && profile.profile.admissionInfo.endDate && (
                <p className="text-xl mb-6">
                  {new Date(profile.profile.admissionInfo.startDate).toLocaleDateString()} - {new Date(profile.profile.admissionInfo.endDate).toLocaleDateString()}
                </p>
              )}
              {profile.profile.admissionInfo.process && (
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-3">Admission Process</h3>
                  <p className="text-lg leading-relaxed">{profile.profile.admissionInfo.process}</p>
                </div>
              )}
              {profile.profile.admissionInfo.requirements && profile.profile.admissionInfo.requirements.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {profile.profile.admissionInfo.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};


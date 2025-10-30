'use client';

import React from 'react';
import Image from 'next/image';
import { SchoolProfile } from '@/types/school';

interface CreativeLayoutProps {
  profile: SchoolProfile;
}

export const CreativeLayout: React.FC<CreativeLayoutProps> = ({ profile }) => {
  const sections = profile.profile?.layout?.sections;
  const theme = profile.profile?.layout?.theme;
  const primaryColor = theme?.primaryColor || profile.brandColor;
  const secondaryColor = theme?.secondaryColor || '#8B5CF6';
  const accentColor = theme?.accentColor || '#EC4899';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Creative Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-3xl"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center">
            {profile.logoUrl && (
              <div className="relative w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden shadow-2xl">
                <Image src={profile.logoUrl} alt={profile.name} fill className="object-contain" />
              </div>
            )}
            <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {profile.name}
            </h1>
            {profile.profile?.established && (
              <p className="text-2xl text-gray-700">
                Inspiring Minds Since {new Date(profile.profile.established).getFullYear()}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Mission & Vision in Creative Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {sections?.showMission && profile.profile?.mission && (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl mr-4">
                    🎯
                  </div>
                  <h2 className="text-3xl font-bold" style={{ color: primaryColor }}>
                    Our Mission
                  </h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">{profile.profile.mission}</p>
              </div>
            </div>
          )}

          {sections?.showVision && profile.profile?.vision && (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl mr-4">
                    👁️
                  </div>
                  <h2 className="text-3xl font-bold" style={{ color: secondaryColor }}>
                    Our Vision
                  </h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">{profile.profile.vision}</p>
              </div>
            </div>
          )}
        </div>

        {/* Goals in Creative Grid */}
        {sections?.showGoals && profile.profile?.goals && profile.profile.goals.length > 0 && (
          <section className="mb-16">
            <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              What Drives Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.profile.goals.map((goal, index) => {
                const colors = [
                  'from-purple-500 to-pink-500',
                  'from-blue-500 to-purple-500',
                  'from-pink-500 to-red-500',
                  'from-green-500 to-blue-500',
                  'from-yellow-500 to-orange-500',
                  'from-indigo-500 to-purple-500',
                ];
                const colorClass = colors[index % colors.length];

                return (
                  <div
                    key={index}
                    className="relative group hover:scale-105 transition-transform duration-300"
                  >
                    <div className={`absolute -inset-1 bg-gradient-to-r ${colorClass} rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300`}></div>
                    <div className="relative bg-white rounded-xl p-6 shadow-lg">
                      <div className={`text-4xl font-bold mb-4 bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <p className="text-gray-700">{goal}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Principal's Message Creative Card */}
        {sections?.showPrincipalMessage && profile.profile?.principalMessage && (
          <section className="mb-16">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 rounded-3xl blur-lg opacity-30"></div>
              <div className="relative bg-white rounded-3xl p-12 shadow-2xl">
                <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  A Word from Our Principal
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {profile.profile.principalImage && (
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-50"></div>
                      <div className="relative w-48 h-48 rounded-full overflow-hidden">
                        <Image src={profile.profile.principalImage} alt="Principal" fill className="object-cover" />
                      </div>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-xl text-gray-700 leading-relaxed italic">
                      &ldquo;{profile.profile.principalMessage}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Facilities in Creative Grid */}
        {sections?.showFacilities && profile.profile?.facilities && profile.profile.facilities.length > 0 && (
          <section className="mb-16">
            <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              World-Class Facilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {profile.profile.facilities.map((facility, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
                  {facility.image && (
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={facility.image}
                        alt={facility.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {facility.name}
                    </h3>
                    <p className="text-gray-700">{facility.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements Creative Timeline */}
        {sections?.showAchievements && profile.profile?.achievements && profile.profile.achievements.length > 0 && (
          <section className="mb-16">
            <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
              Our Proud Moments
            </h2>
            <div className="space-y-8">
              {profile.profile.achievements.map((achievement, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-red-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative bg-white rounded-2xl p-8 shadow-xl flex items-start gap-6">
                    <div className="text-5xl font-bold bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
                      {achievement.year}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2" style={{ color: accentColor }}>
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

        {/* Admission CTA */}
        {sections?.showAdmission && profile.profile?.admissionInfo?.isOpen && (
          <section className="mb-16">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"></div>
              <div className="relative p-12 text-white text-center">
                <h2 className="text-5xl font-bold mb-6">Join Our Community!</h2>
                <p className="text-2xl mb-8">Admissions are now open</p>
                {profile.profile.admissionInfo.process && (
                  <p className="text-lg max-w-3xl mx-auto mb-6">{profile.profile.admissionInfo.process}</p>
                )}
                <button className="bg-white text-purple-600 font-bold py-4 px-12 rounded-full text-xl hover:scale-110 transition-transform duration-300 shadow-2xl">
                  Apply Now
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};


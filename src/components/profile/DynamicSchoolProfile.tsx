'use client';

import React, { useMemo } from 'react';
import { SchoolProfile } from '@/types/school';
import MissionSection from '../sections/MissionSection';
import VisionSection from '../sections/VisionSection';
import GoalsSection from '../sections/GoalsSection';
import FacilitiesSection from '../sections/FacilitiesSection';
import AdmissionSection from '../sections/AdmissionSection';

interface DynamicSchoolProfileProps {
  profile: SchoolProfile;
}

export const DynamicSchoolProfile: React.FC<DynamicSchoolProfileProps> = ({ profile }) => {
  const sections = profile.profile?.layout?.sections;

  // Create an array of sections with their order
  const orderedSections = useMemo(() => {
    const sectionComponents = [
      {
        key: 'mission',
        order: sections?.mission?.order || 1,
        show: sections?.mission?.show !== false,
        template: sections?.mission?.template || 'card',
        component: <MissionSection profile={profile} template={sections?.mission?.template || 'card'} />
      },
      {
        key: 'vision',
        order: sections?.vision?.order || 2,
        show: sections?.vision?.show !== false,
        template: sections?.vision?.template || 'card',
        component: <VisionSection profile={profile} template={sections?.vision?.template || 'card'} />
      },
      {
        key: 'goals',
        order: sections?.goals?.order || 3,
        show: sections?.goals?.show !== false,
        template: sections?.goals?.template || 'grid',
        component: <GoalsSection profile={profile} template={sections?.goals?.template || 'grid'} />
      },
      {
        key: 'facilities',
        order: sections?.facilities?.order || 4,
        show: sections?.facilities?.show !== false,
        template: sections?.facilities?.template || 'grid',
        component: <FacilitiesSection profile={profile} template={sections?.facilities?.template || 'grid'} />
      },
      {
        key: 'admission',
        order: sections?.admission?.order || 8,
        show: sections?.admission?.show !== false && profile.profile?.admissionInfo?.isOpen,
        template: sections?.admission?.template || 'banner',
        component: <AdmissionSection profile={profile} template={sections?.admission?.template || 'banner'} />
      }
    ];

    // Sort by order and filter out hidden sections
    return sectionComponents
      .filter(section => section.show)
      .sort((a, b) => a.order - b.order);
  }, [profile, sections]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {profile.name}
          </h1>
          {profile.profile?.established && (
            <p className="text-xl md:text-2xl text-white/90">
              Est. {new Date(profile.profile.established).getFullYear()}
            </p>
          )}
        </div>
      </section>

      {/* Dynamically render ordered sections */}
      {orderedSections.map((section) => (
        <React.Fragment key={section.key}>
          {section.component}
        </React.Fragment>
      ))}

      {/* Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
              <p className="text-gray-300 mb-2">{profile.contactEmail}</p>
              <p className="text-gray-300">{profile.contactPhone}</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Address</h3>
              <p className="text-gray-300">
                {profile.address.street}<br />
                {profile.address.city}, {profile.address.state} {profile.address.zipCode}<br />
                {profile.address.country}
              </p>
            </div>
            {profile.profile?.socialMedia && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {profile.profile.socialMedia.facebook && (
                    <a href={profile.profile.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                      Facebook
                    </a>
                  )}
                  {profile.profile.socialMedia.twitter && (
                    <a href={profile.profile.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                      Twitter
                    </a>
                  )}
                  {profile.profile.socialMedia.instagram && (
                    <a href={profile.profile.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DynamicSchoolProfile;


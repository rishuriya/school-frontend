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
            {profile.profile?.socialMedia && profile.profile.socialMedia.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {profile.profile.socialMedia.map((social, index) => {
                    const platform = social.platform.toLowerCase();
                    let icon = null;

                    if (platform.includes('facebook')) {
                      icon = (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      );
                    } else if (platform.includes('twitter') || platform.includes(' x ')) {
                      icon = (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      );
                    } else if (platform.includes('instagram')) {
                      icon = (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      );
                    } else if (platform.includes('linkedin')) {
                      icon = (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      );
                    } else if (platform.includes('youtube')) {
                      icon = (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      );
                    } else {
                      icon = (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      );
                    }

                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                        title={social.platform}
                      >
                        {icon}
                      </a>
                    );
                  })}
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


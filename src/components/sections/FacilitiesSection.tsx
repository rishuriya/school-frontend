'use client';

import React from 'react';
import Image from 'next/image';
import { SchoolProfile } from '@/types/school';

interface FacilitiesSectionProps {
  profile: SchoolProfile;
  template?: 'grid' | 'carousel' | 'masonry' | 'list';
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ profile, template = 'grid' }) => {
  const facilities = profile.profile?.facilities;
  const theme = profile.profile?.layout?.globalTheme;
  const primaryColor = theme?.primaryColor || profile.brandColor;

  if (!facilities || facilities.length === 0) return null;

  switch (template) {
    case 'list':
      return (
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Facilities</h2>
            <div className="space-y-8">
              {facilities.map((facility, index) => (
                <div key={index} className="flex items-start gap-6 border-l-4 pl-6" style={{ borderColor: primaryColor }}>
                  <div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>{facility.name}</h3>
                    <p className="text-gray-700 leading-relaxed">{facility.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'masonry':
      return (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Facilities</h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {facilities.map((facility, index) => (
                <div key={index} className="break-inside-avoid bg-white rounded-xl shadow-md overflow-hidden">
                  {facility.image && (
                    <div className="relative h-48 w-full">
                      <Image src={facility.image} alt={facility.name} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3" style={{ color: primaryColor }}>{facility.name}</h3>
                    <p className="text-gray-700">{facility.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'carousel':
      return (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Facilities</h2>
            <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory">
              {facilities.map((facility, index) => (
                <div key={index} className="flex-shrink-0 w-80 snap-center">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
                    {facility.image && (
                      <div className="relative h-48 w-full">
                        <Image src={facility.image} alt={facility.name} fill className="object-cover" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3" style={{ color: primaryColor }}>{facility.name}</h3>
                      <p className="text-gray-700">{facility.description}</p>
                    </div>
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
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Facilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((facility, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  {facility.image && (
                    <div className="relative h-48 w-full">
                      <Image src={facility.image} alt={facility.name} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3" style={{ color: primaryColor }}>{facility.name}</h3>
                    <p className="text-gray-700 leading-relaxed">{facility.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
  }
};

export default FacilitiesSection;


'use client';

import React from 'react';
import { SchoolProfile } from '@/types/school';

interface AdmissionSectionProps {
  profile: SchoolProfile;
  template?: 'banner' | 'card' | 'detailed' | 'cta';
}

export const AdmissionSection: React.FC<AdmissionSectionProps> = ({ profile, template = 'banner' }) => {
  const admissionInfo = profile.profile?.admissionInfo;
  const theme = profile.profile?.layout?.globalTheme;
  const primaryColor = theme?.primaryColor || profile.brandColor;
  const secondaryColor = theme?.secondaryColor || '#8B5CF6';

  if (!admissionInfo?.isOpen) return null;

  // Helper function to render requirements (supports both old and new format)
  const renderRequirements = () => {
    // Check for new sectioned format first
    if (admissionInfo.requirementSections && admissionInfo.requirementSections.length > 0) {
      const sortedSections = [...admissionInfo.requirementSections].sort((a, b) => a.order - b.order);
      return sortedSections.map((section) => ({
        title: section.title,
        requirements: section.requirements
      }));
    }
    // Fallback to legacy format
    if (admissionInfo.requirements && admissionInfo.requirements.length > 0) {
      return [{
        title: 'General Requirements',
        requirements: admissionInfo.requirements
      }];
    }
    return null;
  };

  const requirementSections = renderRequirements();

  switch (template) {
    case 'card':
      return (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <div className="text-center mb-8">
                <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Admissions Open
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Join Our Community</h2>
              </div>
              {admissionInfo.process && admissionInfo.process.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Admission Process</h3>
                  {Array.isArray(admissionInfo.process) ? (
                    <ol className="space-y-2">
                      {admissionInfo.process.map((step, index) => (
                        <li key={index} className="flex items-start text-gray-700">
                          <span className="font-semibold mr-2 text-green-600">{index + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{admissionInfo.process}</p>
                  )}
                </div>
              )}
              {requirementSections && requirementSections.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Admission Requirements</h3>
                  <div className="space-y-6">
                    {requirementSections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="border-l-4 border-green-500 pl-4">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">{section.title}</h4>
                        <ul className="space-y-2">
                          {section.requirements.map((req, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-600 mr-3">✓</span>
                              <span className="text-gray-700">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      );

    case 'detailed':
      return (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Admissions</h2>
              <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                Now Accepting Applications
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {admissionInfo.process && admissionInfo.process.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3" style={{ color: primaryColor }}>Process</h3>
                  {Array.isArray(admissionInfo.process) ? (
                    <ol className="space-y-2">
                      {admissionInfo.process.map((step, index) => (
                        <li key={index} className="text-gray-700 text-sm">
                          <span className="font-semibold mr-1">{index + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-gray-700">{admissionInfo.process}</p>
                  )}
                </div>
              )}
              {requirementSections && requirementSections.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3" style={{ color: primaryColor }}>Requirements</h3>
                  <div className="space-y-4">
                    {requirementSections.map((section, sectionIndex) => (
                      <div key={sectionIndex}>
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm">{section.title}</h4>
                        <ul className="space-y-1 ml-2">
                          {section.requirements.map((req, index) => (
                            <li key={index} className="text-gray-700 text-sm">✓ {req}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {admissionInfo.fees && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3" style={{ color: primaryColor }}>Fee Structure</h3>
                  <p className="text-gray-700">{admissionInfo.fees.map((fee) => fee.category).join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      );

    case 'cta':
      return (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-5xl font-bold mb-6">Admissions Open!</h2>
            <p className="text-2xl mb-8 opacity-95">
              Join us and be part of our growing community
            </p>
            {admissionInfo.startDate && admissionInfo.endDate && (
              <p className="text-xl mb-8">
                Apply between {new Date(admissionInfo.startDate).toLocaleDateString()} - {new Date(admissionInfo.endDate).toLocaleDateString()}
              </p>
            )}
            <button className="bg-white text-blue-600 font-bold py-4 px-12 rounded-full text-xl hover:scale-110 transition-transform duration-300 shadow-2xl">
              Apply Now
            </button>
          </div>
        </section>
      );

    case 'banner':
    default:
      return (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r" style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)` }}></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4">Admissions Open!</h2>
              {admissionInfo.startDate && admissionInfo.endDate && (
                <p className="text-2xl opacity-95">
                  {new Date(admissionInfo.startDate).toLocaleDateString()} - {new Date(admissionInfo.endDate).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {admissionInfo.process && admissionInfo.process.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-4">Admission Process</h3>
                  {Array.isArray(admissionInfo.process) ? (
                    <ol className="space-y-2">
                      {admissionInfo.process.map((step, index) => (
                        <li key={index} className="flex items-start opacity-95">
                          <span className="font-semibold mr-2">{index + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-lg opacity-95">{admissionInfo.process}</p>
                  )}
                </div>
              )}
              {requirementSections && requirementSections.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-4">Admission Requirements</h3>
                  <div className="space-y-4">
                    {requirementSections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="border-l-4 border-white/30 pl-4">
                        <h4 className="text-lg font-semibold mb-2 opacity-95">{section.title}</h4>
                        <ul className="space-y-2">
                          {section.requirements.map((req, index) => (
                            <li key={index} className="flex items-start opacity-95">
                              <span className="mr-2">✓</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      );
  }
};

export default AdmissionSection;


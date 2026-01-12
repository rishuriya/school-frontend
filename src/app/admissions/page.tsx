'use client';

import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import schoolProfileService from '../../services/schoolProfileService';
import { APP_CONFIG } from '../../config/app';
import { 
  SchoolInfo,
  Program,
  SchoolProfile
} from '../../types/school';
import { 
  mockSchoolInfo,
  mockPrograms
} from '../../data/mockData';
import { programsApi } from '../../services/api';

export default function Admissions() {
  const [schoolProfile, setSchoolProfile] = React.useState<SchoolProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [schoolInfo, setSchoolInfo] = React.useState<SchoolInfo | null>(mockSchoolInfo);
  const [activeTab, setActiveTab] = useState('process');
  const [programs, setPrograms] = React.useState<Program[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch school profile and programs from backend
        const [profile, programsData] = await Promise.all([
          schoolProfileService.getSchoolProfileById(APP_CONFIG.school.id),
          programsApi.getPrograms()
        ]);
        
        setSchoolProfile(profile);
        setPrograms(programsData);
        
        // Map backend data to frontend format
        const mappedSchoolInfo: SchoolInfo = {
          id: profile._id || '',
          name: profile.name,
          tagline: profile.profile?.vision?.substring(0, 100) || 'Excellence in Education',
          description: profile.profile?.mission || '',
          address: `${profile.address?.street || ''}, ${profile.address?.city || ''}, ${profile.address?.state || ''} ${profile.address?.zipCode || ''}`.trim(),
          city: profile.address?.city || '',
          phone: profile.contactPhone,
          email: profile.contactEmail,
          logo: profile.logoUrl,
          website: profile.subdomain,
          established: profile.profile?.established ? new Date(profile.profile.established).getFullYear() : 2000,
        };
        
        setSchoolInfo(mappedSchoolInfo);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Use mock data as fallback
        setSchoolInfo(mockSchoolInfo);
        setPrograms(mockPrograms);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get admission info from backend
  const admissionInfo = schoolProfile?.profile?.admissionInfo;
  const isAdmissionOpen = admissionInfo?.isOpen ?? false;
  const admissionProcess = admissionInfo?.process;
  
  // Get requirements - check for new sectioned format first, fallback to legacy
  const requirementSections = admissionInfo?.requirementSections && admissionInfo.requirementSections.length > 0
    ? [...admissionInfo.requirementSections].sort((a, b) => a.order - b.order)
    : admissionInfo?.requirements && admissionInfo.requirements.length > 0
    ? [{
        id: 'general',
        title: 'General Requirements',
        order: 0,
        requirements: admissionInfo.requirements
      }]
    : [];
  
  const admissionFees = admissionInfo?.fees;
  const admissionPolicy = admissionInfo?.policy;
  const admissionContact = {
    phone: admissionInfo?.contactNumber || schoolProfile?.contactPhone,
    email: admissionInfo?.contactEmail || schoolProfile?.contactEmail
  };
  const admissionStartDate = admissionInfo?.startDate ? new Date(admissionInfo.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : null;
  const admissionEndDate = admissionInfo?.endDate ? new Date(admissionInfo.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : null;
  const importantDates = admissionInfo?.importantDates || [];
  const admissionFaqs = admissionInfo?.faqs || [];
  const admissionTemplate = schoolProfile?.profile?.layout?.sections?.admission?.template || 'banner';
  
  // Get layout templates for each admission subsection
  // Note: The layout structure only has a single 'admission' section, so we use defaults for subsections
  type ProcessTemplate = 'numbered' | 'timeline' | 'cards' | 'checklist';
  type PolicyTemplate = 'numbered' | 'cards' | 'accordion';
  type DatesTemplate = 'grid' | 'timeline' | 'list' | 'calendar';
  type FaqsTemplate = 'grid' | 'accordion' | 'list';
  type FeesTemplate = 'table' | 'cards' | 'detailed';
  
  const processTemplate = 'numbered' as ProcessTemplate;
  const policyTemplate = 'numbered' as PolicyTemplate;
  const datesTemplate = 'grid' as DatesTemplate;
  const faqsTemplate = 'grid' as FaqsTemplate;
  const feesTemplate = 'table' as FeesTemplate;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading admissions information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Admissions <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Process</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Transparent admissions process for quality education
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
              🧑‍🧑‍🧒 Admissions Process
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
              🤳 Requirements
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
              🎓 Important Dates
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveTab('process')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'process'
                  ? 'bg-slate-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Application Process
            </button>
            <button
              onClick={() => setActiveTab('requirements')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'requirements'
                  ? 'bg-slate-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Requirements
            </button>
            <button
              onClick={() => setActiveTab('dates')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'dates'
                  ? 'bg-slate-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Important Dates
            </button>
            <button
              onClick={() => setActiveTab('programs')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'programs'
                  ? 'bg-slate-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Programs
            </button>
            <button
              onClick={() => setActiveTab('policy')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'policy'
                  ? 'bg-slate-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Admission Policy
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'faq'
                  ? 'bg-slate-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              FAQ
            </button>
          </div>
        </div>
      </section>

      {/* Application Process - Dynamic from Backend */}
      {activeTab === 'process' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-6">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Application Process
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Our streamlined admission process is designed to be transparent and supportive, ensuring that every family has a clear understanding of what to expect.
              </p>
            </div>
            
            {/* Admission Status Banner */}
            <div className="mb-12">
              <Card variant="elevated" className={`p-6 ${isAdmissionOpen ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isAdmissionOpen ? 'bg-green-600' : 'bg-red-600'}`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isAdmissionOpen ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        )}
                      </svg>
                      </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${isAdmissionOpen ? 'text-green-900' : 'text-red-900'}`}>
                        Admissions {isAdmissionOpen ? 'Now Open!' : 'Closed'}
                        </h3>
                      <p className={`text-sm ${isAdmissionOpen ? 'text-green-700' : 'text-red-700'}`}>
                        {isAdmissionOpen 
                          ? `Apply now! ${admissionStartDate && admissionEndDate ? `From ${admissionStartDate} to ${admissionEndDate}` : ''}`
                          : 'Admissions are currently closed. Please check back later.'}
                      </p>
                    </div>
                  </div>
                  {isAdmissionOpen && (
                    <Button variant="gradient" size="lg">
                      Apply Now
                    </Button>
                  )}
                  </div>
                </Card>
                    </div>
                    
            {/* Process Steps - Dynamic from Backend with Template Support */}
            {admissionProcess && Array.isArray(admissionProcess) && admissionProcess.length > 0 ? (
              <div className="max-w-4xl mx-auto">
                {/* Numbered Template (Default) */}
                {processTemplate === 'numbered' && (
                  <div className="space-y-6">
                    {admissionProcess.map((step, index) => (
                      <Card key={index} variant="elevated" className="bg-white hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-600">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {index + 1}
                      </div>
                          <div className="flex-1 pt-2">
                            <p className="text-lg text-gray-700 leading-relaxed">{step}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Timeline Template */}
                {processTemplate === 'timeline' && (
                  <div className="relative">
                    <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>
                    <div className="space-y-8">
                      {admissionProcess.map((step, index) => (
                        <div key={index} className="relative flex items-start gap-6">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                            {index + 1}
                          </div>
                          <Card variant="elevated" className="flex-1 bg-white hover:shadow-xl transition-all duration-300">
                            <p className="text-lg text-gray-700 leading-relaxed">{step}</p>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cards Template */}
                {processTemplate === 'cards' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {admissionProcess.map((step, index) => (
                      <Card key={index} variant="elevated" className="bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-xl transition-all duration-300 border-2 border-blue-200">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            {index + 1}
                          </div>
                          <h4 className="text-xl font-bold text-gray-900">Step {index + 1}</h4>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{step}</p>
                      </Card>
                    ))}
                      </div>
                )}

                {/* Checklist Template */}
                {processTemplate === 'checklist' && (
                  <div className="space-y-4">
                    {admissionProcess.map((step, index) => (
                      <Card key={index} variant="elevated" className="bg-white hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white mt-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-lg text-gray-700 leading-relaxed">{step}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
                )}
              </div>
            ) : (
              <Card variant="elevated" className="p-12 text-center bg-gray-50">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Admission Process Information Coming Soon
                </h3>
                <p className="text-gray-600 mb-6">
                  Detailed admission process information will be available here. Please contact the school administration for more details.
                </p>
                <Button variant="outline" size="lg">
                  Contact Admissions Office
                </Button>
              </Card>
            )}
          </div>
        </section>
      )}

      {/* Requirements - Dynamic from Backend */}
      {activeTab === 'requirements' && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Admission Requirements
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                To ensure a smooth application process, please review and prepare all required documents and materials.
              </p>
            </div>
            
            {requirementSections.length > 0 ? (
              <>
                {/* Display sectioned requirements */}
                <div className="space-y-8 mb-12">
                  {requirementSections.map((section, sectionIndex) => (
                    <Card key={section.id || sectionIndex} variant="elevated" className="bg-white hover:shadow-xl transition-all duration-300 border-l-4 border-l-emerald-500">
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {section.requirements.map((requirement, reqIndex) => (
                            <div key={reqIndex} className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <p className="text-gray-700 leading-relaxed flex-1">{requirement}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Fees Information if available - with Template Support */}
                {admissionFees && Array.isArray(admissionFees) && admissionFees.length > 0 && (
                  <div className="mt-12">
                    {/* Table Template (Default) */}
                    {feesTemplate === 'table' && (
                      <Card variant="elevated" className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            Fee Structure
                          </h3>
                        </div>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b-2 border-blue-300">
                                <th className="text-left py-3 px-4 font-bold text-gray-900 bg-blue-100 rounded-tl-lg">Category</th>
                                <th className="text-left py-3 px-4 font-bold text-gray-900 bg-blue-100">Amount</th>
                                <th className="text-left py-3 px-4 font-bold text-gray-900 bg-blue-100 rounded-tr-lg">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {admissionFees.map((fee, index) => (
                                <tr key={index} className={`border-b border-blue-200 ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50/50'} hover:bg-blue-100/50 transition-colors duration-150`}>
                                  <td className="py-4 px-4 font-semibold text-gray-900">{fee.category}</td>
                                  <td className="py-4 px-4 text-blue-700 font-bold text-lg">{fee.amount}</td>
                                  <td className="py-4 px-4 text-gray-700">{fee.description || '-'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </Card>
                    )}

                    {/* Cards Template */}
                    {feesTemplate === 'cards' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {admissionFees.map((fee, index) => (
                          <Card key={index} variant="elevated" className="bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-all duration-300 border-2 border-green-200">
                            <div className="flex items-start gap-3 mb-4">
                              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-lg font-bold text-gray-900 mb-2">{fee.category}</h4>
                                <p className="text-2xl font-bold text-green-700">{fee.amount}</p>
                              </div>
                            </div>
                            {fee.description && (
                              <p className="text-sm text-gray-600 border-t border-green-200 pt-3 mt-3">
                                {fee.description}
                              </p>
                            )}
                          </Card>
                        ))}
                      </div>
                    )}

                    {/* Detailed Template */}
                    {feesTemplate === 'detailed' && (
                      <div className="space-y-4">
                        {admissionFees.map((fee, index) => (
                          <Card key={index} variant="elevated" className="bg-white hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                                  {index + 1}
                                </div>
                                <h4 className="text-xl font-bold text-gray-900">{fee.category}</h4>
                              </div>
                              <span className="text-2xl font-bold text-blue-700">{fee.amount}</span>
                            </div>
                            {fee.description && (
                              <p className="text-gray-600 leading-relaxed pl-11">{fee.description}</p>
                            )}
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <Card variant="elevated" className="p-12 text-center bg-gray-50">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Requirements Information Coming Soon
                </h3>
                <p className="text-gray-600 mb-6">
                  Detailed requirements will be available here. Please contact the school administration for current requirements.
                </p>
                <Button variant="outline" size="lg">
                  Contact Admissions Office
                </Button>
              </Card>
            )}
            
            <div className="mt-12 text-center">
              <Card variant="elevated" className="p-6 bg-emerald-50 border border-emerald-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Need Help with Requirements?
                </h3>
                <p className="text-gray-600 mb-4">
                  Our admissions team is here to help you navigate the application process and answer any questions you may have.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" size="lg" className="group hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition-all duration-200">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Contact Admissions
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Important Dates - Dynamic from Backend */}
      {activeTab === 'dates' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Important Dates
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Mark your calendar with these important admission deadlines and events to ensure a smooth application process.
              </p>
            </div>
            
            {importantDates.length > 0 ? (
              <>
                {/* Grid Template (Default) */}
                {datesTemplate === 'grid' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    {[...importantDates].sort((a, b) => a.order - b.order).map((dateItem, index) => (
                      <Card key={index} variant="elevated" className="bg-white hover:shadow-xl transition-all duration-300 border-l-4 border-l-amber-500">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                              {dateItem.title}
                            </h3>
                            <p className="text-amber-600 font-semibold text-sm mb-2">
                              {new Date(dateItem.date).toLocaleDateString('en-US', { 
                                weekday: 'long',
                                month: 'long', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </p>
                            {dateItem.description && (
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {dateItem.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Timeline Template */}
                {datesTemplate === 'timeline' && (
                  <div className="max-w-4xl mx-auto mb-12">
                    <div className="relative">
                      <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-amber-500 to-orange-600"></div>
                      <div className="space-y-8">
                        {[...importantDates].sort((a, b) => a.order - b.order).map((dateItem, index) => (
                          <div key={index} className="relative flex items-start gap-6">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <Card variant="elevated" className="flex-1 bg-white hover:shadow-xl transition-all duration-300">
                              <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {dateItem.title}
                              </h3>
                              <p className="text-amber-600 font-semibold text-sm mb-2">
                                {new Date(dateItem.date).toLocaleDateString('en-US', { 
                                  weekday: 'long',
                                  month: 'long', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}
                              </p>
                              {dateItem.description && (
                                <p className="text-gray-600 text-sm leading-relaxed">
                                  {dateItem.description}
                                </p>
                              )}
                            </Card>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* List Template */}
                {datesTemplate === 'list' && (
                  <div className="max-w-4xl mx-auto mb-12 space-y-4">
                    {[...importantDates].sort((a, b) => a.order - b.order).map((dateItem, index) => (
                      <Card key={index} variant="elevated" className="bg-white hover:shadow-lg transition-all duration-300 border-l-4 border-l-amber-500">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">
                                {dateItem.title}
                              </h3>
                              {dateItem.description && (
                                <p className="text-gray-600 text-sm mt-1">
                                  {dateItem.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-amber-600 font-semibold text-sm">
                              {new Date(dateItem.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Calendar Template */}
                {datesTemplate === 'calendar' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {[...importantDates].sort((a, b) => a.order - b.order).map((dateItem, index) => {
                      const date = new Date(dateItem.date);
                      const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
                      const day = date.getDate();
                      const year = date.getFullYear();
                      
                      return (
                        <Card key={index} variant="elevated" className="bg-white hover:shadow-xl transition-all duration-300 overflow-hidden">
                          <div className="flex">
                            <div className="w-20 bg-gradient-to-br from-amber-500 to-orange-600 text-white flex flex-col items-center justify-center p-3">
                              <span className="text-xs font-bold">{month}</span>
                              <span className="text-3xl font-bold">{day}</span>
                              <span className="text-xs">{year}</span>
                            </div>
                            <div className="flex-1 p-4">
                              <h3 className="font-bold text-gray-900 mb-2">
                                {dateItem.title}
                              </h3>
                              {dateItem.description && (
                                <p className="text-gray-600 text-sm leading-relaxed">
                                  {dateItem.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}

                {/* Admission Status Summary */}
                {(admissionStartDate || admissionEndDate) && (
                  <Card variant="elevated" className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 mb-12">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isAdmissionOpen ? 'bg-green-600' : 'bg-red-600'}`}>
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isAdmissionOpen ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            )}
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">
                            Admissions {isAdmissionOpen ? 'Open' : 'Closed'}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                            {admissionStartDate && (
                              <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Starts: <strong>{admissionStartDate}</strong></span>
                              </span>
                            )}
                            {admissionEndDate && (
                              <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Ends: <strong>{admissionEndDate}</strong></span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {isAdmissionOpen && (
                        <Button variant="gradient" size="lg">
                          Apply Now
                        </Button>
                      )}
                    </div>
                  </Card>
                )}
              </>
            ) : (
              <Card variant="elevated" className="p-12 text-center bg-gray-50 max-w-3xl mx-auto">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Admission Dates Coming Soon
                </h3>
                <p className="text-gray-600 mb-6">
                  Important admission dates will be announced here. Please contact the school for more information.
                </p>
                <Button variant="outline" size="lg">
                  Contact Admissions Office
                </Button>
              </Card>
            )}
            
            <div className="mt-12 text-center">
              <Card variant="elevated" className="p-6 bg-amber-50 border border-amber-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Need More Information?
                </h3>
                <p className="text-gray-600 mb-4">
                  Contact our admissions office for the latest information about admission dates, deadlines, and procedures.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {admissionContact.phone && (
                  <Button variant="outline" size="lg" className="group hover:bg-amber-50 hover:border-amber-200 hover:text-amber-600 transition-all duration-200">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                      {admissionContact.phone}
                  </Button>
                  )}
                  {admissionContact.email && (
                  <Button variant="outline" size="lg" className="group hover:bg-amber-50 hover:border-amber-200 hover:text-amber-600 transition-all duration-200">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                      {admissionContact.email}
                  </Button>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Programs */}
      {activeTab === 'programs' && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-100 rounded-full mb-6">
                <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Available Programs
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Discover our comprehensive range of educational programs designed to nurture young minds from early childhood through senior secondary education.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {programs.map((program) => (
                <Card key={program.id} variant="elevated" className="overflow-hidden bg-white">
                  <div className="aspect-w-16 aspect-h-9">
                    {program.image ? (
                      <img
                        src={program.image}
                        alt={program.name}
                        className="w-full h-40 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-white font-bold text-lg">
                              {program.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-gray-500 text-xs">Program Image</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{program.name}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                        {program.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                      {program.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="font-medium mr-2">Age:</span>
                        {program.ageGroup}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="font-medium mr-2">Duration:</span>
                        {program.duration}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="font-medium mr-2">Class Size:</span>
                        {program.classSize}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="font-medium mr-2">Tuition:</span>
                        <span className="text-green-600 font-semibold">{program.tuition}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-gray-900 mb-1">Key Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {program.features?.slice(0, 2).map((feature, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                        {program.features && program.features.length > 2 && (
                          <span className="text-gray-500 text-xs">
                            +{program.features.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Button variant="gradient" size="sm" className="w-full">
                      Apply for {program.name}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Card variant="elevated" className="p-6 bg-blue-50 border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Ready to Choose Your Program?
                </h3>
                <p className="text-gray-600 mb-4">
                  Our admissions team is here to help you select the right program for your child&apos;s educational journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="gradient" size="lg">
                    Schedule a Consultation
                  </Button>
                  <Button variant="outline" size="lg">
                    Download Program Guide
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Admission Policy - Dynamic from Backend */}
      {activeTab === 'policy' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Admission Policy
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Please read our admission policy carefully to understand our admission process and requirements.
              </p>
            </div>
            
            {admissionPolicy && Array.isArray(admissionPolicy) && admissionPolicy.length > 0 ? (
              <div className="max-w-5xl mx-auto">
                {/* Numbered Template (Default) */}
                {policyTemplate === 'numbered' && (
                  <Card variant="elevated" className="p-8 bg-white">
                <ul className="space-y-4">
                      {admissionPolicy.map((policyPoint, index) => (
                        <li key={index} className="flex items-start gap-4">
                          <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-base font-bold mt-0.5">
                            {index + 1}
                          </span>
                          <span className="flex-1 leading-relaxed text-lg text-gray-700">{policyPoint}</span>
                  </li>
                      ))}
                </ul>
              </Card>
                )}

                {/* Cards Template */}
                {policyTemplate === 'cards' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {admissionPolicy.map((policyPoint, index) => (
                      <Card key={index} variant="elevated" className="bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <p className="flex-1 text-gray-700 leading-relaxed">{policyPoint}</p>
                        </div>
              </Card>
                    ))}
            </div>
                )}

                {/* Accordion Template */}
                {policyTemplate === 'accordion' && (
                  <div className="space-y-3">
                    {admissionPolicy.map((policyPoint, index) => (
                      <Card key={index} variant="elevated" className="bg-white overflow-hidden">
                        <details className="group">
                          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </div>
                              <span className="font-semibold text-gray-900">Policy Point {index + 1}</span>
                            </div>
                            <svg className="w-5 h-5 text-gray-500 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </summary>
                          <div className="px-6 pb-6 pt-2 border-t">
                            <p className="text-gray-700 leading-relaxed">{policyPoint}</p>
                          </div>
                        </details>
              </Card>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Card variant="elevated" className="p-12 text-center bg-gray-50 max-w-3xl mx-auto">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
            </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Admission Policy Coming Soon
                </h3>
                <p className="text-gray-600 mb-6">
                  Our detailed admission policy will be available here soon. Please contact the admissions office for more information.
                </p>
                <Button variant="outline" size="lg">
                  Contact Admissions Office
                </Button>
              </Card>
            )}
            
            {/* Admission Rules from Backend */}
            {schoolProfile?.profile?.rules?.admission && Array.isArray(schoolProfile.profile.rules.admission) && schoolProfile.profile.rules.admission.length > 0 && (
              <div className="mt-12">
                <Card variant="elevated" className="p-8 max-w-5xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <span className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </span>
                    Admission Rules & Guidelines
                  </h3>
                <ul className="space-y-4">
                    {schoolProfile.profile.rules.admission.map((rule, index) => (
                      <li key={index} className="flex items-start gap-4 text-gray-700">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-base font-bold mt-0.5">
                          {index + 1}
                        </span>
                        <span className="flex-1 leading-relaxed text-lg">{rule}</span>
                  </li>
                    ))}
                </ul>
              </Card>
            </div>
            )}
          </div>
        </section>
      )}

      {/* FAQ - Dynamic from Backend */}
      {activeTab === 'faq' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Find answers to common questions about our admission process, requirements, and policies.
              </p>
            </div>
            
            {admissionFaqs.length > 0 ? (
              <div className="max-w-6xl mx-auto">
                {/* Grid Template (Default) */}
                {faqsTemplate === 'grid' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[...admissionFaqs].sort((a, b) => a.order - b.order).map((faq, index) => (
                      <Card key={index} variant="elevated" className="bg-white hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">Q{index + 1}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                              {faq.question}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
              </Card>
                    ))}
                  </div>
                )}

                {/* Accordion Template */}
                {faqsTemplate === 'accordion' && (
                  <div className="max-w-4xl mx-auto space-y-3">
                    {[...admissionFaqs].sort((a, b) => a.order - b.order).map((faq, index) => (
                      <Card key={index} variant="elevated" className="bg-white overflow-hidden">
                        <details className="group">
                          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-purple-50 transition-colors duration-200">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-sm">Q{index + 1}</span>
                              </div>
                              <span className="font-bold text-gray-900 text-left">{faq.question}</span>
                            </div>
                            <svg className="w-5 h-5 text-gray-500 transition-transform duration-200 group-open:rotate-180 flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </summary>
                          <div className="px-6 pb-6 pt-2 border-t bg-gray-50">
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{faq.answer}</p>
                          </div>
                        </details>
              </Card>
                    ))}
                  </div>
                )}

                {/* List Template */}
                {faqsTemplate === 'list' && (
                  <div className="max-w-4xl mx-auto space-y-6">
                    {[...admissionFaqs].sort((a, b) => a.order - b.order).map((faq, index) => (
                      <Card key={index} variant="elevated" className="bg-white hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-sm">Q{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                              {faq.question}
                            </h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
              </Card>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Card variant="elevated" className="p-12 text-center bg-gray-50 max-w-3xl mx-auto">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  FAQs Coming Soon
                </h3>
                <p className="text-gray-600 mb-6">
                  Frequently asked questions will be available here. For now, please contact our admissions office.
                </p>
                <Button variant="outline" size="lg">
                  Contact Admissions Office
                </Button>
              </Card>
            )}
            
            <div className="mt-12 text-center">
              <Card variant="elevated" className="p-6 bg-purple-50 border border-purple-200 max-w-3xl mx-auto">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Still Have Questions?
                </h3>
                <p className="text-gray-600 mb-4">
                  Can&apos;t find the answer you&apos;re looking for? Our admissions team is here to help!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {admissionContact.phone && (
                    <Button variant="outline" size="lg" className="group hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 transition-all duration-200">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call: {admissionContact.phone}
                    </Button>
                  )}
                  {admissionContact.email && (
                    <Button variant="outline" size="lg" className="group hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 transition-all duration-200">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email: {admissionContact.email}
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Apply?
          </h2>
          <p className="text-xl mb-8 max-w-4xl mx-auto leading-relaxed text-slate-200">
            Start your child&apos;s educational journey with us. Our admissions team is here to guide you through every step of the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-slate-700 hover:bg-gray-100 shadow-lg group">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Start Application
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-700 shadow-lg group">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule a Visit
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 
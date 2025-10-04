'use client';

import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { 
  schoolApi
} from '../../services/api';
import { 
  SchoolInfo,
  Program
} from '../../types/school';
import { 
  mockSchoolInfo,
  mockPrograms
} from '../../data/mockData';

import Image from 'next/image';
export default function Admissions() {
  const [schoolInfo, setSchoolInfo] = React.useState<SchoolInfo | null>(mockSchoolInfo);
  const [activeTab, setActiveTab] = useState('process');
  const [programs] = React.useState<Program[]>(mockPrograms);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const school = await schoolApi.getSchoolInfo();
        setSchoolInfo(school);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Use mock data as fallback
        setSchoolInfo(mockSchoolInfo);
      }
    };

    fetchData();
  }, []);

  const admissionSteps = [
    {
      step: 1,
      title: "Admission Inquiry (January)",
      description: "Admission process begins in the first week of January. Contact us to learn about our programs and schedule a campus visit.",
      duration: "First week of January",
      requirements: ["Initial contact", "Information request", "Campus tour scheduling", "Age verification for L.K.G."]
    },
    {
      step: 2,
      title: "Application Submission",
      description: "Complete and submit the application form with all required documents. For L.K.G. admission, age must be as per NEP 2020 guidelines.",
      duration: "January - February",
      requirements: ["Application form", "Birth certificate", "Previous school records (if applicable)", "Health records", "Application fee"]
    },
    {
      step: 3,
      title: "Documentation Review",
      description: "For Class 2 or higher, provide School Leaving Certificate, PEN Number, and APAAR ID from previous institution.",
      duration: "February - March",
      requirements: ["School Leaving Certificate", "PEN Number", "APAAR ID", "Academic records", "Transfer certificate"]
    },
    {
      step: 4,
      title: "Merit-Based Selection",
      description: "Management evaluates applications based on overall merit. No donations, recommendations, or influence accepted.",
      duration: "March - April",
      requirements: ["Merit evaluation", "Management review", "Seat availability check", "Eligibility verification"]
    },
    {
      step: 5,
      title: "Admission Confirmation",
      description: "Complete enrollment process for the new academic session. No mid-session admissions allowed.",
      duration: "April - May",
      requirements: ["Admission confirmation", "Fee payment", "Document submission", "Academic session preparation"]
    }
  ];

  const requirements = [
    {
      category: "L.K.G. Admission Requirements",
      items: [
        "Age as per NEP 2020 (New Education Policy) guidelines",
        "Birth certificate with date of birth verification",
        "Health and immunization records",
        "Completed application form",
        "Recent photographs (passport size)"
      ]
    },
    {
      category: "Higher Class Requirements (Class 2+)",
      items: [
        "School Leaving Certificate from previous institution",
        "PEN Number (Permanent Education Number)",
        "APAAR ID (Automated Permanent Academic Account Registry)",
        "Transfer Certificate from last school",
        "Previous academic records and transcripts"
      ]
    },
    {
      category: "Program-Specific Requirements",
      items: programs.slice(0, 3).map(program => `${program.name}: ${program.requirements.join(', ')}`)
    }
  ];

  const importantDates = [
    {
      period: "Academic Year 2024-25",
      dates: [
        { event: "Admission Process Begins", date: "First week of January 2024" },
        { event: "L.K.G. Applications Open", date: "January 1-15, 2024" },
        { event: "Higher Class Applications (if seats available)", date: "January 15 - February 15, 2024" },
        { event: "Document Submission Deadline", date: "March 15, 2024" },
        { event: "Merit Evaluation & Selection", date: "March 16 - April 15, 2024" },
        { event: "Admission Results Announcement", date: "April 20, 2024" },
        { event: "Fee Payment & Documentation", date: "April 21 - May 15, 2024" },
        { event: "Academic Year Begins", date: "July 1, 2024" }
      ]
    }
  ];

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

      {/* Application Process */}
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
            
            <div className="space-y-8">
              {admissionSteps.map((step, index) => (
                <Card key={step.step} variant="elevated" className="relative bg-white hover:shadow-xl transition-all duration-300 border-l-4 border-l-slate-500">
                  <div className="flex flex-col lg:flex-row items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-slate-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                        {step.step}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 lg:mb-0">
                          {step.title}
                        </h3>
                        <span className="inline-block bg-slate-100 text-slate-800 text-sm font-medium px-3 py-1 rounded-md">
                          {step.duration}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          Requirements:
                        </h4>
                        <ul className="space-y-1">
                          {step.requirements.map((requirement, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              {requirement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Requirements */}
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
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {requirements.map((category, index) => (
                <Card key={index} variant="elevated" className="h-fit bg-white hover:shadow-xl transition-all duration-300 border-l-4 border-l-emerald-500">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                    {category.category}
                  </h3>
                  <ul className="space-y-3">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
            
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
                  <Button variant="outline" size="lg" className="group hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition-all duration-200">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Checklist
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

      {/* Important Dates */}
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {importantDates.map((period, index) => (
                <Card key={index} variant="elevated" className="bg-white hover:shadow-xl transition-all duration-300 border-l-4 border-l-amber-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {period.period}
                  </h3>
                  <div className="space-y-3">
                    {period.dates.map((date, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="text-gray-700 font-medium text-sm">{date.event}</span>
                        <span className="text-amber-600 font-semibold text-sm">{date.date}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Card variant="elevated" className="p-6 bg-amber-50 border border-amber-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Important Notice: {schoolInfo?.name || 'St. Joseph Catholic School'} Admission Policy
                </h3>
                <p className="text-gray-600 mb-4">
                  As a minority institution, {schoolInfo?.name || 'St. Joseph Catholic School'} has the constitutional right to admit students according to our policy. <strong>Admissions begin in the first week of January</strong> and are primarily for L.K.G. class. Higher class admissions are considered only if vacancies are available. No mid-session admissions are allowed.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" size="lg" className="group hover:bg-amber-50 hover:border-amber-200 hover:text-amber-600 transition-all duration-200">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Download Admission Calendar
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="lg" className="group hover:bg-amber-50 hover:border-amber-200 hover:text-amber-600 transition-all duration-200">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Contact Admissions Office
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
                    <Image
                      src={program.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'} 
                      alt={program.name}
                      className="w-full h-40 object-cover"
                    />
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

      {/* Admission Policy */}
      {activeTab === 'policy' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Admission Policy
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                St. Joseph&apos;s Catholic School is a minority institution with specific admission rights and policies as per the Constitution of India.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <Card variant="elevated" className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Minority Institution Rights</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">Right to admit and retain students according to school policy</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">Constitutional right upheld by Supreme Court of India</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">Compliance with RTE provisions and appropriate authority instructions</span>
                  </li>
                </ul>
              </Card>

              <Card variant="elevated" className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Admission Guidelines</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">Admission process begins first week of January</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">Primary focus on L.K.G. class admissions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">Higher classes only if vacancies available</span>
                  </li>
                </ul>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card variant="elevated" className="p-8 bg-red-50 border-red-200">
                <h3 className="text-2xl font-bold text-red-800 mb-6">⚠️ Important Warnings</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-red-700 font-medium">Any pressure for admission by offers of donation will disqualify the candidate</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-red-700 font-medium">Letters of recommendation or influence of any nature will disqualify the candidate</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-red-700 font-medium">No individual connected with the school is authorized to accept any emoluments for admission</span>
                  </li>
                </ul>
              </Card>

              <Card variant="elevated" className="p-8 bg-blue-50 border-blue-200">
                <h3 className="text-2xl font-bold text-blue-800 mb-6">✅ Merit-Based Selection</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-blue-700">Admissions done solely by management based on overall merit</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-blue-700">Age limit for L.K.G. as prescribed by NEP 2020</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-blue-700">Date of birth cannot be altered once admitted</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {activeTab === 'faq' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Find answers to common questions about our admission process, requirements, and policies.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card variant="elevated">
                <h3 className="text-lg font-bold text-gray-900 mb-4">When does the admission process begin?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The admission process begins in the first week of January every year. Applications are primarily accepted for L.K.G. class, with higher class admissions only if vacancies are available.
                </p>
              </Card>
              
              <Card variant="elevated">
                <h3 className="text-lg font-bold text-gray-900 mb-4">What is the age requirement for L.K.G.?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The age limit for L.K.G. admission is as prescribed by the NEP 2020 (New Education Policy). Please contact us for specific age requirements for the current academic year.
                </p>
              </Card>
              
              <Card variant="elevated">
                <h3 className="text-lg font-bold text-gray-900 mb-4">What documents are required for Class 2+ admission?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  For Class 2 or higher, you must provide a School Leaving Certificate, PEN Number, and APAAR ID from your previous institution. The child&apos;s date of birth cannot be altered once admitted.
                </p>
              </Card>
              
              <Card variant="elevated">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Can I apply for mid-session admission?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  No, admission is taken only at the beginning of the academic session. There is no admission between academic sessions or after the admission process is officially closed.
                </p>
              </Card>
              
              <Card variant="elevated">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Is St. Joseph&apos;s a minority institution?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes, St. Joseph&apos;s Catholic School is a minority institution with the constitutional right to admit students according to our policy, as upheld by the Supreme Court of India.
                </p>
              </Card>
              
              <Card variant="elevated">
                <h3 className="text-lg font-bold text-gray-900 mb-4">How are admissions decided?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Admissions are done solely by the management based on the overall merit of the applicant. Any pressure through donations, recommendations, or influence will automatically disqualify the candidate.
                </p>
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
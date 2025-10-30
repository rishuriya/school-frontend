'use client';

import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Leadership from '../../components/sections/Leadership';
import schoolProfileService from '../../services/schoolProfileService';
import { APP_CONFIG } from '../../config/app';
import { 
  mockSchoolInfo,
  leadershipData,
  aboutContent,
  coreValues,
  facilities
} from '../../data/mockData';
import { 
  SchoolInfo, 
  Leadership as LeadershipType,
  AboutContent as AboutContentType,
  CoreValue,
  Facility,
  SchoolProfile
} from '../../types/school';
import Image from 'next/image';
export default function About() {
  const [schoolProfile, setSchoolProfile] = React.useState<SchoolProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [schoolInfo, setSchoolInfo] = React.useState<SchoolInfo | null>(null);
  const [leadership, setLeadership] = React.useState<LeadershipType[]>([]);
  const [aboutContentData, setAboutContentData] = React.useState<AboutContentType[]>([]);
  const [coreValuesData, setCoreValuesData] = React.useState<CoreValue[]>([]);
  const [facilitiesData, setFacilitiesData] = React.useState<Facility[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch school profile from backend
        const profile = await schoolProfileService.getSchoolProfileById(APP_CONFIG.school.id);
        setSchoolProfile(profile);
        
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
        
        // Fetch teachers for leadership
        const baseUrl = APP_CONFIG.api.baseUrl;
        const schoolId = profile._id;
        
        try {
          const teachersRes = await fetch(`${baseUrl}/public/school/${schoolId}/teachers`);
          if (teachersRes.ok) {
            const teachersData = await teachersRes.json();
            if (teachersData.success && teachersData.data) {
              const mappedLeadership: LeadershipType[] = teachersData.data
                .filter((teacher: { message?: string }) => teacher.message)
                .map((teacher: { _id: string; firstName: string; lastName: string; position?: string; profileImage?: string; message?: string; email?: string; phone?: string; experience?: number; achievements?: string[] }) => ({
                  id: teacher._id,
                  name: `${teacher.firstName} ${teacher.lastName}`,
                  position: teacher.position || 'Teacher',
                  image: teacher.profileImage || undefined,
                  message: teacher.message || 'Dedicated to student excellence.',
                  email: teacher.email,
                  phone: teacher.phone,
                  experience: teacher.experience ? `${teacher.experience}+ years of experience` : 'New to the team',
                  achievements: teacher.achievements || [],
                }));
              setLeadership(mappedLeadership.length > 0 ? mappedLeadership : leadershipData);
            } else {
              setLeadership(leadershipData);
            }
          } else {
            setLeadership(leadershipData);
          }
        } catch (error) {
          console.error('Failed to fetch teachers:', error);
          setLeadership(leadershipData);
        }
        
        // Map facilities from backend
        if (profile.profile?.facilities && profile.profile.facilities.length > 0) {
          const mappedFacilities: Facility[] = profile.profile.facilities.map((facility: { name: string; description: string; icon?: string; image?: string }, index: number) => ({
            id: `facility-${index + 1}`,
            name: facility.name,
            description: facility.description,
            image: facility.image,
            features: [facility.description], // Use description as feature for now
            capacity: undefined,
            order: index + 1,
          }));
          setFacilitiesData(mappedFacilities);
        } else {
          setFacilitiesData(facilities);
        }
        
        // Map core values from backend
        if (profile.profile?.coreValues && profile.profile.coreValues.length > 0) {
          const colorOptions = ['bg-rose-500', 'bg-slate-500', 'bg-emerald-500', 'bg-violet-500'];
          const mappedCoreValues: CoreValue[] = profile.profile.coreValues
            .filter(value => value.show)
            .sort((a, b) => a.order - b.order)
            .map((value, index) => ({
              id: `value-${index + 1}`,
              icon: value.emoji || value.icon || 'star',
              title: value.title,
              description: value.description,
              color: colorOptions[index % colorOptions.length],
              order: value.order
            }));
          setCoreValuesData(mappedCoreValues.length > 0 ? mappedCoreValues : coreValues);
        } else {
          setCoreValuesData(coreValues);
        }
        
        // Use mock data for about content (not in backend yet)
        setAboutContentData(aboutContent);
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch school data:', error);
        // Fallback to mock data
    setSchoolInfo(mockSchoolInfo);
    setLeadership(leadershipData);
    setAboutContentData(aboutContent);
    setCoreValuesData(coreValues);
    setFacilitiesData(facilities);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle smooth scrolling to sections
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Handle initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Helper function to get content by section
  const getContentBySection = (section: string) => {
    // First try from aboutContentData (mock data for now)
    const mockContent = aboutContentData.find(content => content.section === section && content.isActive);
    
    // Override with backend data if available
    if (schoolProfile?.profile) {
      if (section === 'mission' && schoolProfile.profile.mission) {
        return { ...mockContent, content: schoolProfile.profile.mission, title: 'Our Mission' };
      }
      if (section === 'vision' && schoolProfile.profile.vision) {
        return { ...mockContent, content: schoolProfile.profile.vision, title: 'Our Vision' };
      }
    }
    
    return mockContent;
  };

  // Helper function to get icon component
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactElement } = {
      'check-circle': (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      'users': (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      'heart': (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      'lightning-bolt': (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    };
    return iconMap[iconName] || iconMap['check-circle'];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading about information...</p>
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
            About <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Us</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Transparent about us for quality education
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
              🧑‍🧑‍🧒 About Us
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
              🤳 Story
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
              🎓 Mission
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
              👀 Vision
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
              ⚽️ Goals
            </div>
          </div>
        </div>
      </section>

      {/* About Cards Section */}
      {schoolProfile?.profile?.aboutCards && schoolProfile.profile.aboutCards.filter(card => card.show).length > 0 && (() => {
        const visibleCards = schoolProfile.profile.aboutCards!
          .filter(card => card.show)
          .sort((a, b) => a.order - b.order);
        
        const layoutTemplate = schoolProfile.profile.layout?.sections?.aboutCards?.template || 'story';
        
        // Story Layout (like "Our Story" - alternating left/right)
        if (layoutTemplate === 'story') {
          return (
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
                {visibleCards.map((card, index) => {
                  const getIconComponent = (iconName?: string) => {
                    switch (iconName?.toLowerCase()) {
                      case 'history':
                        return (
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        );
                      case 'values':
                        return (
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        );
                      case 'vision':
                        return (
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        );
                      case 'mission':
                        return (
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        );
                      case 'team':
                        return (
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        );
                      case 'innovation':
                        return (
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        );
                      default:
                        return (
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        );
                    }
                  };

                  const isEven = index % 2 === 0;
                  
                  return (
                    <div key={`about-card-${index}`} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      {/* Content - Left side for even, right side for odd */}
                      <div className={isEven ? 'order-1' : 'order-1 lg:order-2'}>
                        <div className="flex items-center gap-4 mb-6">
                          {card.icon && (
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                              {getIconComponent(card.icon)}
                            </div>
                          )}
                        </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                          {card.title}
                </h2>
                        <p className="text-xl text-gray-600 leading-relaxed whitespace-pre-line">
                          {card.content}
                        </p>
                      </div>
                      
                      {/* Image - Right side for even, left side for odd */}
                      {card.showImage && (card.imageUrl || card.image) && (
                        <div className={isEven ? 'order-2' : 'order-2 lg:order-1'}>
                          <div className="relative">
                            <div className="w-full h-96 bg-gray-100 rounded-2xl overflow-hidden">
                              <Image
                                src={card.imageUrl || card.image || ''}
                                alt={card.title}
                                width={600}
                                height={400}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {card.icon && (
                              <div className={`absolute ${isEven ? '-bottom-6 -left-6' : '-bottom-6 -right-6'} w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg`}>
                                <div className="text-white">
                                  {getIconComponent(card.icon)}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        }
        
        // Grid Layout (3 columns)
        if (layoutTemplate === 'grid') {
          return (
            <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {visibleCards.map((card, index) => {
                    const getIconComponent = (iconName?: string) => {
                      switch (iconName?.toLowerCase()) {
                        case 'history':
                          return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
                        case 'values':
                          return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
                        case 'vision':
                          return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
                        case 'mission':
                          return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
                        case 'team':
                          return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
                        case 'innovation':
                          return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
                        default:
                          return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
                      }
                    };
                    
                    return (
                      <Card key={`about-card-${index}`} className="group hover:shadow-2xl transition-all duration-300">
                        {card.showImage && (card.imageUrl || card.image) && (
                          <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg overflow-hidden">
                            <Image
                              src={card.imageUrl || card.image || ''}
                              alt={card.title}
                              width={400}
                              height={200}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            {card.icon && (
                              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                                {getIconComponent(card.icon)}
                              </div>
                            )}
                            <h3 className="text-2xl font-bold text-gray-900">{card.title}</h3>
                  </div>
                          <p className="text-gray-600 leading-relaxed whitespace-pre-line">{card.content}</p>
                  </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        }
        
        // Masonry Layout (2 columns with varying heights)
        if (layoutTemplate === 'masonry') {
          return (
            <section className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="columns-1 md:columns-2 gap-8 space-y-8">
                  {visibleCards.map((card, index) => {
                    const getIconComponent = (iconName?: string) => {
                      switch (iconName?.toLowerCase()) {
                        case 'history':
                          return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
                        case 'values':
                          return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
                        case 'vision':
                          return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
                        case 'mission':
                          return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
                        case 'team':
                          return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
                        case 'innovation':
                          return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
                        default:
                          return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
                      }
                    };
                    
                    return (
                      <div key={`about-card-${index}`} className="break-inside-avoid mb-8">
                        <Card className="overflow-hidden">
                          {card.showImage && (card.imageUrl || card.image) && (
                            <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100">
                  <Image
                                src={card.imageUrl || card.image || ''}
                                alt={card.title}
                                width={500}
                                height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                          )}
                          <div className="p-6">
                            {card.icon && (
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mb-4">
                                {getIconComponent(card.icon)}
                              </div>
                            )}
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{card.content}</p>
                          </div>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        }
        
        // Timeline Layout (vertical with connector)
        if (layoutTemplate === 'timeline') {
          return (
            <section className="py-20 bg-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>
                  
                  <div className="space-y-12">
                    {visibleCards.map((card, index) => {
                      const getIconComponent = (iconName?: string) => {
                        switch (iconName?.toLowerCase()) {
                          case 'history':
                            return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
                          case 'values':
                            return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
                          case 'vision':
                            return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
                          case 'mission':
                            return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
                          case 'team':
                            return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
                          case 'innovation':
                            return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
                          default:
                            return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
                        }
                      };
                      
                      return (
                        <div key={`about-card-${index}`} className="relative flex items-start gap-8">
                          {/* Timeline dot with icon */}
                          <div className="relative z-10 flex-shrink-0">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                              {card.icon ? getIconComponent(card.icon) : <span className="text-xl font-bold">{index + 1}</span>}
                            </div>
                          </div>
                          
                          {/* Card content */}
                          <div className="flex-1 pb-8">
                            <Card className="p-6">
                              <h3 className="text-2xl font-bold text-gray-900 mb-3">{card.title}</h3>
                              <p className="text-gray-600 leading-relaxed whitespace-pre-line mb-4">{card.content}</p>
                              {card.showImage && (card.imageUrl || card.image) && (
                                <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden mt-4">
                                  <Image
                                    src={card.imageUrl || card.image || ''}
                                    alt={card.title}
                                    width={600}
                                    height={200}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                            </Card>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        </section>
          );
        }
        
        // Default to grid if template not recognized
        return null;
      })()}

      

      {/* Mission & Vision Section - Show if at least one exists and is enabled */}
      {((schoolProfile?.profile?.mission && schoolProfile.profile.layout?.sections?.mission?.show !== false) ||
        (schoolProfile?.profile?.vision && schoolProfile.profile.layout?.sections?.vision?.show !== false)) && (
      <section id="mission" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We are driven by a clear mission and guided by an inspiring vision that shapes everything we do.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {schoolProfile?.profile?.mission && schoolProfile.profile.layout?.sections?.mission?.show !== false && (
              <Card variant="elevated" className="text-center group bg-white">
                <div className="w-20 h-20 bg-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                    {schoolProfile.profile.mission}
                </p>
              </Card>
            )}
            
              {schoolProfile?.profile?.vision && schoolProfile.profile.layout?.sections?.vision?.show !== false && (
              <Card variant="elevated" className="text-center group bg-white">
                <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                    {schoolProfile.profile.vision}
                </p>
              </Card>
            )}
          </div>
        </div>
      </section>
      )}

      {/* Goals Section - Only show if goals exist and section is enabled */}
      {schoolProfile?.profile?.goals && schoolProfile.profile.goals.length > 0 && 
       schoolProfile.profile.layout?.sections?.goals?.show !== false && (() => {
        // Helper to get goal text (handles both old string format and new object format)
        const getGoalText = (goal: any) => typeof goal === 'string' ? goal : goal.text;
        const getGoalIcon = (goal: any) => typeof goal === 'object' ? goal.icon : null;
        const sortedGoals = Array.isArray(schoolProfile.profile.goals) 
          ? (typeof schoolProfile.profile.goals[0] === 'object'
              ? [...schoolProfile.profile.goals].sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
              : schoolProfile.profile.goals)
          : [];
        
        const renderGoalIcon = (goal: any, index: number, bgClass: string) => {
          const icon = getGoalIcon(goal);
          if (icon) {
            // Check if it's an emoji
            if (icon.match(/[\u{1F300}-\u{1F9FF}]/u)) {
              return <span className="text-4xl">{icon}</span>;
            }
            // Otherwise render as icon name
            return (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {icon === 'target' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 110 20 10 10 0 010-20zm0 4a6 6 0 100 12 6 6 0 000-12zm0 2a4 4 0 110 8 4 4 0 010-8z" />}
                {icon === 'star' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />}
                {icon === 'rocket' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                {icon === 'lightbulb' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />}
                {icon === 'trophy' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />}
                {!icon || (!['target', 'star', 'rocket', 'lightbulb', 'trophy'].includes(icon)) && <span className="text-white font-bold text-xl">{index + 1}</span>}
              </svg>
            );
          }
          return <span className="text-white font-bold text-xl">{index + 1}</span>;
        };
        
        return (
      <section id="goals" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Goals
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our strategic goals that guide our educational mission and community development.
            </p>
          </div>
          
            {/* Render based on selected template */}
            {schoolProfile.profile.layout?.sections?.goals?.template === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {sortedGoals.map((goal, index) => (
                  <Card key={index} variant="elevated" className="text-center group bg-white">
                    <div className={`w-16 h-16 ${
                      index % 4 === 0 ? 'bg-purple-600' :
                      index % 4 === 1 ? 'bg-slate-500' :
                      index % 4 === 2 ? 'bg-green-600' :
                      'bg-orange-600'
                    } rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {renderGoalIcon(goal, index, '')}
                  </div>
                    <p className="text-gray-600 leading-relaxed text-sm">{getGoalText(goal)}</p>
                </Card>
                ))}
              </div>
            )}
            
            {schoolProfile.profile.layout?.sections?.goals?.template === 'list' && (
              <div className="max-w-3xl mx-auto space-y-4">
                {sortedGoals.map((goal, index) => (
                  <Card key={index} variant="elevated" className="bg-white">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        {renderGoalIcon(goal, index, 'bg-blue-600')}
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-1">{getGoalText(goal)}</p>
                  </div>
                </Card>
                ))}
              </div>
            )}
            
            {schoolProfile.profile.layout?.sections?.goals?.template === 'timeline' && (
              <div className="max-w-4xl mx-auto">
                {sortedGoals.map((goal, index) => (
                  <div key={index} className="flex gap-6 mb-8 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {renderGoalIcon(goal, index, 'bg-blue-600')}
                      </div>
                      {index < sortedGoals.length - 1 && (
                        <div className="w-0.5 h-full bg-blue-200 mt-2"></div>
                      )}
                    </div>
                    <Card variant="elevated" className="flex-1 bg-white">
                      <p className="text-gray-700 leading-relaxed">{getGoalText(goal)}</p>
                    </Card>
                  </div>
                ))}
              </div>
            )}
            
            {(!schoolProfile.profile.layout?.sections?.goals?.template || 
              schoolProfile.profile.layout?.sections?.goals?.template === 'cards') && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedGoals.map((goal, index) => {
                  const colors = [
                    { bg: 'bg-blue-600', border: 'border-blue-200', gradient: 'from-blue-50 to-blue-100' },
                    { bg: 'bg-green-600', border: 'border-green-200', gradient: 'from-green-50 to-green-100' },
                    { bg: 'bg-purple-600', border: 'border-purple-200', gradient: 'from-purple-50 to-purple-100' },
                  ];
                  const color = colors[index % 3];
                  
                  return (
                    <Card key={index} variant="elevated" className={`text-center group bg-gradient-to-br ${color.gradient} border-2 ${color.border}`}>
                      <div className={`w-16 h-16 ${color.bg} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300`}>
                        {renderGoalIcon(goal, index, color.bg)}
                  </div>
                      <p className="text-gray-700 leading-relaxed font-medium">{getGoalText(goal)}</p>
                </Card>
                  );
                })}
              </div>
            )}
        </div>
      </section>
        );
      })()}

      {/* Core Values Section */}
      <section id="values" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              These fundamental principles guide our actions and shape the culture of our school community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValuesData.map((value) => (
              <Card key={value.id} variant="elevated" className="text-center group bg-white">
                <div className={`w-16 h-16 ${
                  value.id === "1" ? "bg-rose-500" :
                  value.id === "2" ? "bg-slate-500" :
                  value.id === "3" ? "bg-emerald-500" :
                  "bg-violet-500"
                } rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {getIconComponent(value.icon)}
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <Leadership leaders={leadership} />

      {/* Facilities Section - Only show if facilities exist and section is enabled */}
      {facilitiesData && facilitiesData.length > 0 && 
       schoolProfile?.profile?.layout?.sections?.facilities?.show !== false && (
      <section id="facilities" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Facilities
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              State-of-the-art facilities designed to provide the best learning environment for our students.
            </p>
          </div>
          
            <div className={`grid gap-8 ${
              schoolProfile?.profile?.layout?.sections?.facilities?.template === 'list' ? 'grid-cols-1 max-w-3xl mx-auto' :
              schoolProfile?.profile?.layout?.sections?.facilities?.template === 'masonry' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
            {facilitiesData.map((facility) => (
              <Card key={facility.id} variant="elevated" className="group bg-white">
                <div className="h-48 bg-gray-100 rounded-xl mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                  {facility.image ? (
                    <Image
                      src={facility.image}
                      alt={facility.name}
                      width={400}
                      height={400}
                        className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500">{facility.name} Image</span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{facility.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{facility.description}</p>
                <div className="space-y-2">
                    {facility.features && facility.features.slice(0, 2).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                  {facility.capacity && (
                    <div className="text-sm text-gray-500 font-medium">
                      Capacity: {facility.capacity}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      )}

      <Footer />
    </div>
  );
} 
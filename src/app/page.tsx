'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Carousel from '../components/ui/Carousel';
import Leadership from '../components/sections/Leadership';
import GoalsSection from '../components/sections/GoalsSection';
import Image from 'next/image';
import schoolProfileService from '../services/schoolProfileService';
import { aboutApi, announcementsApi, getMediaUrl } from '../services/api';
import Modal from '../components/ui/Modal';
import { APP_CONFIG } from '../config/app';
import { SchoolProfile } from '../types/school';
// Import mock data as fallback
import {
  mockPrograms
} from '../data/mockData';
import {
  SchoolInfo,
  NewsItem,
  Event,
  Student,
  Program,
  Leadership as LeadershipType
} from '../types/school';

interface CarouselItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export default function Home() {
  const [schoolProfile, setSchoolProfile] = React.useState<SchoolProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [schoolInfo, setSchoolInfo] = React.useState<SchoolInfo | null>(null);
  const [carousels, setCarousels] = React.useState<CarouselItem[]>([]);
  const [news, setNews] = React.useState<NewsItem[]>([]);
  const [events, setEvents] = React.useState<Event[]>([]);
  const [leadership, setLeadership] = React.useState<LeadershipType[]>([]);
  const [students, setStudents] = React.useState<Student[]>([]);
  const [programs, setPrograms] = React.useState<Program[]>([]);

  // Modal state
  const [selectedNews, setSelectedNews] = React.useState<NewsItem | null>(null);
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);

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
          tagline: profile.moto || 'Excellence in Education',
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

        // Fetch data from backend
        const baseUrl = APP_CONFIG.api.baseUrl;
        const schoolId = profile._id;

        // Fetch carousels
        try {
          const carouselsRes = await fetch(`${baseUrl}/public/school/${schoolId}/carousels`);
          if (carouselsRes.ok) {
            const carouselsData = await carouselsRes.json();
            if (carouselsData.success && carouselsData.data) {
              const mappedCarousels: CarouselItem[] = carouselsData.data.map((carousel: { _id: string; image: string; title: string; subtitle?: string; description: string; ctaText?: string; ctaLink?: string }) => ({
                id: carousel._id,
                image: getMediaUrl(carousel.image) || '',
                title: carousel.title,
                subtitle: carousel.subtitle || '',
                description: carousel.description,
                ctaText: carousel.ctaText || 'Learn More',
                ctaLink: carousel.ctaLink || '#',
              })) as CarouselItem[];
              setCarousels(mappedCarousels.length > 0 ? mappedCarousels : []);
            } else {
              setCarousels([]);
            }
          } else {
            setCarousels([]);
          }
        } catch (error) {
          console.error('Failed to fetch carousels:', error);
          setCarousels([]);
        }

        // Fetch announcements (convert to news format)
        try {
          const mappedNews = await announcementsApi.getAnnouncements(3);
          setNews(mappedNews);
        } catch (error) {
          console.error('Failed to fetch announcements:', error);
          setNews([]);
        }

        // Fetch events
        try {
          const eventsRes = await fetch(`${baseUrl}/public/school/${schoolId}/events?limit=3`);
          if (eventsRes.ok) {
            const eventsData = await eventsRes.json();
            if (eventsData.success && eventsData.data) {
              const mappedEvents: Event[] = eventsData.data.map((evt: { _id: string; title: string; description: string; startDate: string; location?: string; category?: string; imageUrl?: string }) => ({
                id: evt._id,
                title: evt.title,
                description: evt.description,
                date: new Date(evt.startDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }),
                time: new Date(evt.startDate).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                }),
                location: evt.location || 'School Campus',
                category: evt.category || 'general',
                image: getMediaUrl(evt.imageUrl),
              }));
              setEvents(mappedEvents.length > 0 ? mappedEvents : []);
            } else {
              setEvents([]);
            }
          } else {
            setEvents([]);
          }
        } catch (error) {
          console.error('Failed to fetch events:', error);
          setEvents([]);
        }

        // Fetch teachers for leadership (filter those with messages/bio)
        try {
          const teachersRes = await fetch(`${baseUrl}/public/school/${schoolId}/teachers`);
          if (teachersRes.ok) {
            const teachersData = await teachersRes.json();
            if (teachersData.success && teachersData.data) {
              // Map teachers to leadership format (only those with message)
              // Show ALL teachers who have message (no limit)
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
                  achievements: teacher.achievements || [],
                }));
              setLeadership(mappedLeadership.length > 0 ? mappedLeadership : []);
            } else {
              setLeadership([]);
            }
          } else {
            setLeadership([]);
          }
        } catch (error) {
          console.error('Failed to fetch teachers:', error);
          setLeadership([]);
        }

        // Fetch student leaders
        try {
          const studentsRes = await fetch(`${baseUrl}/public/school/${schoolId}/student-leaders?limit=6`);
          if (studentsRes.ok) {
            const studentsData = await studentsRes.json();
            if (studentsData.success && studentsData.data) {
              const mappedStudents: Student[] = studentsData.data.map((student: { _id: string; firstName: string; lastName: string; class: string; section: string; leadershipRole?: string; profileImage?: string; message?: string; achievements?: string[] }) => ({
                id: student._id,
                name: `${student.firstName} ${student.lastName}`,
                class: student.class,
                section: student.section,
                achievement: student.leadershipRole || 'Student Leader',
                image: student.profileImage,
                description: student.message || 'Dedicated and hardworking student.',
                achievements: student.achievements || [],
              }));
              setStudents(mappedStudents.length > 0 ? mappedStudents : []);
            } else {
              setStudents([]);
            }
          } else {
            setStudents([]);
          }
        } catch (error) {
          console.error('Failed to fetch student leaders:', error);
          setStudents([]);
        }

        // Use mock data for programs (these would need to be added to backend)
        setPrograms(mockPrograms.slice(0, 3));

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch school data, using mock data:', error);
        // Fallback to mock data
        setSchoolInfo(null);
        setCarousels([]);
        setNews([]);
        setEvents([]);
        setLeadership([]);
        setStudents([]);
        setPrograms(mockPrograms.slice(0, 3));
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading school information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header overlay showTitle={false} />

      {/* Hero Section with Carousel */}
      <section className="relative">
        <Carousel
          items={carousels}
          autoPlay={true}
          interval={6000}
          showIndicators={true}
          showArrows={true}
          schoolName={schoolInfo?.name}
          city={schoolInfo?.city}
          schoolTagline={schoolInfo?.tagline}
          schoolLogo={schoolInfo?.logo}
        />
      </section>

      {/* Goals Section - Only show goals with icons */}
      {schoolProfile && (
        <GoalsSection
          profile={schoolProfile}
          showOnlyWithIcons={true}
          sectionTitle="Our Goals"
          sectionDescription="Strategic goals that guide our educational mission and community development."
        />
      )}

      {/* Leadership Section */}
      <Leadership leaders={leadership} />



      {/* News Section */}
      {news.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Latest News & Announcements
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Stay updated with the latest happenings, achievements, and important announcements from our school community.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {news.map((item, index) => (
                <Card
                  key={item.id}
                  variant="elevated"
                  className="group bg-white hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedNews(item)}
                >
                  <div className="relative">
                    {/* Main Image or Decorative Gradient */}
                    {item.image ? (
                      <div className="h-32 relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                      </div>
                    ) : (
                      <div className={`h-32 bg-gradient-to-br ${item.category === 'achievement' ? 'from-green-400 to-green-600' :
                        item.category === 'event' ? 'from-blue-400 to-blue-600' :
                          item.category === 'announcement' ? 'from-yellow-400 to-yellow-600' :
                            'from-gray-400 to-gray-600'
                        } flex items-center justify-center group-hover:scale-105 transition-transform duration-300 relative overflow-hidden`}>
                        {/* Pattern overlay */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                            backgroundSize: '24px 24px'
                          }}></div>
                        </div>

                        {/* Icon */}
                        <div className="relative z-10">
                          <div className={`w-20 h-20 rounded-full ${item.category === 'achievement' ? 'bg-green-700/20' :
                            item.category === 'event' ? 'bg-blue-700/20' :
                              item.category === 'announcement' ? 'bg-yellow-700/20' :
                                'bg-gray-700/20'
                            } backdrop-blur-sm flex items-center justify-center border-2 border-white/30`}>
                            {item.category === 'achievement' && (
                              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                              </svg>
                            )}
                            {item.category === 'event' && (
                              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            )}
                            {item.category === 'announcement' && (
                              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                              </svg>
                            )}
                            {item.category === 'general' && (
                              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="absolute top-4 left-4 z-20">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${item.category === 'achievement' ? 'bg-green-100/90 text-green-800 border border-green-200' :
                        item.category === 'event' ? 'bg-blue-100/90 text-blue-800 border border-blue-200' :
                          item.category === 'announcement' ? 'bg-yellow-100/90 text-yellow-800 border border-yellow-200' :
                            'bg-gray-100/90 text-gray-800 border border-gray-200'
                        }`}>
                        {item.category === 'achievement' && '🏆'}
                        {item.category === 'event' && '📅'}
                        {item.category === 'announcement' && '📢'}
                        {item.category === 'general' && '📰'}
                        <span className="ml-1 capitalize">{item.category}</span>
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                        <span className="text-xs font-medium text-gray-600">{item.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {item.content.substring(0, 120)}...
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>By {item.author}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/students/notices">
                <Button variant="outline" size="lg" className="group hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                  View All Notices
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Events Section */}
      {events.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Upcoming Events
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Join us for exciting events and activities that bring our school community together throughout the year.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <Card
                  key={event.id}
                  variant="elevated"
                  className="group bg-white hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="relative">
                    {/* Main Image or Decorative Gradient */}
                    {event.image ? (
                      <div className="h-32 relative overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                      </div>
                    ) : (
                      <div className={`h-32 bg-gradient-to-br ${event.category === 'academic' ? 'from-indigo-400 to-indigo-600' :
                        event.category === 'cultural' ? 'from-pink-400 to-pink-600' :
                          event.category === 'sports' ? 'from-orange-400 to-orange-600' :
                            event.category === 'community' ? 'from-teal-400 to-teal-600' :
                              'from-green-400 to-green-600'
                        } flex items-center justify-center group-hover:scale-105 transition-transform duration-300 relative overflow-hidden`}>
                        {/* Pattern overlay */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                            backgroundSize: '24px 24px'
                          }}></div>
                        </div>

                        {/* Icon */}
                        <div className="relative z-10">
                          <div className={`w-20 h-20 rounded-full ${event.category === 'academic' ? 'bg-indigo-700/20' :
                            event.category === 'cultural' ? 'bg-pink-700/20' :
                              event.category === 'sports' ? 'bg-orange-700/20' :
                                event.category === 'community' ? 'bg-teal-700/20' :
                                  'bg-green-700/20'
                            } backdrop-blur-sm flex items-center justify-center border-2 border-white/30`}>
                            {event.category === 'academic' && (
                              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            )}
                            {event.category === 'cultural' && (
                              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                            {event.category === 'sports' && (
                              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            )}
                            {event.category === 'community' && (
                              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            )}
                            {(!event.category || (event.category as string) === 'general') && (
                              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="absolute top-4 left-4 z-20">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm">
                        {event.category === 'academic' && '📚'}
                        {event.category === 'cultural' && '🎭'}
                        {event.category === 'sports' && '⚽'}
                        {event.category === 'community' && '🤝'}
                        <span className="ml-1 capitalize">{event.category || 'event'}</span>
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 border border-gray-200 shadow-sm">
                        <span className="text-xs font-medium text-gray-600">
                          {event.date ? event.date.split(',').slice(0, 1).join('').trim() : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full group-hover:bg-green-50 group-hover:border-green-200 group-hover:text-green-600 transition-all duration-200">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Register for Event
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/events">
                <Button variant="outline" size="lg" className="group hover:bg-green-50 hover:border-green-200 hover:text-green-600 transition-all duration-200">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  View All Events
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Students Section */}
      {students.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Student Achievements
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Celebrating the outstanding accomplishments and achievements of our talented students across various fields.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {students.map((student) => (
                <Card key={student.id} variant="elevated" className="text-center group bg-white hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                      {student.image ? (
                        <Image
                          src={student.image}
                          alt={student.name}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-white font-bold text-xl">
                              {student.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-gray-600 font-medium">Student Photo</span>
                        </div>
                      )}
                    </div>

                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 border border-gray-200">
                        <span className="text-xs font-medium text-gray-600">{student.grade}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-purple-600 transition-colors duration-200">
                      {student.name}
                    </h3>
                    <p className="text-purple-600 font-semibold mb-4 text-sm">{student.grade}</p>

                    {student.achievements && student.achievements.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {student.achievements.slice(0, 2).map((achievement, index) => (
                          <div key={index} className="text-xs text-gray-700 bg-purple-50 px-3 py-2 rounded-lg border border-purple-100">
                            <div className="flex items-center">
                              <svg className="w-3 h-3 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {achievement}
                            </div>
                          </div>
                        ))}
                        {student.achievements.length > 2 && (
                          <div className="text-xs text-purple-600 font-medium bg-purple-100 px-3 py-2 rounded-lg">
                            +{student.achievements.length - 2} more achievements
                          </div>
                        )}
                      </div>
                    )}

                    <Link href="/students">
                      <Button variant="outline" size="sm" className="group-hover:bg-purple-50 group-hover:border-purple-200 group-hover:text-purple-600 transition-all duration-200">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        View Profile
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/students">
                <Button variant="outline" size="lg" className="group hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 transition-all duration-200">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  View All Students
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
            Take the first step towards a brighter future. Apply now and become part of our exceptional learning community where Christian values and academic excellence come together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admissions">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg">
                Apply Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 shadow-lg">
                Schedule a Visit
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* News Detail Modal */}
      <Modal
        isOpen={!!selectedNews}
        onClose={() => setSelectedNews(null)}
        title={selectedNews?.title || 'Notice Details'}
      >
        {selectedNews && (
          <div className="space-y-6">
            {selectedNews.image && (
              <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-100">
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className={`px-3 py-1 rounded-full font-semibold ${selectedNews.category === 'achievement' ? 'bg-green-100 text-green-800' :
                selectedNews.category === 'event' ? 'bg-blue-100 text-blue-800' :
                  selectedNews.category === 'announcement' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                }`}>
                {selectedNews.category.charAt(0).toUpperCase() + selectedNews.category.slice(1)}
              </span>
              <span className="text-gray-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {selectedNews.date}
              </span>
              <span className="text-gray-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                By {selectedNews.author}
              </span>
            </div>

            <div className="prose prose-blue max-w-none text-gray-600">
              <div className="whitespace-pre-wrap leading-relaxed text-lg">
                {selectedNews.content}
              </div>
            </div>

            {selectedNews.attachments && selectedNews.attachments.length > 0 && (
              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  Attachments
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedNews.attachments.map((url, idx) => (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-white hover:border-blue-400 hover:text-blue-600 transition-all group"
                    >
                      <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Document {idx + 1}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Event Detail Modal */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title || 'Event Details'}
      >
        {selectedEvent && (
          <div className="space-y-6">
            {selectedEvent.image && (
              <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-100">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Date</p>
                  <p className="text-gray-900 font-semibold">{selectedEvent.date}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Time</p>
                  <p className="text-gray-900 font-semibold">{selectedEvent.time}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Location</p>
                  <p className="text-gray-900 font-semibold">{selectedEvent.location}</p>
                </div>
              </div>
            </div>

            <div className="prose prose-green max-w-none text-gray-600">
              <div className="whitespace-pre-wrap leading-relaxed text-lg">
                {selectedEvent.description}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white shadow-lg">
                Join Event
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

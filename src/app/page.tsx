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
                image: carousel.image,
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
          const announcementsRes = await fetch(`${baseUrl}/public/school/${schoolId}/announcements?limit=3`);
          if (announcementsRes.ok) {
            const announcementsData = await announcementsRes.json();
            if (announcementsData.success && announcementsData.data) {
              const mappedNews: NewsItem[] = announcementsData.data.map((ann: { _id: string; title: string; content: string; publishDate: string; type: string; attachments?: string[] }) => ({
                id: ann._id,
                title: ann.title,
                content: ann.content,
                date: new Date(ann.publishDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }),
                author: 'Admin',
                category: ann.type === 'urgent' ? 'announcement' : 'general',
                image: ann.attachments?.[0] || undefined,
              }));
              setNews(mappedNews.length > 0 ? mappedNews : []);
            } else {
              setNews([]);
            }
          } else {
            setNews([]);
          }
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
                image: evt.imageUrl,
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

      {/* Programs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our diverse range of educational programs designed to meet the needs of every student and prepare them for future success through Christian formation and moral development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <Card key={program.id} variant="elevated" className="group bg-white">
                <div className="h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                  {program.image ? (
                    <Image
                      src={program.image}
                      alt={program.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                      </div>
                      <span className="text-gray-600 font-medium text-sm">Program Image</span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{program.name}</h3>
                <p className="text-gray-600 mb-3 leading-relaxed text-sm">{program.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Duration: {program.duration}</span>
                  <Link href="/programs">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/programs">
              <Button variant="outline" size="lg">
                View All Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>

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
              <Card key={item.id} variant="elevated" className="group bg-white hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                        </div>
                        <span className="text-gray-600 font-medium">News Image</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      item.category === 'achievement' ? 'bg-green-100 text-green-800 border border-green-200' :
                      item.category === 'event' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                      item.category === 'announcement' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                      'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}>
                      {item.category === 'achievement' && '🏆'}
                      {item.category === 'event' && '📅'}
                      {item.category === 'announcement' && '📢'}
                      {item.category === 'general' && '📰'}
                      <span className="ml-1 capitalize">{item.category}</span>
                    </span>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
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
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>By {item.author}</span>
                    </div>
                    <Link href="/news">
                      <Button variant="outline" size="sm" className="group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-600 transition-all duration-200">
                        Read More
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/news">
              <Button variant="outline" size="lg" className="group hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                View All News & Announcements
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
              <Card key={event.id} variant="elevated" className="group bg-white hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                    {event.image ? (
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-gray-600 font-medium">Event Image</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm border border-gray-200">
                      {event.category === 'academic' && '📚'}
                      {event.category === 'cultural' && '🎭'}
                      {event.category === 'sports' && '⚽'}
                      {event.category === 'community' && '🤝'}
                      <span className="ml-1 capitalize">{event.category}</span>
                    </span>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 border border-gray-200">
                      <span className="text-xs font-medium text-gray-600">
                        {event.date ? new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        }) : ''}
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
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    </div>
  );
}

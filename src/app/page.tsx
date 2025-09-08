'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Carousel from '../components/ui/Carousel';
import Leadership from '../components/sections/Leadership';
import Heroes from '../components/sections/Heroes';
// Removed unused API imports
import { 
  carouselData,
  mockSchoolInfo,
  mockNews,
  mockEvents,
  heroesData,
  leadershipData,
  mockStudents,
  mockPrograms
} from '../data/mockData';
import { 
  SchoolInfo, 
  NewsItem, 
  Event, 
  Faculty, 
  Student, 
  Program,
  Leadership as LeadershipType
} from '../types/school';

export default function Home() {
  const [schoolInfo, setSchoolInfo] = React.useState<SchoolInfo | null>(null);
  const [news, setNews] = React.useState<NewsItem[]>([]);
  const [events, setEvents] = React.useState<Event[]>([]);
  const [heroes, setHeroes] = React.useState<Faculty[]>([]);
  const [leadership, setLeadership] = React.useState<LeadershipType[]>([]);
  const [students, setStudents] = React.useState<Student[]>([]);
  const [programs, setPrograms] = React.useState<Program[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Use mock data directly for better performance and consistency
        setSchoolInfo(mockSchoolInfo);
        setNews(mockNews.slice(0, 3)); // Show only 3 latest news
        setEvents(mockEvents.slice(0, 3)); // Show only 3 upcoming events
        setHeroes(heroesData.slice(0, 3)); // Show only 3 heroes
        setLeadership(leadershipData); // Show all leadership
        setStudents(mockStudents.slice(0, 3)); // Show only 3 students
        setPrograms(mockPrograms.slice(0, 3)); // Show only 3 programs
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      {/* Hero Section with Carousel */}
      <section className="relative">
        <Carousel 
          items={carouselData}
          autoPlay={true}
          interval={6000}
          showIndicators={true}
          showArrows={true}
        />
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Our School
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Established in {schoolInfo?.established || 1995}, we have been at the forefront of educational excellence, 
              providing students with the knowledge, skills, and character needed to succeed in an ever-changing world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="elevated" className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Academic Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                Rigorous curriculum designed to challenge and inspire students to reach their full potential through innovative teaching methods.
              </p>
            </Card>
            
            <Card variant="elevated" className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Character Development</h3>
              <p className="text-gray-600 leading-relaxed">
                Building strong moral character and leadership skills through various programs and community service activities.
              </p>
            </Card>
            
            <Card variant="elevated" className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                Embracing new technologies and teaching methods to prepare students for the challenges of tomorrow.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <Leadership leaders={leadership} />

      {/* Programs Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover our diverse range of educational programs designed to meet the needs of every student and prepare them for future success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card key={program.id} variant="elevated" className="group">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                  {program.image ? (
                    <img
                      src={program.image}
                      alt={program.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">{index + 1}</span>
                      </div>
                      <span className="text-gray-600 font-medium">Program Image</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{program.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{program.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Duration: {program.duration}</span>
                  <Link href="/programs">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/programs">
              <Button variant="gradient" size="lg">
                View All Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Latest News
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Stay updated with the latest happenings, achievements, and important announcements from our school community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item) => (
              <Card key={item.id} variant="elevated" className="group">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-blue-100 rounded-xl mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500">News Image</span>
                  )}
                </div>
                <div className="flex items-center mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.category === 'achievement' ? 'bg-green-100 text-green-800' :
                    item.category === 'event' ? 'bg-blue-100 text-blue-800' :
                    item.category === 'announcement' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.category}
                  </span>
                  <span className="text-sm text-gray-500 ml-3">{item.date}</span>
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.content.substring(0, 120)}...</p>
                <Link href="/news">
                  <Button variant="ghost" size="sm">
                    Read More
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/news">
              <Button variant="gradient" size="lg">
                View All News
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Join us for exciting events and activities that bring our school community together throughout the year.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <Card key={event.id} variant="elevated" className="group">
                <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500">Event Image</span>
                  )}
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                    {event.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900">{event.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <p className="flex items-center">📅 {event.date}</p>
                  <p className="flex items-center">🕒 {event.time}</p>
                  <p className="flex items-center">📍 {event.location}</p>
                </div>
                <Button variant="gradient" size="sm" className="w-full">
                  Register
                </Button>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/events">
              <Button variant="gradient" size="lg">
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Heroes Section */}
      <Heroes heroes={heroes} />
      
      {/* Students Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Student Achievements
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Celebrating the outstanding accomplishments and achievements of our talented students across various fields.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {students.map((student) => (
              <Card key={student.id} variant="elevated" className="text-center group">
                <div className="h-48 bg-gradient-to-br from-green-100 to-teal-100 rounded-xl mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                  {student.image ? (
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-gray-600 font-medium">Student Photo</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{student.name}</h3>
                <p className="text-gray-600 mb-4">{student.grade}</p>
                <div className="space-y-2">
                  {student.achievements.slice(0, 2).map((achievement, index) => (
                    <div key={index} className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                      {achievement}
                    </div>
                  ))}
                  {student.achievements.length > 2 && (
                    <div className="text-sm text-blue-600 font-medium">
                      +{student.achievements.length - 2} more achievements
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/students">
              <Button variant="gradient" size="lg">
                View All Students
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Take the first step towards a brighter future. Apply now and become part of our exceptional learning community where dreams take flight.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/admissions">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl">
                Apply Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 shadow-xl">
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

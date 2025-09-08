'use client';

import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Leadership from '../../components/sections/Leadership';
import { 
  schoolApi, 
  leadershipApi,
  heroesApi,
  aboutApi
} from '../../services/api';
import { 
  SchoolInfo, 
  Leadership as LeadershipType,
  Faculty,
  AboutContent,
  CoreValue,
  Facility
} from '../../types/school';

export default function About() {
  const [schoolInfo, setSchoolInfo] = React.useState<SchoolInfo | null>(null);
  const [leadership, setLeadership] = React.useState<LeadershipType[]>([]);
  const [heroes, setHeroes] = React.useState<Faculty[]>([]);
  const [aboutContent, setAboutContent] = React.useState<AboutContent[]>([]);
  const [coreValues, setCoreValues] = React.useState<CoreValue[]>([]);
  const [facilities, setFacilities] = React.useState<Facility[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [school, leadershipData, heroesData, aboutContentData, coreValuesData, facilitiesData] = await Promise.all([
          schoolApi.getSchoolInfo(),
          leadershipApi.getLeadership(),
          heroesApi.getHeroes(),
          aboutApi.getAboutContent(),
          aboutApi.getCoreValues(),
          aboutApi.getFacilities()
        ]);

        setSchoolInfo(school);
        setLeadership(leadershipData);
        setHeroes(heroesData);
        setAboutContent(aboutContentData);
        setCoreValues(coreValuesData);
        setFacilities(facilitiesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  // Helper function to get content by section
  const getContentBySection = (section: string) => {
    return aboutContent.find(content => content.section === section && content.isActive);
  };

  // Helper function to get icon component
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About {schoolInfo?.name || 'Bright Future Academy'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
            {schoolInfo?.tagline || 'Empowering Minds, Building Futures'}
          </p>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Discover our story, mission, and the dedicated team that makes our school a center of excellence in education.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      {getContentBySection('story') && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {getContentBySection('story')?.title || 'Our Story'}
                </h2>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {getContentBySection('story')?.content || 'Founded in 1995, Bright Future Academy began with a simple yet powerful vision...'}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {new Date().getFullYear() - (schoolInfo?.established || 1995)}+
                    </div>
                    <div className="text-gray-600">Years of Excellence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
                    <div className="text-gray-600">Students Enrolled</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl overflow-hidden">
                  <img
                    src={getContentBySection('story')?.image || "https://images.unsplash.com/photo-1523050854058-8df90110c9e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"}
                    alt="School Building"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
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
            {getContentBySection('mission') && (
              <Card variant="elevated" className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{getContentBySection('mission')?.title || 'Our Mission'}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {getContentBySection('mission')?.content || 'To provide exceptional education that empowers students...'}
                </p>
              </Card>
            )}
            
            {getContentBySection('vision') && (
              <Card variant="elevated" className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{getContentBySection('vision')?.title || 'Our Vision'}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {getContentBySection('vision')?.content || 'To be the leading educational institution that inspires innovation...'}
                </p>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white">
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
            {coreValues.map((value) => (
              <Card key={value.id} variant="elevated" className="text-center group">
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
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

      {/* Facilities Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Facilities
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              State-of-the-art facilities designed to provide the best learning environment for our students.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility) => (
              <Card key={facility.id} variant="elevated" className="group">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                  {facility.image ? (
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500">{facility.name} Image</span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{facility.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{facility.description}</p>
                <div className="space-y-2">
                  {facility.features.slice(0, 2).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
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

      <Footer />
    </div>
  );
} 
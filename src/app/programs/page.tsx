'use client';

import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { 
  schoolApi, 
  programsApi
} from '../../services/api';
import { 
  SchoolInfo, 
  Program
} from '../../types/school';

export default function Programs() {
  const [schoolInfo, setSchoolInfo] = React.useState<SchoolInfo | null>(null);
  const [programs, setPrograms] = React.useState<Program[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [school, programsData] = await Promise.all([
          schoolApi.getSchoolInfo(),
          programsApi.getPrograms()
        ]);

        setSchoolInfo(school);
        setPrograms(programsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  // Program categories
  const categories = [
    { id: 'all', name: 'All Programs', color: 'from-blue-500 to-purple-600' },
    { id: 'elementary', name: 'Elementary School', color: 'from-green-500 to-teal-600' },
    { id: 'middle', name: 'Middle School', color: 'from-purple-500 to-pink-600' },
    { id: 'high', name: 'High School', color: 'from-yellow-500 to-orange-600' },
    { id: 'specialized', name: 'Advanced Programs', color: 'from-red-500 to-pink-600' }
  ];

  // Filter programs based on selected category
  const filteredPrograms = selectedCategory === 'all' 
    ? programs 
    : programs.filter(program => program.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Academic Programs
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
            From Pre-K to High School: A Complete Educational Journey
          </p>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive academic programs provide a strong foundation for lifelong learning, from early childhood development to college preparation.
          </p>
        </div>
      </section>

      {/* Programs Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Complete K-12 Education
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Our comprehensive K-12 curriculum provides a seamless educational journey from early childhood through high school graduation, preparing students for college and beyond.
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
                Rigorous curriculum designed to challenge and inspire students to reach their full academic potential through innovative teaching methods.
              </p>
            </Card>
            
            <Card variant="elevated" className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Innovation & Technology</h3>
              <p className="text-gray-600 leading-relaxed">
                Cutting-edge technology integration and innovative learning approaches that prepare students for the digital age and future careers.
              </p>
            </Card>
            
            <Card variant="elevated" className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Character Development</h3>
              <p className="text-gray-600 leading-relaxed">
                Holistic approach to education that nurtures character, leadership skills, and social responsibility alongside academic achievement.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Program Categories Filter */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Explore Our Programs
            </h3>
            <p className="text-gray-600">
              Filter programs by category to find the perfect fit for your child
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => (
              <Card key={program.id} variant="elevated" className="group hover:scale-105 transition-all duration-500">
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
                        <span className="text-white font-bold text-xl">
                          {program.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-gray-500">Program Image</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{program.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{program.description}</p>
                  
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-2">
                      Duration: {program.duration}
                    </span>
                  </div>
                  
                  {program.requirements && program.requirements.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {program.requirements.slice(0, 3).map((requirement, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            {requirement}
                          </li>
                        ))}
                        {program.requirements.length > 3 && (
                          <li className="text-sm text-blue-600 font-medium">
                            +{program.requirements.length - 3} more requirements
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                    <Button variant="gradient" size="sm">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {filteredPrograms.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Programs Found</h3>
              <p className="text-gray-600">Try selecting a different category or check back later for new programs.</p>
            </div>
          )}
        </div>
      </section>

      {/* Program Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose Our School?
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Our K-12 school provides a nurturing environment where students grow academically, socially, and emotionally, preparing them for success in college and life.
              </p>
            </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card variant="elevated" className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Expert Faculty</h3>
              <p className="text-gray-600 text-sm">
                Learn from experienced educators who are passionate about teaching and student success.
              </p>
            </Card>
            
            <Card variant="elevated" className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Modern Technology</h3>
              <p className="text-gray-600 text-sm">
                Access to cutting-edge technology and digital learning resources in every program.
              </p>
            </Card>
            
            <Card variant="elevated" className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Small Class Sizes</h3>
              <p className="text-gray-600 text-sm">
                Personalized attention with small class sizes ensuring individual student growth.
              </p>
            </Card>
            
            <Card variant="elevated" className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Future Ready</h3>
              <p className="text-gray-600 text-sm">
                Programs designed to prepare students for future careers and higher education.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Join our community of learners and discover the perfect program for your child's educational journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl">
              Apply Now
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 shadow-xl">
              Schedule a Visit
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 
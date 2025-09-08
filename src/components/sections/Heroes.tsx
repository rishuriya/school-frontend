'use client';

import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Faculty } from '../../types/school';

interface HeroesProps {
  heroes: Faculty[];
}

const Heroes: React.FC<HeroesProps> = ({ heroes }) => {
  const departmentColors = {
    'Administration': 'from-blue-500 to-purple-600',
    'Technology & Innovation': 'from-green-500 to-teal-600',
    'Board of Directors': 'from-purple-500 to-pink-600',
    'Science': 'from-red-500 to-orange-600',
    'English': 'from-indigo-500 to-blue-600',
    'Mathematics': 'from-yellow-500 to-orange-600'
  };

  const departmentIcons = {
    'Administration': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    'Technology & Innovation': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    'Board of Directors': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    'Science': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    'English': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    'Mathematics': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Heroes
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our exceptional leaders and educators who inspire, guide, and shape the future of our students with their expertise, passion, and dedication.
          </p>
        </div>
        
        {/* Heroes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {heroes.map((hero, index) => (
            <Card key={hero.id} variant="elevated" className="group hover:scale-105 transition-all duration-500">
              {/* Hero Image */}
              <div className="relative mb-6">
                <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden">
                  <img
                    src={hero.image}
                    alt={hero.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className={`absolute -bottom-4 left-6 w-16 h-16 bg-gradient-to-r ${departmentColors[hero.department as keyof typeof departmentColors] || 'from-gray-500 to-gray-600'} rounded-full flex items-center justify-center shadow-lg`}>
                  {departmentIcons[hero.department as keyof typeof departmentIcons] || (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    #{index + 1}
                  </div>
                </div>
              </div>

              {/* Hero Info */}
              <div className="pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{hero.name}</h3>
                <p className={`inline-block px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${departmentColors[hero.department as keyof typeof departmentColors] || 'from-gray-500 to-gray-600'} text-white mb-3`}>
                  {hero.position}
                </p>
                <p className="text-gray-600 mb-4 font-medium">{hero.department}</p>
                
                {/* Bio */}
                <p className="text-gray-600 mb-6 leading-relaxed">{hero.bio}</p>

                {/* Qualifications */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Qualifications</h4>
                  <div className="space-y-2">
                    {hero.qualifications.slice(0, 2).map((qualification, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className={`w-2 h-2 bg-gradient-to-r ${departmentColors[hero.department as keyof typeof departmentColors] || 'from-gray-500 to-gray-600'} rounded-full mt-2 flex-shrink-0`}></div>
                        <span className="text-sm text-gray-600">{qualification}</span>
                      </div>
                    ))}
                    {hero.qualifications.length > 2 && (
                      <div className="text-sm text-blue-600 font-medium">
                        +{hero.qualifications.length - 2} more qualifications
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact & Actions */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <a
                      href={`mailto:${hero.email}`}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">Contact</span>
                    </a>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our Team of Heroes
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Are you passionate about education and making a difference in students&apos; lives? We&apos;re always looking for exceptional educators to join our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="lg">
                View Open Positions
              </Button>
              <Button variant="outline" size="lg">
                Learn About Our Culture
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Heroes; 
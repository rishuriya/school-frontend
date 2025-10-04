'use client';

import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import { mockStudents, libraryRegulations, attendancePolicies, arrivalDeparturePolicies, uniformSpecifications } from '../../data/mockData';

export default function StudentsPage() {
  const students = mockStudents;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      {/* Hero Section with Animated Background */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Student <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Excellence</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Nurturing future leaders through academic excellence, character development, and service to community
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
              🎓 Academic Excellence
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
              💪 Character Building
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
              🤝 Community Service
            </div>
          </div>
        </div>
      </section>

      {/* Student Showcase Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Outstanding Students</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet some of our exceptional students who exemplify the values of St. Joseph Catholic School
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {students.map((student, index) => (
              <div 
                key={student.id} 
                className="group relative"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <Card variant="elevated" className="text-center h-full transform group-hover:scale-105 transition-all duration-500 hover:shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50">
                  <div className="relative">
                    <div className="h-56 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-2xl mb-6 flex items-center justify-center overflow-hidden group-hover:from-blue-200 group-hover:via-purple-200 group-hover:to-pink-200 transition-all duration-500">
                  {student.image ? (
                        <img src={student.image} alt={student.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="text-7xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500">
                          {student.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      ⭐
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {student.name}
                  </h3>
                  <p className="text-gray-600 mb-6 font-medium">{student.grade}</p>
                  <div className="space-y-3">
                    {student.achievements.map((achievement, i) => (
                      <div key={i} className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 rounded-xl border border-blue-100 group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300">
                        <span className="text-sm font-medium text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Library Regulations Section */}
      <section id="library-regulations" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Library Regulations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Guidelines to ensure a productive and respectful learning environment for all students
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {libraryRegulations.map((regulation, index) => (
              <div key={regulation.id} className="group">
                <Card variant="elevated" className="h-full transform group-hover:scale-105 transition-all duration-500 hover:shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50/30">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {regulation.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">{regulation.description}</p>
                  
                  <div className="space-y-4 mb-6">
                    {regulation.rules.map((rule, ruleIndex) => (
                      <div key={ruleIndex} className="flex items-start group/rule">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-4 mt-0.5 group-hover/rule:scale-110 transition-transform duration-200">
                          <div className="w-2 h-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700 leading-relaxed">{rule}</span>
                      </div>
                    ))}
                  </div>
                  
                  {regulation.fines && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200 group-hover:from-red-100 group-hover:to-orange-100 transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </div>
                        <h4 className="text-lg font-bold text-red-800">Fines & Penalties</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                          <span className="font-medium text-red-700">Late Return</span>
                          <span className="font-bold text-red-800">{regulation.fines.lateReturn}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                          <span className="font-medium text-red-700">Damage/Loss</span>
                          <span className="font-bold text-red-800">{regulation.fines.damage}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attendance Policy Section */}
      <section id="attendance-policy" className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Attendance & Leave Policies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential guidelines for maintaining academic excellence and school discipline
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {attendancePolicies.map((policy, index) => (
              <div key={policy.id} className="group">
                <Card variant="elevated" className="h-full transform group-hover:scale-105 transition-all duration-500 hover:shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50/50">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 ${
                      policy.category === 'attendance' ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
                      policy.category === 'leave' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' :
                      policy.category === 'punctuality' ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                      'bg-gradient-to-br from-red-500 to-pink-600'
                    }`}>
                      {policy.category === 'attendance' && (
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {policy.category === 'leave' && (
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                      {policy.category === 'punctuality' && (
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {policy.category === 'withdrawal' && (
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {policy.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">{policy.description}</p>
                  
                  <div className="space-y-4 mb-6">
                    {policy.rules.map((rule, ruleIndex) => (
                      <div key={ruleIndex} className="flex items-start group/rule">
                        <div className="w-6 h-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mr-4 mt-0.5 group-hover/rule:scale-110 transition-transform duration-200">
                          <div className="w-2 h-2 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700 leading-relaxed text-sm">{rule}</span>
                      </div>
                    ))}
                  </div>
                  
                  {policy.penalties && policy.penalties.length > 0 && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border border-orange-200 group-hover:from-orange-100 group-hover:to-yellow-100 transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </div>
                        <h4 className="text-lg font-bold text-orange-800">Penalties & Consequences</h4>
                      </div>
                      <div className="space-y-3">
                        {policy.penalties.map((penalty, penaltyIndex) => (
                          <div key={penaltyIndex} className="p-4 bg-white/60 rounded-xl border border-orange-100">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-orange-700">{penalty.type}</span>
                              {penalty.amount && (
                                <span className="text-sm font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                                  {penalty.amount}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-orange-600">{penalty.consequence}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Arrival & Departure Policies Section */}
      <section id="arrival-departure" className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Arrival & Departure Guidelines</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Safety protocols and conduct expectations for school arrival and departure
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            {arrivalDeparturePolicies.map((policy, index) => (
              <div key={policy.id} className="group">
                <Card variant="elevated" className="transform group-hover:scale-105 transition-all duration-500 hover:shadow-2xl border-0 bg-gradient-to-br from-white to-purple-50/30">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                      {policy.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">{policy.description}</p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center mb-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">Safety & Conduct Rules</h4>
                      </div>
                      <div className="space-y-4">
                        {policy.rules.map((rule, ruleIndex) => (
                          <div key={ruleIndex} className="flex items-start group/rule">
                            <div className="w-6 h-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mr-4 mt-0.5 group-hover/rule:scale-110 transition-transform duration-200">
                              <div className="w-2 h-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full"></div>
                            </div>
                            <span className="text-gray-700 leading-relaxed text-sm">{rule}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {policy.penalties && policy.penalties.length > 0 && (
                      <div>
                        <div className="flex items-center mb-6">
                          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                          </div>
                          <h4 className="text-xl font-bold text-gray-900">Consequences for Violations</h4>
                        </div>
                        <div className="space-y-4">
                          {policy.penalties.map((penalty, penaltyIndex) => (
                            <div key={penaltyIndex} className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200 group-hover:from-red-100 group-hover:to-pink-100 transition-all duration-300">
                              <div className="font-bold text-red-800 mb-2">{penalty.type}</div>
                              <p className="text-sm text-red-600">{penalty.consequence}</p>
                </div>
                  ))}
                        </div>
                      </div>
                    )}
                  </div>
              </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Student Resources</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Quick access to essential student information and services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card variant="elevated" className="text-center group hover:scale-105 transition-all duration-500 hover:shadow-2xl border-0 bg-white/10 backdrop-blur-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Curriculum</h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">View detailed curriculum for all classes</p>
              <a href="/students/curriculum" className="inline-flex items-center text-green-300 hover:text-green-200 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                Learn More 
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </Card>

            <Card variant="elevated" className="text-center group hover:scale-105 transition-all duration-500 hover:shadow-2xl border-0 bg-white/10 backdrop-blur-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Uniform Guidelines</h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">Complete uniform specifications</p>
              <a href="/students/uniform" className="inline-flex items-center text-purple-300 hover:text-purple-200 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                View Details 
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </Card>

            <Card variant="elevated" className="text-center group hover:scale-105 transition-all duration-500 hover:shadow-2xl border-0 bg-white/10 backdrop-blur-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Fee Structure</h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">View fees and payment options</p>
              <a href="/students/fees" className="inline-flex items-center text-yellow-300 hover:text-yellow-200 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                Pay Online 
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </Card>

            <Card variant="elevated" className="text-center group hover:scale-105 transition-all duration-500 hover:shadow-2xl border-0 bg-white/10 backdrop-blur-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Notices & Updates</h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">Latest announcements and notices</p>
              <a href="/students/notices" className="inline-flex items-center text-red-300 hover:text-red-200 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                Read More 
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}



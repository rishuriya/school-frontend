'use client';

import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import schoolProfileService from '../../services/schoolProfileService';
import { APP_CONFIG } from '../../config/app';
import { Student, SchoolProfile } from '../../types/school';
import { mockStudents } from '../../data/mockData';

export default function StudentsPage() {
  const [loading, setLoading] = React.useState(true);
  const [students, setStudents] = React.useState<Student[]>([]);
  const [schoolProfile, setSchoolProfile] = React.useState<SchoolProfile | null>(null);
  const [activeTab, setActiveTab] = React.useState(0);
  const [openAccordionIndex, setOpenAccordionIndex] = React.useState<number | null>(0);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch school profile
        const profile = await schoolProfileService.getSchoolProfileById(APP_CONFIG.school.id);
        setSchoolProfile(profile);
        
        const baseUrl = APP_CONFIG.api.baseUrl;
        const schoolId = profile._id;
        
        // Fetch student leaders from backend
        try {
          const studentsRes = await fetch(`${baseUrl}/public/school/${schoolId}/student-leaders?limit=20`);
          if (studentsRes.ok) {
            const studentsData = await studentsRes.json();
            if (studentsData.success && studentsData.data) {
              const mappedStudents: Student[] = studentsData.data.map((student: { _id: string; firstName: string; lastName: string; class: string; section: string; leadershipRole?: string; profileImage?: string; message?: string; achievements?: string[] }) => ({
                id: student._id,
                name: `${student.firstName} ${student.lastName}`,
                grade: `Class ${student.class}${student.section ? ` - ${student.section}` : ''}`,
                class: student.class,
                section: student.section,
                achievement: student.leadershipRole || 'Student Leader',
                achievements: student.achievements || [],
                image: student.profileImage,
                description: student.message || 'Dedicated and hardworking student.',
              }));
              setStudents(mappedStudents.length > 0 ? mappedStudents : mockStudents);
            } else {
              setStudents(mockStudents);
            }
          } else {
            setStudents(mockStudents);
          }
        } catch (error) {
          console.error('Failed to fetch student leaders:', error);
          setStudents(mockStudents);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setStudents(mockStudents);
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
          <p className="text-gray-600 text-lg">Loading student information...</p>
        </div>
      </div>
    );
  }

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

      {/* Student Rules Section - Dynamic from Backend */}
      {schoolProfile?.profile?.rules && schoolProfile.profile.layout?.sections?.rules?.show !== false && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Student Rules & Guidelines</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Essential rules and guidelines for maintaining a positive learning environment
              </p>
            </div>
            
            {(() => {
              const rules = schoolProfile.profile.rules;
              const template = schoolProfile.profile.layout?.sections?.rules?.template || 'tabs';
              const availableRules = Object.entries(rules).filter(([key, value]) => 
                Array.isArray(value) && value.length > 0 && value.some(rule => rule.trim().length > 0)
              );

              if (availableRules.length === 0) return null;

              const getRuleIcon = (type: string) => {
                switch(type) {
                  case 'student':
                    return (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    );
                  case 'attendance':
                    return (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    );
                  case 'discipline':
                    return (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    );
                  case 'uniform':
                    return (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    );
                  case 'admission':
                    return (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    );
                  case 'parent':
                    return (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    );
                  default:
                    return (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    );
                }
              };

              const formatRuleType = (type: string) => {
                return type.charAt(0).toUpperCase() + type.slice(1) + ' Rules';
              };

              // Grid Layout
              if (template === 'grid') {
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {availableRules.map(([type, content], index) => (
                      <Card key={type} variant="elevated" className="h-full group bg-white hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center mb-6">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform duration-300">
                            {getRuleIcon(type)}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {formatRuleType(type)}
                          </h3>
                        </div>
                        <ul className="space-y-3">
                          {(Array.isArray(content) ? content : [content]).map((rule: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-gray-700">
                              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                {i + 1}
                              </span>
                              <span className="flex-1 leading-relaxed">{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    ))}
                  </div>
                );
              }

              // Accordion Layout
              if (template === 'accordion') {
                return (
                  <div className="max-w-4xl mx-auto space-y-4">
                    {availableRules.map(([type, content], index) => (
                      <Card key={type} variant="elevated" className="overflow-hidden bg-white">
                        <button
                          onClick={() => setOpenAccordionIndex(openAccordionIndex === index ? null : index)}
                          className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white mr-4">
                              {getRuleIcon(type)}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {formatRuleType(type)}
                            </h3>
                          </div>
                          <svg
                            className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${openAccordionIndex === index ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {openAccordionIndex === index && (
                          <div className="px-6 pb-6 pt-2 border-t">
                            <ul className="space-y-3 mt-4">
                              {(Array.isArray(content) ? content : [content]).map((rule: string, i: number) => (
                                <li key={i} className="flex items-start gap-3 text-gray-700">
                                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                    {i + 1}
                                  </span>
                                  <span className="flex-1 leading-relaxed">{rule}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                );
              }

              // List Layout
              if (template === 'list') {
                return (
                  <div className="max-w-5xl mx-auto space-y-6">
                    {availableRules.map(([type, content]) => (
                      <Card key={type} variant="elevated" className="bg-white hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start gap-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                            {getRuleIcon(type)}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                              {formatRuleType(type)}
                            </h3>
                            <ul className="space-y-3">
                              {(Array.isArray(content) ? content : [content]).map((rule: string, i: number) => (
                                <li key={i} className="flex items-start gap-3 text-gray-700">
                                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                    {i + 1}
                                  </span>
                                  <span className="flex-1 leading-relaxed">{rule}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                );
              }

              // Tabs Layout (Default)
              return (
                <div className="max-w-6xl mx-auto">
                  <div className="flex flex-wrap gap-2 mb-8 justify-center">
                    {availableRules.map(([type], index) => (
                      <button
                        key={type}
                        onClick={() => setActiveTab(index)}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                          activeTab === index
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {formatRuleType(type)}
                      </button>
                    ))}
                  </div>
                  
                  {availableRules.map(([type, content], index) => (
                    activeTab === index && (
                      <Card key={type} variant="elevated" className="bg-white">
                        <div className="flex items-center mb-6">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mr-4">
                            {getRuleIcon(type)}
                          </div>
                          <h3 className="text-3xl font-bold text-gray-900">
                            {formatRuleType(type)}
                          </h3>
                        </div>
                        <ul className="space-y-4">
                          {(Array.isArray(content) ? content : [content]).map((rule: string, i: number) => (
                            <li key={i} className="flex items-start gap-4 text-gray-700">
                              <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-base font-bold mt-0.5">
                                {i + 1}
                              </span>
                              <span className="flex-1 leading-relaxed text-lg">{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    )
                  ))}
                </div>
              );
            })()}
          </div>
        </section>
      )}

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



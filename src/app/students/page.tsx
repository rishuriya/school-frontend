'use client';

import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import schoolProfileService from '../../services/schoolProfileService';
import { APP_CONFIG } from '../../config/app';
import { Student, SchoolProfile } from '../../types/school';

interface RuleSection {
  id: string;
  title: string;
  order: number;
  subsections: Array<{
    id: string;
    title: string;
    order: number;
    rules: string[];
  }>;
}

interface RulesData {
  sections: RuleSection[];
}

export default function StudentsPage() {
  const [loading, setLoading] = React.useState(true);
  const [students, setStudents] = React.useState<Student[]>([]);
  const [schoolProfile, setSchoolProfile] = React.useState<SchoolProfile | null>(null);
  const [rules, setRules] = React.useState<RulesData | null>(null);
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

        // Fetch rules from backend
        try {
          const rulesRes = await fetch(`${baseUrl}/public/school/${schoolId}/rules`);
          if (rulesRes.ok) {
            const rulesData = await rulesRes.json();
            if (rulesData.success && rulesData.data) {
              setRules(rulesData.data);
            }
          }
        } catch (error) {
          console.error('Failed to fetch rules:', error);
        }

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setStudents([]);
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
      {students.length > 0 && (
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
      )}
      {/* Student Rules Section - Dynamic from Backend API */}
      {rules && rules.sections && rules.sections.length > 0 && (
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

            <div className="max-w-6xl mx-auto">
              {/* Tabs for Sections */}
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {rules.sections
                  .sort((a, b) => a.order - b.order)
                  .map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveTab(index)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === index
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      {section.title}
                    </button>
                  ))}
              </div>

              {/* Content for Active Tab */}
              {rules.sections
                .sort((a, b) => a.order - b.order)
                .map((section, sectionIndex) => {
                  if (activeTab !== sectionIndex) return null;

                  // Flatten all rules from subsections
                  const allRules: Array<{ subsectionTitle?: string; rule: string }> = [];
                  section.subsections
                    .sort((a, b) => a.order - b.order)
                    .forEach((subsection) => {
                      subsection.rules.forEach((rule) => {
                        allRules.push({
                          subsectionTitle: subsection.title,
                          rule: rule
                        });
                      });
                    });

                  if (allRules.length === 0) return null;

                  return (
                    <Card key={section.id} variant="elevated" className="bg-white">
                      <div className="flex items-center mb-8">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mr-4">
                          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">{section.title}</h3>
                      </div>

                      {/* Group rules by subsection if they have subsection titles */}
                      {(() => {
                        const hasSubsections = allRules.some(r => r.subsectionTitle);
                        if (!hasSubsections) {
                          // Simple list if no subsections
                          return (
                            <ul className="space-y-4">
                              {allRules.map((item, i) => (
                                <li key={i} className="flex items-start gap-4 text-gray-700">
                                  <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-base font-bold mt-0.5">
                                    {i + 1}
                                  </span>
                                  <span className="flex-1 leading-relaxed text-lg">{item.rule}</span>
                                </li>
                              ))}
                            </ul>
                          );
                        }

                        // Group by subsection
                        const groupedRules: Record<string, string[]> = {};
                        allRules.forEach((item) => {
                          const key = item.subsectionTitle || 'General';
                          if (!groupedRules[key]) {
                            groupedRules[key] = [];
                          }
                          groupedRules[key].push(item.rule);
                        });

                        return (
                          <div className="space-y-8">
                            {Object.entries(groupedRules).map(([subsectionTitle, subsectionRules], groupIndex) => (
                              <div key={groupIndex} className="border-l-4 border-blue-500 pl-6">
                                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                  {subsectionTitle}
                                </h4>
                                <ul className="space-y-3">
                                  {subsectionRules.map((rule, ruleIndex) => (
                                    <li key={ruleIndex} className="flex items-start gap-3 text-gray-700">
                                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                        {ruleIndex + 1}
                                      </span>
                                      <span className="flex-1 leading-relaxed">{rule}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </Card>
                  );
                })}
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Syllabus</h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">Download subject-wise syllabus</p>
              <a href="/students/syllabus" className="inline-flex items-center text-indigo-300 hover:text-indigo-200 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                View Syllabus
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </Card>

            <Card variant="elevated" className="text-center group hover:scale-105 transition-all duration-500 hover:shadow-2xl border-0 bg-white/10 backdrop-blur-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Transfer Certificate</h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">Retrieve your transfer certificate</p>
              <a href="/students/transfer-certificate" className="inline-flex items-center text-cyan-300 hover:text-cyan-200 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                Get TC
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



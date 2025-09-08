'use client';

import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { 
  schoolApi
} from '../../services/api';
import { 
  SchoolInfo
} from '../../types/school';

export default function Admissions() {
  const [schoolInfo, setSchoolInfo] = React.useState<SchoolInfo | null>(null);
  const [activeTab, setActiveTab] = useState('process');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const school = await schoolApi.getSchoolInfo();
        setSchoolInfo(school);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const admissionSteps = [
    {
      step: 1,
      title: "Inquiry & Information",
      description: "Contact us to learn more about our programs and schedule a campus visit.",
      duration: "1-2 weeks",
      requirements: ["Initial contact", "Information request", "Campus tour scheduling"]
    },
    {
      step: 2,
      title: "Application Submission",
      description: "Complete and submit the online application form with all required documents.",
      duration: "2-3 weeks",
      requirements: ["Online application", "Academic records", "Teacher recommendations", "Application fee"]
    },
    {
      step: 3,
      title: "Assessment & Interview",
      description: "Students complete academic assessments and families participate in interviews.",
      duration: "1-2 weeks",
      requirements: ["Academic assessment", "Family interview", "Student interview", "Portfolio review"]
    },
    {
      step: 4,
      title: "Admission Decision",
      description: "Review committee evaluates applications and makes admission decisions.",
      duration: "2-3 weeks",
      requirements: ["Committee review", "Decision notification", "Acceptance letter"]
    },
    {
      step: 5,
      title: "Enrollment & Orientation",
      description: "Complete enrollment process and attend orientation programs.",
      duration: "1-2 weeks",
      requirements: ["Enrollment forms", "Tuition payment", "Orientation attendance", "Uniform fitting"]
    }
  ];

  const requirements = [
    {
      category: "Academic Requirements",
      items: [
        "Previous school records and transcripts",
        "Standardized test scores (if applicable)",
        "Academic assessment results",
        "Teacher recommendations (2-3 letters)",
        "Writing sample or portfolio (for specialized programs)"
      ]
    },
    {
      category: "Personal Requirements",
      items: [
        "Completed application form",
        "Student and family interviews",
        "Health and immunization records",
        "Birth certificate or passport copy",
        "Recent photographs"
      ]
    },
    {
      category: "Financial Requirements",
      items: [
        "Application fee ($100 non-refundable)",
        "Tuition deposit upon acceptance",
        "Financial aid application (if applicable)",
        "Payment plan agreement",
        "Scholarship documentation (if applicable)"
      ]
    }
  ];

  const importantDates = [
    {
      period: "Academic Year 2024-25",
      dates: [
        { event: "Admission Applications Open", date: "January 15, 2024" },
        { event: "Application Deadline", date: "March 31, 2024" },
        { event: "Assessment & Interview Period", date: "April 1 - April 30, 2024" },
        { event: "Admission Results Announcement", date: "May 15, 2024" },
        { event: "Documentation & Fee Payment", date: "May 16 - June 15, 2024" },
        { event: "Orientation Program", date: "June 20, 2024" },
        { event: "Academic Year Begins", date: "July 1, 2024" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Admissions
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
            Join our community of learners
          </p>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
            We welcome applications from students who are eager to learn, grow, and contribute to our vibrant school community. <strong>Admissions are open once a year in India</strong>, following the traditional academic calendar. Our admission process is designed to ensure the best fit for both students and families.
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab('process')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'process'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Application Process
            </button>
            <button
              onClick={() => setActiveTab('requirements')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'requirements'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Requirements
            </button>
            <button
              onClick={() => setActiveTab('dates')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'dates'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Important Dates
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'faq'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              FAQ
            </button>
          </div>
        </div>
      </section>

      {/* Application Process */}
      {activeTab === 'process' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Application Process
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Our streamlined admission process is designed to be transparent and supportive, ensuring that every family has a clear understanding of what to expect.
              </p>
            </div>
            
            <div className="space-y-8">
              {admissionSteps.map((step, index) => (
                <Card key={step.step} variant="elevated" className="relative">
                  <div className="flex flex-col lg:flex-row items-start gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {step.step}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 lg:mb-0">
                          {step.title}
                        </h3>
                        <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                          {step.duration}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                          Requirements:
                        </h4>
                        <ul className="space-y-2">
                          {step.requirements.map((requirement, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              {requirement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {index < admissionSteps.length - 1 && (
                    <div className="absolute left-10 top-20 w-0.5 h-16 bg-gradient-to-b from-blue-500 to-purple-600 lg:block hidden"></div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Requirements */}
      {activeTab === 'requirements' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Admission Requirements
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                To ensure a smooth application process, please review and prepare all required documents and materials.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {requirements.map((category, index) => (
                <Card key={index} variant="elevated" className="h-fit">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                    {category.category}
                  </h3>
                  <ul className="space-y-4">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Card variant="elevated" className="p-8 bg-gradient-to-br from-blue-50 to-purple-50">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Need Help with Requirements?
                </h3>
                <p className="text-gray-600 mb-6">
                  Our admissions team is here to help you navigate the application process and answer any questions you may have.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="gradient" size="lg">
                    Contact Admissions
                  </Button>
                  <Button variant="outline" size="lg">
                    Download Checklist
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Important Dates */}
      {activeTab === 'dates' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Important Dates
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Mark your calendar with these important admission deadlines and events to ensure a smooth application process.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {importantDates.map((period, index) => (
                <Card key={index} variant="elevated">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    {period.period}
                  </h3>
                  <div className="space-y-4">
                    {period.dates.map((date, idx) => (
                      <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                        <span className="text-gray-700 font-medium">{date.event}</span>
                        <span className="text-blue-600 font-semibold">{date.date}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Card variant="elevated" className="p-8 bg-gradient-to-br from-yellow-50 to-orange-50">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Important Notice: Annual Admission Cycle
                </h3>
                <p className="text-gray-600 mb-6">
                  Following the Indian education system, {schoolInfo?.name || 'Bright Future Academy'} conducts admissions <strong>only once per year</strong>. The admission process begins in January and concludes before the new academic year starts in July. Please ensure you submit your application within the specified timeline.
                </p>
                <Button variant="gradient" size="lg">
                  Download Admission Calendar
                </Button>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {activeTab === 'faq' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Find answers to common questions about our admission process, requirements, and policies.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                             <Card variant="elevated">
                 <h3 className="text-lg font-bold text-gray-900 mb-4">What is the application deadline?</h3>
                 <p className="text-gray-600 text-sm leading-relaxed">
                   Following the Indian education system, applications are accepted from January 15 to March 31 for the academic year beginning in July. Late applications are not considered.
                 </p>
               </Card>
              
              <Card variant="elevated">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Is financial aid available?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes, we offer need-based financial aid and merit scholarships. Families must complete the financial aid application to be considered for assistance.
                </p>
              </Card>
              
              <Card variant="elevated">
                <h3 className="text-lg font-bold text-gray-900 mb-4">What is the student-teacher ratio?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our average class size is 20 students, with a student-teacher ratio of approximately 12:1, ensuring personalized attention for every student.
                </p>
              </Card>
              
              <Card variant="elevated">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Do you offer transportation?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We provide bus transportation for students within a 15-mile radius of the school. Additional routes may be available based on demand.
                </p>
              </Card>
              
              <Card variant="elevated">
                <h3 className="text-lg font-bold text-gray-900 mb-4">What extracurricular activities are available?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We offer a wide range of activities including sports, arts, music, clubs, and community service opportunities. New clubs can be formed based on student interest.
                </p>
              </Card>
              
                             <Card variant="elevated">
                 <h3 className="text-lg font-bold text-gray-900 mb-4">Can I apply mid-year?</h3>
                 <p className="text-gray-600 text-sm leading-relaxed">
                   No, following the Indian education system, we only accept applications during the annual admission cycle (January-March). Mid-year transfers are not available.
                 </p>
               </Card>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Apply?
          </h2>
          <p className="text-xl mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Start your child&apos;s educational journey with us. Our admissions team is here to guide you through every step of the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl">
              Start Application
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
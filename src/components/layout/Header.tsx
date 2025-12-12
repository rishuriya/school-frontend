'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import schoolProfileService from '../../services/schoolProfileService';
import { APP_CONFIG } from '../../config/app';
import { SchoolInfo } from '../../types/school';
import Image from 'next/image';

interface HeaderProps {
  overlay?: boolean;
  showTitle?: boolean;
}

const Header: React.FC<HeaderProps> = ({ overlay = false, showTitle = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo | null>(null);

  React.useEffect(() => {
    const fetchSchoolInfo = async () => {
      try {
        // Fetch from backend using school ID
        const profile = await schoolProfileService.getSchoolProfileById(APP_CONFIG.school.id);
        const mappedSchoolInfo: SchoolInfo = {
          id: profile._id || '',
          name: profile.name,
          tagline: profile.moto || 'Excellence in Education',
          description: profile.profile?.mission || '',
          address: `${profile.address?.street || ''}, ${profile.address?.city || ''}, ${profile.address?.state || ''} ${profile.address?.zipCode || ''}`.trim(),
          city: profile.address?.city || '',
          phone: profile.contactPhone || '',
          email: profile.contactEmail || '',
          website: profile.subdomain || '',
          logo: profile.logoUrl,
          established: profile.profile?.established ? new Date(profile.profile.established).getFullYear() : 2000,
        };
        setSchoolInfo(mappedSchoolInfo);
      } catch (error) {
        console.error('Failed to fetch school info:', error);
        // Set fallback data
        setSchoolInfo({
          id: '',
          name: 'School Name',
          tagline: 'Excellence in Education',
          description: '',
          address: '',
          city: '',
          phone: '',
          email: '',
          website: '',
          established: 2000,
        });
      }
    };
    fetchSchoolInfo();
  }, []);

  const toggleMobileDropdown = (itemName: string) => {
    setOpenMobileDropdown(openMobileDropdown === itemName ? null : itemName);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setOpenMobileDropdown(null);
  };


  const navigation: Array<{ name: string; href?: string; children?: { name: string; href: string }[] }> = [
    { name: 'Home', href: '/' },
    { 
      name: 'About',
      href: '/about',
      children: [
        { name: 'Our Story', href: '/about#story' },
        { name: 'Mission & Vision', href: '/about#mission' },
        { name: 'Goals', href: '/about#goals' },
        { name: 'Core Values', href: '/about#values' },
      ],
    },
    { 
      name: 'Academics', 
      href: '/students',
      children: [
        { name: 'Programs', href: '/programs' },
        { name: 'Curriculum', href: '/students/curriculum' },
        { name: 'Class Materials', href: '/students/class-materials' },
        { name: 'Exam Routine', href: '/students/exam-routine' },
        { name: 'Notices', href: '/students/notices' },
        { name: 'Fees', href: '/students/fees' },
        { name: 'Uniform Guidelines', href: '/students/uniform' },
        { name: 'Library Regulations', href: '/students#library-regulations' },
        { name: 'Attendance Policy', href: '/students#attendance-policy' },
        { name: 'Arrival & Departure', href: '/students#arrival-departure' },
      ]
    },
    { 
      name: 'Campus', 
      href: '/facilities',
      children: [
        { name: 'All Facilities', href: '/facilities' },
        { name: 'Parent Portal', href: '/facilities/parent-portal' },
        { name: 'Sports Complex', href: '/facilities/sports-complex' },
        { name: 'Science Lab', href: '/facilities/science-lab' },
        { name: 'Library', href: '/facilities/library' },
        { name: 'Other Facilities', href: '/facilities/others' },
      ]
    },
    {
      name: 'Admissions',
      href: '/admissions',
      children: [
        { name: 'Apply Now', href: '/admissions#apply' },
        { name: 'Admission Process', href: '/admissions#process' },
        { name: 'Requirements', href: '/admissions#requirements' },
        { name: 'Fee Structure', href: '/admissions#fees' },
      ],
    },
    {
      name: 'News & Events',
      href: '/events',
      children: [
        { name: 'Events', href: '/events' },
        { name: 'News', href: '/news' },
      ],
    },
    {
      name: 'Resources',
      children: [
        { name: 'CBSE Mandatory Disclosure', href: '/cbse-mandatory-disclosure' },
        { name: 'Online Fee Payment', href: '/online-fee-payment' },
        { name: 'Contact Us', href: '/contact' },
      ],
    },
  ];

  const isCentered = !showTitle;

  return (
    <header className={`${overlay ? 'absolute top-0 left-0 w-full z-50 bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50'} overflow-visible`}>
      <div className="w-full max-w-full overflow-visible">
        <div className={`flex ${isCentered ? 'justify-center' : 'justify-between'} items-center h-16 sm:h-20 px-3 sm:px-4 md:px-6 lg:px-8 gap-2 sm:gap-4 relative overflow-visible`}>
          {/* Logo */}
          {showTitle && (
          <div className="flex items-center flex-shrink-0 min-w-0 max-w-[40%] sm:max-w-[35%] md:max-w-[30%]">
            <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 group w-full min-w-0">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg overflow-hidden transition-all duration-300 group-hover:scale-110 flex-shrink-0 ${overlay ? 'bg-white/20 backdrop-blur-sm border border-white/30' : 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-blue-500/25'}`}>
                {schoolInfo?.logo ? (
                  <Image 
                    src={schoolInfo.logo} 
                    alt="School logo" 
                    width={48} 
                    height={48}
                    className="w-full h-full object-cover rounded-lg sm:rounded-xl md:rounded-2xl" 
                  />
                ) : (
                  <span className={`${overlay ? 'text-white' : 'text-white'} font-bold text-sm sm:text-base md:text-lg`}>
                    {schoolInfo?.name?.charAt(0) || 'S'}
                  </span>
                )}
              </div>
              <div className="hidden sm:block min-w-0 flex-1 overflow-hidden">
                {overlay ? (
                  <>
                    <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white truncate group-hover:text-white/90 transition-colors duration-300 leading-tight">
                      {schoolInfo?.name || 'St. Joseph Catholic School'}
                    </h1>
                    <p className="text-[10px] sm:text-xs text-white/80 group-hover:text-white/90 transition-colors duration-300 truncate leading-tight hidden md:block">
                      {schoolInfo?.tagline || 'Let your light shine'}
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300 leading-tight">
                      {schoolInfo?.name || 'St. Joseph Catholic School'}
                    </h1>
                    <p className="text-[10px] sm:text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300 truncate leading-tight hidden md:block">
                      {schoolInfo?.tagline || 'Let your light shine'}
                    </p>
                  </>
                )}
              </div>
            </Link>
          </div>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-1 relative items-center flex-1 min-w-0 justify-center max-w-full">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative group flex-shrink-0"
                style={{ 
                  padding: '8px',
                  margin: '-8px' // Extended hover area
                }}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`${overlay ? 'text-white hover:text-white/90' : 'text-gray-700 hover:text-blue-600'} px-2 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center rounded-xl hover:bg-white/10 backdrop-blur-sm whitespace-nowrap`}
                  >
                    {item.name}
                    {item.children && (
                      <svg className="ml-1 lg:ml-2 w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-300 group-hover:rotate-180 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                ) : (
                  <span className={`${overlay ? 'text-white' : 'text-gray-700'} px-2 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm font-semibold whitespace-nowrap`}>{item.name}</span>
                )}

                {/* CSS-only dropdown */}
                {item.children && (
                  <div 
                    className={`absolute left-0 w-64 rounded-2xl shadow-2xl ${overlay ? 'bg-white/95 backdrop-blur-md border border-white/20' : 'bg-white border border-gray-200/50'} ring-1 ring-black/5 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform translate-y-2 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto`}
                    style={{ 
                      top: 'calc(100% + 4px)',
                      zIndex: 9999 
                    }}
                  >
                    <div className="px-2">
                      {item.children.map((child, index) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-xl transition-all duration-300 hover:translate-x-1 group/item"
                        >
                          <div className="flex items-center">
                            <span className="group-hover/item:scale-110 transition-transform duration-200">
                              {child.name.includes('Curriculum') ? '📚' :
                               child.name.includes('Uniform') ? '👔' :
                               child.name.includes('Library') ? '📖' :
                               child.name.includes('Attendance') ? '📅' :
                               child.name.includes('Arrival') ? '🚶' :
                               child.name.includes('Fees') || child.name.includes('Fee') ? '💰' :
                               child.name.includes('Notices') ? '📢' :
                               child.name.includes('Exam') ? '📝' :
                               child.name.includes('Class Materials') || child.name.includes('Materials') ? '📁' :
                               child.name.includes('Parent Portal') ? '👨‍👩‍👧‍👦' :
                               child.name.includes('Sports') ? '⚽' :
                               child.name.includes('Science') ? '🔬' :
                               child.name.includes('Other') || child.name.includes('Facilities') ? '🏢' :
                               child.name.includes('Programs') ? '🎓' :
                               child.name.includes('Apply') ? '✍️' :
                               child.name.includes('Process') ? '📋' :
                               child.name.includes('Requirements') ? '📝' :
                               child.name.includes('Events') ? '📅' :
                               child.name.includes('News') ? '📰' :
                               child.name.includes('CBSE') ? '📜' :
                               child.name.includes('Payment') ? '💳' :
                               child.name.includes('Contact') ? '📞' : '📄'}
                            </span>
                            <span className="ml-3 font-medium">{child.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isCentered && (
              <Link
                href="/admissions#apply"
                title="Apply Now"
                className={`ml-2 lg:ml-4 ${overlay ? 'bg-white/20 text-white hover:bg-white/30 border border-white/30' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border border-blue-500/20'} px-3 lg:px-6 py-2 lg:py-3 rounded-lg lg:rounded-xl text-xs lg:text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap backdrop-blur-sm flex-shrink-0`}
              >
                <span className="flex items-center">
                  <svg className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="hidden lg:inline">Apply Now</span>
                  <span className="lg:hidden">Apply</span>
                </span>
              </Link>
            )}
          </nav>

         

          {/* Mobile menu button */}
          <div className="md:hidden flex-shrink-0">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${overlay ? 'text-white hover:text-white/80 bg-white/10' : 'text-gray-700 hover:text-blue-600 bg-gray-100/50'} focus:outline-none transition-all duration-300 p-2 sm:p-3 rounded-lg sm:rounded-xl backdrop-blur-sm touch-manipulation`}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className={`px-3 sm:px-4 pt-3 sm:pt-4 pb-4 sm:pb-6 space-y-1 sm:space-y-2 ${overlay ? 'bg-black/50 backdrop-blur-md border-t border-white/20' : 'bg-white/95 backdrop-blur-md border-t border-gray-200/50'}`}>
              {navigation.map((item) => (
                <div key={item.name} className="border-b border-gray-200/30 pb-1 sm:pb-2 last:border-b-0">
                  <div className="flex items-center justify-between min-h-[44px]">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={`${overlay ? 'text-white hover:text-white/90' : 'text-gray-700 hover:text-blue-600'} flex-1 block px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold transition-all duration-300 rounded-lg sm:rounded-xl hover:bg-white/10 touch-manipulation`}
                        onClick={closeMobileMenu}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <span className={`${overlay ? 'text-white' : 'text-gray-700'} flex-1 block px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold`}>{item.name}</span>
                    )}
                    {item.children && (
                      <button
                        onClick={() => toggleMobileDropdown(item.name)}
                        className={`${overlay ? 'text-white hover:text-white/90' : 'text-gray-700 hover:text-blue-600'} px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-white/10 transition-all duration-300 touch-manipulation min-w-[44px] flex items-center justify-center`}
                        aria-label={`Toggle ${item.name} menu`}
                      >
                        <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${openMobileDropdown === item.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {item.children && openMobileDropdown === item.name && (
                    <div className="ml-2 sm:ml-4 mt-1 sm:mt-2 space-y-0.5 sm:space-y-1 bg-white/10 rounded-lg sm:rounded-xl p-1.5 sm:p-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`${overlay ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-blue-600'} flex items-center px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 hover:bg-white/20 group touch-manipulation min-h-[44px]`}
                          onClick={closeMobileMenu}
                        >
                          <span className="mr-2 sm:mr-3 text-base sm:text-lg flex-shrink-0">
                            {child.name.includes('Curriculum') ? '📚' :
                             child.name.includes('Uniform') ? '👔' :
                             child.name.includes('Library') ? '📖' :
                             child.name.includes('Attendance') ? '📅' :
                             child.name.includes('Arrival') ? '🚶' :
                             child.name.includes('Fees') || child.name.includes('Fee') ? '💰' :
                             child.name.includes('Notices') ? '📢' :
                             child.name.includes('Exam') ? '📝' :
                             child.name.includes('Class Materials') || child.name.includes('Materials') ? '📁' :
                             child.name.includes('Parent Portal') ? '👨‍👩‍👧‍👦' :
                             child.name.includes('Sports') ? '⚽' :
                             child.name.includes('Science') ? '🔬' :
                             child.name.includes('Other') || child.name.includes('Facilities') ? '🏢' :
                             child.name.includes('Programs') ? '🎓' :
                             child.name.includes('Apply') ? '✍️' :
                             child.name.includes('Process') ? '📋' :
                             child.name.includes('Requirements') ? '📝' :
                             child.name.includes('Events') ? '📅' :
                             child.name.includes('News') ? '📰' :
                             child.name.includes('CBSE') ? '📜' :
                             child.name.includes('Payment') ? '💳' :
                             child.name.includes('Contact') ? '📞' : '📄'}
                          </span>
                          <span className="group-hover:translate-x-1 transition-transform duration-200 truncate">{child.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 sm:pt-4">
                <Link
                  href="/admissions#apply"
                  className={`${overlay ? 'bg-white/20 text-white hover:bg-white/30 border border-white/30' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 border border-blue-500/20'} flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm touch-manipulation min-h-[44px]`}
                  onClick={closeMobileMenu}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 
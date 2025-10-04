'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { schoolApi } from '../../services/api';
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
        const info = await schoolApi.getSchoolInfo();
        setSchoolInfo(info);
      } catch (error) {
        console.error('Failed to fetch school info:', error);
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
        { name: 'Mission', href: '/about#mission' },
        { name: 'Goals', href: '/about#goals' },
        { name: 'Core Values', href: '/about#values' },
        { name: 'Facilities', href: '/about#facilities' },
        { name: 'Contact', href: '/about#contact' },
      ],
    },
    { name: 'Programs', href: '/programs' },
    { 
      name: 'Students', 
      href: '/students',
      children: [
        { name: 'Curriculum', href: '/students/curriculum' },
        { name: 'Uniform Guidelines', href: '/students/uniform' },
        { name: 'Library Regulations', href: '/students#library-regulations' },
        { name: 'Attendance Policy', href: '/students#attendance-policy' },
        { name: 'Arrival & Departure', href: '/students#arrival-departure' },
        { name: 'Fees', href: '/students/fees' },
        { name: 'Notices', href: '/students/notices' },
        { name: 'Exam Routine', href: '/students/exam-routine' },
        { name: 'Class Materials', href: '/students/class-materials' },
      ]
    },
    { 
      name: 'Facilities', 
      href: '/facilities',
      children: [
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
        { name: 'Apply', href: '/admissions#apply' },
        { name: 'Admission Process', href: '/admissions#process' },
        { name: 'Fee Structure', href: '/admissions#fees' },
      ],
    },
    { name: 'News', href: '/news' },
    { name: 'Events', href: '/events' },
    {
      name: 'More',
      children: [
        { name: 'CBSE Mandatory Disclosure', href: '/cbse-mandatory-disclosure' },
        { name: 'Online Fee Payment', href: '/online-fee-payment' },
      ],
    },
    { name: 'Contact', href: '/contact' },
  ];

  const isCentered = !showTitle;

  return (
    <header className={`${overlay ? 'absolute top-0 left-0 w-full z-50 bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50'}`}>
      <div className="w-full">
        <div className={`flex ${isCentered ? 'justify-center' : 'justify-between'} items-center h-20 px-4 sm:px-6 lg:px-8`}>
          {/* Logo */}
          {showTitle && (
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-4 group">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden transition-all duration-300 group-hover:scale-110 ${overlay ? 'bg-white/20 backdrop-blur-sm border border-white/30' : 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-blue-500/25'}`}>
                {schoolInfo?.logo ? (
                  <Image src={schoolInfo.logo} alt="School logo" className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  <span className={`${overlay ? 'text-white' : 'text-white'} font-bold text-xl`}>
                    {schoolInfo?.name?.charAt(0) || 'S'}
                  </span>
                )}
              </div>
              <div className="hidden sm:block min-w-0">
                {overlay ? (
                  <>
                    <h1 className="text-2xl font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis group-hover:text-white/90 transition-colors duration-300">
                      {schoolInfo?.name || 'St. Joseph Catholic School'}
                    </h1>
                    <p className="text-sm text-white/80 group-hover:text-white/90 transition-colors duration-300">
                      {schoolInfo?.tagline || 'Let your light shine'}
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap overflow-hidden text-ellipsis group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300">
                      {schoolInfo?.name || 'St. Joseph Catholic School'}
                    </h1>
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {schoolInfo?.tagline || 'Let your light shine'}
                    </p>
                  </>
                )}
              </div>
            </Link>
          </div>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-1 relative items-center whitespace-nowrap">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative group"
                style={{ 
                  padding: '8px',
                  margin: '-8px' // Extended hover area
                }}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`${overlay ? 'text-white hover:text-white/90' : 'text-gray-700 hover:text-blue-600'} px-4 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center rounded-xl hover:bg-white/10 backdrop-blur-sm`}
                  >
                    {item.name}
                    {item.children && (
                      <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                ) : (
                  <span className={`${overlay ? 'text-white' : 'text-gray-700'} px-4 py-3 text-sm font-semibold`}>{item.name}</span>
                )}

                {/* CSS-only dropdown */}
                {item.children && (
                  <div 
                    className={`absolute left-0 w-64 rounded-2xl shadow-2xl ${overlay ? 'bg-white/95 backdrop-blur-md border border-white/20' : 'bg-white border border-gray-200/50'} ring-1 ring-black/5 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform translate-y-2 group-hover:translate-y-0`}
                    style={{ 
                      top: '100%',
                      marginTop: '4px',
                      zIndex: 1000 
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
                               child.name.includes('Fees') ? '💰' :
                               child.name.includes('Notices') ? '📢' :
                               child.name.includes('Exam') ? '📝' :
                               child.name.includes('Class Materials') ? '📁' :
                               child.name.includes('Parent Portal') ? '👨‍👩‍👧‍👦' :
                               child.name.includes('Sports') ? '⚽' :
                               child.name.includes('Science') ? '🔬' :
                               child.name.includes('Library') ? '📚' :
                               child.name.includes('Other') ? '🏢' : '📄'}
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
                className={`ml-4 ${overlay ? 'bg-white/20 text-white hover:bg-white/30 border border-white/30' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border border-blue-500/20'} px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap backdrop-blur-sm`}
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Apply Now
                </span>
              </Link>
            )}
          </nav>

          {/* CTA Button */}
          {!isCentered && (
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/contact"
              title="Apply Now"
              className={`${overlay ? 'bg-white/20 text-white hover:bg-white/30 border border-white/30' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border border-blue-500/20'} px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap backdrop-blur-sm`}
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Apply Now
              </span>
            </Link>
          </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${overlay ? 'text-white hover:text-white/80 bg-white/10' : 'text-gray-700 hover:text-blue-600 bg-gray-100/50'} focus:outline-none transition-all duration-300 p-3 rounded-xl backdrop-blur-sm`}
            >
              <svg className="h-6 w-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="md:hidden">
            <div className={`px-4 pt-4 pb-6 space-y-2 ${overlay ? 'bg-black/50 backdrop-blur-md border-t border-white/20' : 'bg-white/95 backdrop-blur-md border-t border-gray-200/50'}`}>
              {navigation.map((item) => (
                <div key={item.name} className="border-b border-gray-200/30 pb-2">
                  <div className="flex items-center justify-between">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={`${overlay ? 'text-white hover:text-white/90' : 'text-gray-700 hover:text-blue-600'} block px-4 py-3 text-base font-semibold transition-all duration-300 rounded-xl hover:bg-white/10`}
                        onClick={closeMobileMenu}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <span className={`${overlay ? 'text-white' : 'text-gray-700'} block px-4 py-3 text-base font-semibold`}>{item.name}</span>
                    )}
                    {item.children && (
                      <button
                        onClick={() => toggleMobileDropdown(item.name)}
                        className={`${overlay ? 'text-white hover:text-white/90' : 'text-gray-700 hover:text-blue-600'} px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300`}
                        aria-label={`Toggle ${item.name} menu`}
                      >
                        <svg className={`w-5 h-5 transition-transform duration-300 ${openMobileDropdown === item.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {item.children && openMobileDropdown === item.name && (
                    <div className="ml-4 mt-2 space-y-1 bg-white/10 rounded-xl p-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`${overlay ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-blue-600'} flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-white/20 group`}
                          onClick={closeMobileMenu}
                        >
                          <span className="mr-3 text-lg">
                            {child.name.includes('Curriculum') ? '📚' :
                             child.name.includes('Uniform') ? '👔' :
                             child.name.includes('Library') ? '📖' :
                             child.name.includes('Attendance') ? '📅' :
                             child.name.includes('Arrival') ? '🚶' :
                             child.name.includes('Fees') ? '💰' :
                             child.name.includes('Notices') ? '📢' :
                             child.name.includes('Exam') ? '📝' :
                             child.name.includes('Class Materials') ? '📁' :
                             child.name.includes('Parent Portal') ? '👨‍👩‍👧‍👦' :
                             child.name.includes('Sports') ? '⚽' :
                             child.name.includes('Science') ? '🔬' :
                             child.name.includes('Other') ? '🏢' : '📄'}
                          </span>
                          <span className="group-hover:translate-x-1 transition-transform duration-200">{child.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Link
                  href="/admissions#apply"
                  className={`${overlay ? 'bg-white/20 text-white hover:bg-white/30 border border-white/30' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 border border-blue-500/20'} flex items-center justify-center px-6 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm`}
                  onClick={closeMobileMenu}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
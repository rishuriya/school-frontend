'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { schoolApi } from '../../services/api';
import { SchoolInfo } from '../../types/school';

interface HeaderProps {
  overlay?: boolean;
  showTitle?: boolean;
}

const Header: React.FC<HeaderProps> = ({ overlay = false, showTitle = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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

  const navigation: Array<{ name: string; href?: string; children?: { name: string; href: string }[] }> = [
    { name: 'Home', href: '/' },
    { 
      name: 'About',
      href: '/about',
      children: [
        { name: 'Our Story', href: '/about#story' },
        { name: 'Mission', href: '/about#mission' },
        { name: 'Vision', href: '/about#vision' },
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
        { name: 'Uniform', href: '/students/uniform' },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex ${isCentered ? 'justify-center' : 'justify-between'} items-center h-16`}>
          {/* Logo */}
          {showTitle && (
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg overflow-hidden ${overlay ? 'bg-white/20 backdrop-blur-sm' : 'bg-gradient-to-br from-blue-600 to-purple-600'}`}>
                {schoolInfo?.logo ? (
                  <img src={schoolInfo.logo} alt="School logo" className="w-full h-full object-cover" />
                ) : (
                  <span className={`${overlay ? 'text-white' : 'text-white'} font-bold text-lg`}>
                    {schoolInfo?.name?.charAt(0) || 'B'}
                  </span>
                )}
              </div>
              <div className="hidden sm:block min-w-0">
                {overlay ? (
                  <>
                    <h1 className="text-xl font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">
                      {schoolInfo?.name || 'Bright Future Academy'}
                    </h1>
                    <p className="text-sm text-white/80">
                      {schoolInfo?.tagline || 'Empowering Minds, Building Futures'}
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap overflow-hidden text-ellipsis">
                      {schoolInfo?.name || 'Bright Future Academy'}
                    </h1>
                    <p className="text-sm text-gray-600">
                      {schoolInfo?.tagline || 'Empowering Minds, Building Futures'}
                    </p>
                  </>
                )}
              </div>
            </Link>
          </div>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 relative items-center whitespace-nowrap">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.children ? item.name : null)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`${overlay ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-blue-600'} px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 inline-flex items-center`}
                  >
                    {item.name}
                    {item.children && (
                      <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                ) : (
                  <span className={`${overlay ? 'text-white' : 'text-gray-700'} px-3 py-2 text-sm font-medium`}>{item.name}</span>
                )}

                {item.children && openDropdown === item.name && (
                  <div className={`absolute left-0 mt-2 w-56 rounded-lg shadow-lg ${overlay ? 'bg-white/90 backdrop-blur-md' : 'bg-white'} ring-1 ring-black/5 py-2`}>
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isCentered && (
              <Link
                href="/admissions#apply"
                title="Apply Now"
                className={`ml-2 ${overlay ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'} px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap`}
              >
                Apply Now
              </Link>
            )}
          </nav>

          {/* CTA Button */}
          {!isCentered && (
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/contact"
              title="Apply Now"
              className={`${overlay ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'} px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap`}
            >
              Apply Now
            </Link>
          </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${overlay ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-blue-600 focus:text-blue-600'} focus:outline-none transition-colors duration-300`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${overlay ? 'bg-black/40 backdrop-blur-md' : 'bg-white/95 backdrop-blur-md border-t border-gray-200/50'}`}>
              {navigation.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={`${overlay ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-blue-600'} block px-3 py-2 text-base font-medium transition-colors duration-300`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <span className={`${overlay ? 'text-white' : 'text-gray-700'} block px-3 py-2 text-base font-medium`}>{item.name}</span>
                    )}
                    {item.children && (
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        className={`${overlay ? 'text-white' : 'text-gray-700'} px-3 py-2`}
                        aria-label={`Toggle ${item.name} menu`}
                      >
                        <svg className={`w-5 h-5 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {item.children && openDropdown === item.name && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`${overlay ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-blue-600'} block px-3 py-2 text-sm font-medium rounded-md transition-colors duration-300`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/admissions#apply"
                className={`${overlay ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'} block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 mt-4`}
                onClick={() => setIsMenuOpen(false)}
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 
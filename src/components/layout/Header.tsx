'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { schoolApi } from '../../services/api';
import { SchoolInfo } from '../../types/school';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/programs' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'News', href: '/news' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">
                  {schoolInfo?.name?.charAt(0) || 'B'}
                </span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {schoolInfo?.name || 'Bright Future Academy'}
                </h1>
                <p className="text-sm text-gray-600">
                  {schoolInfo?.tagline || 'Empowering Minds, Building Futures'}
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 transition-colors duration-300"
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t border-gray-200/50">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white block px-3 py-2 rounded-lg text-base font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 mt-4"
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
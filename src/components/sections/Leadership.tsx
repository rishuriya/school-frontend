'use client';

import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Leadership as LeadershipType } from '../../types/school';
import Image from 'next/image';

const MESSAGE_WORD_LIMIT = 20;

const getWordCount = (text: string): number => {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
};

const truncateMessage = (text: string, wordLimit: number): string => {
  const trimmed = text.trim();
  const words = trimmed.split(/\s+/);
  if (words.length <= wordLimit) return trimmed;
  return words.slice(0, wordLimit).join(' ');
};

const renderMessageWithLineBreaks = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, idx) => (
    <React.Fragment key={idx}>
      {line}
      {idx < lines.length - 1 && <br />}
    </React.Fragment>
  ));
};
interface LeadershipProps {
  leaders: LeadershipType[];
}

const Leadership: React.FC<LeadershipProps> = ({ leaders }) => {
  const [activeTab, setActiveTab] = useState(0);
  // Track which leader's message is expanded (only one at a time)
  const [expandedLeaderKey, setExpandedLeaderKey] = useState<string | null>(null);

  // Dynamic position colors based on index
  const getPositionColor = (index: number) => {
    const colors = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-purple-500 to-pink-600',
      'from-orange-500 to-red-600',
      'from-indigo-500 to-blue-600',
      'from-pink-500 to-rose-600',
    ];
    return colors[index % colors.length];
  };

  // Dynamic position icon
  const getPositionIcon = (position: string) => {
    // Check if position contains certain keywords
    const pos = position.toLowerCase();
    
    if (pos.includes('principal') || pos.includes('head')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    } else if (pos.includes('director') || pos.includes('admin')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    } else if (pos.includes('teacher')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      );
    } else {
      // Default icon for any other position
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    }
  };

  if (!leaders || leaders.length === 0) {
    return null; // Don't show section if no leaders
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Leadership & Faculty Speaks
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Hear from our dedicated educators and leaders who are committed to shaping the future of our students.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {leaders.map((leader, index) => {
            const leaderKey = leader.id ?? `leader-${index}`;
            return (
            <button
              key={leaderKey}
              onClick={() => setActiveTab(index)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === index
                  ? `bg-gradient-to-r ${getPositionColor(index)} text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
              >
              <div className={`p-2 rounded-full ${
                activeTab === index ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                {getPositionIcon(leader.position)}
              </div>
              <span>{leader.position.charAt(0).toUpperCase() + leader.position.slice(1)}</span>
            </button>
          )})}
        </div>

        {/* Leadership Content - show all leaders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {leaders.map((leader, index) => {
            const leaderKey = leader.id ?? `leader-${index}`;
            return (
            <Card
              key={leaderKey}
              variant="elevated"
              className={`transition-all duration-500 transform ${
                activeTab === index
                  ? 'scale-105 shadow-2xl'
                  : 'scale-95 opacity-75'
              }`}
            >
              {/* Leader Image */}
              <div className="relative mb-6">
                <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden">
                  <Image
                    src={leader.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'}
                    alt={leader.name}
                    width={400}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`absolute -bottom-4 left-6 w-16 h-16 bg-gradient-to-r ${getPositionColor(index)} rounded-full flex items-center justify-center shadow-lg text-white`}>
                  {getPositionIcon(leader.position)}
                </div>
              </div>

              {/* Leader Info */}
              <div className="pl-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                <p className={`inline-block px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${getPositionColor(index)} text-white mb-3`}>
                  {leader.position.charAt(0).toUpperCase() + leader.position.slice(1)}
                </p>
                {leader.experience && (
                  <p className="text-gray-600 mb-4">{leader.experience}</p>
                )}

                {/* Message */}
                {leader.message && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Message</h4>
                    {(() => {
                      const fullMessage = leader.message || '';
                      const isActiveCard = index === activeTab;
                      const isExpanded = isActiveCard && expandedLeaderKey === leaderKey;
                      const wordCount = getWordCount(fullMessage);
                      const shouldTruncate =
                        !isActiveCard || (wordCount > MESSAGE_WORD_LIMIT && !isExpanded);
                      const displayText = shouldTruncate
                        ? truncateMessage(fullMessage, MESSAGE_WORD_LIMIT)
                        : fullMessage;

                      return (
                        <>
                          <p className="text-gray-600 leading-relaxed italic">
                            &ldquo;{renderMessageWithLineBreaks(displayText)}
                            {shouldTruncate && '...'}&rdquo;
                          </p>
                          {isActiveCard && wordCount > MESSAGE_WORD_LIMIT && (
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedLeaderKey(isExpanded ? null : leaderKey)
                              }
                              className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-semibold"
                            >
                              {isExpanded ? 'Show less' : 'Show more'}
                            </button>
                          )}
                        </>
                      );
                    })()}
                  </div>
                )}

                {/* Achievements */}
                {leader.achievements && leader.achievements.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Achievements</h4>
                    <ul className="space-y-2">
                      {leader.achievements.slice(0, 3).map((achievement, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className={`w-2 h-2 bg-gradient-to-r ${getPositionColor(index)} rounded-full mt-2 flex-shrink-0`}></div>
                          <span className="text-sm text-gray-600">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Contact */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center space-x-4">
                    {leader.email && (
                      <a
                        href={`mailto:${leader.email}`}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm">Email</span>
                      </a>
                    )}
                    {leader.phone && (
                      <a
                        href={`tel:${leader.phone}`}
                        className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm">Call</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )})}
        </div>

      
      </div>
    </section>
  );
};

export default Leadership; 
'use client';

import React from 'react';
import { SchoolProfile } from '@/types/school';
import Card from '../ui/Card';

interface GoalsSectionProps {
  profile: SchoolProfile;
  template?: 'grid' | 'list' | 'timeline' | 'cards';
  showOnlyWithIcons?: boolean;
  sectionTitle?: string;
  sectionDescription?: string;
}

export const GoalsSection: React.FC<GoalsSectionProps> = ({ 
  profile, 
  template = 'grid',
  showOnlyWithIcons = false,
  sectionTitle = 'Our Goals',
  sectionDescription = 'Strategic goals that guide our educational mission and community development.'
}) => {
  const goals = profile.profile?.goals;
  const layout = profile.profile?.layout?.sections?.goals;
  
  if (!goals || goals.length === 0 || layout?.show === false) return null;

  // Filter goals if needed
  let filteredGoals = Array.isArray(goals) ? [...goals] : [];
  if (showOnlyWithIcons) {
    filteredGoals = filteredGoals.filter(goal => {
      if (typeof goal === 'string') return false;
      return goal.icon;
    });
  }

  if (filteredGoals.length === 0) return null;

  // Type for goal (can be string or object)
  type GoalType = string | {
    text?: string;
    title?: string;
    description?: string;
    icon?: string;
    order: number;
  };

  // Sort goals by order
  const sortedGoals = filteredGoals.sort((a: GoalType, b: GoalType) => {
    if (typeof a === 'string' || typeof b === 'string') return 0;
    return (a.order || 0) - (b.order || 0);
  });

  const selectedTemplate = template || layout?.template || 'grid';

  // Helper functions to get goal data (handles both old string format and new object format)
  const getGoalTitle = (goal: GoalType) => {
    if (typeof goal === 'string') return goal;
    return goal.title || goal.text || 'Goal';
  };

  const getGoalDescription = (goal: GoalType) => {
    if (typeof goal === 'string') return null;
    return goal.description || null;
  };

  const getGoalText = (goal: GoalType) => {
    if (typeof goal === 'string') return goal;
    // If we have title and description, combine them. Otherwise use text or title.
    if (goal.title && goal.description) {
      return `${goal.title}: ${goal.description}`;
    }
    return goal.title || goal.text || goal.description || 'Goal';
  };

  const getGoalIcon = (goal: GoalType) => typeof goal === 'object' ? goal.icon : null;

  // Helper to render goal icon
  const renderGoalIcon = (goal: GoalType, index: number, bgClass: string = '') => {
    const icon = getGoalIcon(goal);
    if (icon) {
      // Check if it's an emoji
      if (icon.match(/[\u{1F300}-\u{1F9FF}]/u)) {
        return <span className="text-4xl">{icon}</span>;
      }
      // Otherwise render as icon name
      return (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon === 'target' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 110 20 10 10 0 010-20zm0 4a6 6 0 100 12 6 6 0 000-12zm0 2a4 4 0 110 8 4 4 0 010-8z" />}
          {icon === 'star' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />}
          {icon === 'rocket' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
          {icon === 'lightbulb' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />}
          {icon === 'trophy' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />}
          {!icon || (!['target', 'star', 'rocket', 'lightbulb', 'trophy'].includes(icon)) && <span className="text-white font-bold text-xl">{index + 1}</span>}
        </svg>
      );
    }
    return <span className="text-white font-bold text-xl">{index + 1}</span>;
  };

  // Grid Layout
  if (selectedTemplate === 'grid') {
    return (
      <section id="goals" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {sectionTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {sectionDescription}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sortedGoals.map((goal, index) => {
              const title = getGoalTitle(goal);
              const description = getGoalDescription(goal);
              return (
                <Card key={index} variant="elevated" className="text-center group bg-white">
                  <div className={`w-16 h-16 ${
                    index % 4 === 0 ? 'bg-purple-600' :
                    index % 4 === 1 ? 'bg-slate-500' :
                    index % 4 === 2 ? 'bg-green-600' :
                    'bg-orange-600'
                  } rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {renderGoalIcon(goal, index, '')}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                  {description && (
                    <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
                  )}
                  {!description && (
                    <p className="text-gray-600 leading-relaxed text-sm">{getGoalText(goal)}</p>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // List Layout
  if (selectedTemplate === 'list') {
    return (
      <section id="goals" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {sectionTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {sectionDescription}
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {sortedGoals.map((goal, index) => {
              const title = getGoalTitle(goal);
              const description = getGoalDescription(goal);
              return (
                <Card key={index} variant="elevated" className="bg-white">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      {renderGoalIcon(goal, index, 'bg-blue-600')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
                      {description && (
                        <p className="text-gray-700 leading-relaxed">{description}</p>
                      )}
                      {!description && (
                        <p className="text-gray-700 leading-relaxed">{getGoalText(goal)}</p>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Timeline Layout
  if (selectedTemplate === 'timeline') {
    return (
      <section id="goals" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {sectionTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {sectionDescription}
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {sortedGoals.map((goal, index) => {
              const title = getGoalTitle(goal);
              const description = getGoalDescription(goal);
              return (
                <div key={index} className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {renderGoalIcon(goal, index, 'bg-blue-600')}
                    </div>
                    {index < sortedGoals.length - 1 && (
                      <div className="w-0.5 h-full bg-blue-200 mt-2"></div>
                    )}
                  </div>
                  <Card variant="elevated" className="flex-1 bg-white">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                    {description && (
                      <p className="text-gray-700 leading-relaxed">{description}</p>
                    )}
                    {!description && (
                      <p className="text-gray-700 leading-relaxed">{getGoalText(goal)}</p>
                    )}
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Cards Layout (Default)
  return (
    <section id="goals" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {sectionTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {sectionDescription}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedGoals.map((goal, index) => {
            const title = getGoalTitle(goal);
            const description = getGoalDescription(goal);
            const colors = [
              { bg: 'bg-blue-600', border: 'border-blue-200', gradient: 'from-blue-50 to-blue-100' },
              { bg: 'bg-green-600', border: 'border-green-200', gradient: 'from-green-50 to-green-100' },
              { bg: 'bg-purple-600', border: 'border-purple-200', gradient: 'from-purple-50 to-purple-100' },
            ];
            const color = colors[index % 3];
            
            return (
              <Card key={index} variant="elevated" className={`text-center group bg-gradient-to-br ${color.gradient} border-2 ${color.border}`}>
                <div className={`w-16 h-16 ${color.bg} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300`}>
                  {renderGoalIcon(goal, index, color.bg)}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                {description && (
                  <p className="text-gray-700 leading-relaxed text-sm">{description}</p>
                )}
                {!description && (
                  <p className="text-gray-700 leading-relaxed font-medium">{getGoalText(goal)}</p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;

'use client';

import React from 'react';
import { SchoolProfile } from '@/types/school';
import { ModernLayout } from './ModernLayout';
import { ClassicLayout } from './ClassicLayout';
import { MinimalLayout } from './MinimalLayout';
import { CreativeLayout } from './CreativeLayout';

interface SchoolProfileRendererProps {
  profile: SchoolProfile;
}

export const SchoolProfileRenderer: React.FC<SchoolProfileRendererProps> = ({ profile }) => {
  // Note: Layout template is not stored in the profile, defaulting to modern
  // Default to modern layout
  return <ModernLayout profile={profile} />;
  
  // Uncomment below if template selection is needed in the future
  // type LayoutTemplate = 'classic' | 'minimal' | 'creative' | 'modern';
  // const template: LayoutTemplate = 'modern';
  // switch (template) {
  //   case 'classic':
  //     return <ClassicLayout profile={profile} />;
  //   case 'minimal':
  //     return <MinimalLayout profile={profile} />;
  //   case 'creative':
  //     return <CreativeLayout profile={profile} />;
  //   case 'modern':
  //   default:
  //     return <ModernLayout profile={profile} />;
  // }
};

export default SchoolProfileRenderer;


export interface SchoolInfo {
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  established: number;
  logo?: string;
  city?: string;
}

export interface Leadership {
  id: string;
  name: string;
  position: 'Principal' | 'Director' | 'Chairman';
  image?: string;
  message: string;
  bio: string;
  email: string;
  phone?: string;
  experience: string;
  achievements: string[];
}

export interface AboutContent {
  id: string;
  section: 'story' | 'mission' | 'vision' | 'values' | 'facilities' | 'contact' | 'goals';
  title: string;
  subtitle?: string;
  content: string;
  image?: string;
  order: number;
  isActive: boolean;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  order: number;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  image?: string;
  features: string[];
  capacity?: string;
  order: number;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  website: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  image?: string;
  date: string;
  author: string;
  category: 'announcement' | 'event' | 'achievement' | 'general';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  isUpcoming: boolean;
  category: 'academic' | 'cultural' | 'sports' | 'community';
  organizer?: string;
  targetAudience?: string;
  registrationRequired?: boolean;
}

export interface Faculty {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  image?: string;
  bio: string;
  qualifications: string[];
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  achievements: string[];
  image?: string;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  duration: string;
  category: 'elementary' | 'middle' | 'high' | 'specialized';
  requirements: string[];
  image?: string;
  features?: string[];
  ageGroup?: string;
  classSize?: string;
  tuition?: string;
}

export interface House {
  id: string;
  name: string;
  color: string;
  description: string;
  motto?: string;
  captain?: string;
  viceCaptain?: string;
}

export interface UniformSpecification {
  id: string;
  category: 'lkg-ukg' | 'primary-boys' | 'primary-girls' | 'middle-girls' | 'winter';
  days: string;
  description: string;
  items: string[];
  applicableClasses: string;
  season?: 'regular' | 'winter' | 'house';
}

export interface LibraryRegulation {
  id: string;
  title: string;
  description: string;
  rules: string[];
  fines?: {
    lateReturn: string;
    damage: string;
  };
}

export interface AttendancePolicy {
  id: string;
  category: 'attendance' | 'punctuality' | 'leave' | 'withdrawal';
  title: string;
  description: string;
  rules: string[];
  penalties?: {
    type: string;
    amount?: string;
    consequence: string;
  }[];
} 
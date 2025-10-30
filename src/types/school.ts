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
  id: string;
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
  _id?: string;
  schoolId?: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  date?: string; // For backward compatibility
  time?: string; // For backward compatibility
  location: string;
  category: 'academic' | 'cultural' | 'sports' | 'community' | 'social' | 'religious' | 'other';
  imageUrl?: string;
  image?: string; // For backward compatibility
  isPublic?: boolean;
  isUpcoming?: boolean;
  registrationRequired?: boolean;
  maxParticipants?: number;
  organizer?: string;
  targetAudience?: string;
  createdAt?: string;
  updatedAt?: string;
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
  class?: string;
  section?: string;
  achievement?: string;
  achievements: string[];
  image?: string;
  description?: string;
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

// School Profile Types
export interface SchoolProfile {
  _id: string;
  name: string;
  subdomain: string;
  logoUrl?: string;
  brandColor: string;
  contactEmail: string;
  contactPhone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  settings: {
    allowOnlineAdmissions: boolean;
    showEvents: boolean;
    showGallery: boolean;
    showStaff: boolean;
  };
  profile?: {
    mission?: string;
    vision?: string;
    goals?: {
      text: string;
      icon?: string;
      order: number;
    }[];
    coreValues?: {
      title: string;
      description: string;
      icon?: string;
      emoji?: string;
      order: number;
      show: boolean;
    }[];
    established?: string;
    principalMessage?: string;
    principalImage?: string;
    headerImage?: string;
    aboutImage?: string;
    aboutCards?: {
      title: string;
      content: string;
      image?: string;
      imageUrl?: string;
      showImage: boolean;
      show: boolean;
      order: number;
      icon?: string;
    }[];
    rules?: {
      admission?: string[];
      parent?: string[];
      uniform?: string[];
      student?: string[];
      attendance?: string[];
      discipline?: string[];
    };
    admissionInfo?: {
      isOpen: boolean;
      startDate?: string;
      endDate?: string;
      requirements?: string[];
      process?: string[];
      fees?: {
        category: string;
        amount: string;
        description?: string;
        order: number;
      }[];
      contactNumber?: string;
      contactEmail?: string;
      policy?: string[];
      importantDates?: {
        title: string;
        date: string;
        description?: string;
        order: number;
      }[];
      faqs?: {
        question: string;
        answer: string;
        order: number;
      }[];
    };
    facilities?: {
      name: string;
      description: string;
      icon?: string;
      image?: string;
    }[];
    achievements?: {
      title: string;
      description: string;
      year: number;
      image?: string;
    }[];
    socialMedia?: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
      youtube?: string;
    };
    layout?: {
      globalTheme?: {
        primaryColor?: string;
        secondaryColor?: string;
        accentColor?: string;
        fontFamily?: string;
      };
      sections?: {
        mission?: {
          show: boolean;
          template: 'card' | 'banner' | 'split' | 'minimal';
          order: number;
        };
        vision?: {
          show: boolean;
          template: 'card' | 'banner' | 'split' | 'minimal';
          order: number;
        };
        goals?: {
          show: boolean;
          template: 'grid' | 'list' | 'timeline' | 'cards';
          order: number;
        };
        facilities?: {
          show: boolean;
          template: 'grid' | 'carousel' | 'masonry' | 'list';
          order: number;
        };
        achievements?: {
          show: boolean;
          template: 'timeline' | 'grid' | 'list' | 'showcase';
          order: number;
        };
        principalMessage?: {
          show: boolean;
          template: 'centered' | 'side-by-side' | 'overlay' | 'quote';
          order: number;
        };
        rules?: {
          show: boolean;
          template: 'tabs' | 'accordion' | 'grid' | 'list';
          order: number;
        };
        admission?: {
          show: boolean;
          template: 'banner' | 'card' | 'detailed' | 'cta';
          order: number;
        };
        aboutCards?: {
          show: boolean;
          template: 'story' | 'grid' | 'masonry' | 'timeline';
          order: number;
        };
      };
    };
  };
  createdAt?: string;
  updatedAt?: string;
} 
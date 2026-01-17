import { SchoolProfile, SchoolInfo, NewsItem, Event, Faculty, Student, Program, ContactInfo, Leadership, AboutContent, CoreValue, Facility, Gallery, SchoolDocument, TransferCertificate } from '../types/school';
import {
  mockSchoolInfo,
  mockNews,
  mockEvents,
  mockFaculty,
  mockStudents,
  mockPrograms,
  mockContactInfo,
  leadershipData,
  heroesData,
  aboutContent,
  coreValues,
  facilities
} from '../data/mockData';

// Configuration for API endpoints
const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://school-backend-api-4zqzsa7g3a-uc.a.run.app/api',
  useMockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' || false, // Default to mock data
};

// Helper for absolute media URLs
export const getMediaUrl = (url?: string) => {
  if (!url) return undefined;
  if (url.startsWith('http')) return url;
  const baseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || 'https://school-backend-api-4zqzsa7g3a-uc.a.run.app/api').replace('/api', '');
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

// Generic API call function
async function apiCall<T>(endpoint: string): Promise<T> {
  if (API_CONFIG.useMockData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    throw new Error('Mock data should be returned directly');
  }

  const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  return response.json();
}

// School Information API
export const schoolApi = {
  getSchoolInfo: async (): Promise<SchoolInfo> => {
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return mockSchoolInfo;
    }
    return apiCall<SchoolInfo>('/school/info');
  },

  updateSchoolInfo: async (data: Partial<SchoolInfo>): Promise<SchoolInfo> => {
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return { ...mockSchoolInfo, ...data };
    }
    const response = await fetch(`${API_CONFIG.baseUrl}/school/info`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Update failed: ${response.statusText}`);
    }
    return response.json();
  }
};

// About Page API
export const aboutApi = {
  getAboutContent: async (): Promise<AboutContent[]> => {
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return aboutContent;
    }
    return apiCall<AboutContent[]>('/about/content');
  },

  getAboutContentBySection: async (section: string): Promise<AboutContent[]> => {
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return aboutContent.filter((content: AboutContent) => content.section === section);
    }
    return apiCall<AboutContent[]>(`/about/content/section/${section}`);
  },

  getCoreValues: async (): Promise<CoreValue[]> => {
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return coreValues;
    }
    return apiCall<CoreValue[]>('/about/core-values');
  },

  getFacilities: async (): Promise<Facility[]> => {
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return facilities;
    }
    // Fetch from school profile
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
      const schoolId = process.env.NEXT_PUBLIC_SCHOOL_ID || '68c22a22ec3c0fd06634bc93';
      const response = await fetch(`${baseUrl}/public/school-profile/id/${schoolId}`);

      if (!response.ok) {
        console.error('Failed to fetch school profile for facilities');
        return facilities;
      }

      const data = await response.json();
      if (data.success && data.data?.profile?.facilities) {
        // Map backend facilities to frontend format
        return data.data.profile.facilities.map((facility: any, index: number) => ({
          id: `facility-${index}`,
          name: facility.name || '',
          description: facility.description || '',
          image: facility.image || facility.imageUrl,
          features: facility.features || [],
          capacity: facility.capacity,
          order: facility.order || index,
        }));
      }

      return facilities;
    } catch (error) {
      console.error('Error fetching facilities:', error);
      return facilities;
    }
  }
};

// Leadership API
export const leadershipApi = {
  getLeadership: async (): Promise<Leadership[]> => {
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return leadershipData;
    }
    return apiCall<Leadership[]>('/leadership');
  },

  getLeadershipByPosition: async (position: string): Promise<Leadership[]> => {
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return leadershipData.filter(leader => leader.position === position);
    }
    return apiCall<Leadership[]>(`/leadership/position/${position}`);
  }
};

// Heroes API (Updated Faculty API)
export const heroesApi = {
  getHeroes: async (): Promise<Faculty[]> => {
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return heroesData;
    }
    return apiCall<Faculty[]>('/heroes');
  },

  getHeroesByDepartment: async (department: string): Promise<Faculty[]> => {
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return heroesData.filter(hero => hero.department === department);
    }
    return apiCall<Faculty[]>(`/heroes/department/${department}`);
  }
};

// News API
export const newsApi = {
  getNews: async (): Promise<NewsItem[]> => {
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return mockNews;
    }
    return apiCall<NewsItem[]>('/news');
  },

  getNewsById: async (id: string): Promise<NewsItem> => {
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      const news = mockNews.find(item => item.id === id);
      if (!news) throw new Error('News item not found');
      return news;
    }
    return apiCall<NewsItem>(`/news/${id}`);
  },

  createNews: async (data: Omit<NewsItem, 'id'>): Promise<NewsItem> => {
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      const newNews: NewsItem = {
        ...data,
        id: Date.now().toString(),
      };
      return newNews;
    }
    const response = await fetch(`${API_CONFIG.baseUrl}/news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Create failed: ${response.statusText}`);
    }
    return response.json();
  }
};

// Events API
export const eventsApi = {
  getEvents: async (): Promise<Event[]> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
      const schoolId = process.env.NEXT_PUBLIC_SCHOOL_ID || '68c22a22ec3c0fd06634bc93';
      const response = await fetch(`${baseUrl}/public/school/${schoolId}/events`);

      if (!response.ok) {
        console.error('Failed to fetch events from backend, using mock data');
        return mockEvents;
      }

      const data = await response.json();
      if (data.success && data.data) {
        // Map backend event format to frontend format
        interface BackendEvent {
          _id: string;
          title: string;
          description: string;
          startDate: string;
          endDate?: string;
          location?: string;
          category?: string;
          imageUrl?: string;
          isPublic?: boolean;
          registrationRequired?: boolean;
          maxParticipants?: number;
        }
        return data.data.map((evt: BackendEvent) => ({
          id: evt._id,
          _id: evt._id,
          title: evt.title,
          description: evt.description,
          startDate: evt.startDate,
          endDate: evt.endDate,
          date: new Date(evt.startDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          time: new Date(evt.startDate).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          location: evt.location || 'School Campus',
          category: evt.category || 'general',
          imageUrl: getMediaUrl(evt.imageUrl),
          image: getMediaUrl(evt.imageUrl),
          isPublic: evt.isPublic,
          registrationRequired: evt.registrationRequired,
          maxParticipants: evt.maxParticipants,
        }));
      }

      return mockEvents;
    } catch (error) {
      console.error('Error fetching events:', error);
      return mockEvents;
    }
  },

  getUpcomingEvents: async (): Promise<Event[]> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
      const schoolId = process.env.NEXT_PUBLIC_SCHOOL_ID || '68c22a22ec3c0fd06634bc93';
      const response = await fetch(`${baseUrl}/public/school/${schoolId}/events`);

      if (!response.ok) {
        console.error('Failed to fetch upcoming events from backend, using mock data');
        return mockEvents.filter(event => event.isUpcoming);
      }

      const data = await response.json();
      if (data.success && data.data) {
        // Map backend event format to frontend format
        interface BackendEvent {
          _id: string;
          title: string;
          description: string;
          startDate: string;
          endDate?: string;
          location?: string;
          category?: string;
          imageUrl?: string;
          isPublic?: boolean;
          registrationRequired?: boolean;
          maxParticipants?: number;
        }
        return data.data.map((evt: BackendEvent) => ({
          id: evt._id,
          _id: evt._id,
          title: evt.title,
          description: evt.description,
          startDate: evt.startDate,
          endDate: evt.endDate,
          date: new Date(evt.startDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          time: new Date(evt.startDate).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          location: evt.location || 'School Campus',
          category: evt.category || 'general',
          imageUrl: evt.imageUrl,
          image: evt.imageUrl,
          isPublic: evt.isPublic,
          registrationRequired: evt.registrationRequired,
          maxParticipants: evt.maxParticipants,
        }));
      }

      return mockEvents.filter(event => event.isUpcoming);
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      return mockEvents.filter(event => event.isUpcoming);
    }
  }
};

// Faculty API (Legacy - keeping for backward compatibility)
export const facultyApi = {
  getFaculty: async (): Promise<Faculty[]> => {
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return mockFaculty;
    }
    return apiCall<Faculty[]>('/faculty');
  },

  getFacultyByDepartment: async (department: string): Promise<Faculty[]> => {
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return mockFaculty.filter(faculty => faculty.department === department);
    }
    return apiCall<Faculty[]>(`/faculty/department/${department}`);
  }
};

// Students API
export const studentsApi = {
  getStudents: async (): Promise<Student[]> => {
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return mockStudents;
    }
    return apiCall<Student[]>('/students');
  },

  getStudentsByGrade: async (grade: string): Promise<Student[]> => {
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return mockStudents.filter(student => student.grade === grade);
    }
    return apiCall<Student[]>(`/students/grade/${grade}`);
  }
};

// Programs API
export const programsApi = {
  getPrograms: async (): Promise<Program[]> => {
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return mockPrograms;
    }
    // Fetch from school profile
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
      const schoolId = process.env.NEXT_PUBLIC_SCHOOL_ID || '68c22a22ec3c0fd06634bc93';
      const response = await fetch(`${baseUrl}/public/school-profile/id/${schoolId}`);

      if (!response.ok) {
        console.error('Failed to fetch school profile for programs');
        return mockPrograms;
      }

      const data = await response.json();
      if (data.success && data.data?.profile?.programs) {
        // Map backend programs to frontend format
        return data.data.profile.programs.map((program: any, index: number) => {
          // Handle eligibility - could be string or array
          const eligibility = program.eligibility || [];
          const requirements = Array.isArray(eligibility) ? eligibility : (eligibility ? [eligibility] : []);

          // Try to infer category from name if not provided
          const nameLower = (program.name || '').toLowerCase();
          let category: 'elementary' | 'middle' | 'high' | 'specialized' = 'general' as any;
          if (nameLower.includes('elementary') || nameLower.includes('primary')) {
            category = 'elementary';
          } else if (nameLower.includes('middle') || nameLower.includes('junior')) {
            category = 'middle';
          } else if (nameLower.includes('high') || nameLower.includes('senior') || nameLower.includes('secondary')) {
            category = 'high';
          } else if (nameLower.includes('advanced') || nameLower.includes('special')) {
            category = 'specialized';
          }

          return {
            id: `program-${index}`,
            name: program.name || '',
            description: program.description || '',
            duration: program.duration || '',
            category: program.category || category,
            requirements: requirements,
            image: program.image || program.imageUrl,
            features: program.features || [],
            ageGroup: program.ageGroup || '',
            classSize: program.classSize || '',
            tuition: program.tuition || '',
          };
        });
      }

      return mockPrograms;
    } catch (error) {
      console.error('Error fetching programs:', error);
      return mockPrograms;
    }
  }
};

// Contact API
export const contactApi = {
  getContactInfo: async (): Promise<ContactInfo> => {
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return mockContactInfo;
    }
    return apiCall<ContactInfo>('/contact');
  },

  sendContactForm: async (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> => {
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return { success: true, message: 'Message sent successfully (mock)' };
    }
    const response = await fetch(`${API_CONFIG.baseUrl}/contact/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error(`Send failed: ${response.statusText}`);
    }
    return response.json();
  }
};

// Gallery API
export const galleryApi = {
  getGalleries: async (category?: string): Promise<Gallery[]> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
      const schoolId = process.env.NEXT_PUBLIC_SCHOOL_ID || '68c22a22ec3c0fd06634bc93';
      let endpoint = `${baseUrl}/public/school/${schoolId}/gallery`;

      // Backend accepts category as query parameter directly
      if (category && category !== 'all') {
        endpoint += `?category=${encodeURIComponent(category)}`;
      }

      const response = await fetch(endpoint);

      if (!response.ok) {
        console.error('Failed to fetch galleries from backend');
        return [];
      }

      const data = await response.json();
      if (data.success && data.data) {
        // Handle both single gallery and array of galleries
        const galleries = Array.isArray(data.data) ? data.data : (data.data.galleries || []);
        return galleries.map((gallery: any) => ({
          _id: gallery._id || gallery.id,
          id: gallery._id || gallery.id,
          schoolId: gallery.schoolId || schoolId,
          title: gallery.title,
          description: gallery.description,
          // Backend might return 'images' or 'media', handle both
          media: gallery.media || gallery.images || [],
          category: gallery.category,
          isPublic: gallery.isPublic !== undefined ? gallery.isPublic : true,
          createdAt: gallery.createdAt,
          updatedAt: gallery.updatedAt,
          mediaCount: gallery.mediaCount || (gallery.media ? gallery.media.length : (gallery.images ? gallery.images.length : 0)),
          featuredImage: gallery.featuredImage || (gallery.media && gallery.media.length > 0
            ? gallery.media.find((m: any) => m.type === 'image')?.url || gallery.media[0]?.url
            : (gallery.images && gallery.images.length > 0
              ? gallery.images[0]?.url || null
              : null)),
        }));
      }

      return [];
    } catch (error) {
      console.error('Error fetching galleries:', error);
      return [];
    }
  },

  getGalleryById: async (id: string): Promise<Gallery | null> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
      const schoolId = process.env.NEXT_PUBLIC_SCHOOL_ID || '68c22a22ec3c0fd06634bc93';
      const response = await fetch(`${baseUrl}/public/school/${schoolId}/gallery/${id}`);

      if (!response.ok) {
        console.error('Failed to fetch gallery from backend');
        return null;
      }

      const data = await response.json();
      if (data.success && data.data) {
        const gallery = data.data;
        return {
          _id: gallery._id || gallery.id,
          id: gallery._id || gallery.id,
          schoolId: gallery.schoolId || schoolId,
          title: gallery.title,
          description: gallery.description,
          // Backend might return 'images' or 'media', handle both
          media: gallery.media || gallery.images || [],
          category: gallery.category,
          isPublic: gallery.isPublic !== undefined ? gallery.isPublic : true,
          createdAt: gallery.createdAt,
          updatedAt: gallery.updatedAt,
          mediaCount: gallery.mediaCount || (gallery.media ? gallery.media.length : (gallery.images ? gallery.images.length : 0)),
          featuredImage: gallery.featuredImage || (gallery.media && gallery.media.length > 0
            ? gallery.media.find((m: any) => m.type === 'image')?.url || gallery.media[0]?.url
            : (gallery.images && gallery.images.length > 0
              ? gallery.images[0]?.url || null
              : null)),
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching gallery:', error);
      return null;
    }
  }
};

// Curriculum API
export const curriculumApi = {
  getCurriculum: async (className?: string, subject?: string): Promise<SchoolDocument[]> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
      const schoolId = process.env.NEXT_PUBLIC_SCHOOL_ID || '68c22a22ec3c0fd06634bc93';

      let endpoint = `${baseUrl}/public/school/${schoolId}/curriculum`;
      const params = new URLSearchParams();
      if (className) params.append('className', className);
      if (subject) params.append('subject', subject);
      if (params.toString()) endpoint += `?${params.toString()}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        console.error('Failed to fetch curriculum from backend');
        return [];
      }

      const data = await response.json();
      if (data.success && data.data) {
        return data.data;
      }

      return [];
    } catch (error) {
      console.error('Error fetching curriculum:', error);
      return [];
    }
  }
};

// Syllabus API
export const syllabusApi = {
  getSyllabus: async (className?: string, subject?: string): Promise<SchoolDocument[]> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
      const schoolId = process.env.NEXT_PUBLIC_SCHOOL_ID || '68c22a22ec3c0fd06634bc93';

      let endpoint = `${baseUrl}/public/school/${schoolId}/syllabus`;
      const params = new URLSearchParams();
      if (className) params.append('className', className);
      if (subject) params.append('subject', subject);
      if (params.toString()) endpoint += `?${params.toString()}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        console.error('Failed to fetch syllabus from backend');
        return [];
      }

      const data = await response.json();
      if (data.success && data.data) {
        return data.data;
      }

      return [];
    } catch (error) {
      console.error('Error fetching syllabus:', error);
      return [];
    }
  }
};

// Transfer Certificate API
export const tcApi = {
  verifyAndGetTC: async (regNo: string, dob: string): Promise<{
    success: boolean;
    data?: TransferCertificate;
    message: string;
  }> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
      const schoolId = process.env.NEXT_PUBLIC_SCHOOL_ID || '68c22a22ec3c0fd06634bc93';

      const response = await fetch(`${baseUrl}/public/school/${schoolId}/transfer-certificate/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ regNo, dob }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to retrieve transfer certificate',
        };
      }

      return {
        success: true,
        data: data.data,
        message: data.message || 'Transfer certificate retrieved successfully',
      };
    } catch (error) {
      console.error('Error verifying TC:', error);
      return {
        success: false,
        message: 'An error occurred while retrieving the transfer certificate. Please try again later.',
      };
    }
  }
};

// Announcements API
export const announcementsApi = {
  getAnnouncements: async (limit?: number): Promise<NewsItem[]> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
      const schoolId = process.env.NEXT_PUBLIC_SCHOOL_ID || '68c22a22ec3c0fd06634bc93';

      let endpoint = `${baseUrl}/public/school/${schoolId}/announcements`;
      if (limit) endpoint += `?limit=${limit}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        console.error('Failed to fetch announcements from backend');
        return [];
      }

      const data = await response.json();
      if (data.success && data.data) {
        // Map backend announcement format to frontend format (NewsItem)
        return data.data.map((ann: any) => ({
          id: ann._id,
          _id: ann._id,
          title: ann.title,
          content: ann.content,
          date: new Date(ann.publishDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          author: 'School Administration',
          category: ann.type === 'urgent' ? 'announcement' : 'general',
          image: getMediaUrl(ann.imageUrl || ann.attachments?.[0]),
          type: ann.type,
          attachments: (ann.attachments || []).map((url: string) => getMediaUrl(url)),
        }));
      }

      return [];
    } catch (error) {
      console.error('Error fetching announcements:', error);
      return [];
    }
  }
};

// Public Information API for School Profile
export const publicApi = {
  getSchoolProfile: async (): Promise<SchoolProfile | null> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
      const schoolId = process.env.NEXT_PUBLIC_SCHOOL_ID || '68c22a22ec3c0fd06634bc93';
      const response = await fetch(`${baseUrl}/public/school-profile/id/${schoolId}`);

      if (!response.ok) {
        console.error('Failed to fetch school profile from backend');
        return null;
      }

      const data = await response.json();
      if (data.success && data.data) {
        return data.data;
      }

      return null;
    } catch (error) {
      console.error('Error fetching school profile:', error);
      return null;
    }
  }
};
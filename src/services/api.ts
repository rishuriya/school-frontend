import { SchoolInfo, NewsItem, Event, Faculty, Student, Program, ContactInfo, Leadership, AboutContent, CoreValue, Facility } from '../types/school';
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
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  useMockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' || true, // Default to mock data
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
      return aboutContent.filter(content => content.section === section);
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
    return apiCall<Facility[]>('/about/facilities');
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
        return data.data.map((evt: any) => ({
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
        return data.data.map((evt: any) => ({
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
    return apiCall<Program[]>('/programs');
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
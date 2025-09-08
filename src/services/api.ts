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
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
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
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return mockEvents;
    }
    return apiCall<Event[]>('/events');
  },

  getUpcomingEvents: async (): Promise<Event[]> => {
    if (API_CONFIG.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return mockEvents.filter(event => event.isUpcoming);
    }
    return apiCall<Event[]>('/events/upcoming');
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
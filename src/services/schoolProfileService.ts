import { SchoolProfile } from '../types/school';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

export const schoolProfileService = {
  // Fetch school profile by ID
  getSchoolProfileById: async (schoolId: string): Promise<SchoolProfile> => {
    try {
      const response = await fetch(`${API_BASE_URL}/public/school-profile/id/${schoolId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Disable caching to always get fresh data
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch school profile: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to fetch school profile');
      }
    } catch (error) {
      console.error('Error fetching school profile:', error);
      throw error;
    }
  },

  // Fetch school profile by subdomain
  getSchoolProfile: async (subdomain: string): Promise<SchoolProfile> => {
    try {
      const response = await fetch(`${API_BASE_URL}/public/school-profile/${subdomain}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Disable caching to always get fresh data
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch school profile: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to fetch school profile');
      }
    } catch (error) {
      console.error('Error fetching school profile:', error);
      throw error;
    }
  },

  // Get school profile from cache or fetch fresh (by ID or subdomain)
  getCachedSchoolProfile: async (identifier: string, isId: boolean = false): Promise<SchoolProfile> => {
    const cacheKey = `school_profile_${identifier}`;
    const cachedData = typeof window !== 'undefined' ? sessionStorage.getItem(cacheKey) : null;

    if (cachedData) {
      try {
        return JSON.parse(cachedData);
      } catch (e) {
        // If parsing fails, fetch fresh data
      }
    }

    const profile = isId 
      ? await schoolProfileService.getSchoolProfileById(identifier)
      : await schoolProfileService.getSchoolProfile(identifier);
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(cacheKey, JSON.stringify(profile));
    }

    return profile;
  },

  // Clear cache
  clearCache: (identifier: string) => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(`school_profile_${identifier}`);
    }
  },
};

export default schoolProfileService;


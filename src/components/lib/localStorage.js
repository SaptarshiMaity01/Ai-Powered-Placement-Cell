// Local storage keys
export const POSTED_JOBS_STORAGE_KEY = 'placement-portal-posted-jobs';
export const APPLICATIONS_STORAGE_KEY = 'placement-portal-applications';
export const CHATS_STORAGE_KEY = 'placement-portal-chats';

// Helper functions for localStorage
export const getLocalStorage = (key, defaultValue) => {
  if (typeof window === 'undefined') return defaultValue;

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting localStorage item ${key}:`, error);
    return defaultValue;
  }
};

export const setLocalStorage = (key, value) => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage item ${key}:`, error);
  }
};

// API Endpoints
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com'

export const API_ENDPOINTS = {
  USERS: '/users',
  POSTS: '/posts',
  COMMENTS: '/comments',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  PROFILE: '/users/profile',
}

// App Configuration
export const APP_CONFIG = {
  SITE_NAME: 'My Awesome App',
  SUPPORT_EMAIL: 'support@myapp.com',
  VERSION: '1.0.0',
}

// Local Storage Keys
export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PROFILE: 'user_profile',
}

// Default Values
export const DEFAULTS = {
  USER_PROFILE: {
    name: 'Guest User',
    email: '',
  },
  POSTS_PER_PAGE: 10,
  MAX_UPLOAD_SIZE: 5 * 1024 * 1024, // 5MB
}

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error, please try again later.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  FORBIDDEN: 'Access forbidden. Please contact support.',
  SERVER_ERROR: 'An error occurred on the server. Please try again.',
}

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Logged in successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
}

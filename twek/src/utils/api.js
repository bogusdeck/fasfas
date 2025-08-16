// API Configuration and Utility Functions
// ==============================================

// Base API Configuration
const API_CONFIG = {
  baseURL: 'http://15.207.254.95:8080',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication Endpoints
  auth: {
    phoneRequest: '/api/brand/otp/phone/request/',
    phoneVerify: '/api/brand/otp/phone/verify/',
    emailRequest: '/api/brand/otp/email/request/',
    emailVerify: '/api/brand/otp/email/verify/',
    signup: '/api/brand/auth/signup/',
    login: '/api/brand/auth/login/',
  },
  profile: {
    status: '/api/brand/profile/status/',
  }
};

// HTTP Methods
const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
};

// Custom API Error Class
export class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Generic API Request Function
async function apiRequest(endpoint, options = {}) {
  const {
    method = HTTP_METHODS.GET,
    data = null,
    headers = {},
    timeout = API_CONFIG.timeout,
    isFormData = false,
  } = options;

  const url = `${API_CONFIG.baseURL}${endpoint}`;
  
  // Prepare request configuration
  const config = {
    method,
    headers: {
      ...API_CONFIG.headers,
      ...headers,
    },
  };

  // Handle FormData (for file uploads)
  if (isFormData && data) {
    config.body = data;
    // Remove Content-Type header for FormData (browser will set it with boundary)
    delete config.headers['Content-Type'];
  } else if (data) {
    config.body = JSON.stringify(data);
  }

  // Add timeout functionality
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  config.signal = controller.signal;

  try {
    console.log(`🚀 API Request: ${method} ${url}`, data ? { data } : '');
    
    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    // Parse response
    let responseData;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    // Handle HTTP errors
    if (!response.ok) {
      console.error(`❌ API Error: ${response.status}`, responseData);
      throw new ApiError(
        responseData?.message || responseData?.error || `HTTP ${response.status}`,
        response.status,
        responseData
      );
    }

    console.log(`✅ API Success: ${method} ${url}`, responseData);
    return responseData;

  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      console.error('⏰ API Timeout:', url);
      throw new ApiError('Request timeout', 408);
    }
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    console.error('🔥 API Network Error:', error);
    throw new ApiError('Network error', 0, error);
  }
}

// ==============================================
// AUTHENTICATION API FUNCTIONS
// ==============================================

export const authApi = {
  // Request OTP for phone number
  requestPhoneOTP: async (phoneNumber) => {
    return apiRequest(API_ENDPOINTS.auth.phoneRequest, {
      method: HTTP_METHODS.POST,
      data: { phone_number: phoneNumber }
    });
  },

  // Verify phone OTP
  verifyPhoneOTP: async (phoneNumber, otp) => {
    return apiRequest(API_ENDPOINTS.auth.phoneVerify, {
      method: HTTP_METHODS.POST,
      data: { 
        phone_number: phoneNumber,
        otp_code: otp
      }
    });
  },

  // Request OTP for email
  // Request OTP for email
  requestEmailOTP: async (email, phoneNumber) => {
    return apiRequest(API_ENDPOINTS.auth.emailRequest, {
      method: HTTP_METHODS.POST,
      data: { 
        email: email,
        phone_number: formatPhoneForAPI(phoneNumber),
        is_phone_verified: true
      }
    });
  },

  // Verify email OTP
  verifyEmailOTP: async (email, otp) => {
    return apiRequest(API_ENDPOINTS.auth.emailVerify, {
      method: HTTP_METHODS.POST,
      data: { 
        email: email,
        otp_code: otp
      }
    });
  },

  // Brand user signup/registration after email verification
  register: async (userData) => {
    return apiRequest(API_ENDPOINTS.auth.signup, {
      method: HTTP_METHODS.POST,
      data: userData
    });
  },

  // User login with email and password
  login: async (email, password) => {
    return apiRequest(API_ENDPOINTS.auth.login, {
      method: HTTP_METHODS.POST,
      data: {
        email: email,
        password: password
      }
    });
  }
};

// Profile API Functions
export const profileApi = {
  // Get brand profile and onboarding status
  getStatus: async () => {
    return apiRequest(API_ENDPOINTS.profile.status, {
      method: HTTP_METHODS.GET
    });
  },
  
  // Update registration/onboarding progress
  updateProgress: async (step, isOnboarding) => {
    return apiRequest(API_ENDPOINTS.profile.status, {
      method: HTTP_METHODS.PUT,
      data: {
        current_step: step,
        is_onboarding: isOnboarding
      }
    });
  }
};

// ==============================================
// HELPER FUNCTIONS
// ==============================================

// Format phone number for API (add country code if needed)
export function formatPhoneForAPI(phoneNumber) {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  
  // If it's a 10-digit Indian number, add country code
  if (cleanNumber.length === 10 && /^[6-9]/.test(cleanNumber)) {
    return `+91${cleanNumber}`;
  }
  
  return cleanNumber;
}

// Handle API errors consistently
export function handleApiError(error, defaultMessage = 'An error occurred') {
  if (error instanceof ApiError) {
    // Return specific error message from API
    return error.message || defaultMessage;
  }
  
  if (error.name === 'AbortError') {
    return 'Request timed out. Please try again.';
  }
  
  if (!navigator.onLine) {
    return 'No internet connection. Please check your network.';
  }
  
  return defaultMessage;
}

// Check if response indicates success
export function isApiSuccess(response) {
  return response && (
    response.success === true ||
    response.status === 'success' ||
    response.message?.toLowerCase().includes('success')
  );
}

// Default export for convenience
const apiUtils = {
  authApi,
  profileApi,
  formatPhoneForAPI,
  handleApiError,
  isApiSuccess,
  ApiError
};

export default apiUtils;

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8080/api/',
  ENDPOINTS: {
    PHONE_OTP_REQUEST: 'brand/otp/phone/request/',
    PHONE_OTP_VERIFY: 'brand/otp/phone/verify/', 
    EMAIL_OTP_REQUEST: 'brand/otp/email/request/',
    EMAIL_OTP_VERIFY: 'brand/otp/email/verify/',
  },
  HEADERS: {
    'Content-Type': 'application/json',
  }
};

// API helper function
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      ...API_CONFIG.HEADERS,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        errorData = { message: `HTTP error! status: ${response.status}` };
      }
      
      const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
      error.status = response.status;
      error.data = errorData;
      throw error;
    }
    
    return response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Phone OTP API functions
export const phoneOtpAPI = {
  sendOTP: async (phoneNumber, email = '') => {
    const requestBody = {
      phone_number: phoneNumber
    };
    
    // Add email if provided to avoid database constraint
    if (email) {
      requestBody.email = email;
    }
    
    return apiRequest(API_CONFIG.ENDPOINTS.PHONE_OTP_REQUEST, {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
  },
  
  verifyOTP: async (phoneNumber, otpCode) => {
    return apiRequest(API_CONFIG.ENDPOINTS.PHONE_OTP_VERIFY, {
      method: 'POST',
      body: JSON.stringify({
        phone_number: phoneNumber,
        otp: otpCode
      }),
    });
  }
};

// Email OTP API functions
export const emailOtpAPI = {
  sendOTP: async (email, phoneNumber) => {
    return apiRequest(API_CONFIG.ENDPOINTS.EMAIL_OTP_REQUEST, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        phone_number: phoneNumber
      }),
    });
  },

  verifyOTP: async (email, phoneNumber, otpCode) => {
    return apiRequest(API_CONFIG.ENDPOINTS.EMAIL_OTP_VERIFY, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        phone_number: phoneNumber,
        otp: otpCode
      }),
    });
  }
};

// Legacy API call function for backward compatibility
export const apiCall = apiRequest;

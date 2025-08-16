'use client';

/**
 * SECURE AUTHENTICATION CONTEXT
 * 
 * Security Improvements Implemented:
 * 
 * 1. TOKEN STORAGE SECURITY:
 *    - Moved from localStorage to sessionStorage (cleared on tab/browser close)
 *    - sessionStorage is less vulnerable to XSS attacks
 *    - Automatic migration from localStorage to sessionStorage with cleanup
 *    - Support for httpOnly cookies (most secure option when backend implements it)
 * 
 * 2. AUTOMATIC TOKEN REFRESH:
 *    - Built-in refresh token functionality
 *    - Automatic retry of failed requests with refreshed tokens
 *    - Secure refresh token storage in sessionStorage
 * 
 * 3. AUTHENTICATED API CALLS:
 *    - authenticatedFetch() wrapper handles token refresh automatically
 *    - Includes credentials for httpOnly cookie support
 *    - Proper error handling and automatic logout on refresh failure
 * 
 * 4. SECURE LOGOUT:
 *    - Clears all token storage (session, local, and httpOnly cookies)
 *    - Calls backend logout endpoint to invalidate server-side sessions
 * 
 * 5. LEGACY CLEANUP:
 *    - Automatic cleanup of old localStorage tokens
 *    - Migration path for existing users
 * 
 * RECOMMENDED BACKEND IMPROVEMENTS:
 * - Implement httpOnly cookies for token storage
 * - Add logout endpoint to invalidate tokens
 * - Implement token refresh endpoint
 * - Add CSRF protection
 * - Use secure, sameSite cookie attributes
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Create Auth Context
const AuthContext = createContext({});

// Auth Provider Component
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState(null);
  const router = useRouter();

  // Function to get saved form data from secure storage
  const getSavedFormData = useCallback(() => {
    try {
      // Check sessionStorage first (more secure)
      let saved = sessionStorage.getItem('userFormData');
      if (saved) {
        return JSON.parse(saved);
      }
      
      // Fallback to localStorage and migrate to sessionStorage
      saved = localStorage.getItem('userFormData');
      if (saved) {
        const parsedData = JSON.parse(saved);
        sessionStorage.setItem('userFormData', saved);
        localStorage.removeItem('userFormData'); // cleanup
        return parsedData;
      }
    } catch (error) {
      console.error('Error parsing saved form data:', error);
    }
    return {};
  }, []);

  // Function to load saved form data into state
  const loadSavedFormData = useCallback(() => {
    const savedData = getSavedFormData();
    if (Object.keys(savedData).length > 0) {
      setFormData(savedData);
    }
  }, [getSavedFormData]);

  // Function to save additional form data during onboarding
  const saveFormData = (newFormData) => {
    const currentFormData = formData || {};
    const updatedFormData = { ...currentFormData, ...newFormData };
    
    setFormData(updatedFormData);
    // Use sessionStorage for better security
    sessionStorage.setItem('userFormData', JSON.stringify(updatedFormData));
    console.log('Updated form data:', updatedFormData);
  };

  // Function to get auth token from secure cookie
  const getAuthToken = () => {
    // Check for httpOnly cookie first (most secure)
    // Note: httpOnly cookies cannot be accessed via JavaScript for security
    // so we'll need to rely on the browser sending them automatically
    
    // Fallback to sessionStorage (more secure than localStorage)
    const sessionToken = sessionStorage.getItem('authToken');
    if (sessionToken) {
      return sessionToken;
    }
    
    // Last resort - localStorage (for backward compatibility during transition)
    const localToken = localStorage.getItem('authToken');
    if (localToken) {
      // Migrate to sessionStorage and remove from localStorage
      sessionStorage.setItem('authToken', localToken);
      localStorage.removeItem('authToken');
      return localToken;
    }
    
    return null;
  };

  // Function to set auth token securely
  const setAuthToken = (token) => {
    // Store in sessionStorage (cleared when browser/tab closes)
    sessionStorage.setItem('authToken', token);
    
    // Remove from localStorage if it exists (cleanup)
    localStorage.removeItem('authToken');
    
    // In a production environment, you should also set an httpOnly cookie
    // via your backend API for maximum security
  };

  // Function to remove auth token
  const removeAuthToken = () => {
    sessionStorage.removeItem('authToken');
    localStorage.removeItem('authToken'); // cleanup legacy storage
    
    // Clear httpOnly cookie via API call to backend
    fetch('/api/auth/logout', { 
      method: 'POST',
      credentials: 'include' // Important: includes httpOnly cookies
    }).catch(() => {
      // Ignore logout API errors - token cleanup is more important
    });
  };

  // Function to refresh access token using refresh token
  const refreshAccessToken = async () => {
    try {
      const refreshToken = sessionStorage.getItem('refreshToken') || localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch('http://15.207.254.95:8080/api/brand/auth/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ refresh: refreshToken })
      });

      const data = await response.json();
      
      if (response.ok && data.access) {
        const newToken = 'Bearer ' + data.access;
        setAuthToken(newToken);
        return newToken;
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
      // If refresh fails, logout user
      logout();
      return null;
    }
  };

  // Function to make authenticated API calls with automatic token refresh
  const authenticatedFetch = async (url, options = {}) => {
    let token = getAuthToken();
    
    console.log('🔐 authenticatedFetch called:', { 
      url, 
      method: options.method || 'GET',
      hasToken: !!token,
      tokenPreview: token ? token.substring(0, 20) + '...' : 'No token'
    });
    
    if (!token) {
      console.error('❌ No authentication token available');
      throw new Error('No authentication token available');
    }

    // Detect if we're sending FormData and avoid setting Content-Type
    const isFormData = options.body instanceof FormData;
    
    // First attempt with current token
    const requestOptions = {
      ...options,
      headers: {
        // Only set Content-Type if it's not FormData and not already specified
        ...(isFormData || options.headers?.['Content-Type'] !== undefined 
          ? {} 
          : { 'Content-Type': 'application/json' }
        ),
        'Authorization': token,
        ...options.headers
      },
      credentials: 'include'
    };

    console.log('📡 Making request with options:', {
      url,
      method: requestOptions.method || 'GET',
      hasAuth: !!requestOptions.headers.Authorization,
      isFormData,
      credentials: requestOptions.credentials
    });

    let response = await fetch(url, requestOptions);
    
    console.log('📥 Response received:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      url
    });
    
    // If token expired (401), try to refresh and retry
    if (response.status === 401) {
      console.log('🔄 Token expired (401), attempting refresh...');
      const newToken = await refreshAccessToken();
      
      if (newToken) {
        console.log('✅ Token refreshed successfully, retrying request...');
        // Retry with new token
        requestOptions.headers['Authorization'] = newToken;
        response = await fetch(url, requestOptions);
        
        console.log('📥 Retry response:', {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok
        });
      } else {
        console.error('❌ Token refresh failed');
        throw new Error('Authentication failed after token refresh');
      }
    }

    // Log specific error responses for debugging
    if (!response.ok) {
      let errorData = null;
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.clone().json();
          console.error('🚨 API Error Response:', {
            status: response.status,
            url,
            error: errorData
          });
          
          // Special handling for USER_NOT_FOUND errors
          if (errorData.error_code === 'USER_NOT_FOUND' || errorData.message?.includes('User does not exist')) {
            console.error('🔴 USER_NOT_FOUND Error - This suggests the token is valid but points to a deleted/non-existent user');
            console.error('Consider logging out and logging back in');
          }
        }
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError);
      }
    }
    
    return response;
  };

  // Function to diagnose authentication issues
  const diagnoseAuthIssue = async () => {
    console.log('🔍 AUTHENTICATION DIAGNOSIS START');
    
    const token = getAuthToken();
    console.log('Current token status:', {
      hasToken: !!token,
      tokenSource: token ? 'Available' : 'Missing',
      tokenPreview: token ? token.substring(0, 30) + '...' : 'No token',
      sessionStorageToken: !!sessionStorage.getItem('authToken'),
      localStorageToken: !!localStorage.getItem('authToken')
    });
    
    if (!token) {
      console.log('❌ No authentication token found');
      return { issue: 'NO_TOKEN', recommendation: 'Please log in again' };
    }
    
    try {
      // Test token with a simple API call
      console.log('🧪 Testing token with profile status API...');
      const response = await fetch('http://15.207.254.95:8080/api/brand/profile/status/', {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      
      console.log('Token test response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Token is valid, user data:', data);
        return { issue: 'NONE', data };
      } else if (response.status === 401) {
        console.log('❌ Token is expired or invalid (401)');
        return { issue: 'TOKEN_EXPIRED', recommendation: 'Please log in again' };
      } else if (response.status === 404 || response.status === 400) {
        const errorData = await response.json().catch(() => ({}));
        console.log('❌ User not found or bad request:', errorData);
        return { issue: 'USER_NOT_FOUND', error: errorData, recommendation: 'Please create a new account or contact support' };
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.log('❌ Other API error:', errorData);
        return { issue: 'API_ERROR', error: errorData, status: response.status };
      }
    } catch (error) {
      console.error('❌ Network error during token test:', error);
      return { issue: 'NETWORK_ERROR', error: error.message };
    }
  };

  // Function to handle authentication errors and provide user guidance
  const handleAuthError = (error) => {
    console.log('🚨 Handling authentication error:', error);
    
    if (error.error_code === 'USER_NOT_FOUND' || error.message?.includes('User does not exist')) {
      console.log('USER_NOT_FOUND detected - forcing logout and redirect');
      // Force logout to clear invalid tokens
      logout();
      // Could also show a user-friendly message here
      return 'Your account was not found. Please sign up again or contact support.';
    } else if (error.status === 401) {
      console.log('Unauthorized access detected - forcing logout');
      logout();
      return 'Your session has expired. Please log in again.';
    }
    
    return error.message || 'An authentication error occurred.';
  };

  // Function to refresh user data from API
  const refreshUserData = async () => {
    const token = getAuthToken();
    if (!token) return null;
    
    try {
      console.log('Refreshing user data...');
      
      // Call both status API and onboarding-summary API in parallel for comprehensive data
      const [statusResponse, summaryResponse] = await Promise.all([
        authenticatedFetch('http://15.207.254.95:8080/api/brand/profile/status/', {
          method: 'GET'
        }),
        authenticatedFetch('http://15.207.254.95:8080/api/brand/onboarding-summary/', {
          method: 'GET'
        }).catch(error => {
          // If onboarding summary fails, continue with just status data
          console.log('Onboarding summary API failed (user may not have started onboarding):', error.message);
          return { ok: false, status: 404 };
        })
      ]);
      
      const statusData = await statusResponse.json();
      console.log('Profile status response:', { status: statusResponse.status, data: statusData });
      
      let summaryData = null;
      if (summaryResponse.ok) {
        summaryData = await summaryResponse.json();
        console.log('Onboarding summary response:', { status: summaryResponse.status, data: summaryData });
      } else {
        console.log('Onboarding summary not available or user has not started onboarding yet');
      }
      
      if (statusResponse.ok && statusData.success) {
        const profileData = statusData.data?.profile || {};
        const responseData = statusData.data || {};
        setUserData(profileData);
        
        // Combine status data with onboarding summary data for comprehensive form data
        const onboardingDetails = summaryData?.success ? summaryData.data : {};
        
        console.log('Raw onboarding details from API:', onboardingDetails);
        
        // Save comprehensive form data for prepopulation with robust field mapping
        const savedFormData = {
          // Profile/Registration data from user_details
          firstName: profileData.user_details?.first_name || '',
          lastName: profileData.user_details?.last_name || '',
          email: profileData.user_details?.email || '',
          phoneNumber: profileData.user_details?.phone_number || '',
          
          // GST data (from onboarding summary if available, otherwise from profile)
          // Handle multiple possible field names from API
          gstNumber: onboardingDetails.gst_info?.gst_number || 
                     onboardingDetails.gst_number || 
                     profileData.gst_number || '',
          gstBusinessName: onboardingDetails.gst_info?.gst_business_name || 
                          onboardingDetails.gst_business_name || 
                          profileData.gst_business_name || '',
          gstTradeName: onboardingDetails.gst_info?.gst_trade_name || 
                       onboardingDetails.gst_trade_name || 
                       profileData.gst_trade_name || '',
          gstConstitution: onboardingDetails.gst_info?.gst_constitution || 
                          onboardingDetails.gst_constitution || 
                          profileData.gst_constitution || '',
          gstAddress: onboardingDetails.gst_info?.gst_address || 
                     onboardingDetails.gst_address || 
                     profileData.gst_address || '',
          gstVerificationStatus: onboardingDetails.gst_info?.verification_status || 
                                onboardingDetails.verification_status?.gst || 
                                'pending',
          
          // Basic information (from onboarding summary)
          ownerName: onboardingDetails.basic_info?.owner_name || 
                    onboardingDetails.owner_name || 
                    profileData.owner_name || '',
          contactNumber: onboardingDetails.basic_info?.contact_number || 
                        onboardingDetails.contact_number || 
                        profileData.contact_number || '',
          businessEmail: onboardingDetails.basic_info?.business_email || 
                        onboardingDetails.business_email || 
                        profileData.business_email || 
                        profileData.user_details?.email || '',
          companyName: onboardingDetails.basic_info?.company_name || 
                      onboardingDetails.company_name || 
                      profileData.company_name || '',
          companyType: onboardingDetails.basic_info?.company_type || 
                      onboardingDetails.company_type || 
                      profileData.company_type || '',
          businessAddress: onboardingDetails.basic_info?.business_address || 
                          onboardingDetails.business_address || 
                          profileData.business_address || '',
          
          // Signature information
          signatureId: onboardingDetails.signature_info?.signature_id || 
                      onboardingDetails.signature_id || '',
          signatureFileName: onboardingDetails.signature_info?.signature_file_name || 
                            onboardingDetails.signature_info?.file_name || 
                            onboardingDetails.signature_file_name || '',
          signatureUploaded: !!(onboardingDetails.signature_info?.signature_id || 
                               onboardingDetails.signature_id),
          
          // Business preferences
          business_preference: onboardingDetails.business_preference || 
                              onboardingDetails.business_preferences || '',
          
          // Warehouse details - Map to RegistrationForm field names
          cityWarehouses: onboardingDetails.warehouse_details?.city_warehouses || 
                         onboardingDetails.city_warehouses || [],
          city_warehouses: onboardingDetails.warehouse_details?.city_warehouses || 
                          onboardingDetails.city_warehouses || [{ city_name: '', warehouse_count: 1 }],
          daily_order_volume: onboardingDetails.warehouse_details?.daily_order_volume || 
                             onboardingDetails.daily_order_volume || '',
          
          // Product details - handle both URL and file objects
          brand_logo: onboardingDetails.product_details?.brand_logo_url || 
                     onboardingDetails.product_details?.brand_logo || 
                     onboardingDetails.brand_logo_url || 
                     onboardingDetails.brand_logo || '',
          product_categories: onboardingDetails.product_details?.product_categories || 
                             onboardingDetails.product_categories || [],
          gender: onboardingDetails.product_details?.gender || 
                 onboardingDetails.gender || [],
          target_age_groups: onboardingDetails.product_details?.target_age_groups || 
                            onboardingDetails.target_age_groups || [],
          price_range: onboardingDetails.product_details?.price_range || 
                      onboardingDetails.price_range || [],
          product_catalog: onboardingDetails.product_details?.product_catalog_url || 
                          onboardingDetails.product_details?.product_catalog || 
                          onboardingDetails.product_catalog_url || 
                          onboardingDetails.product_catalog || '',
          
          // Bank details
          account_holder_name: onboardingDetails.bank_details?.account_holder_name || 
                              onboardingDetails.account_holder_name || '',
          account_number: onboardingDetails.bank_details?.account_number || 
                         onboardingDetails.account_number || '',
          ifsc_code: onboardingDetails.bank_details?.ifsc_code || 
                    onboardingDetails.ifsc_code || '',
          cancelled_cheque: onboardingDetails.bank_details?.cancelled_cheque_url || 
                           onboardingDetails.bank_details?.cancelled_cheque || 
                           onboardingDetails.cancelled_cheque_url || 
                           onboardingDetails.cancelled_cheque || '',
          bank_verification_status: onboardingDetails.bank_details?.verification_status || 
                                   onboardingDetails.verification_status?.bank || 
                                   'pending',
          
          // Verification status for each step
          verification_status: onboardingDetails.verification_status || {},
          
          // Onboarding status from API response
          isOnboardingComplete: responseData.is_onboarding_complete || false,
          currentStep: responseData.current_step || 'phone_verification',
          onboardingStatusCode: responseData.status_code || '',
          onboardingStatusMessage: responseData.status_message || '',
          onboardingProgress: responseData.onboarding_progress || {},
          
          // Store the complete onboarding summary for reference and debugging
          onboardingSummary: onboardingDetails
        };
        
        console.log('Mapped form data for components:', savedFormData);
        
        setFormData(savedFormData);
        // Store form data in sessionStorage instead of localStorage for better security
        sessionStorage.setItem('userFormData', JSON.stringify(savedFormData));
        console.log('Saved comprehensive form data with onboarding summary:', savedFormData);
        
        return profileData;
      }
      
      return null;
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      return null;
    }
  };

  // Function to get onboarding summary independently
  const getOnboardingSummary = async () => {
    const token = getAuthToken();
    if (!token) return null;
    
    try {
      console.log('Fetching onboarding summary...');
      
      const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/onboarding-summary/', {
        method: 'GET'
      });
      
      const data = await response.json();
      console.log('Onboarding summary response:', { status: response.status, data });
      
      if (response.ok && data.success) {
        return data.data;
      }
      
      return null;
    } catch (error) {
      console.error('Failed to get onboarding summary:', error);
      return null;
    }
  };

  // Debug helper function to inspect API structure
  const debugFormDataMapping = () => {
    if (!formData) {
      console.log('No form data available');
      return;
    }
    
    console.group('Form Data Debug Information');
    console.log('Current formData structure:', formData);
    
    if (formData.onboardingSummary) {
      console.log('Raw onboarding summary from API:', formData.onboardingSummary);
      
      // Check each major section
      const sections = ['gst_info', 'basic_info', 'signature_info', 'business_preference', 
                       'warehouse_details', 'product_details', 'bank_details', 'verification_status'];
      
      sections.forEach(section => {
        if (formData.onboardingSummary[section]) {
          console.log(`${section}:`, formData.onboardingSummary[section]);
        } else {
          console.log(`${section}: Not found or empty`);
        }
      });
    } else {
      console.log('No onboarding summary data found in formData');
    }
    
    console.groupEnd();
  };

  // Function to validate token with API (call this explicitly when needed)
  const validateTokenWithAPI = async () => {
    const profileData = await refreshUserData();
    
    if (profileData) {
      setIsAuthenticated(true);
      return { success: true, data: profileData };
    } else {
      // If validation failed, token is invalid - clean up securely
      removeAuthToken();
      sessionStorage.removeItem('userFormData');
      localStorage.removeItem('userFormData'); // cleanup legacy storage
      setIsAuthenticated(false);
      setUserData(null);
      setFormData(null);
      return { success: false };
    }
  };

  // Initialize authentication state (check secure storage, no API call)
  useEffect(() => {
    const initializeAuth = () => {
      const token = getAuthToken(); // Use secure token getter
      
      if (token) {
        setIsAuthenticated(true);
        loadSavedFormData();
      } else {
        setIsAuthenticated(false);
      }
      
      setIsLoading(false);
    };

    initializeAuth();
  }, [loadSavedFormData]);

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    
    try {
      console.log('Login attempt with:', { email });
      const response = await fetch('http://15.207.254.95:8080/api/brand/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for httpOnly token support
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      console.log('Login response:', { status: response.status, data });
      
      if (response.ok && data.success && data.token) {
        // Handle token object with access and refresh properties
        let authToken;
        if (data.token.access) {
          // Token is an object with access property
          authToken = 'Bearer ' + data.token.access;
          
          // Save refresh token securely in sessionStorage
          if (data.token.refresh) {
            sessionStorage.setItem('refreshToken', data.token.refresh);
            console.log('Refresh token saved securely');
          }
        } else {
          // Fallback for direct token string
          authToken = typeof data.token === 'string' ? data.token.trim() : String(data.token);
          if (!authToken.startsWith('Bearer ')) {
            authToken = 'Bearer ' + authToken;
          }
        }
        
        console.log('Saving auth token securely:', authToken.substring(0, 20) + '...');
        setAuthToken(authToken); // Use secure token setter
        setIsAuthenticated(true);
        
        // Get user data after login and validate token
        await validateTokenWithAPI();
        return { success: true, data };
      }
      
      // Check for specific error types to handle non-existent users
      if (response.status === 404 || 
          (data.detail && data.detail.toLowerCase().includes('not found')) ||
          (data.message && data.message.toLowerCase().includes('not found'))) {
        return { 
          success: false, 
          error: 'User not found. This email is not registered.',
          code: 'USER_NOT_FOUND'
        };
      }
      
      // Handle invalid credentials differently
      if (response.status === 401 || 
          (data.detail && data.detail.toLowerCase().includes('incorrect')) ||
          (data.message && data.message.toLowerCase().includes('incorrect'))) {
        return { 
          success: false, 
          error: 'Incorrect email or password. Please try again.',
          code: 'INVALID_CREDENTIALS'
        };
      }
      
      // Default error handling
      return { 
        success: false, 
        error: data.message || data.detail || 'Login failed',
        code: 'UNKNOWN_ERROR'
      };
    } catch (error) {
      console.error('Login failed:', error);
      return { 
        success: false, 
        error: 'Network error',
        code: 'NETWORK_ERROR'
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Secure cleanup of all authentication data
    removeAuthToken();
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('userFormData');
    
    // Cleanup legacy localStorage data
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userFormData');
    
    setIsAuthenticated(false);
    setUserData(null);
    setFormData(null);
    router.push('/login');
  };

  // Redirect to dashboard or registration based on onboarding status
  const redirectToDashboardOrRegistration = () => {
    if (!formData && !userData) return;
    
    // Use formData first (contains latest API response data), fallback to userData
    const onboardingData = formData || userData;
    const { isOnboardingComplete, currentStep, onboardingStatusCode } = onboardingData;
    
    if (isOnboardingComplete) {
      // If onboarding is complete, show the review/status step instead of dashboard
      // This allows users to see their submitted details and go to dashboard manually
      router.push('/signup?step=8&onboarding=true');
      return;
    }
    
    // Map API step names to our frontend step numbers
    // Backend status → Frontend routing
    const stepMapping = {
      'phone_verification': '1',        // Registration step 1
      'email_verification': '3',        // Registration step 3 (skip phone verify)
      'gst_verification': '1&onboarding=true',   // Onboarding step 1
      'brand_info': '2&onboarding=true',         // Onboarding step 2 (Basic Information)
      'signature_upload': '3&onboarding=true',  // Onboarding step 3
      'business_preference': '4&onboarding=true', // Onboarding step 4
      'warehouse_details': '5&onboarding=true',  // Onboarding step 5
      'product_details': '6&onboarding=true',    // Onboarding step 6
      'bank_details': '7&onboarding=true',       // Onboarding step 7
      'final_submission': '8&onboarding=true',   // Onboarding step 8
      'completed': '8&onboarding=true'           // Show review step instead of dashboard
    };

    // Status code to step mapping (for when we get status codes like "04")
    const statusCodeMapping = {
      '01': 'phone_verification',
      '02': 'email_verification', 
      '03': 'gst_verification',
      '04': 'brand_info',
      '05': 'signature_upload',
      '06': 'business_preference',
      '07': 'warehouse_details',
      '08': 'product_details',
      '09': 'bank_details',
      '10': 'final_submission',
      '00': 'completed'
    };
    
    let redirectUrl = '/signup?step=1'; // Default to first step
    let actualStep = currentStep;
    
    // If we have a status code, convert it to step name first
    if (onboardingStatusCode && statusCodeMapping[onboardingStatusCode]) {
      actualStep = statusCodeMapping[onboardingStatusCode];
    }
    
    // Get the redirect path from mapping
    if (actualStep && stepMapping[actualStep]) {
      const mappedRoute = stepMapping[actualStep];
      
      // All onboarding flows should go to their respective steps
      // Dashboard redirect is now handled only by the explicit condition above
      redirectUrl = `/signup?step=${mappedRoute}`;
    }
    
    console.log('Redirecting to onboarding step:', { 
      currentStep, 
      actualStep,
      redirectUrl,
      isOnboardingComplete,
      statusCode: onboardingStatusCode
    });
    
    router.push(redirectUrl);
  };

  // Helper function to get current onboarding information
  const getOnboardingInfo = () => {
    if (!formData) return null;
    
    const stepMapping = {
      'phone_verification': { step: 1, onboarding: false },
      'email_verification': { step: 3, onboarding: false },
      'gst_verification': { step: 1, onboarding: true },
      'brand_info': { step: 2, onboarding: true },
      'signature_upload': { step: 3, onboarding: true },
      'business_preference': { step: 4, onboarding: true },
      'warehouse_details': { step: 5, onboarding: true },
      'product_details': { step: 6, onboarding: true },
      'bank_details': { step: 7, onboarding: true },
      'final_submission': { step: 8, onboarding: true },
      'completed': { step: null, onboarding: true, completed: true }
    };

    // Status code to step mapping (for when we get status codes like "04")
    const statusCodeMapping = {
      '01': 'phone_verification',
      '02': 'email_verification', 
      '03': 'gst_verification',
      '04': 'brand_info',
      '05': 'signature_upload',
      '06': 'business_preference',
      '07': 'warehouse_details',
      '08': 'product_details',
      '09': 'bank_details',
      '10': 'final_submission',
      '00': 'completed'
    };
    
    const { currentStep, isOnboardingComplete, onboardingProgress, onboardingStatusCode } = formData;
    
    let stepInfo = { step: 1, onboarding: false };
    let actualStep = currentStep;
    
    // If we have a status code, convert it to step name first
    if (onboardingStatusCode && statusCodeMapping[onboardingStatusCode]) {
      actualStep = statusCodeMapping[onboardingStatusCode];
    }
    
    // Get step information from mapping
    if (actualStep && stepMapping[actualStep]) {
      stepInfo = stepMapping[actualStep];
    }
    
    return {
      currentStep: actualStep,
      stepNumber: stepInfo.step,
      isOnboarding: stepInfo.onboarding,
      isOnboardingComplete,
      progress: onboardingProgress,
      statusCode: onboardingStatusCode,
      statusMessage: formData.onboardingStatusMessage
    };
  };

  const value = {
    isAuthenticated,
    isLoading,
    userData,
    formData,
    login,
    logout,
    refreshUserData,
    getOnboardingSummary,
    debugFormDataMapping,
    validateTokenWithAPI,
    saveFormData,
    getSavedFormData,
    loadSavedFormData,
    redirectToDashboardOrRegistration,
    getOnboardingInfo,
    // New security functions
    getAuthToken,
    setAuthToken,
    removeAuthToken,
    refreshAccessToken,
    authenticatedFetch,
    // New diagnostic functions
    diagnoseAuthIssue,
    handleAuthError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

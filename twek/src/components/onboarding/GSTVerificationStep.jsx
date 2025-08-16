import { useState, useEffect } from 'react';
import { REGISTRATION_STYLES } from '../../utils/constants';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

export default function GSTVerificationStep({ formData, handleChange, onSubmit, onBack, isFirstOnboardingStep = false }) {
  const [error, setError] = useState('');
  const [gstDetails, setGstDetails] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationToken, setVerificationToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  const { getAuthToken, authenticatedFetch } = useAuth();

  // Get auth token on component mount and handle authentication checking
  useEffect(() => {
    // Function to check if user is authenticated
    const checkAuthentication = async () => {
      setIsLoading(true);
      const token = getAuthToken();
      
      if (!token) {
        console.warn('No authentication token found in localStorage');
        setError('Authentication required. Please log in before proceeding.');
        setIsAuthenticated(false);
        
        // Redirect to login page after a brief delay
        setTimeout(() => {
          router.push('/login');
        }, 2000);
        
        setIsLoading(false);
        return;
      }
      
      setVerificationToken(token.trim());
      setIsAuthenticated(true);
      setIsLoading(false);
      console.log('Auth token loaded, authentication successful');
    };
    
    checkAuthentication();
  }, [router]);

  const validateGSTNumber = (gstNumber) => {
    // Basic GST validation: 15 characters, starts with 2 digits (state code)
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gstNumber);
  };

  const handleGSTChange = (e) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    
    // Limit to 15 characters
    if (value.length > 15) {
      value = value.slice(0, 15);
    }
    
    // Clear error and GST details when user types
    if (error) setError('');
    if (gstDetails) setGstDetails(null);
    
    e.target.value = value;
    handleChange(e);
  };

  const handleVerifyGST = async () => {
    if (!formData.gstNumber) {
      setError('Please enter GST number');
      return;
    }

    if (!validateGSTNumber(formData.gstNumber)) {
      setError('Please enter a valid GST number (15 characters)');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      // Use the token we already validated in useEffect
      if (!verificationToken) {
        // Try to get the token again - it might have been set after component mounted
        const token = getAuthToken();
        if (token) {
          // We found a token now, let's use it
          setVerificationToken(token.trim());
          console.log('Found token on verification attempt');
        } else {
          setError('Authentication token not found. Please log in again.');
          setIsVerifying(false);
          return;
        }
      }
      
      console.log('Using verified auth token');
      
      // Format token properly - ensure it starts with Bearer if not already included
      let formattedToken = verificationToken;
      if (!formattedToken.startsWith('Bearer ')) {
        formattedToken = `Bearer ${formattedToken}`;
      }
      
      console.log('Request headers:', {
        'Content-Type': 'application/json',
        'Authorization': formattedToken.substring(0, 15) + '...'
      });
      console.log('Request payload:', {
        gst_number: formData.gstNumber,
        // company_name: formData.companyName || 'Test Company Name' // Default test company name
      });
      
      // Add more verbose debugging
      console.log('Making API request with headers:', {
        'Content-Type': 'application/json',
        'Authorization': formattedToken.substring(0, 15) + '...' + formattedToken.substring(formattedToken.length - 5)
      });
      
      // Use authenticated fetch with automatic token refresh
      const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/gst/verify/', {
        method: 'POST',
        body: JSON.stringify({
          gst_number: formData.gstNumber,
          // company_name: formData.companyName || 'Test Company Name' // Default test company name
        })
      });
      
      // Log detailed response information
      console.log('Response headers:', [...response.headers.entries()]);
      console.log('Response status:', response.status);
      console.log('Response statusText:', response.statusText);
      
      console.log('Response status:', response.status);
      
      // Handle 401 Unauthorized specifically
      if (response.status === 401) {
        console.error('Authentication error: 401 Unauthorized');
        setError('Authentication failed. Please log out and log in again.');
        setGstDetails(null);
        setIsVerifying(false);
        return;
      }
      
      const data = await response.json();
      console.log('GST verification response:', data);
      
      if (response.ok && data.success && data.verified) {
        // Extract GST details from response
        const gstData = {
          businessName: data.company_name || data.business_name || '',
          tradeName: data.trade_name || data.business_name || '',
          registrationDate: data.registration_date || '',
          constitution: data.constitution || '',
          address: data.address || '',
          status: data.status || 'Active',
          taxpayerType: data.taxpayer_type || 'Regular'
        };
        
        setGstDetails(gstData);
        setError('');
        
        // Store GST details in formData for prepopulation in next steps
        handleChange({
          target: { name: 'gstBusinessName', value: gstData.businessName }
        });
        handleChange({
          target: { name: 'gstTradeName', value: gstData.tradeName }
        });
        handleChange({
          target: { name: 'gstConstitution', value: gstData.constitution }
        });
        handleChange({
          target: { name: 'gstAddress', value: gstData.address }
        });
        handleChange({
          target: { name: 'gstStatus', value: gstData.status }
        });
        handleChange({
          target: { name: 'gstRegistrationDate', value: gstData.registrationDate }
        });
      } else {
        // Handle specific error types
        if (response.status === 401) {
          console.error('Authentication error during GST verification:', data);
          setError('Authentication failed. Please log out and log in again.');
        } else {
          setError(data.message || data.detail || 'GST verification failed. Please check your GST number and try again.');
        }
        setGstDetails(null);
      }
    } catch (error) {
      console.error('GST verification error:', error);
      setError('Network error while verifying GST. Please try again.');
      setGstDetails(null);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!gstDetails) {
      setError('Please verify your GST number first');
      return;
    }
    
    console.log('GST verification completed, proceeding to next step');
    onSubmit();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          <p className="ml-3 text-gray-600">Checking authentication...</p>
        </div>
      ) : !isAuthenticated ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Authentication Required</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>You must be logged in to access the brand onboarding process.</p>
                <p className="mt-2">Redirecting you to the login page...</p>
              </div>
              <div className="mt-4">
                <a 
                  href="/login" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150"
                >
                  Go to Login
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {isFirstOnboardingStep && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Welcome to Brand Onboarding!</h3>
                  <p className="mt-1 text-sm text-blue-700">
                    You've successfully completed the authentication process. Now let's set up your brand profile. 
                    You can complete this process at your own pace.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">GST Verification</h2>
            <p className="text-gray-600">Enter your GST number to verify your business details</p>
          </div>

          <form className={REGISTRATION_STYLES.form} onSubmit={handleSubmit}>
            <div className={REGISTRATION_STYLES.fieldGroup}>
              <div className={REGISTRATION_STYLES.fieldContainer}>
                <label htmlFor="gstNumber" className={REGISTRATION_STYLES.label}>
                  GST Number
                </label>
                <div className="flex gap-3">
                  <input
                    id="gstNumber"
                    name="gstNumber"
                    type="text"
                    required
                    maxLength={15}
                    className={`flex-1 ${REGISTRATION_STYLES.input} ${error && !gstDetails ? 'border-red-500' : ''}`}
                    placeholder="07AAACG0569H1ZH"
                    value={formData.gstNumber || ''}
                    onChange={handleGSTChange}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyGST}
                    disabled={isVerifying || !formData.gstNumber}
                    className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ${isVerifying ? 'animate-pulse' : ''}`}
                  >
                    {isVerifying ? 'Verifying...' : 'Verify'}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Enter your 15-digit GST number (e.g., 07AAACG0569H1ZH or 29AABCU9603R1ZX)
                </p>
                
                {error && (
                  <div className="mt-1">
                    <p className="text-xs text-red-600">
                      {error}
                    </p>
                    {error.includes('log in') && (
                      <a 
                        href="/login" 
                        className="mt-2 inline-block text-xs text-blue-600 hover:text-blue-800"
                      >
                        Click here to log in
                      </a>
                    )}
                  </div>
                )}
              </div>

              {gstDetails && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <h3 className="text-lg font-semibold text-green-800">GST Details Verified</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Business Name:</p>
                      <p className="text-gray-900">{gstDetails.businessName}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Trade Name:</p>
                      <p className="text-gray-900">{gstDetails.tradeName}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Constitution:</p>
                      <p className="text-gray-900">{gstDetails.constitution}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Status:</p>
                      <span className="inline-flex px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {gstDetails.status}
                      </span>
                    </div>
                    <div className="md:col-span-2">
                      <p className="font-medium text-gray-700">Registered Address:</p>
                      <p className="text-gray-900">{gstDetails.address}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Registration Date:</p>
                      <p className="text-gray-900">{gstDetails.registrationDate}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Taxpayer Type:</p>
                      <p className="text-gray-900">{gstDetails.taxpayerType}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={REGISTRATION_STYLES.buttonGroup}>
              {!isFirstOnboardingStep && (
                <button
                  type="button"
                  onClick={onBack}
                  className={REGISTRATION_STYLES.backButton}
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={!gstDetails}
                className={`${REGISTRATION_STYLES.submitButton} ${!gstDetails ? 'opacity-50 cursor-not-allowed' : ''} ${isFirstOnboardingStep ? 'w-full' : ''}`}
              >
                Continue
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

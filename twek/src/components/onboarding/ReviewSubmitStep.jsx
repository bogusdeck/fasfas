import { useState, useEffect } from 'react';
import { ONBOARDING_STEPS, REGISTRATION_STYLES } from '../../utils/constants';
import { useAuth } from '../../hooks/useAuth';
import OnboardingStatusStep from './OnboardingStatusStep';

export default function ReviewSubmitStep({ formData, handleChange, onSubmit, onBack }) {
  const stepData = ONBOARDING_STEPS[8];
  const [error, setError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [onboardingData, setOnboardingData] = useState(null);
  const [showStatus, setShowStatus] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const { saveFormData, formData: authFormData, authenticatedFetch, getAuthToken } = useAuth();

  // Fetch onboarding summary data from API
  useEffect(() => {
    const fetchOnboardingSummary = async () => {
      try {
        setIsLoading(true);
        
        // Get authentication token using secure method
        const token = getAuthToken();
        if (!token) {
          setError('Authentication required. Please log in again.');
          setIsLoading(false);
          return;
        }

        console.log('Fetching onboarding summary...');

        // Use authenticated fetch with automatic token refresh
        const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/onboarding-summary/', {
          method: 'GET'
        });

        const data = await response.json();
        console.log('Onboarding summary API response:', { status: response.status, data });

        if (response.ok && data.success) {
          console.log('Onboarding summary fetched successfully:', data);
          setOnboardingData(data.data);
          setError('');
          
          // Check if onboarding is complete from auth context or API response
          const isComplete = authFormData?.isOnboardingComplete || data.data?.is_onboarding_complete || false;
          setIsOnboardingComplete(isComplete);
          
          // If onboarding is complete, show status immediately
          if (isComplete) {
            setShowStatus(true);
            setSubmissionData(data); // Use the API response as submission data
          }
        } else {
          // Handle API errors
          if (response.status === 401) {
            setError('Authentication failed. Please log in again.');
          } else if (response.status === 403) {
            setError('Email or phone not verified. Please complete verification first.');
          } else if (response.status === 404) {
            setError('Brand profile not found. Please complete previous steps.');
          } else {
            setError(data.message || data.detail || 'Failed to fetch onboarding summary. Please try again.');
          }
        }
      } catch (error) {
        console.error('Error fetching onboarding summary:', error);
        setError('Network error while fetching data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOnboardingSummary();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!termsAccepted) {
      setError('Please accept the Terms & Conditions to continue');
      return;
    }

    if (!privacyAccepted) {
      setError('Please accept the Privacy Policy to continue');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Get authentication token using secure method
      const token = getAuthToken();
      if (!token) {
        setError('Authentication required. Please log in again.');
        return;
      }

      console.log('Submitting final onboarding application...');

      // Prepare submission data
      const submissionData = {
        terms_accepted: termsAccepted,
        privacy_policy_accepted: privacyAccepted
      };

      console.log('Final submission data:', submissionData);

      // Use authenticated fetch with automatic token refresh
      const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/final-submission/', {
        method: 'POST',
        body: JSON.stringify(submissionData)
      });

      const data = await response.json();
      console.log('Final submission API response:', { status: response.status, data });

      if (response.ok && data.success) {
        console.log('Final submission successful:', data);
        setError('');
        
        // Store submission data and show status component
        setSubmissionData(data);
        setShowStatus(true);
      } else {
        // Handle API errors
        if (response.status === 400) {
          setError(data.message || data.detail || 'Bad request. Please check your submission data.');
        } else if (response.status === 401) {
          setError('Authentication failed. Please log in again.');
        } else if (response.status === 403) {
          setError('Email or phone not verified. Please complete verification first.');
        } else if (response.status === 404) {
          setError('Brand profile not found. Please complete previous steps.');
        } else if (response.status === 422) {
          setError('Incomplete onboarding steps. Please complete all previous steps first.');
        } else {
          setError(data.message || data.detail || 'Failed to submit application. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error submitting final application:', error);
      setError('Network error while submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
    if (error) setError('');
  };

  const handlePrivacyChange = (e) => {
    setPrivacyAccepted(e.target.checked);
    if (error) setError('');
  };

  // Helper function to format arrays for display
  const formatArray = (arr, fallback = 'Not specified') => {
    if (!arr || arr.length === 0) return fallback;
    const joined = arr.join(', ');
    // Truncate if too long
    if (joined.length > 100) {
      return joined.substring(0, 97) + '...';
    }
    return joined;
  };

  // Helper function to format file names  
  const formatFileName = (file) => {
    if (!file) return 'Not uploaded';
    const name = file.name || 'File uploaded';
    // Truncate long file names
    if (name.length > 50) {
      const ext = name.split('.').pop();
      const baseName = name.substring(0, 40);
      return `${baseName}...${ext ? '.' + ext : ''}`;
    }
    return name;
  };

  // Get effective values with fallbacks and truncation
  const getEffectiveValue = (primary, ...fallbacks) => {
    let value = primary;
    
    if (!value || (typeof value === 'string' && !value.trim())) {
      for (const fallback of fallbacks) {
        if (fallback && (typeof fallback !== 'string' || fallback.trim())) {
          value = fallback;
          break;
        }
      }
    }
    
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'Not specified';
    }
    
    // Truncate long text values
    if (typeof value === 'string' && value.length > 150) {
      return value.substring(0, 147) + '...';
    }
    
    return value;
  };

  // Get data from API response or fallback to form data
  const getDataValue = (apiPath, fallback = 'Not specified') => {
    if (!onboardingData) return fallback;
    
    // Navigate through nested object path
    const pathParts = apiPath.split('.');
    let value = onboardingData;
    
    for (const part of pathParts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        return fallback;
      }
    }
    
    if (!value || (typeof value === 'string' && !value.trim())) {
      return fallback;
    }
    
    // Truncate long text values
    if (typeof value === 'string' && value.length > 150) {
      return value.substring(0, 147) + '...';
    }
    
    return value;
  };

  const reviewSections = [
    {
      title: 'Personal Information',
      items: [
        { 
          label: 'Full Name', 
          value: onboardingData?.basic_info ? 
            `${onboardingData.basic_info.owner_name || ''}`.trim() || 'Not specified' :
            `${formData.firstName || ''} ${formData.lastName || ''}`.trim() || 'Not specified'
        },
        { 
          label: 'Phone Number', 
          value: getDataValue('basic_info.contact_number', formData.phoneNumber || 'Not specified')
        },
        { 
          label: 'Email Address', 
          value: getDataValue('basic_info.email', formData.email || 'Not specified')
        },
      ]
    },
    {
      title: 'GST Information',
      items: [
        { label: 'GST Number', value: getDataValue('gst_info.gst_number', formData.gstNumber || 'Not specified') },
        { label: 'Business Name', value: getDataValue('gst_info.company_name', formData.gstBusinessName || 'Not specified') },
        { label: 'Trade Name', value: getDataValue('gst_info.trade_name', formData.gstTradeName || 'Not specified') },
        { label: 'Constitution', value: getDataValue('gst_info.constitution', formData.gstConstitution || 'Not specified') },
        { label: 'Verification Status', value: getDataValue('gst_info.verification_status') ? '✓ Verified' : '⏳ Pending Verification' },
      ]
    },
    {
      title: 'Business Information',
      items: [
        { label: 'Owner Name', value: getDataValue('basic_info.owner_name', formData.ownerName || 'Not specified') },
        { label: 'Contact Number', value: getDataValue('basic_info.contact_number', formData.contactNumber || 'Not specified') },
        { label: 'Business Email', value: getDataValue('basic_info.email', formData.businessEmail || 'Not specified') },
        { label: 'Company Name', value: getDataValue('basic_info.company_name', formData.companyName || 'Not specified') },
        { label: 'Company Type', value: getDataValue('basic_info.company_type', formData.companyType || 'Not specified') },
        { label: 'Business Address', value: getDataValue('basic_info.address', formData.businessAddress || 'Not specified') },
      ]
    },
    {
      title: 'Business Preferences',
      items: [
        { 
          label: 'Business Preference', 
          value: (() => {
            const pref = getDataValue('business_preference.preference', formData.business_preference);
            if (pref === 'marketplace_only') return 'Marketplace Only';
            if (pref === 'marketplace_and_api') return 'Marketplace & API';
            return 'Not specified';
          })()
        },
      ]
    },
    {
      title: 'Warehouse Details',
      items: [
        { 
          label: 'Warehouse Locations', 
          value: (() => {
            const warehouses = onboardingData?.warehouse_details?.city_warehouses;
            if (warehouses && warehouses.length > 0) {
              const formatted = warehouses.map(w => `${w.city_name} (${w.warehouse_count})`);
              const joined = formatted.join(', ');
              return joined.length > 120 ? joined.substring(0, 117) + '...' : joined;
            }
            return formData.city_warehouses && formData.city_warehouses.length > 0 
              ? formData.city_warehouses.map(w => `${w.city_name} (${w.warehouse_count})`).join(', ')
              : 'Not specified';
          })()
        },
        { 
          label: 'Daily Order Volume', 
          value: (() => {
            const volume = getDataValue('warehouse_details.daily_order_volume', formData.daily_order_volume);
            return volume !== 'Not specified' ? `${volume} orders/day` : 'Not specified';
          })()
        },
      ]
    },
    {
      title: 'Brand & Product Details',
      items: [
        { label: 'Brand Logo', value: getDataValue('product_details.brand_logo') ? 'Uploaded' : 'Not uploaded' },
        { 
          label: 'Product Categories', 
          value: (() => {
            const categories = onboardingData?.product_details?.product_categories;
            return formatArray(categories, formatArray(formData.product_categories));
          })()
        },
        { 
          label: 'Target Gender', 
          value: (() => {
            const genders = onboardingData?.product_details?.gender;
            return formatArray(genders, formatArray(formData.gender));
          })()
        },
        { 
          label: 'Target Age Range', 
          value: (() => {
            const ageGroups = onboardingData?.product_details?.age_group_range;
            if (ageGroups && ageGroups.length === 2) {
              return `${ageGroups[0]} - ${ageGroups[1]} years`;
            }
            if (formData.target_age_groups && formData.target_age_groups.length === 2) {
              return `${formData.target_age_groups[0]} - ${formData.target_age_groups[1]} years`;
            }
            return 'Not specified';
          })()
        },
        { 
          label: 'Price Range', 
          value: (() => {
            const priceRange = onboardingData?.product_details?.price_range;
            if (priceRange && priceRange.length === 2 && priceRange[0] && priceRange[1]) {
              return `₹${priceRange[0]} - ₹${priceRange[1]}`;
            }
            if (formData.price_range && formData.price_range.length === 2 && formData.price_range[0] && formData.price_range[1]) {
              return `₹${formData.price_range[0]} - ₹${formData.price_range[1]}`;
            }
            return 'Not specified';
          })()
        },
        { label: 'Total SKUs', value: getDataValue('product_details.total_skus', 'Not specified') },
        { label: 'Average Order Value', value: (() => {
            const aov = getDataValue('product_details.average_order_value', 0);
            return aov > 0 ? `₹${aov}` : 'Not specified';
          })() 
        },
      ]
    },
    {
      title: 'Banking Details',
      items: [
        { label: 'Account Holder Name', value: getDataValue('bank_details.account_holder_name', formData.account_holder_name || 'Not specified') },
        { label: 'Account Number', value: getDataValue('bank_details.account_number', formData.account_number || 'Not specified') },
        { label: 'IFSC Code', value: getDataValue('bank_details.ifsc_code', formData.ifsc_code || 'Not specified') },
        { label: 'Bank Reference ID', value: getDataValue('bank_details.bank_reference_id', 'Not assigned') },
        { label: 'Cancelled Cheque', value: getDataValue('bank_details.cancelled_cheque_uploaded') ? 'Uploaded' : 'Not uploaded' },
        { 
          label: 'Verification Status', 
          value: (() => {
            const status = getDataValue('bank_details.bank_verification_status', false);
            return status ? '✓ Verified' : '⏳ Pending Verification';
          })()
        },
      ]
    },
    {
      title: 'Documents',
      items: [
        { label: 'Digital Signature', value: getDataValue('signature_info.signature_id') ? 'Uploaded' : 'Not uploaded' },
        { label: 'TAN Number', value: getDataValue('signature_info.tan_number', 'Not specified') },
      ]
    },
    {
      title: 'Verification Status',
      items: [
        { label: 'Email Verified', value: getDataValue('verification_status.email_verified') ? '✓ Verified' : '⏳ Pending' },
        { label: 'Phone Verified', value: getDataValue('verification_status.phone_verified') ? '✓ Verified' : '⏳ Pending' },
        { label: 'GST Verified', value: getDataValue('verification_status.gst_verified') ? '✓ Verified' : '⏳ Pending' },
        { label: 'Bank Verified', value: getDataValue('verification_status.bank_verified') ? '✓ Verified' : '⏳ Pending' },
      ]
    }
  ];

  // Show status component after successful submission
  if (showStatus && submissionData) {
    return (
      <OnboardingStatusStep
        submissionData={submissionData}
        onGoToDashboard={() => {
          // Navigate to dashboard
          window.location.href = '/dashboard';
        }}
        onStartNewApplication={() => {
          // Reset form and start new application
          setShowStatus(false);
          setSubmissionData(null);
          window.location.href = '/register';
        }}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          {isOnboardingComplete ? 'Your Onboarding Details' : stepData.title}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          {isOnboardingComplete 
            ? 'Review your submitted onboarding information. Your application has been successfully submitted and is under review.' 
            : stepData.subtitle
          }
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your onboarding summary...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
          <p className="text-sm text-red-600 break-words">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-red-700 hover:text-red-900 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && !error && (
        <div className="space-y-6 sm:space-y-8">
          
          {/* Review Sections */}
          {reviewSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 pb-2 border-b border-gray-300">
                {section.title}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-600 mb-1">
                      {item.label}
                    </dt>
                    <dd className="text-sm text-gray-900 bg-white px-3 py-2 rounded border border-gray-200 min-h-[2.5rem] flex items-start break-words overflow-hidden">
                      <span className="w-full overflow-hidden text-ellipsis">
                        {item.value}
                      </span>
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Terms and Conditions - Only show when onboarding is not complete */}
          {!isOnboardingComplete && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-4">
                Terms & Conditions
              </h3>
              
              <div className="space-y-4">
                {/* Terms & Conditions Checkbox */}
                <div className="flex items-start space-x-3">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={handleTermsChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-1 flex-shrink-0"
                  />
                  <label htmlFor="terms" className="text-xs sm:text-sm text-gray-700 cursor-pointer leading-relaxed">
                    I have read and agree to the{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                      Terms & Conditions
                    </a>{' '}
                    of the marketplace. I understand the terms of service, fees, and policies governing my participation as a brand partner.
                  </label>
                </div>

                {/* Privacy Policy Checkbox */}
                <div className="flex items-start space-x-3">
                  <input
                    id="privacy"
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={handlePrivacyChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-1 flex-shrink-0"
                  />
                  <label htmlFor="privacy" className="text-xs sm:text-sm text-gray-700 cursor-pointer leading-relaxed">
                    I acknowledge that I have read and understood the{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                      Privacy Policy
                    </a>{' '}
                    and consent to the collection, processing, and storage of my personal and business data as described.
                  </label>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mt-6 p-3 sm:p-4 bg-white border border-blue-200 rounded-md">
                <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">Important Information:</h4>
                <ul className="text-xs sm:text-sm text-blue-800 space-y-1 leading-relaxed">
                  <li>• Your application will be reviewed within 2-3 business days</li>
                  <li>• You will receive email notifications about your application status</li>
                  <li>• Additional documentation may be requested during the review process</li>
                  <li>• Once approved, you can start listing your products on the marketplace</li>
                </ul>
              </div>
            </div>
          )}

          {/* Completion Status - Show when onboarding is complete */}
          {isOnboardingComplete && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-green-900 mb-4">
                ✅ Application Status
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-green-800">
                  <strong>Status:</strong> Your onboarding application has been successfully submitted and is currently under review.
                </p>
                <p className="text-sm text-green-800">
                  <strong>Submitted:</strong> All required information and documents have been provided.
                </p>
                <p className="text-sm text-green-800">
                  <strong>Next Steps:</strong> Our team will review your application within 2-3 business days. You will receive email notifications about any status updates.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 break-words">
                {error}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation Buttons - Different based on onboarding status */}
      {!isOnboardingComplete ? (
        // Show submission form when onboarding is not complete
        <form className={REGISTRATION_STYLES.form} onSubmit={handleSubmit}>
          <div className={`${REGISTRATION_STYLES.buttonGroup} mt-6 sm:mt-8`}>
            <button
              type="button"
              onClick={onBack}
              className={`${REGISTRATION_STYLES.backButton} text-sm sm:text-base px-4 py-2`}
            >
              {stepData.buttons.back}
            </button>
            <button
              type="submit"
              disabled={!termsAccepted || !privacyAccepted || isLoading || isSubmitting}
              className={`${REGISTRATION_STYLES.submitButton} ${
                !termsAccepted || !privacyAccepted || isLoading || isSubmitting
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              } text-sm sm:text-base px-4 py-2 flex items-center justify-center`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                stepData.buttons.submit
              )}
            </button>
          </div>
        </form>
      ) : (
        // Show dashboard navigation when onboarding is complete
        <div className={`${REGISTRATION_STYLES.buttonGroup} mt-6 sm:mt-8`}>
          <button
            type="button"
            onClick={() => window.location.href = '/signup?step=1'}
            className={`${REGISTRATION_STYLES.backButton} text-sm sm:text-base px-4 py-2`}
          >
            Start New Application
          </button>
          <button
            type="button"
            onClick={() => window.location.href = '/dashboard'}
            className={`${REGISTRATION_STYLES.submitButton} bg-blue-600 hover:bg-blue-700 text-sm sm:text-base px-4 py-2 flex items-center justify-center`}
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { ONBOARDING_STEPS, REGISTRATION_STYLES } from '../../utils/constants';
import { useAuth } from '../../contexts/AuthContext';

export default function BasicInformationStep({ formData, handleChange, onSubmit, onBack }) {
  const stepData = ONBOARDING_STEPS[2];
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formData: savedFormData, userData, saveFormData, getAuthToken, authenticatedFetch } = useAuth();

  // Prepopulate fields with data from previous steps and saved data
  useEffect(() => {
    // Only prepopulate if no form data exists yet (initial load)
    const hasAnyFormData = formData.ownerName || formData.contactNumber || formData.businessEmail || 
                          formData.companyName || formData.companyType || formData.addressLine1 || 
                          formData.addressLine2 || formData.state || formData.zipCode;
    
    if (hasAnyFormData) {
      return; // Don't prepopulate if user has already started filling the form
    }

    let hasUpdates = false;
    const updates = {};

    // Use saved form data as fallback for prepopulation
    const sourceData = { ...savedFormData, ...formData };

    // Prepopulate owner name from registration data or saved data
    if (!formData.ownerName && (sourceData.firstName || sourceData.lastName || sourceData.ownerName)) {
      const ownerName = sourceData.ownerName || `${sourceData.firstName || ''} ${sourceData.lastName || ''}`.trim();
      if (ownerName) {
        updates.ownerName = ownerName;
        hasUpdates = true;
      }
    }

    // Prepopulate contact number from verified user details in AuthContext
    if (!formData.contactNumber && userData?.user_details?.phone_number) {
      const contactNumber = userData.user_details.phone_number;
      if (contactNumber) {
        // Remove +91 prefix if present to show only the 10-digit number
        const cleanNumber = contactNumber.replace(/^\+91/, '');
        updates.contactNumber = cleanNumber;
        hasUpdates = true;
      }
    }

    // Prepopulate business email from verified user details in AuthContext
    if (!formData.businessEmail && userData?.user_details?.email) {
      const businessEmail = userData.user_details.email;
      if (businessEmail) {
        updates.businessEmail = businessEmail;
        hasUpdates = true;
      }
    }

    // Prepopulate company name from GST data or saved data
    if (!formData.companyName && (sourceData.gstBusinessName || sourceData.gstTradeName || sourceData.companyName)) {
      const companyName = sourceData.companyName || sourceData.gstBusinessName || sourceData.gstTradeName;
      if (companyName) {
        updates.companyName = companyName;
        hasUpdates = true;
      }
    }

    // Prepopulate company type from GST constitution or saved data
    if (!formData.companyType && (sourceData.gstConstitution || sourceData.companyType)) {
      const companyType = sourceData.companyType || sourceData.gstConstitution;
      if (companyType) {
        updates.companyType = companyType;
        hasUpdates = true;
      }
    }

    // Prepopulate business address from GST data or saved data
    if (!formData.addressLine1 && !formData.addressLine2 && !formData.state && !formData.zipCode) {
      
      // Use individual address components if available from saved data
      if (sourceData.addressLine1) {
        updates.addressLine1 = sourceData.addressLine1;
        hasUpdates = true;
      }
      if (sourceData.addressLine2) {
        updates.addressLine2 = sourceData.addressLine2;
        hasUpdates = true;
      }
      if (sourceData.state) {
        updates.state = sourceData.state;
        hasUpdates = true;
      }
      if (sourceData.zipCode) {
        updates.zipCode = sourceData.zipCode;
        hasUpdates = true;
      }
      
      // Only if no individual components exist, try to use the full address in addressLine1
      if (!sourceData.addressLine1 && !sourceData.addressLine2 && !sourceData.state && !sourceData.zipCode) {
        const fullAddress = sourceData.businessAddress || sourceData.gstAddress;
        if (fullAddress && typeof fullAddress === 'string') {
          // Put the full address in addressLine1 as a starting point
          updates.addressLine1 = fullAddress;
          hasUpdates = true;
        }
      }
    }

    // Apply all updates at once to avoid multiple re-renders
    if (hasUpdates) {
      Object.entries(updates).forEach(([key, value]) => {
        handleChange({
          target: { name: key, value: value }
        });
      });
    }
  }, [
    // Only depend on key data sources, not the form data itself to prevent loops
    userData?.user_details?.phone_number,
    userData?.user_details?.email,
    savedFormData?.firstName,
    savedFormData?.lastName,
    savedFormData?.gstBusinessName,
    savedFormData?.gstTradeName,
    savedFormData?.gstConstitution,
    savedFormData?.gstAddress,
    savedFormData?.addressLine1,
    savedFormData?.addressLine2,
    savedFormData?.state,
    savedFormData?.zipCode,
    handleChange
  ]);

  // Company type options
  const companyTypes = [
    'Private Limited Company',
    'Public Limited Company',
    'Limited Liability Partnership (LLP)',
    'Partnership Firm',
    'Sole Proprietorship',
    'One Person Company (OPC)',
    'Section 8 Company',
    'Producer Company',
    'Other'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Get effective values (including verified data from AuthContext)
    const effectiveOwnerName = formData.ownerName || `${formData.firstName || ''} ${formData.lastName || ''}`.trim();
    const effectiveContactNumber = formData.contactNumber || 
                                 (userData?.user_details?.phone_number?.replace(/^\+91/, '')); // Always use verified number from AuthContext
    const effectiveBusinessEmail = formData.businessEmail || 
                                 userData?.user_details?.email; // Always use verified email from AuthContext
    const effectiveCompanyName = formData.companyName || formData.gstBusinessName || formData.gstTradeName;
    const effectiveCompanyType = formData.companyType || formData.gstConstitution;
    
    // Concatenate address fields for API submission
    const addressParts = [
      formData.addressLine1?.trim(),
      formData.addressLine2?.trim(),
      formData.state?.trim(),
      formData.zipCode?.trim()
    ].filter(Boolean); // Remove empty parts
    
    const effectiveBusinessAddress = addressParts.length > 0 ? addressParts.join(', ') : (formData.gstAddress || '');

    // Validation
    if (!effectiveOwnerName?.trim()) {
      setError('Owner name is required');
      setIsSubmitting(false);
      return;
    }

    // Skip validation for contact number and email since they are verified and read-only
    if (!effectiveContactNumber?.trim()) {
      setError('Contact number is missing. Please contact support.');
      setIsSubmitting(false);
      return;
    }

    if (!effectiveBusinessEmail?.trim()) {
      setError('Business email is missing. Please contact support.');
      setIsSubmitting(false);
      return;
    }

    if (!effectiveCompanyName?.trim()) {
      setError('Company name is required');
      setIsSubmitting(false);
      return;
    }

    if (!effectiveCompanyType?.trim()) {
      setError('Please select a company type');
      setIsSubmitting(false);
      return;
    }

    // Validate required address fields
    if (!formData.addressLine1?.trim()) {
      setError('Address Line 1 is required');
      setIsSubmitting(false);
      return;
    }

    if (!formData.state?.trim()) {
      setError('State is required');
      setIsSubmitting(false);
      return;
    }

    if (!formData.zipCode?.trim()) {
      setError('ZIP Code is required');
      setIsSubmitting(false);
      return;
    }

    // Validate ZIP code format (6 digits for Indian PIN codes)
    const zipCodeRegex = /^\d{6}$/;
    if (!zipCodeRegex.test(formData.zipCode?.trim())) {
      setError('ZIP Code must be exactly 6 digits');
      setIsSubmitting(false);
      return;
    }

    if (!effectiveBusinessAddress?.trim()) {
      setError('Business address is required. Please fill in at least Address Line 1.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Get authentication token using secure method
      const token = getAuthToken();
      if (!token) {
        setError('Authentication required. Please log in again.');
        setIsSubmitting(false);
        return;
      }

      // Prepare data for API
      const basicInfoData = {
        owner_name: effectiveOwnerName,
        contact_number: effectiveContactNumber.startsWith('+91') ? effectiveContactNumber : `+91${effectiveContactNumber}`, // Ensure +91 prefix for API
        email: effectiveBusinessEmail,
        company_name: effectiveCompanyName,
        company_type: effectiveCompanyType,
        address: effectiveBusinessAddress
      };

      console.log('Submitting basic information:', basicInfoData);

      // Use authenticated fetch with automatic token refresh
      const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/basic-info/', {
        method: 'POST',
        body: JSON.stringify(basicInfoData)
      });

      const data = await response.json();
      console.log('Basic info API response:', { status: response.status, data });

      if (response.ok && data.success) {
        console.log('Basic information submitted successfully, proceeding to next step');
        
        // Save the submitted data for future prepopulation
        const savedData = {
          ownerName: effectiveOwnerName,
          contactNumber: effectiveContactNumber,
          businessEmail: effectiveBusinessEmail,
          companyName: effectiveCompanyName,
          companyType: effectiveCompanyType,
          addressLine1: formData.addressLine1 || '',
          addressLine2: formData.addressLine2 || '',
          state: formData.state || '',
          zipCode: formData.zipCode || '',
          businessAddress: effectiveBusinessAddress
        };
        saveFormData(savedData);
        
        onSubmit();
      } else {
        // Handle API errors
        if (response.status === 401) {
          setError('Authentication failed. Please log in again.');
        } else {
          setError(data.message || data.detail || 'Failed to submit basic information. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error submitting basic information:', error);
      setError('Network error while submitting information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    if (error) setError('');
    handleChange(e);
  };

  const handleZipCodeChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    // Limit to 6 digits
    if (value.length > 6) {
      value = value.slice(0, 6);
    }
    
    // Clear error when user starts typing
    if (error) setError('');
    
    e.target.value = value;
    handleChange(e);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
        <p className="text-gray-600">Provide your business and contact details</p>
      </div>

      <form className={REGISTRATION_STYLES.form} onSubmit={handleSubmit}>
        <div className={REGISTRATION_STYLES.fieldGroup}>
          {/* Owner Name */}
          <div className={REGISTRATION_STYLES.fieldContainer}>
            <label htmlFor="ownerName" className={REGISTRATION_STYLES.label}>
              Owner Name *
            </label>
            <input
              id="ownerName"
              name="ownerName"
              type="text"
              required
              className={`${REGISTRATION_STYLES.input} ${error ? 'border-red-500' : ''}`}
              placeholder="Enter owner's full name"
              value={formData.ownerName || ''}
              onChange={handleInputChange}
            />
          </div>

          {/* Contact Number - Read Only (Verified) */}
          <div className={REGISTRATION_STYLES.fieldContainer}>
            <label htmlFor="contactNumber" className={REGISTRATION_STYLES.label}>
              Contact Number * (Verified)
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                +91
              </span>
              <input
                id="contactNumber"
                name="contactNumber"
                type="text"
                required
                maxLength={10}
                readOnly
                className={`flex-1 ${REGISTRATION_STYLES.input} bg-gray-50 text-gray-600 cursor-not-allowed rounded-l-none`}
                placeholder="Verified contact number"
                value={formData.contactNumber || 
                       (userData?.user_details?.phone_number?.replace(/^\+91/, '')) || ''}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              This is your verified phone number and cannot be changed
            </p>
          </div>

          {/* Business Email - Read Only (Verified) */}
          <div className={REGISTRATION_STYLES.fieldContainer}>
            <label htmlFor="businessEmail" className={REGISTRATION_STYLES.label}>
              Business Email * (Verified)
            </label>
            <input
              id="businessEmail"
              name="businessEmail"
              type="email"
              required
              readOnly
              className={`${REGISTRATION_STYLES.input} bg-gray-50 text-gray-600 cursor-not-allowed`}
              placeholder="Verified email address"
              value={formData.businessEmail || 
                     userData?.user_details?.email || ''}
            />
            <p className="mt-1 text-xs text-gray-500">
              This is your verified email address and cannot be changed
            </p>
          </div>

          {/* Company Name */}
          <div className={REGISTRATION_STYLES.fieldContainer}>
            <label htmlFor="companyName" className={REGISTRATION_STYLES.label}>
              Company Name *
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              required
              className={`${REGISTRATION_STYLES.input} ${error ? 'border-red-500' : ''}`}
              placeholder="Enter your company name"
              value={formData.companyName || ''}
              onChange={handleInputChange}
            />
          </div>

          {/* Company Type */}
          <div className={REGISTRATION_STYLES.fieldContainer}>
            <label htmlFor="companyType" className={REGISTRATION_STYLES.label}>
              Company Type *
            </label>
            <select
              id="companyType"
              name="companyType"
              required
              className={`${REGISTRATION_STYLES.input} ${error ? 'border-red-500' : ''}`}
              value={formData.companyType || ''}
              onChange={handleInputChange}
            >
              <option value="">Select company type</option>
              {companyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Business Address */}
          <div className={REGISTRATION_STYLES.fieldContainer}>
            <label className={REGISTRATION_STYLES.label}>
              Business Address *
            </label>
            
            {/* Address Line 1 */}
            <input
              id="addressLine1"
              name="addressLine1"
              type="text"
              required
              className={`${REGISTRATION_STYLES.input} ${error ? 'border-red-500' : ''} mb-3`}
              placeholder="Address Line 1 *"
              value={formData.addressLine1 || ''}
              onChange={handleInputChange}
            />
            
            {/* Address Line 2 */}
            <input
              id="addressLine2"
              name="addressLine2"
              type="text"
              className={`${REGISTRATION_STYLES.input} ${error ? 'border-red-500' : ''} mb-3`}
              placeholder="Address Line 2 (Optional)"
              value={formData.addressLine2 || ''}
              onChange={handleInputChange}
            />
            
            {/* State and ZIP Code in a row */}
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  id="state"
                  name="state"
                  type="text"
                  required
                  className={`${REGISTRATION_STYLES.input} ${error ? 'border-red-500' : ''}`}
                  placeholder="State *"
                  value={formData.state || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  required
                  maxLength={6}
                  className={`${REGISTRATION_STYLES.input} ${error ? 'border-red-500' : ''}`}
                  placeholder="ZIP Code *"
                  value={formData.zipCode || ''}
                  onChange={handleZipCodeChange}
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-2">
              <p className="text-xs text-red-600">
                {error}
              </p>
            </div>
          )}
        </div>

        <div className={REGISTRATION_STYLES.buttonGroup}>
          <button
            type="button"
            onClick={onBack}
            className={REGISTRATION_STYLES.backButton}
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${REGISTRATION_STYLES.submitButton} ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
}

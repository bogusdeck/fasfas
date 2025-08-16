import { REGISTRATION_STYLES, MESSAGES } from '../../utils/constants';
import { authApi, formatPhoneForAPI, handleApiError } from '../../utils/api';
import { useState } from 'react';

export default function PhoneNumberStep({ formData, handleChange, onSubmit, onBack }) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateIndianPhoneNumber = (phoneNumber) => {
    // Remove any spaces or special characters
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Check if it's exactly 10 digits and starts with 6, 7, 8, or 9
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    return indianPhoneRegex.test(cleanNumber);
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    // Limit to 10 digits
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
    
    // Update the event target value
    e.target.value = value;
    handleChange(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateIndianPhoneNumber(formData.phoneNumber)) {
      setError(MESSAGES.errors.invalidIndianPhone);
      return;
    }

    setIsLoading(true);

    try {
      // Format phone number for API
      const formattedPhone = formatPhoneForAPI(formData.phoneNumber);
      
      // Call the phone OTP request API
      const response = await authApi.requestPhoneOTP(formattedPhone);
      
      console.log('Phone OTP request successful:', response);
      
      // Store the formatted phone number
      handleChange({
        target: { name: 'phoneNumber', value: formData.phoneNumber }
      });
      
      // Proceed to verification step
      onSubmit();
      
    } catch (apiError) {
      console.error('Phone OTP request failed:', apiError);
      const errorMessage = handleApiError(apiError, 'Failed to send OTP. Please try again.');
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={REGISTRATION_STYLES.form} onSubmit={handleSubmit}>
      <div className={REGISTRATION_STYLES.fieldGroup}>
        <div className={REGISTRATION_STYLES.fieldContainer}>
          <label htmlFor="phoneNumber" className={REGISTRATION_STYLES.label}>
            Phone Number
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 py-3 border border-r-0 border-[#241331]/20 bg-[#241331]/5 text-[#241331] text-sm font-bold rounded-l-lg font-itc-gothic">
              +91
            </span>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              required
              minLength={10}
              maxLength={10}
              className={`flex-1 appearance-none relative block px-3 py-3 border ${error ? 'border-red-500' : 'border-[#241331]/20'} placeholder-[#241331]/50 text-[#241331] rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#C3AF6C] focus:border-[#C3AF6C] focus:z-10 sm:text-sm font-itc-gothic transition-all duration-200`}
              placeholder="9876543210"
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
            />
          </div>
          {error && (
            <p className="mt-1 text-xs text-red-600">
              {error}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {MESSAGES.info.phoneNumberHelp}
          </p>
        </div>
      </div>

      <div className={REGISTRATION_STYLES.buttonGroup}>
        <button
          type="submit"
          disabled={isLoading}
          className={`${REGISTRATION_STYLES.submitButton} ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sending OTP...
            </div>
          ) : (
            'Send Verification Code'
          )}
        </button>
      </div>
    </form>
  );
}

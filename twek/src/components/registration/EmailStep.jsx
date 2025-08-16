import { REGISTRATION_STYLES } from '../../utils/constants';
import { authApi, handleApiError } from '../../utils/api';
import { useState } from 'react';

export default function EmailStep({ formData, handleChange, onSubmit, onBack, isPhoneVerified }) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate email before proceeding
    if (!formData.email || !formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Validate that we have the phone number from previous step
    if (!formData.phoneNumber) {
      setError('Phone number is missing. Please go back and verify your phone.');
      return;
    }
    
    // Check if phone is verified before proceeding
    if (!isPhoneVerified) {
      setError('Phone number not verified. Please go back and complete phone verification first.');
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await authApi.requestEmailOTP(formData.email, formData.phoneNumber);
      console.log('Email OTP request successful:', response);
      
      // Proceed to verification step
      setIsLoading(false);
      onSubmit();
    } catch (error) {
      console.error('Failed to request email OTP:', error);
      setIsLoading(false);
      setError(handleApiError(error, 'Failed to send verification code. Please try again.'));
    }
  };

  const handleInputChange = (e) => {
    // Clear error when user starts typing
    if (error) setError('');
    handleChange(e);
  };

  return (
    <form className={REGISTRATION_STYLES.form} onSubmit={handleSubmit}>
      <div className={REGISTRATION_STYLES.fieldGroup}>
        <div className={REGISTRATION_STYLES.fieldContainer}>
          <label htmlFor="email" className={REGISTRATION_STYLES.label}>
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={`${REGISTRATION_STYLES.input} ${error ? 'border-red-500' : ''}`}
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleInputChange}
          />
          {error && (
            <p className="mt-1 text-xs text-red-500 font-itc-gothic">
              {error}
            </p>
          )}
        </div>
      </div>

      <div className={REGISTRATION_STYLES.buttonGroup}>
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className={`${REGISTRATION_STYLES.backButton} ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Back
        </button>
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
              Sending...
            </div>
          ) : (
            'Send Email Verification'
          )}
        </button>
      </div>
    </form>
  );
}

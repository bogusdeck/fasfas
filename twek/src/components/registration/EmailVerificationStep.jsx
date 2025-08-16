import { REGISTRATION_STYLES, MESSAGES } from '../../utils/constants';
import { authApi, handleApiError } from '../../utils/api';
import { useState } from 'react';

export default function EmailVerificationStep({ formData, handleChange, onSubmit, onBack, onResend }) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const validateVerificationCode = (code) => {
    // Check if it's exactly 6 digits
    const codeRegex = /^\d{6}$/;
    return codeRegex.test(code) && code.length === 6;
  };

  const handleCodeChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    // Limit to exactly 6 digits
    if (value.length > 6) {
      value = value.slice(0, 6);
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
    
    if (formData.emailVerificationCode.length !== 6) {
      setError('Please enter exactly 6 digits');
      return;
    }

    if (!validateVerificationCode(formData.emailVerificationCode)) {
      setError('Please enter a valid 6-digit verification code');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await authApi.verifyEmailOTP(
        formData.email, 
        formData.emailVerificationCode
      );
      
      console.log('Email verification successful:', response);
      setIsLoading(false);
      onSubmit(); // Proceed to next step
    } catch (error) {
      console.error('Email verification failed:', error);
      setIsLoading(false);
      setError(handleApiError(error, 'Invalid verification code. Please try again.'));
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError('');
    
    try {
      const response = await authApi.requestEmailOTP(formData.email, formData.phoneNumber);
      console.log('Email OTP resent successfully:', response);
      
      // Clear the verification code
      handleChange({
        target: { name: 'emailVerificationCode', value: '' }
      });
      
      // Call onResend if provided
      if (onResend) {
        onResend();
      }
    } catch (error) {
      console.error('Failed to resend email OTP:', error);
      setError(handleApiError(error, 'Failed to resend verification code. Please try again.'));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <form className={REGISTRATION_STYLES.form} onSubmit={handleSubmit}>
      <div className={REGISTRATION_STYLES.fieldGroup}>
        <div className={REGISTRATION_STYLES.fieldContainer}>
          <label htmlFor="emailVerificationCode" className={REGISTRATION_STYLES.label}>
            Email Verification Code
          </label>
          <input
            id="emailVerificationCode"
            name="emailVerificationCode"
            type="text"
            required
            minLength={6}
            maxLength={6}
            className={`${REGISTRATION_STYLES.codeInput} ${error ? 'border-red-500' : ''}`}
            placeholder="123456"
            value={formData.emailVerificationCode}
            onChange={handleCodeChange}
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
              Verifying...
            </div>
          ) : (
            'Verify Email'
          )}
        </button>
      </div>

      <button
        type="button"
        onClick={handleResend}
        disabled={isResending || isLoading}
        className={`${REGISTRATION_STYLES.resendButton} ${
          isResending || isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isResending ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-[#C3AF6C] mr-2"></div>
            Resending...
          </div>
        ) : (
          'Resend Code'
        )}
      </button>
    </form>
  );
}
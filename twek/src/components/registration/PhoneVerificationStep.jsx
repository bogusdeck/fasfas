import { REGISTRATION_STYLES, MESSAGES } from '../../utils/constants';
import { authApi, formatPhoneForAPI, handleApiError } from '../../utils/api';
import { useState } from 'react';

export default function PhoneVerificationStep({ formData, handleChange, onSubmit, onBack, onResend }) {
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
    setError('');
    
    if (formData.verificationCode.length !== 6) {
      setError('Please enter exactly 6 digits');
      return;
    }
    
    if (!validateVerificationCode(formData.verificationCode)) {
      setError(MESSAGES.errors.invalidVerificationCode);
      return;
    }
    
    setIsLoading(true);

    try {
      // Format phone number for API
      const formattedPhone = formatPhoneForAPI(formData.phoneNumber);
      
      // Call the phone OTP verification API
      const response = await authApi.verifyPhoneOTP(formattedPhone, formData.verificationCode);
      
      console.log('Phone OTP verification successful:', response);
      
      // Proceed to next step
      onSubmit();
      
    } catch (apiError) {
      console.error('Phone OTP verification failed:', apiError);
      const errorMessage = handleApiError(apiError, 'Invalid OTP. Please try again.');
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError('');

    try {
      // Format phone number for API
      const formattedPhone = formatPhoneForAPI(formData.phoneNumber);
      
      // Request new OTP
      const response = await authApi.requestPhoneOTP(formattedPhone);
      
      console.log('OTP resent successfully:', response);
      
      // Clear the current verification code
      handleChange({
        target: { name: 'verificationCode', value: '' }
      });
      
      // Call the original onResend if provided
      if (onResend) {
        onResend();
      }
      
    } catch (apiError) {
      console.error('Resend OTP failed:', apiError);
      const errorMessage = handleApiError(apiError, 'Failed to resend OTP. Please try again.');
      setError(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <form className={REGISTRATION_STYLES.form} onSubmit={handleSubmit}>
      <div className={REGISTRATION_STYLES.fieldGroup}>
        <div className={REGISTRATION_STYLES.fieldContainer}>
          <label htmlFor="verificationCode" className={REGISTRATION_STYLES.label}>
            Verification Code
          </label>
          <input
            id="verificationCode"
            name="verificationCode"
            type="text"
            required
            minLength={6}
            maxLength={6}
            className={`${REGISTRATION_STYLES.codeInput} ${error ? 'border-red-500' : ''}`}
            placeholder="123456"
            value={formData.verificationCode}
            onChange={handleCodeChange}
          />
          {error && (
            <p className="mt-1 text-xs text-red-600">
              {error}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Enter the 6-digit code sent to +91{formData.phoneNumber}
          </p>
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
            'Verify Phone'
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

import { REGISTRATION_STEPS, REGISTRATION_STYLES } from '../../utils/constants';
import { authApi, handleApiError } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

export default function PasswordStep({ formData, handleChange, onSubmit, onBack, isEmailVerified }) {
  const { getAuthToken, setAuthToken } = useAuth();
  const stepData = REGISTRATION_STEPS[5];
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Check if email has been verified
    if (!isEmailVerified) {
      setError('Email verification required. Please go back and complete email verification first.');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // Validate required fields
    if (!formData.firstName?.trim()) {
      setError('First name is required');
      return;
    }

    if (!formData.lastName?.trim()) {
      setError('Last name is required');
      return;
    }

    setIsLoading(true);

    try {
      // Prepare user data for registration
      const userData = {
        phone_number: formData.phoneNumber,
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        password: formData.password,
        email_verified: true  // Include email verification status
      };

      // Call the registration API
      const response = await authApi.register(userData);
      
      console.log('Registration successful:', response);
      
      // Store the token directly from the registration response
      console.log('Registration response structure:', JSON.stringify(response, null, 2));
      
      if (response && response.token) {
        // Check if token is an object with access property
        if (response.token.access) {
          // Format the access token with Bearer prefix
          const accessToken = 'Bearer ' + response.token.access;
          console.log('Saving access token securely:', accessToken.substring(0, 20) + '...');
          setAuthToken(accessToken);
          
          // Save refresh token separately if needed (handled by AuthContext)
          if (response.token.refresh) {
            sessionStorage.setItem('refreshToken', response.token.refresh);
            console.log('Refresh token saved securely');
          }
        } else {
          console.error('Unexpected token structure in registration response:', response.token);
        }
        
        // Double-check token was saved
        const savedToken = getAuthToken();
        if (savedToken) {
          console.log('Token successfully saved securely:', savedToken.substring(0, 20) + '...');
        } else {
          console.error('Failed to save token securely');
        }
      } else {
        console.warn('No token in registration response:', response);
      }
      
      console.log('Authentication completed successfully, moving to brand onboarding');
      
      // Move to brand onboarding steps
      onSubmit();
      
    } catch (apiError) {
      console.error('Registration failed:', apiError);
      const errorMessage = handleApiError(apiError, 'Registration failed. Please try again.');
      setError(errorMessage);
    } finally {
      setIsLoading(false);
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
          <label htmlFor="firstName" className={REGISTRATION_STYLES.label}>
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            className={`${REGISTRATION_STYLES.input} ${error ? 'border-red-500' : ''}`}
            placeholder="Enter your first name"
            value={formData.firstName || ''}
            onChange={handleInputChange}
          />
        </div>
        
        <div className={REGISTRATION_STYLES.fieldContainer}>
          <label htmlFor="lastName" className={REGISTRATION_STYLES.label}>
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className={`${REGISTRATION_STYLES.input} ${error ? 'border-red-500' : ''}`}
            placeholder="Enter your last name"
            value={formData.lastName || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className={REGISTRATION_STYLES.fieldContainer}>
          <label htmlFor="password" className={REGISTRATION_STYLES.label}>
            {stepData.fields.password.label}
          </label>
          <input
            id="password"
            name="password"
            type={stepData.fields.password.type}
            required={stepData.fields.password.required}
            className={`${REGISTRATION_STYLES.input} ${error ? 'border-red-500' : ''}`}
            placeholder={stepData.fields.password.placeholder}
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        
        <div className={REGISTRATION_STYLES.fieldContainer}>
          <label htmlFor="confirmPassword" className={REGISTRATION_STYLES.label}>
            {stepData.fields.confirmPassword.label}
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={stepData.fields.confirmPassword.type}
            required={stepData.fields.confirmPassword.required}
            className={`${REGISTRATION_STYLES.input} ${error ? 'border-red-500' : ''}`}
            placeholder={stepData.fields.confirmPassword.placeholder}
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>

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
          disabled={isLoading}
          className={`${REGISTRATION_STYLES.backButton} ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {stepData.buttons.back}
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
              Creating Account...
            </div>
          ) : (
            stepData.buttons.submit
          )}
        </button>
      </div>
    </form>
  );
}

import { useState } from 'react';
import { ONBOARDING_STEPS, REGISTRATION_STYLES } from '../../utils/constants';
import { useAuth } from '../../contexts/AuthContext';

export default function BusinessPreferencesStep({ formData, handleChange, onSubmit, onBack }) {
  const stepData = ONBOARDING_STEPS[4];
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { saveFormData, getAuthToken, authenticatedFetch } = useAuth();

  // Business preference options
  const businessPreferences = [
    {
      value: 'marketplace_only',
      title: 'Marketplace Only',
      description: 'Sell products exclusively through our marketplace platform',
      features: [
        'Access to marketplace dashboard',
        'Built-in customer base',
        'Marketplace marketing tools',
        'Simplified order management'
      ]
    },
    {
      value: 'marketplace_and_api',
      title: 'Marketplace & API',
      description: 'Sell through marketplace and integrate with your own systems via API',
      features: [
        'All marketplace features',
        'API access for integration',
        'Custom workflow automation',
        'Advanced reporting and analytics',
        'Bulk operations support'
      ]
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!formData.business_preference) {
      setError('Please select a business preference');
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare data for API - trying string format instead of array
      const businessPreferenceData = {
        business_preference: formData.business_preference // Sending as string
      };

      console.log('Raw formData.business_preference:', formData.business_preference);
      console.log('Type of formData.business_preference:', typeof formData.business_preference);
      console.log('Submitting business preference as string:', businessPreferenceData);
      console.log('JSON stringified:', JSON.stringify(businessPreferenceData));

      // Call the business preference API using secure authenticated fetch
      const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/business-preference/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(businessPreferenceData)
      });

      const data = await response.json();
      console.log('Business preference API response:', { status: response.status, data });

      if (response.ok && data.success) {
        console.log('Business preference saved successfully:', data);
        
        // Save the submitted data for future reference
        const savedData = {
          business_preference: formData.business_preference,
          businessPreferenceSaved: true
        };
        saveFormData(savedData);
        
        console.log('Business preferences completed, proceeding to next step');
        onSubmit();
      } else {
        // Handle API errors
        if (response.status === 401) {
          setError('Authentication failed. Please log in again.');
        } else if (response.status === 400) {
          setError(data.message || data.detail || 'Invalid business preference data. Please try again.');
        } else {
          setError(data.message || data.detail || 'Failed to save business preference. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error saving business preference:', error);
      setError('Network error while saving business preference. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreferenceChange = (value) => {
    setError('');
    handleChange({
      target: { name: 'business_preference', value }
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{stepData.title}</h2>
        <p className="text-gray-600">{stepData.subtitle}</p>
      </div>

      <form className={REGISTRATION_STYLES.form} onSubmit={handleSubmit}>
        <div className={REGISTRATION_STYLES.fieldGroup}>
          <div className={REGISTRATION_STYLES.fieldContainer}>
            <label className={REGISTRATION_STYLES.label}>
              Business Preference *
            </label>
            
            <div className="space-y-4 mt-3">
              {businessPreferences.map((preference) => (
                <div
                  key={preference.value}
                  className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                    formData.business_preference === preference.value
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                  onClick={() => handlePreferenceChange(preference.value)}
                >
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id={preference.value}
                        name="business_preference"
                        type="radio"
                        value={preference.value}
                        checked={formData.business_preference === preference.value}
                        onChange={() => handlePreferenceChange(preference.value)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <label
                        htmlFor={preference.value}
                        className="block text-lg font-medium text-gray-900 cursor-pointer"
                      >
                        {preference.title}
                      </label>
                      <p className="text-sm text-gray-600 mt-1">
                        {preference.description}
                      </p>
                      
                      {/* Features List */}
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Features included:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {preference.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Information Box */}
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-medium text-gray-900">Good to know</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    You can upgrade your business preference later from your account settings. 
                    API access includes additional technical setup and may require developer resources.
                  </p>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4">
                <p className="text-sm text-red-600">
                  {error}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className={REGISTRATION_STYLES.buttonGroup}>
          <button
            type="button"
            onClick={onBack}
            className={REGISTRATION_STYLES.backButton}
          >
            {stepData.buttons.back}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${REGISTRATION_STYLES.submitButton} ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Saving...' : stepData.buttons.submit}
          </button>
        </div>
      </form>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { REGISTRATION_STEPS, REGISTRATION_STEP_NAMES, NAVIGATION_CONSTANTS } from '../../utils/constants';
import { PAGE_CONTENT } from '../../utils/content';
import MobileVerification from '../../components/registration/MobileVerification';
import EmailVerification from '../../components/registration/EmailVerification';

export default function Registration() {
  const [currentStep, setCurrentStep] = useState(REGISTRATION_STEPS.MOBILE_VERIFICATION);
  const [formData, setFormData] = useState({
    // Mobile verification
    mobile: '',
    mobileOtp: '',
    isMobileVerified: false,
    
    // Email verification
    email: '',
    emailOtp: '',
    isEmailVerified: false
  });

  const handleNext = () => {
    if (currentStep < REGISTRATION_STEPS.EMAIL_VERIFICATION) {
      setCurrentStep(currentStep + 1);
    } else {
      // Registration complete - redirect or show success
      alert('Registration completed successfully! Both mobile and email verified.');
      console.log('Final registration data:', formData);
    }
  };

  const handleBack = () => {
    if (currentStep > REGISTRATION_STEPS.MOBILE_VERIFICATION) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case REGISTRATION_STEPS.MOBILE_VERIFICATION:
        return (
          <MobileVerification
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        );
      case REGISTRATION_STEPS.EMAIL_VERIFICATION:
        return (
          <EmailVerification
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  const getStepProgress = () => {
    return ((currentStep - 1) / (Object.keys(REGISTRATION_STEPS).length - 1)) * 100;
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {PAGE_CONTENT.REGISTRATION.TITLE.replace('FasFas', NAVIGATION_CONSTANTS.BRAND_NAME)}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {PAGE_CONTENT.REGISTRATION.SUBTITLE}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Step {currentStep} of {Object.keys(REGISTRATION_STEPS).length}
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {REGISTRATION_STEP_NAMES[currentStep]}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getStepProgress()}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {PAGE_CONTENT.REGISTRATION.HAVE_ACCOUNT}{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
              {PAGE_CONTENT.REGISTRATION.SIGN_IN_LINK}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

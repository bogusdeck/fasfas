'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { REGISTRATION_STEPS, ONBOARDING_STEPS, REGISTRATION_PROGRESS, REGISTRATION_STYLES } from '../utils/constants';
import { profileApi } from '../utils/api';
import StepHeader from './registration/StepHeader';
import PhoneNumberStep from './registration/PhoneNumberStep';
import PhoneVerificationStep from './registration/PhoneVerificationStep';
import EmailStep from './registration/EmailStep';
import EmailVerificationStep from './registration/EmailVerificationStep';
import PasswordStep from './registration/PasswordStep';
import GSTVerificationStep from './onboarding/GSTVerificationStep';
import BasicInformationStep from './onboarding/BasicInformationStep';
import SignatureUploadStep from './onboarding/SignatureUploadStep';
import BusinessPreferencesStep from './onboarding/BusinessPreferencesStep';
import WarehouseDetailsStep from './onboarding/WarehouseDetailsStep';
import BrandProductDetailsStep from './onboarding/BrandProductDetailsStep';
import BankingDetailsStep from './onboarding/BankingDetailsStep';
import ReviewSubmitStep from './onboarding/ReviewSubmitStep';
import OnboardingSidebar from './onboarding/OnboardingSidebar';
import AuthDiagnostic from './debug/AuthDiagnostic';

export default function RegistrationForm() {
  const { getAuthToken, authenticatedFetch, formData: authFormData, saveFormData } = useAuth();
  const searchParams = useSearchParams();
  const stepFromUrl = searchParams.get('step');
  const onboardingFromUrl = searchParams.get('onboarding');
  
  const [currentStep, setCurrentStep] = useState(stepFromUrl ? parseInt(stepFromUrl) : 1);
  const [isOnboarding, setIsOnboarding] = useState(onboardingFromUrl === 'true'); // Start with authentication unless specified
  const [isPhoneVerified, setIsPhoneVerified] = useState(false); // Track phone verification status
  const [isEmailVerified, setIsEmailVerified] = useState(false); // Track email verification status
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  
  // Initialize formData from AuthContext if available, otherwise use default values
  const [formData, setFormData] = useState({
    phoneNumber: '',
    verificationCode: '',
    email: '',
    emailVerificationCode: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    gstNumber: '',
    gstBusinessName: '',
    gstTradeName: '',
    gstConstitution: '',
    gstAddress: '',
    gstStatus: '',
    gstRegistrationDate: '',
    ownerName: '',
    contactNumber: '',
    businessEmail: '',
    companyName: '',
    companyType: '',
    businessAddress: '',
    signatureFile: null,
    signatureFileName: '',
    business_preference: '',
    city_warehouses: [{ city_name: '', warehouse_count: 1 }],
    daily_order_volume: '',
    brand_logo: null,
    product_categories: [],
    gender: [],
    target_age_groups: [18, 65],
    price_range: ['', ''],
    product_catalog: null,
    account_holder_name: '',
    account_number: '',
    ifsc_code: '',
    cancelled_cheque: null,
  });

  // Update local formData when AuthContext formData changes
  useEffect(() => {
    if (authFormData) {
      console.log('=== FORM DATA POPULATION DEBUG ===');
      console.log('AuthContext formData received:', authFormData);
      
      const updatedFormData = {
        ...formData,
        ...authFormData,
        // Ensure array fields are properly handled
        city_warehouses: authFormData.cityWarehouses && authFormData.cityWarehouses.length > 0 
          ? authFormData.cityWarehouses 
          : formData.city_warehouses,
        product_categories: authFormData.product_categories || formData.product_categories,
        gender: authFormData.gender || formData.gender,
        target_age_groups: authFormData.target_age_groups || formData.target_age_groups,
        price_range: authFormData.price_range || formData.price_range,
      };
      
      console.log('Updated RegistrationForm formData:', updatedFormData);
      console.log('Key field values:');
      console.log('- gstNumber:', updatedFormData.gstNumber);
      console.log('- ownerName:', updatedFormData.ownerName);
      console.log('- companyName:', updatedFormData.companyName);
      console.log('- companyType:', updatedFormData.companyType);
      console.log('- businessAddress:', updatedFormData.businessAddress);
      console.log('- addressLine1:', updatedFormData.addressLine1);
      console.log('- city_warehouses:', updatedFormData.city_warehouses);
      console.log('=====================================');
      
      setFormData(updatedFormData);
    }
  }, [authFormData]);

  // Check for authentication token and fetch profile status
  useEffect(() => {
    const checkAuthAndStatus = async () => {
      const token = getAuthToken();
      
      if (token) {
        try {
          setIsLoading(true);
          // const statusResponse = await profileApi.getStatus();
          
          // if (statusResponse.success && statusResponse.data?.profile) {
          //   const { profile } = statusResponse.data;
          //   setProfileData(profile);
            
          //   // Set verification status based on profile data
          //   if (profile.status_code && profile.status_code >= 'PHONE_VERIFIED') {
          //     setIsPhoneVerified(true);
          //   }
            
          //   if (profile.status_code && profile.status_code >= 'EMAIL_VERIFIED') {
          //     setIsEmailVerified(true);
          //   }
            
          //   // Update form data with any existing profile data
          //   setFormData(prevData => ({
          //     ...prevData,
          //     ...extractFormDataFromProfile(profile)
          //   }));
            
          //   // Determine where to resume from
          //   if (profile.is_onboarding_complete) {
          //     // If fully completed, redirect to dashboard (this would be handled by the login flow)
          //   } else if (profile.current_step) {
          //     // Resume from where they left off
          //     setCurrentStep(profile.current_step);
          //     setIsOnboarding(profile.status_code && profile.status_code >= 'PASSWORD_SET');
          //   }
          // }
        } catch (error) {
          console.error('Failed to fetch profile status:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    
    checkAuthAndStatus();
  }, []);
  
  // Helper function to extract form data from profile
  // const extractFormDataFromProfile = (profile) => {
  //   const data = {};
    
  //   // Map profile fields to form fields
  //   if (profile.phone_number) data.phoneNumber = profile.phone_number;
  //   if (profile.email) data.email = profile.email;
  //   if (profile.first_name) data.firstName = profile.first_name;
  //   if (profile.last_name) data.lastName = profile.last_name;
    
  //   // Handle onboarding data if available
  //   if (profile.onboarding_data) {
  //     const onboardingData = profile.onboarding_data;
      
  //     // Map GST info
  //     if (onboardingData.gst_number) data.gstNumber = onboardingData.gst_number;
  //     if (onboardingData.gst_business_name) data.gstBusinessName = onboardingData.gst_business_name;
      
  //     // Map other onboarding fields
  //     // Add more mappings as needed for each step
  //   }
    
  //   return data;
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    console.log('📝 RegistrationForm handleChange called:', { name, value, type: typeof value });
    
    const updatedData = {
      ...formData,
      [name]: value
    };
    
    setFormData(updatedData);
    console.log('📋 RegistrationForm formData updated:', { 
      fieldName: name, 
      fieldValue: value instanceof File ? `File: ${value.name}` : value,
      signatureFileExists: !!(updatedData.signatureFile)
    });
    
    // Also save to AuthContext for persistence (but not File objects)
    if (!(value instanceof File)) {
      saveFormData({ [name]: value });
    } else {
      console.log('🗂️ File object detected, not saving to AuthContext:', { name, fileName: value.name });
    }
  };

  const handleNext = () => {
    if (currentStep === 5 && !isOnboarding) {
      // After password step (last auth step), switch to onboarding
      console.log('Authentication completed! Starting brand onboarding...');
      setIsOnboarding(true);
      setCurrentStep(1); // Start with first onboarding step (GST verification)
    } else if (isOnboarding) {
      setCurrentStep(prev => Math.min(prev + 1, 8)); // 8 onboarding steps
    } else {
      setCurrentStep(prev => Math.min(prev + 1, 5)); // 5 authentication steps
    }
  };

  const handleBack = () => {
    if (isOnboarding && currentStep === 1) {
      // Cannot go back from first onboarding step - onboarding has started
      console.log('Cannot go back from first onboarding step');
      return;
    } else if (isOnboarding) {
      // Allow going back within onboarding steps (after step 1)
      setCurrentStep(prev => Math.max(prev - 1, 1));
    } else {
      // Allow going back within authentication steps
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
  };

  const handleSubmit = async () => {
    // If we're submitting from the phone verification step, mark phone as verified
    if (currentStep === 2) {
      setIsPhoneVerified(true);
    }
    // If we're submitting from the email verification step, mark email as verified
    if (currentStep === 4) {
      setIsEmailVerified(true);
    }
    
    // If user is authenticated (has token), update the progress on the server
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   try {
    //     // Update the current step on the server
    //     await profileApi.updateProgress(currentStep, isOnboarding);
        
    //     // Fetch the updated status
    //     const statusResponse = await profileApi.getStatus();
    //     if (statusResponse.success && statusResponse.data?.profile) {
    //       setProfileData(statusResponse.data.profile);
    //     }
    //   } catch (error) {
    //     console.error('Failed to update progress:', error);
    //     // Continue anyway, as this is not critical for the user flow
    //   }
    // }
    
    // Don't call handleNext() for the final step (step 8) in onboarding
    // The OnboardingFlow component will handle the final submission internally
    if (!(isOnboarding && currentStep === 8)) {
      handleNext();
    }
  };

  const handleResend = () => {
    // Resend logic handled in individual step components
  };

  const currentStepData = isOnboarding ? ONBOARDING_STEPS[currentStep] : REGISTRATION_STEPS[currentStep];

  const renderCurrentStep = () => {
    if (isOnboarding) {
      switch (currentStep) {
        case 1:
          return (
            <GSTVerificationStep
              formData={formData}
              handleChange={handleChange}
              onSubmit={handleSubmit}
              onBack={handleBack}
              isFirstOnboardingStep={true}
            />
          );
        case 2:
          return (
            <BasicInformationStep
              formData={formData}
              handleChange={handleChange}
              onSubmit={handleSubmit}
              onBack={handleBack}
            />
          );
        case 3:
          return (
            <SignatureUploadStep
              formData={formData}
              handleChange={handleChange}
              onSubmit={handleSubmit}
              onBack={handleBack}
            />
          );
        case 4:
          return (
            <BusinessPreferencesStep
              formData={formData}
              handleChange={handleChange}
              onSubmit={handleSubmit}
              onBack={handleBack}
            />
          );
        case 5:
          return (
            <BrandProductDetailsStep
              formData={formData}
              handleChange={handleChange}
              onSubmit={handleSubmit}
              onBack={handleBack}
            />
          );
        case 6:
          return (
            <WarehouseDetailsStep
              formData={formData}
              handleChange={handleChange}
              onSubmit={handleSubmit}
              onBack={handleBack}
            />
          );
        case 7:
          return (
            <BankingDetailsStep
              formData={formData}
              handleChange={handleChange}
              onSubmit={handleSubmit}
              onBack={handleBack}
            />
          );
        case 8:
          return (
            <ReviewSubmitStep
              formData={formData}
              handleChange={handleChange}
              onSubmit={handleSubmit}
              onBack={handleBack}
            />
          );
        // TODO: Add other onboarding steps here
        default:
          return (
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">Onboarding Step {currentStep}</h3>
              <p className="text-gray-600 mb-4">This step is coming soon!</p>
              <div className="space-x-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Continue
                </button>
              </div>
            </div>
          );
      }
    }

    // Registration steps
    switch (currentStep) {
      case 1:
        return (
          <PhoneNumberStep
            formData={formData}
            handleChange={handleChange}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <PhoneVerificationStep
            formData={formData}
            handleChange={handleChange}
            onSubmit={handleSubmit}
            onBack={handleBack}
            onResend={handleResend}
          />
        );
      case 3:
        return (
          <EmailStep
            formData={formData}
            handleChange={handleChange}
            onSubmit={handleSubmit}
            onBack={handleBack}
            isPhoneVerified={isPhoneVerified}
          />
        );
      case 4:
        return (
          <EmailVerificationStep
            formData={formData}
            handleChange={handleChange}
            onSubmit={handleSubmit}
            onBack={handleBack}
            onResend={handleResend}
          />
        );
      case 5:
        return (
          <PasswordStep
            formData={formData}
            handleChange={handleChange}
            onSubmit={handleSubmit}
            onBack={handleBack}
            isEmailVerified={isEmailVerified}
          />
        );
      default:
        return null;
    }
  };

  // Display a loading state while checking authentication status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#241331]/5 via-white to-[#C3AF6C]/5 flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-12 border border-[#241331]/10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#241331] mx-auto mb-6"></div>
          <p className="text-lg text-[#241331] font-itc-gothic font-bold">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#241331]/5 via-white to-[#C3AF6C]/5 flex">
      {/* Temporary Auth Diagnostic Tool */}
      {/* <AuthDiagnostic /> */}
      
      {/* Sidebar - show during onboarding */}
      {isOnboarding && <OnboardingSidebar currentStep={currentStep} />}
      
      {/* Main Content */}
      <div className={`flex-1 ${isOnboarding ? 'ml-80' : ''}`}>
        <div className={REGISTRATION_STYLES.container}>
          <div className={REGISTRATION_STYLES.formContainer}>
            {/* Step Header */}
            <StepHeader 
              title={currentStepData?.title || 'Registration'} 
              subtitle={currentStepData?.subtitle || 'Complete your registration'} 
            />

            {/* Progress Indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#241331] font-itc-gothic">
                  {isOnboarding ? 'Brand Onboarding' : 'Authentication'}
                </span>
                <span className="text-sm text-[#241331]/60 font-itc-gothic">
                  Step {currentStep} of {isOnboarding ? 8 : 5}
                </span>
              </div>
              <div className="w-full bg-[#241331]/10 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-[#241331] to-[#C3AF6C] h-3 rounded-full transition-all duration-500 shadow-lg" 
                  style={{ width: `${(currentStep / (isOnboarding ? 8 : 5)) * 100}%` }}
                ></div>
              </div>
              {/* Phase indicator */}
              <div className="mt-3 text-xs text-[#241331]/60 font-itc-gothic">
                {isOnboarding ? 
                  <span><span className="text-[#C3AF6C] font-bold">✓</span> Authentication Complete • <span className="text-[#C3AF6C] font-bold">Brand Setup in Progress</span></span> : 
                  <span className="text-[#241331] font-bold">Authentication in Progress</span>
                }
              </div>
            </div>

            {/* Current Step Component */}
            {renderCurrentStep()}

            {/* Login Link (only on first authentication step) */}
            {currentStep === 1 && !isOnboarding && (
              <div className={REGISTRATION_STYLES.linkContainer}>
                <p className={REGISTRATION_STYLES.linkText}>
                  Already have an account?{' '}
                  <Link href="/login" className={REGISTRATION_STYLES.link}>
                    Sign in
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

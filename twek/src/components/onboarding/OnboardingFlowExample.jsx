import { useState } from 'react';
import ReviewSubmitStep from './ReviewSubmitStep';
import OnboardingStatusStep from './OnboardingStatusStep';

export default function OnboardingFlow({ formData, handleChange, onSubmit, onBack }) {
  const [currentStep, setCurrentStep] = useState('review'); // 'review' or 'status'
  const [submissionData, setSubmissionData] = useState(null);

  const handleFinalSubmission = (responseData) => {
    // Store the submission response data
    setSubmissionData(responseData);
    
    console.log('OnboardingFlow: Final submission successful, moving to status step');
    console.log('Response data:', responseData);
    
    // Move to status step
    setCurrentStep('status');
  };

  const handleBackToReview = () => {
    // Use the parent's onBack function instead of internal state
    onBack();
  };

  const handleGoToDashboard = () => {
    // This should only be called from action buttons in the status page
    // Navigate to dashboard only when user explicitly chooses to
    window.location.href = '/brand/dashboard';
  };

  const handleStartNewApplication = () => {
    // Reset and start new application
    setSubmissionData(null);
    setCurrentStep('review');
    setFormData({});
  };

  // Show status step after successful submission
  if (currentStep === 'status') {
    console.log('OnboardingFlow: Rendering status step with data:', submissionData);
    return (
      <OnboardingStatusStep
        submissionData={submissionData}
        onGoToDashboard={handleGoToDashboard}
        onStartNewApplication={handleStartNewApplication}
      />
    );
  }

  console.log('OnboardingFlow: Rendering review step');
  // Show review step by default
  return (
    <ReviewSubmitStep
      formData={formData}
      handleChange={handleChange}
      onSubmit={handleFinalSubmission}
      onBack={handleBackToReview}
    />
  );
}

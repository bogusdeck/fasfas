import { useState, useEffect } from 'react';
import { REGISTRATION_STYLES } from '../../utils/constants';

export default function OnboardingStatusStep({ 
  submissionData = null, 
  onGoToDashboard = null, 
  onStartNewApplication = null 
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Default data structure if no submission data provided
  const defaultData = {
    success: true,
    message: "Onboarding completed successfully. Your account is now under review.",
    onboarding_id: "ONBOARD-XXXX-XXXX",
    verification_status: {
      code: 1,
      status: "Pending",
      message: "Your brand profile is pending verification by our team."
    }
  };

  const data = submissionData || defaultData;

  // Status configurations based on verification status code
  const getStatusConfig = (verificationStatus) => {
    const code = verificationStatus?.code || 1;
    const status = verificationStatus?.status || 'Pending';

    switch (code) {
      case 0:
        return {
          icon: '❌',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          iconBg: 'bg-red-100',
          statusText: 'Rejected',
          description: 'Application needs revision'
        };
      case 1:
        return {
          icon: '⏳',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          iconBg: 'bg-yellow-100',
          statusText: 'Under Review',
          description: 'Your application is being processed'
        };
      case 2:
        return {
          icon: '✅',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          iconBg: 'bg-green-100',
          statusText: 'Approved',
          description: 'Welcome to the marketplace!'
        };
      default:
        return {
          icon: '📋',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          iconBg: 'bg-blue-100',
          statusText: status || 'Pending',
          description: 'Processing your application'
        };
    }
  };

  const statusConfig = getStatusConfig(data.verification_status);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">Processing your submission...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="text-center mb-8">
        {/* Success Animation */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 animate-pulse">
          <div className="text-4xl">🎉</div>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Submission Successful!
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          {data.message}
        </p>
      </div>

      {/* Main Status Card */}
      <div className="bg-white border-2 border-green-200 rounded-xl shadow-lg p-6 sm:p-8 mb-8">
        {/* Onboarding ID */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-gray-100 rounded-lg px-4 py-2 mb-4">
            <span className="text-sm font-medium text-gray-600 mr-2">Application ID:</span>
            <span className="text-lg font-bold text-gray-900 font-mono">
              {data.onboarding_id}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Keep this ID for your records and future reference
          </p>
        </div>

        {/* Verification Status */}
        <div className={`${statusConfig.bgColor} ${statusConfig.borderColor} border-2 rounded-lg p-6 mb-6`}>
          <div className="flex items-start space-x-4">
            <div className={`${statusConfig.iconBg} rounded-full p-3 flex-shrink-0`}>
              <span className="text-2xl">{statusConfig.icon}</span>
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${statusConfig.textColor} mb-2`}>
                {statusConfig.statusText}
              </h3>
              <p className={`${statusConfig.textColor} text-sm mb-2`}>
                {data.verification_status?.message || statusConfig.description}
              </p>
              <div className="text-xs text-gray-600">
                Status Code: {data.verification_status?.code || 1}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h4>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <p className="font-medium text-gray-900">Application Submitted</p>
                <p className="text-sm text-gray-600">Your onboarding application has been successfully submitted</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <p className="font-medium text-gray-900">Under Review</p>
                <p className="text-sm text-gray-600">Our team is reviewing your documents and information (2-3 business days)</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <p className="font-medium text-gray-500">Approval & Activation</p>
                <p className="text-sm text-gray-500">Once approved, you'll receive access to the brand dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h4 className="text-lg font-semibold text-blue-900 mb-4">📢 Important Information</h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start space-x-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>You will receive email notifications about your application status updates</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>If additional documentation is required, our team will contact you</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Review process typically takes 2-3 business days</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Keep your application ID handy for any support inquiries</span>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {onGoToDashboard && (
          <button
            onClick={onGoToDashboard}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>📊</span>
            <span>Go to Dashboard</span>
          </button>
        )}
        
        <button
          onClick={() => window.location.href = 'mailto:support@yourmarketplace.com'}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>💬</span>
          <span>Contact Support</span>
        </button>
        
        {onStartNewApplication && (
          <button
            onClick={onStartNewApplication}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>🆕</span>
            <span>New Application</span>
          </button>
        )}
      </div>

      {/* Footer Note */}
      <div className="text-center mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Thank you for choosing our marketplace! We're excited to have you as a potential brand partner.
        </p>
      </div>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { BUTTON_TEXT, PAGE_CONTENT } from '../../utils/content';

export default function RegistrationComplete({ formData }) {
  useEffect(() => {
    // Auto-redirect after 10 seconds (optional)
    const timer = setTimeout(() => {
      // You can redirect to dashboard or home page here
      // window.location.href = '/dashboard';
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmitRegistration = async () => {
    try {
      // TODO: Replace with your backend API call to submit complete registration
      // const response = await fetch('/api/complete-registration', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      console.log('Complete registration data:', formData);
      
      // For now, redirect to dashboard (replace with your actual route)
      // window.location.href = '/dashboard';
      alert('Registration completed successfully! This would normally redirect to your dashboard.');
    } catch (error) {
      console.error('Registration submission failed:', error);
      alert('Registration submission failed. Please try again.');
    }
  };

  const registrationSummary = [
    {
      title: 'Personal Information',
      data: [
        { label: 'Name', value: `${formData.firstName} ${formData.lastName}` },
        { label: 'Email', value: formData.email },
        { label: 'Mobile', value: formData.mobile },
        { label: 'Date of Birth', value: formData.dateOfBirth },
        { label: 'Gender', value: formData.gender },
        { label: 'Address', value: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}` }
      ]
    },
    {
      title: 'Business Information',
      data: [
        { label: 'Business Name', value: formData.businessName },
        { label: 'Business Type', value: formData.businessType },
        { label: 'GST Number', value: formData.gstNumber },
        { label: 'PAN Number', value: formData.panNumber },
        { label: 'Business Email', value: formData.businessEmail },
        { label: 'Website', value: formData.businessWebsite || 'Not provided' },
        { label: 'Established Year', value: formData.establishedYear },
        { label: 'Employee Count', value: formData.employeeCount }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Success Header */}
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
          <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Registration Successful!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          {PAGE_CONTENT.REGISTRATION_SUCCESS_MESSAGE}
        </p>
      </div>

      {/* Registration Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Registration Summary
        </h3>
        
        <div className="space-y-6">
          {registrationSummary.map((section, index) => (
            <div key={index}>
              <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3 pb-2 border-b border-gray-200 dark:border-gray-600">
                {section.title}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {section.data.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex flex-col">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          What&apos;s Next?
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div>
              <p className="text-blue-800 dark:text-blue-200 font-medium">Account Verification</p>
              <p className="text-blue-600 dark:text-blue-300 text-sm">
                Our team will verify your business documents within 24-48 hours.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div>
              <p className="text-blue-800 dark:text-blue-200 font-medium">Dashboard Access</p>
              <p className="text-blue-600 dark:text-blue-300 text-sm">
                Once verified, you&apos;ll get access to your brand dashboard to manage products and orders.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div>
              <p className="text-blue-800 dark:text-blue-200 font-medium">Start Selling</p>
              <p className="text-blue-600 dark:text-blue-300 text-sm">
                Add your products, set up your store, and start selling on FasFas marketplace.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Need Help?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Email Support</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">support@fasfas.com</p>
          </div>
          
          <div className="text-center">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Phone Support</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">+91 9876543210</p>
          </div>
          
          <div className="text-center">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Live Chat</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Available 24/7</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleSubmitRegistration}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          {BUTTON_TEXT.COMPLETE_REGISTRATION}
        </button>
        
        <button
          onClick={() => window.print()}
          className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Print Summary
        </button>
      </div>

      {/* Auto-redirect Notice */}
      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          You will be automatically redirected to your dashboard in a few minutes, or you can click the complete registration button above.
        </p>
      </div>
    </div>
  );
}

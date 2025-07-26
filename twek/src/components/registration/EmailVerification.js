'use client';

import { useState, useEffect } from 'react';
import { FORM_LABELS, FORM_PLACEHOLDERS, BUTTON_TEXT } from '../../utils/content';
import { emailOtpAPI } from '../../utils/api';

export default function EmailVerification({ formData, updateFormData, onNext, onBack }) {
  const [email, setEmail] = useState(formData.email || '');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(timer => timer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOtp = async () => {
    if (!email || !isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const data = await emailOtpAPI.sendOTP(email, formData.mobile);
      
      if (data.success) {
        setIsOtpSent(true);
        setSuccess(data.message || `OTP sent to ${email}`);
        setResendTimer(60);
        updateFormData({ email });
      } else {
        // API returned success: false
        setError(data.message || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email OTP:', error);
      
      // Handle specific error cases
      if (error.status === 400) {
        if (error.message && error.message.includes('duplicate key')) {
          setError('This email is already registered. Please login instead.');
        } else {
          setError('Invalid email or request. Please check and try again.');
        }
      } else if (error.status === 429) {
        setError('Too many requests. Please wait a moment and try again.');
      } else if (error.status === 404) {
        setError('Service not available. Please try again later.');
      } else {
        // Network error or other exceptions
        setError('Failed to send OTP. Please check your email and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const data = await emailOtpAPI.verifyOTP(email, formData.mobile, otp);
      
      console.log('Email verification result:', data);
      
      if (data.success) {
        setSuccess(data.message || 'Email verified successfully!');
        updateFormData({ 
          email, 
          emailOtp: otp, 
          isEmailVerified: true,
          userId: data.user_id,
          isNewUser: data.is_new_user
        });
        
        // Log verification result for debugging
        console.log('Email verification successful:', {
          isNewUser: data.is_new_user,
          userId: data.user_id,
          message: data.message
        });
        
        // Show success message for longer and then proceed
        setTimeout(() => {
          onNext();
        }, 2000);
      } else {
        // OTP verification failed
        setError(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying email OTP:', error);
      // Network error or other exceptions
      setError('Failed to verify OTP. Please check your code and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer === 0) {
      setOtp('');
      setError('');
      setSuccess('');
      setIsLoading(true);
      
      try {
        const data = await emailOtpAPI.sendOTP(email, formData.mobile);
        
        if (data.success) {
          setSuccess(data.message || 'OTP resent successfully!');
          setResendTimer(60);
        } else {
          setError(data.message || 'Failed to resend OTP. Please try again.');
        }
      } catch (error) {
        console.error('Error resending email OTP:', error);
        setError('Failed to resend OTP. Please check your connection and try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Verify Your Email
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          We&apos;ll send you a verification code to confirm your email address
        </p>
      </div>

      {/* Email Input */}
      {!isOtpSent && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {FORM_LABELS.EMAIL}
            </label>
            <div className="flex space-x-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                placeholder={FORM_PLACEHOLDERS.EMAIL}
              />
              <button
                onClick={handleSendOtp}
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : BUTTON_TEXT.SEND_OTP}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Input */}
      {isOtpSent && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {FORM_LABELS.OTP}
            </label>
            <div className="flex space-x-3">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="flex-1 px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 text-center text-lg tracking-widest"
                placeholder={FORM_PLACEHOLDERS.OTP}
                maxLength={6}
              />
              <button
                onClick={handleVerifyOtp}
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Verifying...' : BUTTON_TEXT.VERIFY}
              </button>
            </div>
          </div>

          {/* Resend OTP */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Didn&apos;t receive the code?{' '}
              {resendTimer > 0 ? (
                <span className="text-gray-500">
                  Resend in {resendTimer} seconds
                </span>
              ) : (
                <button
                  onClick={handleResendOtp}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  {BUTTON_TEXT.RESEND}
                </button>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          {BUTTON_TEXT.BACK}
        </button>
        
        {/* This space is intentionally left for the automatic next step after verification */}
        <div></div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                {success}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800 dark:text-red-200">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

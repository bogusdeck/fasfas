'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LOGIN_CONTENT, AUTH_STYLES } from '../utils/constants.js';
import { useAuth } from '../hooks/useAuth';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const { isLoading, isAuthenticated, userData, login, redirectToDashboardOrRegistration } = useAuth();

  // Handle redirect after authentication - now redirects to review step for completed onboarding
  useEffect(() => {
    if (isAuthenticated && userData) {
      redirectToDashboardOrRegistration();
    }
  }, [isAuthenticated, userData, redirectToDashboardOrRegistration]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }
    
    setLoginLoading(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (!result.success) {
        // Check if the error message indicates a non-existent user or invalid credentials
        if (result.error?.toLowerCase().includes('user not found') || 
            result.error?.toLowerCase().includes('email not registered') ||
            result.error?.toLowerCase().includes('user does not exist')) {
          // Show a special error with a signup link
          setError(
            <div>
              <span>This email is not registered. </span>
              <Link href="/signup" className="text-[#C3AF6C] hover:text-[#241331] underline font-bold transition-colors duration-200">
                Sign up instead?
              </Link>
            </div>
          );
        } else {
          // Handle other types of errors (like incorrect password)
          setError(result.error || 'Login failed. Please check your credentials.');
        }
      }
      // If login successful, the useAuth hook will handle redirection
      
    } catch (loginError) {
      console.error('Login error:', loginError);
      setError('Network error. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Display loading indicator while checking auth status
  if (isLoading) {
    return (
      <div className={AUTH_STYLES.container}>
        <div className={AUTH_STYLES.formContainer}>
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#241331] mb-6"></div>
            <p className="text-[#241331] font-itc-gothic font-bold">Checking your login status...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={AUTH_STYLES.container}>
      <div className={AUTH_STYLES.formContainer}>
        <div className={AUTH_STYLES.header}>
          <h2 className={AUTH_STYLES.title}>
            {LOGIN_CONTENT.title}
          </h2>
          <p className={AUTH_STYLES.subtitle}>
            {LOGIN_CONTENT.subtitle}
          </p>
        </div>
        
        <form className={AUTH_STYLES.form} onSubmit={handleSubmit}>
          <div className={AUTH_STYLES.fieldGroup}>
            <div className={AUTH_STYLES.fieldContainer}>
              <label htmlFor="email" className={AUTH_STYLES.label}>
                {LOGIN_CONTENT.fields.email.label}
              </label>
              <input
                id="email"
                name="email"
                type={LOGIN_CONTENT.fields.email.type}
                required={LOGIN_CONTENT.fields.email.required}
                className={`${AUTH_STYLES.input} ${error ? 'border-red-500' : ''}`}
                placeholder={LOGIN_CONTENT.fields.email.placeholder}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className={AUTH_STYLES.fieldContainer}>
              <label htmlFor="password" className={AUTH_STYLES.label}>
                {LOGIN_CONTENT.fields.password.label}
              </label>
              <input
                id="password"
                name="password"
                type={LOGIN_CONTENT.fields.password.type}
                required={LOGIN_CONTENT.fields.password.required}
                className={`${AUTH_STYLES.input} ${error ? 'border-red-500' : ''}`}
                placeholder={LOGIN_CONTENT.fields.password.placeholder}
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            
            {error && (
              <div className="mt-2">
                <div className="text-xs text-red-500 font-itc-gothic">
                  {error}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Link href="/forgot-password" className={AUTH_STYLES.forgotPassword}>
              {LOGIN_CONTENT.buttons.forgotPassword}
            </Link>
          </div>

          <div>
            <button
              type="submit"
              disabled={loginLoading}
              className={`${AUTH_STYLES.submitButton} ${
                loginLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loginLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                LOGIN_CONTENT.buttons.submit
              )}
            </button>
          </div>

          <div className={AUTH_STYLES.linkContainer}>
            <p className={AUTH_STYLES.linkText}>
              {LOGIN_CONTENT.links.signup.text}{' '}
              <Link href={LOGIN_CONTENT.links.signup.href} className={AUTH_STYLES.link}>
                {LOGIN_CONTENT.links.signup.linkText}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

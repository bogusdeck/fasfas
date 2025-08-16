'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SIGNUP_CONTENT, AUTH_STYLES } from '../utils/constants.js';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic password confirmation validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // Handle signup logic here
    console.log('Signup form submitted:', formData);
  };

  return (
    <div className={AUTH_STYLES.container}>
      <div className={AUTH_STYLES.formContainer}>
        <div className={AUTH_STYLES.header}>
          <h2 className={AUTH_STYLES.title}>
            {SIGNUP_CONTENT.title}
          </h2>
          <p className={AUTH_STYLES.subtitle}>
            {SIGNUP_CONTENT.subtitle}
          </p>
        </div>
        
        <form className={AUTH_STYLES.form} onSubmit={handleSubmit}>
          <div className={AUTH_STYLES.fieldGroup}>
            <div className="grid grid-cols-2 gap-4">
              <div className={AUTH_STYLES.fieldContainer}>
                <label htmlFor="firstName" className={AUTH_STYLES.label}>
                  {SIGNUP_CONTENT.fields.firstName.label}
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type={SIGNUP_CONTENT.fields.firstName.type}
                  required={SIGNUP_CONTENT.fields.firstName.required}
                  className={AUTH_STYLES.input}
                  placeholder={SIGNUP_CONTENT.fields.firstName.placeholder}
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              
              <div className={AUTH_STYLES.fieldContainer}>
                <label htmlFor="lastName" className={AUTH_STYLES.label}>
                  {SIGNUP_CONTENT.fields.lastName.label}
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type={SIGNUP_CONTENT.fields.lastName.type}
                  required={SIGNUP_CONTENT.fields.lastName.required}
                  className={AUTH_STYLES.input}
                  placeholder={SIGNUP_CONTENT.fields.lastName.placeholder}
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className={AUTH_STYLES.fieldContainer}>
              <label htmlFor="email" className={AUTH_STYLES.label}>
                {SIGNUP_CONTENT.fields.email.label}
              </label>
              <input
                id="email"
                name="email"
                type={SIGNUP_CONTENT.fields.email.type}
                required={SIGNUP_CONTENT.fields.email.required}
                className={AUTH_STYLES.input}
                placeholder={SIGNUP_CONTENT.fields.email.placeholder}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className={AUTH_STYLES.fieldContainer}>
              <label htmlFor="password" className={AUTH_STYLES.label}>
                {SIGNUP_CONTENT.fields.password.label}
              </label>
              <input
                id="password"
                name="password"
                type={SIGNUP_CONTENT.fields.password.type}
                required={SIGNUP_CONTENT.fields.password.required}
                className={AUTH_STYLES.input}
                placeholder={SIGNUP_CONTENT.fields.password.placeholder}
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            
            <div className={AUTH_STYLES.fieldContainer}>
              <label htmlFor="confirmPassword" className={AUTH_STYLES.label}>
                {SIGNUP_CONTENT.fields.confirmPassword.label}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={SIGNUP_CONTENT.fields.confirmPassword.type}
                required={SIGNUP_CONTENT.fields.confirmPassword.required}
                className={AUTH_STYLES.input}
                placeholder={SIGNUP_CONTENT.fields.confirmPassword.placeholder}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={AUTH_STYLES.submitButton}
            >
              {SIGNUP_CONTENT.buttons.submit}
            </button>
          </div>

          <div className={AUTH_STYLES.linkContainer}>
            <p className={AUTH_STYLES.linkText}>
              {SIGNUP_CONTENT.links.login.text}{' '}
              <Link href={SIGNUP_CONTENT.links.login.href} className={AUTH_STYLES.link}>
                {SIGNUP_CONTENT.links.login.linkText}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { FORM_LABELS, FORM_PLACEHOLDERS, BUTTON_TEXT } from '../../utils/content';

export default function BasicInfo({ formData, updateFormData, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    firstName: formData.firstName || '',
    lastName: formData.lastName || '',
    dateOfBirth: formData.dateOfBirth || '',
    gender: formData.gender || '',
    address: formData.address || '',
    city: formData.city || '',
    state: formData.state || '',
    pincode: formData.pincode || '',
    aadharNumber: formData.aadharNumber || ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!localData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (localData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last Name validation
    if (!localData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (localData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Date of Birth validation
    if (!localData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const today = new Date();
      const birthDate = new Date(localData.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      if (age < 18) {
        newErrors.dateOfBirth = 'You must be at least 18 years old';
      }
    }

    // Gender validation
    if (!localData.gender) {
      newErrors.gender = 'Gender is required';
    }

    // Address validation
    if (!localData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (localData.address.trim().length < 10) {
      newErrors.address = 'Address must be at least 10 characters';
    }

    // City validation
    if (!localData.city.trim()) {
      newErrors.city = 'City is required';
    }

    // State validation
    if (!localData.state.trim()) {
      newErrors.state = 'State is required';
    }

    // Pincode validation
    if (!localData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(localData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    // Aadhar validation
    if (!localData.aadharNumber.trim()) {
      newErrors.aadharNumber = 'Aadhar number is required';
    } else if (!/^\d{12}$/.test(localData.aadharNumber.replace(/\s/g, ''))) {
      newErrors.aadharNumber = 'Aadhar number must be 12 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAadharChange = (value) => {
    // Format Aadhar number with spaces (XXXX XXXX XXXX)
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 12) {
      const formatted = cleaned.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3').trim();
      handleInputChange('aadharNumber', formatted);
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      updateFormData(localData);
      onNext();
    }
  };

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Basic Information
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Please provide your personal details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {FORM_LABELS.FIRST_NAME} *
          </label>
          <input
            type="text"
            value={localData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
              errors.firstName ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder={FORM_PLACEHOLDERS.FIRST_NAME}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {FORM_LABELS.LAST_NAME} *
          </label>
          <input
            type="text"
            value={localData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
              errors.lastName ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder={FORM_PLACEHOLDERS.LAST_NAME}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {FORM_LABELS.DATE_OF_BIRTH} *
          </label>
          <input
            type="date"
            value={localData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
              errors.dateOfBirth ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.dateOfBirth}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {FORM_LABELS.GENDER} *
          </label>
          <select
            value={localData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
              errors.gender ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.gender}</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {FORM_LABELS.ADDRESS} *
        </label>
        <textarea
          value={localData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          rows={3}
          className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 resize-none ${
            errors.address ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder={FORM_PLACEHOLDERS.ADDRESS}
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.address}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {FORM_LABELS.CITY} *
          </label>
          <input
            type="text"
            value={localData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
              errors.city ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder={FORM_PLACEHOLDERS.CITY}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.city}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {FORM_LABELS.STATE} *
          </label>
          <select
            value={localData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
              errors.state ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <option value="">Select State</option>
            {indianStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {errors.state && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.state}</p>
          )}
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {FORM_LABELS.PINCODE} *
          </label>
          <input
            type="text"
            value={localData.pincode}
            onChange={(e) => handleInputChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
              errors.pincode ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder={FORM_PLACEHOLDERS.PINCODE}
            maxLength={6}
          />
          {errors.pincode && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.pincode}</p>
          )}
        </div>
      </div>

      {/* Aadhar Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {FORM_LABELS.AADHAR_NUMBER} *
        </label>
        <input
          type="text"
          value={localData.aadharNumber}
          onChange={(e) => handleAadharChange(e.target.value)}
          className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
            errors.aadharNumber ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder={FORM_PLACEHOLDERS.AADHAR_NUMBER}
          maxLength={14} // 12 digits + 2 spaces
        />
        {errors.aadharNumber && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.aadharNumber}</p>
        )}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Your Aadhar number is encrypted and stored securely
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          {BUTTON_TEXT.BACK}
        </button>
        
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
        >
          {BUTTON_TEXT.NEXT}
        </button>
      </div>
    </div>
  );
}

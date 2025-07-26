'use client';

import { useState } from 'react';
import { FORM_LABELS, FORM_PLACEHOLDERS, BUTTON_TEXT } from '../../utils/content';
import { BUSINESS_TYPES } from '../../utils/data';

export default function BusinessInfo({ formData, updateFormData, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    businessName: formData.businessName || '',
    businessType: formData.businessType || '',
    gstNumber: formData.gstNumber || '',
    panNumber: formData.panNumber || '',
    businessAddress: formData.businessAddress || '',
    businessCity: formData.businessCity || '',
    businessState: formData.businessState || '',
    businessPincode: formData.businessPincode || '',
    businessEmail: formData.businessEmail || '',
    businessWebsite: formData.businessWebsite || '',
    businessDescription: formData.businessDescription || '',
    establishedYear: formData.establishedYear || '',
    employeeCount: formData.employeeCount || ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Business Name validation
    if (!localData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    } else if (localData.businessName.trim().length < 2) {
      newErrors.businessName = 'Business name must be at least 2 characters';
    }

    // Business Type validation
    if (!localData.businessType) {
      newErrors.businessType = 'Business type is required';
    }

    // GST Number validation
    if (!localData.gstNumber.trim()) {
      newErrors.gstNumber = 'GST number is required';
    } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(localData.gstNumber)) {
      newErrors.gstNumber = 'Invalid GST number format';
    }

    // PAN Number validation
    if (!localData.panNumber.trim()) {
      newErrors.panNumber = 'PAN number is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(localData.panNumber)) {
      newErrors.panNumber = 'Invalid PAN number format';
    }

    // Business Address validation
    if (!localData.businessAddress.trim()) {
      newErrors.businessAddress = 'Business address is required';
    } else if (localData.businessAddress.trim().length < 10) {
      newErrors.businessAddress = 'Business address must be at least 10 characters';
    }

    // Business City validation
    if (!localData.businessCity.trim()) {
      newErrors.businessCity = 'Business city is required';
    }

    // Business State validation
    if (!localData.businessState.trim()) {
      newErrors.businessState = 'Business state is required';
    }

    // Business Pincode validation
    if (!localData.businessPincode.trim()) {
      newErrors.businessPincode = 'Business pincode is required';
    } else if (!/^\d{6}$/.test(localData.businessPincode)) {
      newErrors.businessPincode = 'Pincode must be 6 digits';
    }

    // Business Email validation
    if (!localData.businessEmail.trim()) {
      newErrors.businessEmail = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localData.businessEmail)) {
      newErrors.businessEmail = 'Invalid email format';
    }

    // Website validation (optional but if provided, should be valid)
    if (localData.businessWebsite.trim() && !/^https?:\/\/.+\..+/.test(localData.businessWebsite)) {
      newErrors.businessWebsite = 'Invalid website URL format';
    }

    // Business Description validation
    if (!localData.businessDescription.trim()) {
      newErrors.businessDescription = 'Business description is required';
    } else if (localData.businessDescription.trim().length < 20) {
      newErrors.businessDescription = 'Business description must be at least 20 characters';
    }

    // Established Year validation
    if (!localData.establishedYear) {
      newErrors.establishedYear = 'Established year is required';
    } else {
      const currentYear = new Date().getFullYear();
      const year = parseInt(localData.establishedYear);
      if (year < 1900 || year > currentYear) {
        newErrors.establishedYear = `Year must be between 1900 and ${currentYear}`;
      }
    }

    // Employee Count validation
    if (!localData.employeeCount) {
      newErrors.employeeCount = 'Employee count is required';
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

  const handleGSTChange = (value) => {
    const upperValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (upperValue.length <= 15) {
      handleInputChange('gstNumber', upperValue);
    }
  };

  const handlePANChange = (value) => {
    const upperValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (upperValue.length <= 10) {
      handleInputChange('panNumber', upperValue);
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

  const employeeRanges = [
    '1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Business Information
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Tell us about your business to complete the registration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {FORM_LABELS.BUSINESS_NAME} *
          </label>
          <input
            type="text"
            value={localData.businessName}
            onChange={(e) => handleInputChange('businessName', e.target.value)}
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
              errors.businessName ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder={FORM_PLACEHOLDERS.BUSINESS_NAME}
          />
          {errors.businessName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.businessName}</p>
          )}
        </div>

        {/* Business Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {FORM_LABELS.BUSINESS_TYPE} *
          </label>
          <select
            value={localData.businessType}
            onChange={(e) => handleInputChange('businessType', e.target.value)}
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
              errors.businessType ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <option value="">Select Business Type</option>
            {BUSINESS_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          {errors.businessType && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.businessType}</p>
          )}
        </div>

        {/* GST Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {FORM_LABELS.GST_NUMBER} *
          </label>
          <input
            type="text"
            value={localData.gstNumber}
            onChange={(e) => handleGSTChange(e.target.value)}
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
              errors.gstNumber ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder={FORM_PLACEHOLDERS.GST_NUMBER}
            maxLength={15}
          />
          {errors.gstNumber && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.gstNumber}</p>
          )}
        </div>

        {/* PAN Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {FORM_LABELS.PAN_NUMBER} *
          </label>
          <input
            type="text"
            value={localData.panNumber}
            onChange={(e) => handlePANChange(e.target.value)}
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
              errors.panNumber ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder={FORM_PLACEHOLDERS.PAN_NUMBER}
            maxLength={10}
          />
          {errors.panNumber && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.panNumber}</p>
          )}
        </div>
      </div>

      {/* Business Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {FORM_LABELS.BUSINESS_ADDRESS} *
        </label>
        <textarea
          value={localData.businessAddress}
          onChange={(e) => handleInputChange('businessAddress', e.target.value)}
          rows={3}
          className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 resize-none ${
            errors.businessAddress ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder={FORM_PLACEHOLDERS.BUSINESS_ADDRESS}
        />
        {errors.businessAddress && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.businessAddress}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Business City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {FORM_LABELS.BUSINESS_CITY} *
          </label>
          <input
            type="text"
            value={localData.businessCity}
            onChange={(e) => handleInputChange('businessCity', e.target.value)}
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
              errors.businessCity ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder={FORM_PLACEHOLDERS.BUSINESS_CITY}
          />
          {errors.businessCity && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.businessCity}</p>
          )}
        </div>

        {/* Business State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {FORM_LABELS.BUSINESS_STATE} *
          </label>
          <select
            value={localData.businessState}
            onChange={(e) => handleInputChange('businessState', e.target.value)}
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
              errors.businessState ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <option value="">Select State</option>
            {indianStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {errors.businessState && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.businessState}</p>
          )}
        </div>

        {/* Business Pincode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {FORM_LABELS.BUSINESS_PINCODE} *
          </label>
          <input
            type="text"
            value={localData.businessPincode}
            onChange={(e) => handleInputChange('businessPincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
              errors.businessPincode ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder={FORM_PLACEHOLDERS.BUSINESS_PINCODE}
            maxLength={6}
          />
          {errors.businessPincode && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.businessPincode}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {FORM_LABELS.BUSINESS_EMAIL} *
          </label>
          <input
            type="email"
            value={localData.businessEmail}
            onChange={(e) => handleInputChange('businessEmail', e.target.value)}
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
              errors.businessEmail ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder={FORM_PLACEHOLDERS.BUSINESS_EMAIL}
          />
          {errors.businessEmail && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.businessEmail}</p>
          )}
        </div>

        {/* Business Website */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {FORM_LABELS.BUSINESS_WEBSITE}
          </label>
          <input
            type="url"
            value={localData.businessWebsite}
            onChange={(e) => handleInputChange('businessWebsite', e.target.value)}
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
              errors.businessWebsite ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder={FORM_PLACEHOLDERS.BUSINESS_WEBSITE}
          />
          {errors.businessWebsite && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.businessWebsite}</p>
          )}
        </div>

        {/* Established Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {FORM_LABELS.ESTABLISHED_YEAR} *
          </label>
          <select
            value={localData.establishedYear}
            onChange={(e) => handleInputChange('establishedYear', e.target.value)}
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
              errors.establishedYear ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <option value="">Select Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {errors.establishedYear && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.establishedYear}</p>
          )}
        </div>

        {/* Employee Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {FORM_LABELS.EMPLOYEE_COUNT} *
          </label>
          <select
            value={localData.employeeCount}
            onChange={(e) => handleInputChange('employeeCount', e.target.value)}
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
              errors.employeeCount ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <option value="">Select Range</option>
            {employeeRanges.map(range => (
              <option key={range} value={range}>{range} employees</option>
            ))}
          </select>
          {errors.employeeCount && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.employeeCount}</p>
          )}
        </div>
      </div>

      {/* Business Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {FORM_LABELS.BUSINESS_DESCRIPTION} *
        </label>
        <textarea
          value={localData.businessDescription}
          onChange={(e) => handleInputChange('businessDescription', e.target.value)}
          rows={4}
          className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 resize-none ${
            errors.businessDescription ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder={FORM_PLACEHOLDERS.BUSINESS_DESCRIPTION}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.businessDescription ? (
            <p className="text-sm text-red-600 dark:text-red-400">{errors.businessDescription}</p>
          ) : (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Describe your business, products, and services
            </p>
          )}
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {localData.businessDescription.length}/500
          </span>
        </div>
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

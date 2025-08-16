import { useState, useRef } from 'react';
import { ONBOARDING_STEPS, REGISTRATION_STYLES } from '../../utils/constants';
import { useAuth } from '../../contexts/AuthContext';

export default function BankingDetailsStep({ formData, handleChange, onSubmit, onBack }) {
  const stepData = ONBOARDING_STEPS[7];
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chequePreview, setChequePreview] = useState(null);
  const chequeInputRef = useRef(null);
  const { saveFormData, getAuthToken, authenticatedFetch } = useAuth();

  // New states for micro deposit verification
  const [bankDetailsSubmitted, setBankDetailsSubmitted] = useState(false);
  const [bankReferenceId, setBankReferenceId] = useState('');
  const [microDepositAmount, setMicroDepositAmount] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const validateIFSC = (ifscCode) => {
    // IFSC code format: First 4 characters are alphabets, 5th character is 0, last 6 characters are alphanumeric
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    return ifscRegex.test(ifscCode.toUpperCase());
  };

  const validateAccountNumber = (accountNumber) => {
    // Account number should be between 1-18 digits
    const cleanNumber = accountNumber.replace(/\D/g, '');
    return cleanNumber.length >= 1 && cleanNumber.length <= 18;
  };

  const validateFile = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];

    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a PNG, JPEG, JPG, or PDF file for cancelled cheque');
      return false;
    }

    if (file.size > maxSize) {
      setError('Cancelled cheque file size should be less than 5MB');
      return false;
    }

    return true;
  };

  const handleFileUpload = (file) => {
    if (validateFile(file)) {
      setError('');
      
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setChequePreview({ type: 'image', src: e.target.result, name: file.name });
        };
        reader.readAsDataURL(file);
      } else {
        setChequePreview({ type: 'pdf', name: file.name, size: file.size });
      }

      handleChange({
        target: { name: 'cancelled_cheque', value: file }
      });
    }
  };

  const handleRemoveFile = () => {
    setChequePreview(null);
    setError('');
    handleChange({
      target: { name: 'cancelled_cheque', value: null }
    });
    if (chequeInputRef.current) {
      chequeInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validation
    if (!formData.account_holder_name?.trim()) {
      setError('Account holder name is required');
      setIsSubmitting(false);
      return;
    }

    if (formData.account_holder_name.length > 100) {
      setError('Account holder name must be less than 100 characters');
      setIsSubmitting(false);
      return;
    }

    if (!formData.account_number?.trim()) {
      setError('Account number is required');
      setIsSubmitting(false);
      return;
    }

    if (!validateAccountNumber(formData.account_number)) {
      setError('Please enter a valid account number (1-18 digits)');
      setIsSubmitting(false);
      return;
    }

    if (!formData.ifsc_code?.trim()) {
      setError('IFSC code is required');
      setIsSubmitting(false);
      return;
    }

    if (!validateIFSC(formData.ifsc_code)) {
      setError('Please enter a valid IFSC code (e.g., SBIN0001234)');
      setIsSubmitting(false);
      return;
    }

    if (!formData.cancelled_cheque) {
      setError('Please upload a cancelled cheque');
      setIsSubmitting(false);
      return;
    }

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('account_holder_name', formData.account_holder_name.trim());
      formDataToSend.append('account_number', formData.account_number.trim());
      formDataToSend.append('ifsc_code', formData.ifsc_code.trim().toUpperCase());
      formDataToSend.append('cancelled_cheque', formData.cancelled_cheque);

      console.log('Submitting bank details...');
      
      // Debug: Log FormData contents
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }

      // Call the bank details API using secure authenticated fetch
      const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/bank-details/', {
        method: 'POST',
        headers: {
          // Don't set Content-Type for FormData, let browser set it with boundary
        },
        body: formDataToSend
      });

      const data = await response.json();
      console.log('Bank details API response:', { status: response.status, data });

      if (response.ok && data.success) {
        console.log('Bank details saved successfully:', data);
        
        // Extract bank reference ID from API response
        const referenceId = data.bank_reference_id || data.reference_id || '';
        setBankReferenceId(referenceId);
        
        // Save the bank data for future reference
        const savedData = {
          account_holder_name: formData.account_holder_name.trim(),
          account_number: formData.account_number.trim(),
          ifsc_code: formData.ifsc_code.trim().toUpperCase(),
          cancelled_cheque_uploaded: true,
          bankDetailsCompleted: true,
          bank_reference_id: referenceId
        };
        saveFormData(savedData);
        
        // Show micro deposit verification section
        setBankDetailsSubmitted(true);
        setError('');
        console.log('Bank details submitted. Awaiting micro deposit verification.');
      } else {
        // Handle API errors
        if (response.status === 401) {
          setError('Authentication failed. Please log in again.');
        } else if (response.status === 400) {
          setError(data.message || data.detail || 'Invalid bank details. Please check your input.');
        } else if (response.status === 403) {
          setError('Email or phone not verified. Please complete verification first.');
        } else if (response.status === 404) {
          setError('Brand profile not found. Please complete previous steps.');
        } else if (response.status === 413) {
          setError('File size too large. Please reduce file size and try again.');
        } else {
          setError(data.message || data.detail || 'Failed to save bank details. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error saving bank details:', error);
      setError('Network error while saving bank details. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMicroDepositVerification = async (e) => {
    e.preventDefault();
    setError('');
    setIsVerifying(true);

    // Validation for micro deposit fields
    if (!microDepositAmount.trim()) {
      setError('Please enter the micro deposit amount');
      setIsVerifying(false);
      return;
    }

    if (!bankReferenceId) {
      setError('Bank reference ID not found. Please contact support.');
      setIsVerifying(false);
      return;
    }

    // Validate amount format (should be a valid decimal number)
    const amount = parseFloat(microDepositAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid deposit amount');
      setIsVerifying(false);
      return;
    }

    try {
      // Prepare verification data
      const verificationData = {
        amount_received: parseFloat(microDepositAmount),
        bank_reference_id: bankReferenceId
      };

      console.log('Submitting micro deposit verification:', verificationData);

      // Call the micro deposit verification API using secure authenticated fetch
      const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/bank-verification/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verificationData)
      });

      const data = await response.json();
      console.log('Micro deposit verification API response:', { status: response.status, data });

      if (response.ok && data.success) {
        console.log('Bank verification successful:', data);
        
        // Save verification success data
        const savedData = {
          bankVerificationCompleted: true,
          micro_deposit_verified: true,
          verification_date: new Date().toISOString()
        };
        saveFormData(savedData);
        
        console.log('Bank verification completed, proceeding to next step');
        onSubmit();
      } else {
        // Handle API errors
        if (response.status === 401) {
          setError('Authentication failed. Please log in again.');
        } else if (response.status === 400) {
          setError(data.message || data.detail || 'Invalid verification details. Please check your input.');
        } else if (response.status === 404) {
          setError('Bank reference not found. Please contact support.');
        } else if (response.status === 422) {
          setError('Verification failed. Please check the amount and reference ID.');
        } else {
          setError(data.message || data.detail || 'Verification failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error verifying micro deposit:', error);
      setError('Network error while verifying deposit. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleInputChange = (e) => {
    if (error) setError('');
    handleChange(e);
  };

  const handleAccountNumberChange = (e) => {
    // Allow only digits and limit to 18 characters
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 18) {
      value = value.slice(0, 18);
    }
    
    if (error) setError('');
    e.target.value = value;
    handleChange(e);
  };

  const handleIFSCChange = (e) => {
    // Convert to uppercase and limit to 11 characters
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    
    if (error) setError('');
    e.target.value = value;
    handleChange(e);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{stepData.title}</h2>
        <p className="text-gray-600">{stepData.subtitle}</p>
      </div>

      <form className={REGISTRATION_STYLES.form} onSubmit={handleSubmit}>
        <div className={REGISTRATION_STYLES.fieldGroup}>
          
          {/* Account Holder Name */}
          <div className={REGISTRATION_STYLES.fieldContainer}>
            <label htmlFor="account_holder_name" className={REGISTRATION_STYLES.label}>
              Account Holder Name *
            </label>
            <input
              id="account_holder_name"
              name="account_holder_name"
              type="text"
              required
              maxLength={100}
              className={`${REGISTRATION_STYLES.input} ${error ? 'border-red-500' : ''}`}
              placeholder="Enter account holder's full name"
              value={formData.account_holder_name || ''}
              onChange={handleInputChange}
            />
            <p className="mt-1 text-xs text-gray-500">
              Name as per bank records (max 100 characters)
            </p>
          </div>

          {/* Account Number */}
          <div className={REGISTRATION_STYLES.fieldContainer}>
            <label htmlFor="account_number" className={REGISTRATION_STYLES.label}>
              Account Number *
            </label>
            <input
              id="account_number"
              name="account_number"
              type="text"
              required
              maxLength={18}
              className={`${REGISTRATION_STYLES.input} ${error ? 'border-red-500' : ''}`}
              placeholder="Enter bank account number"
              value={formData.account_number || ''}
              onChange={handleAccountNumberChange}
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter your bank account number (1-18 digits)
            </p>
          </div>

          {/* IFSC Code */}
          <div className={REGISTRATION_STYLES.fieldContainer}>
            <label htmlFor="ifsc_code" className={REGISTRATION_STYLES.label}>
              IFSC Code *
            </label>
            <input
              id="ifsc_code"
              name="ifsc_code"
              type="text"
              required
              maxLength={11}
              className={`${REGISTRATION_STYLES.input} ${error ? 'border-red-500' : ''}`}
              placeholder="Enter IFSC code (e.g., SBIN0001234)"
              value={formData.ifsc_code || ''}
              onChange={handleIFSCChange}
            />
            <p className="mt-1 text-xs text-gray-500">
              11-character IFSC code of your bank branch
            </p>
          </div>

          {/* Cancelled Cheque Upload */}
          <div className={REGISTRATION_STYLES.fieldContainer}>
            <label className={REGISTRATION_STYLES.label}>
              Cancelled Cheque *
            </label>
            
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                error
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400'
              } cursor-pointer`}
              onClick={() => chequeInputRef.current?.click()}
            >
              <input
                ref={chequeInputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                className="hidden"
              />

              {chequePreview ? (
                <div className="space-y-4">
                  {chequePreview.type === 'image' ? (
                    <div className="relative inline-block">
                      <img
                        src={chequePreview.src}
                        alt="Cancelled cheque preview"
                        className="max-w-full max-h-48 mx-auto border border-gray-200 rounded-md shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile();
                        }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900">{chequePreview.name}</p>
                        <p className="text-sm text-gray-500">{formatFileSize(chequePreview.size)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile();
                        }}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  <p className="text-sm text-green-600">✓ Cancelled cheque uploaded successfully</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-gray-300 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">Upload cancelled cheque</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Drag and drop or click to browse
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">
                    Supported formats: PNG, JPEG, JPG, PDF (Max 5MB)
                  </div>
                </div>
              )}
            </div>

            {/* Information Box */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Cancelled Cheque Requirements:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Must be a clear, readable image or PDF</li>
                <li>• Should contain account holder name, account number, and IFSC code</li>
                <li>• Write "CANCELLED" across the cheque</li>
                <li>• Do not sign the cancelled cheque</li>
              </ul>
            </div>
          </div>

          {/* Micro Deposit Verification Section - Show after bank details are submitted */}
          {bankDetailsSubmitted && (
            <>
              <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-green-900 mb-2">Bank Details Submitted Successfully!</h4>
                    <p className="text-sm text-green-800">
                      A micro deposit has been initiated to your bank account. Please check your bank statement and enter the deposit details below to verify your account.
                    </p>
                    {bankReferenceId && (
                      <p className="text-sm text-green-700 mt-2">
                        <strong>Reference ID:</strong> {bankReferenceId}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Verify Micro Deposit</h3>
                
                {/* Micro Deposit Amount */}
                <div className={REGISTRATION_STYLES.fieldContainer}>
                  <label htmlFor="micro_deposit_amount" className={REGISTRATION_STYLES.label}>
                    Micro Deposit Amount *
                  </label>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">₹</span>
                    <input
                      id="micro_deposit_amount"
                      name="micro_deposit_amount"
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      className={`${REGISTRATION_STYLES.input} rounded-l-none ${error ? 'border-red-500' : ''}`}
                      placeholder="Enter the exact amount deposited"
                      value={microDepositAmount}
                      onChange={(e) => {
                        setMicroDepositAmount(e.target.value);
                        if (error) setError('');
                      }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Enter the exact amount that was deposited to your account (e.g., 1.23)
                  </p>
                </div>

                {/* Verification Instructions */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">Verification Instructions:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Check your bank account statement for a small deposit (usually ₹1-10)</li>
                    <li>• Note the exact amount from the transaction</li>
                    <li>• The deposit may take 1-2 business days to appear</li>
                    <li>• Contact support if you don't receive the deposit within 2 business days</li>
                  </ul>
                </div>

                {/* Verify Button */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleMicroDepositVerification}
                    disabled={isVerifying || !microDepositAmount}
                    className={`px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      (isVerifying || !microDepositAmount) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isVerifying ? 'Verifying...' : 'Verify Deposit'}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4">
              <p className="text-sm text-red-600">
                {error}
              </p>
            </div>
          )}
        </div>

        <div className={REGISTRATION_STYLES.buttonGroup}>
          <button
            type="button"
            onClick={onBack}
            className={REGISTRATION_STYLES.backButton}
          >
            {stepData.buttons.back}
          </button>
          {!bankDetailsSubmitted && (
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${REGISTRATION_STYLES.submitButton} ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Saving...' : stepData.buttons.submit}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

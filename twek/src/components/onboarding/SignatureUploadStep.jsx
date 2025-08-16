import { useState, useRef } from 'react';
import { ONBOARDING_STEPS, REGISTRATION_STYLES } from '../../utils/constants';
import { useAuth } from '../../contexts/AuthContext';

export default function SignatureUploadStep({ formData, handleChange, onSubmit, onBack }) {
  const stepData = ONBOARDING_STEPS[3];
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localSignatureFile, setLocalSignatureFile] = useState(null); // Local fallback
  const [localSignatureFileName, setLocalSignatureFileName] = useState(''); // Local fallback
  const fileInputRef = useRef(null);
  const { saveFormData, getAuthToken, authenticatedFetch } = useAuth();

  // Accepted file types for signature
  const acceptedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const validateFile = (file) => {
    if (!acceptedTypes.includes(file.type)) {
      setError('Please upload a PNG or JPEG image file');
      return false;
    }

    if (file.size > maxFileSize) {
      setError('File size should be less than 5MB');
      return false;
    }

    return true;
  };

  const handleFileUpload = (file) => {
    console.log('📁 File selected for upload:', file);
    console.log('File validation starting...');
    
    if (validateFile(file)) {
      console.log('✅ File validation passed');
      setError('');
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('✅ File preview created');
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Store file in local state as fallback
      setLocalSignatureFile(file);
      setLocalSignatureFileName(file.name);
      console.log('✅ File stored in local state as fallback');

      // Try to store file in parent formData
      console.log('Attempting to call parent handleChange...');
      if (handleChange && typeof handleChange === 'function') {
        handleChange({
          target: { name: 'signatureFile', value: file }
        });
        handleChange({
          target: { name: 'signatureFileName', value: file.name }
        });
        console.log('✅ Called parent handleChange for signatureFile');
      } else {
        console.log('❌ handleChange is not available or not a function:', handleChange);
      }
    } else {
      console.log('❌ File validation failed');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setPreview(null);
    setError('');
    setLocalSignatureFile(null);
    setLocalSignatureFileName('');
    
    // Also try to clear parent formData
    if (handleChange && typeof handleChange === 'function') {
      handleChange({
        target: { name: 'signatureFile', value: null }
      });
      handleChange({
        target: { name: 'signatureFileName', value: '' }
      });
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    console.log('🔄 SIGNATURE UPLOAD: handleSubmit called');
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Use parent formData if available, otherwise fallback to local state
    const currentSignatureFile = formData.signatureFile || localSignatureFile;
    const currentSignatureFileName = formData.signatureFileName || localSignatureFileName;

    console.log('File source check:');
    console.log('- Parent formData.signatureFile:', formData.signatureFile);
    console.log('- Local signatureFile:', localSignatureFile);
    console.log('- Using file:', currentSignatureFile);
    console.log('File exists?', !!currentSignatureFile);

    if (!currentSignatureFile) {
      console.log('❌ No signature file found in either parent formData or local state, stopping upload');
      setError('Please upload your signature');
      setIsSubmitting(false);
      return;
    }

    console.log('✅ Signature file found, proceeding with upload...');

    try {
      console.log('=== SIGNATURE UPLOAD DEBUG START ===');
      
      // Verify authentication token
      const token = getAuthToken();
      if (!token) {
        setError('Authentication required. Please log in again.');
        setIsSubmitting(false);
        return;
      }
      console.log('Auth token available:', token.substring(0, 20) + '...');

      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('signature_file', currentSignatureFile);

      console.log('File upload details:', {
        name: currentSignatureFile.name,
        size: currentSignatureFile.size,
        type: currentSignatureFile.type,
        lastModified: currentSignatureFile.lastModified,
        constructor: currentSignatureFile.constructor.name
      });

      // Verify FormData contents
      console.log('FormData contents:');
      for (let [key, value] of formDataToSend.entries()) {
        if (value instanceof File) {
          console.log(`- ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
        } else {
          console.log(`- ${key}: ${value}`);
        }
      }

      // Validate file before upload
      if (!acceptedTypes.includes(currentSignatureFile.type)) {
        setError('Invalid file type. Please upload PNG or JPEG files only.');
        setIsSubmitting(false);
        return;
      }

      if (currentSignatureFile.size > maxFileSize) {
        setError('File too large. Please upload a file smaller than 5MB.');
        setIsSubmitting(false);
        return;
      }

      console.log('Making API request to:', 'http://15.207.254.95:8080/api/brand/signature/upload/');

      // Call the signature upload API using secure authenticated fetch
      const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/signature/upload/', {
        method: 'POST',
        body: formDataToSend
      });

      console.log('API Response details:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      let data;
      
      try {
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          const textResponse = await response.text();
          console.error('Non-JSON response received:', {
            contentType,
            status: response.status,
            text: textResponse.substring(0, 500)
          });
          throw new Error(`Server returned non-JSON response (${response.status}): ${textResponse.substring(0, 200)}`);
        }
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        throw new Error(`Invalid response format from server (${response.status})`);
      }
      
      console.log('Parsed response data:', data);
      console.log('=== SIGNATURE UPLOAD DEBUG END ===');

      if (response.ok && data.success) {
        console.log('✅ Signature uploaded successfully:', data);
        
        // Save the signature data for future reference
        const savedData = {
          signatureId: data.signature_id || data.id,
          signatureFileName: currentSignatureFileName,
          signatureUploaded: true,
          signatureUrl: data.signature_url || data.url
        };
        saveFormData(savedData);
        
        console.log('Signature upload completed, proceeding to next step');
        onSubmit();
      } else {
        // Enhanced error handling with detailed logging
        console.error('❌ API Error Details:', {
          status: response.status,
          statusText: response.statusText,
          data: data,
          responseOk: response.ok,
          expectedSuccess: data?.success
        });
        
        if (response.status === 401) {
          setError('Authentication failed. Please log in again.');
        } else if (response.status === 400) {
          const errorMsg = data?.message || data?.detail || data?.error || 'Invalid file format or size. Please check the file requirements.';
          setError(`Upload failed: ${errorMsg}`);
        } else if (response.status === 403) {
          setError('Email or phone not verified. Please complete verification first.');
        } else if (response.status === 413) {
          setError('File too large. Please upload a smaller file (max 5MB).');
        } else if (response.status === 415) {
          setError('Unsupported file type. Please upload PNG or JPEG files only.');
        } else if (response.status >= 500) {
          setError('Server error occurred. Please try again later.');
        } else {
          const errorMsg = data?.message || data?.detail || data?.error || `Upload failed (${response.status})`;
          setError(`Upload error: ${errorMsg}`);
        }
      }
    } catch (error) {
      console.error('❌ SIGNATURE UPLOAD ERROR - Full details:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        cause: error.cause
      });
      
      // More specific error handling
      if (error.message.includes('No authentication token')) {
        setError('Authentication required. Please log in again.');
      } else if (error.message.includes('Authentication failed after token refresh')) {
        setError('Session expired. Please log in again.');
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setError('Network connection failed. Please check your internet connection and try again.');
      } else if (error.message.includes('Invalid response format')) {
        setError('Server error: Invalid response format. Please try again or contact support.');
      } else if (error.message.includes('non-JSON response')) {
        setError('Server error: Unexpected response format. Please try again later.');
      } else if (error.message.includes('Network request failed')) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(`Upload failed: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputFocus = () => {
    if (error) setError('');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{stepData.title}</h2>
        <p className="text-gray-600">{stepData.subtitle}</p>
      </div>

      <form className={REGISTRATION_STYLES.form} onSubmit={handleSubmit}>
        <div className={REGISTRATION_STYLES.fieldGroup}>
          {/* Signature Upload Area */}
          <div className={REGISTRATION_STYLES.fieldContainer}>
            <label className={REGISTRATION_STYLES.label}>
              Digital Signature *
            </label>
            
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive
                  ? 'border-blue-400 bg-blue-50'
                  : error
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="hidden"
              />

              {preview ? (
                <div className="space-y-4">
                  <div className="relative inline-block">
                    <img
                      src={preview}
                      alt="Signature preview"
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
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">{formData.signatureFileName || localSignatureFileName}</p>
                    <p className="text-green-600">✓ File uploaded successfully</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-gray-300 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">Upload your signature</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Drag and drop your signature image here, or click to browse
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">
                    Supported formats: PNG, JPEG, JPG (Max 5MB)
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Signature Guidelines:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Use a clear, high-resolution image of your signature</li>
                <li>• Signature should be on a white or transparent background</li>
                <li>• Ensure the signature is clearly visible and not blurry</li>
                <li>• This signature will be used for official documents</li>
              </ul>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-2">
                <p className="text-xs text-red-600">
                  {error}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className={REGISTRATION_STYLES.buttonGroup}>
          <button
            type="button"
            onClick={onBack}
            className={REGISTRATION_STYLES.backButton}
          >
            {stepData.buttons.back}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            onClick={() => console.log('🖱️ Submit button clicked, formData.signatureFile:', !!formData.signatureFile)}
            className={`${REGISTRATION_STYLES.submitButton} ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Uploading...' : stepData.buttons.submit}
          </button>
        </div>
      </form>
    </div>
  );
}

import { useState, useRef } from 'react';
import { ONBOARDING_STEPS, REGISTRATION_STYLES } from '../../utils/constants';
import { useAuth } from '../../contexts/AuthContext';

export default function BrandProductDetailsStep({ formData, handleChange, onSubmit, onBack }) {
  const stepData = ONBOARDING_STEPS[6];
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [catalogPreview, setCatalogPreview] = useState(null);
  const logoInputRef = useRef(null);
  const catalogInputRef = useRef(null);
  const { saveFormData, getAuthToken, authenticatedFetch } = useAuth();

  // Options for form fields
  const productCategories = [
    'Clothing', 'Footwear', 'Accessories', 'Electronics', 'Home & Garden',
    'Sports & Outdoors', 'Beauty & Personal Care', 'Health & Wellness',
    'Books & Media', 'Toys & Games', 'Automotive', 'Food & Beverages', 'Other'
  ];

  const genderOptions = [
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'kids', label: 'Kids' },
    { value: 'unisex', label: 'Unisex' }
  ];

  // Initialize arrays if not present
  const selectedCategories = formData.product_categories || [];
  const selectedGenders = formData.gender || [];
  const targetAgeGroups = formData.target_age_groups || [18, 65];
  const priceRange = formData.price_range || ['', ''];

  const validateFile = (file, type) => {
    const maxSize = type === 'logo' ? 5 * 1024 * 1024 : 10 * 1024 * 1024; // 5MB for logo, 10MB for catalog
    const allowedTypes = type === 'logo' 
      ? ['image/png', 'image/jpeg', 'image/jpg']
      : ['application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];

    if (!allowedTypes.includes(file.type)) {
      const typesText = type === 'logo' ? 'PNG, JPEG, JPG' : 'PDF, Excel, CSV';
      setError(`Please upload a valid ${typesText} file for ${type}`);
      return false;
    }

    if (file.size > maxSize) {
      const sizeText = type === 'logo' ? '5MB' : '10MB';
      setError(`${type} file size should be less than ${sizeText}`);
      return false;
    }

    return true;
  };

  const handleFileUpload = (file, type) => {
    if (validateFile(file, type)) {
      setError('');
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'logo') {
          setLogoPreview(e.target.result);
        } else {
          setCatalogPreview({ name: file.name, size: file.size });
        }
      };
      
      if (type === 'logo') {
        reader.readAsDataURL(file);
      } else {
        setCatalogPreview({ name: file.name, size: file.size });
      }

      // Store file in formData
      handleChange({
        target: { name: type === 'logo' ? 'brand_logo' : 'product_catalog', value: file }
      });
    }
  };

  const handleCategoryChange = (category) => {
    setError('');
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(cat => cat !== category)
      : [...selectedCategories, category];
    
    handleChange({
      target: { name: 'product_categories', value: updatedCategories }
    });
  };

  const handleGenderChange = (gender) => {
    setError('');
    const updatedGenders = selectedGenders.includes(gender)
      ? selectedGenders.filter(g => g !== gender)
      : [...selectedGenders, gender];
    
    handleChange({
      target: { name: 'gender', value: updatedGenders }
    });
  };

  const handleAgeRangeChange = (index, value) => {
    setError('');
    const updatedRange = [...targetAgeGroups];
    updatedRange[index] = parseInt(value) || 0;
    
    handleChange({
      target: { name: 'target_age_groups', value: updatedRange }
    });
  };

  const handlePriceRangeChange = (index, value) => {
    setError('');
    const updatedRange = [...priceRange];
    updatedRange[index] = value;
    
    handleChange({
      target: { name: 'price_range', value: updatedRange }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validation
    if (!formData.brand_logo) {
      setError('Brand logo is required');
      setIsSubmitting(false);
      return;
    }

    if (!selectedCategories.length) {
      setError('Please select at least one product category');
      setIsSubmitting(false);
      return;
    }

    if (!selectedGenders.length) {
      setError('Please select at least one target gender');
      setIsSubmitting(false);
      return;
    }

    if (targetAgeGroups[0] >= targetAgeGroups[1]) {
      setError('Maximum age must be greater than minimum age');
      setIsSubmitting(false);
      return;
    }

    if (!priceRange[0] || !priceRange[1]) {
      setError('Please specify both minimum and maximum price');
      setIsSubmitting(false);
      return;
    }

    const minPrice = parseFloat(priceRange[0]);
    const maxPrice = parseFloat(priceRange[1]);

    if (minPrice >= maxPrice) {
      setError('Maximum price must be greater than minimum price');
      setIsSubmitting(false);
      return;
    }

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Add brand logo (required)
      formDataToSend.append('brand_logo', formData.brand_logo);
      
      // Add product categories as array
      selectedCategories.forEach(category => {
        formDataToSend.append('product_categories', category);
      });
      
      // Add gender as array
      selectedGenders.forEach(gender => {
        formDataToSend.append('gender', gender);
      });
      
      // Add target age groups as array
      targetAgeGroups.forEach(age => {
        formDataToSend.append('target_age_groups', age.toString());
      });
      
      // Add price range as array
      priceRange.forEach(price => {
        formDataToSend.append('price_range', price);
      });
      
      // Add product catalog if provided (optional)
      if (formData.product_catalog) {
        formDataToSend.append('product_catalog', formData.product_catalog);
      }

      console.log('Submitting brand and product details...');
      
      // Debug: Log FormData contents
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }

      // Call the brand product details API using secure authenticated fetch
      const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/product-details/', {
        method: 'POST',
        headers: {
          // Don't set Content-Type for FormData, let browser set it with boundary
        },
        body: formDataToSend
      });

      const data = await response.json();
      console.log('Brand product details API response:', { status: response.status, data });

      if (response.ok && data.success) {
        console.log('Brand and product details saved successfully:', data);
        
        // Save the form data for future reference
        const savedData = {
          brand_logo_uploaded: true,
          product_categories: selectedCategories,
          gender: selectedGenders,
          target_age_groups: targetAgeGroups,
          price_range: priceRange,
          product_catalog_uploaded: !!formData.product_catalog,
          brandProductDetailsCompleted: true
        };
        saveFormData(savedData);
        
        console.log('Brand and product details completed, proceeding to next step');
        onSubmit();
      } else {
        // Handle API errors
        if (response.status === 401) {
          setError('Authentication failed. Please log in again.');
        } else if (response.status === 400) {
          setError(data.message || data.detail || 'Invalid data provided. Please check your inputs.');
        } else if (response.status === 403) {
          setError('Access denied. Please ensure your account is properly verified.');
        } else if (response.status === 413) {
          setError('File size too large. Please reduce file sizes and try again.');
        } else {
          setError(data.message || data.detail || 'Failed to save brand and product details. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error saving brand and product details:', error);
      setError('Network error while saving details. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
          
          {/* Brand Logo Upload */}
          <div className={REGISTRATION_STYLES.fieldContainer}>
            <label className={REGISTRATION_STYLES.label}>
              Brand Logo *
            </label>
            <div
              className="relative border-2 border-dashed rounded-lg p-6 text-center transition-colors border-gray-300 bg-gray-50 hover:border-gray-400 cursor-pointer"
              onClick={() => logoInputRef.current?.click()}
            >
              <input
                ref={logoInputRef}
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'logo')}
                className="hidden"
              />

              {logoPreview ? (
                <div className="space-y-3">
                  <img src={logoPreview} alt="Logo preview" className="max-w-32 max-h-32 mx-auto rounded-md" />
                  <p className="text-sm text-green-600">✓ Logo uploaded successfully</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-gray-300 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">Upload your brand logo</p>
                    <p className="text-sm text-gray-500">PNG, JPEG, JPG (Max 5MB)</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Categories */}
          <div className={REGISTRATION_STYLES.fieldContainer}>
            <label className={REGISTRATION_STYLES.label}>
              Product Categories *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
              {productCategories.map((category) => (
                <label key={category} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Target Gender */}
          <div className={REGISTRATION_STYLES.fieldContainer}>
            <label className={REGISTRATION_STYLES.label}>
              Target Gender *
            </label>
            <div className="flex flex-wrap gap-3 mt-2">
              {genderOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedGenders.includes(option.value)}
                    onChange={() => handleGenderChange(option.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Target Age Groups */}
          <div className={REGISTRATION_STYLES.fieldContainer}>
            <label className={REGISTRATION_STYLES.label}>
              Target Age Range *
            </label>
            <div className="flex items-center gap-3 mt-2">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Min age"
                value={targetAgeGroups[0] || ''}
                onChange={(e) => handleAgeRangeChange(0, e.target.value)}
                className={`${REGISTRATION_STYLES.input} flex-1`}
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Max age"
                value={targetAgeGroups[1] || ''}
                onChange={(e) => handleAgeRangeChange(1, e.target.value)}
                className={`${REGISTRATION_STYLES.input} flex-1`}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Age range in years</p>
          </div>

          {/* Price Range */}
          <div className={REGISTRATION_STYLES.fieldContainer}>
            <label className={REGISTRATION_STYLES.label}>
              Price Range *
            </label>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center flex-1">
                <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">₹</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Min price"
                  value={priceRange[0] || ''}
                  onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                  className={`${REGISTRATION_STYLES.input} rounded-l-none flex-1`}
                />
              </div>
              <span className="text-gray-500">to</span>
              <div className="flex items-center flex-1">
                <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">₹</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Max price"
                  value={priceRange[1] || ''}
                  onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                  className={`${REGISTRATION_STYLES.input} rounded-l-none flex-1`}
                />
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">Price range in Indian Rupees</p>
          </div>

          {/* Product Catalog Upload (Optional) */}
          <div className={REGISTRATION_STYLES.fieldContainer}>
            <label className={REGISTRATION_STYLES.label}>
              Product Catalog (Optional)
            </label>
            <div
              className="relative border-2 border-dashed rounded-lg p-4 text-center transition-colors border-gray-300 bg-gray-50 hover:border-gray-400 cursor-pointer"
              onClick={() => catalogInputRef.current?.click()}
            >
              <input
                ref={catalogInputRef}
                type="file"
                accept=".pdf,.xlsx,.csv"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'catalog')}
                className="hidden"
              />

              {catalogPreview ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{catalogPreview.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(catalogPreview.size)}</p>
                  <p className="text-sm text-green-600">✓ Catalog uploaded successfully</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-8 h-8 mx-auto bg-gray-300 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Upload product catalog</p>
                    <p className="text-xs text-gray-500">PDF, Excel, CSV (Max 10MB)</p>
                  </div>
                </div>
              )}
            </div>
          </div>

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
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${REGISTRATION_STYLES.submitButton} ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Saving...' : stepData.buttons.submit}
          </button>
        </div>
      </form>
    </div>
  );
}

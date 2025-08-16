import { useState } from 'react';
import { ONBOARDING_STEPS, REGISTRATION_STYLES } from '../../utils/constants';
import { useAuth } from '../../contexts/AuthContext';

export default function WarehouseDetailsStep({ formData, handleChange, onSubmit, onBack }) {
  const stepData = ONBOARDING_STEPS[5];
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { saveFormData, getAuthToken, authenticatedFetch } = useAuth();

  // Initialize city_warehouses if not present
  const cityWarehouses = formData.city_warehouses || [{ city_name: '', warehouse_count: 1 }];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validate city warehouses
    if (!cityWarehouses || cityWarehouses.length === 0) {
      setError('Please add at least one warehouse location');
      setIsSubmitting(false);
      return;
    }

    for (let i = 0; i < cityWarehouses.length; i++) {
      const warehouse = cityWarehouses[i];
      
      if (!warehouse.city_name?.trim()) {
        setError(`City name is required for warehouse ${i + 1}`);
        setIsSubmitting(false);
        return;
      }

      if (!warehouse.warehouse_count || warehouse.warehouse_count < 1) {
        setError(`Warehouse count must be at least 1 for ${warehouse.city_name || `warehouse ${i + 1}`}`);
        setIsSubmitting(false);
        return;
      }
    }

    // Validate daily order volume
    if (formData.daily_order_volume === undefined || formData.daily_order_volume === null || formData.daily_order_volume === '') {
      setError('Daily order volume is required');
      setIsSubmitting(false);
      return;
    }

    if (formData.daily_order_volume < 0) {
      setError('Daily order volume cannot be negative');
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare warehouse data for API
      const warehouseData = {
        city_warehouses: cityWarehouses.map(warehouse => ({
          city_name: warehouse.city_name.trim(),
          warehouse_count: parseInt(warehouse.warehouse_count)
        })),
        daily_order_volume: parseInt(formData.daily_order_volume)
      };

      console.log('Submitting warehouse details:', warehouseData);

      // Call the warehouse details API using secure authenticated fetch
      const response = await authenticatedFetch('http://15.207.254.95:8080/api/brand/warehouse-details/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(warehouseData)
      });

      const data = await response.json();
      console.log('Warehouse details API response:', { status: response.status, data });

      if (response.ok && data.success) {
        console.log('Warehouse details saved successfully:', data);
        
        // Save the warehouse data for future reference
        const savedData = {
          city_warehouses: cityWarehouses,
          daily_order_volume: formData.daily_order_volume,
          warehouseDetailsCompleted: true
        };
        saveFormData(savedData);
        
        console.log('Warehouse details completed, proceeding to next step');
        onSubmit();
      } else {
        // Handle API errors
        if (response.status === 401) {
          setError('Authentication failed. Please log in again.');
        } else if (response.status === 400) {
          setError(data.message || data.detail || 'Invalid warehouse details. Please check your input.');
        } else if (response.status === 403) {
          setError('Access denied. Please ensure your account is properly verified.');
        } else {
          setError(data.message || data.detail || 'Failed to save warehouse details. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error saving warehouse details:', error);
      setError('Network error while saving warehouse details. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCityWarehouseChange = (index, field, value) => {
    setError('');
    const updatedWarehouses = [...cityWarehouses];
    
    if (field === 'warehouse_count') {
      // Ensure warehouse count is a positive integer
      const numValue = parseInt(value) || 1;
      updatedWarehouses[index] = {
        ...updatedWarehouses[index],
        [field]: Math.max(1, numValue)
      };
    } else {
      updatedWarehouses[index] = {
        ...updatedWarehouses[index],
        [field]: value
      };
    }

    handleChange({
      target: { name: 'city_warehouses', value: updatedWarehouses }
    });
  };

  const addWarehouse = () => {
    setError('');
    const updatedWarehouses = [...cityWarehouses, { city_name: '', warehouse_count: 1 }];
    handleChange({
      target: { name: 'city_warehouses', value: updatedWarehouses }
    });
  };

  const removeWarehouse = (index) => {
    setError('');
    if (cityWarehouses.length > 1) {
      const updatedWarehouses = cityWarehouses.filter((_, i) => i !== index);
      handleChange({
        target: { name: 'city_warehouses', value: updatedWarehouses }
      });
    }
  };

  const handleDailyOrderVolumeChange = (e) => {
    setError('');
    const value = parseInt(e.target.value) || 0;
    handleChange({
      target: { name: 'daily_order_volume', value: Math.max(0, value) }
    });
  };

  const handleInputChange = (e) => {
    if (error) setError('');
    handleChange(e);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{stepData.title}</h2>
        <p className="text-gray-600">{stepData.subtitle}</p>
      </div>

      <form className={REGISTRATION_STYLES.form} onSubmit={handleSubmit}>
        <div className={REGISTRATION_STYLES.fieldGroup}>
          
          {/* City Warehouses Section */}
          <div className={REGISTRATION_STYLES.fieldContainer}>
            <label className={REGISTRATION_STYLES.label}>
              Warehouse Locations *
            </label>
            <div className="space-y-4 mt-3">
              {cityWarehouses.map((warehouse, index) => (
                <div key={index} className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-900">
                      Warehouse {index + 1}
                    </h4>
                    {cityWarehouses.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeWarehouse(index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* City Name */}
                    <div>
                      <label htmlFor={`city_name_${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        City Name *
                      </label>
                      <input
                        id={`city_name_${index}`}
                        type="text"
                        required
                        className={`${REGISTRATION_STYLES.input} ${error ? 'border-red-500' : ''}`}
                        placeholder="Enter city name"
                        value={warehouse.city_name || ''}
                        onChange={(e) => handleCityWarehouseChange(index, 'city_name', e.target.value)}
                      />
                    </div>

                    {/* Warehouse Count */}
                    <div>
                      <label htmlFor={`warehouse_count_${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Warehouse Count *
                      </label>
                      <input
                        id={`warehouse_count_${index}`}
                        type="number"
                        min="1"
                        required
                        className={`${REGISTRATION_STYLES.input} ${error ? 'border-red-500' : ''}`}
                        placeholder="Number of warehouses"
                        value={warehouse.warehouse_count || 1}
                        onChange={(e) => handleCityWarehouseChange(index, 'warehouse_count', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Warehouse Button */}
            <button
              type="button"
              onClick={addWarehouse}
              className="mt-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Another Warehouse
            </button>
          </div>

          {/* Daily Order Volume */}
          <div className={REGISTRATION_STYLES.fieldContainer}>
            <label htmlFor="daily_order_volume" className={REGISTRATION_STYLES.label}>
              Daily Order Volume *
            </label>
            <input
              id="daily_order_volume"
              name="daily_order_volume"
              type="number"
              min="0"
              required
              className={`${REGISTRATION_STYLES.input} ${error ? 'border-red-500' : ''}`}
              placeholder="Enter expected daily order volume"
              value={formData.daily_order_volume || ''}
              onChange={handleDailyOrderVolumeChange}
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter the number of orders you expect to process per day
            </p>
          </div>

          {/* Information Box */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="font-medium text-blue-900">Warehouse Information</h4>
                <div className="text-sm text-blue-800 mt-1 space-y-1">
                  <p>• Add all cities where you have warehouse facilities</p>
                  <p>• Include the total number of warehouses in each city</p>
                  <p>• Daily order volume helps us optimize your fulfillment process</p>
                  <p>• You can add more warehouse locations later from your dashboard</p>
                </div>
              </div>
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

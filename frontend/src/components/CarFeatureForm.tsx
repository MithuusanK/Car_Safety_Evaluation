import React, { useState } from 'react';
import { CarFeatures, FormErrors } from '../types';
import { validateCarFeatures } from '../utils/helpers';

interface CarFeatureFormProps {
  onSubmit: (features: CarFeatures) => void;
  loading?: boolean;
}

const CarFeatureForm: React.FC<CarFeatureFormProps> = ({ onSubmit, loading = false }) => {
  const [features, setFeatures] = useState<Partial<CarFeatures>>({
    buyPrice: undefined,
    maintainPrice: undefined,
    doors: undefined,
    persons: undefined,
    luggageStorage: undefined,
    safety: undefined,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (field: keyof CarFeatures, value: string) => {
    setFeatures(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateCarFeatures(features);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(features as CarFeatures);
  };

  const formFields = [
    {
      name: 'buyPrice' as keyof CarFeatures,
      label: 'Buying Price',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'med', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'vhigh', label: 'Very High' }
      ]
    },
    {
      name: 'maintainPrice' as keyof CarFeatures,
      label: 'Maintenance Price',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'med', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'vhigh', label: 'Very High' }
      ]
    },
    {
      name: 'doors' as keyof CarFeatures,
      label: 'Number of Doors',
      options: [
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5more', label: '5 or more' }
      ]
    },
    {
      name: 'persons' as keyof CarFeatures,
      label: 'Seating Capacity',
      options: [
        { value: '2', label: '2 persons' },
        { value: '4', label: '4 persons' },
        { value: 'more', label: 'More than 4' }
      ]
    },
    {
      name: 'luggageStorage' as keyof CarFeatures,
      label: 'Luggage Storage',
      options: [
        { value: 'small', label: 'Small' },
        { value: 'med', label: 'Medium' },
        { value: 'big', label: 'Big' }
      ]
    },
    {
      name: 'safety' as keyof CarFeatures,
      label: 'Safety Rating',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'med', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]
    }
  ];

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Car Feature Input</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formFields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="label">
                {field.label}
              </label>
              <select
                id={field.name}
                name={field.name}
                className={`select-field ${errors[field.name] ? 'border-red-500' : ''}`}
                value={features[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              >
                <option value="">Select {field.label}</option>
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Predicting...
              </>
            ) : (
              'Predict Safety Class'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarFeatureForm;
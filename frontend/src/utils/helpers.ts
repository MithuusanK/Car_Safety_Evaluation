// Utility functions for the car safety application

import { CarFeatures, EncodedCarFeatures } from '../types';

// Environment variables helper
export const getApiUrl = (): string => {
  return 'http://localhost:8000'; // Change this to your backend URL
};

// Feature encoding mappings (based on your notebook)
export const FEATURE_ENCODINGS = {
  buyPrice: { low: 0, med: 1, high: 2, vhigh: 3 },
  maintainPrice: { low: 0, med: 1, high: 2, vhigh: 3 },
  doors: { '2': 2, '3': 3, '4': 4, '5more': 5 },
  persons: { '2': 2, '4': 4, 'more': 6 },
  luggageStorage: { small: 0, med: 1, big: 2 },
  safety: { low: 0, med: 1, high: 2 }
};

// Encode car features for API call
export const encodeFeatures = (features: CarFeatures): EncodedCarFeatures => {
  return {
    buyPrice: FEATURE_ENCODINGS.buyPrice[features.buyPrice],
    maintainPrice: FEATURE_ENCODINGS.maintainPrice[features.maintainPrice],
    doors: FEATURE_ENCODINGS.doors[features.doors],
    persons: FEATURE_ENCODINGS.persons[features.persons],
    luggageStorage: FEATURE_ENCODINGS.luggageStorage[features.luggageStorage],
    safety: FEATURE_ENCODINGS.safety[features.safety]
  };
};

// Format percentage for display
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

// Format confidence score
export const formatConfidence = (confidence: number): string => {
  return formatPercentage(confidence, 1);
};

// Get class display name
export const getClassDisplayName = (classValue: string): string => {
  const displayNames: { [key: string]: string } = {
    'unacc': 'Unacceptable',
    'acc': 'Acceptable',
    'good': 'Good',
    'vgood': 'Very Good'
  };
  return displayNames[classValue] || classValue;
};

// Get class color for UI
export const getClassColor = (classValue: string): string => {
  const colors: { [key: string]: string } = {
    'unacc': 'text-red-600 bg-red-100',
    'acc': 'text-yellow-600 bg-yellow-100',
    'good': 'text-blue-600 bg-blue-100',
    'vgood': 'text-green-600 bg-green-100'
  };
  return colors[classValue] || 'text-gray-600 bg-gray-100';
};

// Validate car features form
export const validateCarFeatures = (features: Partial<CarFeatures>): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  if (!features.buyPrice) errors.buyPrice = 'Buy price is required';
  if (!features.maintainPrice) errors.maintainPrice = 'Maintenance price is required';
  if (!features.doors) errors.doors = 'Number of doors is required';
  if (!features.persons) errors.persons = 'Number of persons is required';
  if (!features.luggageStorage) errors.luggageStorage = 'Luggage storage is required';
  if (!features.safety) errors.safety = 'Safety rating is required';

  return errors;
};

// Debounce function for API calls
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => func(...args), delay);
  };
};

// Calculate total from array
export const calculateTotal = (values: number[]): number => {
  return values.reduce((sum: number, value: number) => sum + value, 0);
};

// Normalize probabilities
export const normalizeProbabilities = (probabilities: { [key: string]: number }): { [key: string]: number } => {
  const values = Object.values(probabilities);
  const total = calculateTotal(values);
  
  if (total === 0) return probabilities;
  
  const normalized: { [key: string]: number } = {};
  Object.keys(probabilities).forEach(key => {
    normalized[key] = probabilities[key] / total;
  });
  
  return normalized;
};
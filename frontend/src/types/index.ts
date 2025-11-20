// Car feature types based on your notebook analysis
export interface CarFeatures {
  buyPrice: 'low' | 'med' | 'high' | 'vhigh';
  maintainPrice: 'low' | 'med' | 'high' | 'vhigh';
  doors: '2' | '3' | '4' | '5more';
  persons: '2' | '4' | 'more';
  luggageStorage: 'small' | 'med' | 'big';
  safety: 'low' | 'med' | 'high';
}

// Encoded features for API calls (numerical values)
export interface EncodedCarFeatures {
  buyPrice: number;
  maintainPrice: number;
  doors: number;
  persons: number;
  luggageStorage: number;
  safety: number;
}

// Prediction result types
export type CarClass = 'unacc' | 'acc' | 'good' | 'vgood';

export interface PredictionResult {
  prediction: CarClass;
  confidence: number;
  probabilities: {
    unacc: number;
    acc: number;
    good: number;
    vgood: number;
  };
}

// Model performance metrics
export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  confusionMatrix: number[][];
  classificationReport: {
    [key: string]: {
      precision: number;
      recall: number;
      f1Score: number;
      support: number;
    };
  };
}

// Feature importance for visualizations
export interface FeatureImportance {
  feature: string;
  importance: number;
}

// Model comparison data
export interface ModelComparison {
  modelName: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainingTime?: number;
}

// API response types
export interface PredictionResponse {
  success: boolean;
  data: PredictionResult;
  message?: string;
}

export interface MetricsResponse {
  success: boolean;
  data: {
    currentModel: string;
    metrics: ModelMetrics;
    featureImportances: FeatureImportance[];
    modelComparisons: ModelComparison[];
  };
  message?: string;
}

// Form validation types
export interface FormErrors {
  [key: string]: string;
}

// Loading states
export interface LoadingState {
  prediction: boolean;
  metrics: boolean;
}
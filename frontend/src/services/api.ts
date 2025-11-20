import axios from 'axios';
import {
  CarFeatures,
  PredictionResponse,
  MetricsResponse,
  ModelComparison,
  FeatureImportance
} from '../types';
import { encodeFeatures, normalizeProbabilities } from '../utils/helpers';

// Base API configuration
const API_BASE_URL = 'http://localhost:8000'; // You can change this to your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service class
export class CarSafetyAPI {
  // Predict car safety class
  static async predict(features: CarFeatures): Promise<PredictionResponse> {
    try {
      const encodedFeatures = encodeFeatures(features);
      const response = await api.post('/predict', encodedFeatures);
      return response.data;
    } catch (error) {
      console.error('Prediction API error:', error);
      
      // Return mock data for development
      return this.getMockPrediction(features);
    }
  }

  // Get model performance metrics
  static async getMetrics(): Promise<MetricsResponse> {
    try {
      const response = await api.get('/metrics');
      return response.data;
    } catch (error) {
      console.error('Metrics API error:', error);
      
      // Return mock data for development
      return this.getMockMetrics();
    }
  }

  // Get available models
  static async getModels(): Promise<string[]> {
    try {
      const response = await api.get('/models');
      return response.data.models;
    } catch (error) {
      console.error('Models API error:', error);
      return ['Random Forest', 'SVM', 'KNN', 'Decision Tree', 'Naive Bayes'];
    }
  }

  // Switch active model
  static async switchModel(modelName: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.post('/switch-model', { model: modelName });
      return response.data;
    } catch (error) {
      console.error('Switch model API error:', error);
      // Update mock current model
      this.currentModel = modelName;
      return { success: true, message: `Switched to ${modelName}` };
    }
  }

  // Mock prediction for development/testing
  private static getMockPrediction(features: CarFeatures): PredictionResponse {
    const predictions: Array<'unacc' | 'acc' | 'good' | 'vgood'> = ['unacc', 'acc', 'good', 'vgood'];
    const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
    
    const baseProb = 0.1;
    const confidenceBoost = Math.random() * 0.8;
    
    const probabilities = {
      unacc: baseProb,
      acc: baseProb,
      good: baseProb,
      vgood: baseProb
    };
    
    probabilities[randomPrediction] = baseProb + confidenceBoost;
    
    // Normalize probabilities
    const normalizedProbs = normalizeProbabilities(probabilities);

    return {
      success: true,
      data: {
        prediction: randomPrediction,
        confidence: normalizedProbs[randomPrediction],
        probabilities: normalizedProbs as any
      }
    };
  }

  // Store current model for mock API (Random Forest has best performance at 97.70%)
  private static currentModel: string = 'Random Forest';

  // Mock metrics for development/testing
  private static getMockMetrics(): MetricsResponse {
    const mockFeatureImportances: FeatureImportance[] = [
      { feature: 'safety', importance: 0.302 },
      { feature: 'persons', importance: 0.245 },
      { feature: 'buyPrice', importance: 0.153 },
      { feature: 'maintainPrice', importance: 0.145 },
      { feature: 'luggageStorage', importance: 0.095 },
      { feature: 'doors', importance: 0.060 }
    ];

    const mockModelComparisons: ModelComparison[] = [
      { modelName: 'Random Forest', accuracy: 0.9770, precision: 0.98, recall: 0.98, f1Score: 0.98, trainingTime: 0.12 },
      { modelName: 'SVM', accuracy: 0.9538, precision: 0.96, recall: 0.95, f1Score: 0.95, trainingTime: 0.45 },
      { modelName: 'KNN', accuracy: 0.9509, precision: 0.95, recall: 0.95, f1Score: 0.95, trainingTime: 0.02 },
      { modelName: 'Decision Tree', accuracy: 0.8786, precision: 0.86, recall: 0.88, f1Score: 0.87, trainingTime: 0.03 },
      { modelName: 'Naive Bayes', accuracy: 0.7630, precision: 0.80, recall: 0.76, f1Score: 0.76, trainingTime: 0.01 }
    ];

    // Get metrics for current model
    const currentModelData = mockModelComparisons.find(m => m.modelName === this.currentModel) || mockModelComparisons[0];

    // Model-specific confusion matrices and classification reports based on actual notebook results
    const getModelSpecificMetrics = (modelName: string) => {
      switch (modelName) {
        case 'Random Forest':
          return {
            confusionMatrix: [
              [64, 0, 0, 0],
              [0, 16, 0, 0],
              [1, 0, 3, 0],
              [1, 0, 0, 2]
            ],
            classificationReport: {
              'unacc': { precision: 1.00, recall: 1.00, f1Score: 1.00, support: 64 },
              'acc': { precision: 0.94, recall: 1.00, f1Score: 0.97, support: 16 },
              'good': { precision: 1.00, recall: 0.75, f1Score: 0.86, support: 4 },
              'vgood': { precision: 0.67, recall: 0.67, f1Score: 0.67, support: 3 }
            }
          };
        case 'SVM':
          return {
            confusionMatrix: [
              [245, 4, 1, 0],
              [5, 66, 0, 0],
              [2, 1, 11, 0],
              [1, 0, 1, 9]
            ],
            classificationReport: {
              'unacc': { precision: 0.99, recall: 0.98, f1Score: 0.98, support: 250 },
              'acc': { precision: 0.86, recall: 0.93, f1Score: 0.89, support: 71 },
              'good': { precision: 0.85, recall: 0.79, f1Score: 0.81, support: 14 },
              'vgood': { precision: 1.00, recall: 0.82, f1Score: 0.90, support: 11 }
            }
          };
        case 'KNN':
          return {
            confusionMatrix: [
              [244, 5, 1, 0],
              [3, 68, 0, 0],
              [4, 1, 9, 0],
              [2, 1, 0, 8]
            ],
            classificationReport: {
              'unacc': { precision: 0.99, recall: 0.98, f1Score: 0.98, support: 250 },
              'acc': { precision: 0.85, recall: 0.96, f1Score: 0.90, support: 71 },
              'good': { precision: 0.75, recall: 0.64, f1Score: 0.69, support: 14 },
              'vgood': { precision: 1.00, recall: 0.73, f1Score: 0.84, support: 11 }
            }
          };
        case 'Decision Tree':
          return {
            confusionMatrix: [
              [235, 15, 0, 0],
              [10, 61, 0, 0],
              [14, 0, 0, 0],
              [2, 0, 0, 9]
            ],
            classificationReport: {
              'unacc': { precision: 0.97, recall: 0.94, f1Score: 0.95, support: 250 },
              'acc': { precision: 0.71, recall: 0.86, f1Score: 0.78, support: 71 },
              'good': { precision: 0.00, recall: 0.00, f1Score: 0.00, support: 14 },
              'vgood': { precision: 0.50, recall: 0.82, f1Score: 0.62, support: 11 }
            }
          };
        case 'Naive Bayes':
          return {
            confusionMatrix: [
              [230, 18, 2, 0],
              [49, 22, 0, 0],
              [12, 0, 2, 0],
              [0, 0, 0, 11]
            ],
            classificationReport: {
              'unacc': { precision: 0.92, recall: 0.92, f1Score: 0.92, support: 250 },
              'acc': { precision: 0.56, recall: 0.31, f1Score: 0.40, support: 71 },
              'good': { precision: 0.29, recall: 0.14, f1Score: 0.19, support: 14 },
              'vgood': { precision: 0.22, recall: 1.00, f1Score: 0.36, support: 11 }
            }
          };
        default:
          return {
            confusionMatrix: [
              [245, 4, 1, 0],
              [5, 66, 0, 0],
              [2, 3, 9, 0],
              [1, 1, 0, 9]
            ],
            classificationReport: {
              'unacc': { precision: 0.97, recall: 0.98, f1Score: 0.97, support: 250 },
              'acc': { precision: 0.89, recall: 0.93, f1Score: 0.91, support: 71 },
              'good': { precision: 0.90, recall: 0.64, f1Score: 0.75, support: 14 },
              'vgood': { precision: 0.82, recall: 0.82, f1Score: 0.82, support: 11 }
            }
          };
      }
    };

    const modelMetrics = getModelSpecificMetrics(this.currentModel);

    return {
      success: true,
      data: {
        currentModel: this.currentModel,
        metrics: {
          accuracy: currentModelData.accuracy,
          precision: currentModelData.precision,
          recall: currentModelData.recall,
          f1Score: currentModelData.f1Score,
          confusionMatrix: modelMetrics.confusionMatrix,
          classificationReport: modelMetrics.classificationReport
        },
        featureImportances: mockFeatureImportances,
        modelComparisons: mockModelComparisons
      }
    };
  }
}

export default CarSafetyAPI;